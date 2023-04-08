import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newAsss from '@/Components/Media/new.png'
import add from '@/Components/Media/add.png'
import division from '@/Components/Media/division.png'
import objection from '@/Components/Media/objection.png'

import home from '@/Components/Media/home.png'
import water from '@/Components/Media/water.png'
import team from '@/Components/Media/team.png'
import useSetTitle from '@/Components/GlobalData/useSetTitle'


function ModuleOption(props) {
    const navigate = useNavigate()
    useSetTitle('Choose Module')
    const [infoCardCount, setinfoCardCount] = useState(0)

    const activateInfoCard = (e, count) => {
        e.stopPropagation()
        setinfoCardCount(count)
    }

    const closeInfoModal = () => {
        setinfoCardCount(0)
    }

   



    return (
        <div className='w-full  mx-auto'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
              
                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                   
                    <div className="my-10 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {/* 1 NEW ASSESSMENT */}
                            <div onClick={() => navigate('/mobile-property-options')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-16 w-16"
                                    src={home}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">Property</div>
                            </div>

                          

                            {/* 4 BIFURCATION */}
                            <div onClick={() => navigate('/safform/bi/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={water}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Water</div>

                            </div>
                            
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/safform/am/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={team}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Trade</div>
                            </div>
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/gov-form')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                {/* <img
                                    className="h-20 w-20"
                                    src={objection}
                                    alt="Electronics" /> */}
                                <div className="font-bold mt-4 text-center"></div>
                            </div>


                          
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModuleOption