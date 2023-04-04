//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import apiLinks from '@/Components/ApiList/ObjectionRectificationApi'
import 'animate.css'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { FcDepartment } from 'react-icons/fc'
import { ColorRing } from 'react-loader-spinner'
import { TbWebhook } from 'react-icons/tb'
import { RiBuilding2Fill } from 'react-icons/ri'
import { contextVar } from '@/Components/Context/Context'
import { useContext } from 'react'
import { FiMinusCircle } from 'react-icons/fi'
import { BsPlusCircle } from 'react-icons/bs'
import BottomErrorCard from '@/Components/Common/BottomErrorCard'

const ObjectionForgery = (props) => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [documentUpload, setdocumentUpload] = useState()
  const [isLoader, setisLoader] = useState(false)
  // const [otherReason, setotherReason] = useState('')
  const [noDoc, setnoDoc] = useState(1)
  const [doc1, setdoc1] = useState()
  const [doc2, setdoc2] = useState()
  const [doc3, setdoc3] = useState()
  const [doc4, setdoc4] = useState()
  const [doc5, setdoc5] = useState()
  const [erroState, seterroState] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

  let inputStyle =
    "border-2 border-slate-300 focus:border-2 focus:border-blue-400 rounded-md px-4 py-1 w-1/2";

  const validationSchema = yup.object({
    // forgeryReason : yup.string().required('Please select or write the reason'),
    evidence1: yup.mixed().required('Please upload the document as a proof')
  })

  const formik = useFormik({
    initialValues: {
      forgeryReason: [],
      otherReason: '',
      evidence1: '',
      evidence2: '',
      evidence3: '',
      evidence4: '',
      evidence5: ''
    },

    onSubmit: (values) => {
      console.log("getting forgery values => ", values)
      submitForm(values)
    }, validationSchema

  })

  const submitForm = (values) => {
    console.log("Entering in sumbission form => ", values)
    setisLoading2(true)

    let fd = new FormData();
    fd.append("forgeryReason", values.forgeryReason)
    // {values.otherReason != '' && fd.append("otherReason", values.otherReason)}
    fd.append("evidence1", doc1)
    { noDoc > 1 && fd.append("evidence2", doc2) }
    { noDoc > 2 && fd.append("evidence3", doc3) }
    { noDoc > 3 && fd.append("evidence4", doc4) }
    { noDoc > 4 && fd.append("evidence5", doc5) }

    console.log("Before send => ", fd)

    axios.post(fd, ApiHeader())
      .then((res) => {
        console.log("Forgery Submitted", res)
        if (res?.data?.status == false) {
          activateBottomErrorCard(true, 'Error occured in submitting objection application. Please try again later.')
        }
        setisLoading2(false)
      })
      .catch((err) => {
        console.log("Forgery submission error  => ", err)
        activateBottomErrorCard(true, 'Error occured in submitting objection application. Please try again later.')
        setisLoading2(false)
      })

  }

  const handleChange = (e) => {
    if (e.target.name == "evidence1") {
      let file = e.target.files[0];
      setdoc1(e.target.files[0]);
      console.log("File on change..", file);
    }

    if (e.target.name == "evidence2") {
      let file = e.target.files[0];
      setdoc2(e.target.files[0]);
      console.log("File on change..", file);
    }

    if (e.target.name == "evidence3") {
      let file = e.target.files[0];
      setdoc3(e.target.files[0]);
      console.log("File on change..", file);
    }

    if (e.target.name == "evidence4") {
      let file = e.target.files[0];
      setdoc4(e.target.files[0]);
      console.log("File on change..", file);
    }

    if (e.target.name == "evidence5") {
      let file = e.target.files[0];
      setdoc5(e.target.files[0]);
      console.log("File on change..", file);
    }
  };

  const addDocFun = () => {
    { noDoc != 5 && setnoDoc(noDoc + 1) }
  }

  const decDocFun = () => {
    { noDoc != 1 && setnoDoc(noDoc - 1) }
  }

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }

  return (
    <>

      <ToastContainer position="top-right" autoClose={2000} />

      {isLoading2 && <BarLoader />}
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      {/* <div className='text-right relative top-0 animate__animated animate__fadeInDown'>
                <span className='bg-indigo-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4'><TbWebhook className='inline' /> Objection</span>
            </div> */}

      {/* <h1 className="mt-6 mb-2 font-serif font-semibold relative text-gray-600">
        <RiBuilding2Fill className="inline mr-2" />
       Forgery
      </h1> */}

      <div className="mt-6 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center capitalize text-base poppins mb-4 shadow-md py-2 rounded-md">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[30px]">
            <FcDepartment />
          </span>
          <span className="font-semibold poppins text-xl">
            Forgery Objection
          </span>
        </div>
      </div>

      <div className="poppins my-2">
        Under Section 167 of the Jharkhand Municipal Act 2011, In this objection form citizen can file the following objections in Forgery case.
      </div>

      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        className="h-max p-4 mt-4 px-6"
      >
        {/* Title */}
        {/* <div className="flex flex-row justify-evenly items-center md:w-[20vw] w-[60vw] capitalize text-base">
          <span className='font-extrabold text-[30px]'><FcDepartment/></span>
          
          className='shadow-md rounded-md p-2 bg-white'>Forgery Objection</span>
        </div> */}

        {/* Correction Cards */}

        {/* <div className="mt-6 flex flex-wrap flex-col gap-y-4"> */}
        <div className="bg-white py-4 shadow-sm rounded-md transition-all duration-300 flex flex-wrap flex-col gap-y-4 px-2">
          {/* Name Card */}
          <div className="bg-zinc-50 rounded-md shadow-sm">
            <div className="px-4 py-1.5 text-gray-800 font-semibold capitalize poppins tracking-wider">
              {" "}
              Select Reasons for Forgery
            </div>
            <hr className='h-0 border-1 border-gray-300' />
            <div className="text-sm px-4 py-1.5 grid grid-cols-12">

              <div className='flex flex-row space-x-2 items-center py-2  col-span-12'>
                <label className='flex flex-row space-x-2 items-center'><input type="checkbox" name="forgeryReason" className='rounded-md ' value='Instead of the owner of the building, the tenant or other occupy the holding in his name.' />
                  <p>Instead of the owner of the building, the tenant or other occupy the holding in his name.</p></label>
              </div>

              <div className='flex flex-row space-x-2 items-center py-2  col-span-12'>
                <label className='flex flex-row space-x-2 items-center'><input type="checkbox" name="forgeryReason" value='After the death of the owner of the holding registered in the corporation requisition register, only one shareholder obtained the holding number in his name.' />
                  <p>After the death of the owner of the holding registered in the corporation requisition register, only one shareholder obtained the holding number in his name.</p></label>
              </div>

              <div className='flex flex-row space-x-2 items-center py-2  col-span-12'>
                <label className='flex flex-row space-x-2 items-center'><input type="checkbox" name="forgeryReason" value='Application has been made for establishment of holding by more than one claimant for the same building.' />
                  <p>Application has been made for establishment of holding by more than one claimant for the same building.</p></label>
              </div>

              <div className='flex flex-row space-x-2 items-center py-2  col-span-12'>
                <label className='flex flex-row space-x-2 items-center'> <input type="checkbox" name="forgeryReason" value={formik.values.otherReason} />
                  <p>Other Reason :</p></label>
                <textarea type="text" name="otherReason" value={formik.values.otherReason} placeholder='Enter any other reason...' className={inputStyle} rows={2} />


              </div>

            </div>
          </div>

          {/* Evidence Documnent */}
          <div className="bg-zinc-50 rounded-md shadow-sm relative">
            <div className="px-4 py-1.5 text-gray-800 font-semibold capitalize poppins tracking-wider">
              {" "}
              Upload Evidence for Forgery
            </div>
            <hr className='h-0 border-1 border-gray-300' />
            <div className='flex items-center poppins absolute top-2 right-2 text-xs text-gray-700 px-2 py-1 rounded-md shadow-sm cursor-pointer bg-green-200 hover:bg-green-300' onClick={addDocFun}>
              <BsPlusCircle /> &nbsp; Add Document
            </div>
            {noDoc > 1 && <div className='flex items-center poppins absolute top-2 right-52 text-xs text-gray-700 px-2 py-1 rounded-md shadow-sm cursor-pointer bg-red-200 hover:bg-red-300 animate__animated animate__fadeIn animate__faster' onClick={decDocFun}>
              <FiMinusCircle /> &nbsp; Remove Document
            </div>}
            <div className="text-sm px-4 py-1.5 grid grid-cols-12">

              {noDoc > 0 && <div className="col-span-12 md:col-span-12 poppins my-2 animate__animated animate__fadeIn animate__faster">
                Evidence 1 :{" "}
                <span>
                  <input
                    type="file"
                    className='shadow-md rounded-md p-2 bg-white'
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg"
                    name="evidence1"
                    id=""
                  />
                </span>
              </div>}

              {noDoc > 1 && <div className="col-span-12 md:col-span-12 poppins my-2 animate__animated animate__fadeIn animate__faster">
                Evidence 2 :{" "}
                <span>
                  <input
                    type="file"
                    className='shadow-md rounded-md p-2 bg-white'
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg"
                    name="evidence2"
                    id=""
                  />
                </span>
              </div>}

              {noDoc > 2 && <div className="col-span-12 md:col-span-12 poppins my-2 animate__animated animate__fadeIn animate__faster">
                Evidence 3 :{" "}
                <span>
                  <input
                    type="file"
                    className='shadow-md rounded-md p-2 bg-white'
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg"
                    name="evidence3"
                    id=""
                  />
                </span>
              </div>}

              {noDoc > 3 && <div className="col-span-12 md:col-span-12 poppins my-2 animate__animated animate__fadeIn animate__faster">
                Evidence 4 :{" "}
                <span>
                  <input
                    type="file"
                    className='shadow-md rounded-md p-2 bg-white'
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg"
                    name="evidence4"
                    id=""
                  />
                </span>
              </div>}

              {noDoc > 4 && <div className="col-span-12 md:col-span-12 poppins my-2 animate__animated animate__fadeIn animate__faster">
                Evidence 5 :{" "}
                <span>
                  <input
                    type="file"
                    className='shadow-md rounded-md p-2 bg-white'
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg"
                    name="evidence5"
                    id=""
                  />
                </span>
              </div>}

              {(formik.touched.evidence && formik.errors.evidence) && <span className='text-xs text-red-500 col-span-9'>{formik.errors.evidence}</span>}

            </div>
          </div>

          {/* =========Note======== */}
          <div className="text-xs text-red-600 col-span-9 italic mx-4 my-0">
            {" "}
            Note :
            Only .pdf , .jpg and .jpeg file accepted..
          </div>

        </div>


        {/* Buttons */}
        <div className="flex flex-row flex-wrap justify-between items-center mt-4">
          <div
            onClick={props.closePopUp}
            className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-dotted focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Close
          </div>
          <div>
            <button
              type="submit"
              className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-dotted focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </form>

    </>
  )
}

export default ObjectionForgery