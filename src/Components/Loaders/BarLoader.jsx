import React from 'react'
import '../../../public/barloader.css'

function BarLoader() {
    return (
            <div className='p-4 w-screen h-screen fixed top-0 left-0 flex justify-center items-center' style={{'zIndex':1000}}>
                <div className='h-screen w-screen top-0 left-0 opacity-30 absolute flex justify-center items-center'>
                    <div className='w-1/3 h-1/3 '></div>
                </div>
                <div className=''>
                    <span className="loader px-20 py-20 text-center"></span>
                </div>
            </div>

        //  <div className='p-4 w-screen h-screen fixed top-0 left-0 flex justify-center items-center' style={{'zIndex':1000}}>
           

        //     <div className='w-full h-full bg-indigo-50 absolute top-0 left-0 opacity-50'>

        //     </div>
        //     <div className='rounded-full relative shadow-xl'>
        //         <img className='w-28 h-28' src={jlogo} alt="" />
        //         <div className='w-full h-full absolute top-0 left-0 border-4 border-blue-400 rounded-full border-t-white border-b-white animate-spin'></div>
        //     </div>
        // </div>

       
    )
}

export default BarLoader