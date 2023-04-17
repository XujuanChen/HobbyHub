import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Profile = () => {
    const user = useUser()
    const [author, setAuthor] = useState('')
    const [profile, setProfile] = useState('')

    useEffect(() => {
        fetchAuthor();
        fetchProfiles();
    }, [])

    const fetchAuthor = async() => {
        const {data, error} = await supabase
        .from('recipes')
        .select()
        .eq('author', user.id)
        .single()
        if (error) {
            console.log(Error)
        }
        if (data) {
            setAuthor(data)
            // console.log(data)
        }
    }

        const fetchProfiles = async() => {
            const {data, error} = await supabase
            .from('profiles')
            .select()
            .eq('id', author)
            .single()
            if (error) {
                console.log(Error)
            }
            if (data) {
                setProfile(data)
                // console.log(data)
            }
        }

  return (
    <div className="avatar-container">
    {author.avatar ? <img src={profile.avatar} alt="avatar" className="avatar-img"/>
    : <img src="https://gravatar.com/avatar/674acf50fc1be8e94658d58278307f5d?s=400&d=robohash&r=x" alt="avatar" className="avatar-img"/> }
    <p className="avatar-text">Author: {user.email}</p>
    </div>
  )
}

export default Profile