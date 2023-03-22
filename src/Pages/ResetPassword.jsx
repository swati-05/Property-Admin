import { useMemo, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../Components/Data/User'
import logo from '../Components/Media/logo1.png'
import { connect } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Captcha from '@/Components/Auth/Captcha/Captcha';
import robot from './robot.png'
import './login.css'
import axios from 'axios';
import ProjectApiList from '@/Components/ApiList/ProjectApiList';
import { contextVar } from '@/Components/Context/Context';
// import Captcha from '@/Components/Auth/Captcha/Captcha';
import { RotatingLines } from "react-loader-spinner";
import juidco from '@/Components/Media/juidco.png'
import { ImCross } from 'react-icons/im';
import Modal from 'react-modal'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { allowNumberInput } from '@/Components/Common/PowerUps/PowerupFunctions';
import ApiHeader from '@/Components/ApiList/ApiHeader';

const ResetPassword = (props) => {
    const [loaderStatus, setLoaderStatus] = useState(false)
    const { api_changePassword, api_forgotPassword } = ProjectApiList()
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [otpMethod, setotpMethod] = useState('')

    const openModal = (name) => {
      setIsOpen(true)
      setotpMethod(name)
    }

    const closeModal = () => {
      setIsOpen(false)
      setotpMethod('')
    }

    const afterOpenModal = () => { }

    const validationSchema = Yup.object().shape({
        newPassword : Yup.string().min(6, 'Minimum six character !')
        .max(50, 'Too Long!')
        .required('Enter new password !')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password Must Contains (Capital, Smail, Number, Special) eg - Abc123#.'),
        matchNewPassword : Yup.string().required("Confirm your new password").oneOf([Yup.ref('newPassword'), null], 'Password not match')
    });


    const initialValues = {
        newPassword: '',
        matchNewPassword : ''
    }

    const formik = useFormik({
        initialValues: initialValues,

        onSubmit: (values, resetForm) => {
            console.log("post data", values)
            handleSubmit(values)
        },
        validationSchema
    });

    const handleSubmit = (values) => {

        let body = {
            password : values.oldPassword,
            newPassword : values.newPassword
        }

        console.log('request body before hit api => ', body)

        setLoaderStatus(true)

        axios.post(api_forgotPassword, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log("successfully changed => ", res)
                toast.success('Password changed successfully !!!')
                props?.backFun() 
            }
            

            if(res?.data?.status == false){
                toast.error('Please try after sometime !!!')
            }

            setLoaderStatus(false)
        })
        .catch((err) => {
            console.log("change pwd error  => ", err)
            setLoaderStatus(false)
        })
    }

    const handleChangeInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        { name == 'mobile' && formik.setFieldValue("mobile", allowNumberInput(value, formik.values.mobile, 10)) }
    }

  return (
    <>

<div>
                <header className="border-b border-gray-200 bg-white darks:bg-gray-800 darks:border-gray-800">
                    <div className="container mx-auto xl:max-w-6xl ">
                        {/* Navbar */}
                        <nav className="flex flex-row flex-nowrap items-center justify-between mt-0 py-4 px-6" id="desktop-menu">
                            {/* logo */}
                            <a className="flex items-center py-2 ltr:mr-4 rtl:ml-4 text-xl" href="../index.html">
                                {/* <h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden"> */}
                                    {/* <img class="inline-block w-7 h-auto ltr:mr-2 rtl:ml-2 -mt-1" src="../src/img/logo.png"> */}
                                  {/* <img className='inline max-h-9' src={juidco} alt="" /> <span className="hidden text-gray-700 darks:text-gray-200">JUIDCO</span>
                                </h2> */}
                                <div> <span className="font-bold text-xl">UD&HD</span> <span className="hidden text-gray-700 darks:text-gray-200">JUIDCO</span></div>
                            </a>
                            {/* menu */}
                            <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
                                {/* Customizer (Only for demo purpose) */}
                                <li x-data="{ open: false }" className="relative">
                                    <a href="javascript:;" className="py-3 px-4 flex text-sm rounded-full focus:outline-none" aria-controls="mobile-canvas" aria-expanded="false" >
                                        <span className="sr-only">Customizer</span>
                                        <svg className="block h-6 w-6" xmlnsXlink="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                        </svg>
                                        {/* <i class="text-2xl fas fa-cog"></i> */}
                                    </a>
                                    {/* Right Offcanvas */}
                                    <div className="fixed w-full h-full inset-0 z-50" id="mobile-canvas" xDescription="Mobile menu" x-show="open" style={{ display: 'none' }}>
                                        {/* bg open */}
                                        <span className="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0" />
                                        <nav id="mobile-nav" className="flex flex-col ltr:right-0 rtl:left-0 w-72 fixed top-0 bg-white darks:bg-gray-800 h-full overflow-auto z-40 scrollbars show" >
                                            <div className="p-6 bg-indigo-500 text-gray-100 border-b border-gray-200 darks:border-gray-700">
                                                <div className="flex flex-row justify-between">
                                                    <h3 className="text-md font-bold">Customizer</h3>
                                                    <button type="button" className="inline-block w-4 h-4">
                                                        <svg xmlnsXlink="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block text-gray-100 bi bi-x-lg" viewBox="0 0 16 16" id="x-lg"><path d="M1.293 1.293a1 1 0 011.414 0L8 6.586l5.293-5.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z" /></svg>
                                                        {/* <i class="fas fa-times"></i> */}
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
                                                        {/* <i class="fas fa-times"></i> */}
                                                    </button>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </li>{/* End Customizer (Only for demo purpose) */}
                                <li className="relative">
                                    <a href="#" className="py-3 px-4 flex hover:text-indigo-500 focus:outline-none">
                                        <div className="relative inline-block">Login</div>
                                    </a>
                                </li>
                                <li className="relative">
                                    <a href="#" className="py-3 px-4 flex hover:text-indigo-500 focus:outline-none">
                                        <div className="relative inline-block">Register</div>
                                    </a>
                                </li>
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
                                            {/* <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white darks:bg-gray-800 shadow-xl"> */}
                                            <form onChange={handleChangeInput} className=" px-8 rounded-lg bg-white darks:bg-gray-800 shadow-xl">
            <div className='grid grid-cols-12 px-4 md:px-0 shadow-none md:shadow-lg '>
                {/* <div className='col-span-6 hidden md:block bg-white py-10'><img className='w-3/4' src={login} /></div> */}
                <div className='w-full col-span-12 md:col-span-12 shadow-lg md:shadow-none py-10'>
                    <div className='w-full  py-6 mt-10 text-gray-700'>
                        <h1 className='text-center text-md font-semibold my-1 capitalize w-full'>
                        </h1>
                        <h1 className='text-center font-semibold my-1 flex justify-center'>
                            <span className='px-1 text-indigo-500 text-semibold text-2xl poppins uppercase'>Forgot Password</span>
                        </h1>

                        <div className='my-3 relative text-sm'>
                            <div className='text-gray-600 static mb-1 font-semibold text-left poppins'>New Password</div>
                            <div className='flex flex-row flex-wrap gap-x-2 gap-y-2'>
                            <input
                                type="password"
                                {...formik.getFieldProps('newPassword')}
                                className='form-control px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md poppins w-full'
                                placeholder="Enter Your New Password"
                            />
                           
                            <div className='w-full text-start'>
                                <span className="text-red-600 text-xs poppins text-start">{formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null}</span>
                            </div> </div>
                        </div>

                        <div className='my-3 relative text-sm'>
                            <div className='text-gray-600 static mb-1 font-semibold text-left poppins'>Confirm New Password</div>
                            <div className='flex flex-row flex-wrap gap-x-2 gap-y-2'>
                            <input
                                type="password"
                                {...formik.getFieldProps('matchNewPassword')}
                                className='form-control px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md poppins w-full'
                                placeholder="Confirm your new password"
                            />
                           
                            <div className='w-full text-start'>
                                <span className="text-red-600 text-xs poppins text-start">{formik.touched.matchNewPassword && formik.errors.matchNewPassword ? formik.errors.matchNewPassword : null}</span>
                            </div> </div>
                        </div>

                        <div className=' my-10'>
                        </div>
                        <div className='my-5 relative'>
                            <div className='text-red-600 text-sm font-semibold my-3 '> <span className=''> {showMsg}</span></div>
                            {loaderStatus ?
                                        <div className='flex w-full justify-center'>
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="25"
                                                visible={true}
                                            />
                                        </div>
                                        : <button
                                            type="submit"
                                            onClick={formik.handleSubmit}
                                            disabled={loaderStatus}
                                            className=' bg-indigo-500 hover:bg-indigo-700 px-5 shadow-xl py-2 w-full  rounded-md text-white text-lg font-semibold'>
                                            Submit
                                        </button>
                                    }
                                
                    
                    </div>
                        <div className='my-5 self-center justify-self-center relative'>
                            <div className='text-red-600 text-sm font-semibold my-3 '> <span className=''> {showMsg}</span></div>


 <div className='text-center w-full mt-10'>
                            <span onClick={() => props.back()} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer '>Login</span>
                            {/* <span onClick={() => navigate('/')} className='text-indigo-500 font-semibold hover:bg-white px-3 py-1 cursor-pointer float-right'>Home <BsArrowRight className="inline ml-2" /></span> */}
                        </div>
                    </div>
                </div>
            </div>
            </div>

<Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
    contentLabel="Example Modal"
>

                <div class=" rounded-lg shadow-lg shadow-indigo-300 w-max relative border-2 border-indigo-500 bg-gray-50 px-6 py-4 h-max border-t-2 border-l-2 overflow-auto" >
                
                <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross fontSize={10}/>
                </div>

                <div className='my-3 relative text-sm mt-4'>
                            <div className='text-gray-600 static mb-1 font-semibold text-left poppins'>Enter <span className='poppins'>{otpMethod}</span> OTP</div>
                            <div className='flex flex-col flex-wrap gap-x-2 gap-y-2 mt-2'>
                            <input
                                type="text"
                                {...formik.getFieldProps('otp')}
                                className='form-control px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md poppins w-full' maxLength={6}
                                placeholder="Enter 6 digits OTP"
                            />
                            <div>
                                <span className="text-red-600 text-xs">{formik.touched.otp && formik.errors.otp ? formik.errors.otp : null}</span>
                            </div>
                            <button onClick={formik.handleSubmit} className='w-max px-4 py-1 text-xs 2xl:text-sm rounded-md hover:shadow-md bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer poppins'>Submit</button>    
                            </div>
                            
                        </div>

                </div>

</Modal>

        </form>

                                                {/* =========buttons for change and reset password========= */}
                                             

                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                                    <div className="text-center mt-6 lg:mt-0">
                                        <img src="../src/img/svg/meeting.svg" alt="welcome" className="max-w-full h-auto mx-auto" />
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
            </div>




</>
  )
}

export default ResetPassword