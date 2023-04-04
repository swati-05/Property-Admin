import React, { useEffect, useState } from 'react'
import rmclogo from '../images/rmclogo.png'
import rmclogo2 from '../images/rmclogo2.jpg'
import './Reciept.css'
import swachhBharat from '../images/swachhBharat.png'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import PrintButton from '@/Components/Common/PrintButton'
import QrCode from '@/Components/Common/QrCode'

class FamReciept extends React.Component {

  render(){

    const famDetails = this.props?.famDetails

    let notes = [
        "If there is any objection against the tax prescribed by the corporation, under the prescribed provision of Section 167 (1) of the Jharkhand Municipal Act, 2011, within 30 (thirty) days of receipt of this assessment Memo can file an objection in the prescribed form.",
        "The list of tax assessment is displayed on the Ranchi Municipal Corporation website wwvw.ranchimunicipal.com.",
        "As per clause 13.4 of the Jharkhand Municipal Property Tax (Assessment, Collection and Recovery) Rules 2013, the actual amount of differential tax and one hundred percent penalty on its also payable.",
        "This property tax collected by the Ranchi Municipal Corporation does not confer any legal status on these buildings / structures and / or does not confer any legal rights to its owners / occupiers."
    ]

    const noteList = notes.map((content,index)=>{
        return <li>
            <span>{index+1}.&nbsp;</span>
            <span>{content}</span>
            </li>;
    });

    let holdingNo;
    
    {(famDetails?.pt_no == '' || famDetails?.pt_no == undefined) ? holdingNo = famDetails?.holding_no?.split('') : holdingNo = famDetails?.pt_no?.split('')}
    
    const holdingBox = holdingNo?.map((num) => {
        return <div className='px-2 py-1 border-2 border-black text-xs'>{num}</div>
      })
    
    
  return (
    <>

    {/* <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
    Print
</button> */}
<PrintButton />
    <div className="flex items-center justify-center text-black" id="printableArea">
      <div className="container w-[70%] border-2 border-dashed m-2 overflow-x-hidden border-black py-4 px-3">

        <img src={rmclogo} alt="" srcset="" className='absolute top-[20%] left-[27%] backImage opacity-10'/>

          {/* Logo Heading */}
          <div>
              <div className="flex flex-row justify-center items-center gap-x-4">
                  <img src={rmclogo2} alt="Logo" srcset="" className="h-16 w-16"/>
                  <div className="text-sm font-semibold flex flex-col justify-center items-center underline">
                    <span >Ranchi Municipal Corporation, Ranchi</span>
                    <span>(Revenue Branch)</span>
                  </div>
                  
              </div>
          </div>

          {/* message */}
          <div>
          <hr className='border-black mt-6 mb-2' />
          <div className='font-semibold text-xs'>
          Notice of property tax prescribed under section 12 (B) cum read Jharkhand Municipal Property Tax (Assessment, Collection and Recovery) Rules of
Jharkhand Municipal Act, 2011.
          </div>
          <hr className='border-black mb-6 mt-2' />
          </div>

          {/* name address memo no. */}
          <div className='flex-row grid grid-cols-12 gap-2'>
          <div className="text-start text-xs col-span-8">
              Mr/Mrs/Ms: <br /> <span className="font-semibold text-xs">{nullToNA(famDetails?.owner_name)} {nullToNA(famDetails?.relation_type)} {nullToNA(famDetails?.guardian_name)}</span> <br />
              Address: <span className="font-semibold text-xs">{nullToNA(famDetails?.prop_address)}</span>
          </div>
          <div className="text-right text-xs col-span-4">
              Memo No.: <span className="font-semibold">{nullToNA(famDetails?.memo_no)}</span> <br />
              <br />
              Effective: <span className="font-semibold">{famDetails?.from_qtr == 1 && <>First</>}{famDetails?.from_qtr == 2 && <>Second</>}{famDetails?.from_qtr == 3 && <>Third</>}{famDetails?.from_qtr == 4 && <>Fourth</>} Quarter {nullToNA(famDetails?.from_fyear)}</span> <br />
          </div>
          </div>

          {/* declaration */}
          <div className='text-xs mt-6'>
          <p className='mb-3'>You are hereby informed that your new {(famDetails?.pt_no == '' || famDetails?.pt_no == undefined) ? 'Holding' : 'Property Tax'} No.-</p>
            <div className='flex flex-row'>
              {holdingBox}
            </div>
            <p className='my-1'>The annual rent value ofthis holding is Rs. <span className="font-semibold">{nullToNA(famDetails?.arv)}</span>/- after local check made by Ranchi Municipal Corporation in the ight of the self assessment deciaration letter
made by you for assessment of tax for <span className="font-semibold">Ward No. <span className='font-normal'>{nullToNA(famDetails?.new_ward_no)}</span></span> (<span className="font-semibold">Old Ward No.</span> {nullToNA(famDetails?.old_ward_no)}) , {nullToNA(famDetails?.arv)}/- is fixed at the place.</p>
          <p>Based on the annual rent value determined by the corporation, the Fifst quarter will be taxed in writing with effect from the year 2016-2017.</p>
          </div>

          {/* table */}
          <table className='text-xs font-semibold w-full mt-1'>

            <tr>
              <td className='border-2 border-black px-1 w-[3%]'>Sl No.</td>
              <td className='border-2 border-black px-1 w-auto'>Particulars</td>
              <td className='border-2 border-black px-1 w-[16%]'>Quarter/Financial Year</td>
              <td className='border-2 border-black px-1 w-[16%]'>Based on the Self Assessment</td>
              <td className='border-2 border-black px-1 w-[16%]'>On the basis of ULB Calculation</td>
              <td className='border-2 border-black px-1 w-[9%]'>Difference Amount <br /> (4-3)</td>
              {/* <td className='border-2 border-black px-1 w-[11%]'>100% Penalty of Column 5</td> */}
            </tr>

            {/* <tr>
              <td className="border-2 border-black px-1"></td>
              <td className="border-2 border-black px-1">2</td>
              <td className="border-2 border-black px-1">2</td>
              <td className="border-2 border-black px-1">3</td>
              <td className="border-2 border-black px-1">4</td>
              <td className="border-2 border-black px-1">5</td>
              <td className="border-2 border-black px-1">6</td>
            </tr> */}

            {
              famDetails?.taxTable?.map((data, index) => 
              <>
            <tr>
              <td className="border-2 border-black px-1">{index+1}</td>
              <td className="border-2 border-black px-1">{nullToNA(data?.Particulars)}</td>
              <td className="border-2 border-black px-1">{nullToNA(data?.QuarterFinancialYear)}</td>
              <td className="border-2 border-black px-1">{nullToNA(data?.basedOnSelfAssess)}</td>
              <td className="border-2 border-black px-1">{nullToNA(data?.basedOnUlbCalc)}</td>
              <td className="border-2 border-black px-1">{nullToNA(data?.diffAmt)}</td>
              {/* <td className="border-2 border-black px-1">{data?.diffAmt}</td> */}
            </tr>
              </>)
            }
           
          </table>

          {/* qr & signature */}
          <div className="mt-10 w-full flex flex-row justify-between items-end">
              
              {/* qr */}
              <div>
                  {/* <img src="" alt="QR" className="h-20 w-20 border"/> */}
                  <QrCode size='64' />
              </div>

              {/* signature */}
              <div className='flex flex-col justify-end items-center'>
                  <p className='text-md font-semibold'>Deputy Municipal Commissioner</p>
                  <p className='text-xs'>Ranchi Municipla Corporation, Ranchi</p>
              </div>

          </div>

          {/* note */}
          <div className="text-xs mt-4 pr-52">
              <div className="font-semibold my-2">
                  Note:-
              </div>
              
              <ol className="w-full flex flex-col gap-x-2 pl-10">
                  {noteList}
              </ol>

          </div>

          {/* bottom logo */}
          <div className='flex justify-center items-center mt-6'>
            <img src={swachhBharat} alt="" className="h-10 opacity-70" />
          </div>

         </div>
    </div>
  </>
  )

  }
}

export default FamReciept