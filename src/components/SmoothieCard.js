import { useState } from 'react'
import supabase from "../config/supabaseClient"
import { Link, useNavigate } from 'react-router-dom'

const SmoothieCard = ({ smoothie }) => {
  const navigate = useNavigate()
  const [count, setCount] = useState(smoothie.rating)
  let datetime = smoothie.created_at.substring(0,10) + " " + smoothie.created_at.substring(11,19);

  const getDate = () => {
    let time = Date.parse(smoothie.created_at);
    let date = new Date(time);
    return date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
  }

  const updateCount = async (event) => {
    event.preventDefault();
    // Update in Supabase
    await supabase
    .from('recipes')
    .update({ rating: count + 1})
    .eq('id', smoothie.id)
    .select()
    // Update State Variable
    setCount((count) => count + 1);
  }

  return (
    <div className="smoothie-card">
      <p> {datetime} </p>
      {/* <p> { getDate() } </p> */}
      <Link to={"/details/" + smoothie.id} className='title-link'>
        <h3>{smoothie.title}</h3>
        <p>{smoothie.method}</p>
      </Link>

      <div className="rating" onClick={updateCount}>👍️{count}</div>
      <div className="buttons">
        <Link to={"/edit/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  )
}

export default SmoothieCard