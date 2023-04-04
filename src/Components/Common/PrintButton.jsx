import React from 'react'
import { AiFillPrinter } from 'react-icons/ai'

const PrintButton = () => {
  return (
    <>
    <div className='fixed bottom-10 text-center  justify-center items-center  w-screen z-40'>
                    <button onClick={() => window.print()} className="ml-4 font-bold px-6 py-1 bg-indigo-500 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white">
                        <AiFillPrinter className='inline text-lg' />
                        print
                    </button>
                </div>
    </>
  )
}

export default PrintButton