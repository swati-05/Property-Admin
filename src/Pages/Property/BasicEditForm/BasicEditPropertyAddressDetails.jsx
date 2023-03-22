//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropPropertyAddressDetails
// DESCRIPTION - COMPONENT-2 CitizenPropPropertyAddressDetails Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  1 - addressCheckbox
//                  2 - khataNo
//                  3 - plotNo
//                  4 - village_mauja
//                  5 - plotArea
//                  6 - roadWidth
//                  7 - city
//                  8 - district
//                  9 - state
//                  10 - pin 
//                  11 - c_city
//                  12 - c_district
//                  13 - c_state
//                  14 - c_pin
//                  15 - buildingName
//                  16 - streetName
//                  17 - location2
//                  18 - landmark
//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {  allowCharacterInput, allowNumberCommaInput, allowCharacterSpaceCommaInput, allowFloatInput, allowNumberInput, allowCharacterNumberSpaceCommaInput } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


function BasicEditPropertyAddressDetails(props) {
    const [formOpen, setformOpen] = useState(false)
    const validationSchema = yup.object({
        addressCheckbox: yup.boolean(),
        khataNo: yup.string().max(50, 'Enter maximum 50 characters'),
        plotNo: yup.string(),
        village_mauja: yup.string(),
        plotArea: yup.string(),
        roadWidth: yup.string(),
        city: yup.string(),
        district: yup.string(),
        state: yup.string(),
        pin: yup.string().min(6, 'Enter minimum 6 digit'),
        locality: yup.string(),
        c_city: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string()
        }),
        c_district: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string()
        }),
        c_state: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string()
        }),
        c_pin: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string().min(6, 'Enter minimum 6 digit'),
        }),
        c_locality: yup.string().when('addressCheckbox', {
            is: true,
            then: yup.string()
        }),

        // APT-7 EXTRA DATA
        buildingName: yup.string(),
        streetName: yup.string(),
        location2: yup.string(),
        landmark: yup.string(),
        // EXTRA DATA
        // c_city: yup.string().required('Enter city'),
        // c_district: yup.string().required('Enter district'),
        // c_state: yup.string().required('Enter state'),
        // c_pin: yup.string().required('Enter pin'),
        // c_locality: yup.string().required('Enter locality '),

    })

    const formik = useFormik({
        initialValues: {
            addressCheckbox: '',
            khataNo: '',
            plotNo: '',
            village_mauja: '',
            plotArea: '',
            roadWidth: '',
            city: '', //static later fetch with ulbId onchange
            district: '', //static later fetch with ulbId onchange
            state: '', //static later fetch with ulbId onchange
            pin: '',
            locality: '',
            c_city: '',
            c_district: '',
            c_state: '',
            c_pin: '',
            c_locality: '',
            // APT-7 EXTRA DATA
            buildingName: '',
            streetName: '',
            location2: '',
            landmark: '',
            // addressCheckbox: false
        },

        onSubmit: (values, resetForm) => {
            console.log('propertyaddressdetails ', values)
            props?.setpropAddressDetails(values)
            // props.collectFormDataFun('propertyAddressDetails', values) //sending PropertyAddressDetails data to parent to store all form data at one container
            props?.setleveFormSubmitCount(3)
            props?.submitSafForm()
        }
        , validationSchema
    })
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        { name == 'addressCheckbox' && setformOpen(e.target.checked) }

        //input restrict validation
        { name == 'khataNo' && formik.setFieldValue("khataNo", allowNumberCommaInput(value, formik.values.khataNo, 100)) }
        { name == 'plotNo' && formik.setFieldValue("plotNo", allowNumberCommaInput(value, formik.values.plotNo, 100)) }
        { name == 'village_mauja' && formik.setFieldValue("village_mauja", allowCharacterSpaceCommaInput(value, formik.values.village_mauja, 100)) }
        { name == 'plotArea' && formik.setFieldValue("plotArea", allowFloatInput(value, formik.values.plotArea, 20)) }
        { name == 'roadWidth' && formik.setFieldValue("roadWidth", allowFloatInput(value, formik.values.roadWidth, 20)) }
        { name == 'city' && formik.setFieldValue("city", allowCharacterInput(value, formik.values.city, 100)) }
        { name == 'district' && formik.setFieldValue("district", allowCharacterInput(value, formik.values.district, 100)) }
        { name == 'state' && formik.setFieldValue("state", allowCharacterInput(value, formik.values.state, 100)) }
        { name == 'pin' && formik.setFieldValue("pin", allowNumberInput(value, formik.values.pin, 6)) }
        { name == 'locality' && formik.setFieldValue("locality", allowCharacterNumberSpaceCommaInput(value, formik.values.locality, 200)) }
        { name == 'c_city' && formik.setFieldValue("c_city", allowCharacterInput(value, formik.values.c_city, 100)) }
        { name == 'c_district' && formik.setFieldValue("c_district", allowCharacterInput(value, formik.values.c_district, 100)) }
        { name == 'c_state' && formik.setFieldValue("c_state", allowCharacterInput(value, formik.values.c_state, 100)) }
        { name == 'c_pin' && formik.setFieldValue("c_pin", allowNumberInput(value, formik.values.c_pin, 6)) }
        { name == 'c_locality' && formik.setFieldValue("c_locality", allowCharacterNumberSpaceCommaInput(value, formik.values.c_locality, 200)) }
    }
    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails, props?.safType])
    useEffect(() => {
        setLocationByUlb()
    }, [props?.ulbLocation])

    useEffect(() => {
        if (props?.leveFormSubmitCount == 2) {
            formik.handleSubmit()
        }
    }, [props?.leveFormSubmitCount])

    // INITIALLY CALLING DYNAMIC HOOK TO CREATE CONDITIONALLY STATES AND RETURN STATE VARIABLE AND FUNCTION WHICH WILL UPDATE STATES FOR NEXT TIME
    const [inputConditionState, setinputConditionState] = useState();

    //FUNCTION WHICH SETS READONLY ATTRIBUTE CONDITIONALLY
    const funcSetReadonly = (readOnly) => {
        let trueStyle = 'bg-gray-300 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-200 focus:outline-gray-200 cursor-default'
        let falseStyle = ''


        setinputConditionState({
            ...inputConditionState,
            khataNo: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            plotNo: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            village_mauja: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            plotArea: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            roadWidth: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            city: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            district: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            state: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            pin: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            locality: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            c_city: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            c_district: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            c_state: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            c_pin: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            c_locality: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            buildingName: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            streetName: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            location2: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            landmark: { readOnly: readOnly ? readOnly : false, style: trueStyle },

        })
    }

    // useEffect(() => {
    //         funcSetReadonly(true)
    // }, [])



    const setLocationByUlb = () => {
        console.log('inside location in address...', props?.ulbLocation)
        formik.setFieldValue('city', props?.ulbLocation?.city_name)
        formik.setFieldValue('state', props?.ulbLocation?.name)
        formik.setFieldValue('district', props?.ulbLocation?.city_name)
    }

    const feedPropertyData = () => {
        console.log('existing property details in prop address...', props?.propAddressDetails)
        // return
        formik.setFieldValue('khataNo', props?.propAddressDetails?.khataNo)
        formik.setFieldValue('plotNo', props?.propAddressDetails?.plotNo)
        formik.setFieldValue('village_mauja', props?.propAddressDetails?.village_mauja)
        formik.setFieldValue('plotArea', props?.propAddressDetails?.plotArea)
        formik.setFieldValue('roadWidth', props?.propAddressDetails?.roadWidth)
        formik.setFieldValue('city', props?.propAddressDetails?.city)
        formik.setFieldValue('district', props?.propAddressDetails?.district)
        formik.setFieldValue('state', props?.propAddressDetails?.state)
        formik.setFieldValue('pin', props?.propAddressDetails?.pin)
        formik.setFieldValue('locality', props?.propAddressDetails?.locality)
        formik.setFieldValue('c_city', props?.propAddressDetails?.c_city)
        formik.setFieldValue('c_district', props?.propAddressDetails?.c_district)
        formik.setFieldValue('c_state', props?.propAddressDetails?.c_state)
        formik.setFieldValue('c_pin', props?.propAddressDetails?.c_pin)
        formik.setFieldValue('c_locality', props?.propAddressDetails?.c_locality)

        formik.setFieldValue('buildingName', props?.propAddressDetails?.buildingName)
        formik.setFieldValue('streetName', props?.propAddressDetails?.streetName)
        formik.setFieldValue('location2', props?.propAddressDetails?.location2)
        formik.setFieldValue('landmark', props?.propAddressDetails?.landmark)

        // console.log('auto feed data.....address...', propAddress)
        // props?.collectFormDataFun('propertyAddressDetails', propAddress)


    }
    return (
        <>

            <div className="flex md:pr-6 mt-6 mb-4">
                <div class="w-full">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="flex-1">
                            <div >
                                <div class="text-lg font-bold text-gray-700 leading-tight">Property Address & Details</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto border border-gray-200">
                {/* <div className='relative -top-14 -left-4 col-span-12 md:col-span-6   rounded-lg -pl-2 font-semibold text-xl'><MdTag className="inline" />Property Address & Details</div> */}
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <Tooltip anchorId="id_khata" />
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-5">
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Khata No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.khataNo?.readOnly}  {...formik.getFieldProps('khataNo')} type="text" className={`cypress_khata_no form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.khataNo?.style}`}
                                    placeholder="Enter Khata No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.khataNo && formik.errors.khataNo ? formik.errors.khataNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Plot No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.plotNo?.readOnly} {...formik.getFieldProps('plotNo')} type="text" className={`cypress_plot_no form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.plotNo?.style}`}
                                    placeholder="Enter Plot No." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.plotNo && formik.errors.plotNo ? formik.errors.plotNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Village/Mauja Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.village_mauja?.readOnly} {...formik.getFieldProps('village_mauja')} type="text" className={`cypress_village form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.village_mauja?.style}`}
                                    placeholder="Enter Village/Mauja Name" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.village_mauja && formik.errors.village_mauja ? formik.errors.village_mauja : null}</span>
                            </div>
                           
                        </div>
                        <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Basic Address</small></label></div>
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                        </div>

                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.city?.readOnly} {...formik.getFieldProps('city')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-norma text-gray-500 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200 ${inputConditionState?.city?.style}`}
                                    placeholder="Enter City" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.city && formik.errors.city ? formik.errors.city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.district?.readOnly}  {...formik.getFieldProps('district')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-norma ltext-gray-500 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200 ${inputConditionState?.district?.style}`}
                                    placeholder="Enter District" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.district && formik.errors.district ? formik.errors.district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.state?.readOnly} {...formik.getFieldProps('state')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-norma text-gray-500 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 placeholder-gray-300 shadow-md bg-gray-200 ${inputConditionState?.state?.style}`}
                                    placeholder="Enter State" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.state && formik.errors.state ? formik.errors.state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.pin?.readOnly} {...formik.getFieldProps('pin')} type="text" className={`cypress_pin form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.pin?.style}`}
                                    placeholder="Enter Pin no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.pin && formik.errors.pin ? formik.errors.pin : null}</span>
                            </div>
                            {/* EXTRA DETAILS ADDED */}
                            {!props?.apartmentStatus && <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Building Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.buildingName?.readOnly} {...formik.getFieldProps('buildingName')} type="text" className={`cypress_pin form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.buildingName?.style}`}
                                    placeholder="Enter Pin no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.buildingName && formik.errors.buildingName ? formik.errors.buildingName : null}</span>
                            </div>}

                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Street Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.streetName?.readOnly} {...formik.getFieldProps('streetName')} type="text" className={`cypress_pin form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.streetName?.style}`}
                                    placeholder="Enter street name" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.streetName && formik.errors.streetName ? formik.errors.streetName : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Location<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.location2?.readOnly} {...formik.getFieldProps('location2')} type="text" className={`cypress_pin form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.location2?.style}`}
                                    placeholder="Enter location." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.location2 && formik.errors.location2 ? formik.errors.location2 : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Landmark<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.landmark?.readOnly} {...formik.getFieldProps('landmark')} type="text" className={`cypress_pin form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.landmark?.style}`}
                                    placeholder="Enter landmark" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.landmark && formik.errors.landmark ? formik.errors.landmark : null}</span>
                            </div>
                            {/* EXTRA DETAILS ADDED */}

                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property Address (enter full postal address)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.locality?.readOnly} {...formik.getFieldProps('locality')} type="text" className={`cypress_address form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.locality?.style}`}
                                    placeholder="Enter Property Address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.locality && formik.errors.locality ? formik.errors.locality : null}</span>
                            </div>
                            <div className="form-group col-span-4 form-check mb-2 md:px-4">
                                <input {...formik.getFieldProps('addressCheckbox')} type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label className="form-check-label text-gray-800"> <span className='inline text-red-400 text-sm font-semibold'>Note : </span><small className="mt-1 text-xs text-gray-600 inline">If Corresponding Address Different from Property Address (Please Tick)</small></label>
                            </div>
                        </div>

                        {/* Corresponding  address */}
                        <div className={`col-span-4 ${!formOpen ? 'hidden' : 'grid'} grid-cols-1 md:grid-cols-4`}>
                            <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                                <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className=" mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.c_city?.readOnly} {...formik.getFieldProps('c_city')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.c_city?.style}`}
                                    placeholder="Enter City" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_city && formik.errors.c_city ? formik.errors.c_city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.c_district?.readOnly} {...formik.getFieldProps('c_district')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.c_district?.style}`}
                                    placeholder="Enter District" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_district && formik.errors.c_district ? formik.errors.c_district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.c_state?.readOnly} {...formik.getFieldProps('c_state')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.c_state?.style}`}
                                    placeholder="Enter State" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_state && formik.errors.c_state ? formik.errors.c_state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.c_pin?.readOnly} {...formik.getFieldProps('c_pin')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.c_pin?.style}`}
                                    placeholder="Enter Pin" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_pin && formik.errors.c_pin ? formik.errors.c_pin : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Address <span className='font-normal'>(enter full postal address)<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></span></label>
                                <input disabled={inputConditionState?.c_locality?.readOnly} {...formik.getFieldProps('c_c_locality')} type="text" className={`form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md ${inputConditionState?.locality?.style}`}
                                    placeholder="Enter Address" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.c_locality && formik.errors.c_locality ? formik.errors.c_locality : null}</span>
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default BasicEditPropertyAddressDetails