import { useEffect, useState } from "react"
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"
import Comment from "./Comment"
import Profile from './Profile'

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
      fetchSmoothie();
      fetchComments();

    }, [id, navigate])

      const fetchSmoothie = async() => {
        const { data, error } = await supabase
          .from('recipes')
          .select()
          .eq('id', id)
          .single()
  
        if (error) {
          navigate('/article', { replace: true })
        }
        if (data) {
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
        }
      }

      const createComment = async (e) => {
        e.preventDefault()
        await supabase
          .from('comments')
          .insert([{comment, post_id:id}])
          .select()

        navigate(`/article`)
      }
  
      const fetchComments = async () => {
        const { data, error } = await supabase
          .from('comments')
          .select()
          .eq('post_id', id)
          // console.log("data", data[0].comment)
          if (data) {
            setComments(data)
            // console.log("comments",comments)
          }
      }

  return (
    <div className="page create">
        <div className="detail-content">
            <Profile />
            <h3>{title}</h3>
            <p>Description: {method}</p>
            <p>Rating: {rating}👍️ </p>
        </div>
        {comments && 
          comments.map((ct)=> <Comment key={ct.id} cmt = {ct.comment} />)
        }
        
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