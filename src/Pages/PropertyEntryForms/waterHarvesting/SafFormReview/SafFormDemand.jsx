//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - SafFormDemand
// >DESCRIPTION - SafFormDemand Component
//////////////////{*****}//////////////////////////////////////////

import { useState } from 'react'
import rupee from '../../../../Components/Media/rupee.png'
import rupee2 from '../../../../Components/Media/rupee2.png'
import brief from '../../../../Components/Media/brief.png'
import pay2 from '../../../../Components/Media/pay2.png'
import { useNavigate } from 'react-router-dom'
import CitizenTaxCard from './CitizenTaxCard'

import { MdContentCopy } from 'react-icons/md'
// import copy from "copy-to-clipboard";
import { TiArrowBack } from 'react-icons/ti'
import { MdViewInAr } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'

function SafFormDemand(props) {
  const [taxDescriptionState, setTaxDescriptionState] = useState(false)
  const navigate = useNavigate()
  console.log('saf submit response data at safformdemand...', props.safSubmitResponse)
  const toggleTaxDescription = () => {
    setTaxDescriptionState(!taxDescriptionState)

    // console.log('scroll top position ',document.documentElement.scrollTop)
  }

  return (
    <div className={` block p-4 mt-4 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto `}>
      {/* <h1 className='px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white'>Saf Demand</h1> */}
      <h1 className='px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white'><BsFillCheckCircleFill className='text-white inline text-3xl' /> Your form has been submitted successfully</h1>


      <div className="w-full flex mb-10 mt-10">
        <div className='md:px-10 flex-1'>
          <button onClick={() => props.backFun(1)} type="button" className="pl-4 pr-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><TiArrowBack className='inline text-lg' /> Back</button>
        </div>
       
        {/* <div className='md:px-10 text-right flex-1'>
          <button onClick={() => props.nextFun(7)} type="button" className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Pay Now <img src={pay2} alt="pay image" className='inline w-5' /></button>


        </div> */}

      </div>

      <div className='mt-40'></div>
    </div>
  )
}

export default SafFormDemand