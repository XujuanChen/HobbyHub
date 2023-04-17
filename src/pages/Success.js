import React from 'react'
import supabase from "../config/supabaseClient"
import { useNavigate } from 'react-router-dom'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

const Success = () => {
    const navigate = useNavigate()
    const user = useUser()
    const supabse = useSupabaseClient()

    const signOutUser = async() => {
        await supabase.auth.signOut();
        navigate('/');
    }

return (
    <div>
        {user ? 
        <>  
            <p> user_id: {user.id}</p>
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