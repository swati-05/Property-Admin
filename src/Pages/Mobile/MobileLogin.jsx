//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Login page
//    DESCRIPTION - Login Page to authenticate user credentails
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ProjectApiList from '@/Components/ApiList/ProjectApiList';
import { contextVar } from '@/Components/Context/Context';
import { RotatingLines } from "react-loader-spinner";
// import ResetPassword from './ResetPassword';
import MobileNoCard from '@/Components/AuthCards/MobileNoCard';
import OtpCard from '@/Components/AuthCards/OtpCard';
import meeting from '@/Components/Media/meeting.svg'
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '@/Components/Errors/ServerErrorCard';
import useSetToast from '@/Components/GlobalData/useSetToast';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import { setLocalStorageItem, setLocalStorageItemStrigified } from '@/Components/Common/localstorage';

const { api_login } = ProjectApiList()

const validationSchema = Yup.object({
    username: Yup.string().required('Enter Username'),
    password: Yup.string().required('Enter Password')
})

function MobileLogin(props) {
    const { setmenuList, setuserName, setroles, setuserUlbName, setuserMobile, setuserEmail, setuserImage } = useContext(contextVar)
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [mobileCardStatus, setmobileCardStatus] = useState(false)
    const [otpCardStatus, setotpCardStatus] = useState(false)
    const [verifedMobileNo, setverifedMobileNo] = useState(null)
    const [reset, setreset] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')
    const [erroState, seterroState] = useState(false);
    const { tokenPassed } = useParams()

    const { api_getFreeMenuList } = ProjectApiList()
    useSetTitle('fafdsf',false)


    const notify = useSetToast()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            // console.log('form data', values)
            authUser()
        },
        validationSchema
    })

    const navigate = useNavigate()
    const header = {
        headers:
        {
            Accept: 'application/json',
        }
    }
    //authUser function which authenticate user credentials
    const authUser = (e) => {
        seterroState(false)
        setLoaderStatus(true)
        seterrorMsg('')
        let requestBody = {
            email: formik.values.username,
            password: formik.values.password,
            type:'mobile'
        }
        console.log('--1--before login send...', requestBody)
        axios.post(api_login, requestBody, header)
            .then(function (response) {
                if (response.data.status == true) {
                    console.log('--2--login response...', response)
                    // window.localStorage.setItem('token', response?.data?.data?.token)
                    setLocalStorageItem('token', response?.data?.data?.token)
                    setLocalStorageItem('ulbId', response?.data?.data?.userDetails?.ulbId)
                    // window.localStorage.setItem('menuList', JSON.stringify(response?.data?.data?.userDetails?.menuPermission))
                    // window.localStorage.setItem('userName', JSON.stringify(response?.data?.data?.userDetails?.userName))
                    // window.localStorage.setItem('userType', JSON.stringify(response?.data?.data?.userDetails?.userType))
                    // window.localStorage.setItem('roles', JSON.stringify(response?.data?.data?.userDetails?.role))
                    // setLocalStorageItemStrigified('userType', JSON.stringify(response?.data?.data?.userDetails?.userType))
                    setLocalStorageItemStrigified('roles', response?.data?.data?.userDetails?.role)

                    ///*** setting the data to global container to use everywhere ***\\\
                    // setmenuList(response?.data?.data?.userDetails?.menuPermission)
                    // setuserName(response?.data?.data?.userDetails?.userName)
                    // setroles(response?.data?.data?.userDetails?.role)

                    // DEVICE TYPE TO AUTO LOGIN AND SEND TO MOBILE HOME PAGE
                    window.localStorage.setItem('device', 'mobile')
                    setLocalStorageItem('device', 'mobile')


                    props.LOGIN() //set global login state to true
                    // fetchMenuList()
                    navigate('/mobile-modules') //navigate to home page after login

                } else {
                    console.log('false...')
                    setLoaderStatus(false)
                    seterrorMsg(response.data.message)
                    notify(response.data.message, 'error') //toast message if wrong credentails
                }
            })
            .catch(function (error) {
                setLoaderStatus(false)
                seterroState(true)
                console.log('--2--login error...', error)
                notify('login error ', 'error') //catching the error
            })
    }

    const backFun = () => {
        setreset(false)
    }

    const callback = () => {
        notify('Mobile no. has been verified successfully !', 'success')
        // navigate('/change-password/forgot')
        setotpCardStatus(false)
        setreset(true)
    }

    // 3 CHANGE FOR SINGLE AUTH
    const fetchMenuList = () => {
        props?.setmenuFetchStatus(true)
        let requestBody = {
            moduleId: 1
        }

        axios.post(api_getFreeMenuList, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetched menu list success.....', response?.data?.data)
                // return
                if (response.data.status == true) {
                    // window.localStorage.setItem('menuList', JSON.stringify(response?.data?.data?.permission))
                    // window.localStorage.setItem('userName', JSON.stringify(response?.data?.data?.userDetails?.userName))
                    // window.localStorage.setItem('roles', JSON.stringify(response?.data?.data?.userDetails?.roles))

                    // window.localStorage.setItem('userUlbName', JSON.stringify(response?.data?.data?.userDetails?.ulb))
                    // window.localStorage.setItem('userMobile', JSON.stringify(response?.data?.data?.userDetails?.mobileNo))
                    // window.localStorage.setItem('userEmail', JSON.stringify(response?.data?.data?.userDetails?.email))
                    // window.localStorage.setItem('userImage', JSON.stringify(response?.data?.data?.userDetails?.imageUrl))

                    setLocalStorageItemStrigified('menuList', response?.data?.data?.permission)
                    setLocalStorageItemStrigified('userName', response?.data?.data?.userDetails?.userName)
                    setLocalStorageItemStrigified('roles', response?.data?.data?.userDetails?.roles)
                    setLocalStorageItemStrigified('userUlbName', response?.data?.data?.userDetails?.ulb)
                    setLocalStorageItemStrigified('userMobile', response?.data?.data?.userDetails?.mobileNo)
                    setLocalStorageItemStrigified('userEmail', response?.data?.data?.userDetails?.email)
                    setLocalStorageItemStrigified('userImage', response?.data?.data?.userDetails?.imageUrl)


                    setmenuList(response?.data?.data?.permission)
                    setuserName(response?.data?.data?.userDetails?.userName)
                    setroles(response?.data?.data?.userDetails?.roles)

                    // FIGURE OUT WHY SAYING THESE ARE NOT FUNCTIONS
                    // setuserUlbName(response?.data?.data?.userDetails?.ulb)
                    // setuserMobile(response?.data?.data?.userDetails?.mobileNo)
                    // setuserEmail(response?.data?.data?.userDetails?.email)
                    // setuserImage(response?.data?.data?.userDetails?.imageUrl)

                } else {
                    console.log('false...')
                    setLoaderStatus(false)
                    seterrorMsg(response.data.message)
                    notify(response.data.message, 'error') //toast message if wrong credentails
                }
                props?.setmenuFetchStatus(false)
            })
            .catch(function (error) {
                notify('menulist fetch error', 'error') //catching the error
                setLoaderStatus(false)
                seterroState(true)
                console.log('--error in menulist....', error)
                props?.setmenuFetchStatus(false)
            })


    }

    // 2 CHANGE FOR SINGLE AUTH
    const setAuthState = () => {
        if (tokenPassed == 'fresh') {
            // PRODUCTION CASE WHEN ALL MODULES ARE HOSTED AT SINGLE PORT
            navigate(`/admin-login`)

            // DEVELOPMENT CASE ONLY FOR DEVELOPMENT
            // window.location.href = "http://127.0.0.1:5173/admin-login"
            return
        }

        console.log('token not defined......')
        window.localStorage.setItem('token', tokenPassed)
        fetchMenuList()
        navigate(`/home`)
    }

    // 1 CHANGE FOR SINGLE AUTH
    // useEffect(() => {

    //     console.log('routes... parama via naviate.', tokenPassed)
    //     setAuthState()
    // }, [])

    // return

    const closeMobileModal = () => {
        setmobileCardStatus(false)
    }
    const closeOtpModal = () => {
        setotpCardStatus(false)
    }

    if (erroState) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }

    if (mobileCardStatus) {
        return (
            <MobileNoCard closeMobileModal={closeMobileModal} headTitle="Forgot Password" title="Enter mobile to get OTP" desc="Enter your mobile no, which is attached to your account." setverifedMobileNo={setverifedMobileNo} setmobileCardStatus={setmobileCardStatus} setotpCardStatus={setotpCardStatus} />
        )
    }
    if (otpCardStatus) {
        return (
            <OtpCard closeOtpModal={closeOtpModal} bottomNaviation={true} headTitle="Forgot OTP" callback={callback} setotpCardStatus={setotpCardStatus} />
        )
    }

    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000} />

            {(!reset) && <div>
                <header className="border-b border-gray-200 bg-white darks:bg-gray-800 darks:border-gray-800">
                    <div className="container mx-auto xl:max-w-6xl ">
                        <nav className="flex flex-row flex-nowrap items-center justify-between mt-0 py-4 px-6" id="desktop-menu">
                            <a className="flex items-center py-2 ltr:mr-4 rtl:ml-4 text-xl" href="../index.html">
                                <div> <span className="font-bold text-xl">UD&HD</span> <span className="hidden text-gray-700 darks:text-gray-200">JUIDCO</span></div>
                            </a>
                            <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
                                <li x-data="{ open: false }" className="relative">
                                  <span className='font-semibold text-gray-600 text-length'>Welcome Back</span>
                                    <div className="fixed w-full h-full inset-0 z-50" id="mobile-canvas" xDescription="Mobile menu" x-show="open" style={{ display: 'none' }}>
                                        <span className="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0" />
                                        <nav id="mobile-nav" className="flex flex-col ltr:right-0 rtl:left-0 w-72 fixed top-0 bg-white darks:bg-gray-800 h-full overflow-auto z-40 scrollbars show" >
                                            <div className="p-6 bg-indigo-500 text-gray-100 border-b border-gray-200 darks:border-gray-700">
                                                <div className="flex flex-row justify-between">
                                                    <h3 className="text-md font-bold">Customizer</h3>
                                                    <button type="button" className="inline-block w-4 h-4">
                                                        <svg xmlnsXlink="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block text-gray-100 bi bi-x-lg" viewBox="0 0 16 16" id="x-lg"><path d="M1.293 1.293a1 1 0 011.414 0L8 6.586l5.293-5.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                                                <p className="text-base text-semibold">Color Scheme</p>
                                                <div className="flex flex-row">
                                                    <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                                                        <input type="checkbox" name="lightdark" id="lightdark" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                                                        <label htmlFor="lightdark" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 self-center">Light and Dark</p>
                                                </div>
                                            </div>
                                            <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                                                <p className="text-base text-semibold">Sidebar Color</p>
                                                <div className="flex flex-row">
                                                    <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                                                        <input type="checkbox" name="sidecolor" id="sidecolor" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                                                        <label htmlFor="sidecolor" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 self-center">Light and Dark</p>
                                                </div>
                                            </div>
                                            <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                                                <p className="text-base text-semibold">Direction</p>
                                                <div className="flex flex-row">
                                                    <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                                                        <input type="checkbox" name="rtlmode" id="rtlmode" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                                                        <label htmlFor="rtlmode" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                                                    </div>
                                                    <p className="text-sm text-gray-500 self-center">LTR and RTL</p>
                                                </div>
                                            </div>
                                            <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                                                <p className="text-base text-semibold">Layout</p>
                                                <div className="relative mb-3">
                                                    <a href="../index.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Default</a>
                                                    <a href="../layout-compact.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Compact</a>
                                                    <a href="../layout-topnav.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Topnav</a>
                                                </div>
                                            </div>
                                            <div id="customcolor" className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                                                <p className="text-base text-semibold">Primary Color</p>
                                                <div className="relative my-3">
                                                    <div id="custred" title="red" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-red-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custyellow" title="yellow" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-yellow-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custgreen" title="green" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-green-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custblue" title="blue" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-blue-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custpurple" title="purple" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-purple-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custpink" title="pink" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-pink-500 hover:opacity-90 rounded-full cursor-pointer" />
                                                    <div id="custindigo" title="reset color" className="inline-block cursor-pointer">
                                                        <svg xmlnsXlink="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                                                        </svg></div>
                                                </div>
                                            </div>
                                            <div className="pt-6 px-6">
                                                <div x-data="{ open: true }" x-show="open" className="flex justify-between items-center relative bg-yellow-100 text-yellow-900 p-3 rounded-lg mb-4">
                                                    <div>
                                                        How to apply? please read the documentation on <a href="../docs/customize.html" className="underline font-semibold">Customize page</a>
                                                    </div>
                                                    <button type="button" >
                                                        <span className="text-2xl">×</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </li>
                                {/* <li className="relative">
                                    <a href="#" className="py-3 px-4 flex hover:text-indigo-500 focus:outline-none">
                                        <div className="relative inline-block">Login</div>
                                    </a>
                                </li>
                                <li className="relative">
                                    <a href="#" className="py-3 px-4 flex hover:text-indigo-500 focus:outline-none">
                                        <div className="relative inline-block">Register</div>
                                    </a>
                                </li> */}
                            </ul>
                        </nav>

                    </div>
                </header>

                <main>
                    <div className="py-8 md:py-12 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-40">
                        <div className="container mx-auto px-4 xl:max-w-6xl">
                            <div className="flex flex-wrap -mx-4 flex-row">
                                <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                                    {/* login form */}
                                    <div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0">
                                        <div className="relative">
                                            <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white darks:bg-gray-800 shadow-xl">
                                                <form onSubmit={formik.handleSubmit}>
                                                    <div className="text-center">
                                                        <h1 className="text-2xl leading-normal mb-3 font-bold text-gray-800 darks:text-gray-300 text-center">Log in to your account</h1>
                                                    </div>
                                                    <div class="flex flex-col mt-4 text-center">
                                                        <span className='text-center text-red-400'>{errorMsg}</span>
                                                    </div>
                                                    <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
                                                    <div className="mb-6">
                                                        <label htmlFor="inputemail" className="inline-block mb-2">Username</label>
                                                        <input {...formik.getFieldProps('username')} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600" defaultValue aria-label="email" type="email" required />
                                                        <span className='text-red-600'>{formik.touched.username && formik.errors.username ? formik.errors.username : null}</span>
                                                    </div>
                                                    <div className="mb-6">
                                                        <div className="flex flex-wrap flex-row">
                                                            <div className="flex-shrink max-w-full w-1/2">
                                                                <label htmlFor="inputpass" className="inline-block mb-2">Password</label>
                                                            </div>

                                                        </div>
                                                        <input {...formik.getFieldProps('password')} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600" aria-label="password" type="password" defaultValue required />
                                                        <span className='text-red-600'>{formik.touched.password && formik.errors.password ? formik.errors.password : null}</span>
                                                    </div>
                                                 
                                                    <div className="grid mt-10">
                                                        {loaderStatus ?
                                                            <div className='flex justify-center'>
                                                                <RotatingLines
                                                                    strokeColor="grey"
                                                                    strokeWidth="5"
                                                                    animationDuration="0.75"
                                                                    width="25"
                                                                    visible={true}
                                                                />
                                                            </div>
                                                            : <button type="submit" className="py-2 px-4 inline-block text-center rounded leading-normal text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                                                                <svg xmlnsXlink="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                                </svg>Login
                                                            </button>
                                                        }

                                                    </div>
                                                </form>

                                                <div className="my-4">
                                                    <div className='flex flex-col items-center justify-center flex-wrap gapx-x-2 gap-y-2 w-full poppins'>
                                                        <span className='text-gray-700 text-sm font-semibold cursor-pointer w-full text-center' onClick={() => {
                                                            // setmobileCardStatus(true)
                                                        }
                                                        }>Forgot Password</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                                    <div className="text-center mt-6 lg:mt-0">
                                        <img src={meeting} alt="welcome" className="max-w-full h-auto mx-auto" />
                                        <div className="px-4 mt-12">
                                            <h1 className="text-bold text-4xl mb-2">Serve Citizen Serives with Ease of Access</h1>
                                            <p className="text-lg mb-4 text-gray-500">Manage citizen government services with easy of access and serve them in no time. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="bg-white py-6 border-t border-gray-200 darks:bg-gray-800 darks:border-gray-800">
                    <div className="container mx-auto px-4 xl:max-w-6xl ">
                        <div className="mx-auto px-4">
                            <div className="flex flex-wrap flex-row -mx-4">
                                <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-left md:rtl:text-right">
                                    <ul className="ltr:pl-0 rtl:pr-0">
                                        <li className="inline-block ltr:mr-3 rtl:ml-3">
                                            <a className="hover:text-indigo-500" href="#">Support</a>
                                        </li>
                                        <li className="inline-block ltr:mr-3 rtl:ml-3">
                                            <a className="hover:text-indigo-500" href="#">Help Center</a>
                                        </li>
                                        <li className="inline-block ltr:mr-3 rtl:ml-3">
                                            <a className="hover:text-indigo-500" href="#">Privacy</a>
                                        </li>
                                        <li className="inline-block ltr:mr-3 rtl:ml-3">
                                            <a className="hover:text-indigo-500" href="#">Terms of Service</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-right md:rtl:text-left">
                                    <p className="mb-0 mt-3 md:mt-0">
                                        <a href="#" className="hover:text-indigo-500">JUIDCO</a> | All right reserved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>}

            {reset && <ResetPassword back={() => backFun()} />}

        </>
    )
}

//for redux
const mapStateToProps = (state) => {
    return {
        RightNavCloseStatus: state.RightNavCloseStatus,
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // buyCake: () => dispatch(buyCake())
        LOGIN: (data2) => dispatch({ type: "LOGIN" }),
    };
};



// export default HeaderIcons
export default connect(mapStateToProps, mapDispatchToProps)(MobileLogin);
/**
 * Exported to :
 * 1. App.js
 * 
 */