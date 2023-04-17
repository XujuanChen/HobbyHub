import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [author, setAuthor] = useState('')
  const [imgName, setImgName] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('recipes')
      .update({ title, method, rating, })
      .eq('id', id)
      .select()

    if (error) {
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      setFormError(null)
      navigate('/article')
    }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
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
        setAuthor(data.author)
        setImgName(data.image_id)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  const handleDelete = async () => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)
      .select()

      await supabase.storage.from('images')
      .remove([author+'/'+imgName])
    
    if (error) {
      console.log(error)
    }
    navigate('/article')
  }

  return (
    <div className="page create">

      <div className="detail-content">
        <h3>{title}</h3>
        <p>Description: {method}</p>
        <p>Rating: {rating}👍️ </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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
        <button>Update </button> &nbsp;
        <button onClick={handleDelete}>delete</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update