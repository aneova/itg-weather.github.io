import React from "react";



const Error: React.FC = () => { 
    
  return (
      <>{<div style={{ width: "50%", border: "1px solid darkred", background: "salmon" }}>
        <i>&#9888;</i><p> ERROR Location is not found!</p>
      </div>}</>
  )
}
export default Error;