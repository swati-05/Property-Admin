import { useState, useEffect } from 'react'
import rupee from '../../../Components/Media/rupee.png'
import brief from '../../../Components/Media/brief.png'
import pay2 from '../../../Components/Media/pay2.png'
import axios from 'axios'
import RazorpayPaymentScreen from '../../../Components/Common/RazorpayPaymentScreen'
import { useNavigate, useParams } from 'react-router-dom'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import PaymentTranscationScreen from '../../../Components/Common/PaymentTranscationScreen'
import { ToastContainer, toast } from 'react-toastify';
import ApiHeader from '../../../Components/ApiList/ApiHeader'
import BarLoader from '@/Components/Common/BarLoader'
import TopTabs from './TopTabs'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import useSetTitle from '@/Components/GlobalData/useSetTitle'


function ViewDemandDetails(props) {

    const { id, location, tabIndex } = useParams()

    console.log("param demand screen...", id)

    const { propertyGenerateOrderId, api_getsafDemandById } = CitizenApplyApiList();
    const navigate = useNavigate()
    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('SAF Demand Details')

    const [loader, setLoader] = useState(false) // Used when click on Pay Now
    const [demandDetail, setdemandDetail] = useState()
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [safNo, setsafNo] = useState('')
    const [isLoading, setisLoading] = useState(false);


    const HEADER = () => {
        let token = window.localStorage.getItem("token");
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
        return header;
    }



    ///////////{*** APPLICATION DETAILS BY ID IN DEMAND SCREEN ***}/////////
    const fetchDemandDetail = () => {
        setisLoading(true)
        axios.post(api_getsafDemandById,
            {
                id: id
            },
            ApiHeader())
            .then(function (response) {
                console.log('view demand for my saf..', response?.data?.data)
                setsafNo(response?.data?.safNo)
                setdemandDetail(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                setisLoading(false)
            })
    }

    useEffect(() => {
        fetchDemandDetail()
    }, [id])

    console.log("demand.......", demandDetail)


    //// PAYMENT METHOD  ////
    const dreturn = (data) => {   // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
        console.log('Payment Status =>', data.status)
        console.log('Payment Status =>', data.message)
        console.log('Payment id =>', data.data.razorpay_payment_id)
        console.log('all transaciton response.... =>', data.data)
        setResponseScreenStatus(data.status)
        if (data?.status) {
            toast.success('Payment Success....')
            navigate(`/paymentReceipt/${data?.data?.razorpay_payment_id}`)
        } else {
            toast.error('Payment failed....')
            navigate('/propertyDashboard')
        }
    }

    const getOrderId = async () => { // This Function is used to Order Id Generation
        // props.showLoader(true)

        const orderIdPayload = {
            id: id,
            amount: demandDetail?.demand?.payableAmount,
            departmentId: 1,
            workflowId: 4,
            ulbId: 2,
            // "id": props?.safSubmitResponse?.data?.safId,
            // "amount": props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount,
            // "departmentId": 1,
            // "workflowId": 4
        }

        // setLoader(true)

        console.log('orderidpayload...', orderIdPayload)
        axios.post(propertyGenerateOrderId, orderIdPayload, HEADER())  // This API will generate Order ID
            .then((res) => {
                console.log("Order Id Response ", res.data)
                if (res.data.status === true) {
                    console.log("OrderId Generated True", res.data.data)
                    RazorpayPaymentScreen(res.data.data, dreturn);  //Send Response Data as Object (amount, orderId, ulbId, departmentId, applicationId, workflowId, userId, name, email, contact) will call razorpay payment function to show payment popup                                      
                    setTimeout(() => {
                        // props.showLoader(false)
                    }, 500)

                }
                else {
                    // props.showLoader(false)
                }
            })
            .catch((err) => {
                alert("Exception. Unable to Generate Order Id");
                console.log("ERROR :-  Unable to Generate Order Id ", err)

                // props.showLoader(false)
            })


    }

    if (responseScreenStatus == true) {
        return (
            <>
                <PaymentTranscationScreen />
            </>
        )
    }

    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000} />


            {
                isLoading && <BarLoader />
            }

            <div className='w-full mx-auto md:px-6'>
                {/* {location == 'workflow' && <div className='px-4'>
                    <button onClick={() => navigate(`/saf-workflow/${tabIndex}/${id}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer"><HiOutlineArrowSmLeft className="inline text-lg" /> Back to Workflow</button>
                </div>} */}
                {/* <h1 className='px-2 font-semibold text-center text-gray-600 font-serif py-2 xl md:text-3xl mt-2'>{props?.detailRules?.detailInfo?.title}</h1> */}

                <div className='pt-10'>
                    <TopTabs title={`Demand Details`} type="application" id={id} safNo={safNo} active="demand" />
                </div>

                <div className='w-full bg-white shadow-xl mb-6'>
                    <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">

                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.saf_no ? demandDetail?.basicDetails?.saf_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Application No.(Saf No)</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.old_ward_no ? demandDetail?.basicDetails?.old_ward_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Ward No.</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-lg'>{demandDetail?.basicDetails?.old_ward_no ? demandDetail?.basicDetails?.old_ward_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>New Ward No</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.ownership_type ? demandDetail?.basicDetails?.ownership_type : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Ownership Type</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.property_type ? demandDetail?.basicDetails?.property_type : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Property Type</div>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.zone_mstr_id ? demandDetail?.basicDetails?.zone_mstr_id : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Zone</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.is_mobile_tower ? demandDetail?.basicDetails?.is_mobile_tower : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.is_hoarding_board ? demandDetail?.basicDetails?.is_hoarding_board : "N/A"} </div>
                                <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.is_petrol_pump ? demandDetail?.basicDetails?.is_petrol_pump : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm' >{demandDetail?.basicDetails?.is_water_harvesting ? demandDetail?.basicDetails?.is_water_harvesting : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=''>
                    {
                        demandDetail?.paymentStatus == 1 &&
                        <div className='w-full mt-20 text-center'>
                            <span className='text-3xl text-red-500 border border-red-500 font-semibold px-4 py-2'>No Dues Found !</span>
                        </div>
                    }

                    {demandDetail?.paymentStatus != 1 &&
                        <>
                            <div className='mt-10'>
                                <h1 className='px-1 font-semibold font-serif text-xs'><img src={rupee} alt="pin" className='w-5 inline' /> Tax Details</h1>
                                <div className='flex font-mono text-xs py-2 px-1 text-gray-900'>
                                    <div className='flex-initial px-2 font-bold'>Total Payable Amount</div>
                                    <div className='flex-initial px-2'>= </div>
                                    <div className='flex-initial px-2 bg-gray-100 rounded-lg'> ( Tax Amount</div>
                                    <div className='flex-initial px-2'>+</div>
                                    <div className='flex-initial px-2 bg-gray-100 rounded-lg'>Late Assessment Penalty</div>
                                    <div className='flex-initial px-2'>+</div>
                                    <div className='flex-initial px-2 bg-gray-100 rounded-lg'>1% Penalty )</div>
                                    <div className='flex-initial px-2'>-</div>
                                    <div className='flex-initial px-2 bg-gray-100 rounded-lg'> ( Rebate</div>
                                    <div className='flex-initial px-2'>+</div>
                                    <div className='flex-initial px-2 bg-gray-100 rounded-lg'>Special Rebate )</div>
                                </div>

                                <table className='min-w-full leading-normal mt-2'>
                                    <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                        <tr>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Tax Amount (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Late Assessment Penalty (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">1% Penalty (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Rebate( {demandDetail?.amounts?.rebatePerc}% in Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Special Rebate( {demandDetail?.amounts?.specialRebatePerc}% in Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Payable Amount (Rs)</th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">

                                        <>

                                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                                <td className="px-2 py-2 text-sm text-left">1</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.totalDemand}</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.lateAssessmentPenalty}</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.totalOnePercPenalty}</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.rebateAmount}</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.specialRebateAmount}</td>
                                                <td className="px-2 py-2 text-sm text-left">{demandDetail?.amounts?.payableAmount}</td>


                                            </tr>

                                        </>

                                    </tbody>
                                </table>
                            </div>


                            {/* due detail list */}
                            <div className='mt-10'>

                                {
                                    demandDetail?.details &&
                                    <div>
                                        <h1 className='px-1 font-semibold font-serif text-md mt-10'><img src={brief} alt="pin" className='w-5 inline' /> Tax Description of Annual Rental Value - As Per Old Rule (Effect Upto 31-03-2016)</h1>
                                        <div className='flex font-mono text-xs py-2 px-1 text-gray-900'>
                                            <div className='flex-initial px-2 font-bold'>Annual Rental Value (ARV)</div>
                                            <div className='flex-initial px-2'>=</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg'>Builtup Area</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg'>Rental Rate</div>
                                        </div>
                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-white text-gray-600'>

                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quater</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quarter / Year</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Holding Tax (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">1% penalty (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Water Tax (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Latrine/Conservancy Tax (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Education Cess (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Health Cess (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quarterly Tax (Rs)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">Adjuted Amount</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs uppercase text-left">Balance</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Due Date</th>


                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                <>
                                                    {demandDetail.details?.map((items, index) => (
                                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.arv}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.qtr}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.fyear}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.holding_tax}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.onePercPenaltyTax}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.water_tax}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.latrine_tax}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.education_cess}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.health_cess}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.amount}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.adjust_amount}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.balance}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{items.due_date}</td>
                                                        </tr>
                                                    ))}

                                                </>

                                            </tbody>
                                        </table>
                                    </div>
                                }




                                <div className='mt-10 flex'>{!loader &&
                                    <>
                                        <div className='text-left flex-1'>
                                            <div>
                                                <span className='font-semibold text-gray-600 text-xl'>Total Payable Amount  </span><span className='text-3xl font-bold ml-20'>Rs {demandDetail?.amounts?.payableAmount}</span>
                                            </div>
                                        </div>
                                        <div className='text-right flex-1'>
                                            <button onClick={() => navigate(`/property-payment/${id}/saf`)} type="submit" className=" px-6 py-1 bg-indigo-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Pay Now <img src={pay2} alt="pay image" className='inline w-5' /></button>
                                        </div>
                                    </>
                                }</div>
                                <div className='h-20 w-full'></div>

                            </div>


                        </>
                    }



                </div>

            </div>

            <div className='w-full h-40'></div>
        </>
    )
}

export default ViewDemandDetails