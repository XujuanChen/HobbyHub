import { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";
import { useUser, useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

const Profile = ({author}) => {
  const [profile, setProfile] = useState("");
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (author) {
      fetchAuthor();
    }
  }, [author] );

  const fetchAuthor = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", author)
      .single();
    if (data) {
      setProfile(data);
      // console.log("profile", profile);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="avatar-container">
      {profile ? (
        <>
          <img src={profile.avatar} alt="avatar" className="avatar-img" />
          <p className="avatar-text">Author: {profile.name}</p>
        </>
      ) : (
        <>
          <img
            src="https://gravatar.com/avatar/674acf50fc1be8e94658d58278307f5d?s=400&d=robohash&r=x"
            alt="avatar"
            className="avatar-img"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
