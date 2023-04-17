import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Comment = ({ cmt }) => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
  };

  return (
    <div className="detail-content">
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
      {cmt ? (<p>{cmt.comment}</p>) : (<p>Loading...</p>)}
    </div>
  );
};

export default Comment;
