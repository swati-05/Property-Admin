import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newAsss from '@/Components/Media/new.png'
import add from '@/Components/Media/add.png'
import division from '@/Components/Media/division.png'
import objection from '@/Components/Media/objection.png'

function PropertyOptions(props) {
    const navigate = useNavigate()
    const [infoCardCount, setinfoCardCount] = useState(0)

    const activateInfoCard = (e, count) => {
        e.stopPropagation()
        setinfoCardCount(count)
    }

    const closeInfoModal = () => {
        setinfoCardCount(0)
    }

   



    return (
        <div className='w-full  mx-auto mt-20'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
              
                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                            {/* <h2 className="text-3xl font-medium text-center">Choose Module</h2> */}
                            {/* <div className="mt-2 text-center w-full">Choose from these application types</div> */}
                        </div>
                    </div>
                    <div className="my-10 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {/* 1 NEW ASSESSMENT */}
                            <div onClick={() => navigate('/safform/new/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-16 w-16"
                                    src={newAsss}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">Apply</div>
                            </div>

                          

                            {/* 4 BIFURCATION */}
                            <div onClick={() => navigate('/mobile')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={division}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Field Verification</div>

                            </div>
                            
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/search/fresh/direct/direct')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={add}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Search Property</div>
                            </div>
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/searchAppliedProperty/direct/direct')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={objection}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Search Application</div>
                            </div>


                          
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyOptions