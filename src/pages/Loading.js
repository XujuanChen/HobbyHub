import React, { useState, useEffect, CSSProperties  } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = ({loading}) => {
  // const [loading, setLoading] = (false)
  // useEffect(()=>{
  //  const timeout = setTimeout(()=>{
  //     const timeout = setLoading(true)
  //   },3000);
  //   return () => clearTimeout(timeout);
  // },[])
  return (
    <div>
        <PacmanLoader
            color= "#12bca2"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  )
}

export default Loading