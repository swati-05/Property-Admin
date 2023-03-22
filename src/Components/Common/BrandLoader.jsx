import React from 'react'
import './barloader.css'
import jlogo from '../../Components/Media/jlogo.svg'


function BrandLoader() {
    return (
        <>
            <div className='p-4 w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center shadow-xl' style={{ 'zIndex': 1000 }}>
                <div className='w-full h-full bg-indigo-50 absolute top-0 left-0 opacity-50 shadow-xl'>
                </div>
                <div className='rounded-full relative shadow-xl'>
                    <img className='w-28 h-28' src={jlogo} alt="" />
                    <div className='w-full h-full absolute top-0 left-0 border-4 border-indigo-500 rounded-full border-t-white border-b-white animate-spin'></div>
                </div>
                <div>Loading...</div>
            </div>
        </>
    )
}

export default BrandLoader