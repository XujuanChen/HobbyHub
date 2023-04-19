import { useEffect, useState } from "react";
// import supabase from "../config/supabaseClient";
import Loading from "./Loading";
import { useUser, useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

const Comment = ({ cmt }) => {
  const supabase = useSupabaseClient()
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", cmt.author)
      .single();
      if (data) {
        setProfile(data);
        // console.log(data);
      } else {
        console.log(error);
      }
      setLoading(false)
  };

  return (
    <div className="detail-content">
      <div className="avatar-container">
          <>
            {loading ? <Loading loading={{loading}}/> : null }
            <img src={profile.avatar} alt="avatar" className="avatar-img" />
            <p className="avatar-text">Author: {profile.name}</p>
          </>
      </div>
      {cmt ? (<p>{cmt.comment}</p>) : null}
    </div>
  );
};

export default Comment;
