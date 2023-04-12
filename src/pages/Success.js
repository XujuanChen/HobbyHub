import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "../config/supabaseClient"
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUserData = async() => {
            await supabase.auth.getUser().then((value)=>{
                if (value.data?.user) {
                    // console.log(value.data.user)
                    setUser(value.data.user)
                }
            })
        }
        getUserData();
    }, [])

    const signOutUser = async() => {
        await supabase.auth.signOut();
        navigate('/');
    }
    

  return (
    <div>
        {Object.keys(user).length > 0 ? 
        <>
            <button onClick={()=>signOutUser()}>Sign Out</button>
        </>
        :
        <>
            <h1>User is not logged in</h1>
            <button onClick={()=> { navigate('/') }}>Go back home!</button>

        </>}
    </div>
  )
}

export default Success