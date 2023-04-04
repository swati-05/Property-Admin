import React from 'react'
import rmclogo from '../images/rmclogo.png'
import rmclogo2 from '../images/rmclogo2.jpg'
import './Reciept.css'
import swachhBharat from '../images/swachhBharat.png'
import PrintButton from '@/Components/Common/PrintButton'
import QrCode from '@/Components/Common/QrCode'

class RmcReciept extends React.Component {

  render(){

    const data = this.props?.rmcDetails
  return (

    <>
        {/* <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
    Print
</button> */}
<PrintButton />
    <div className="flex items-center justify-center text-black" id="printableArea">
      <div className="container w-[70%] border-2 border-dashed m-2 overflow-x-hidden border-black py-4 px-3 text-sm">

        <img src={rmclogo} alt="" srcset="" className='absolute top-[20%] left-[27%] backImage opacity-10'/>

            {/* heading */}
            <div className='w-full text-center flex flex-col mb-2'>
                <div className='uppercase font-bold text-4xl mb-8'>Ranchi Municipal Corporation</div>
                <div className='w-full flex justify-center'>
                    <div className='uppercase border-2 font-bold border-black px-10 py-2 text-xl w-max'>Holding Tax Reciept</div>
                </div>
            </div>

            {/* reciept no. & date */}
            <div className='flex justify-between'>
                <div>
                    <div>Reciept No. : <span className="font-bold">{data?.transactionNo}</span></div>
                    <div className='mt-2'>Department / Section : {data?.departmentSection}</div>
                    <div>Account Description : {data?.accountDescription}</div>
                </div>
                <div>
                    <div>Date : <span className="font-bold">{data?.transactionDate}</span></div>
                    <div>Ward No :<span className="font-bold">{data?.oldWardNo}</span></div>
                    <div>New Ward No :<span className="font-bold">{data?.newWardNo}</span></div>
                    {(data?.pt_no == '' || data?.pt_no == undefined) ? <div>Holding No :<span className="font-bold">{data?.applicationNo}</span></div> : <div>Property Tax No :<span className="font-bold">{data?.ptNo}</span></div>}
                </div>
            </div>

            {/* about */}
            <div className="mt-4">
                <div>Received From Mr / Mrs / Miss . :&nbsp;<span className="font-bold uppercase">{data?.custormerName}</span></div>
                <div>Mobile No. :&nbsp;<span className="font-bold">{data?.mobileNo}</span></div>
                <div>Address :&nbsp;<span className="font-bold uppercase">{data?.address}</span></div>
                <div>A Sum of Rs. :&nbsp;<span className="font-bold">{data?.totalPaidAmount}</span></div>
                <div className=' w-full mb-1'>(in words) :&nbsp;<span className="w-[80%] inline-block font-bold border-black border-b-2 border-dotted">{data?.paidAmtInWords}Only</span></div>
                <div>towards :&nbsp;<span className="font-bold">{data?.towards}</span>&nbsp;&nbsp; Vide :&nbsp;<span className="font-bold">{data?.paymentMode}</span></div>
                <div className='font-bold my-2'>N.B.Online Payment/Cheque/Draft/ Bankers Cheque are Subject to Realisation</div>
            </div>

            {/* holding tax details */}
            <div>
                <div className='uppercase font-bold text-base border-b-2 border-black my-2'>
                    Holding Tax Details
                </div>
                <table className='w-full'>
                    <tr>
                        <th className='py-1.5 w-[25%] text-start'>Code of Amount</th>
                        <th className='py-1.5 w-[25%] text-start'>Account Description</th>
                        <th className='py-1.5 w-[25%] text-center'>Period</th>
                        <th className='py-1.5 w-[25%] text-end'>Amount</th>
                    </tr>
                    {
                        data?.holdingTaxDetails?.map((elem) => <>
                            <tr>
                                <td className='py-1.5'>{elem?.codeOfAmount}</td>
                                <td className='text-start py-1.5'>{elem?.description}</td>
                                <td className='text-center py-1.5'>{elem?.period}</td>
                                <td className='text-end py-1.5'>{elem?.amount}</td>
                            </tr>
                        </>)
                    }

                    <tr>
                        <td colSpan={2}>
                            <div>
                                {/* <img src="" alt="QR" className="h-24 w-24 border"/> */}
                                <QrCode size='64' />
                            </div>
                        </td>
                        <td className="py-1 5 font-bold text-end">Total <br />Amount Recieved</td>
                        <td className="py-1 5 font-bold text-end">{data?.demandAmount}<br /> {data?.totalPaidAmount}</td>
                    </tr>

                </table>
            </div>

            {/* footer */}
            <div className='flex flex-row justify-between my-2'>

                <div className='w-[70%]'>
                For Details Please Visit : udhd.jharkhand.gov.in <br/>
OR Call us at 1800 8904115 or 0651-3500700
                </div>
                <div className='w-[30%]'>
                In Collaboration with <br />
Sparrow Softech Pvt. Ltd.
                </div>

            </div>
            
            <div className='font-bold my-2 w-full text-center'>
            **This is a computer-generated receipt and it does not require a signature.**
            </div>

        </div>
        </div>
    </>

  )
}
}

export default RmcReciept