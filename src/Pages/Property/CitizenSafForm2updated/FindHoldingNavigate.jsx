//////////////////////////////////////////////////////////////////////////////////////
//    Author - Swati Sharma
//    Version - 1.0
//    Date - 20 oct 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenSafEntryScreen
//    DESCRIPTION - CitizenSafEntryScreen Component to find holding for mutataion in property
//////////////////////////////////////////////////////////////////////////////////////


import { useState, useEffect } from 'react'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { TbSearch } from 'react-icons/tb'
import { FcHome } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'


function FindHoldingNavigate(props) {

    const { api_getHoldingDetails } = CitizenApplyApiList()


    const notify = (message) => {
        toast.dismiss(message)
        toast.info(message)
    }

    const [mutationStatus, setmutationStatus] = useState('col-span-12 md:col-span-4 py-6')// to maintain the hide show state of mutation
    const [dataListStatus, setDataListStatus] = useState(false) //to toggle hide show of data list table after finding the holding data from search holding
    const [holdingData, setholdingData] = useState() //to hold found holding data
    const [asstypeStatus, setasstypeStatus] = useState('both') //to hold found holding data

    const navigate = useNavigate()
    //function to hide and show and animate assessment options
    const assStatus = (type) => {
        setasstypeStatus(type)

        if (type == 'mu') {
            setmutationStatus('col-span-12 md:col-span-12 py-0 block')
        }
    }

    const validationSchema = yup.object({
        holdingNo: yup.string().required('Enter holding no.')
    })
    const formik = useFormik({
        initialValues: {
            holdingNo: ''
        },

        onSubmit: (values, resetForm) => {
            alert(JSON.stringify(values, null, 2));
            console.log('propertyaddressdetails ', values)
            findHolding(values)
        }
        , validationSchema
    })

    // let holdingNo = Hol / Ward / 001

    //function to fetch holding data and set into data table
    const findHolding = (values) => {
        // let holdingNo = formik.holdingNo

        let token = window.localStorage.getItem('token')
        console.log('token at basic details is post method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
        const requestBody = {
            "wardId": 50,
            "holdingNo": values.holdingNo

        }
        console.log('form request body....', requestBody)

        // return
        axios.post(`${api_getHoldingDetails}`, requestBody, header)
            .then(function (response) {

                console.log('verified holding no', response.data)
                setholdingData(response.data)


            })
            .catch(function (error) {
                console.log('errorrr....holding ', error);
            })
    }

    const handleClose = () => {
        props.fun(false)
    }

    console.log("data for mutation ....", holdingData)
    return (
        <>
            <div className=''>
                <div className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center bg-gray-600 opacity-95 '>

                    <section className={`${(mutationStatus == 'col-span-12 md:col-span-12 py-0 block') ? 'block' : 'block'} w-11/12 md:w-9/12 mx-auto mt-0 md:mt-32 text-gray-600 bg-white  body-font overflow-hidden p-3   `}>
                        <div className='flex'>
                            <div className='flex-1'>
                                <h1 className="text-gray-900 text-xl title-font font-medium mb-4 flex items-center"><FcHome className="inline" />
                                    <p className='ml-3 '>Find Holding</p>
                                </h1>
                            </div>
                            <div className='flex-1 '>
                                <button className='float-right' onClick={handleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-red-500">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="  grid grid-cols-6">
                                <div className=" flex-1 form-group mb-3 col-span-4 md:col-span-2">
                                    <label className="form-label inline-block mb-1 text-gray-900 text-sm font-semibold "><small className="block mt-1 text-sm font-semibold text-red-600 inline  ">*</small>Holding no.</label>
                                    <input {...formik.getFieldProps('holdingNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter holding no." />
                                    <span classNameName="text-red-600 absolute text-xs">{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</span>
                                </div>
                                <div className="flex-1 form-group mb-2 col-span-1 md:col-span-1 align-bottom">
                                    <label className="form-label inline-block mb-1 text-gray-900 text-sm font-semibold invisible "><small className="block mt-1 text-sm font-semibold text-red-600 inline  ">*</small>Enter Holding no.</label>
                                    <div className='md:px-10 text-right'>
                                        <button onClick={() => setDataListStatus(true)} type="submit" className=" px-6 py-2 bg-green-600 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"><TbSearch className="inline text-sm font-bold" />Find</button>
                                    </div>
                                </div>
                            </div>
                        </form>


                        {/* found holding */}
                        <ToastContainer />
                        {
                            dataListStatus && <div className="py-2 overflow-x-auto bg-white">
                                <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">

                                    <table className="min-w-full leading-normal">
                                        <thead className='font-bold text-left text-sm bg-sky-300'>
                                            <tr >
                                                <th className="px-2 py-3 border-b border-gray-200 text-gray-900  text-left text-xs uppercase text-left">Holding No</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-gray-900  text-left text-xs uppercase text-left">Owner Name</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-gray-900  text-left text-xs uppercase text-left">Guardian Name</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-gray-900  text-left text-xs uppercase text-left">Address</th>
                                                <th className="px-2 py-3 border-b border-gray-200 text-gray-900  text-left text-xs uppercase text-left">Action</th>


                                            </tr>
                                        </thead>

                                        <tbody className="text-sm">
                                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                                <td className="px-2 py-2 text-sm text-left text-gray-900 font-bold">{holdingData?.data?.holding_no}</td>
                                                {holdingData?.data?.owners?.map((items) => (
                                                    <>
                                                        <td className="px-2 py-2 text-sm text-left text-gray-900 font-bold">{items?.owner_name}</td>
                                                        <td className="px-2 py-2 text-sm text-left text-gray-900 font-bold">{items?.guardian_name}</td>

                                                    </>
                                                ))}
                                                <td className="px-2 py-2 text-sm text-left text-gray-900 font-bold">{holdingData?.data?.prop_address}</td>
                                                <td className="px-2 py-2 text-sm text-left" onClick={() => notify()}>
                                                    {(asstypeStatus == 'mu' || asstypeStatus == 'both') && <button onClick={() => navigate(`/safform/mu/${holdingData?.data?.property_id}`)} type="button" className="ml-2 px-2 py-1 bg-orange-300 text-black font-bold hover:text-white text-xs leading-tight  rounded  hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out">Mutation</button>}
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        }
                    </section>

                </div>
            </div>


        </>
    )
}

export default FindHoldingNavigate