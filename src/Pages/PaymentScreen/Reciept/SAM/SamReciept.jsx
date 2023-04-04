import React, { useEffect, useState } from 'react'
import './Reciept.css'
import rmclogo from '../images/rmclogo.png'
import rmclogo2 from '../images/rmclogo2.jpg'
import swachhBharat from '../images/swachhBharat.png'
import { useParams } from 'react-router'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import BarLoader from '@/Components/Common/BarLoader'
import PrintButton from '@/Components/Common/PrintButton'
import QrCode from '@/Components/Common/QrCode'

const SamReciept = () => {

    const id = useParams()

    const {api_samReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [samDetails, setsamDetails] = useState()

    useEffect(() => {

        setTimeout(() => {
            setloader(false)
        }, 10000);

        setloader(true)

        axios.post(api_samReciept, {memoId : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting sam memo details => ', res)
            setloader(false)
            setsamDetails(res?.data?.data)
        })
        .catch((err) => {
            console.log("getting sam memo error => ", err)
            setloader(false)
            toast.error('Something went wrong !!!')
        })
    },[])

    let notes = [
        "The tax assessment list is displayed on the website of Ranchi Municipal Corporation : For Details Please Visit : udhd jharkhand.gov.in OR Call us at 1800 8904116 or 0651-2500700.",
        "In the light of manual 11.4, additional house tax will be levied which will be 50% of the property tax due to lack of arrangement of rainwater harvesting.",
        "It is advised to inform the corporation by installing rainwater conservation structure and get relief from additional house tax.",

"Property tax will be paid quartely in each financial year.",

"If the entire hourly tax for a year is paid before 30 June of the financial year, a rebate of 5% will be given to the taxpayer.",

"Simple Interest will be payable at the rate of 1% per month if any payable are not not paid within or before the specified time period (every quarter).",

"This tax assessment is being done on the basis of your self-determination and declaration made, this self-assessment-cum-deciaration can be conducted by the local corporation in due course of time and if the facts are found to be incorrect, the penalty prescribed in accordance with manual Condica 13.2 (Fine) and difference amount will be payable.",

"The property is collected by Ranchi Municipal Corporation does not confer any legal status on these buildings and / or its owners / occupiers Confers any legal right to.",

"If the last digit of your new holding number is 5/6/7/8, then it will be considered under the category of specific structures."
    ]

    const noteList = notes.map((content,index)=>{
        return <li>
            <span>{index+1}.&nbsp;</span>
            <span>{content}</span>
            </li>;
    });

  return (
    <>
    
    {loader && <BarLoader />}

    <ToastContainer position="top-right" autoClose={2000} />

    {/* <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight capitalize rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
    Print
</button> */}
<PrintButton />

    <div className="flex items-center justify-center text-black" id="printableArea">
      <div className="container w-[70%] border-2 border-dashed m-2 overflow-x-hidden border-black py-4 px-3 relative">

      <img src={rmclogo} alt="" srcset="" className='absolute top-[20%] left-[18%] backImage opacity-10'/>

          {/* Logo Heading */}
          <div>
              <div className="flex flex-row justify-center items-center gap-x-4">
                  <img src={rmclogo2} alt="Logo" srcset="" className="h-16 w-16"/>
                  <span className="text-2xl font-bold">Ranchi Municipal Corporation, Ranchi</span>
              </div>
              <div className="underline text-xs font-semibold flex justify-center mt-1">
              Notice of property tax customized under section 12(3) of Jharkhand Municipal Act-2011
              </div>
          </div>

          {/* left content */}
          <div className="text-right text-xs mb-1 mt-2">
              Memo No.: <span className="font-semibold">{samDetails?.memo_no}</span> <br />
              Date: <span className="font-semibold">{samDetails?.created_at}</span> <br />
              Effective: <span className="font-semibold">
                {samDetails?.from_qtr == 1 && <>First</>}{samDetails?.from_qtr == 2 && <>Second</>}{samDetails?.from_qtr == 3 && <>Third</>}{samDetails?.from_qtr == 4 && <>Fourth</>} Quarter {samDetails?.from_fyear}</span> <br />
          </div>

          {/* Name and Address */}
          <div className="text-start text-xs">
              Mr/Mrs/Ms: <span className="font-semibold capitalize">{samDetails?.owner_name} {samDetails?.relation_type} {samDetails?.guardian_name}</span> <br />
              Address: <span className="font-semibold capitalize">{samDetails?.prop_address}</span>
          </div>

          {/* declaration */}
          <div>
          <p className="text-xs my-2">
              &nbsp; You are hereby informed that your New {(samDetails?.pt_no == '' || samDetails?.pt_no == undefined) ? 'Holding' : 'Property Tax'} Number - <span className="font-semibold">{(samDetails?.pt_no == '' || samDetails?.pt_no == undefined) ? samDetails?.holding_no : samDetails?.pt_no}</span> in Ward No - <span className="font-semibold">{samDetails?.old_ward_no}</span> , New Ward No - <span className="font-semibold">{samDetails?.new_ward_no}</span> has been done, on the basis of your self-assessment declaration form, the annual rental price has been fixed at Rs <span className="font-semibold">{samDetails?.arv}</span>/- based on your self assessment declaration.
              </p>
          </div>

          {/* table */}
          <div>
              <div className="text-xs">
                  Accordingly the tax per quarter will be as follows.
              </div>

              <table className="text-xs w-full border-2 border-black">
                  
                  <tr className="font-semibold">
                      <td colSpan={3} className="text-center">
                          Self assessment tax notice
                      </td>
                  </tr>

                  <tr className="font-semibold">
                      <td className="border-2 border-black w-[25%] px-2">SL.No.</td>
                      <td className="border-2 border-black w-[50%] px-2">Particulars</td>
                      <td className="border-2 border-black w-[25%] px-2">Amount (in Rs.)</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">1.</td>
                      <td className="px-2 border-2 border-black">House Tax</td>
                      <td className="px-2 border-2 border-black">{samDetails?.holding_tax == '' ? 0.00 : samDetails?.holding_tax}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">2.</td>
                      <td className="px-2 border-2 border-black">Water Tax</td>
                      <td className="px-2 border-2 border-black">{samDetails?.water_tax == '' ? 0.00 : samDetails?.water_tax}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">3.</td>
                      <td className="px-2 border-2 border-black">Latrine Tax</td>
                      <td className="px-2 border-2 border-black">{samDetails?.latrine_tax == '' ? 0.00 : samDetails?.latrine_tax}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">4.</td>
                      <td className="px-2 border-2 border-black">RWH Penalty</td>
                      <td className="px-2 border-2 border-black">{samDetails?.rwh_penalty == '' ? 0.00 : samDetails?.rwh_penalty}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">5.</td>
                      <td className="px-2 border-2 border-black">Education Cess</td>
                      <td className="px-2 border-2 border-black">{samDetails?.education_cess == '' ? 0.00 : samDetails?.education_cess}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black">6.</td>
                      <td className="px-2 border-2 border-black">Health Cess</td>
                      <td className="px-2 border-2 border-black">{samDetails?.health_cess == '' ? 0.00 : samDetails?.health_cess}</td>
                  </tr>

                  <tr>
                      <td className="px-2 border-2 border-black font-semibold" colSpan={2}>Total Amount (per quarter)</td>
                      <td className="px-2 border-2 border-black">{samDetails?.quarterly_tax == '' ? 0.00 : samDetails?.quarterly_tax}</td>
                  </tr>

              </table>
          </div>

          {/* qr & signature */}
          <div className="my-6 w-full flex flex-row justify-between items-start">
              
              {/* qr */}
              <div>
                  {/* <img src="" alt="QR" className="h-20 w-20 border"/> */}
                  <QrCode size='64' />
              </div>

              {/* signature */}
              <div>
                  <div className="h-8 w-52 border-2 border-black"></div>

                  <div className="text-xs font-semibold text-end">
                      To be signed by the Applicant
                  </div>
              </div>

          </div>

          {/* note */}
          <div className="text-xs">
              <div className="font-semibold my-2">
                  Note:-
              </div>
              
              <ol className="w-full flex flex-col gap-x-2 pl-10">
                  {noteList}
              </ol>

          </div>

          {/* bottom note */}
          <div className="font-semibold mt-4 text-sm">
          NOTE: This is a computer generated receipt. This receipt does not require physical signature.
          </div>

          <div className='flex justify-center items-center mt-6'>
            <img src={swachhBharat} alt="" className="h-10 opacity-70" />
          </div>

      </div>
    </div>
  </>
  )
}

export default SamReciept