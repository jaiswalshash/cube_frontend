import React from 'react'
import "./loader.css"

function Loader() {
  return (
    <div id='spinner' style={{zIndex:"79"}}>
        <span style={{zIndex:"80"}} className="loader"></span>
    </div>

  )
}

export default Loader