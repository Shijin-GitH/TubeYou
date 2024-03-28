import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'


function Loader() {
  return (
      <div className='h-screen w-screen flex justify-center items-center'>
          
    <PropagateLoader color="#36d7b7" />
    </div>
  )
}

export default Loader;