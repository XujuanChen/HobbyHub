import React, { useState, useEffect, useReducer } from "react";
// import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useUser, useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import Loading from "./Loading";

const Success = () => {
  const navigate = useNavigate();
  const user = useUser();
  const supabase = useSupabaseClient()
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchAuthor();
    }
  }, [user]);

  const fetchAuthor = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();
    if (data) {
      setProfile(data);
    } else {
      console.log(error);
    }
    // console.log("success",session)
    setLoading(false)
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
              <>
                {loading? <Loading loading={loading} /> : null}
                <img src={profile.avatar} alt="avatar" className="avatar-img" />
                <p className="avatar-text">
                  Welcome! {profile.name} : {profile.id}
                </p>
              </>
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
