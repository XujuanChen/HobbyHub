import { useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from 'react-router-dom'
// import supabase from "../config/supabaseClient"
import Comment from "./Comment"
import Profile from './Profile'
// import Image from "./Image"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Loading from "./Loading"
// https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/images/bcb589df-f087-48fa-bb37-fb706fa7e4f1/1bffbc58-523b-4798-8215-6efca4cf9450
const CDNURL = 'https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/images/'
// CDNURL + user.id +'/' +image.name
const CDNVIDEO = 'https://qeptbbxyaugavuiltahk.supabase.co/storage/v1/object/public/videos/'

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useUser()
    const supabase = useSupabaseClient()
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [imgName, setImgName] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      fetchSmoothie();
      fetchComments();
    }, [id, navigate])

    const fetchSmoothie = async() => {
      setLoading(true)
      const { data, error } = await supabase
      .from('recipes')
      .select()
      .eq('id', id)
      .single()
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        setAuthor(data.author)
        setImgName(data.image_id)
        setLoading(false)
        console.log("details-author",author)
      } else {
        navigate('/article', { replace: true })
        console.log(error)
        setLoading(false)
      }
    }
    
    const createComment = async (e) => {
      e.preventDefault()
      await supabase
      .from('planb')
      .insert([{comment, post_id:id, author: user.id}])
      .select()
      navigate(`/article`)
    }
    
    const fetchComments = async () => {
      setLoading(true)
      const { data, error } = await supabase
      .from('planb')
      .select()
      .eq('post_id', id)
      // console.log("data", data[0].comment)
      if (data) {
        setComments(data)
        // console.log("comments",comments)
        setLoading(false)
      }else{
        console.log(error)
        setLoading(false)
      }
    }

  return (
    <div className="page create">
        <div className="detail-content">
            <Profile author={author} />
            <h3>{title}</h3>
            {imgName? 
            <img src={CDNURL+author+"/"+imgName} alt="image" style={{maxWidth:480, margin:"auto"}}/>
            : null}
            {/* {videoname? 
            <>
              <video width="320" height="240" controls>
                <source src={CDNVIDEO+videoname} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
            </>           
            : null} */}
            <p>Description: {method}</p>
            <p>Rating: {rating}👍️ </p>
        </div>
        
        {comments && comments.map((ct)=>  {
        return (
        <>
          <Loading  loading={loading}/>
          <Comment key={ct.id} cmt = {ct} />
        </>
        )}
        )}
        
      <form onSubmit={createComment}>
        <label htmlFor="comment">Leave Your Comments:</label>
        <textarea 
          id="comment"
          rows='5'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Create Your Comment</button>
      </form>
    </div>
  )
}

export default Details