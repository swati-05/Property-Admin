import { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import newAsss from '@/Components/Media/new.png'
import brief from '@/Components/Media/brief.png'
import verified from '@/Components/Media/verified.png'
import search from '@/Components/Media/search.png'
import drop from '@/Components/Media/drop.png'
import ip from '@/Components/Media/ip.png'
import objection from '@/Components/Media/objection.png'
import report from '@/Components/Media/report.png'
import useSetTitle from '@/Components/GlobalData/useSetTitle'

function PropertyOptions(props) {
    const navigate = useNavigate()
    useSetTitle('Property')
    const [infoCardCount, setinfoCardCount] = useState(0)

    // GETTING ROLE TO GIVE PERMISSION
    let roles = JSON.parse(window.localStorage.getItem('roles'))
    let role = roles[0]
    console.log('roles...', roles)

    const activateInfoCard = (e, count) => {
        e.stopPropagation()
        setinfoCardCount(count)
    }

    const closeInfoModal = () => {
        setinfoCardCount(0)
    }


    const replaceRoute = (route) => {
        window.location.replace(route)
    }


    return (
        <div className='w-full  mx-auto'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>

                <div
                    className="w-full px-4 mx-auto ">
                    <div
                        className="w-full">
                        <div>
                            {/* <h2 className="text-3xl font-medium text-center">Choose Module</h2> */}
                            {/* <div className="mt-2 text-center w-full">Choose from these application types</div> */}
                        </div>
                    </div>
                    <div className="my-4 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {role !== 'ULB Tax Collector' &&
                                <div onClick={() => navigate('/safform/new/0')}
                                    className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                    href="">
                                    <img
                                        className="h-16 w-16"
                                        src={brief}
                                        alt="Mobiles" />
                                    <div className="font-bold mt-4 text-center">Apply</div>
                                </div>
                            }



                            {/* 4 BIFURCATION */}

                            <div onClick={() => navigate('/mobile-property-verification-options')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-12 w-12"
                                    src={verified}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Property Verification</div>

                            </div>


                            {
                                role !== 'ULB Tax Collector' && <>
                                    {/* 5 AMALGAMATION */}
                                    <div onClick={() => navigate('/search/fresh/direct/direct')}
                                        className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                        href="">
                                        <img
                                            className="h-12 w-12"
                                            src={newAsss}
                                            alt="Electronics" />
                                        <div className="font-bold mt-4 text-center">Search Property</div>
                                    </div>
                                    {/* 5 AMALGAMATION */}
                                    <div onClick={() => navigate('/searchAppliedProperty/direct/direct')}
                                        className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                        href="">
                                        <img
                                            className="h-12 w-12"
                                            src={search}
                                            alt="Electronics" />
                                        <div className="font-bold mt-4 text-center">Search Application</div>
                                    </div>
                                    {/* <div onClick={() => navigate('')}
                                        className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                        href="">
                                        <img
                                            className="h-12 w-12"
                                            src={objection}
                                            alt="Electronics" />
                                        <div className="font-bold mt-4 text-center">Form Distribution</div>
                                    </div> */}



                                    {/* 4 BIFURCATION */}
                                    <div onClick={() => replaceRoute('/mobile/search/geoTagging')}
                                        className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                        href="">
                                        <img
                                            className="h-12 w-12"
                                            src={ip}
                                            alt="Electronics" />
                                        <div className="font-bold mt-4 text-center">Missing GeoTagging</div>

                                    </div>
                                </>

                            }
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/collection-report-mobile')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-12 w-12"
                                    src={report}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Collection Reports</div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyOptions