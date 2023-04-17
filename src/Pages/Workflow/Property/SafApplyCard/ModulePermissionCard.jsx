import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newAsss from '@/Components/Media/new.png'
import re from '@/Components/Media/re.png'
import transfer from '@/Components/Media/transfer.png'
import add from '@/Components/Media/add.png'
import division from '@/Components/Media/division.png'
import concession from '@/Components/Media/concession.png'
import objection from '@/Components/Media/objection.png'
import rwh from '@/Components/Media/rwh.png'
import { BsQuestionCircle } from 'react-icons/bs'
import { Tooltip } from 'react-tooltip'
import CommonModal from '@/Components/GlobalData/CommonModal'
import InfoNewAssessment from './ApplicationInformation/InfoNewAssessment'
import InfoReAssessment from './ApplicationInformation/InfoReAssessment'
import useSetTitle from '@/Components/GlobalData/useSetTitle'

function ModulePermissionCard(props) {
    const navigate = useNavigate()
    useSetTitle('Property Applications')
    const [infoCardCount, setinfoCardCount] = useState(0)

    const activateInfoCard = (e, count) => {
        e.stopPropagation()
        setinfoCardCount(count)
    }

    const closeInfoModal = () => {
        setinfoCardCount(0)
    }

    if (infoCardCount == 1) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 2) { return (<CommonModal><InfoReAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 3) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 4) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 5) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 6) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 7) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }
    if (infoCardCount == 8) { return (<CommonModal><InfoNewAssessment closeInfoModal={closeInfoModal} /></CommonModal>) }



    return (
        <div className='w-full  mx-auto mt-10'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
                {/* <button
                    onClick={() => props?.closeModal(false)}
                    type="button"
                    class="absolute top-6 right-6 bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center shadow-sm  hover:bg-red-200 hover:border-none"
                >
                    <svg class="w-5 h-5" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button> */}
                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                            <h2 className="text-3xl font-medium text-center">Property related applications</h2>
                            <div className="mt-2 text-center w-full">Choose from these application types</div>
                        </div>
                    </div>
                    <div className="my-10 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {/* 1 NEW ASSESSMENT */}
                            <div onClick={() => navigate('/safform/new/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card1" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 1)} id="card1" data-tooltip-content="Click to know more about new assessment." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-16 w-16"
                                    src={newAsss}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">Apply New Assessment</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this for fresh assessment of property.</div>
                            </div>

                            {/* 2 RE-ASSESSMENT */}
                            {/* {props?.propertyCount !== 0 && <div onClick={() => {
                                props?.setPropertyScrollStatus(
                                    { ...props?.PropertyScrollStatus, reAssessment: true }
                                )
                                props?.closeModal(false)
                            }}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card5" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 2)} id="card5" data-tooltip-content="Click to know more about new re assessment." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-16 w-16"
                                    src={re}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">Re Assessment</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this for re assesment of your property.</div>
                            </div>} */}



                            {/* 3 MUTATION */}
                            {/* <div onClick={() => navigate('/safform/mu/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card2" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 3)} id="card2" data-tooltip-content="Click to know more about mutation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={transfer}
                                    alt="Fashion" />
                                <div className="font-bold mt-4 text-center">Mutation</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this for transfer of ownership.</div>

                            </div> */}

                            {/* 4 BIFURCATION */}
                            <div onClick={() => navigate('/safform/bi/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card3" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 4)} id="card3" data-tooltip-content="Click to know more about bifurcation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={division}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Apply Bifurcation</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this if your property has been bifurcated from existing property.</div>

                            </div>
                            
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/safform/am/0')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card4" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 5)} id="card4" data-tooltip-content="Click to know more about amalgamation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={add}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Apply Amalgamation</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this if your property has been amalgamated from existing properties.</div>
                            </div>
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => navigate('/gov-form')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card4" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 5)} id="card4" data-tooltip-content="Click to know more about amalgamation." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={objection}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Apply GB SAF</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this if your want to apply for government SAF.</div>
                            </div>


                            {/* 6 Concession */}
                            {/* 2 RE-ASSESSMENT */}
                            {/* {props?.propertyCount !== 0 && <div onClick={() => {
                                props?.setPropertyScrollStatus(
                                    { ...props?.PropertyScrollStatus, concession: true }
                                )
                                props?.closeModal(false)
                            }}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card6" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 6)} id="card6" data-tooltip-content="Click to know more about concession." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={concession}
                                    alt="Fashion" />
                                <div className="font-bold mt-4 text-center">Concession</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this to apply for concession application to get reabte on your property tax if applicable.</div>

                            </div>
                            } */}

                            {/* 7 Rainwater harvesting */}
                            {/* 2 RE-ASSESSMENT */}
                            {/* {props?.propertyCount !== 0 && <div onClick={() => {
                                props?.setPropertyScrollStatus(
                                    { ...props?.PropertyScrollStatus, rainWater: true }
                                )
                                props?.closeModal(false)
                            }}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card7" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 7)} id="card7" data-tooltip-content="Click to know more about Rainwater harvesting." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={rwh}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Rainwater Harvesting</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this if your rainwater harvesting status has been changed.</div>

                            </div>
                            } */}

                            {/* 8 Objection */}
                            {/* 2 RE-ASSESSMENT */}
                            {/* {props?.propertyCount !== 0 && <div onClick={() => {
                                props?.setPropertyScrollStatus(
                                    { ...props?.PropertyScrollStatus, objection: true }
                                )
                                props?.closeModal(false)
                            }}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <Tooltip style={{ 'zIndex': 1000 }} anchorId="card8" />
                                <span className='absolute top-2 right-2'><BsQuestionCircle onClick={(e) => activateInfoCard(e, 8)} id="card8" data-tooltip-content="Click to know more about objection." className="inline text-red-500 text-xl font-semibold cursor-pointer hover:text-red-800" /></span>
                                <img
                                    className="h-20 w-20"
                                    src={objection}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">GB SAF</div>
                                <div className="mt-1 text-center w-full text-xs px-4">Choose this if your want to apply for government SAF.</div>
                            </div>
                            } */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModulePermissionCard