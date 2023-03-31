// Author - Talib Hussain
// Version - 1.0
// Date - 17 MARCH 2023
// Revision - 1
// Project - JUIDCO
// Status - open
// Component  - MobileNoCard
// DESCRIPTION - This component is to enter mobile no to send otp.

import { useContext, useState } from 'react'
import { allowNumberInput } from '@/Components/Common/PowerUps/PowerupFunctions';
import { useFormik } from "formik";
import * as yup from "yup";
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import BarLoader from '@/Components/Common/BarLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '../Common/ServerErrorCard';
import { contextVar } from '../ContextVar';



function MobileNoCard(props) {

    const [isLoading, setisLoading] = useState(false)
    const [isButtonEnabled, setisButtonEnabled] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')
    const [erroState, seterroState] = useState(false);

    const { api_sendMobileOtp } = CitizenApplyApiList()
    const { notify } = useContext(contextVar)
    const navigate = useNavigate()

    const validationSchema = yup.object({
        mobileNo: yup.string().required("Enter 10 digit mobile no.").min(10, 'Enter 10 digit mobile no.'),
    });
    const formik = useFormik({
        initialValues: {
            mobileNo: "",
        },
        onSubmit: (values) => {
            console.log('at submit form.....', values)
            // SET MOBILE NUMBER TO SEND WITH OTP TO VERIFY OTP
            props?.setverifedMobileNo(values.mobileNo)
            sendOtp()
        },
        validationSchema,
    });

    const handleChange = (e) => {
        seterrorMsg('')
        let name = e.target.name
        let value = e.target.value

        { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
        if (name == 'mobileNo' && (value.length >= 10)) {
            setisButtonEnabled(true)
        }
        else {
            setisButtonEnabled(false)
        }
    };

    // FUNCTION WHICH SENDS OTP TO REGISTERED MOBILE NO
    const sendOtp = () => {
        console.log('otp send...')
        setisLoading(true)
        setisButtonEnabled(false)
        let requestBody
        // FOR REGISTER CASE PASS TYPE SO THAT WHEN MOBILE NO EXIST THEN DONT PROCEED
        if (props?.cardFor == 'Register') {
            requestBody = {
                mobileNo: formik.values.mobileNo,
                type: 'Register'
            }
        } else {
            requestBody = {
                mobileNo: formik.values.mobileNo
            }
        }

        console.log('before send otp...', requestBody)
        // return
        axios
            .post(api_sendMobileOtp, requestBody, { timeout: 1000 })
            .then((response) => {
                console.log('otp send response', response?.data)
                if (response?.data?.status) {
                    notify('OTP is send to your mobile no.', 'success')
                    props?.setmobileCardStatus(false)
                    props?.setotpCardStatus(true)
                } else {
                    notify(response?.data?.message, 'error')
                    seterrorMsg(response?.data?.message)
                }
                setisLoading(false)

            })
            .catch((err) => {
                console.log("error otp send", err)
                // notify('Something went wrong...', 'error')
                // seterrorMsg('Something went wrong !')
                seterroState(true)
                setisLoading(false)
                setisButtonEnabled(true)
            });
    }

    if (erroState) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }

    return (
        <>
            {
                isLoading && <BarLoader />
            }
            <CommonModal>
                <div class="">
                    <div class="">
                        <div class="container mx-auto">
                            <div class="max-w-sm mx-auto md:max-w-lg">
                                <div class="w-full">
                                    <div className='w-full text-center py-2 bg-gray-200 text-black relative'>{props?.headTitle}
                                        <button
                                            onClick={props?.closeMobileModal}
                                            type="button"
                                            class="absolute top-1 right-6 bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center shadow-sm  hover:bg-red-200 hover:border-none"
                                        >
                                            <svg class="w-5 h-5" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button></div>
                                    <div class="bg-white py-20 px-6 md:py-20 md:px-20 w-full md:w-auto rounded text-center shadow-xl relative">


                                        <div class="flex flex-col mt-4 text-center">
                                            <span className='text-center text-red-400'>{errorMsg}</span>
                                        </div>
                                        <div class="text-2xl font-bold">{props?.title}

                                        </div>
                                        <div class="flex flex-col mt-4 text-center">
                                            <span className='text-center'>{props?.desc}</span>
                                        </div>

                                        <div class="flex flex-row justify-center text-center mt-5 w-full">
                                            <form onSubmit={formik.handleSubmit} onChange={handleChange} >
                                                <div className='w-full'>
                                                    <input type="text" min={0}  {...formik.getFieldProps('mobileNo')} className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                    />
                                                </div>
                                                <div class="w-full text-center mt-5">

                                                    {isButtonEnabled && <button type='submit' className="w-full  py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>}
                                                    {!isButtonEnabled && <button type='button' className="w-full  py-2.5 bg-gray-300 text-white font-medium text-xs leading-tight  rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out cursor-default ">Submit</button>}
                                                </div>
                                                <div className='text-left w-full mt-10 flex justify-center items-center'>
                                                    <div className='flex-1'>
                                                        <span onClick={() => navigate('/')} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer '>Home</span>
                                                    </div>
                                                    <div className='flex-1'>
                                                        <span onClick={() => navigate('/login')} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer float-right'>Login </span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </CommonModal>

        </>
    )
}

export default MobileNoCard