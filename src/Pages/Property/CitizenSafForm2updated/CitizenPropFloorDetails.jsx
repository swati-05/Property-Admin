//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropFloorDetails
// DESCRIPTION - COMPONENT-5 CitizenPropFloorDetails Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  # - List of floors in array []
//                  1 - floorNo
//                  2 - useType
//                  3 - occupancyType
//                  4 - constructionType
//                  5 - buildupArea
//                  6 - dateFrom
//                  7 - dateUpto
//                 
//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect, useContext, useRef } from 'react'
import { BsFillLayersFill } from 'react-icons/bs'
import { BiAddToQueue } from 'react-icons/bi'
import { MdTag } from 'react-icons/md'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowFloatInput, getCurrentDate, nullToNA } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import UseInputCondition from '../../../Components/GlobalData/UseInputCondition'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { contextVar } from '@/Components/Context/Context'


function CitizenPropFloorDetails(props) {

    const [floorList, setfloorList] = useState([])
    const [floorPreviewList, setfloorPreviewList] = useState([])
    const [floorPreviewForm, setfloorPreviewForm] = useState()
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState(null) //to carry the index to edit if edistatus is true
    const [AddFloorForm, setAddFloorForm] = useState('-translate-y-full -top-[400px]')
    const [floorFormStatus, setfloorFormStatus] = useState(false)
    const [inputConditions, setinputConditions] = useState()
    const { notify } = useContext(contextVar)

    const floorNoRef = useRef(null);
    const useTypeRef = useRef(null);
    const occupancyTypeRef = useRef(null);
    const constructionTypeRef = useRef(null);

    const validationSchema = yup.object({
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
            floorNo: '',
            useType: '',
            occupancyType: '',
            constructionType: '',
            buildupArea: '',
            dateFrom: '',
            dateUpto: ''
        },

        onSubmit: (values, resetForm) => {
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

            props?.setfloorDetails([...floorList, values])
            props?.setfloorDetailsPreview([...floorPreviewList, floorPreviewForm])

            // props.collectFormDataFun('floorDetails', tempFloorList, tempfloorPreviewList) //sending FloorDetails data to parent to store all form data at one container
            toggleForm()
        }
        , validationSchema
    })

    // INITIALLY CALLING DYNAMIC HOOK TO CREATE CONDITIONALLY STATES AND RETURN STATE VARIABLE AND FUNCTION WHICH WILL UPDATE STATES FOR NEXT TIME
    const [inputConditionState, setinputConditionState] = useState();

    //FUNCTION WHICH SETS READONLY ATTRIBUTE CONDITIONALLY
    const funcSetReadonly = (readOnly) => {
        let trueStyle = 'bg-gray-300 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-200 focus:outline-gray-200 cursor-default'
        let falseStyle = ''



        setinputConditionState({
            ...inputConditionState,
            floorNo: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            useType: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            occupancyType: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            constructionType: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            buildupArea: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            dateFrom: { readOnly: readOnly ? readOnly : false, style: readOnly ? trueStyle : falseStyle },
            dateUpto: { readOnly: false, style: falseStyle },
        })
    }

    useEffect(() => {
        if (floorList?.length == 0 && props?.safType != 're' && props?.safType != 'mu' && props?.safType != 'bo-edit') {
            setAddFloorForm('translate-y-0 top-[100px]')
        }

    }, [])

    useEffect(() => {
        // IN CASE OF RE-ASSESSMENT, ONLY ALLOW TO UPDATE 'UPTODATE OF FLOOR ONLY FOR OLD FLOOR AND EDIT CASE
        console.log('old floor count...', props?.oldFloorDetailsCount)
        if (editStatus && props?.safType == 're') {
            if (editIndex < props?.oldFloorDetailsCount) {
                console.log('old floor count editstatus true...', props?.oldFloorDetailsCount)

                funcSetReadonly(true)
            } else {
                funcSetReadonly(false)
            }
        } else {
            console.log('old floor count false...', props?.oldFloorDetailsCount)

            funcSetReadonly(false)
        }

    }, [editStatus])


    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    console.log('existing property details...', props?.existingPropertyDetails?.data?.data)

    const feedPropertyData = () => {
        console.log('inside feed floor dat..')
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.floorDetails.length != 0) {
            console.log('inside lenght >0..')

            console.log('owner make...', props?.floorDetails)
            setfloorList(props?.floorDetails)
            setfloorPreviewList(props?.floorDetailsPreview)
            // props.collectFormDataFun('floorDetails', props?.floorDetails, props?.floorDetailsPreview) //sending FloorDetails data to parent to store all form data at one container

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

        // props.collectFormDataFun('floorDetails', tempfloorList, tempfloorPreviewList) //sending FloorDetails data to parent to store all form data at one container

        setfloorList(tempfloorList) //setting value in origin ownlist array
        setfloorPreviewList(tempfloorPreviewList)
        props?.setfloorDetails(tempfloorList)
        props?.setfloorDetailsPreview(tempfloorPreviewList)
        setEditStatus(false) //seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        console.log('inside toggelg form')
        // if (AddFloorForm === 'translate-y-0 top-[100px]') {
        //     setAddFloorForm('-translate-y-full -top-[400px]')
        // } else {
        //     setAddFloorForm('translate-y-0 top-[100px]')
        // }
        setfloorFormStatus(!floorFormStatus)
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
        // props.collectFormDataFun('floorDetails', floorList, floorPreviewList)
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
            props?.activateBottomErrorCard(true, `Add minimum one floor`)
        } else {
            console.log('inside checkmin floor')
            // props.collectFormDataFun('floorDetails', floorList, floorPreviewList)
            //BEFORE OPENIING REVIEW DATA CALL THIS FUNCITON TO FETCH RULESET DATA
            // props?.submitRuelsetData()
            props.nextFun(5)
        }
    }

    const handleChange = (e) => {
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
    console.log("floor preview form------", floorPreviewForm)
    console.log("floor preview list------", floorPreviewList)
    console.log("floor only list------", floorList)

    return (
        <>
            <div className="top-0">

                <div className={`p-4 w-full md:py-4 rounded-lg shadow-lg bg-white md:w-full mx-auto `}>
                    {/* <div className='relative -top-12 w-full  rounded-lg  font-semibold text-xl'><MdTag className="inline" />Floor Details</div> */}
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="col-span-5 grid grid-cols-3">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(5)} type="button" className="cypress_back5_button px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-4 text-center'>
                                {props?.safType !== 'bo-edit' && <button onClick={toggleForm} type="button" className="cypress_addFloorForm px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight capitalize rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Add Floor <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>}
                            </div>
                            <div className='md:px-10 text-right'>
                                <button onClick={checkMinimumFloor} type="button" className="cypress_next5_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={`p-4 mt-6 w-full md:py-4 md:px-0 md:pb-0 md:pt-0  md:w-full mx-auto overflow-x-auto`}>
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
                                {props?.safType !== 'bo-edit' && <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Action</th>}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {
                                floorPreviewList?.map((data, index) => (
                                    <>
                                        <tr key={`floorlist${index}`} className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.floorNo)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.useType)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.occupancyType)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.constructionType)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.buildupArea)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.dateFrom)}</td>
                                            <td className="px-2 py-2 text-sm text-left"> {nullToNA(data?.dateUpto)}</td>
                                            {props?.safType !== 'bo-edit' && <td className="px-2 py-2 text-sm text-left"><button className={`cypress_editButton_${index}`} onClick={() => editFloor(index)}>
                                                <TbEdit  className={` inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150`} />
                                            </button>
                                                {/* HIDE REMOVE OPTION IF PREVIOUS FLOOR IN CASE OF RE-ASSESSMENT */}
                                                {props?.safType == 're' && index >= props?.oldFloorDetailsCount && <RiDeleteBack2Line onClick={() => removeFloor(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' />}
                                                {props?.safType != 're' && <RiDeleteBack2Line onClick={() => removeFloor(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' />}
                                            </td>}
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>}
                    <div>
                        <div className='bg-red-50 text-red-400 px-2 py-2 rounded-sm shadow-lg opacity-80 mt-10'>
                            <AiFillInfoCircle className="inline mr-2" />
                            Click add floor button to add floors of the property, You can add multiple floor by repeating the same method
                        </div>
                    </div>
                </div>
                {floorFormStatus && <div className={`transition-all -top-[300px] relative block  w-full  md:w-full mx-auto  z-50`}>
                    <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="grid grid-cols-12">
                            <div className={`md:col-start-4 col-span-12 md:col-span-6 grid grid-cols-12 bg-white relative p-10 shadow-xl`}>
                                <div className='col-span-12 absolute -top-7 left-0 font-semibold text-xl'><MdTag className="inline" />{editStatus ? 'Update Floor Form' : 'Add Floor Form'}</div>
                                <button type='button' onClick={() => {
                                    setEditStatus(false)
                                    toggleForm()
                                }}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>

                                <div className={`grid col-span-12 grid-cols-12 md:px-10`}>
                                    {props?.safType == 're' && editIndex < props?.oldFloorDetailsCount && editStatus && <div className='col-span-12 pl-4 text-amber-500'><AiOutlineInfoCircle className="inline" /> You can only update floor upto date for previous floor</div>}

                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">
                                            Floor No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <select disabled={inputConditionState?.floorNo?.readOnly} ref={floorNoRef} {...formik.getFieldProps('floorNo')} className={`cypress_floorNo form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.floorNo?.style}`}
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
                                        <select disabled={inputConditionState?.useType?.readOnly} ref={useTypeRef} {...formik.getFieldProps('useType')} className={`cypress_useType form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.useType?.style}`} >
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
                                        <select disabled={inputConditionState?.occupancyType?.readOnly} ref={occupancyTypeRef} {...formik.getFieldProps('occupancyType')} className={`cypress_occupancyType form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.occupancyType?.style}`}>
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
                                        <select disabled={inputConditionState?.constructionType?.readOnly} ref={constructionTypeRef} {...formik.getFieldProps('constructionType')} className={`cypress_constructionType form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.constructionType?.style}`}
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
                                        <input disabled={inputConditionState?.buildupArea?.readOnly} {...formik.getFieldProps('buildupArea')} type="text" className={`cypress_buildupArea form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.buildupArea?.style}`} />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.buildupArea && formik.errors.buildupArea ? formik.errors.buildupArea : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">From Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                        <input disabled={inputConditionState?.dateFrom?.readOnly} {...formik.getFieldProps('dateFrom')} type="date" className={`cypress_dateFrom form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.dateFrom?.style}`} placeholder='Enter dateFrom no' />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.dateFrom && formik.errors.dateFrom ? formik.errors.dateFrom : null}</span>
                                    </div>
                                    <div className="form-group col-span-12 mb-3 md:px-4">
                                        <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Upto Date (Leave blank for current date)</label>
                                        <input disabled={inputConditionState?.uptoDate?.readOnly}  {...formik.getFieldProps('dateUpto')} type="date" className={`cypress_dateUpto form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.uptoDate?.style}`}
                                            placeholder="Enter dateUpto no." />
                                        <span className="text-red-600 absolute text-xs">{formik.touched.dateUpto && formik.errors.dateUpto ? formik.errors.dateUpto : null}</span>
                                    </div>

                                    <div className="col-span-12 text-center mt-10">
                                        <button type="submit" className="cypress_floor_add_update px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{editStatus ? 'Update Floor' : 'Add Floor'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>}




                <div className="col-span-5 grid grid-cols-3 mt-10 absolute bottm-0 right-0">
                    <div className='md:px-10'>
                    </div>
                    <div className='md:px-4 text-center'>
                    </div>
                    <div className='md:px-10 text-right'>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CitizenPropFloorDetails