import { nullToNA, nullToZero } from '@/Components/Common/PowerUps/PowerupFunctions';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillPrinter } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom';
import QrCode from './QrCode';
import { contextVar } from '@/Components/Context/Context';

function SafPaymentReceiptFunctional(props) {
    const { paymentId, module } = useParams()
    const navigate = useNavigate()
    const [printCount, setprintCount] = useState(0)
    const { setprintButtonStatus } = useContext(contextVar)

    // CALLING RECEIPTDATA FUNCTION TO SET THE PRINT DATA TO CONTAINER
    useEffect(() => {
        getReceiptData()
    }, [])


    // CALLING SAME PAGE TWO TIMES TO ACTIVATE ANDROID PRINTBUTTON
    useEffect(() => {
        if (printCount < 2) {
            document.getElementById('printClick').click()
            setprintButtonStatus(true)
            navigate(`/paymentReceipt/${paymentId}/${module}`)  //to activate bluetooth print button of android since it's working if navigate
            setprintCount(prev => prev + 1)
        }

    }, [printCount])

    // FUNCTION TO SET THE DATA TO DUMMYTEXT VAR TO PRINT
    const getReceiptData = () => {
        let dummyText
        // if (globalDataContainer?.propertyType == 'individual') {
        //     if (extraReceiptData?.paymentMode == "Cash") {
        //         dummyText = "<nc>" + ulbName + "</nc><br />" +
        //             "<nc>Solid Waste User Charge</nc><br />" +
        //             "<nc>(Netwind SoftLab Private Limited)</nc><br />" +
        //             "<nc>+91-6513131001</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Payment Receipt</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Date           : " + moment(globalDataContainer.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
        //             "<n>Time           : " + globalDataContainer.paymentReceiptCachedData.transactionTime + "  </n><br />" +
        //             "<n>Ward No.       : " + receiptWard + "  </n><br />" +
        //             "<n>Transaction No.: " + globalDataContainer.paymentReceiptCachedData.transactionNo + "  </n><br />" +
        //             "<n>Holding No.    : " + globalDataContainer.paymentReceiptCachedData.holdingNo + "  </n><br />" +
        //             "<n>Citizen Name    : " + globalDataContainer.paymentReceiptCachedData.consumerName + "  </n><br />" +
        //             "<n>Consumer No.    : " + globalDataContainer.paymentReceiptCachedData.consumerNo + "  </n><br />" +
        //             "<n>Address  : " + globalDataContainer.paymentReceiptCachedData?.address + "  </n><br />" +
        //             "<n>Monthly Charge   : " + globalDataContainer.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
        //             "<n>Paid  From    : " + moment(globalDataContainer.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Amount Paid   : " + globalDataContainer.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
        //             "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             // "<n>TC Name        : " + "" + "   </n><br />" +
        //             // "<n>Mobile No.     : " + "" + "   </n><br />" +
        //             "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
        //             "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
        //             "<n></n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Please keep this Bill For Future Reference</n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Thanking you</nc><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />`"
        //     } else {
        //         dummyText = "<nc>" + ulbName + "</nc><br />" +
        //             "<nc>Solid Waste User Charge</nc><br />" +
        //             "<nc>(Netwind SoftLab Private Limited)</nc><br />" +
        //             "<nc>+91-6513131001</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Payment Receipt</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Date           : " + moment(globalDataContainer.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
        //             "<n>Time           : " + globalDataContainer.paymentReceiptCachedData.transactionTime + "  </n><br />" +
        //             "<n>Ward No.       : " + receiptWard + "  </n><br />" +
        //             "<n>Transaction No.: " + globalDataContainer.paymentReceiptCachedData.transactionNo + "  </n><br />" +
        //             "<n>Holding No.    : " + globalDataContainer.paymentReceiptCachedData.holdingNo + "  </n><br />" +
        //             "<n>Citizen Name    : " + globalDataContainer.paymentReceiptCachedData.consumerName + "  </n><br />" +
        //             "<n>Consumer No.    : " + globalDataContainer.paymentReceiptCachedData.consumerNo + "  </n><br />" +
        //             "<n>Address  : " + globalDataContainer.paymentReceiptCachedData?.address + "  </n><br />" +

        //             "<n>Monthly Charge   : " + globalDataContainer.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
        //             "<n>Paid  From    : " + moment(globalDataContainer.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +

        //             "<n>Amount Paid   : " + globalDataContainer.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
        //             "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Bank Name  : " + globalDataContainer?.bankName + "  </n><br />" +
        //             "<n>Cheuqe No. : " + globalDataContainer?.chequeNo + "  </n><br />" +

        //             "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
        //             "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>" + "Payment is subject to realisation of cheque" + "  </n><br />" +
        //             "<n>Please keep this Bill For Future Reference</n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Thanking you</nc><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />`"
        //     }
        // } else {
        //     if (extraReceiptData?.paymentMode == "Cash") {
        //         dummyText = "<nc>" + ulbName + "</nc><br />" +
        //             "<nc>Solid Waste User Charge</nc><br />" +
        //             "<nc>(Netwind SoftLab Private Limited)</nc><br />" +
        //             "<nc>+91-6513131001</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Payment Receipt</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Date           : " + moment(globalDataContainer.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
        //             "<n>Time           : " + globalDataContainer.paymentReceiptCachedData.transactionTime + "  </n><br />" +
        //             "<n>Ward No.       : " + receiptWard + "  </n><br />" +
        //             "<n>Transaction No.: " + globalDataContainer.paymentReceiptCachedData.transactionNo + "  </n><br />" +
        //             "<n>Apartment Name    : " + globalDataContainer.paymentReceiptCachedData.apartmentName + "  </n><br />" +
        //             "<n>Address  : " + receiptAddress + "  </n><br />" +
        //             "<n>No of flats  : " + flatCount + "  </n><br />" +

        //             "<n>Monthly Charge   : " + globalDataContainer.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
        //             "<n>Paid  From    : " + moment(globalDataContainer.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Amount Paid   : " + globalDataContainer.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
        //             "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +


        //             "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
        //             "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Please keep this Bill For Future Reference</n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Thanking you</nc><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />`"
        //     } else {
        //         dummyText = "<nc>" + ulbName + "</nc><br />" +
        //             "<nc>Solid Waste User Charge</nc><br />" +
        //             "<nc>(Netwind SoftLab Private Limited)</nc><br />" +
        //             "<nc>+91-6513131001</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Payment Receipt</nc><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Date           : " + moment(globalDataContainer.paymentReceiptCachedData.transactionDate, 'YYYY-MM-DD').format('DD-MMM-yy') + "  </n><br />" +
        //             "<n>Time           : " + globalDataContainer.paymentReceiptCachedData.transactionTime + "  </n><br />" +
        //             "<n>Ward No.       : " + receiptWard + "  </n><br />" +
        //             "<n>Transaction No.: " + globalDataContainer.paymentReceiptCachedData.transactionNo + "  </n><br />" +
        //             "<n>Apartment Name    : " + globalDataContainer.paymentReceiptCachedData.apartmentName + "  </n><br />" +
        //             "<n>Address  : " + receiptAddress + "  </n><br />" +
        //             "<n>No of flats  : " + flatCount + "  </n><br />" +

        //             "<n>Monthly Charge   : " + globalDataContainer.paymentReceiptCachedData.monthlyRate + "  </n><br />" +
        //             "<n>Paid  From    : " + moment(globalDataContainer.paymentFrom, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<n>Paid  Upto    : " + moment(globalDataContainer?.paymentReceiptCachedData?.paidUpto, 'YYYY-MM-DD').format('MMM-yy') + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +

        //             "<n>Amount Paid   : " + globalDataContainer.paymentReceiptCachedData.receivedAmount + "  </n><br />" +
        //             "<n>Payment Mode  : " + extraReceiptData?.paymentMode + "  </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>Bank Name  : " + globalDataContainer?.bankName + "  </n><br />" +
        //             "<n>Cheuqe No. : " + globalDataContainer?.chequeNo + "  </n><br />" +

        //             "<n>TC Name        : " + globalDataContainer?.paymentReceiptCachedData?.tcName + "   </n><br />" +
        //             "<n>Mobile No.     : " + globalDataContainer?.paymentReceiptCachedData?.tcMobile + "   </n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<n>" + "Payment is subject to realisation of cheque" + "  </n><br />" +
        //             "<n>Please keep this Bill For Future Reference</n><br />" +
        //             "<nc>-----------------------------------------</nc><br />" +
        //             "<nc>Thanking you</nc><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />" +
        //             "<n></n><br />`"
        //     }

        // }

        dummyText = "<nc>" + "Dummy Property Receipt" + "</nc><br />" +
            "<nc>Solid Waste User Charge</nc><br />" +
            "<nc>(Netwind SoftLab Private Limited)</nc><br />" +
            "<nc>+91-6513131001</nc><br />" +
            "<nc>-----------------------------------------</nc><br />" +
            "<nc>Payment Receipt</nc><br />" +
            "<nc>-----------------------------------------</nc><br />" +
          


        console.log(dummyText)

        document.getElementById('printClick').value = dummyText
        document.getElementById('printClick').click()
    }



    return (
        <>

            <div className='fixed bottom-10 text-center  justify-center items-center  w-screen' style={{ zIndex: 999 }}>
                <button onClick={() => window.print()} className=" ml-4 font-bold px-6 py-1 bg-indigo-500 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white">
                    <AiFillPrinter className='inline text-lg' />
                    print
                </button>
            </div>
            <div id="printableArea" className='h-screen flex items-center justify-center sm:w-auto  mt-[16rem] print:mt-0 sm:mt-0 '>

                <div>
                    {/* <NonBlockingLoader show={show} /> */}

                    <div className='border-2 border-dashed border-gray-600 bg-white p-1 sm:p-2 print:p-2 sm:w-[250mm] w-[100vw] h-auto sm:ml-12 md:mx-auto lg:mx-auto  container '>
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 '>
                            <div className=''>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/1200px-Jharkhand_Rajakiya_Chihna.svg.png' className='h-20 mx-auto' />
                            </div>
                            <div className=''>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jharkhand_Rajakiya_Chihna.svg/1200px-Jharkhand_Rajakiya_Chihna.svg.png' alt="" className='w-[22rem] h-[22rem]  absolute bg-transparent opacity-20 mt-[16rem] ml-[10rem]  rounded-full border' />
                            </div>
                        </div>

                        {/* rmc */}
                        <div className='grid grid-col-1 md:grid-col-12 lg:grid-col-12 pt-2'>
                            <div className=''>
                                <h1 className='font-bold text-2xl sm:text-4xl print:text-4xl text-center '>RANCHI MUNICIPAL CORPORATION</h1>
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
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans '>Receipt No. :</h1>
                                            <h1 className='flex font-sans font-semibold  pl-2'> {nullToNA(props?.paymentData?.transactionNo)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans '>Department/Section :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToNA(props?.paymentData?.departmentSection)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans '>Account Description :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToNA(props?.paymentData?.accountDescription)
                                            }</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            {/* <h1 className='flex text-gray-900 font-sans '>Holding No. :</h1>
                                            nullToNA(<h1 className='flex font-sans font-semibold pl-2 '>{props?.paymentData?.holdingNo)
                                            }</h1> */}
                                        </div>
                                    </td>
                                    <td className=' '>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans '>Date :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToNA(props?.paymentData?.transactionDate)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans mr-1'>Old Ward No. : <span className='font-sans font-semibold pl-2'>{nullToNA(props?.paymentData?.oldWardNo)}</span> </h1>/
                                            <h1 className='flex text-gray-900 font-sans ml-1'>New Ward No. : <span className='font-sans font-semibold pl-2'>{nullToNA(props?.paymentData?.newWardNo)}</span> </h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>
                                            <h1 className='flex text-gray-900 font-sans '>{this?.props?.module == 'holding' ? 'Holding No.' : 'Application No. '} </h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToNA(props?.paymentData?.applicationNo)}</h1>
                                        </div>

                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>  </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '></div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '>  </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row '></div>
                                    </td>
                                </tr>
                            </table>
                        </div>


                        {/* detail section 2 */}
                        <div>
                            <table className='w-full p-2 mt-4 text-md'>
                                <tr className=''>
                                    <td className=' '>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row'>
                                            <h1 className='flex text-gray-900 font-sans '>Received From Mr/Mrs/Miss :</h1>
                                            <h1 className='flex font-sans font-semibold  pl-2'>{nullToNA(props?.paymentData?.customerName)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row'>
                                            <h1 className='flex text-gray-900 font-sans '>Address :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToNA(props?.paymentData?.address)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row'>
                                            <h1 className='flex text-gray-900 font-sans '>A Sum of :</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 '>{nullToZero(parseFloat(props?.paymentData?.totalPaidAmount)).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row'>
                                            <h1 className='flex text-gray-900 font-sans '>(in words ):</h1>
                                            <h1 className='flex font-sans font-semibold pl-2 border-b border-dashed border-gray-600 '>{nullToNA(props?.paymentData?.paidAmtInWords)}</h1>
                                        </div>
                                        <div className='flex p-1 flex-col sm:flex-row print:flex-row'>
                                            <h1 className='flex text-gray-900 font-sans '>towards : <span className=' font-sans font-semibold ml-1'>{nullToNA(props?.paymentData?.towards)}</span></h1>
                                            <h1 className='flex text-gray-900 font-sans  ml-8 '>Vide : {nullToNA(props?.paymentData?.paymentMode)} <span className=' font-sans font-semibold ml-1'></span></h1>
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
                                                            <h1 className='font-sans font-semibold  border-r border-gray-500 text-[0.7rem]'>{nullToNA(props?.paymentData?.paidFromQtr)}</h1>
                                                        </td>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className='font-sans font-semibold  border-r border-gray-500 text-[0.7rem]'>{nullToNA(props?.paymentData?.paidFrom)}</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                                <td className='flex-1   text-center'>
                                                    <tr className='flex  '>
                                                        <td className='flex-1 text-center '>
                                                            <h1 className=' font-sans font-semibold border-r border-gray-500 text-[0.7rem]'>{nullToNA(props?.paymentData?.paidUptoQtr)}</h1>
                                                        </td>
                                                        <td className='flex-1 text-center'>
                                                            <h1 className=' font-sans font-semibold text-[0.7rem]'>{nullToNA(props?.paymentData?.paidUpto)}</h1>
                                                        </td>
                                                    </tr>
                                                </td>
                                            </tr>
                                        </td>
                                        <td className='text-center border-l w-48'>
                                            <h1 className=' font-sans font-semibold '>{nullToZero(parseFloat(props?.paymentData?.demandAmount)).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</h1>
                                        </td>
                                    </tr>

                                    {props?.paymentData?.taxDetails?.map((items) => (
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
                                                                <h1 className='-ml-16 font-sans font-semibold text-sm'>{nullToNA(items?.keyString)}</h1>
                                                            </td>
                                                        </tr>
                                                    </td>
                                                </tr>
                                            </td>
                                            <td className=' text-center border-l border-gray-500 w-48'>
                                                <h1 className=' font-sans font-semibold '>{nullToZero(parseFloat(items?.value)).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</h1>
                                            </td>
                                        </tr>

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
                                            {/* <QrCode value={props?.qrValue} size='64' /> */}
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

export default SafPaymentReceiptFunctional
