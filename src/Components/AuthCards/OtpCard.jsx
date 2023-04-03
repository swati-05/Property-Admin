import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import axios from 'axios';
import BarLoader from '@/Components/Common/BarLoader';
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '../Common/ServerErrorCard';
import { contextVar } from '../ContextVar';


function OtpCard(props) {
    const [reSendStatus, setreSendStatus] = useState(false)
    const [fullOtp, setfullOtp] = useState('')
    const { api_verifyMobileOtp } = CitizenApplyApiList()
    const [isLoading, setisLoading] = useState(false)
    const { notify } = useContext(contextVar)
    const [isButtonEnabled, setisButtonEnabled] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')




    const [timer, settimer] = useState(4)

    const [otp, setOtp] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
    });

    const firstRef = useRef()
    const secondRef = useRef()
    const thirdRef = useRef()
    const fourthRef = useRef()
    const fifthRef = useRef()
    const sixthRef = useRef()

    const navigate = useNavigate()

    const [activeInput, setActiveInput] = useState("first");

    const handleChange = (e, input) => {
        seterrorMsg('')
        let tempOtp = { ...otp, [input]: e.target.value }
        setOtp({ ...otp, [input]: e.target.value });
        if (e.target.value.length === 1) {
            switch (input) {
                case "first":
                    secondRef.current.focus()
                    setActiveInput("second");
                    break;
                case "second":
                    thirdRef.current.focus()
                    setActiveInput("third");
                    break;
                case "third":
                    fourthRef.current.focus()
                    setActiveInput("fourth");
                    break;
                case "fourth":
                    fifthRef.current.focus()
                    setActiveInput("fifth");
                    break;
                case "fifth":
                    sixthRef.current.focus()
                    setActiveInput("sixth");
                    break;
                case "sixth":
                    setActiveInput("sixth");
                    break;
                default:
                    break;
            }
        }
        activateButton(tempOtp)
    };

    const handleBack = input => {
        switch (input) {
            case "second":
                firstRef.current.focus()
                setOtp({ ...otp, second: "" });
                setActiveInput("first");
                break;
            case "third":
                secondRef.current.focus()
                setOtp({ ...otp, third: "" });
                setActiveInput("second");
                break;
            case "fourth":
                thirdRef.current.focus()
                setOtp({ ...otp, fourth: "" });
                setActiveInput("third");
                break;
            case "fifth":
                fourthRef.current.focus()
                setOtp({ ...otp, fifth: "" });
                setActiveInput("fouth");
                break;
            case "sixth":
                fifthRef.current.focus()
                setOtp({ ...otp, sixth: "" });
                setActiveInput("fifth");
                break;
            default:
                break;
        }
    };

    const activateButton = (passedOtp) => {
        console.table(passedOtp)
        if (passedOtp.first != '' && passedOtp.second != '' && passedOtp.third != '' && passedOtp.fourth != '' && passedOtp.fifth != '' && passedOtp.sixth != '') {
            setisButtonEnabled(true)
        } else {
            setisButtonEnabled(false)
        }
    }

    // FUNCTION WHICH SENDS OTP TO REGISTERED MOBILE NO
    const verifyOtp = () => {
        seterroState(false)
        setisLoading(true)
        let requestBody = {
            otp: `${otp.first}${otp.second}${otp.third}${otp.fourth}${otp.fifth}${otp.sixth}`,
            mobileNo: props?.verifedMobileNo
        }

        console.log('before verify otp...', requestBody)
        // props?.callback()
        // return
        axios
            .post(api_verifyMobileOtp, requestBody)
            .then((response) => {
                console.log('otp verify response', response?.data)
                if (response?.data?.status) {
                    props?.callback()
                } else {
                    notify('Wrong OTP, Please enter correct OTP', 'error')
                    seterrorMsg(response?.data?.message)
                }
                setisLoading(false)


            })
            .catch((err) => {
                console.log("otp verify error", err)
                notify('Something went wrong...', 'error')
                seterrorMsg('Something went wrong !')
                seterroState(true)
                setisLoading(false)
            });
    }


    let timerInterval
    // STATIC COUNT TO STOP THE VARIABLE OTHERWISE DUE TO SETSTATE SYNC PROCESS CLEARINTERVAL NOT WORKING
    let staticCount = 4

    const activateResendTimer = () => {
        timerInterval = setInterval(() => {
            settimer((prev) => prev - 1)
            staticCount = staticCount - 1
            if (staticCount == 0) {
                setreSendStatus(true)
                console.log('inside static stop...')
                clearInterval(timerInterval)
            }
        }, 1000);
    }

    useEffect(() => {
        activateResendTimer()
    }, [])

    const [erroState, seterroState] = useState(false);
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
                <div className="">
                    <div className="container mx-auto">
                        <div className="max-w-sm mx-auto md:max-w-lg">
                            <div className="w-full px-2 md:px-0">
                                <div className='w-full text-center py-2  bg-gray-200 text-black relative'>{props?.headTitle}

                                    <button
                                        onClick={props?.closeOtpModal}
                                        type="button"
                                        className="absolute top-1 right-6 bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center shadow-sm  hover:bg-red-200 hover:border-none"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="bg-white py-20 px-6 md:py-20 md:px-20 w-full md:w-auto rounded text-center shadow-xl relative">
                                    <div className="text-2xl font-bold px-2">OTP Verification
                                    </div>
                                    <div className="flex flex-col mt-4 text-center">
                                        <span className='text-center text-red-400'>{errorMsg}</span>
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <span>Enter the OTP you received at</span>
                                        <span className="font-bold">+91 {props?.verifedMobileNo}</span>
                                    </div>

                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">

                                        <input ref={firstRef} type="text" min={0} value={otp.first} maxLength={1} onChange={e => handleChange(e, "first")} onKeyDown={e => e.key === "Backspace" && handleBack("first")} className={`${activeInput === "first" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                        <input ref={secondRef} type="text" min={0} value={otp.second} maxLength={1} onChange={e => handleChange(e, "second")} onKeyDown={e => e.key === "Backspace" && handleBack("second")} className={`${activeInput === "second" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                        <input ref={thirdRef} type="text" min={0} value={otp.third} maxLength={1} onChange={e => handleChange(e, "third")} onKeyDown={e => e.key === "Backspace" && handleBack("third")} className={`${activeInput === "third" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                        <input ref={fourthRef} type="text" min={0} value={otp.fourth} maxLength={1} onChange={e => handleChange(e, "fourth")} onKeyDown={e => e.key === "Backspace" && handleBack("fourth")} className={`${activeInput === "fourth" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                        <input ref={fifthRef} type="text" min={0} value={otp.fifth} maxLength={1} onChange={e => handleChange(e, "fifth")} onKeyDown={e => e.key === "Backspace" && handleBack("fifth")} className={`${activeInput === "fifth" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                        <input ref={sixthRef} type="text" min={0} value={otp.sixth} maxLength={1} onChange={e => handleChange(e, "sixth")} onKeyDown={e => e.key === "Backspace" && handleBack("sixth")} className={`${activeInput === "sixth" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                        />
                                    </div>

                                    <div className="flex justify-center text-center mt-5">
                                        {!reSendStatus && <div className='w-10 h-10 bg-indigo-500 flex justify-center items-center rounded-full text-white'>{timer}</div>}
                                        <button disabled={!reSendStatus} onClick={() => {
                                            props?.reSendOtp()
                                            setreSendStatus(false)
                                            settimer(4)
                                            staticCount = 4
                                            activateResendTimer()
                                        }} className={`ml-4 flex items-center ${reSendStatus ? 'text-indigo-500 hover:text-blue-900 cursor-pointer' : 'text-gray-400 hover:text-none cursor-default'}`}><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></button>
                                    </div>

                                    <div className="w-full text-center mt-5">

                                        {isButtonEnabled && <button type='button' onClick={verifyOtp} className="w-full  py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>}
                                        {!isButtonEnabled && <button type='button' className="w-full  py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight  rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out cursor-default ">Submit</button>}
                                    </div>
                                    {props?.bottomNaviation != false && <div className='text-left w-full mt-10 flex justify-center items-center'>
                                        <div className='flex-1'>
                                            <span onClick={() => navigate('/')} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer '>Home</span>
                                        </div>
                                        <div className='flex-1'>
                                            <span onClick={() => navigate('/login')} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer float-right'>Login </span>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonModal>
        </>
    )
}

export default OtpCard