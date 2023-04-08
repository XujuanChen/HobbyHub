import { useState } from 'react'
import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'

const SmoothieCard = ({ smoothie, onDelete }) => {
  const [count, setCount] = useState(smoothie.rating)
  let datetime = smoothie.created_at.substring(0,10) + " " + smoothie.created_at.substring(11,19);

  const updateCount = async (event) => {
    event.preventDefault();
    // Update in Supabase
    await supabase
    .from('recipes')
    .update({ rating: count + 1})
    .eq('id', smoothie.id)
    // Update State Variable
    setCount((count) => count + 1);
  }

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', smoothie.id)
      .select()
    
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
  }

  return (
    <div className="smoothie-card">
      <p> {datetime} </p>
      <Link to={"/" + smoothie.id} className='title-link'>
        <h3>{smoothie.title}</h3>
      </Link>
      <p>{smoothie.method}</p>
      <div className="rating" onClick={updateCount}>👍️{count}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default SmoothieCard