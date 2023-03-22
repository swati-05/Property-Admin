//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropBasicDetail
// DESCRIPTION - COMPONETN-6 CitizenPropBasicDetail Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  1 - zone
//                  2 - mobileTowerStatus
//                  3 - hoardingStatus
//                  4 - petrolPumpStatus
//                  5 - waterHarvestingStatus
//                  6 - mobileTowerArea
//                  7 - hoardingArea
//                  8 - petrolPumpArea
//                  9 - mobileTowerDate
//                  10 - hoardingDate
//                  11 - petrolPumpDate

//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { MdTag } from 'react-icons/md'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../../Components/Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'

function CitizenPropAdditionalDetails(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    console.log("passing master data to basic detail form", props.preFormData)
    const validationSchema = yup.object({
        zone: yup.string().required('Select Zone'),
        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        hoardingStatus: yup.string().required('Select hoarding status'),
        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        mobileTowerArea: yup.string('enter numbers only').when('mobileTowerStatus', {
            is: '1',
            then: yup.string().required('Field is required')
        }),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: '1',
            then: yup.string().required('Field is required')
        }),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: '1',
            then: yup.string().required('Field is required')
        }),
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: '1',
            then: yup.date().required('Field is required')
        }),

    })

    const initialValues = {
        zone: '',
        mobileTowerStatus: '0',
        hoardingStatus: '0',
        petrolPumpStatus: '0',
        waterHarvestingStatus: '0',
        mobileTowerArea: '',
        hoardingArea: '',
        petrolPumpArea: '',
        mobileTowerDate: '',
        hoardingDate: '',
        petrolPumpDate: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, resetForm) => {
            console.log('additionalDetails deatils at submit ', values)
            props?.setadditionalDetails(values)
            props?.setadditionalDetailsPreview(basicViewForm)
            // props.collectFormDataFun('additionalDetails', values, basicViewForm) //sending BasicDetails data to parent to store all form data at one container
            props.nextFun(6) //forwarding to next form level
        }
        , validationSchema
    })


    const seleOptions = [
        { option: 'one', value: 1 },
        { option: 'two', value: 2 },
        { option: 'three', value: 3 },
        { option: 'four', value: 4 },
        { option: 'five', value: 5 },
        { option: 'six', value: 6 },
    ]
    const handleOnChange = (event) => {
        // console.log('input type', event.target[event.target.selectedIndex].text)
        let name = event.target.name
        let value = event.target.value
        { name == 'ulbId' && props?.getLocationByUlb(value) }
        { name == 'mobileTowerStatus' && ((value == '1') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name == 'hoardingStatus' && ((value == '1') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name == 'petrolPumpStatus' && ((value == '1') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        //* Collecting basic details to preview
        if (event.target.type == 'select-one') {
            setbasicViewForm({ ...basicViewForm, [name]: event.target[event.target.selectedIndex].text })
        } else {
            setbasicViewForm({ ...basicViewForm, [name]: value })
        }

    };

    // INITIALLY CALLING DYNAMIC HOOK TO CREATE CONDITIONALLY STATES AND RETURN STATE VARIABLE AND FUNCTION WHICH WILL UPDATE STATES FOR NEXT TIME
    const [inputConditionState, setinputConditionState] = useState();

    //FUNCTION WHICH SETS READONLY ATTRIBUTE CONDITIONALLY
    const funcSetReadonly = (readOnly) => {
        let trueStyle = 'bg-gray-300 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-200 focus:outline-gray-200 cursor-default'
        let falseStyle = ''

        setinputConditionState({
            ...inputConditionState,
            petrolPumpDate: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            mobileTowerStatus: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            hoardingStatus: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            petrolPumpStatus: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            waterHarvestingStatus: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            mobileTowerArea: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            hoardingArea: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            petrolPumpArea: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            mobileTowerDate: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },
            hoardingDate: { readOnly: readOnly, style: readOnly ? trueStyle : falseStyle },

            zone: { readOnly: false, style: falseStyle },// BO CAN EDIT ZONE ONLY
        })
    }

    useEffect(() => {
        // IN CASE OF RE-ASSESSMENT OR BACK OFFICE  RESTRICT FEW INPUT
        if (props?.safType == 'bo-edit') {
            funcSetReadonly(true)
        }

    }, [])

    useEffect(() => {
        checkForZone()
    }, [props?.allFormData?.floorDetails])


    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    const feedPropertyData = () => {
        console.log('feeding property data...')

        let previewDetails
        let basicDetails


        console.log('additional feed details...', props?.additionalDetails)
        formik.setFieldValue('zone', props?.additionalDetails?.zone)

        formik.setFieldValue('mobileTowerStatus', props?.additionalDetails?.mobileTowerStatus)
        formik.setFieldValue('hoardingStatus', props?.additionalDetails?.hoardingStatus)
        formik.setFieldValue('petrolPumpStatus', props?.additionalDetails?.petrolPumpStatus)
        formik.setFieldValue('waterHarvestingStatus', props?.additionalDetails?.waterHarvestingStatus)

        { props?.additionalDetails?.mobileTowerStatus == true ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false) }
        { props?.additionalDetails?.hoardingStatus == true ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false) }
        { props?.additionalDetails?.petrolPumpStatus == true ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false) }

        formik.setFieldValue('mobileTowerArea', props?.additionalDetails?.mobileTowerArea)
        formik.setFieldValue('mobileTowerDate', props?.additionalDetails?.mobileTowerDate)

        formik.setFieldValue('hoardingArea', props?.additionalDetails?.hoardingArea)
        formik.setFieldValue('hoardingDate', props?.additionalDetails?.hoardingDate)

        formik.setFieldValue('petrolPumpArea', props?.additionalDetails?.petrolPumpArea)
        formik.setFieldValue('petrolPumpDate', props?.additionalDetails?.petrolPumpDate)



        // //* ARRANGING PREVIEW DATA
        previewDetails = {
            zone: props?.additionalDetailsPreview?.zone,
        }

        console.log('auto feed data.....basic...', props?.additionalDetails, props?.additionalDetailsPreview)
        // props.collectFormDataFun('additionalDetails', props?.additionalDetails, props?.additionalDetailsPreview) //sending BasicDetails data to parent to store all form data at one container
        setbasicViewForm(props?.additionalDetailsPreview)
    }

    let safType = props.safType
    console.log("saf type...", props.safType)
    console.log('preview basic detals....', basicViewForm)

    const checkForZone = () => {
        // FOR RANCHI IF ANY CONSTRUCTED DATE IS LESS THAN 2016 THEN SHOW ZONE
        let specificDate = new Date("01-04-2016");
        console.log('floor data...at additional', props?.allFormData?.floorDetails)

        let filteredArr = props?.allFormData?.floorDetails?.filter(obj => {
            let date = new Date(obj?.dateFrom);
            return date < specificDate;
        });
        if (filteredArr?.length != 0) {
            props?.setzoneValue(true)
        } else {
            // IF NO ZONE TO SELECT THEN BY DEFAULT ZONE-1 PASS AS INSTRUCTED BY ANIL SIR
            props?.setzoneValue(false)
            formik.setFieldValue('zone', '1')
        }
        console.log('filtered array....', filteredArr)

    }
    return (
        <>
            {/* <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType != 'new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div> */}
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto shadow-xl bg-white">
                {/* <div className='col-span-12  relative -left-4 -top-14  w-full  rounded-lg  font-semibold text-xl'><MdTag className="inline" />
                    Additional Details</div> */}
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  space-x-2">
                        <div className="col-span-12 grid grid-cols-12 px-6 md:px-12 py-10 rounded-lg">

                            {props?.zoneValue && <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Zone<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.zone?.readOnly} {...formik.getFieldProps('zone')} className={`${commonInputStyle} cursor-pointer cypress_zone ${inputConditionState?.zone?.style}`}
                                >
                                    <option value="" >Select</option>
                                    {
                                        props?.preFormData?.zone_mstrs?.map((data) => (
                                            <option value={data?.id}>{data?.zone}</option>
                                        ))
                                    }

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>

                            </div>}
                            <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Property has Mobile Tower(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>

                                <select disabled={inputConditionState?.mobileTowerStatus?.readOnly} name='mobileTowerStatus' value={formik.values.mobileTowerStatus} className={`${commonInputStyle} cursor-pointer cypress_mobile_tower_status ${inputConditionState?.mobileTowerStatus?.style}`} onChange={formik.handleChange}
                                >
                                    <option value="" >Select</option>

                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>

                            </div>
                            {mobileTowerStatusToggle && <>
                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Total Tower Area<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input disabled={inputConditionState?.mobileTowerArea?.readOnly} {...formik.getFieldProps('mobileTowerArea')} type="text" className={`${commonInputStyle} ${inputConditionState?.mobileTowerArea?.style}`} />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                                </div>

                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Tower Installation Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input disabled={inputConditionState?.mobileTowerDate?.readOnly} {...formik.getFieldProps('mobileTowerDate')} type="date" className={`${commonInputStyle} ${inputConditionState?.mobileTowerDate?.style}`} placeholder='dd-mm-yyyy' min={'2021-05-20'} max={'2024-05-25'}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>

                                </div>
                            </>}
                            <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Property has Hoarding Board(s) ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.hoardingStatus?.readOnly} {...formik.getFieldProps('hoardingStatus')} value={formik.values.hoardingStatus} className={`${commonInputStyle} cursor-pointer cypress_hoarding_status ${inputConditionState?.hoardingStatus?.style}`}
                                >
                                    <option value="" >Select</option>
                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>

                            </div>


                            {hoardingStatusToggle && <>
                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Hoarding Area<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input disabled={inputConditionState?.hoardingArea?.readOnly} {...formik.getFieldProps('hoardingArea')} type="text" className={`${commonInputStyle} ${inputConditionState?.hoardingArea?.style}`} />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                </div>
                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                    <label className="form-check-label text-gray-800"><small className="mt-1 text-xs text-gray-600 inline ">Hoarding Installation Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></small></label>
                                    <input disabled={inputConditionState?.hoardingDate?.readOnly} {...formik.getFieldProps('hoardingDate')} type="date" className={`${commonInputStyle} ${inputConditionState?.hoardingDate?.style}`}
                                    />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                </div>
                            </>}
                            <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Property a Petrol Pump ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.petrolPumpStatus?.readOnly} {...formik.getFieldProps('petrolPumpStatus')} value={formik.values.petrolPumpStatus} className={`${commonInputStyle} cursor-pointer cypress_petrol_pump_status ${inputConditionState?.petrolPumpStatus?.style}`}
                                >
                                    <option value="" >Select</option>
                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>
                                </select>

                                <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>

                            </div>

                            {petrolPumpStatusToggle && <>
                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>

                                    <label className="form-label inline-block mb-2 text-gray-600 text-xs font-normal">Petrol Pump Area<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input disabled={inputConditionState?.petrolPumpArea?.readOnly} {...formik.getFieldProps('petrolPumpArea')} type="text" className={`${commonInputStyle} ${inputConditionState?.petrolPumpArea?.style}`} />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>

                                </div>
                                <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                    <label className="form-check-label text-gray-800"><small className="mt-1 text-xs text-gray-600 inline ">Petrol Pump Completion Date</small></label>
                                    <input disabled={inputConditionState?.petrolPumpDate?.readOnly} {...formik.getFieldProps('petrolPumpDate')} type="date" className={`${commonInputStyle} ${inputConditionState?.petrolPumpDate?.style}`}
                                    />

                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>

                                </div>
                            </>}
                            <div className={`form-group col-span-12 md:col-span-3 mb-2 md:px-4`}>
                                <label className={`form-label inline-block mb-2 text-gray-600 text-sm font-semibold`}>Rainwater harvesting provision ?<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.waterHarvestingStatus?.readOnly} {...formik.getFieldProps('waterHarvestingStatus')} value={formik.values.waterHarvestingStatus} className={`${commonInputStyle} cursor-pointer cypress_harvesting_status ${inputConditionState?.waterHarvestingStatus?.style}`}
                                >
                                    <option value="" >Select</option>
                                    <option value="0" >No</option>
                                    <option value="1">Yes</option>
                                </select>

                                <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>

                            </div>
                            <div className="col-span-12 grid grid-cols-12 mt-10">
                                <div className=' col-span-6'>
                                    <button onClick={() => props.backFun(6)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                </div>
                                <div className=' text-right col-span-6'>
                                    <button type="submit" className="cypress_next6_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>

            </div>
        </>
    )
}

export default CitizenPropAdditionalDetails