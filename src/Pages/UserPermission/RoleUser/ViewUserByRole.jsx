import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
// import trade from '../assets/api/trade.png';
// import property from '../assets/api/property.png'
// import water from '../assets/api/water.png'

function MyProfileContent(props) {
    console.log(props.apiData);
    let copied = <span className='text-blue-400 px-8'><DoneIcon />copied </span>;
    let copy = <span className='text-slate-600 text-sm mx-4 px-4 py-2 shadow-sm shadow-black bg-white-400 rounded-xl'>Copy url</span>
    const [CopyText, setCopyText] = useState(copy);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.apiData.api_url)
        setCopyText(copied)
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

                                <h1 className='text-yellow-500 font-bold text-4xl text-center'>{props.apiData.fname} {props.apiData.lname}</h1>
                                <hr className='mt-2 pb-4' />
                            </div>
                            {/* <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Url :
                                <span className="text-green-600 font-bold text-base leading-8 my-1"> {props.apiData.lname}</span>
                                <button
                                    onClick={handleCopy}
                                >
                                    {CopyText}
                                </button>
                            </h1> */}

                            {/* <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Pre-conditions :
                                <span className="text-green-600 font-bold text-base leading-8 my-1"> {props.apiData.pre_conditions}</span>
                            </h1>

                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Expected payload :
                                <span className="text-green-600 font-bold text-base leading-8 my-1"> {props.apiData.expected_payload}</span>
                            </h1>
                            <h1 class="text-gray-600 font-bold font-lg leading-8 my-1">Response Format :
                                <span className="text-green-600 font-bold text-base leading-8 my-1"> {props.apiData.response_format}</span>
                            </h1>
                            <h3 class="text-gray-600 font-lg font-bold  leading-6">Developer remark : </h3>
                            <p class="text-sm font-semibold text-green-600 hover:text-gray-600 leading-6">{props.apiData.remarks}</p> */}
                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Status</span>
                                    <span class="ml-auto">
                                        {props.apiData.status == 1 ? <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span> :
                                            <span class="bg-gray-500 py-1 px-2 rounded text-white text-sm">Inactive</span>}
                                    </span>
                                </li>
                                <li class="flex items-center py-3">
                                    <span>Designation </span>
                                    <span class="ml-auto">Unknown</span>
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