import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
// import trade from '../assets/api/trade.png';
// import property from '../assets/api/property.png'
// import water from '../assets/api/water.png'

function MyProfileContent(props) {

    const apiBaseUrl = "192.168.0.166/"
    console.log("data received through props : ", props.apiData);

    let basecopied = <span className='text-blue-400 px-8'><DoneIcon />copied </span>;
    let endCopied = <span className='text-blue-400 px-8'><DoneIcon />copied </span>;
    let fullCopied = <span className='text-blue-400 px-8'><DoneIcon />copied </span>;

    let copyBaseText = <span className='bg-cyan-100 text-slate-600 text-xs mx-4 px-4 py-1 shadow-sm shadow-black bg-white-400 rounded-xl'>Copy baseUrl</span>
    let CopyEndText = <span className='bg-cyan-100 text-slate-600 text-xs mx-4 px-4 py-1 shadow-sm shadow-black bg-white-400 rounded-xl'>Copy EndPoint</span>
    let CopyFullUrl = <span className='bg-cyan-100  text-slate-600 text-xs mx-4 px-4 py-1 shadow-sm shadow-black bg-white-400 rounded-xl'>Copy Full Url</span>


    const [CopyBase, setCopyBase] = useState(copyBaseText);
    const [CopyEnd, setCopyEnd] = useState(CopyEndText);
    const [CopyFull, setCopyFull] = useState(CopyFullUrl);

    const handleBaseCopy = () => {
        navigator.clipboard.writeText(apiBaseUrl)
        setCopyBase(basecopied)
    }
    const handleEndCopy = () => {
        navigator.clipboard.writeText(props.apiData[0].end_point)
        setCopyEnd(endCopied)
    }
    const handleFullUrlCopy = () => {
        navigator.clipboard.writeText(apiBaseUrl + props.apiData[0].end_point)
        setCopyFull(fullCopied)
    }

    return (
        <>
            {/* {props.apiData?.map((items) => ( */}
            <div class="container mx-auto p-5">
                <div class="md:flex no-wrap md:-mx-2 ">
                    <div class="w-full md:w-full md:mx-2">
                        <div class=" ">
                            <div class="image overflow-hidden">
                                {/* <img class="h-auto w-36 mx-auto"
                                        src={property}
                                        alt="" /> */}

                                <h1 className='text-yellow-500 font-bold text-4xl text-center'>{props.apiData[0]?.category} <span className='text-sm'>
                                    <button onClick={handleFullUrlCopy} className=" text-cyan-600 font-bold py-2 px-4 rounded">{CopyFull}</button>
                                </span>
                                </h1>

                                <hr className='mt-2 pb-4' />
                            </div>
                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Base Url :
                                <span className="text-green-600 font-bold text-sm leading-8 my-1"> {apiBaseUrl}</span>
                                <button
                                    onClick={handleBaseCopy}
                                    className=' '
                                >
                                    {CopyBase}
                                </button>
                            </h1>
                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Api EndPoint :
                                <span className="text-green-600 font-bold text-sm leading-8 my-1"> {props.apiData[0]?.end_point}</span>
                                <button
                                    onClick={handleEndCopy}
                                    className=' '
                                >
                                    {CopyEnd}
                                </button>
                            </h1>
                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Pre-conditions :
                                <span className="text-green-600 font-bold text-sm leading-8 my-1"> {props.apiData[0]?.pre_condition}</span>
                            </h1>

                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Request payload :
                                <span className="text-green-600 font-bold text-sm leading-8 my-1"> {props.apiData[0]?.request_payload}</span>
                            </h1>
                            <label class="text-gray-600 font-bold font-lg leading-8 my-1">Response payload : </label>
                            <div className='border overflow-auto h-36 bg-gray-600 resize '>
                                        
                                <code className="text-sky-400 font-bold text-xs leading-4 my-1 ">
                                    <pre >{props.apiData[0]?.response_payload}</pre>
                                </code>

                            </div>
                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Response Format :
                                <span className="text-green-600 font-bold text-base leading-8 my-1"> JSON</span>
                            </h1>
                            <h3 class="text-gray-600 font-lg font-bold  leading-6">Description : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData[0]?.usage}</p>
                            {/* ////////////// */}


                            <h3 class="text-gray-600 font-lg font-bold  leading-6">Remarks : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData[0]?.remarks}</p>

                            {/* <h3 class="text-gray-600 font-lg font-bold  leading-6">Description : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData.description}</p>
                            
                            <h3 class="text-gray-600 font-lg font-bold  leading-6">Description : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData.description}</p>
                            
                            <h3 class="text-gray-600 font-lg font-bold  leading-6">Description : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData.description}</p> */}


                            {/* ///////////// */}
                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Status</span>
                                    <span class="ml-auto">
                                        {props.apiData[0]?.discontinued == 0 ? <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span> :
                                            <span class="bg-gray-500 py-1 px-2 rounded text-white text-sm">Discontinued</span>}
                                    </span>
                                </li>

                                <li class="flex items-center py-3">
                                    <span>Revision Count</span>
                                    <span class="ml-auto">{props.apiData[0]?.revision_no}st</span>
                                </li>
                                <li class="flex items-center py-3">
                                    <span>Created on</span>
                                    <span class="ml-auto">July 07, 2022</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            {/* ))} */}




        </>
    )
}

export default MyProfileContent