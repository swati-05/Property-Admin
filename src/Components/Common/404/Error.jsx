//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Error
//    DESCRIPTION - Error Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function Error() {
  return (
    <>
      <div style={{ 'width': '95vw', 'height': '98vh' }}
        class="overflow-hidden sm:-ml-64 flex items-center justify-center w-screen h-screen  bg-gradient-to-r from-indigo-600 to-blue-400"
      >
        <div class="px-40 py-20 bg-white rounded-md shadow-xl">
          <div class="flex flex-col items-center">
            <h1 class="font-bold text-blue-600 text-9xl">404</h1>

            <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span class="text-red-500">Oops!</span> Page not found
            </h6>

            <p class="mb-8 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <a
              href="#"
              class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
            >Go home</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error
/**
 * Exported to :
 * 1. App.js
 * 
 */