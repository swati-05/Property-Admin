import React from 'react'

function WorkflowTimelineCardLeft(props) {
    return (
        <div>
            <div className="container bg-white mx-auto w-full">
                <div className="relative wrap overflow-hidden md:p-10 md:py-4 h-full">
                    {/* <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ "left": "50%" }}></div> */}
                    <div className="mb-0 flex justify-between items-center w-full right-timeline">

                        <div className="relative order-1 bg-sky-100 rounded-lg shadow-xl w-5/12 px-6 py-4">
                            <div className="z-10 flex items-center bg-sky-400 shadow-xl w-6 h-6 rounded-full absolute top-0 left-0">
                                <h1 className="mx-auto font-semibold text-sm text-white">{props?.index + 1}</h1>
                            </div>
                            <h3 className="mb-1 font-bold text-gray-900 text-xs">{props?.data?.commentedBy}</h3>
                            <p className=" leading-snug tracking-wide text-gray-800 text-xs"><span className='text-gray-600'>Comment</span> : {props?.data?.message} </p>
                            <div><p className="leading-snug tracking-wide text-gray-800 text-xs"><span className='text-gray-600'>Received date</span> : {props?.data?.forward_date}</p></div>
                            <div><p className="leading-snug tracking-wide text-gray-800 text-xs"><span className='text-gray-600'>forward date</span> : {props?.data?.forward_date}</p></div>
                            {/* <p className=" leading-snug tracking-wide text-gray-600 text-opacity-60 text-xs">{props?.data?.remarks != '' ? props?.data?.remarks : <span className='text-red-500 font-bold'>Application is pending here </span>} </p> */}
                            {/* <p className=" mt-2 leading-snug tracking-wide text-gray-600 text-opacity-100 text-xs">{JSON.stringify(props?.data?.receiving_date).slice(1,17)}</p> */}
                        </div>
                        {/* <div className="z-10 flex items-center order-1 bg-sky-300 shadow-xl w-6 h-6 rounded-full">
                            <h1 className="mx-auto font-semibold text-sm text-white">{props?.index + 1}</h1>
                        </div>
                        <div className="order-1 w-5/12"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkflowTimelineCardLeft