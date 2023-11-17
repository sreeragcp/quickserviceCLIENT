import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <>

<div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <img 
          src ="\images\creative-404-page-animation.gif"  // Replace with your own image path
          alt="Parcel Not Found"
          className="w-56 ml-20"
        />
        <NavLink to="/"  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          &larr; Back to Home
        </NavLink>
      </div>
    </div>

    </>
  )
}

export default NotFound
