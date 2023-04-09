import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
  
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')

    useEffect(() => {
        const fetchSmoothie = async () => {
          const { data, error } = await supabase
            .from('recipes')
            .select()
            .eq('id', id)
            .single()
    
          if (error) {
            navigate('/', { replace: true })
          }
          if (data) {
            setTitle(data.title)
            setMethod(data.method)
            setRating(data.rating)
          }
        }
    
        fetchSmoothie()
      }, [id, navigate])


  return (
    <div>
        <div className="detail-content">
            <h3>{title}</h3>
            <p>Description: {method}</p>
            <p>Rating: {rating}👍️ </p>
       </div>

       <form action="">
            <label for="photofile">Upload photo:</label>
            <input type="file" id="photofile" name="photofile"/>
            <label for="comment">Leave your comment:</label>
            <textarea id="comment" name="comment" rows="5" ></textarea>
            <button>Submit Comment</button>
       </form>
    </div>
  )
}

export default Details