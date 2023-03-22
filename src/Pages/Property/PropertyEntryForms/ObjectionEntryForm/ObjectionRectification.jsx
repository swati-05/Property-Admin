//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : ObjectionRectification
// Description : Objection Rectification Index page
//////////////////////////////////////////////////////////////////////

import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import { TbWebhook } from 'react-icons/tb'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import apiLinks from '@/Components/ApiList/ObjectionRectificationApi'
import 'animate.css'
import ObjectionRectificationTable from './ObjectionRectificationTable'

const ObjectionRectification = () => {

  const [updation, setupdation] = useState(false)
  const [ownerData, setownerData] = useState()

  const {postHolding} = apiLinks()

  const validationSchema = yup.object({
    holdingNo : yup.string().required("Enter holding number")
  })

  const formik = useFormik({
    initialValues: {
      holdingNo : ''
    }, 

    onSubmit: (values) => {
      console.log("--1-- holding no. => ", values)
      submitHoldingNo(values)
    }, validationSchema

  })

  const submitHoldingNo = (values) => {
    console.log("--2-- entering to submit function")
    axios.post(postHolding,values, ApiHeader())
    .then((res) => {
      setupdation(true)
      toast.success("Holding no. submitted")
      console.log("--3-- holding no. submitted", res.data)
      setownerData(res.data)
    })
    .catch((err) => {
      console.log('--3-- holding submission error => ', err)
      toast.error("Something went wrong !!")
    })
  }

  return (
    <>
    
    <ToastContainer position="top-right" autoClose={2000} />
      <div className="text-right relative top-0 animate__animated animate__fadeInDown">
        <span className="bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4">
          <TbWebhook className="inline" /> Objection
        </span>
      </div>

      <h1 className="mt-6 mb-2 font-serif font-semibold absolute text-gray-600">
        <RiBuilding2Fill className="inline mr-2" />
        Rectification Petition
      </h1>

      {/* Main */}
      <div className='mt-[4rem] md:mx-8'>

       {updation ? <ObjectionRectificationTable ownerData={ownerData}/> : <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className='animate__animated animate__fadeInDown flex flex-wrap flex-col md:flex-row md:space-x-4 space-y-4 md:items-center md:justify-evenly justify-center items-evenly border-t-2 border-l-2 border-zinc-100 rounded-md shadow-lg py-3 pb-6 bg-sky-100 hover:bg-sky-200 transition-all duration-300 px-4'>

          <div>
            <label className="form-label inline-block mt-2 text-gray-600 text-sm font-semibold" htmlFor="holdingNo">Holding No. (15 digits) : </label>
          </div>

          <div>
            <input type="text" name="holdingNo" id="holdingNo" maxLength={15} className="form-control block md:w-[35rem] w-[17rem] px-3 py-1.5 md:py-1 md:text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md text-sm" />
          </div>

          <div>
            <button type="submit" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"> Submit </button>
          </div>

        </form> }

      </div>
    
    </>
  )
}

export default ObjectionRectification