import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Profile = () => {
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState('')
    useEffect(() => {
        const getUserData = async() => {
            await supabase.auth
            .getUser()
            .then((value)=>{
                if (value.data?.user) {
                    // console.log(value.data)
                    setUser(value.data.user)
                }
            })
        }
        getUserData();
    }, [])

    useEffect(() => {
        fetchProfiles();
    }, [])

      const fetchProfiles = async() => {
        const {data, error} = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

        if (error) {
            console.log(Error)
        }
        if (data) {
            setProfile(data)
            // console.log(data)
        }
      }

      console.log(profile.avatar)
  return (
    <div className="avatar-container">
    {profile.avatar ? <img src={profile.avatar} alt="avatar" className="avatar-img"/>
    : <img src="https://gravatar.com/avatar/674acf50fc1be8e94658d58278307f5d?s=400&d=robohash&r=x" alt="avatar" className="avatar-img"/> }
    <p className="avatar-text">User: {user.email}</p>
    </div>
  )
}

export default Profile