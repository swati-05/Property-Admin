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
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import BottomErrorCard from '@/Components/Common/BottomErrorCard'
import { FaUserNurse } from 'react-icons/fa'


function GovSafBasicDetails(props) {

    const [formHide, setformHide] = useState(false)
    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [floorList, setfloorList] = useState([])
    const [floorPreviewList, setfloorPreviewList] = useState([])
    const [floorPreviewForm, setfloorPreviewForm] = useState()
    const [showFloorForm, setshowFloorForm] = useState(false)
    const [newWardList, setnewWardList] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [allFormData, setallFormData] = useState()
    const [basicData, setbasicData] = useState()
    const [floorData, setfloorData] = useState()

    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddFloorForm, setAddFloorForm] = useState('block')
    const [ulbData, setulbData] = useState()
    const [wardByUlb, setwardByUlb] = useState()
    const [zoneByUlb, setzoneByUlb] = useState()

    const floorNoRef = useRef(null);
    const useTypeRef = useRef(null);
    const occupancyTypeRef = useRef(null);
    const constructionTypeRef = useRef(null);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);

    const { api_wardByUlb, api_newWardByOldWard, api_zoneByUlb } = CitizenApplyApiList()
    const { gbSafApply, ulbList } = ProjectApiList()

    const { notify } = useContext(contextVar)

    const validationSchema = yup.object({
        ulbId: yup.string().required('Select ULB'),
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
        streetName: yup.string().required('Enter street name'),
        location: yup.string().required('Enter location'),
        landmark: yup.string().required('Enter landmark'),
        buildingAddress: yup.string().required('Enter building address'),
        designation: yup.string().required('Enter designation').max(50, 'Enter maximum 50 characters'),
        address: yup.string().required('Enter address'),

        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        mobileTowerArea: yup.string().when([], {
            is: () => mobileTowerStatusToggle == true,
            then:() => yup.string().required('Field is required')
        }),
        mobileTowerDate: yup.string().when([], {
            is: () => mobileTowerStatusToggle == true,
            then: () => yup.string().required('Field is required')
        }),

        hoardingStatus: yup.string().required('Select hoarding status'),
        hoardingArea: yup.string().when([], {
            is: () => hoardingStatusToggle == true,
            then:() => yup.string().required('Field is required')
        }),
        hoardingDate: yup.string().when([], {
            is: () => hoardingStatusToggle == true,
            then: () => yup.string().required('Field is required')
        }),

        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        petrolPumpArea: yup.string().when([], {
            is: () => petrolPumpStatusToggle == true,
            then:() => yup.string().required('Field is required')
        }),
        petrolPumpDate: yup.string().when([], {
            is: () => petrolPumpStatusToggle == true,
            then: () => yup.string().required('Field is required')
        }),

        waterHarvestingStatus: yup.string().required('Select water harvesting status'),

        // floorNo: yup.string().required('Select floor no.').max(50, 'Enter maximum 50 characters'),
        // useType: yup.string().required('Select use type'),
        // occupancyType: yup.string().required('Select occupancy type'),
        // constructionType: yup.string().required('Select construction type'),
        // buildupArea: yup.string().required('Enter builtup Area'),
        // dateFrom: yup.date().required('Select from date'),
        // dateUpto: yup.date()
    })

    const formik = useFormik({
        initialValues: {
            ulbId: '',
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
            streetName: '',
            location: '',
            landmark: '',
            buildingAddress: '',
            designation: '',
            address: '',
            officerName: '',
            officerEmail: "",
            officerMobile: '',
            mobileTowerStatus: 'no',
            hoardingStatus: 'no',
            petrolPumpStatus: 'no',
            waterHarvestingStatus: 'no',
            mobileTowerArea: '',
            hoardingArea: '',
            petrolPumpArea: '',
            mobileTowerDate: '',
            hoardingDate: '',
            petrolPumpDate: '',
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
            collectDataFun2('basicDetails', values)
            setformHide(!formHide)
            alert("Please review your form and then submit !!!")
        }
        , validationSchema
    })

    const collectDataFun2 = (key, formData) => {
        console.log('prev of all Data', basicData)
        setbasicData({ ...basicData, [key]: formData })
    }

    // const toggleForm = (e) => {
    //     console.log('checkbox is changing ', e.target.checked)
    //     setFormHide(e.target.checked)
    // }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        //allow restricted inputs
        // if(name == 'ulbId'){ 
        //     formik.setFieldValue("ulbId", allowCharacterSpaceCommaInput(value, formik.values.ulbId, 10))
        //     getDependentList(e.target.value)
        // }
        { name == 'ulbId' && getDependentList(value) }
        { name == 'buildingName' && formik.setFieldValue("buildingName", allowCharacterSpaceCommaInput(value, formik.values.buildingName, 20)) }
        { name == 'buildingOfficeName' && formik.setFieldValue("buildingOfficeName", allowCharacterSpaceCommaInput(value, formik.values.buildingOfficeName, 100)) }
        { name == 'holdingNo' && formik.setFieldValue("holdingNo", allowCharacterNumberInput(value, formik.values.holdingNo, 20)) }
        { name == 'plotArea' && formik.setFieldValue("plotArea", allowFloatInput(value, formik.values.plotArea, 20)) }
        { name == 'streetName' && formik.setFieldValue("streetName", allowCharacterNumberSpaceCommaInput(value, formik.values.streetName, 50)) }
        { name == 'location' && formik.setFieldValue("location", allowCharacterNumberSpaceCommaInput(value, formik.values.location, 50)) }
        { name == 'landmark' && formik.setFieldValue("landmark", allowCharacterNumberSpaceCommaInput(value, formik.values.landmark, 50)) }
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

    const fetchNewWardByOldWard = (oldWardId) => {
        let requestBody = {
            oldWardMstrId: oldWardId,
            ulbId: formik.values.ulbId // static ulb id
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

    // const [floorList, setfloorList] = useState([])
    // const [floorPreviewList, setfloorPreviewList] = useState([])
    // const [floorPreviewForm, setfloorPreviewForm] = useState()
    // const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    // const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    // const [AddFloorForm, setAddFloorForm] = useState('-translate-y-full -top-[400px]')
    // const { notify } = useContext(contextVar)

    // const floorNoRef = useRef(null);
    // const useTypeRef = useRef(null);
    // const occupancyTypeRef = useRef(null);
    // const constructionTypeRef = useRef(null);

    const validationSchema2 = yup.object({
        floorNo: yup.string().required('Select floor no.').max(50, 'Enter maximum 50 characters'),
        useType: yup.string().required('Select use type'),
        occupancyType: yup.string().required('Select occupancy type'),
        constructionType: yup.string().required('Select construction type'),
        buildupArea: yup.string().required('Enter builtup Area'),
        dateFrom: yup.date().required('Select from date'),
        dateUpto: yup.date()

    })
    const formik2 = useFormik({
        initialValues: {
            floorNo: '',
            useType: '',
            occupancyType: '',
            constructionType: '',
            buildupArea: '',
            dateFrom: '',
            dateUpto: ''
        },

        onSubmit: (values, resetForm) => {

            console.log('enter submit form => ', values)
            if (editStatus) {
                editfloorList(values)
                resetForm()
                return
            }
            let tempFloorList = [...floorList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setfloorList([...floorList, values])
            console.log('tempfloor list before add.....', tempFloorList)

            //* Adding floorPreviewList to preview data
            let tempfloorPreviewList = [...floorPreviewList, floorPreviewForm] //taking copy of array adding latest values since setstate does not update immediatly

            console.log('tempfloor preview list before add.....', tempfloorPreviewList)
            setfloorPreviewList([...floorPreviewList, floorPreviewForm])

            collectDataFun('floorDetails', tempFloorList) //sending FloorDetails data to parent to store all form data at one container
            toggleForm()
        }
        , validationSchema2
    })

    useEffect(() => {
        if (floorList?.length == 0 && props?.safType != 're' && props?.safType != 'mu' && props?.safType != 'bo-edit') {
            setAddFloorForm('hidden')
        }
        getUlbList()
    }, [])

    const getUlbList = () => {
        axios.get(ulbList, ApiHeader())
            .then((res) => {
                console.log("ulb list => ", res)
                setulbData(res?.data?.data)
            })
    }

    const getDependentList = (val) => {
        setisLoading(true)

        axios.post(api_wardByUlb, { ulbId: val }, ApiHeader())
            .then((res) => {
                console.log("ward by ulb list => ", res)
                setwardByUlb(res?.data?.data)
                setisLoading(false)
            })
            .catch((err) => {
                console.log("error getting dependent list => ", err)
                setisLoading(false)
            })

        axios.post(api_zoneByUlb, { ulbId: val }, ApiHeader())
            .then((res) => {
                console.log("zone by ulb list => ", res)
                setzoneByUlb(res?.data?.data)
                setisLoading(false)
            })
            .catch((err) => {
                console.log("error getting dependent list => ", err)
                setisLoading(false)
            })
    }


    useEffect(() => {

        if (props?.safType == 're' || props?.safType == 'mu' || props?.safType == 'bo-edit') {
            feedPropertyData()
        }
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {
        console.log('inside feed floor dat..')
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.existingPropertyDetails?.data?.data?.floors?.length != 0) {
            console.log('inside lenght >0..')

            let floorsMake = props?.existingPropertyDetails?.data?.data?.floors.map((owner) => {
                return {
                    floorNo: owner?.floor_mstr_id,
                    useType: owner?.usage_type_mstr_id,
                    occupancyType: owner?.occupancy_type_mstr_id,
                    constructionType: owner?.const_type_mstr_id,
                    buildupArea: owner?.builtup_area,
                    dateFrom: owner?.date_from,
                    dateUpto: owner?.date_upto,

                }
            })

            let previewFloorsMake = props?.existingPropertyDetails?.data?.data?.floors.map((owner) => {
                return {
                    floorNo: owner?.floor_name,
                    useType: owner?.usage_type,
                    occupancyType: owner?.occupancy_type,
                    constructionType: owner?.construction_type,
                    buildupArea: owner?.builtup_area,
                    dateFrom: owner?.date_from,
                    dateUpto: owner?.date_upto,

                }
            })

            console.log('owner make...', floorsMake)
            setfloorList(floorsMake)
            setfloorPreviewList(previewFloorsMake)
            collectDataFun('floorDetails', floorsMake) //sending FloorDetails data to parent to store all form data at one container

        }

    }

    const editfloorList = () => {
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

        collectDataFun('floorDetails', tempfloorList) //sending FloorDetails data to parent to store all form data at one container

        setfloorList(tempfloorList) //setting value in origin ownlist array
        setfloorPreviewList(tempfloorPreviewList)
        setEditStatus(false) //seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        console.log('inside toggelg form')
        if (AddFloorForm === 'hidden') {
            setAddFloorForm('block')
        } else {
            setAddFloorForm('hidden')
        }
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
        collectDataFun('floorDetails', floorList)
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
            // collectDataFun('floorDetails', floorList, floorPreviewList)
            collectDataFun('floorDetails', floorList)
            //BEFORE OPENIING REVIEW DATA CALL THIS FUNCITON TO FETCH RULESET DATA
            // props?.submitRuelsetData()
            props.nextFun(5)
        }
    }

    const collectDataFun = (key, formData) => {
        console.log('prev of all Data', floorData)
        setfloorData({ ...floorData, [key]: formData })
    }

    const handleChange2 = (e) => {
        let name = e.target.name
        let value = e.target.value

        //input restrict validation
        { name == 'buildupArea' && formik.setFieldValue("buildupArea", allowFloatInput(value, formik.values.buildupArea, 20)) }

        //* Collecting floor details to preview
        if (e.target.type == 'select-one') {
            setfloorPreviewForm({ ...floorPreviewForm, [name]: e.target[e.target.selectedIndex].text })
        } else {
            setfloorPreviewForm({ ...floorPreviewForm, [name]: value })
        }
    }
    // console.log("floor preview form------", floorPreviewForm)
    // console.log("floor preview list------", floorPreviewList)
    // console.log("floor only list------", floorList)

    // console.log("all Form Data => ", floorData, basicData, allFormData)

    const navigate = useNavigate()

    const submitFun = () => {
        setisLoading(true)

        let body = {

            // basic details
            assessmentType: 1,
            ulbId: basicData?.basicDetails?.ulbId,
            wardId: basicData?.basicDetails?.wardNo, //done
            newWardId: basicData?.basicDetails?.newWardNo,
            address: basicData?.basicDetails?.address,
            streetName: basicData?.basicDetails?.streetName,
            location: basicData?.basicDetails?.location,
            landmark: basicData?.basicDetails?.landmark,
            buildingAddress: basicData?.basicDetails?.buildingAddress,
            buildingName: basicData?.basicDetails?.buildingName,
            nameOfOffice: basicData?.basicDetails?.buildingOfficeName,
            buildupArea: basicData?.basicDetails?.buildupArea,
            designation: basicData?.basicDetails?.designation,
            gbUsageTypes: basicData?.basicDetails?.govBuildingUsageType,
            areaOfPlot: basicData?.basicDetails?.plotArea,
            gbPropUsageTypes: basicData?.basicDetails?.propertyUsageType,
            roadWidth: basicData?.basicDetails?.roadWidth,
            holdingNo: basicData?.basicDetails?.holdingNo,
            officerName: basicData?.basicDetails?.officerName,
            officerEmail: basicData?.basicDetails?.officerEmail,
            officerMobile: basicData?.basicDetails?.officerMobile,

            zone: basicData?.basicDetails?.zone,//done
            isMobileTower: basicData?.basicDetails?.mobileTowerStatus == 'yes' ? true : false,//done
            mobileTower: {
                area: basicData?.basicDetails?.mobileTowerArea,//done
                dateFrom: basicData?.basicDetails?.mobileTowerDate//done
            },
            isHoardingBoard: basicData?.basicDetails?.hoardingStatus == 'yes' ? true : false,//done
            hoardingBoard: {
                area: basicData?.basicDetails?.hoardingArea,//done
                dateFrom: basicData?.basicDetails?.hoardingDate,//done
            },
            isPetrolPump: basicData?.basicDetails?.petrolPumpStatus == 'yes' ? true : false,//done
            petrolPump: {
                area: basicData?.basicDetails?.petrolPumpArea,//done
                dateFrom: basicData?.basicDetails?.petrolPumpDate//done
            },

            isWaterHarvesting: basicData?.basicDetails?.waterHarvestingStatus == 'yes' ? true : false,//done

            //** floor
            floors: floorData?.floorDetails //done


        }

        console.log('data before submit  => ', body)

        axios.post(gbSafApply, body, ApiHeader())
            .then((res) => {
                setisLoading(false)
                if (res?.data?.status == true) {
                    toast.success('Submitted Successfully !!!')
                    props?.demandData(res)
                    props?.submitFun()
                    console.log('success => ', res)
                }
                if (res?.data?.status == true) {
                    // toast.error('Submitted error !!!')
                    activateBottomErrorCard(true, res?.data?.message)
                    console.log('error apply => ', res)
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured while applying for GBSAF. Please try again later.')
                console.log('error => ', err)
                setisLoading(false)
            })
    }

    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)

    }

    let labelStyle = 'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'
    let labelStylePreview = 'form-label inline-block mb-1 text-gray-600 text-sm font-normal'

    let commonStyle = 'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'
    let commonStylePreview = 'form-control block w-full text-base font-semibold text-gray-700 bg-white bg-clip-padding border-none rounded transition ease-in-out m-0 focus:outline-none placeholder:text-white bg-white appearance-none'

    return (
        <>
            {isLoading && <BarLoader />}
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Property Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-1 md:grid-cols-12">

                        {/* 1 BASIC DETAILS */}
                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >ULB<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('ulbId')} className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." >
                                <option value="" >Select</option>
                                {
                                    ulbData?.map((data) => (
                                        <option value={data.id}>{data.ulb_name}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.ulbId && formik.errors.ulbId ? formik.errors.ulbId : null}</span>
                        </div>
                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Name of Building<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('buildingName')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingName && formik.errors.buildingName ? formik.errors.buildingName : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Name of office operated by the Building<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('buildingOfficeName')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingOfficeName && formik.errors.buildingOfficeName ? formik.errors.buildingOfficeName : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Ward No<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('wardNo')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." >
                                <option value="" >Select</option>
                                {
                                    wardByUlb?.map((data) => (
                                        <option value={data.id}>{data.ward_name}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >New Ward No<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('newWardNo')} type="text" className={formHide ? commonStylePreview : commonStyle}
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
                            <label className={formHide ? labelStylePreview : labelStyle} >Holding No.(Previous holding no. if any)</label>
                            <input disabled={formHide} {...formik.getFieldProps('holdingNo')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter holding no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Govt. Building Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('govBuildingUsageType')} type="date" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." >
                                <option>Select</option>
                                {
                                    props?.preFormData?.gbbuildingusage_type?.map((data) => (
                                        <option value={data.id}>{data.building_type}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.govBuildingUsageType && formik.errors.govBuildingUsageType ? formik.errors.govBuildingUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Property Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('propertyUsageType')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." >
                                <option>Select</option>
                                {
                                    props?.preFormData?.gbpropusage_type?.map((data) => (
                                        <option value={data.id}>{data.prop_usage_type}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.propertyUsageType && formik.errors.propertyUsageType ? formik.errors.propertyUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Zone<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <select disabled={formHide} {...formik.getFieldProps('zone')} type="date" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter new ward no." >
                                <option value="">Select</option>
                                {
                                    zoneByUlb?.map((data) => (
                                        <option value={data.id}>{data.zone}</option>
                                    ))
                                }
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Road Width (in ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('roadWidth')} type="number" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter road width" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.roadWidth && formik.errors.roadWidth ? formik.errors.roadWidth : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Area of plot (In Decimal)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('plotArea')} type="number" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter plot area" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4"></div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Street Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('streetName')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter street name" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.streetName && formik.errors.streetName ? formik.errors.streetName : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Location<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('location')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter location" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.location && formik.errors.location ? formik.errors.location : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Landmark<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('landmark')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                placeholder="Enter landmark" />
                            <span className="text-red-600 absolute text-xs">{formik.touched.landmark && formik.errors.landmark ? formik.errors.landmark : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
                            <label className={formHide ? labelStylePreview : labelStyle} >Building Address<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input disabled={formHide} {...formik.getFieldProps('buildingAddress')} type="text" className={formHide ? commonStylePreview : commonStyle}
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
                                <label className={formHide ? labelStylePreview : labelStyle} >Officer Designation<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={formHide} {...formik.getFieldProps('designation')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                    placeholder="Enter designation" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.designation && formik.errors.designation ? formik.errors.designation : null}</span>
                            </div>
                            <div className="form-group col-span-12 md:col-span-3  md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Officer Address <small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={formHide} {...formik.getFieldProps('address')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                    placeholder="Enter address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span>
                            </div>
                            <div className="form-group col-span-12 md:col-span-3  md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Officer Name</label>
                                <input disabled={formHide} {...formik.getFieldProps('officerName')} type="text" className={formHide ? commonStylePreview : commonStyle}
                                    placeholder="Enter name" />
                                {/* <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span> */}
                            </div>
                            <div className="form-group col-span-12 md:col-span-3  md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Officer Email</label>
                                <input disabled={formHide} {...formik.getFieldProps('officerEmail')} type="email" className={formHide ? commonStylePreview : commonStyle}
                                    placeholder="Enter email" />
                                {/* <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span> */}
                            </div>
                            <div className="form-group col-span-12 md:col-span-3  md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Officer Mobile</label>
                                <input disabled={formHide} {...formik.getFieldProps('officerMobile')} type="number" className={formHide ? commonStylePreview : commonStyle}
                                    placeholder="Enter mobile" />
                                {/* <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span> */}
                            </div>



                        </div>

                        <div className="col-span-12 py-6">
                            <hr />
                        </div>
                        {/* 3 ADDITIONAL DEAILS */}
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Property has Mobile Tower(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={formHide} {...formik.getFieldProps('mobileTowerStatus')} className={formHide ? commonStylePreview : commonStyle}
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
                                        <label className={formHide ? labelStylePreview : labelStyle}>Total Area Covered<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input disabled={formHide} {...formik.getFieldProps('mobileTowerArea')} type="text" className={formHide ? commonStylePreview : commonStyle} />
                                        {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-[10px] text-gray-600 inline leading-[0.5px]"> Total Area Covered by Mobile Tower & its Supporting Equipments & Accessories (in Sq. Ft.)</small></label> */}
                                        <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                                    </div>

                                    <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">

                                        <label className={formHide ? labelStylePreview : labelStyle}>Date of Installation of Mobile Tower<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>

                                        <input disabled={formHide} {...formik.getFieldProps('mobileTowerDate')} type="date" className={formHide ? commonStylePreview : commonStyle}
                                        />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>
                                    </div>
                                </>
                            }
                            <div className="col-span-12 grid grid-cols-12">
                                <div className={`form-groupcol-span-12 md:col-span-3 mb-6 md:px-4`}>
                                    <label className={formHide ? labelStylePreview : labelStyle} >Property has Hoarding Board(s) ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select disabled={formHide} {...formik.getFieldProps('hoardingStatus')} className={formHide ? commonStylePreview : commonStyle}
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

                                            <label className={formHide ? labelStylePreview : labelStyle}>Total Area<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input disabled={formHide} {...formik.getFieldProps('hoardingArea')} type="text" className={formHide ? commonStylePreview : commonStyle} />
                                            {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "> Total Area of Wall / Roof / Land (in Sq. Ft.)</small></label> */}
                                            <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                        </div>
                                        <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">
                                            <label className="form-check-label text-gray-800"><small className=" mt-1 text-xs text-gray-600 inline ">Date of Installation of Hoarding Board(s)<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></small></label>
                                            <input disabled={formHide} {...formik.getFieldProps('hoardingDate')} type="date" className={formHide ? commonStylePreview : commonStyle}
                                            />
                                            <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                        </div>
                                    </>
                                }

                            </div>

                            <div className="col-span-12 grid grid-cols-12">
                                <div className="form-groupcol-span-12 md:col-span-3 mb-6 md:px-4">
                                    <label className={formHide ? labelStylePreview : labelStyle} >Is property a Petrol Pump ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <select disabled={formHide} {...formik.getFieldProps('petrolPumpStatus')} className={formHide ? commonStylePreview : commonStyle}
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

                                            <label className={formHide ? labelStylePreview : labelStyle}>Total Area<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input disabled={formHide} {...formik.getFieldProps('petrolPumpArea')} type="text" className={formHide ? commonStylePreview : commonStyle} />
                                            {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Underground Storage Area (in Sq. Ft.)</small></label> */}
                                            <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                                        </div>
                                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                            <label className="form-check-label text-gray-800"><small className=" mt-1 text-xs text-gray-600 inline ">Completion Date of Petrol Pump<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></small></label>
                                            <input disabled={formHide} {...formik.getFieldProps('petrolPumpDate')} type="date" className={formHide ? commonStylePreview : commonStyle}
                                            />
                                            <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                                <label className={formHide ? labelStylePreview : labelStyle} >Rainwater harvesting provision ?<small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={formHide} {...formik.getFieldProps('waterHarvestingStatus')} className={formHide ? commonStylePreview : commonStyle}
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
                        {/* {!showFloorForm && <div className={`${'AddFloorForm' == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 w-full md:py-4 rounded-lg  mx-auto  top-14 col-span-12`}>
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
                                                <select disabled={formHide} ref={floorNoRef} {...formik.getFieldProps('floorNo')} className="cypress_floor_no form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
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
                                                <label className={formHide ? labelStylePreview : labelStyle} >Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select disabled={formHide} ref={useTypeRef} {...formik.getFieldProps('useType')} className="cypress_usage_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
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
                                                <label className={formHide ? labelStylePreview : labelStyle} >Occupancy Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select disabled={formHide} ref={occupancyTypeRef} {...formik.getFieldProps('occupancyType')} className="cypress_occupancy_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">
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
                                                <label className={formHide ? labelStylePreview : labelStyle} >Construction Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select disabled={formHide} ref={constructionTypeRef} {...formik.getFieldProps('constructionType')} className="cypress_construction_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
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
                                                <label className={formHide ? labelStylePreview : labelStyle} >Built Up Area (in Sq. Ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={formHide} {...formik.getFieldProps('buildupArea')} type="text" className="cypress_builtup_area form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.buildupArea && formik.errors.buildupArea ? formik.errors.buildupArea : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className={formHide ? labelStylePreview : labelStyle} >From Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={formHide} {...formik.getFieldProps('dateFrom')} type="date" className="cypress_construction_date_from form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" placeholder='Enter dateFrom no' />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.dateFrom && formik.errors.dateFrom ? formik.errors.dateFrom : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-3 md:px-4">
                                                <label className={formHide ? labelStylePreview : labelStyle} >Upto Date (Leave blank for current date)</label>
                                                <input disabled={formHide} {...formik.getFieldProps('dateUpto')} type="date" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
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
                        </div>} */}

                        <div className="w-full col-span-12">
                            <h1 className='mt-6 mb-3 font-serif font-semibold absolute text-gray-600'><FaUserNurse className="inline mr-2" />Floor Details </h1>

                            <div className={`${AddFloorForm} transition-all relative block  w-full  md:w-full mx-auto top-0 -mt-16  z-50`}>
                                <form onSubmit={formik2.handleSubmit} onChange={handleChange2}>
                                    <div className="grid grid-cols-12">
                                        <div className={`md:col-start-4 col-span-12 md:col-span-6 grid grid-cols-12 bg-white relative p-10 shadow-xl`}>
                                            <button type='button' onClick={() => {
                                                setEditStatus(false)
                                                toggleForm()
                                            }}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>

                                            <div className={`grid col-span-12 grid-cols-12 px-10`}>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">
                                                        Floor No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <select disabled={formHide} ref={floorNoRef} {...formik2.getFieldProps('floorNo')} className="cypress_floor_no form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                        aria-describedby="emailHelp" >
                                                        <option value="" >Select</option>
                                                        {
                                                            props?.preFormData?.floor_type.map((data) => (

                                                                <option key={`floorName${data.id}`} value={data.id}>{data.floor_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.floorNo && formik2.errors.floorNo ? formik2.errors.floorNo : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >Usage Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <select disabled={formHide} ref={useTypeRef} {...formik2.getFieldProps('useType')} className="cypress_usage_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                                        <option value="" >Select</option>
                                                        {
                                                            props?.preFormData?.usage_type.map((data) => (
                                                                <option key={`usageType${data.id}`} value={data.id}>{data.usage_type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.useType && formik2.errors.useType ? formik2.errors.useType : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >Occupancy Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <select disabled={formHide} ref={occupancyTypeRef} {...formik2.getFieldProps('occupancyType')} className="cypress_occupancy_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">
                                                        <option value="" >Select</option>
                                                        {
                                                            props?.preFormData?.occupancy_type.map((data) => (
                                                                <option key={`OccupancyType${data.id}`} value={data.id}>{data.occupancy_type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.occupancyType && formik2.errors.occupancyType ? formik2.errors.occupancyType : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >Construction Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <select disabled={formHide} ref={constructionTypeRef} {...formik2.getFieldProps('constructionType')} className="cypress_construction_type form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                        placeholder="Enter guardian name" >
                                                        <option value="" >Select</option>
                                                        {
                                                            props?.preFormData?.construction_type.map((data) => (
                                                                <option key={`constructionType${data.id}`} value={data.id}>{data.construction_type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.constructionType && formik2.errors.constructionType ? formik2.errors.constructionType : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >Built Up Area (in Sq. Ft)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <input disabled={formHide} {...formik2.getFieldProps('buildupArea')} type="text" className="cypress_builtup_area form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.buildupArea && formik2.errors.buildupArea ? formik2.errors.buildupArea : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >From Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                    <input disabled={formHide} {...formik2.getFieldProps('dateFrom')} type="date" className="cypress_construction_date_from form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" placeholder='Enter dateFrom no' />
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.dateFrom && formik2.errors.dateFrom ? formik2.errors.dateFrom : null}</span>
                                                </div>
                                                <div className="form-group col-span-12 mb-3 md:px-4">
                                                    <label className={formHide ? labelStylePreview : labelStyle} >Upto Date (Leave blank for current date)</label>
                                                    <input disabled={formHide} {...formik2.getFieldProps('dateUpto')} type="date" className="form-control block w-full px-3 py-1.5 text-base  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                                        placeholder="Enter dateUpto no." />
                                                    <span className="text-red-600 absolute text-xs">{formik2.touched.dateUpto && formik2.errors.dateUpto ? formik2.errors.dateUpto : null}</span>
                                                </div>

                                                <div className="col-span-12 text-center mt-10">
                                                    <div onClick={formik2.handleSubmit} className="cursor-pointer cypress_floor_add_update px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{editStatus ? 'Update Floor' : 'Add Floor'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className={`${AddFloorForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 mt-20 w-full md:py-4 md:px-0 md:pb-0 md:pt-0  md:w-full mx-auto  top-14 overflow-x-auto`}>
                                {floorPreviewList?.length != 0 && <table className='min-w-full leading-normal'>
                                    <thead className='font-bold text-left text-sm bg-sky-50'>
                                        <tr>
                                            <th className="px-2 py-3 w-10 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">#</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Floor No</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">User Type</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Occupancy Type</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Construction Type</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Builtup Area (SqFt)</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">From Date</th>
                                            <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Upto Date</th>
                                            {(props?.safType != 'bo-edit' && !formHide) && <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Action</th>}
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
                                                        {(props?.safType != 'bo-edit' && !formHide) && <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editFloor(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' /><RiDeleteBack2Line onClick={() => removeFloor(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' /></td>}
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>}
                                {!formHide && <div>
                                    <div className='bg-red-50 text-red-400 px-2 py-2 rounded-sm shadow-lg opacity-80 mt-10'>
                                        <AiFillInfoCircle className="inline mr-2" />
                                        Click add floor button to add floors of the property, You can add multiple floor by repeating the same method
                                    </div>
                                </div>}
                            </div>

                            <div className={`${AddFloorForm == 'translate-y-0 top-[100px]' ? 'hidden' : 'block'} p-4 w-full md:py-4 rounded-lg shadow-lg bg-white md:w-full mx-auto  top-14 `}>
                                <div className="grid grid-cols-1 md:grid-cols-5 ">
                                    <div className="col-span-5 grid grid-cols-3">
                                        <div className='md:px-10'>
                                            {/* <button onClick={() => props.backFun(5)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button> */}
                                        </div>
                                        <div className='md:px-4 text-center'>
                                            {(props?.safType != 'bo-edit' && !formHide) && <button disabled={formHide} onClick={toggleForm} type="button" className=" px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight capitalize rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Add Floor <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>}
                                        </div>
                                        {/* <div className='md:px-10 text-right'>
                                <div onClick={checkMinimumFloor} className="cursor-pointer cypress_next5_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">{props?.safType == 'bo-edit' ? 'Next' : 'Save & Next'}</div>
                            </div> */}
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="col-span-12 ">
                            <div className='md:px-10'>

                            </div>
                            <div className='md:px-10 text-right mt-4'>
                                {!formHide && <button type='submit' onClick={() => (formik.handleSubmit(), checkMinimumFloor())} className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>}
                                {formHide && <div className='w-full flex justify-between'>
                                    <div onClick={() => setformHide(!formHide)} className="cursor-pointer px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Edit</div>
                                    <button onClick={() => submitFun()} type='button' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                                </div>}
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