import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function OtpCard(props) {
    const [reSendStatus, setreSendStatus] = useState(false)
    const [timer, settimer] = useState(10)

    const [otp, setOtp] = useState({
        first: "",
        second: "",
        third: "",
        fourth: ""
    });

    const firstRef = useRef()
    const secondRef = useRef()
    const thirdRef = useRef()
    const fourthRef = useRef()

    const navigate = useNavigate()

    const [activeInput, setActiveInput] = useState("first");

    const handleChange = (e, input) => {
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
                    verifyOtp()
                    setActiveInput("fourth");
                    break;
                default:
                    break;
            }
        }
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
            default:
                break;
        }
    };

    const mobileNo = 9406773838

    // FUNCTION WHICH IS HANDLING VERIFY OTP LOGIC
    const verifyOtp = () => {
        console.log('otp verify logic')
        
        props?.callback()
       


    }

    // FUNCTION WHICH IS HANDLING RESEND OTP LOGIC
    const reSendOtp = () => {
        console.log('resend otp')
    }


    const activateResendTimer = () => {
        let timer = setInterval(() => {
            let tempTime = timer
            let decreseTimer = tempTime - 1
            if (timer == 0) {
                clearInterval(timer)
                reSendStatus(true)
                props?.setactivateTimerStatus(false)
            }
            settimer((prev) => prev - 1)
        }, 1000);
    }

    useEffect(() => {
        if (props?.activateTimerStatus) {
            activateResendTimer()
        }
    }, [])



    return (
        <>
            <div class="h-screen py-20 px-3">
                <div class="container mx-auto">
                    <div class="max-w-sm mx-auto md:max-w-lg">
                        <div class="w-full">
                            <div class="bg-white h-64 py-3 rounded text-center shadow-xl relative">
                                <div class="text-2xl font-bold px-10">OTP Verification
                                    {/* <button onClick={() => props?.setotpCardStatus(false)} type="button" class="float-right right-2.5 text-red-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " >
                                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button> */}
                                </div>
                                <div class="flex flex-col mt-4">
                                    <span>Enter the OTP you received at</span>
                                    <span class="font-bold">+91 ******876</span>
                                </div>

                                <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">

                                    <input ref={firstRef} type="text" value={otp.first} maxLength={1} onChange={e => handleChange(e, "first")} onKeyDown={e => e.key === "Backspace" && handleBack("first")} className={`${activeInput === "first" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                    />
                                    <input ref={secondRef} type="text" value={otp.second} maxLength={1} onChange={e => handleChange(e, "second")} onKeyDown={e => e.key === "Backspace" && handleBack("second")} className={`${activeInput === "second" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                    />
                                    <input ref={thirdRef} type="text" value={otp.third} maxLength={1} onChange={e => handleChange(e, "third")} onKeyDown={e => e.key === "Backspace" && handleBack("third")} className={`${activeInput === "third" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                    />
                                    <input ref={fourthRef} type="text" value={otp.fourth} maxLength={1} onChange={e => handleChange(e, "fourth")} onKeyDown={e => e.key === "Backspace" && handleBack("fourth")} className={`${activeInput === "fourth" ? "active" : ""} m-2 border h-10 w-10 text-center form-control rounded`}
                                    />
                                </div>


                                {/* <div className='w-10 h-10 bg-indigo-500 flex justify-center items-center rounded-full text-white absolute bottom-0 left-0'>{timer}</div> */}

                                <div class="flex justify-center text-center mt-5">
                                    <div className='w-10 h-10 bg-indigo-500 flex justify-center items-center rounded-full text-white'>{timer}</div>
                                    <button disabled={reSendStatus} onClick={reSendOtp} class={`ml-4 flex items-center ${reSendStatus ? 'text-blue-700 hover:text-blue-900 cursor-pointer' : 'text-gray-500 hover:text-none cursor-default'}`}><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtpCard