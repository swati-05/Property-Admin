//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import React, { useState } from 'react'
import {RiBuilding2Line} from 'react-icons/ri'
import {FcDepartment} from 'react-icons/fc'
import { useNavigate, useParams } from 'react-router-dom'
import {TbWebhook} from 'react-icons/tb'
import { contextVar } from "@/Components/Context/Context";
import { useContext } from 'react'
import { useEffect } from 'react'
import './assets/fonts/Font.css'
import {BsArrowBarLeft, BsArrowLeft, BsArrowRight} from 'react-icons/bs'
import Modal from 'react-modal'
import ObjectionRectificationTable from './ObjectionRectificationTable'
import ObjectionFormIndex from './ObjectionFormIndex'
import ObjectionForgery from './ObjectionForgery'
import { ImCross } from 'react-icons/im'
import ApplicationSubmitScreen from '../ApplicationSubmitScreen'
import assessment from './assets/images/assessment.png'
import objection from './assets/images/objection.png'
import forgery from './assets/images/forgery.png'

// Modal
const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: 'none'
  },
};
Modal.setAppElement('#root');

const ObjectionIndex = () => {

  const {id} = useParams()

    const navigate = useNavigate()

    const [index, setindex] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [appId, setappId] = useState('')
    const [openSubmit, setopenSubmit] = useState(false)
    const [heading, setheading] = useState('')

    const openModal = () => {
      setIsOpen(true)
      setopenSubmit(false)
    }
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    const modalAction = (flag) => {
        setindex(flag)
        openModal()
    }

    const openSubmitScreen1 = (appId) => {
      console.log("app id => ", appId)
      setappId(appId)
      setheading("Clerical Objection")
      closeModal()
      setopenSubmit(true)
    }

    const openSubmitScreen2 = (appId) => {
      setappId(appId)
      closeModal()
      setopenSubmit(true)
      setheading("Assessment Objection")
    }

    const openSubmitScreen3 = (appId) => {
      setappId(appId)
      closeModal()
      setopenSubmit(true)
      setheading("Forgery Objection")
    }
   
    return (
      <>
  
      <div className='px-6 mt-[2rem] flex flex-wrap flex-col gap-4 '>
  
        {/* =====Heading====== */}
        <div>
        <div className='flex flex-row justify-evenly items-center space-x-2 w-[10vw] my-4 md:mx-8 mx-10 poppins'>
             <span className='font-extrabold text-[30px]'><FcDepartment/></span>
             <span className='text-lg font-bold uppercase'>Objections</span>
          </div>
          <p className='text-xs mb-2 md:mx-2 mx-10 poppins italic  hover:text-sm cursor-pointer hover:tracking-wide transition-all duration-300'>
          <b>Objection</b> is for helping you in any issues related to Property.
        </p>

      </div>

      {/* =======Cards======= */}
      <div className='flex flex-row flex-wrap gap-4 w-full poppins'>

        {/* ====Card 1====== */}
        <div className='md:w-[30%] rounded-sm shadow-sm bg-zinc-50 hover:scale-105 transition-all duration-300 hover:shadow-md'>
          <div className='bg-gradient-to-r from-blue-200 to-blue-100 h-[25vh] flex items-center rounded-sm'>
            <img src={objection} alt="" srcset="" className='rounded-sm hover:scale-110 transition-all duration-300' />
          </div>
          <div className='poppins font-semibold px-4 py-1.5'>
            Clerical Mistake
          </div>
          <div className='poppins text-xs px-4 py-1.5'>
            This <span className="font-semibold">Clerical Mistake</span> is for correction of personal details.
          </div>
          {/* <div className='px-4 py-1.5 poppins' onClick={() => navigate(`/objection-clerical-mistake/${id}`)}> */}
          <div className='px-4 py-1.5 poppins' onClick={() => modalAction(1)}>
            <button className='bg-blue-100 text-blue-600 w-full flex gap-x-1 items-center justify-center py-1.5 rounded-sm text-sm transition-all duration-300 hover:gap-x-4 '>
              <span>Apply</span> <span><BsArrowRight/></span>
            </button>
          </div>
        </div>

          {/* ====Card 2====== */}
          <div className='md:w-[30%] rounded-sm shadow-sm bg-zinc-50 hover:scale-105 transition-all duration-300 hover:shadow-md'>
          <div className='bg-gradient-to-r from-blue-200 to-blue-100 h-[25vh] flex flex-row justify-center items-center rounded-sm'>
            <img src={assessment} alt="" srcset="" className=' rounded-sm hover:scale-110 transition-all duration-300' />
          </div>
          <div className='poppins font-semibold px-4 py-1.5'>
            Assessment Error
          </div>
          <div className='poppins text-xs px-4 py-1.5'>
          This <span className="font-semibold">Assessment Error</span> is for correction of assessment or re-assessment of property.
          </div>
          {/* <div className='px-4 py-1.5 poppins' onClick={() => navigate(`/objection-assessment-error/${id}`)}> */}
          <div className='px-4 py-1.5 poppins' onClick={() => modalAction(2)}>
            <button className='bg-blue-100 text-blue-600 w-full flex gap-x-1 items-center justify-center py-1.5 rounded-sm text-sm transition-all duration-300 hover:gap-x-4 '>
              <span>Apply</span> <span><BsArrowRight/></span>
            </button>
          </div>
        </div>

          {/* ====Card 3====== */}
          <div className='md:w-[30%] rounded-sm shadow-sm bg-zinc-50 hover:scale-105 transition-all duration-300 hover:shadow-md'>
          <div className='bg-gradient-to-r from-blue-200 to-blue-100 h-[25vh] flex items-center rounded-sm'>
            <img src={forgery} alt="" srcset="" className='rounded-sm hover:scale-110 transition-all duration-300' />
          </div>
          <div className='poppins font-semibold px-4 py-1.5'>
            Forgery
          </div>
          <div className='poppins text-xs px-4 py-1.5'>
          This <span className="font-semibold">Forgery</span> is for issuing complaint that someone has taken your property from fraud or by forgery.
          </div>
          {/* <div className='px-4 py-1.5 poppins' onClick={() => navigate(`/objection-forgery/${id}`)}> */}
          <div className='px-4 py-1.5 poppins' onClick={() => modalAction(3)}>
            <button className='bg-blue-100 text-blue-600 w-full flex gap-x-1 items-center justify-center py-1.5 rounded-sm text-sm transition-all duration-300 hover:gap-x-4 '>
              <span>Apply</span> <span><BsArrowRight/></span>
            </button>
          </div>
        </div>

      </div>

        {/* =========Buttons========= */}
        <div onClick={() => navigate(`/holdingPropertyDetails/${id}`)} className="bg-blue-200 px-4 py-1.5 flex gap-x-1 mt-6 items-center justify-center rounded-sm transition-all duration-300 w-max cursor-pointer text-blue-600 shadow-md hover:gap-x-3 hover:bg-blue-300 text-xs ">
                  <span><BsArrowLeft/></span> <span>Back</span>
              </div>

    </div>

    {/* ===============Modal============================ */}
    <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                // style={customStyles}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                {/* <div class=" rounded-lg shadow-xl  bg-indigo-50 px-0" style={{ 'width': '60vw', 'height': '80vh' }}> */}
                <div class=" rounded-lg md:ml-24 shadow-lg relative bg-gray-50 px-6 py-4 w-[80vw] h-[80vh] z-50 border-t-2 border-l-2 border-white overflow-auto" >
                
                <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross fontSize={10}/>
                </div>

                    {
                      index == 1 && <ObjectionRectificationTable closePopUp={closeModal} submitForm={openSubmitScreen1}/>
                    }
                    {
                      index == 2 && <div className='h-[80vh]'><ObjectionFormIndex closePopUp={closeModal} submitForm={openSubmitScreen2}/></div>
                    }
                    {
                      index == 3 && <ObjectionForgery closePopUp={closeModal} submitForm={openSubmitScreen3}/>
                    }
                </div>

            </Modal>

            <ApplicationSubmitScreen heading={heading} appNo={appId} openSubmit={openSubmit} navigation={closeModal}/>
    
    </>
    )

}

export default ObjectionIndex