import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import home from '@/Components/Media/home.png'
import water from '@/Components/Media/water.png'
import team from '@/Components/Media/team.png'
import piechart from '@/Components/Media/piechart.png'


function PermittedModuleCard(props) {
    const navigate = useNavigate()

    const swithModule = () => {
        
    }
    return (
        <div className='w-full md:w-1/2 mx-auto mt-10'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
                <button onClick={props?.closeModuleModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent bg-gray-300 hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
                    <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

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
                            <div onClick={swithModule}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-16 w-16"
                                    src={home}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">Property</div>
                            </div>


                            {/* 4 BIFURCATION */}
                            <div onClick={swithModule}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={water}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Water</div>

                            </div>

                            {/* 5 AMALGAMATION */}
                            <div onClick={swithModule}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={team}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Trade</div>
                            </div>
                            <div onClick={swithModule}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-20 w-20"
                                    src={team}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Advertisement</div>
                            </div>
                            <div onClick={swithModule}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
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