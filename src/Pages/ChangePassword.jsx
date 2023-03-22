import { useMemo, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const ChangePassword = (props) => {
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

    const {type} = useParams()

    const validationSchema = Yup.object().shape({
        oldPassword : Yup.string().when([], {
            is : () => type == 'change',
            then : () => Yup.string().required("Enter old password")
        }),
        newPassword : Yup.string().min(6, 'Minimum six character !')
        .max(50, 'Too Long!')
        .required('Enter new password !')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password Must Contains (Capital, Smail, Number, Special) eg - Abc123#.'),
        matchNewPassword : Yup.string().required("Confirm your new password").oneOf([Yup.ref('newPassword'), null], 'Password not match')
    });


    const initialValues = {
        oldPassword: '',
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

        axios.post(type  == 'change' ? api_changePassword : api_forgotPassword, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log("successfully changed => ", res)
                toast.success('Password changed successfully !!!')
                type == 'change' ? navigate('/home') : navigate('/login') 
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

        <div className='flex justify-center items-center mt-10'>
        <form onChange={handleChangeInput} className="w-[25rem] px-8 rounded-lg bg-white shadow-xl">
            <div className='grid grid-cols-12 px-4 md:px-0 '>
                {/* <div className='col-span-6 hidden md:block bg-white py-10'><img className='w-3/4' src={login} /></div> */}
                <div className='w-full col-span-12 md:col-span-12 shadow-lg md:shadow-none py-10'>
                    <div className='w-full  py-6  text-gray-700'>
                        <h1 className='text-center text-md font-semibold my-1 capitalize w-full'>
                        </h1>
                        <h1 className='text-center font-semibold my-1 flex justify-center'>
                            <span className='px-1 text-indigo-500 text-semibold text-2xl poppins uppercase'>{type} Password</span>
                        </h1>

                        {type == 'change' && <div className='my-3 relative text-sm'>
                            <div className='text-gray-600 static mb-1 font-semibold text-left poppins'>Old Password</div>
                            <div className='flex flex-row flex-wrap gap-x-2 gap-y-2'>
                            <input
                                type="password"
                                {...formik.getFieldProps('oldPassword')}
                                className='form-control px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md poppins w-full'
                                placeholder="Enter Your Old Password"
                            />
                           
                            <div className='w-full text-start'>
                                <span className="text-red-600 text-xs poppins text-start">{formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : null}</span>
                            </div> </div>
                        </div>}

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
                        <div className='text-center mt-3 text-xs'>

                            {/* <p className='flex justify-center'><p> Registration Pending ? </p> <Link to="/registrationStatus" className='text-blue-600 font-semibold ml-1'> Check Status </Link></p> */}
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
                </div>
            </div>
            </div>

        </form>
        </div>
</>
  )
}

export default ChangePassword