import { useRef, useState, useEffect, useContext } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowFloatInput, allowCharacterInput, allowCharacterCommaInput, allowNumberInput, allowCharacterSpecialInput, allowCharacterNumberInput, getCurrentDate, getBeforeDate, getAfterDate, allowCharacterNumberSpaceInput, allowCharacterNumberSpaceCommaInput, allowCharacterSpaceCommaInput } from '@/Components/Common/PowerUps/PowerupFunctions'
import { TbEdit } from 'react-icons/tb'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'
import { contextVar } from '@/Components/Context/Context'
import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import BarLoader from '@/Components/Common/BarLoader'


function GovSafBasicDetails(props) {

    const [formHide, setFormHide] = useState(false)
    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [floorList, setfloorList] = useState([])
    const [floorPreviewList, setfloorPreviewList] = useState([])
    const [floorPreviewForm, setfloorPreviewForm] = useState()
    const [showFloorForm, setshowFloorForm] = useState(false)
    const [newWardList, setnewWardList] = useState()
    const [isLoading, setisLoading] = useState(false)

    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddFloorForm, setAddFloorForm] = useState('-translate-y-full -top-[400px]')

    const floorNoRef = useRef(null);
    const useTypeRef = useRef(null);
    const occupancyTypeRef = useRef(null);
    const constructionTypeRef = useRef(null);

    const { api_wardByUlb, api_newWardByOldWard, api_zoneByUlb, api_getApartmentListByWard } = CitizenApplyApiList()

    const { notify } = useContext(contextVar)

    const validationSchema = yup.object({
        buildingName: yup.string().required('Enter building name'),
        buildingOfficeName: yup.string().required('Enter office name'),
        wardNo: yup.string().required('Select Ward'),
        newWardNo: yup.string().required('Select new ward no.'),
        holdingNo: yup.string(),
        govBuildingUsageType: yup.string().required('Select gov. usage type'),
        propertyUsageType: yup.string().required('Select property usage type'),
        zone: yup.string().required('Select zone'),
        roadWidth: yup.string().required('Enter width of road'),
        plotArea: yup.string().required('Enter area of plot'),
        buildingAddress: yup.string().required('Enter building address'),
        designation: yup.string().required('Enter designation').max(50, 'Enter maximum 50 characters'),
        address: yup.string().required('Enter address'),

        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        hoardingStatus: yup.string().required('Select hoarding status'),
        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        mobileTowerArea: yup.string().when('mobileTowerStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),


        floorNo: yup.string().required('Select floor no.').max(50, 'Enter maximum 50 characters'),
        useType: yup.string().required('Select use type'),
        occupancyType: yup.string().required('Select occupancy type'),
        constructionType: yup.string().required('Select construction type'),
        buildupArea: yup.string().required('Enter builtup Area'),
        dateFrom: yup.date().required('Select from date'),
        dateUpto: yup.date()
    })
    const formik = useFormik({
        initialValues: {
            buildingName: '',
            buildingOfficeName: '',
            wardNo: '',
            newWardNo: '',
            holdingNo: '',
            govBuildingUsageType: '',
            propertyUsageType: '',
            zone: '',
            roadWidth: '',
            plotArea: '',
            buildingAddress: '',
            designation: '',
            address: '',
            mobileTowerStatus: '',
            hoardingStatus: '',
            petrolPumpStatus: '',
            waterHarvestingStatus: '',
            mobileTowerArea: '',
            hoardingArea: '',
            petrolPumpArea: '',
            mobileTowerDate: getCurrentDate(),
            hoardingDate: getCurrentDate(),
            petrolPumpDate: getCurrentDate(),
            // floorNo: '',
            // useType: '',
            // occupancyType: '',
            // constructionType: '',
            // buildupArea: '',
            // dateFrom: '',
            // dateUpto: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('submit form of gov ', values)

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

        //allow restricted inputs
        { name == 'buildingName' && formik.setFieldValue("buildingName", allowCharacterSpaceCommaInput(value, formik.values.buildingName, 10)) }
        { name == 'buildingOfficeName' && formik.setFieldValue("buildingOfficeName", allowCharacterSpaceCommaInput(value, formik.values.buildingOfficeName, 100)) }
        { name == 'holdingNo' && formik.setFieldValue("holdingNo", allowCharacterNumberInput(value, formik.values.holdingNo, 20)) }
        { name == 'plotArea' && formik.setFieldValue("plotArea", allowFloatInput(value, formik.values.plotArea, 20)) }
        { name == 'buildingAddress' && formik.setFieldValue("buildingAddress", allowCharacterNumberSpaceCommaInput(value, formik.values.buildingAddress, 200)) } //(currentValue,oldValue,max,isCapital)

        //toggle specific input fields accordingly
        { (name == 'mobileTowerStatus') && ((value == 'yes') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { (name == 'hoardingStatus') && ((value == 'yes') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { (name == 'petrolPumpStatus') && ((value == 'yes') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        //allow restricted inputs
        { name == 'mobileTowerArea' && formik.setFieldValue("mobileTowerArea", allowFloatInput(value, formik.values.mobileTowerArea, 20)) } //(currentValue,oldValue,max,isCapital)
        { name == 'hoardingArea' && formik.setFieldValue("hoardingArea", allowFloatInput(value, formik.values.hoardingArea, 20, true)) }
        { name == 'petrolPumpArea' && formik.setFieldValue("petrolPumpArea", allowFloatInput(value, formik.values.petrolPumpArea, 20)) }

        { name == 'wardNo' && fetchNewWardByOldWard(value) }

    }

    const editfloorList = (props) => {
        let tempfloorList = [...floorList]  //copying the array
        tempfloorList[editIndex] = formik.values  //updating value of editindex

        let tempfloorPreviewList = [...floorPreviewList]  //copying the array

        // PREVIEW DETAILS UPDATE
        tempfloorPreviewList[editIndex].floorNo = floorNoRef.current.options[floorNoRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].useType = useTypeRef.current.options[useTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].occupancyType = occupancyTypeRef.current.options[occupancyTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].constructionType = constructionTypeRef.current.options[constructionTypeRef.current.selectedIndex].innerHTML
        tempfloorPreviewList[editIndex].buildupArea = formik.values.buildupArea
        tempfloorPreviewList[editIndex].dateFrom = formik.values.dateFrom
        tempfloorPreviewList[editIndex].dateUpto = formik.values.dateUpto

        props.collectFormDataFun('floorDetails', tempfloorList, tempfloorPreviewList) //sending FloorDetails data to parent to store all form data at one container

        setfloorList(tempfloorList) //setting value in origin ownlist array
        setfloorPreviewList(tempfloorPreviewList)
        setEditStatus(false) //seting edit status false after successfull edit
        toggleForm()
    }


    console.log("floor list ", floorList)

    //funtion to remove owner from floorList via index
    const removeFloor = (index) => {
        //use concept of proper callback here
        setfloorList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
        //removing floorpervilist
        setfloorPreviewList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
    }


    useEffect(() => {
        props.collectFormDataFun('floorDetails', floorList, floorPreviewList)
    }, [floorList, floorPreviewList])

    //function to edit owner from owner list via index
    const editFloor = (index) => {
        setEditStatus(true)
        setEditIndex(index)
        let tempfloorList = [...floorList]
        formik.resetForm()

        formik.initialValues.floorNo = tempfloorList[index].floorNo
        formik.initialValues.useType = tempfloorList[index].useType
        formik.initialValues.occupancyType = tempfloorList[index].occupancyType
        formik.initialValues.constructionType = tempfloorList[index].constructionType
        formik.initialValues.buildupArea = tempfloorList[index].buildupArea
        formik.initialValues.dateFrom = tempfloorList[index].dateFrom
        formik.initialValues.dateUpto = tempfloorList[index].dateUpto

        toggleForm()
    }
    const checkMinimumFloor = () => {
        if (floorList.length === 0) {
            notify('Add minimum one floor', 'warn')
        } else {
            console.log('inside checkmin floor')
            props.collectFormDataFun('floorDetails', floorList, floorPreviewList)
            //BEFORE OPENIING REVIEW DATA CALL THIS FUNCITON TO FETCH RULESET DATA
            // props?.submitRuelsetData()
            props.nextFun(5)
        }
    }

    const fetchNewWardByOldWard = (oldWardId) => {
        let requestBody = {
            oldWardMstrId: oldWardId,
            ulbId: 2 // static ulb id
        }
        console.log('before fetch wardby old ward...', requestBody)

        axios.post(api_newWardByOldWard, requestBody, ApiHeader())
            .then(function (response) {
                console.log('wardlist by oldward list ....', response.data.data)
                setnewWardList(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }

    return (
        <>
            {
                isLoading &&
                <BarLoader />
            }

            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Property Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-1 md:grid-cols-12">

                        {/* 1 BASIC DETAILS */}
                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name of Building<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('buildingName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingName && formik.errors.buildingName ? formik.errors.buildingName : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name of office operated by the Building<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('buildingOfficeName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingOfficeName && formik.errors.buildingOfficeName ? formik.errors.buildingOfficeName : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ward No<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select {...formik.getFieldProps('wardNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="" >Select</option>
                                {
                                    props?.preFormData?.ward_master?.map((data) => (
                                        <option value={data.id}>{data.ward_name}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">New Ward No<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select {...formik.getFieldProps('newWardNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="" >Select</option>
                                {
                                    newWardList?.map((data) => (
                                        <option value={data.id}>{data.ward_name}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Holding No.(Previous holding no. if any)</label>
                            <input {...formik.getFieldProps('holdingNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter holding no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Govt. Building Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select {...formik.getFieldProps('govBuildingUsageType')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option>Select</option>
                                            {
                                                props?.preFormData?.usage_type?.map((data) => (
                                                    <option value={data.id}>{data.usage_type}</option>
                                                ))
                                            }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.govBuildingUsageType && formik.errors.govBuildingUsageType ? formik.errors.govBuildingUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select {...formik.getFieldProps('propertyUsageType')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option>Select</option>
                                            {
                                                props?.preFormData?.usage_type?.map((data) => (
                                                    <option value={data.id}>{data.usage_type}</option>
                                                ))
                                            }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.propertyUsageType && formik.errors.propertyUsageType ? formik.errors.propertyUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Zone<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select {...formik.getFieldProps('zone')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="">Select</option>
                               <option value="1">Zone-1</option>
                               <option value="2">Zone-2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Road Width (in ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('roadWidth')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter road width" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.roadWidth && formik.errors.roadWidth ? formik.errors.roadWidth : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Area of plot (In Decimal)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('plotArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter plot area" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Building Address<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('buildingAddress')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter building address" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingAddress && formik.errors.buildingAddress ? formik.errors.buildingAddress : null}</span>
                        </div>

                        <div className="col-span-12 my-6">
                            <hr />
                        </div>

                        {/* 2 OWNER DETAILS */}
                        <div className="col-span-12 grid grid-cols-12">

                            {/* <div className="form-group col-span-4 mb-6 md:px-4">
                                <label className="form-check-label text-gray-800" > <small className="block mt-1 text-xs text-blue-400 inline ">Authorized Person for the payment of Property Tax</small></label>
                            </div> */}
                            <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Designation<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('designation')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter designation" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.designation && formik.errors.designation ? formik.errors.designation : null}</span>
                            </div>
                            <div className="form-group col-span-12 md:col-span-3  md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Address <small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input {...formik.getFieldProps('address')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span>
                            </div>



                        </div>

                        <div className="col-span-12 py-6">
                            <hr />
                        </div>
                        {/* 3 ADDITIONAL DEAILS */}
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property has Mobile Tower(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('mobileTowerStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                >
                                    <option value="no" selected>No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>
                            </div>
                            {
                                mobileTowerStatusToggle &&
                                <>
                                    <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area Covered<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input {...formik.getFieldProps('mobileTowerArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                        {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-[10px] text-gray-600 inline leading-[0.5px]"> Total Area Covered by Mobile Tower & its Supporting Equipments & Accessories (in Sq. Ft.)</small></label> */}
                                        <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                                    </div>

                                    <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">

                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Date of Installation of Mobile Tower<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>

                                        <input {...formik.getFieldProps('mobileTowerDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>
                                    </div>
                                </>
                            }
                            <div className="col-span-12 grid grid-cols-12">
                                <div className={`form-groupcol-span-12 md:col-span-3 mb-6 md:px-4`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property has Hoarding Board(s) ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select {...formik.getFieldProps('hoardingStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                    >
                                        <option value="no" selected>No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>
                                </div>


                                {
                                    hoardingStatusToggle &&
                                    <>
                                        <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">

                                            <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input {...formik.getFieldProps('hoardingArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                            {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "> Total Area of Wall / Roof / Land (in Sq. Ft.)</small></label> */}
                                            <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                        </div>
                                        <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">
                                            <label className="form-check-label text-gray-800"><small className=" mt-1 text-xs text-gray-600 inline ">Date of Installation of Hoarding Board(s)<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></small></label>
                                            <input {...formik.getFieldProps('hoardingDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                            />
                                            <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                        </div>
                                    </>
                                }

                            </div>

                            <div className="col-span-12 grid grid-cols-12">
                                <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Is property a Petrol Pump ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select {...formik.getFieldProps('petrolPumpStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                    >
                                        <option value="no" selected>No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>
                                </div>

                                {
                                    petrolPumpStatusToggle &&
                                    <>
                                        <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">

                                            <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input {...formik.getFieldProps('petrolPumpArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                            {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Underground Storage Area (in Sq. Ft.)</small></label> */}
                                            <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                                        </div>
                                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                            <label className="form-check-label text-gray-800"><small className=" mt-1 text-xs text-gray-600 inline ">Completion Date of Petrol Pump<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></small></label>
                                            <input {...formik.getFieldProps('petrolPumpDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                            />
                                            <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Rainwater harvesting provision ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select {...formik.getFieldProps('waterHarvestingStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                >
                                    <option value="no" selected>No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>
                            </div>
                        </div>




                        <div className="col-span-12 py-6">
                            <hr />
                        </div>

                        {/* 4 FLOOR DETAILS */}
                        {!showFloorForm && <div className={`${'AddFloorForm' == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 w-full md:py-4 rounded-lg  mx-auto  top-14 col-span-12`}>
                            <div className="grid grid-cols-1 md:grid-cols-5 ">
                                <div className="col-span-5 grid grid-cols-3">
                                    <div className='md:px-10'>

                                    </div>
                                    <div className='md:px-4 text-center'>
                                        <button onClick={() => setshowFloorForm(true)} type="button" className=" px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight capitalize rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Add Floor <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>
                                    </div>
                                    <div className='md:px-10 text-right'>

                                    </div>
                                </div>
                            </div>

                        </div>}

                        <div className={`${AddFloorForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 mt-2 w-full md:py-4 md:px-0 md:pb-0 md:pt-0  md:w-full mx-auto  overflow-x-auto col-span-12`}>
                            {floorPreviewList?.length != 0 && <table className='min-w-full leading-normal'>
                                <thead className='font-bold text-left text-sm bg-sky-50'>
                                    <tr>
                                        <th className="px-2 py-3 w-10 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">#</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Floor No</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">User Type</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Occupancy Type</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Construction Type</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Builtup Area (Sqt)</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">From Date</th>
                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Upto Date</th>
                                        {props?.safType != 'bo-edit' && <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Action</th>}
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {
                                        floorPreviewList?.map((data, index) => (
                                            <>
                                                <tr key={`floorlist${index}`} className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.floorNo}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.useType}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.occupancyType}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.constructionType}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.buildupArea}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {data?.dateFrom}</td>
                                                    <td className="px-2 py-2 text-sm text-left"> {(data?.dateUpto == '' || data?.dateUpto == null) ? 'N/A' : data?.dateUpto}</td>
                                                    {props?.safType != 'bo-edit' && <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editFloor(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' /><RiDeleteBack2Line onClick={() => removeFloor(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' /></td>}
                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>}
                            <div>
                                {!showFloorForm && <div className=' text-red-400 px-2 py-2 rounded-sm shadow-lg opacity-80 mt-2 text-center'>
                                    <AiFillInfoCircle className="inline mr-2" />
                                    Click add floor button to add floors of the property, You can add multiple floor by repeating the same method
                                </div>}
                            </div>
                        </div>

                        {showFloorForm && <div style={{ 'zIndex': 1000 }} className={`-translate-y-full top-40 transition-all  block  w-full  md:w-full mx-auto  relative  z-50 col-span-12`}>
                            <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                                <div className="grid grid-cols-12">
                                    <div className={`md:col-start-4 col-span-12 md:col-span-6 grid grid-cols-12 bg-white relative  p-10 shadow-xl`}>
                                        <button type='button' onClick={() => {
                                            setshowFloorForm(false)
                                        }}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>

                                        <div className={`grid col-span-12 grid-cols-12 px-10`}>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">
                                                    Floor No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select ref={floorNoRef} {...formik.getFieldProps('floorNo')} className="cypress_floor_no form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                    aria-describedby="emailHelp" >
                                                    <option value="" >Select</option>
                                                    {
                                                        props?.preFormData?.floor_type.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.floor_name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <span className="text-red-600 absolute text-xs">{formik.touched.floorNo && formik.errors.floorNo ? formik.errors.floorNo : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select ref={useTypeRef} {...formik.getFieldProps('useType')} className="cypress_usage_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                                    <option value="" >Select</option>
                                                    {
                                                        props?.preFormData?.usage_type.map((data) => (
                                                            <option key={`usageType${data.id}`} value={data.id}>{data.usage_type}</option>
                                                        ))
                                                    }
                                                </select>
                                                <span className="text-red-600 absolute text-xs">{formik.touched.useType && formik.errors.useType ? formik.errors.useType : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Occupancy Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select ref={occupancyTypeRef} {...formik.getFieldProps('occupancyType')} className="cypress_occupancy_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">
                                                    <option value="" >Select</option>
                                                    {
                                                        props?.preFormData?.occupancy_type.map((data) => (
                                                            <option key={`OccupancyType${data.id}`} value={data.id}>{data.occupancy_type}</option>
                                                        ))
                                                    }
                                                </select>
                                                <span className="text-red-600 absolute text-xs">{formik.touched.occupancyType && formik.errors.occupancyType ? formik.errors.occupancyType : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Construction Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select ref={constructionTypeRef} {...formik.getFieldProps('constructionType')} className="cypress_construction_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                    placeholder="Enter guardian name" >
                                                    <option value="" >Select</option>
                                                    {
                                                        props?.preFormData?.construction_type.map((data) => (
                                                            <option key={`constructionType${data.id}`} value={data.id}>{data.construction_type}</option>
                                                        ))
                                                    }
                                                </select>
                                                <span className="text-red-600 absolute text-xs">{formik.touched.constructionType && formik.errors.constructionType ? formik.errors.constructionType : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Built Up Area (in Sq. Ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input {...formik.getFieldProps('buildupArea')} type="text" className="cypress_builtup_area form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.buildupArea && formik.errors.buildupArea ? formik.errors.buildupArea : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">From Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input {...formik.getFieldProps('dateFrom')} type="date" className="cypress_construction_date_from form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" placeholder='Enter dateFrom no' />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.dateFrom && formik.errors.dateFrom ? formik.errors.dateFrom : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Upto Date (Leave blank for current date)</label>
                                                <input {...formik.getFieldProps('dateUpto')} type="date" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                    placeholder="Enter dateUpto no." />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.dateUpto && formik.errors.dateUpto ? formik.errors.dateUpto : null}</span>
                                            </div>

                                            <div className="col-span-12 text-center mt-10">
                                                <div onClick={formik.handleSubmit} className="cypress_floor_add_update cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{editStatus ? 'Update Floor' : 'Add Floor'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>}


                        <div className="col-span-12 ">
                            <div className='md:px-10'>

                            </div>
                            <div className='md:px-10 text-right'>
                                {!formHide && <button type='submit' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>}
                                {formHide && <button onClick={() => props.nextFun(1)} type='button' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>}
                            </div>

                        </div>
                    </div>

                </form>
                <div className='w-full h-40'></div>

            </div>

        </>
    )
}

export default GovSafBasicDetails