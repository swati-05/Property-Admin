import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import home from '@/Components/Media/home.png'
import water from '@/Components/Media/water.png'
import team from '@/Components/Media/team.png'
import piechart from '@/Components/Media/piechart.png'


function PermittedModuleCard() {
    const navigate = useNavigate()

    const swithModule = ()=>{

    }
    return (
        <div className='w-full md:w-1/2 mx-auto mt-10'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>

                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                            <h2 className="text-3xl font-medium text-center">Choose Module</h2>
                        </div>
                    </div>
                    <div className="my-10 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {/* 1 NEW ASSESSMENT */}
                            <div onClick={() => navigate('/safform/new/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={swithModule} id="card1" data-tooltip-content="Click to know more about new assessment." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
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
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={swithModule} id="card3" data-tooltip-content="Click to know more about bifurcation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
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
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={swithModule} id="card4" data-tooltip-content="Click to know more about amalgamation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={team}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Trade</div>
                            </div>
                            <div onClick={() => navigate('/safform/am/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={swithModule} id="card4" data-tooltip-content="Click to know more about amalgamation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={team}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Advertisement</div>
                            </div>
                            <div onClick={() => navigate('/safform/am/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={swithModule} id="card4" data-tooltip-content="Click to know more about amalgamation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={piechart}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Dashboard</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PermittedModuleCard