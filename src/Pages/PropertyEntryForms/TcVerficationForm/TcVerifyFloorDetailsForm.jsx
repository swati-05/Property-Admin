import { useFormik } from 'formik'
import React, { useState } from 'react'
import floor from './Assets/parquet.png'
import FormComponentForTcV from './FormComponentForTcV'


function TcVerifyFloorDetailsForm(props) {
    const [floorList, setfloorList] = useState([])

    console.log("floor list", floorList)
    console.log("application data for tc verification form...", props?.applicationData?.data?.floors)
    console.log("application  master...", props?.masterData)

    return (
        <>
            <div className='w-full overflow-x-scroll'>
                <div className=''>
                    <div className="flex items-center pb-24">
                        <div className="mr-2 bg-white rounded-full p-2">
                            <img src={floor} alt="rain" className='w-4' />
                        </div>
                        <span className="font-medium">Floor Detail</span>
                    </div>
                    <div className="col-span-4  -mt-20 overflow-x-scroll">
                        <table className='w-full leading-normal table-auto overflow-x-scroll'>
                            <thead className='font-bold text-left text-sm bg-sky-50'>
                                <tr className=" border-b border-gray-200 text-gray-800  text-xs text-left flex justify-between">
                                    <td className=''>#</td>
                                    <td className="  ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal  bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus: focus:border-blue-600 focus:outline-none  " >
                                            Floor No </span>
                                       
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal  bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Usage Type</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Occupancy Type</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Construction Type</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Built Up Area</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            From Date</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Upto Date</span>
                                        
                                    </td>
                                    <td className=" ">
                                        <span  className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal   bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0  focus: focus:border-blue-600 focus:outline-none  " >
                                            Action</span>
                                        
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {props?.applicationData?.data?.floors?.map((data, index) => (
                                    <>
                                        <tr className=" border-b border-gray-200 text-gray-800  text-xs text-left flex justify-between">
                                            <td className=''>{index + 1}</td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.floor_name}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.usage_type}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.occupancy_type}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.construction_type}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.builtup_area}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.date_from}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                    {data?.date_upto}
                                                </span>
                                            </td>
                                            <td className="">
                                                <span type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  ">
                                                </span>
                                            </td>
                                        </tr>
                                        <FormComponentForTcV data={data} collectAllFloorData={props.collectAllFloorData} masterData={props?.masterData} key={index} />

                                    </>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
           
           

            </div>
        </>
    )
}

export default TcVerifyFloorDetailsForm