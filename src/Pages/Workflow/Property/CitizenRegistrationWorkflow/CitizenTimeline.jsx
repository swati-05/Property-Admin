//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenTimeline (closed)
//    DESCRIPTION - CitizenTimeline Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { useQuery } from "react-query";
import axios from 'axios'

function CitizenTimeline() {

    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return axios.get("http://localhost:3001/timeLine");
    });
    return (
        <>
            <h1 className='text-center bg-gray-200 h-10 grid items-center font-semibold'>Timeline</h1>
            <div className="container bg-white mx-auto w-full h-full">
                <div className="relative wrap overflow-hidden md:p-10 h-full">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ "left": "50%" }}></div>
                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                        <div className="order-1 w-5/12"></div>
                        <div className="z-10 flex items-center order-1 bg-orange-300 shadow-xl w-6 h-6 rounded-full">
                            <h1 className="mx-auto font-semibold text-sm text-white">2</h1>
                        </div>
                        <div className="order-1 bg-orange-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <h3 className="mb-1 font-bold text-gray-800 text-xs">Application Sent To dealing Assistant</h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-60 text-xs">20 jan 2022. </p>
                            <p className="text-sm mt-2 leading-snug tracking-wide text-gray-600 text-opacity-100 text-xs">Everything is correct. </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CitizenTimeline
/**
 * Exported to :
 * 1 PropertySafWorkflowTimeline Component
 * 
 */