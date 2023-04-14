import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Comment = ({cmt}) => {

  return (
    <div className="detail-content">
      {cmt}
    </div>
  )
}

export default Comment