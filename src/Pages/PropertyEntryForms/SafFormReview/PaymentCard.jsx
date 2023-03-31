import React from 'react'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import RazorpayPaymentScreen from '../../../Components/Common/RazorpayPaymentScreen'
import { ToastContainer, toast } from 'react-toastify';
import BarLoader from '@/Components/Common/BarLoader'
import axios from 'axios'
import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import BrandLoader from '@/Components/Common/BrandLoader'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import { BsCurrencyRupee } from 'react-icons/bs'
import { BiRightArrowAlt } from 'react-icons/bi'



function PaymentCard(props) {

  const { propertyGenerateOrderId, propertyGenerateHoldingOrderId, api_getTransactionNoForReceipt, api_postPropertyPaymentOffline, api_postSafPaymentOffline, api_postClusterSafPayment, api_postClusterPropertyPayment } = CitizenApplyApiList();
  const { id, moduleType } = useParams()
  const [responseScreenStatus, setResponseScreenStatus] = useState(false)
  const [isLoading, setisLoading] = useState(false);
  const [currentTransactionNo, setcurrentTransactionNo] = useState(null);
  const [erroState, seterroState] = useState(false);

  const navigate = useNavigate()
  console.log('saf submit response data at payment...', props.safSubmitResponse)

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK

  const [formHide, setFormHide] = useState(false)
  const [paymentMode, setPaymentMode] = useState()
  const [advanceStatus, setadvanceStatus] = useState(false)
  let validationSchema

  if (moduleType == 'holding') {
    validationSchema = yup.object({
      paymentUptoYear: yup.string().required('Select Payment upto year'),
      paymentUptoQuarter: yup.string().required('Select payment upt quarter'),
      paymentMode: yup.string().required('select payment mode'),

      remarks: yup.string().required('Enter remarks'),
      // bankName: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // branchName: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // cheque_dd_no: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // cheque_dd_date: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      bankName: yup.string(),
      branchName: yup.string(),
      cheque_dd_no: yup.string(),
      cheque_dd_date: yup.string(),

      payAdvance: yup.string(),
      advanceAmount: yup.string().when('payAdvance', {
        is: true,
        then: yup.string().required('Enter advance amount')
      }),


    })
  }
  if (moduleType == 'saf') {
    validationSchema = yup.object({
      paymentUptoYear: yup.string(),
      paymentUptoQuarter: yup.string(),
      paymentMode: yup.string().required('select payment mode'),

      remarks: yup.string().required('Enter remarks'),
      // bankName: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // branchName: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // cheque_dd_no: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // cheque_dd_date: yup.string().when('paymentMode', {
      //   is: 'CHEQUE',
      //   then: yup.string().required('Enter bank name')
      // }),

      // bankName: yup.string().required('enter bank name'),
      // branchName: yup.string().required('enter branch name'),
      // cheque_dd_no: yup.string().required('enter cheque no'),
      // cheque_dd_date: yup.string().required('enter cheque date'),
      bankName: yup.string(),
      branchName: yup.string(),
      cheque_dd_no: yup.string(),
      cheque_dd_date: yup.string(),

      payAdvance: yup.string(),
      advanceAmount: yup.string().when('payAdvance', {
        is: true,
        then: yup.string().required('Enter advance amount')
      }),


    })
  }
  const formik = useFormik({
    initialValues: {
      paymentUptoYear: '',
      paymentUptoQuarter: '',
      paymentMode: 'CASH',

      remarks: '',
      bankName: '',
      branchName: '',
      cheque_dd_no: '',
      cheque_dd_date: '',
      payAdvance: '',
      advanceAmount: '',


    },

    onSubmit: (values, resetForm) => {
      console.log('values at submit payment', values)
      if (values?.paymentMode == 'ONLINE') {
        getOrderId()
      } else {
        makePayment(values)
      }
    }
    , validationSchema
  })

  const toggleForm = (e) => {
    console.log('checkbox is changing ', e.target.checked)
    setFormHide(e.target.checked)
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value


    { (name == 'paymentMode') && setPaymentMode(value) }
    { (name == 'payAdvance') && setadvanceStatus(e.target.checked) }
  }

  //// PAYMENT METHOD  ////
  const dreturn = (data) => {   // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
    console.log('all transaciton response.... =>', data)
    setResponseScreenStatus(data.status)
    if (data?.status) {
      fetchTransactionNo(data?.data)
      toast.success('Payment Success....')
    } else {
      toast.error('Payment failed....')
    }
  }


  // FETCHING TRANSACTION NO TO PASS TO RECEIPT
  const fetchTransactionNo = (data) => {
    seterroState(false)
    let requestBody = {
      orderId: data?.razorpay_order_id,
      paymentId: data?.razorpay_payment_id
    }
    axios.post(api_getTransactionNoForReceipt, requestBody, ApiHeader())
      .then(function (response) {
        setcurrentTransactionNo(response?.data?.data?.transaction_no)
        console.log('transaction no get response...', response?.data)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log('transaction no get error...', error)
        seterroState(true)
        setisLoading(false)
      })
  }

  const getOrderId = async () => { // This Function is used to Order Id Generation
    // props.showLoader(true)
    setisLoading(true)
    let url
    let orderIdPayload

    if (moduleType == 'holding') {
      url = propertyGenerateHoldingOrderId
      orderIdPayload = {
        propId: id,
        amount: props?.paymentDetails?.totalDues,
      }
    }
    if (moduleType == 'saf') {
      url = propertyGenerateOrderId
      orderIdPayload = {
        id: id,
        amount: props?.safPaymentDetailsData?.payableAmount,
      }
    }

    // setLoader(true)

    console.log('before get order id...', orderIdPayload)
    axios.post(url, orderIdPayload, ApiHeader())  // This API will generate Order ID
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
        setisLoading(false)
      })
      .catch((err) => {
        toast.error('Unable to generated order id...')
        console.log("ERROR :-  Unable to Generate Order Id ", err)
        setisLoading(false)

        // props.showLoader(false)
      })


  }

  // FUNCTION FOR PAYMENT OTHER THAN ONLINE MODE
  const makePayment = (data) => {
    seterroState(false)
    setisLoading(true)
    let url
    let requestBody = {
      id: id,
      amount: props?.paymentDetails?.totalDues,
      paymentMode: data?.paymentMode,
      ulbId: props?.basicDetails?.ulb_id,
      chequeDate: data?.cheque_dd_date,
      bankName: data?.bankName,
      branchName: data?.branchName,
      chequeNo: data?.cheque_dd_no
    }

    if (moduleType == 'holding') {
      url = api_postPropertyPaymentOffline
    }
    if (moduleType == 'saf') {
      url = api_postSafPaymentOffline
    }


    console.log('before make payment..', requestBody)
    // return
    axios.post(url, requestBody, ApiHeader())
      .then(function (response) {
        console.log('property payment response...', response?.data)
        setcurrentTransactionNo(response?.data?.data?.TransactionNo)
        setResponseScreenStatus(response?.data?.status)

        setisLoading(false)
      })
      .catch(function (error) {
        console.log('property payment error..', error)
        seterroState(true)
        setisLoading(false)
      })
  }

  const feedPaymentInput = () => {
    // formik.setFieldValue('paymentUptoYear', props?.paymentDetails?.paymentUptoYrs[0])
    // formik.setFieldValue('paymentUptoQuarter', props?.paymentDetails?.paymentUptoQtrs[0])

    // IF USER TYPE IS DIRECT THEN SET DEFAULT SELECT PAYMENT MODE ONLINE 
    // if (userType == 'direct') {
    //   formik.setFieldValue('paymentMode', 'ONLINE')
    // }

    // IF USER TYPE IS NOT DIRECT THEN SET DEFAULT SELECT PAYMENT MODE CASH 
    // if (userType != 'direct') {
    //   formik.setFieldValue('paymentMode', 'CASH')
    // }
  }

  // useEffect(() => {
  //   feedPaymentInput()
  // }, [])

  if (isLoading) {
    return (
      <>
        <BarLoader />
      </>
    )
  }
  if (erroState) {
    return (
      <CommonModal>
        <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
      </CommonModal>
    )
  }



  if (responseScreenStatus == true) {
    return (
      <>
        <div className="w-full h-full bg-white p-20">
          <div>
            <div className="text-center font-semibold text-3xl">Your payment has been successfully done ! Now the application is sent to back office.</div>
            <div className="text-center mt-6">
              <button className={`mr-4 bg-indigo-500  text-white px-6 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/paymentReceipt/${currentTransactionNo}/${moduleType == "saf" ? "saf" : "holding"
                }`)}>View Receipt</button>
              {moduleType != "direct" && <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/propApplicationDetails/${id}`)}>View Application</button>}
            </div>
          </div>
        </div>
      </>
    )
  }
  return (

    <>
      {/* {

        isLoading && <BarLoader />
      } */}
      <ToastContainer position="top-right"
        autoClose={2000} />
      <div className={` block p-4 mt-4 w-full md:py-4 md:px-40 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto mb-20 `}>
        {/* <h1 className='px-2 font-semibold mt-0 bg-sky-100 text-center text-gray-700 font-serif py-2 text-lg shadow-lg border border-white'>SAF Payment</h1> */}



        <div className=" block p-4 w-full md:py-6 rounded-lg bg-white mx-auto ">
          {/* <h1 className='mb-2 text-gray-600'><img src={rupee} alt="rupee-image" className='w-5 inline' /> Demand Amount - <span className='font-semibold text-lg text-gray-800'>2000</span></h1> */}
          <form onSubmit={formik.handleSubmit} onChange={handleChange} className="p-4 relative">
            <div className="grid grid-cols-12">




              <>
                {
                  moduleType === 'holding' && <>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Payment Upto Year</label>
                      <select {...formik.getFieldProps('paymentUptoYear')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                      >
                        <option value={''} >{'Select'}</option>
                        {
                          props?.paymentDetails?.paymentUptoYrs?.map((data, index) => (
                            <option selected={index == 0 ? true : false} value={data} >{data}</option>
                          ))
                        }
                      </select>
                      <span className="text-red-600 absolute text-xs">{formik.touched.paymentUptoYear && formik.errors.paymentUptoYear ? formik.errors.paymentUptoYear : null}</span>
                    </div>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Payment Upto Quarter</label>
                      <select {...formik.getFieldProps('paymentUptoQuarter')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                      >
                        <option value={''} >{'select'}</option>

                        {
                          props?.paymentDetails?.paymentUptoQtrs?.map((data, index) => (
                            <option selected={index == 0 ? true : false} value={data} >{data}</option>
                          ))
                        }
                      </select>
                      <span className="text-red-600 absolute text-xs">{formik.touched.paymentUptoQuarter && formik.errors.paymentUptoQuarter ? formik.errors.paymentUptoQuarter : null}</span>
                    </div>
                  </>
                }
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Payment Mode</label>
                  <select {...formik.getFieldProps('paymentMode')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                  >
                    {/* IF USER TYPE IS DIRECT CITIZEN THEN DON'T SHOW OTHER PAYMENT MEHTOD */}
                    {/* {
                        userType != 'direct' &&
                        <> */}
                    <option value="CASH" >Cash</option>
                    <option value="CHEQUE" >Cheque</option>
                    <option value="DD" >DD</option>
                    {/* </>
                      } */}
                    {/* <option value="ONLINE" >Online</option> */}


                  </select>
                  <span className="text-red-600 absolute text-xs">{formik.touched.paymentMode && formik.errors.paymentMode ? formik.errors.paymentMode : null}</span>
                </div>


                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Remarks</label>
                  <input {...formik.getFieldProps('remarks')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    placeholder="Enter new ward no." />
                  <span className="text-red-600 absolute text-xs">{formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}</span>
                </div>

                {/* toggle inputs of payment mode */}
                {
                  (paymentMode == 'CHEQUE' || paymentMode == 'DD') && <>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Bank Name</label>
                      <input {...formik.getFieldProps('bankName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        placeholder="Enter new ward no." />
                      <span className="text-red-600 absolute text-xs">{formik.touched.bankName && formik.errors.bankName ? formik.errors.bankName : null}</span>
                    </div>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Branch Name</label>
                      <input {...formik.getFieldProps('branchName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                        placeholder="Enter new ward no." />
                      <span className="text-red-600 absolute text-xs">{formik.touched.branchName && formik.errors.branchName ? formik.errors.branchName : null}</span>
                    </div>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Cheque/DD No</label>
                      <input {...formik.getFieldProps('cheque_dd_no')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                      />
                      <span className="text-red-600 absolute text-xs">{formik.touched.cheque_dd_no && formik.errors.cheque_dd_no ? formik.errors.cheque_dd_no : null}</span>
                    </div>
                    <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                      <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Cheque/DD Date</label>
                      <input {...formik.getFieldProps('cheque_dd_date')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                        placeholder="Enter new ward no." />
                      <span className="text-red-600 absolute text-xs">{formik.touched.cheque_dd_date && formik.errors.cheque_dd_date ? formik.errors.cheque_dd_date : null}</span>
                    </div>
                  </>
                }

                {/* pay advance */}
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <input {...formik.getFieldProps('payAdvance')} id="checked-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 cursor-pointer" />
                  <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pay Advance</label>
                  <span className="text-red-600 absolute text-xs">{formik.touched.payAdvance && formik.errors.payAdvance ? formik.errors.payAdvance : null}</span>
                </div>

                {advanceStatus && <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>advance amount</label>
                  <input {...formik.getFieldProps('advanceAmount')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    placeholder="Enter new ward no." />
                  <span className="text-red-600 absolute text-xs">{formik.touched.advanceAmount && formik.errors.advanceAmount ? formik.errors.advanceAmount : null}</span>
                </div>}
              </>

              {/* line break */}
              <div className='col-span-12'></div>

              {/* text details */}
              {/* SHOW IN CASE OF HOLDING */}
              {(moduleType === 'holding') && <div className='bg-white col-span-12 grid grid-cols-12 pt-6 mb-4 border border-gray-200'>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.paymentDetails?.rebateAmt)}</span>
                </div>
                {moduleType == 'saf' && <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Late Assessment Penalty :</span> <span className='font-mono font-semibold'>{nullToNA(props?.paymentDetails?.lateAssPenalty)}</span>
                </div>}
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Special Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.paymentDetails?.rebatePerc)}</span>
                </div>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>1% Penalty Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.paymentDetails?.onePercPenalty)}</span>
                </div>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <div className='w-2/3'><span>Total Payable Amount :</span> <span className='font-mono font-semibold text-xl'>{nullToNA(props?.paymentDetails?.payableAmount)}</span></div>
                </div>
              </div>}
              {/* SHOW IN CASE OF SAF */}
              {moduleType === 'saf' && <div className='bg-white col-span-12 grid grid-cols-12 pt-6 mb-4 border border-gray-200'>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.safPaymentDetailsData?.rebateAmount)}</span>
                </div>
                {moduleType == 'saf' && <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Late Assessment Penalty :</span> <span className='font-mono font-semibold'>{nullToNA(props?.safPaymentDetailsData?.lateAssessmentPenalty)}</span>
                </div>}
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>Special Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.safPaymentDetailsData?.specialRebateAmount)}</span>
                </div>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <span>1% Penalty Rebate :</span> <span className='font-mono font-semibold'>{nullToNA(props?.safPaymentDetailsData?.totalOnePercPenalty)}</span>
                </div>
                <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                  <div className='w-2/3'><span>Total Payable Amount :</span> <span className='font-mono font-semibold text-xl'>{nullToNA(props?.safPaymentDetailsData?.payableAmount)}</span></div>
                </div>
              </div>

              }





              <div className="col-span-12 grid grid-cols-2 mt-10">

                <div className=''>

                </div>
                <div className='md:pl-10 text-right'>

                  <button type='submit' className="ml-4 font-bold px-6 py-2 bg-indigo-500 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white">Pay <BsCurrencyRupee className="inline mr-0 ml-2" />{nullToNA(props?.safPaymentDetailsData?.payableAmount)} </button>
                </div>

              </div>
            </div>

          </form>
        </div>


      </div>
    </>
  )
}

export default PaymentCard