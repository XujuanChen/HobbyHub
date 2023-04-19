import React, { useState, useEffect } from "react";
// import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Success = () => {
  const navigate = useNavigate();
  const user = useUser();
  const supabase = useSupabaseClient()
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetchAuthor();
  }, []);
  const fetchAuthor = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();
    if (data) {
      setProfile(data);
    } else {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <>
          <div className="avatar-container">
            {profile ? (
              <>
                <img src={profile.avatar} alt="avatar" className="avatar-img" />
                <p className="avatar-text">
                  Welcome! {profile.name} : {profile.id}
                </p>
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
          <button onClick={() => signOutUser()}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>User is not logged in</h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back home!
          </button>
        </>
      )}
    </div>
  );
};

export default Success;
