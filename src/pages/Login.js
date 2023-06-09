import React, {useEffect, useState} from 'react'
import supabase from "../config/supabaseClient"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
   const {data} = supabase.auth.onAuthStateChange(async(event, session) => {
      if (event === 'SIGNED_IN') {
        // forward to success page
        navigate("/article");
        // localStorage.setItem("session", JSON.stringify(session))
      } else {
        // forward to localhost:3000
        navigate('/');
      }
    })
  }, [])

  return (
    <div className="login">
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['github']}
        />
    </div>
  )
}

export default Login