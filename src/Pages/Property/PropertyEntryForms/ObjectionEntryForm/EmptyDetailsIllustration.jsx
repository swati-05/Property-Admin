import React from 'react'
import notFound2 from '@/Components/Common/EmptyDetails/notfound2.svg'
import notFound1 from '@/Components/Common/EmptyDetails/notfound1.svg'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'


function EmptyDetailsIllustration(props) {

    const navigate = useNavigate()

    return (
        <>
            <div className="relative">
                <h1 className='text text-center mb-6 md:mt-6'><span className='bg-orange-200 px-10 py-2 text-orange-800 text-xl font-semibold shadow-lg'>{props.title}</span></h1>
                <img className='w-2/5 mx-auto' src={notFound2} alt="Not Found image" />
                <div className="absolute top-0 right-0">
                    <img className='w-1/5 opacity-30' src={notFound1} alt="Not Found image" />
                    <h1 className='md:pl-11 font-mono opacity-50'>No Data Found</h1>
                </div>
                <div className='text-center mt-5'><button onClick={props.location} className='bg-gray-200 shadow-lg text-black mr-2 px-4 pr-6 rounded text-lg hover:bg-green-500 hover:text-white'>
                    {/* <TiArrowBack className='inline' /> */}
                     Close</button></div>
            </div>
        </>
    )
}

export default EmptyDetailsIllustration