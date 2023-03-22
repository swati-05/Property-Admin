// Author - Talib Hussain
// Version - 1.0
// Date - 17 MARCH 2023
// Revision - 1
// Project - JUIDCO
// Component  - ServerErrorCard
// DESCRIPTION - This component is rendered when there is some error in hitting the api to show text like server is busy..

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineReload } from 'react-icons/ai'

function ServerErrorCard(props) {
  const navigate = useNavigate()
  return (
    <>
      <div class="items-center justify-center p-10 bg-white shadow-xl">
        <div class="text-center">
          <div class="inline-flex rounded-full bg-red-100 p-4">
            <div class="rounded-full stroke-red-600 bg-red-200 p-4">
              <svg class="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 16L22 21M22 16L17 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
        </div>

        <div className=" p-10">
          <div>
            <div className="text-center font-semibold text-3xl">{props?.title}</div>
            <p class="text-slate-600 mt-1 lg:text-lg">{props?.desc}</p>
            <div className="text-center mt-10">
              <button className={`mr-4 bg-indigo-500  text-white px-6 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => window.location.reload()}><AiOutlineReload className="inline mr-2" />Reload</button>
              <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(props?.buttonUrl)}>{props?.buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServerErrorCard