import React, { useState, useEffect, CSSProperties  } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = ({loading}) => {


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