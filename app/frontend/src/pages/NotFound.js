import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className=' flex items-center justify-center h-lvh'>
          <Link to='/'>
          <h2 className='font-normal rounded bg-blue-900 px-2 border border-solid border-blue-700  shadow-2xl overflow-x-hidden'>Page Not Found</h2>
          </Link>
           
           
        </div>
      )
}

export default NotFound
