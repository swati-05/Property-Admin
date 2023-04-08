//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Home
//    DESCRIPTION - Home Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import role from '@/Components/Media/role.png'
import { MdVerified } from 'react-icons/md'
import { FaRegBuilding } from 'react-icons/fa'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { MdTag } from 'react-icons/md'
import { FaMobileAlt } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { FiAlertCircle } from 'react-icons/fi'
import Modal from 'react-modal';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowNumberInput } from '@/Components/PowerUps/PowerupFunctions'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import ApiHeader2 from '@/Components/ApiList/ApiHeader2'
import BarLoader from '@/Components/Loaders/BarLoader'
import axios from 'axios'
import { useToast } from '@/Components/GlobalData/useSetGlobalData'
import PropertyHome from './PropertyHome'
import { contextVar } from '@/Components/Context/Context'
import BrandLoader from '@/Components/Common/BrandLoader'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import BottomErrorCard from '@/Components/Common/BottomErrorCard'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none'
    },
};
Modal.setAppElement('#root');

function LandingHomeDashBoard() {
    const [currentUser, setcurrentUser] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [selectedImage, setselectedImage] = useState(null)
    const [selectedImageUrl, setselectedImageUrl] = useState(role)
    const [currenRoleView, setcurrenRoleView] = useState(role)
    const [isLoading, setisLoading] = useState(false)
    const [isLoading2, setisLoading2] = useState(false)
    const [currentRole, setcurrentRole] = useState('jsk')
    const [erroState, seterroState] = useState(false);
    const [erroState2, seterroState2] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

    const imageRef = useRef()
    const { api_editAdminProfile } = ProjectApiList()
    const notify = useToast()

    const {
        roles,
        setroles,
        setuserName,
        userName,
        userUlbName,
        setuserUlbName,
        userMobile,
        setuserMobile,
        userEmail,
        setuserEmail,
        userImage,
        setuserImage
    } = useContext(contextVar)

    useEffect(() => {
        ///*** setting global data ***\\\\
        let lUser = userName == '' ? JSON.parse(window.localStorage.getItem('userName')) : userName
        let lRoles = roles == '' ? JSON.parse(window.localStorage.getItem('roles')) : roles

        let lulb = userUlbName == '' ? JSON.parse(window.localStorage.getItem('userUlbName')) : userUlbName
        let lmobile = userMobile == '' ? JSON.parse(window.localStorage.getItem('userMobile')) : userMobile
        let lemail = userEmail == '' ? JSON.parse(window.localStorage.getItem('userEmail')) : userEmail
        let limage = userImage == '' ? JSON.parse(window.localStorage.getItem('userImage')) : userImage


        setuserName(lUser)
        setroles(lRoles)
        // setuserUlbName(lulb)
        // setuserMobile(lmobile)
        // setuserEmail(lemail)
        // setuserImage(limage)

    }, [])

    // Back Office
    // Dealing Assistant
    // Executive Officer
    // Jsk
    // Section Incharge

    const allRole = JSON.parse(window.localStorage.getItem('roles'))

    const matchForApply = ['Jsk'];
    const applyButtonStatus = useMemo(() => Array.isArray(allRole) && allRole.some(role => matchForApply.includes(role)), [allRole]);

    const matchForSafWf = ['Dealing Assistant', 'Executive Officer', 'Back Office', 'Section Incharge'];
    const SafWfButtonStatus = useMemo(() => Array.isArray(allRole) && allRole.some(role => matchForSafWf.includes(role)), [allRole]);

    function openModal() {
        feedProfileData(profileData)
        setIsOpen(true);
    }

    function closeModal() {
        setselectedImageUrl(role)
        formik.resetForm()
        setIsOpen(false);
    }
    function openModal2() {
        setIsOpen2(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    const navigate = useNavigate()

    useSetTitle('Home')


    const validationSchema = yup.object({
        image: yup.string().required('Select image'),
        name: yup.string().required('Enter name'),
        mobileNo: yup.string().required('Eneter mobile no.').max(10, 'Enter maximum 10 digits').min(10, 'Enter minimum 10 digits'),
        email: yup.string().required('enter valid email address'),


    })
    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            mobileNo: '',
            email: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('admin edit profile ', values)
            openModal2()
        }
        , validationSchema
    })




    const profileData = {
        name: 'Mr Developer',
        ulb: 'Ranchi Nagar Nigam',
        mobileNo: '9123254999',
        email: 'abc@gmail.com',
    }

    const setImage = (e) => {
        let file = e.target.files[0];
        setselectedImageUrl(URL.createObjectURL(e.target.files[0]))
        setselectedImage(e.target.files[0]);
    };
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'image' && setImage(e) }
        //input restrict validation
        { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
    }

    const feedProfileData = (data) => {
        formik.setFieldValue('name', data?.name)
        formik.setFieldValue('mobileNo', data?.mobileNo)
        formik.setFieldValue('email', data?.email)
    }

    const updateProfile = () => {
        console.log('profile updated')
    }

    // FUNCTION TO UPDATE PROFILE DATA
    const postEditProfile = () => {
        closeModal()
        closeModal2()
        setisLoading2(true)

        let fd = new FormData()
        fd.append('name', formik.values?.name)
        fd.append('mobileNo', formik.values?.mobileNo)
        fd.append('email', formik.values?.email)
        fd.append('photo', selectedImage)

        console.log('before post edit profile', fd)
        // return
        axios.post(api_editAdminProfile, fd, ApiHeader2())
            .then(function (response) {
                console.log('edit profile response ....', response?.data)

                if (response?.data?.status) {
                    notify('Profile Updated Successfully !', 'success')
                } else {
                    activateBottomErrorCard(true, 'Error occured while updating profile. Please try again later.')
                }
                setisLoading2(false)

            })
            .catch(function (error) {
                setisLoading2(false)
                activateBottomErrorCard(true, 'Error occured while updating profile. Please try again later.')
                console.log('errorrr.... ', error);
            })
    }

    // FUNCTION TO CHANGE MODULE LAYOUT
    const changeModuleType = (moduleType) => {
        setactiveModuleType(moduleType)
    }

    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState2(state)

    }


    if (isLoading) {
        return (
            <>
                <BrandLoader />
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

    return (
        <>
            {isLoading2 && <BarLoader />}
            {erroState2 && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

            <div className='w-full bg-white shadow-xl p-10 mt-4'>
                <div className="flex">
                    {/* <div className="flex-initial">
                        <div className='flex flex-col w-20 h-20 justify-center items-center'>
                            <div className='relative'>
                                <img className='w-20 rounded-full border bg-gray-700' src={role} alt="" />
                                <Tooltip anchorId="button-0" />
                                <span onClick={openModal} id="button-0" data-tooltip-content="Click to edit profile." className='absolute right-2 top-2'> <FaRegEdit className='text-white cursor-pointer hover:scale-105 font-semibold text-lg' /></span>
                            </div>

                        </div>
                    </div> */}
                    <div className="flex-initial ml-4">
                        {/* <div className='text-2xl font-bold text-black google-roboto'>Welcome to Property.... {localStorage.getItem('userName')}</div> */}
                        <div className='text-2xl font-bold text-black google-roboto'>Property Dashboard</div>
                        <div className='mt-2'>
                            <span className='text-gray-600'><MdVerified className="inline text-green-500 text-xl" /> verified Account</span>
                            <span className='text-gray-600 ml-10'><FaRegBuilding className="inline" /> {profileData?.ulb}</span>

                        </div>
                        <div className='mt-2'>
                            <span className='text-gray-600'><FaMobileAlt className="inline" /> {profileData?.mobileNo}</span>
                            <span className='text-gray-600 ml-10'><MdAlternateEmail className="inline text-xl" /> {profileData?.email}</span>
                        </div>
                        <div></div>
                    </div>
                    <div className="flex-1 text-right justify-center items-center h-full">

                                <Tooltip anchorId="button-3" />
                                <button id="button-3" data-tooltip-content="Click to change password." onClick={() => navigate('/change-password/change')} className="mr-4 cypress_floor_add_update text-gray-700 px-8 py-3 bg-white-600 font-medium border text-xs leading-tight capitalize rounded-xl shadow-md hover:bg-indigo-500 hover:shadow-lg focus:bg-indigo-500 hover:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Change Password</button>


                        {
                            SafWfButtonStatus && 
                            <>
                               <Tooltip anchorId="button-1" />
                               <button id="button-1" data-tooltip-content="Click to go to saf workflow." onClick={() => navigate('/saf-workflow')} className="cypress_floor_add_update text-white px-8 py-3 bg-indigo-500 font-medium border text-xs leading-tight capitalize rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">SAF Workflow</button>
                            </>
                        }
                        
                        {applyButtonStatus && <>
                           <Tooltip anchorId="button-2" />
                            <button id="button-2" data-tooltip-content="Click to apply new assessment." onClick={() => navigate('/saf-entry')} className="cypress_floor_add_update text-white px-8 py-3 bg-indigo-500 font-medium border text-xs leading-tight capitalize rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Apply Assessment</button>
                        </>}
                     
                    </div>
                </div>
            </div>

            <PropertyHome />

            <div className='w-full h-40'></div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="relative bg-white p-10 rounded-lg shadow-xl border-2 border-gray-50 w-full md:w-96">
                    <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 bg-red-500 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center" >
                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>

                    <div className="max-w-2xl mx-auto">
                        <div className='font-semibold text-2xl text-center w-full'>Edit profile</div>
                        {/* SPACER */}
                        <div className='w-full h-3'></div>
                        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                            <div className="grid col-span-12 relative">
                                <div className="form-group col-span-12 flex justify-center relative mt-5">
                                    <div className='w-28 h-28 border rounded-full'>
                                        <img className='w-28 h-28 rounded-full border bg-gray-700 shadow-xl' src={selectedImageUrl} alt="" />
                                        <span className='absolute bottom-2 left-0 right-0 text-center '>
                                            <span onClick={() => imageRef.current.click()} className='bg-white text-indigo-500 px-1 border rounded-xl text-xs cursor-pointer font-semibold hover:scale-105'>Change</span>
                                        </span>
                                        <span className="text-red-600 absolute text-xs -bottom-3 text-center">{formik.touched.image && formik.errors.image ? formik.errors.image : null}</span>
                                    </div>

                                </div>
                                <div className="form-group col-span-12 invisible absolute top-0 left-0">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Image<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input ref={imageRef}  {...formik.getFieldProps('image')} type="file" className="cypress_khata_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md" />

                                </div>
                                <div className="form-group mb-4 col-span-12 mt-5">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Mobile No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input  {...formik.getFieldProps('name')} type="text" className="cypress_plot_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter mobile no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
                                </div>
                                <div className="form-group mb-4 col-span-12 mt-5">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Mobile No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input  {...formik.getFieldProps('mobileNo')} type="text" className="cypress_plot_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter mobile no." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</span>
                                </div>
                                <div className="form-group mb-6 col-span-12">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Email<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input  {...formik.getFieldProps('email')} type="text" className="cypress_plot_no form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter email." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
                                </div>

                                {/* Corresponding  address */}
                                <div className="col-span-12 text-center mt-2">
                                    <button type="submit" className="cypress_next2_button text-md w-full px-6 py-2.5 bg-indigo-600 text-white font-medium  leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                                </div>

                            </div>

                        </form>



                    </div>
                </div>

            </Modal>

            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                    <button onClick={closeModal2} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure to update details ?</h3>
                        <button type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={postEditProfile}>
                            Yes, I'm sure
                        </button>

                    </div>
                </div>

            </Modal>
        </>
    )
}

export default LandingHomeDashBoard
/**
 * Exported to :
 * 1. App.js
 * 
 */