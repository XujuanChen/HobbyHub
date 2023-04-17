import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"

const Create = () => {
  const navigate = useNavigate()
  const user = useUser()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [author, setAuthor] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('recipes')
      .insert([{ title, method, rating, author:user.id}])
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/article')
    }
  }

  return (
    <div className="page create">
      <h1 className="detail-content text-center">Create Your Post</h1>
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

        <button>Create Your Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create