import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function PaymentTranscationScreen() {

    /////////{***✅ application full detail ...***}///////
    const { id } = useParams()
    console.log("param document", id)

    const navigate = useNavigate()


    return (
        <>
            <div className='bg-gray-200   h-screen'>
                <div className=' w-2/6 mx-auto  bg-white p-12'>
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 mx-auto '>
                        <div>
                            <img src='https://cdn-icons-png.flaticon.com/512/2169/2169862.png' className='h-40 mx-auto' />
                        </div>
                        <div className='ml-32 -mt-10'>
                            <img src='https://cdn-icons-png.flaticon.com/512/5610/5610944.png' className='h-12 mx-auto opacity-75' />
                            {/* <img src='https://cdn-icons-png.flaticon.com/512/753/753344.png' className='h-12 mx-auto opacity-75' /> */}
                        </div>
                        <div>
                            <h1 className='text-center text-2xl text-gray-600'>Payment Successful</h1>
                        </div>
                        <div>
                            <h1 className='text-center text-sm text-gray-500'>Your payment is  successful!<br /> Now you upload your Document</h1>
                        </div>
                        <div className='mx-auto flex flex-row space-x-4'>
                            <button class="w-32 text-xs p-3 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" onClick={() => navigate(`/safdocumentupload/${id}`)}>
                                Upload Document
                            </button>
                            <button class="w-32 text-xs mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600" onClick={() => navigate('/dashboardEntry')}>
                                Dashboard
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default PaymentTranscationScreen