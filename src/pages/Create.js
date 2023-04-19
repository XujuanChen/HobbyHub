import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import supabase from "../config/supabaseClient"
import { useUser, useSupabaseClient, useSession } from "@supabase/auth-helpers-react"
import { v4 as uuidv4 } from 'uuid'
import Loading from "./Loading"

const Create = () => {
  const navigate = useNavigate()
  const user = useUser()
  const supabase = useSupabaseClient()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)
  const [images, setImages] = useState([])
  // const [video, setVideo] = useState([])
  const [loading, setLoading] = useState(false)
  const CDNURL = 'https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/images/'

  const getImages = async() => {
    setLoading(true)
    const {data, error} = await supabase
      .storage
      .from("images")
      .list(user?.id+'/', {
        limits: 100,
        offset: 0,
        sortBy: {column:'created_at', order:'desc'}
      });
    if (data) {
      setImages(data[0])
    } else {
      alert(error)
    }
    setLoading(false)
  }

  const uploadImage = async(e) => {
    setLoading(true)
    let file = e.target.files[0]
    const {data, error} = await supabase
    .storage
    .from("images")
    .upload(user.id+"/"+uuidv4(),file)
    if (data) {
      getImages()
    }else{
      console.log(error)
    }
    setLoading(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    const { data, error } = await supabase
      .from('recipes')
      .insert([{ title, method, rating, author:user.id, image_id:images?.name } ])
      .select()
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/article')
    } else {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
  }

  // const getVideo = async() => {
  //   setLoading(true)
  //   const {data, error} = await supabase
  //     .storage
  //     .from("videos")
  //     .list('');
  //   if (data) {
  //     setVideo(data[0])
  //     console.log("video",video)
  //     setLoading(false)
  //   } else {
  //     alert(error)
  //     setLoading(false)
  //   }
  // }
  // const uploadVideo = async(e) => {
  //   setLoading(true)
  //   let file = e.target.files[0]
  //   const {data, error} = await supabase
  //     .storage
  //     .from("videos")
  //     .upload(uuidv4()+".mp4",file)
  //     if (data) {
  //       getVideo()
  //       setLoading(false)
  //     }else{
  //       console.log(error)
  //       setLoading(false)
  //     }
  // }

  return (
    <div className="page create">
      <h1 className="detail-content text-center">Create Your Post</h1>
      <form onSubmit={handleSubmit}>
        { loading ? <Loading loading={loading}/> : null }
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="loader">Upload an image</label>
        <input type="file" id="loader" accept="image/" onChange={(e)=>uploadImage(e)}/>

        {/* <label htmlFor="vloader">Upload a Video</label>
        <input type="file" id="vloader" accept="video/mp4" onChange={(e)=>uploadVideo(e)}/> */}

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          rows='5'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create Your Post</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create