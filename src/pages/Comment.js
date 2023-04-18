import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Loading from "./Loading";

const Comment = ({ cmt }) => {
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
      setLoading(false)
    } else {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="detail-content">
      <div className="avatar-container">
        {loading?<Loading loading={{loading}} />: 
          <>
            <img src={profile.avatar} alt="avatar" className="avatar-img" />
            <p className="avatar-text">Author: {profile.name}</p>
          </>
        }
      </div>
      {cmt ? (<p>{cmt.comment}</p>) : <Loading  loading={loading}/>}
    </div>
  );
};

export default Comment;
