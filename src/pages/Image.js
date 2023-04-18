import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Loading from "./Loading";

const Image = ({ author }) => {
// https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/images/bcb589df-f087-48fa-bb37-fb706fa7e4f1/1bffbc58-523b-4798-8215-6efca4cf9450
const CDNURL = 'https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/images/'
// CDNURL + user.id +'/' +image.name

  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getImages()
  },[author])

  const getImages = async() => {
    setLoading(true)
    const {data, error} = await supabase
      .storage
      .from("images")
      .list(author+'/', {
        limits:100,
        offset: 0,
        sortBy: {column:'created_at', order:'desc'}
      });
    if (data) {
      setImages(data[0])
      // console.log("details-images",data[0])
      // console.log("images", images)
      // console.log("img-id", images.id)
      setLoading(false)
    } else {
      alert(error)
      setLoading(false)
    }
  }

  return (
    <div>
    {images ? 
    <div>
        <img  src={CDNURL+author+"/"+images.name} alt="image" style={{maxWidth:480, margin:"auto"}}/>
    </div>
    : <Loading loading={{loading}} />}
    </div>
  );
};

export default Image;