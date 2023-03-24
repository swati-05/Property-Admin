import React from 'react'
import { AiFillPrinter } from 'react-icons/ai'
import QrCode from './QrCode';
import './print.css'

const ComponentToPrint = ({index , paymentData}) => {

        return (
            <>
          
            <div id="receipts-container" className={`receipt  printData${index} print:grid print:grid-cols-12`}>

                <div className={`print:col-span-12`}>

                    <div className='print:absolute print:z-40 border-2 border-dashed border-gray-600 print:w-screen  bg-white p-2  h-auto  md:mx-auto lg:mx-auto  '>
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 '>
                            <div className=''>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/1200px-Jharkhand_Rajakiya_Chihna.svg.png' className='h-20 mx-auto' />
                            </div>
                            <div className=''>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/1200px-Jharkhand_Rajakiya_Chihna.svg.png' alt="" className='w-[22rem] h-[22rem]  absolute z-10 bg-transparent opacity-20 mt-[16rem] ml-[10rem]  rounded-full border' />
                            </div>
                        </div>

                        {/* rmc */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 pt-2'>
                            <div className=''>
                                <h1 className='font-bold text-4xl text-center '>RANCHI MUNICIPAL CORPORATION</h1>
                            </div>
                        </div>

                        {/* holding tax */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 pt-4 '>
                            <div className='mx-auto'>
                                <h1 className='font-bold text-xl text-center text-gray-800 border-2 border-gray-700 px-10 py-2 '>HOLDING TAX RECEIPT</h1>
                            </div>
                        </div>

                        {/* detail section 1 */}
                        <div>
                            <table className='w-full mt-1 text-md'>
                                <tr className=''>
                                    <td className=' '>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Receipt No. :</h1>
                                            <h1 className='flex font-sans font-semibold  pl-2'> {paymentData?.transactionNo}</h1>
                                        </div>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Department/Section :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.departmentSection}</h1>
                                        </div>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Account Description :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.accountDescription
                                            }</h1>
                                        </div>
                                        <div className='flex p-1 '>
                                            {/* <h1 className='flex text-gray-900 font-sans '>Holding No. :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.holdingNo
                                            }</h1> */}
                                        </div>
                                    </td>
                                    <td className=' '>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Date :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.transactionDate}</h1>
                                        </div>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Ward No. :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.newWardNo}</h1>
                                        </div>
                                        <div className='flex p-1 '>
                                            <h1 className='flex text-gray-900 font-sans '>Holding No. </h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.applicationNo}</h1>
                                        </div>

                                        <div className='flex p-1 '>  </div>
                                        <div className='flex p-1 '></div>
                                        <div className='flex p-1 '>  </div>
                                        <div className='flex p-1 '></div>
                                    </td>
                                </tr>
                            </table>
                        </div>


                        {/* detail section 2 */}
                        <div>
                            <table className='w-full  p-2 mt-4 text-md'>
                                <tr className=''>
                                    <td className=' '>
                                        <div className='flex p-1'>
                                            <h1 className='flex text-gray-900 font-sans '>Received From Mr/Mrs/Miss :</h1>
                                            <h1 className='flex font-sans font-semibold  pl-2'>{paymentData?.customerName}</h1>
                                        </div>
                                        <div className='flex p-1'>
                                            <h1 className='flex text-gray-900 font-sans '>Address :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.address}</h1>
                                        </div>
                                        <div className='flex p-1'>
                                            <h1 className='flex text-gray-900 font-sans '>A Sum of Rs.  :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{paymentData?.totalPaidAmount}</h1>
                                        </div>
                                        <div className='flex p-1'>
                                            <h1 className='flex text-gray-900 font-sans '>(in words ):</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 border-b border-dashed border-gray-600 '>{paymentData?.paidAmtInWords}</h1>
                                        </div>
                                        <div className='flex p-1'>
                                            <h1 className='flex text-gray-900 font-sans '>towards : <span className=' font-sans font-semibold ml-1'>{paymentData?.towards}</span></h1>
                                            <h1 className='flex text-gray-900 font-sans  ml-8 '>Vide : {paymentData?.paymentMode} <span className=' font-sans font-semibold ml-1'></span></h1>
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>
                        {/* N.B online */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-2 mt-3'>
                            <div className=''>
                                <h1 className='font-bold text-md text-left '>N.B. Online Payment/Cheque/Draft/Bankers Cheque are Subject to Realisation</h1>
                            </div>
                        </div>

                        {/* holding tax details */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-2 -mt-1' >
                            <div className=''>
                                <h1 className='font-bold text-base text-left '>HOLDING TAX DETAILS</h1>
                            </div>
                        </div>

                        {/* Table 1 */}
                        <div>
                            <table className='w-full border border-gray-500 '>
                                <thead className=' w-full'>
                                    <tr className='flex  text-md   '>
                                        <td className=' text-center border-r  w-48'>
                                            <h1 className=' text-gray-900 font-sans '>Description</h1>
                                        </td>
                                        <td className='flex-1 text-center border border-gray-500'>
                                            <h1 className=' text-gray-900 font-sans'>Period</h1>
                                        </td>
                                        <td className=' text-center  border-l w-48'>
                                            <h1 className=' text-gray-900 font-sans'>Total Amount</h1>
                                        </td>
                                    </tr>
                                    <tr className='flex text-md '>
                                        <td className='text-center w-48'>

                                        </td>
                                        <td className='flex-1 first-line:text-center border-b border-r border-l border-gray-500'>
                                            <tr className='flex  '>
                                                <td className='flex-1 text-center border-r border-gray-500'>
                                                    <h1 className=' text-gray-900 font-sans'>From</h1>
                                                </td>
                                                <td className='flex-1 text-center '>
                                                    <h1 className=' text-gray-900 font-sans'>To</h1>
                                                </td>
                                            </tr>
                                        </td>
                                        <td className='text-center border-l w-48'>

                                        </td>
                                    </tr>
                                    <tr className='flex  text-md   border-b border-gray-500'>
                                        <td className='text-center w-48 '> </td>
                                        <td className='flex-1 text-center  border-r border-l border-gray-500'>
                                            <tr className='flex  '>
                                                <td className='flex-1 text-center '>
                                                    <tr className='flex  '>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className=' text-gray-900 font-sans border-r border-gray-500'>QTR</h1>
                                                        </td>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className=' text-gray-900 font-sans border-r border-gray-500'>FY</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td className='flex-1   text-center'>
                                                    <tr className='flex  '>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className=' text-gray-900 font-sans border-r border-gray-500'>QTR</h1>
                                                        </td>
                                                        <td className='flex-1 text-center'>
                                                            <h1 className=' text-gray-900 font-sans '>FY</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                            </tr>
                                        </td>
                                        <td className='text-center border-l w-48'> </td>
                                    </tr>
                                </thead>

                                {/*Map Tr */}
                                <tbody>
                                    <tr className='flex  border-b border-gray-500  text-md '>


                                        < td className=' text-center w-48'>
                                            <h1 className=' font-sans font-semibold '>Holding Tax</h1>
                                        </td>

                                        <td className='flex-1 text-center border-r border-l border-gray-500'>
                                            <tr className='flex  '>
                                                <td className='flex-1 text-center '>
                                                    <tr className='flex  '>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className='font-sans font-semibold  border-r border-gray-500 text-[0.7rem]'>{paymentData?.paidFromQtr}</h1>
                                                        </td>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className='font-sans font-semibold  border-r border-gray-500 text-[0.7rem]'>{paymentData?.paidFrom}</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td className='flex-1   text-center'>
                                                    <tr className='flex  '>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className=' font-sans font-semibold border-r border-gray-500 text-[0.7rem]'>{paymentData?.paidUptoQtr}</h1>
                                                        </td>
                                                        <td className='flex-1 text-center'>
                                                            <h1 className=' font-sans font-semibold text-[0.7rem]'>{paymentData?.paidUpto}</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                            </tr>
                                        </td>
                                        <td className='text-center border-l w-48'>
                                            <h1 className=' font-sans font-semibold '>{paymentData?.demandAmount}</h1>
                                        </td>
                                    </tr>

                                    {paymentData?.taxDetails?.map((items) => (
                                        <tr className='flex border-b border-gray-500  text-md '>
                                            <td className='flex-1 text-center '>
                                                <h1 className=' font-sans font-semibold '> </h1>
                                            </td>
                                            <td className='flex-1 text-center '>
                                                <tr className='flex'>
                                                    <td className='flex-1 text-center '>
                                                        <tr className='flex'>
                                                            <td className='flex-1 text-center '>
                                                                <h1 className='font-sans font-semibold'></h1>
                                                            </td>
                                                            <td className='flex-1 text-center '>
                                                                <h1 className='font-sans font-semibold'></h1>
                                                            </td>
                                                        </tr>
                                                    </td>
                                                    <td className='flex-1 text-right'>
                                                        <tr className=' '>
                                                            <td className=' '>
                                                                <h1 className='-ml-16 font-sans font-semibold text-sm'>{items?.keyString}</h1>
                                                            </td>
                                                        </tr>
                                                    </td>
                                                </tr>
                                            </td>
                                            <td className=' text-center border-l border-gray-500 w-48'>
                                                <h1 className=' font-sans font-semibold '>{items?.value}</h1>
                                            </td>
                                        </tr>
                                        // {/* <tr className='flex border-b border-gray-500  text-xl '>
                                        //     <td className='flex-1 text-center '>
                                        //         <h1 className=' font-sans font-semibold '> </h1>
                                        //     </td>
                                        //     <td className='flex-1 text-center '>
                                        //         <tr className='flex'>
                                        //             <td className='flex-1 text-center '>
                                        //                 <tr className='flex'>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //             <td className='flex-1 text-right'>
                                        //                 <tr className=' '>
                                        //                     <td className=' '>
                                        //                         <h1 className='-ml-16 font-sans font-semibold text-[0.7rem]'>1% Monthly Penalty</h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //         </tr>
                                        //     </td>
                                        //     <td className=' text-center border-l border-gray-500 w-48'>
                                        //         <h1 className=' font-sans font-semibold '></h1>
                                        //     </td>
                                        // </tr>
                                        // <tr className='flex border-b border-gray-500  text-xl '>
                                        //     <td className='flex-1 text-center '>
                                        //         <h1 className=' font-sans font-semibold '> </h1>
                                        //     </td>
                                        //     <td className='flex-1 text-center '>
                                        //         <tr className='flex'>
                                        //             <td className='flex-1 text-center '>
                                        //                 <tr className='flex'>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //             <td className='flex-1 text-right'>
                                        //                 <tr className=' '>
                                        //                     <td className=' '>
                                        //                         <h1 className='-ml-16 font-sans font-semibold text-[0.7rem]'>Total Amount</h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //         </tr>
                                        //     </td>
                                        //     <td className=' text-center border-l border-gray-500 w-48'>
                                        //         <h1 className=' font-sans font-semibold '></h1>
                                        //     </td>
                                        // </tr>
                                        // <tr className='flex border-b border-gray-500  text-xl '>
                                        //     <td className='flex-1 text-center '>
                                        //         <h1 className=' font-sans font-semibold '> </h1>
                                        //     </td>
                                        //     <td className='flex-1 text-center '>
                                        //         <tr className='flex'>
                                        //             <td className='flex-1 text-center '>
                                        //                 <tr className='flex'>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                     <td className='flex-1 text-center '>
                                        //                         <h1 className='font-sans font-semibold  '></h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //             <td className='flex-1 text-right'>
                                        //                 <tr className=' '>
                                        //                     <td className=' '>
                                        //                         <h1 className='-ml-16 font-sans font-semibold text-[0.7rem]'>Total Paid Amount</h1>
                                        //                     </td>
                                        //                 </tr>
                                        //             </td>
                                        //         </tr>
                                        //     </td>
                                        //     <td className=' text-center border-l border-gray-500 w-48'>
                                        //         <h1 className=' font-sans font-semibold '></h1>
                                        //     </td>
                                        // </tr> */}
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        {/* Qr code*/}
                        <div>
                            <table className='w-full mt-10 '>
                                <tr className=''>
                                    <td className=' '>
                                        <div className=''>
                                            {/* <QrCode value={this.props?.qrValue} size='64' /> */}
                                            <QrCode url='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/1200px-Jharkhand_Rajakiya_Chihna.svg.png' size='64' />
                                        </div>
                                        <div className='flex '>
                                            <h1 className='flex text-gray-900 font-sans text-md'>For Details Please Visit : udhd.jharkhand.gov.in</h1>
                                        </div>
                                        <div className='flex '>
                                            <h1 className='flex text-gray-900 font-sans text-md'>Or Call us at 1800 8904115 or 0651-3500700</h1>
                                        </div>
                                    </td>
                                    <td className='float-right mt-16'>
                                        <div className='flex '>
                                            <h1 className='flex text-gray-900 font-sans text-md'>In Collaboration with</h1>
                                        </div>
                                        <div className='flex'>
                                            <h1 className='flex text-gray-900 font-sans text-md'>Sri Publication & Stationers Pvt Ltd</h1>
                                        </div>

                                    </td>
                                </tr>
                            </table>
                        </div>

                        {/* computer generated text */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-2 mt-2'>
                            <div className=''>
                                <h1 className='font-semibold text-md text-center '>**This is a computer-generated receipt and it does not require a signature.**</h1>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
        )
    }

export default ComponentToPrint

