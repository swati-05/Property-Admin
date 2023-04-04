import React from 'react'
import rmclogo from '../images/rmclogo.png'
import rmclogo2 from '../images/rmclogo2.jpg'
import './Reciept.css'
import swachhBharat from '../images/swachhBharat.png'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'

class DemandReciept extends React.Component {

  render(){

    const data = this.props?.demandDetails
  return (

    <>
        <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
    Print
</button>
    <div className="flex items-center justify-center text-black" id="printableArea">
      <div className="container w-[70%] border-2 border-dashed m-2 overflow-x-hidden border-black py-4 px-3 text-sm">

        <img src={rmclogo} alt="" srcset="" className='absolute top-[20%] left-[27%] w-[50%] backImage opacity-10'/>

            {/* heading */}
            <div className='w-full text-center flex flex-col mb-2'>
                <div className='text-gray-600 font-bold text-4xl mb-8'>Ranchi Municipal Corporation, Ranchi</div>
                <div className='w-full flex justify-center'>
                    <div className=' border-2 font-bold border-black px-10 py-2 text-xl w-max'>Property Tax Demand</div>
                </div>
            </div>

            {/* reciept no. & date */}
            <div className='flex justify-between'>
                <div>
                    <div>Holding No. : <span className="font-bold">{nullToNA(data?.holdingNo)}</span></div>
                    <div>New Holding No. : <span className="font-bold">{nullToNA(data?.new_holding_no)}</span></div>
                    <div>Department / Section : Revenue Section</div>
                    <div>Account Description : Holding Tax & Others</div>
                </div>
                <div>
                    <div>Date : <span className="font-bold">{nullToNA(data?.date)}</span></div>
                    <div>Ward No :<span className="font-bold">{nullToNA(data?.wardNo)}</span></div>
                    <div>New Ward No :<span className="font-bold">{nullToNA(data?.newWardNo)}</span></div>
                </div>
            </div>

            {/* about */}
            <div className="mt-4">
                <div>Owner Name :&nbsp;<span className="font-bold uppercase">{nullToNA(data?.ownerName)}</span></div>
                <div>Address :&nbsp;<span className="font-bold uppercase">{nullToNA(data?.address)}</span></div> 
            </div>

            {/* table */}
            <div className='mt-4'>
              <table>
                <tr>
                  <th className="p-2 border-[1px] border-black">Demand From</th>
                  <th className="p-2 border-[1px] border-black">Demand Upto</th>
                  <th className="p-2 border-[1px] border-black">Demand (in Rs.)</th>
                  <th className="p-2 border-[1px] border-black">RWH Penalty (in Rs.)</th>
                  <th className="p-2 border-[1px] border-black">Already Paid (in Rs.)</th>
                  <th className="p-2 border-[1px] border-black">Total (in Rs.)</th>
                </tr>
                <tr>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.duesFrom)}</td>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.duesTo)}</td>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.demand)}</td>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.rwhPenalty)}</td>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.alreadyPaid)}</td>
                  <td className="p-2 border-[1px] border-black">{nullToNA(data?.total)}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold border-[1px] border-black text-end" colSpan={2}>Total</td>
                  <td className="p-2 font-bold border-[1px] border-black">{nullToNA(data?.demand)}</td>
                  <td className="p-2 font-bold border-[1px] border-black">{nullToNA(data?.rwhPenalty)}</td>
                  <td className="p-2 font-bold border-[1px] border-black">{nullToNA(data?.alreadyPaid)}</td>
                  <td className="p-2 font-bold border-[1px] border-black">{nullToNA(data?.total)}</td>
                </tr>
                <tr>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={2}>1% Penalty</td>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={4}>Rs. {nullToNA(data?.onePercPenalty)}</td>
                </tr>
                {/* <tr>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={2}>Rebate</td>
                  nullToNA(<td className='border-[1px] border-black font-bold p-2' colSpan={4}>Rs. {data?.rebate}</td>)
                </tr> */}
                <tr>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={2}>Total Payable</td>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={4}>Rs. {nullToNA(data?.totalPayable)}</td>
                </tr>
                <tr>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={2}>Total Demand (in words)</td>
                  <td className='border-[1px] border-black font-bold p-2' colSpan={4}>{nullToNA(data?.totalPayableInWords)} Only.</td>
                </tr>
              </table>
            </div>

        </div>
        </div>
    </>

  )
}
}

export default DemandReciept