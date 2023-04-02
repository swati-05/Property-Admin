//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'
import React from 'react'
import { GrHomeRounded } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'


function PilotWorkflowDataCard(props) {
    const navigate = useNavigate()


    console.log('form url at ...', props?.workflow)
    console.log('tab index in data card for ...', props?.tabIndex)
    return (
        <>
            <div className="bg-white">
                <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2 shadow-xl flex justify-center items-center ">
                            <div className="bg-white items-center my-auto ">
                                <div className="image overflow-hidden text-center">
                                    <div className='text-indigo-600 font-bold text-2xl leading-8'>{nullToNA(props?.applicationData?.data?.application_no)}</div>
                                    {/* <div className='text-indigo-600 font-bold text-2xl leading-8'>{props?.applicationData?.data?.application_no}({props?.id})</div> */}
                                    {/* <div className='text-indigo-600 font-bold text-2xl leading-8'>{props?.applicationData?.data?.applicationNo}</div> */}
                                    <div className='text-sm text-gray-600'>Application No.</div>
                                </div>
                                <div className="image overflow-hidden text-center mt-10">
                                    <div className='text-gray-900 font-bold text-lg leading-8'>{nullToNA(props?.applicationData?.data?.apply_date)}</div>
                                    <div className='text-sm text-gray-600'>Apply Date</div>
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-9/12 mx-2 h-auto">
                            <div className="bg-white p-3 shadow-xl rounded-sm">
                                <div className="flex items-center pl-4 space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <GrHomeRounded />
                                    </span>
                                    <span className="tracking-wide">{nullToNA(props?.applicationData?.data?.fullDetailsData?.cardArray?.headerTitle)}</span>
                                    {props?.applicationData?.data?.parked == true && <span className='float-right text-right text-red-600 px-4  border border-red-500 rounded-lg'>Back to Citizen Case</span>}
                                </div>


                                {/* DETAILS DATA */}
                                <div className="text-gray-700 py-6">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        {
                                            props?.applicationData?.data?.fullDetailsData?.cardArray?.data?.map((data) => (
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">{nullToNA(data?.displayString)} : </div>
                                                    <div className="px-4 py-2">{nullToNA(data?.value)}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='pb-2 mt-2 pl-4'>
                                        {props?.permissions?.can_view_form && <button className={`float-left mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => window.open(`${props?.workflow?.fullDetailsUrl}/${props?.id}`, '_blank')}>View Full Details</button>}
                                        {/* <button className={`float-left mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(`${props?.workflow?.fullDetailsUrl}/${props?.id}/workflow/${props?.tabIndex}`)}>View Full Details</button> */}
                                        {props?.permissions?.can_edit && <button className={`float-right mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => window.open(`${props?.workflow?.formUrl}/${props?.id}`, '_blank')}>Edit Form</button>}
                                    </div>
                                </div>
                            </div>

                            <div className="md:my-4">

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default PilotWorkflowDataCard
/**
 * Exported to :
 * 1. PropertySafDetailsTabs Component
 * 
 */