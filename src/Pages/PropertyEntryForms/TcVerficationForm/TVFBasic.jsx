import { useState, useContext, useRef } from 'react'
import rainWater from './Assets/storm.png'
import road from './Assets/road.png'
import home from './Assets/home.png'
import area from './Assets/radar.png'
import mobile from './Assets/tower.png'
import hoarding from './Assets/billboard.png'
import floor from './Assets/parquet.png'
import ward from './Assets/ward.png'
import zone from './Assets/zone.png'
import petrol from './Assets/petrol.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import verified from '@/Components/Media/verified.png'
import PropertyApiList from '@/Components/ApiList/PropertyApiList.js';
import axios from 'axios'
import api_headers from '@/Components/ApiList/api_headers.js';
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { contextVar } from '@/Components/Context/Context'
import TcVerifyFloorDetailsForm from './TcVerifyFloorDetailsForm'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import TextArea from '@/Components/Shared/TextArea'
import { useEffect } from 'react'
import { isDisabled } from '@testing-library/user-event/dist/utils'
import ApiHeader from '@/Components/ApiList/ApiHeader'



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
function TVFBasic(props) {


    console.log('prop data... ', props)

    const { api_postApplicationToLevel, api_postComment, api_getTcVerifyData } = ProjectApiList()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [floorList, setfloorList] = useState()
    const [isLoading, setisLoading] = useState()
    const [finalData, setfinalData] = useState()
    const [floorData, setfloorData] = useState([])
    const [multipleFloors, setmultipleFloors] = useState([])
    const [commentText, setCommentText] = useState('')
    const [roleId, setroleId] = useState()
    const [tcVerifyData, settcVerifyData] = useState();
    const [counter, setcounter] = useState(0);

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)


    const { post_SiteVerification } = PropertyApiList()
    const { notify } = useContext(contextVar);
    const navigate = useNavigate()


    const formRef = useRef();
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };


    useEffect(() => {
        console.log("before post prop", props?.values?.applicationData?.data?.floors)
        setroleId(props?.values?.applicationData?.data?.current_role)
    }, [props?.values?.applicationData?.data?.current_role])

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const collectAllFloorData = (key, formData) => {
        console.log('floor data in index tc-------', floorData)

        let fieldata = { ...floorData, [counter]: formData };

        // console.log("before post")

        setfloorData(fieldata);

        setcounter(counter + 1);
    }

    const validationSchema = yup.object({
        wardNoStatus: yup.string(),
        wardNo: yup.string(),
        zoneStatus: yup.string(),
        zone: yup.string(),
        propertyTypeStatus: yup.string(),
        propertyType: yup.string(),
        plotAreaStatus: yup.string(),
        plotArea: yup.string(),
        roadTypeStatus: yup.string(),
        roadType: yup.string(),
        hoardingStatus: yup.string(),
        hoardingArea: yup.string(),
        hoardingDate: yup.string(),
        towerStatus: yup.string(),
        towerArea: yup.string(),
        towerDate: yup.string(),
        petrolPumpStatus: yup.string(),
        petrolPumpArea: yup.string(),
        petrolPumpDate: yup.string(),
        harvestingStatus: yup.string()
    })

    // const initialValues = {
    //     wardNoStatus: 1,
    //     wardNo: props?.applicationData?.data?.new_ward_no,
    //     zoneStatus: 1,
    //     zone: props?.applicationData?.data?.zone_mstr_id,
    //     propertyTypeStatus: 1,
    //     propertyType: props?.applicationData?.data?.prop_type_mstr_id,
    //     plotAreaStatus: 1,
    //     plotArea: props?.applicationData?.data?.area_of_plot,
    //     roadTypeStatus: 1,
    //     roadType: props?.applicationData?.data?.road_type_mstr_id,
    //     hoardingStatus: 1,
    //     hoardingArea: props?.applicationData?.data?.hoarding_area,
    //     hoardingDate: props?.applicationData?.data?.hoarding_installation_date,
    //     towerStatus: 1,
    //     towerArea: props?.applicationData?.data?.tower_area,
    //     towerDate: props?.applicationData?.data?.tower_installation_date,
    //     petrolPumpStatus: 1,
    //     petrolPumpArea: '',
    //     petrolPumpDate: '',
    //     harvestingStatus: 1,
    // };


    const initialValues = {
        wardNoStatus: '',
        wardNo: '',
        zoneStatus: '',
        zone: '',
        propertyTypeStatus: '',
        propertyType: '',
        plotAreaStatus: '',
        plotArea: '',
        roadTypeStatus: '',
        roadType: '',
        hoardingStatus: '',
        hoardingArea: '',
        hoardingDate: '',
        towerStatus: '',
        towerArea: '',
        towerDate: '',
        petrolPumpStatus: '',
        petrolPumpArea: '',
        petrolPumpDate: '',
        harvestingStatus: '',
    };

    const formik = useFormik({
        innerRef: { formRef },
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {
            console.log('inside submit button submit...', values)
            setfinalData(values)
            openModal()
        }
        , validationSchema
    })

    console.log("final data...", finalData)

    const submitVerficationDetails = () => {
        closeModal()
        setisLoading(true)
        let requestBody = {
            safId: props?.applicationData?.data?.id,
            propertyType: finalData?.propertyType,
            roadTypeId: finalData?.roadType,
            areaOfPlot: finalData?.plotArea,
            wardId: finalData?.wardNo,
            isMobileTower: finalData?.towerStatus,
            mobileTowerArea: finalData?.towerArea,
            mobileTowerDate: finalData?.towerDate,
            isHoardingBoard: finalData?.hoardingStatus,
            hoardingArea: finalData?.hoardingArea,
            hoardingDate: finalData?.hoardingDate,
            isPetrolPump: finalData?.petrolPumpStatus,
            petrolPumpUndergroundArea: finalData?.petrolPumpArea,
            petrolPumpDate: finalData?.petrolPumpDate,
            isHarvesting: finalData?.harvestingStatus,
            zone: finalData?.zone,
            userId: props?.applicationData?.data?.user_id,
            verificationStatus: 1,
            currentRoleId: props?.applicationData?.data?.current_role,
            floorDetails: floorData.length != 0 ? floorData : props?.applicationData?.data?.floors,
        }

        console.log('before post verificaiton data...', requestBody)
        console.log('before post floor data...', floorData)
        axios.post(post_SiteVerification, requestBody, api_headers())
            .then(function (response) {
                console.log('==2 submit verfication response..', response?.data)
                setisLoading(false)
                { (response.data.status == true) && notify('Saf details verfied successfully  !', 'success') }
                { (response.data.status == false) && notify('data is invalid,check data', "error") }

                if (roleId != 7) {
                    props?.nextFun(1)
                }
                else {

                }
            })
            .catch(function (error) {
                console.log('==2 submit verfication error...', error)
                notify('Something went wrong', 'error')
                setisLoading(false)
            })
    }


    //{////********sending application to level*******//////}
    const sendApplicationToLevel = (e) => {
        console.log('button typeclicked')
        console.log("receiverRoleId ", e.target.value)
        console.log("senderRoleId", props?.applicationData?.data?.current_role)
        console.log("safId", props?.applicationData?.data?.id)

        if (commentText == '') {
            props.toastFun("Please write some comment", "de-escalated");
            return
        }

        let requestBody = {
            safId: props?.applicationData?.data?.id,
            comment: commentText,
            senderRoleId: props?.applicationData?.data?.current_role,
            receiverRoleId: e.target.value
        }

        console.log('...before next level from saf application ..', requestBody)
        axios.post(`${api_postApplicationToLevel}`, requestBody, api_headers())
            .then(function (response) {
                console.log("application forwarded", response)
                // props.showTabFun(false);    //hiding tabs
                { (e.target.id == 'btn_forward') && props.toastFun('Application is forwarded successfully', 'success') }
                { (e.target.id == 'btn_back') && props.toastFun('Application send backward successfully', 'success') }

                navigate('/tcsafList')

            })
            .catch(function (error) {
                props.toastFun('Oops! Something went wrong', 'error')
            })
    }

    //{////********recording comment here*******//////}
    const commentFun = (commentText) => {
        setCommentText(commentText);
        console.log("comment...", commentText);
    };

    // {////********sending independent comment*******//////}
    const sendIndependentComment = () => {
        console.log("comment", commentText)
        let requestBody = {
            safId: props?.applicationData?.data?.id,
            comment: commentText
        }
        const header = ApiHeader()
        axios.post(`${api_postComment}`, requestBody, header)
            .then(function (response) {
                console.log("comment send", response)
                { (response.data.status == true) && notify('comment send successfully !', 'success') }
                { (response.data.status == false) && notify('Oops! Something went wrong,comment was not sent', "error") }
            })
            .catch(function (error) {
                props.toast('Oops! Something went wrong', "error")
            })
    }


    ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
    const fetchTcVerifyData = () => {

        let requestBody = {
            safId: props?.applicationData?.data?.id,
            // safId: 1022
        }

        console.log('...before next level from saf application ..', requestBody)
        axios.post(`${api_getTcVerifyData}`, requestBody, api_headers())
            .then(function (response) {
                console.log("--1 data verify by tc ...", response.data.data)
                settcVerifyData(response.data.data)
            })
            .catch(function (error) {
                console.log('==2 data verify by tc  error...', error)
            })
    }
    useEffect(() => {
        fetchTcVerifyData()
    }, [props?.applicationData?.data?.id])


    const handleOnChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name == 'wardNoStatus' && (value == '1' && formik.setFieldValue("wardNo", props?.applicationData?.data?.old_ward_no)) }
        { name == 'zoneStatus' && (value == '1' && formik.setFieldValue("zone", props?.applicationData?.data?.zone_mstr_id)) }
        { name == 'propertyTypeStatus' && (value == '1' && formik.setFieldValue("propertyType", props?.applicationData?.data?.prop_type_mstr_id)) }
        { name == 'plotAreaStatus' && (value == '1' && formik.setFieldValue("plotArea", props?.applicationData?.data?.area_of_plot)) }
        { name == 'roadTypeStatus' && (value == '1' && formik.setFieldValue("roadType", props?.applicationData?.data?.road_type_mstr_id)) }


        { name === 'hoardingStatus' && ((value == '1') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name == 'hoardingStatus' && (value == '1' && formik.setFieldValue("hoardingArea", props?.applicationData?.data?.hoarding_area)) }
        { name == 'hoardingStatus' && (value == '1' && formik.setFieldValue("hoardingDate", props?.applicationData?.data?.hoarding_installation_date)) }


        { name === 'towerStatus' && ((value == '1') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name == 'towerStatus' && (value == '1' && formik.setFieldValue("towerArea", props?.applicationData?.data?.tower_area)) }
        { name == 'towerStatus' && (value == '1' && formik.setFieldValue("towerDate", props?.applicationData?.data?.tower_installation_date)) }


        { name === 'petrolPumpStatus' && ((value == '1') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }
        { name == 'petrolPumpStatus' && (value == '1' && formik.setFieldValue("petrolPumpArea", props?.applicationData?.data?.under_ground_area)) }
        { name == 'petrolPumpStatus' && (value == '1' && formik.setFieldValue("petrolPumpDate", props?.applicationData?.data?.petrol_pump_completion_date)) }

        // { name == 'harvestingStatus' && (value == '1' && formik.setFieldValue("harvestingStatus", props?.applicationData?.data?.new_ward_no)) }
    };

    

    return (
        <>
            {/* ===================new before */}

            <div className=" w-full ">
                <div className='mt-1 flex'>
                    <div className='text-xl font-semibold font-serif flex-1'><img src={verified} alt="pin" className='w-6 inline' /> TC Verfication</div>
                </div>
                <div className='bg-white flex justify-center items-center w-full shadow-sm py-2 pt-0 pb-10 mt-2 border border-gray-200 px-4'>
                    <div className="grid grid-cols-12 gap-2 mt-4 gap-x-6 w-full">
                        <div className="pl-4 col-span-12 grid grid-cols-12">
                            <div className='text-xs col-span-6 md:col-span-3 mt-4 md:mt-6'>
                                <div className='font-bold text-sm'>{props?.applicationData?.data?.owners?.map((owner) => (
                                    <p>{owner?.owner_name} ,</p>
                                ))}</div>
                                <div className='text-gray-500'>Owner Name</div>
                            </div>
                            <div className='text-xs col-span-6 md:col-span-3 mt-4 md:mt-6'>
                                <div className='font-bold text-sm'>{props?.applicationData?.data?.old_ward_no}</div>
                                <div className='text-gray-500'>Ward No</div>
                            </div>
                            <div className='text-xs col-span-6 md:col-span-3 mt-4 md:mt-6'>
                                <div className='font-bold text-sm'>{props?.applicationData?.data?.saf_no}</div>
                                <div className='text-gray-500'>Saf No.</div>
                            </div>
                            <div className='text-xs col-span-6 md:col-span-3 mt-4 md:mt-6'>
                                <div className='font-bold text-sm'>{props?.applicationData?.data?.property_type}</div>
                                <div className='text-gray-500'>	Property type</div>
                            </div>
                            <div className='text-xs col-span-6 md:col-span-3 mt-4 md:mt-6'>
                                <div className='font-bold text-sm'>{props?.applicationData?.data?.plot_no}</div>
                                <div className='text-gray-500'>Plot No.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-w-screen min-h-screen flex md:pl-4 bg-white font-sans overflow-hidden overflow-x-auto">
                    <div className="w-full lg:w-6/6">
                        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>

                            <div className="bg-white shadow-sm rounded my-2 w-full overflow-x-scroll">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-amber-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Type</th>
                                            <th className="py-3 px-6 text-left">Assesment</th>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <th className="py-3 px-6 text-center">Tc Verify</th>
                                            }
                                            <th className="py-3 px-6 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light bg-white">
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={ward} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Ward No.</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.old_ward_no}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.ward_no == undefined || tcVerifyData?.ward_no == null || tcVerifyData?.ward_no == '' ? "N/A" : tcVerifyData?.ward_no}</span>
                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('wardNoStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange} >
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.wardNoStatus && formik.errors.wardNoStatus ? formik.errors.wardNoStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('wardNo')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            {
                                                                props?.masterData?.ward_master?.map((data) => (
                                                                    <option value={data?.id}>{data?.ward_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={zone} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Zone</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.zone_mstr_id == 1 ? 'zone-1' : 'zone-2'}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">

                                                        <span>{tcVerifyData?.zone_id == undefined || tcVerifyData?.zone_id == null || tcVerifyData?.zone_id == '' ? "N/A" : tcVerifyData?.zone_id == 1 ? 'zone-1' : 'zone-2'}</span>
                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('zoneStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.zoneStatus && formik.errors.zoneStatus ? formik.errors.zoneStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('zone')} name='zone' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Zone-1</option>
                                                            <option value="2">Zone-2</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={home} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Property Type</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.property_type}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.property_type == undefined || tcVerifyData?.property_type == null || tcVerifyData?.property_type == '' ? "N/A" : tcVerifyData?.property_type}</span>

                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('propertyTypeStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange} >
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.propertyTypeStatus && formik.errors.propertyTypeStatus ? formik.errors.propertyTypeStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('propertyType')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange} >
                                                            <option value="">select</option>

                                                            {
                                                                props?.masterData?.property_type?.map((data) => (
                                                                    <option value={data?.id}>{data?.property_type}{data?.id}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.propertyType && formik.errors.propertyType ? formik.errors.propertyType : null}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={area} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Area of Plot</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.area_of_plot}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.area_of_plot == undefined || tcVerifyData?.area_of_plot == null || tcVerifyData?.area_of_plot == '' ? "N/A" : tcVerifyData?.area_of_plot}</span>

                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('plotAreaStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.plotAreaStatus && formik.errors.plotAreaStatus ? formik.errors.plotAreaStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('plotArea')} type="input" className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md" />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={road} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Road Type</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.road_type_master}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.road_type == undefined || tcVerifyData?.road_type == null || tcVerifyData?.road_type == '' ? "N/A" : tcVerifyData?.road_type}</span>


                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('roadTypeStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.roadTypeStatus && formik.errors.roadTypeStatus ? formik.errors.roadTypeStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('roadType')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Main Road</option>
                                                            <option value="2">Principle Main Road</option>
                                                            <option value="3">Others</option>
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.roadType && formik.errors.roadType ? formik.errors.roadType : null}</span>
                                                    </div>
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-4">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={hoarding} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Hoarding Board</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm space-x-2">
                                                    <h1 className='font-bold'>Hoarding :</h1>
                                                    <span>{props?.applicationData?.data?.is_hoarding_board == true ? 'Yes' : 'No'}</span>
                                                </div>
                                                {props?.applicationData?.data?.is_hoarding_board == true &&
                                                    <>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Area :</h1>
                                                            <span>{props?.applicationData?.data?.hoarding_area}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Installation Date :</h1>
                                                            <span>{props?.applicationData?.data?.hoarding_installation_date}</span>
                                                        </div>
                                                    </>
                                                }
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <h1 className='font-bold'>Hoarding :</h1>
                                                        <span>{tcVerifyData?.is_hoarding == undefined || tcVerifyData?.is_hoarding == null || tcVerifyData?.is_hoarding == '' ? "N/A" : tcVerifyData?.is_hoarding == true ? 'yes' : 'No'}</span>
                                                    </div>
                                                    {tcVerifyData?.is_hoarding == true &&
                                                        <>
                                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                                <h1 className='font-bold'>Area :</h1>
                                                                <span>{tcVerifyData?.is_hoarding?.hoarding_area}</span>
                                                            </div>
                                                            <div className="flex items-center font-semibold text-sm space-x-2">
                                                                <h1 className='font-bold'>Installation Date :</h1>
                                                                <span>{tcVerifyData?.is_hoarding?.hoarding_installation_date}</span>
                                                            </div>
                                                        </>
                                                    }
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('hoardingStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}>
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>
                                                    </div>

                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('hoardingArea')} type="input" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${hoardingStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md `} disabled={!hoardingStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                                    </div>

                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('hoardingDate')} type="date" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${hoardingStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md`} disabled={!hoardingStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={mobile} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Mobile Tower</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm space-x-2">
                                                    <h1 className='font-bold'>Mobile Tower :</h1>
                                                    <span>{props?.applicationData?.data?.is_mobile_tower == true ? 'Yes' : 'No'}</span>
                                                </div>
                                                {props?.applicationData?.data?.is_mobile_tower == true &&
                                                    <>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Area :</h1>
                                                            <span>{props?.applicationData?.data?.tower_area}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Installation Date :</h1>
                                                            <span>{props?.applicationData?.data?.tower_installation_date}</span>
                                                        </div>
                                                    </>
                                                }
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <h1 className='font-bold'>Mobile Tower :</h1>
                                                        <span>{tcVerifyData?.is_mobile_tower == undefined || tcVerifyData?.is_mobile_tower == null || tcVerifyData?.is_mobile_tower == '' ? "N/A" : tcVerifyData?.is_mobile_tower == true ? 'yes' : 'No'}</span>

                                                    </div>
                                                    {tcVerifyData?.is_mobile_tower == true &&
                                                        <>
                                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                                <h1 className='font-bold'>Area :</h1>
                                                                <span>{tcVerifyData?.is_mobile_tower?.tower_area}</span>
                                                            </div>
                                                            <div className="flex items-center font-semibold text-sm space-x-2">
                                                                <h1 className='font-bold'>Installation Date :</h1>
                                                                <span>{tcVerifyData?.is_mobile_tower?.tower_installation_date}</span>
                                                            </div>
                                                        </>
                                                    }
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('towerStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}  >
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">wrong</option>
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.towerStatus && formik.errors.towerStatus ? formik.errors.towerStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('towerArea')} type="input" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${mobileTowerStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md`} disabled={!mobileTowerStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.towerArea && formik.errors.towerArea ? formik.errors.towerArea : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('towerDate')} type="date" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${mobileTowerStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md`} disabled={!mobileTowerStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.towerDate && formik.errors.towerDate ? formik.errors.towerDate : null}</span>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={petrol} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Petrol Pump</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm space-x-2">
                                                    <h1 className='font-bold'>Petrol Pump :</h1>
                                                    <span>{props?.applicationData?.data?.is_petrol_pump == true ? 'Yes' : 'No'}</span>
                                                </div>
                                                {props?.applicationData?.data?.is_mobile_tower == true &&
                                                    <>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Area :</h1>
                                                            <span>{props?.applicationData?.data?.tower_area}</span>
                                                        </div>
                                                        <div className="flex items-center font-semibold text-sm space-x-2">
                                                            <h1 className='font-bold'>Installation Date :</h1>
                                                            <span>{props?.applicationData?.data?.tower_installation_date}</span>
                                                        </div>
                                                    </>
                                                }
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.is_petrol_pump == undefined || tcVerifyData?.is_petrol_pump == null || tcVerifyData?.is_petrol_pump == '' ? "N/A" : tcVerifyData?.is_petrol_pump == true ? 'yes' : 'No'}</span>
                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('petrolPumpStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange}  >
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>

                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('petrolPumpArea')} type="input" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${petrolPumpStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md`} disabled={!petrolPumpStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                                                    </div>
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <input {...formik.getFieldProps('petrolPumpDate')} type="date" className={`form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 ${petrolPumpStatusToggle ? 'bg-gray-200' : 'bg-white'} bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md`} disabled={!petrolPumpStatusToggle} />
                                                        <span className="text-red-600 absolute text-xs" onChange={formik.handleChange}>{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200 ">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                        <img src={rainWater} alt="rain" className='w-4' />
                                                    </div>
                                                    <span className="font-medium">Rainwater Harvesting</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center font-semibold text-sm">
                                                    <span>{props?.applicationData?.data?.is_water_harvesting ? 'Yes' : 'No'}</span>
                                                </div>
                                            </td>
                                            {props?.applicationData?.data?.current_role == 7 &&
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>{tcVerifyData?.is_water_harvesting == undefined || tcVerifyData?.is_water_harvesting == null || tcVerifyData?.is_water_harvesting == '' ? "N/A" : tcVerifyData?.is_water_harvesting == true ? 'yes' : 'No'}</span>
                                                    </div>
                                                </td>
                                            }
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center font-semibold text-sm">
                                                    <div className="flex-1 form-group col-span-4 md:col-span-1 md:px-4">
                                                        <select {...formik.getFieldProps('harvestingStatus')} className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md cursor-pointer" onChange={formik.handleChange} >
                                                            <option value="">select</option>
                                                            <option value="1">Correct</option>
                                                            <option value="0">Wrong</option>
                                                        </select>
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.harvestingStatus && formik.errors.harvestingStatus ? formik.errors.harvestingStatus : null}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='w-full flex justify-between p-8'>
                                    <button type="button" class="float-right inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                    <button type="button" class="md:float-right inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                        </form>
                        {/* <div className='w-full overflow-x-scroll'>
                            <table className='table-auto w-full overflow-x-scroll'>
                                <tr className="border-b border-gray-200 ">
                                    <td colSpan={4} className="py-3  text-left whitespace-nowrap">
                                        <TcVerifyFloorDetailsForm collectAllFloorData={collectAllFloorData} applicationData={props?.applicationData} masterData={props?.masterData} />
                                    </td>

                                </tr>
                            </table>
                        </div> */}
                        {/* <div className='pb-48'>
                            {props?.applicationData?.data?.current_role == 7 ?
                                <div className=' flex flex-row '>
                                    <div>
                                        <div className="">
                                            <h1 className='text-xs'>Comments</h1>
                                            <div className='w-full lg:w-6/8 flex flex-row'>
                                                <div className='h-28  w-11/12'><TextArea commentFun={commentFun} bgColor="bg-gray-100" value={commentText} /></div>
                                                <div className='px-4'>
                                                    <button className='bg-sky-400 text-white rounded-md w-24 h-9 hover:shadow-lg  mt-20'><a className='' style={{ 'fontSize': '10px' }} target="_blank" href="https://www.google.com/inputtools/try/">Type Hindi &#8594;</a></button>
                                                </div>
                                                <div className=' '>
                                                    <button type="button" onClick={sendIndependentComment} style={{ 'fontSize': '9px' }} className='bg-green-500 text-white rounded-md px-8 hover:shadow-lg py-1 mt-20'> Comment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                    <div className='flex flex-row mt-24 justify-between  '>
                                        <div>
                                            <button id='btn_back' value={props?.roleDetails?.backward_role_id} onClick={sendApplicationToLevel} type="button" className=" px-6 py-2.5 bg-blue-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">BackWard</button>
                                        </div>
                                        <div className=''>
                                            <button type="submit" className="ml-2 float-right px-6 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={formik.handleSubmit} >Submit</button>
                                        </div>
                                        <div className=''>
                                            <button type='button' id='btn_forward' value={props?.roleDetails?.forward_role_id} onClick={sendApplicationToLevel} className="ml-2 px-6 py-2 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Forward</button>
                                        </div>


                                    </div>
                                </div>
                                :
                                <div className='md:pl-10 mt-2'>
                                    <button type="submit" className="flaot-right px-6 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out " onClick={formik.handleSubmit} >Submit</button>
                                </div>
                            }
                        </div> */}

                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                        <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darkshover:bg-gray-800 darkshover:text-white" >
                            <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                        <div class="p-6 text-center">
                            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 darkstext-gray-400">Confirm form submit ?</h3>
                            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darksfocus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={submitVerficationDetails}>
                                Yes, I'm sure
                            </button>

                        </div>
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default TVFBasic