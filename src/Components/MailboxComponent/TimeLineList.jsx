//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - TimeLineList
//    DESCRIPTION - TimeLineList Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function TimeLineList(props) {
    return (
        <>
            <li className="mb-10 ml-6">
                <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-sky-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg className="w-3 h-3 text-sky-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Application sent from {props.sender} {props.activeStatus ? <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded  ml-3">Latest</span> : ''}</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Action on {props.dateTime}</time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{props.comment} .</p>

            </li>
        </>
    )
}

export default TimeLineList
