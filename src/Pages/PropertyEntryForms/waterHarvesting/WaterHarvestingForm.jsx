//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// > Api Integreted and some functionality : R U Bharti
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - WaterHarvestingForm
// >DESCRIPTION - WaterHarvestingForm Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';
import BarLoader from '@/Components/Common/BarLoader';
// import { commonInputStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import { allowCharacterCommaInput, allowCharacterNumberInput, allowCharacterInput, allowNumberCharacterInput, allowNumberCommaInput, allowCharacterSpaceCommaInput, allowFloatInput, allowNumberInput, allowCharacterNumberSpaceCommaInput } from '../../../Components/Common/PowerUps/PowerupFunctions'
import './formanimation.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ApplicationSubmitScreen from '@/Pages/Property/PropertyEntryForms/ApplicationSubmitScreen';
import ApiHeader2 from '@/Components/ApiList/ApiHeader2';
import BottomErrorCard from '@/Components/Common/BottomErrorCard';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions';

function WaterHarvestingForm(props) {

    const id = useParams();
    const navigate = useNavigate()
    console.log("getting id => ", id?.id)

    const [formOpen, setformOpen] = useState(false)
    const [rwhDocLeft, setrwhDocLeft] = useState()
    const [rwhDocTop, setrwhDocTop] = useState()
    const [rwhDocRight, setrwhDocRight] = useState()
    const [rwhDoc, setrwhDoc] = useState()
    const [harvestingDetails, setharvestingDetails] = useState()
    const [heading, setheading] = useState('')
    const [appId, setappId] = useState('')
    const [openSubmit, setopenSubmit] = useState(false)
    const [docCode, setdocCode] = useState()
    const [docStatus, setdocStatus] = useState(0)
    const [erroState, seterroState] = useState(false);
    const [isLoading2, setisLoading2] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);

    const { api_postWaterHarvestindDocCode, api_postWaterHarvestingData, api_getHoldingDetails } = ProjectApiList()

    const validationSchema = yup.object(
        {
            dateOfCompletion: yup.string().required("This is a required field"),
            // rwhImage: yup.mixed().when([], {
            //     is: () => docStatus == 1,
            //     then: yup.mixed().required("Select document")
            // }),

        }
    )
    const formik = useFormik({
        initialValues: {
            isWaterHarvestingBefore: '',
            dateOfCompletion: '',
            rwhImage: ''
            // rwhImageLeft : '',
            // rwhImageTop : '',
            // rwhImageRight : ''
        },

        onSubmit: (values, resetForm) => {
            console.log('waterHarvesting ', values)
            submitSafForm(values)
        }
        , validationSchema
    })

    const closeModal = () => {
        navigate(`/holdingPropertyDetails/${id?.id}`)
    }

    useEffect(() => {
        setopenSubmit(false)
        setisLoading2(true)
        axios.post(`${api_postWaterHarvestindDocCode}`, {}, ApiHeader())
            .then(function (response) {
                console.log('water harvesting doc code => ', response)
                if (response?.data?.status) {
                    setdocCode(response?.data?.data?.masters[0]?.documentCode)
                } else {
                    activateBottomErrorCard(true, 'Error occured in submittion. Please try again later.')
                }
                setisLoading2(false)

            })
            .catch(function (error) {
                console.log('water harvesting doc code errorrr.... ', error);
                activateBottomErrorCard(true, 'Error occured in submittion. Please try again later.')
                setisLoading2(false)

            })
    }, [])

    useEffect(() => {
        setisLoading2(true)

        let token = window.localStorage.getItem('token')
        console.log('token at basic details is  get method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }

        axios.post(api_getHoldingDetails, { "propertyId": id?.id }, header)
            .then((res) => {
                console.log("getting harvesting details => ", res)
                setharvestingDetails(res?.data?.data)
                setisLoading2(false)
            })
            .catch((err) => {
                console.log("getting harvesting details error => ", err)
                setisLoading2(false)
            })
    }, [])

    ///////////{***WATER HARVESTING  SUBMIT FUNCTION***}/////////
    const submitSafForm = (values) => {
        setisLoading2(true)
        let fd = new FormData()

        fd.append("isWaterHarvestingBefore", values.isWaterHarvestingBefore)
        fd.append("dateOfCompletion", values.dateOfCompletion)
        { docStatus == 1 && fd.append("document", rwhDoc) }
        { docStatus == 1 && fd.append("docCode", docCode) }
        fd.append("propertyId", id?.id)
        fd.append("ulbId", harvestingDetails?.ulb_id)


        // return
        axios.post(`${api_postWaterHarvestingData}`, fd, ApiHeader2())
            .then(function (response) {
                if (response?.data?.status == true) {
                    console.log('response after submitting water harvesting data', response)
                    toast.success("Water Harvesting Applied Successfully !!")
                    setappId(response?.data?.data)
                    setopenSubmit(true)
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting water harvesting application. Please try again later.')
                }
                setisLoading2(false)

            }).catch((err) => {
                setisLoading2(false)
                activateBottomErrorCard(true, 'Error occured in submitting water harvesting application. Please try again later.')

            })

    }
    const handleChangeImage = (e) => {

        const name = e.target.name

        if (name == 'rwhImage') {
            let file = e.target.files
            setrwhDoc(e.target.files[0])
            console.log("file in change => ", file)
        }

        if (name == 'rwhImageLeft') {
            let file = e.target.files
            setrwhDocLeft(e.target.files[0])
            console.log("file in change => ", file)
        }

        if (name == 'rwhImageTop') {
            let file = e.target.files
            setrwhDocTop(e.target.files[0])
            console.log("file in change => ", file)
        }

        if (name == 'rwhImageRight') {
            let file = e.target.files
            setrwhDocRight(e.target.files[0])
            console.log("file in change => ", file)
        }
    }

    const docChange = (e) => {
        setdocStatus(e.target.value)
    }

    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)

    }

    return (

        <>
            <ToastContainer position="top-right" autoClose={2000} />
            {isLoading2 && <BarLoader />}
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}


            <div className="2xl:mt-6 mt-3 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center uppercase text-base poppins mb-4 shadow-md py-2 rounded-md">
                <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[30px]">
                        <RiBuilding2Fill className="inline mr-2" />
                    </span>
                    <span className="font-semibold poppins 2xl:text-xl text-lg">
                        Rain Water Harvesting Form
                    </span>
                </div>
            </div>

            <div className="poppins my-2 2xl:font-base text-sm">
                Rain Water Harvesting can be applied by this form.
            </div>


            {/* ===========Details View================ */}
            <div className="p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto flex flex-wrap gap-x-20 top-14 mb-6">


                {/* <div className='col-span-1'>
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name </label>
                        </div> */}

                {harvestingDetails?.pt_no == '' && harvestingDetails?.pt_no == undefined ? <>
                <div className="col-span-1">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins">
                        Property Tax No.: &nbsp;&nbsp;&nbsp;
                    </label>
                    <span className="font-semibold text-sm poppins">
                        {nullToNA(harvestingDetails?.pt_no)}
                    </span>
                </div></> :
                    <div className="col-span-1">
                        <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins">
                            Holding No.: &nbsp;&nbsp;&nbsp;
                        </label>
                        <span className="font-semibold text-sm poppins">
                            {nullToNA(harvestingDetails?.new_holding_no == '' ? harvestingDetails?.holding_no : harvestingDetails?.new_holding_no)}
                        </span>
                    </div>}                

                <div className='col-span-1'>
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins">Old Ward No.:  &nbsp;&nbsp;&nbsp;</label>
                    <span className='font-semibold text-sm poppins'>{nullToNA(harvestingDetails?.old_ward_no)}</span>
                </div>

                <div className='col-span-1'>
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins">New Ward No.:  &nbsp;&nbsp;&nbsp;</label>
                    <span className='font-semibold text-sm poppins'>{nullToNA(harvestingDetails?.new_ward_no)}</span>
                </div>

            </div>


            {/* ===================Form Fill============================== */}
            <div className="block p-4 w-full 2xl:py-6 py-3 rounded-lg shadow-lg bg-white mx-auto  top-14">

                <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>

                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 py-4 gap-4'>
                        <div className='col-span-3'>
                            <div className='flex flex-row space-x-3'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold poppins"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>For JSK: Do you want to upload documents ?  </label>
                                <input
                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    id="docStatus"
                                    name="docStatus"
                                    value={1}
                                    onChange={docChange}
                                    required
                                />
                                <label for="option1" className=" text-sm font-medium text-gray-900 poppins">Yes</label>

                                <input
                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    id="docStatus"
                                    name="docStatus"
                                    value={0}
                                    onChange={docChange}
                                    required
                                />
                                <label for="option1" className="text-sm font-medium text-gray-900 poppins">No</label>

                            </div>

                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pb-4'>

                        <div className='col-span-1'>
                            <div className='flex flex-row space-x-3'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Does Completion of Water Harvesting is done before 31-03-2017?  </label>
                                <input
                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    id="isWaterHarvestingBefore"
                                    name="isWaterHarvestingBefore"
                                    value={1}
                                    onChange={formik.handleChange}
                                    required
                                />
                                <label for="option1" className=" text-sm font-medium text-gray-900 poppins">Yes</label>

                                <input
                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    id="isWaterHarvestingBefore"
                                    name="isWaterHarvestingBefore"
                                    value={0}
                                    onChange={formik.handleChange}
                                    required
                                />
                                <label for="option1" className="text-sm font-medium text-gray-900 poppins">No</label>

                            </div>

                        </div>

                    </div>

                    <div className='grid grid-cols-12 gap-2'>


                        <div className='col-span-10 flex flex-row flex-wrap items-center gap-4'>
                            <label className="form-label mb-1 text-gray-600 text-sm poppins"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Completion of Water Harvesting Structure</label>
                            <input type="date" name='dateOfCompletion' className="form-control px-3 py-1.5 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md poppins"
                                placeholder=""
                                value={formik.values.dateOfCompletion} onChange={formik.handleChange}
                            />
                            <p className='text-red-500 text-xs poppins'>{formik.touched.dateOfCompletion && formik.errors.dateOfCompletion ? formik.errors.dateOfCompletion : null}</p>

                        </div>


                        <div className='2xl:col-span-10 col-span-10 2xl:mt-4 mt-2 flex flex-row flex-wrap items-center gap-2 2xl:gap-4 poppins'>
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm poppins"><small className=" mt-1 text-sm font-semibold text-red-600 inline">*</small>Rain Water Harvesting Image </label>
                            <input accept='.jpg,.jpeg' type="file" name='rwhImage' className="form-control px-2 py-1 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md poppins"
                                placeholder=""
                                value={formik.values.rwhImage} onChange={handleChangeImage}
                            />
                            {docStatus == 1 && <span className="col-span-2 flex items-center poppins"><p className='text-red-500 text-xs'>{formik.touched.rwhImage && formik.errors.rwhImage ? formik.errors.rwhImage : null}</p></span>}
                        </div>


                    </div>
                    <div className="col-span-12 my-4 flex justify-between">

                        <button onClick={() => navigate(`/holdingPropertyDetails/${id?.id}`)} type="button" className=" px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out poppins">Back</button>

                        <button type='submit' className=" px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out poppins">Submit</button>

                    </div>
                </form>
            </div>

            <ApplicationSubmitScreen heading={'Rain Water Harvesting Form'} appNo={appId} openSubmit={openSubmit} navigation={closeModal} />

            <div className="h-[10rem] visible 2xl:hidden"></div>
        </>
    )
}

export default WaterHarvestingForm