//////////////////{*****}//////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19th Dec., 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropBasicDetail
// >DESCRIPTION - CitizenPropBasicDetail Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '@/Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, inputErrorStyle, commonInputStyle, inputLabelStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'

function CitizenPropBasicDetail(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [wardList, setwardList] = useState()
    const {api_getWardListByLogin} = ProjectApiList()

    console.log("passing master data to basic detail form", props?.preFormData)
    const validationSchema = yup.object({
        // wardNo: yup.string().required('Select ward').max(50, 'Enter maximum 50 characters'),
        // newWardNo: yup.string().required('Select new ward'),
        // ownerShiptype: yup.string().required('Select ownership type'),
        // propertyType: yup.string().required('Select property'),
        zone: yup.string(),
        // mobileTowerStatus: yup.string().required('Select mobile tower status'),
        // hoardingStatus: yup.string().required('Select hoarding status'),
        // petrolPumpStatus: yup.string().required('Select petrol pump status'),
        // waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        // mobileTowerArea: yup.string('enter numbers only').when('mobileTowerStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        // hoardingArea: yup.string().when('hoardingStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        // petrolPumpArea: yup.string().when('petrolPumpStatus', {
        //     is: 'yes',
        //     then: yup.string().required('Field is required')
        // }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        // mobileTowerDate: yup.date().when('mobileTowerStatus', {
        //     is: 'yes',
        //     then: yup.date().required('Field is required')
        // }),
        // hoardingDate: yup.date().when('hoardingStatus', {
        //     is: 'yes',
        //     then: yup.date().required('Field is required')
        // }),
        // petrolPumpDate: yup.date().when('petrolPumpStatus', {
        //     is: 'yes',
        //     then: yup.date().required('Field is required')
        // }),

    })

    const formik = useFormik({
        initialValues : {
            wardNo: props?.preFormData?.old_ward_no,
            newWardNo:  props?.preFormData?.new_ward_mstr_id,
            ownerShiptype: props?.preFormData?.ownership_type,
            propertyType: props?.preFormData?.property_type,
            zone: props?.preFormData?.zone_mstr_id,
            mobileTowerStatus: props?.preFormData?.is_mobile_tower ,
            hoardingStatus: props?.preFormData?.is_hoarding_board ,
            petrolPumpStatus: props?.preFormData?.is_petrol_pump ,
            waterHarvestingStatus: props?.preFormData?.is_water_harvesting ,
            mobileTowerArea:  props?.preFormData?.tower_area,
            hoardingArea:  props?.preFormData?.hoarding_area,
            petrolPumpArea:  props?.preFormData?.petrol_pump_area,
            mobileTowerDate: props?.preFormData?.tower_installation_date,
            hoardingDate: props?.preFormData?.hoarding_installation_date,
            petrolPumpDate: props?.preFormData?.petrol_pump_completion_date,
        },

        enableReinitialize: true,

        onSubmit : (values) => {
            console.log('basic deatils ', values)
            props?.collectFormDataFun('basicDetails', values) //sending BasicDetails data to parent to store all form data at one container
            props?.nextFun(1) //f
        }
    })

    // const initialValues = {
    //     wardNo: props?.preFormData?.old_ward_no,
    //     newWardNo:  props?.preFormData?.new_ward_no,
    //     ownerShiptype: props?.preFormData?.ownership_type,
    //     propertyType: props?.preFormData?.property_type,
    //     zone: props?.preFormData?.zone_mstr_id,
    //     mobileTowerStatus: props?.preFormData?.is_mobile_tower,
    //     hoardingStatus: props?.preFormData?.is_hoarding_board,
    //     petrolPumpStatus: props?.preFormData?.is_petrol_pump,
    //     waterHarvestingStatus: props?.preFormData?.is_water_harvesting,
    //     mobileTowerArea:  props?.preFormData?.tower_area,
    //     hoardingArea:  props?.preFormData?.hoarding_area,
    //     petrolPumpArea:  props?.preFormData?.petrol_pump_area,
    //     mobileTowerDate: props?.preFormData?.tower_installation_date,
    //     hoardingDate: props?.preFormData?.hoarding_installation_date,
    //     petrolPumpDate: props?.preFormData?.petrol_pump_completion_date,
    // }
    // const onSubmit = (values, resetForm) => {
    //     console.log('basic deatils ', values)
    //     props?.collectFormDataFun('basicDetails', values) //sending BasicDetails data to parent to store all form data at one container
    //     props?.nextFun(1) //forwarding to next form level
    // }

    const seleOptions = [
        { option: 'one', value: 1 },
        { option: 'two', value: 2 },
        { option: 'three', value: 3 },
        { option: 'four', value: 4 },
        { option: 'five', value: 5 },
        { option: 'six', value: 6 },
    ]
    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        { name === 'mobileTowerStatus' && ((value === 'yes') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name === 'hoardingStatus' && ((value === 'yes') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name === 'petrolPumpStatus' && ((value === 'yes') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        // //allow restricted inputs
        // { name == 'mobileTowerArea' && formik.setFieldValue("mobileTowerArea", allowFloatInput(value, formik.values.mobileTowerArea, 20)) } //(currentValue,oldValue,max,isCapital)
        // { name == 'hoardingArea' && formik.setFieldValue("hoardingArea", allowFloatInput(value, formik.values.hoardingArea, 20, true)) }
        // { name == 'petrolPumpArea' && formik.setFieldValue("petrolPumpArea", allowFloatInput(value, formik.values.petrolPumpArea, 20)) }


    };

    useEffect(() => {

        axios.get(api_getWardListByLogin, ApiHeader())
        .then((res) => {
            console.log("ward list => ", res?.data)
            setwardList(res?.data?.data)
        })
        .catch((err) => {
            console.log("error getting ward list => ", err)
        })
    },[])

    const commonInputStyle = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const commonInputStyle2 = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:outline-none focus:outline-none border-2 shadow-sm cursor-text bg-gray-100`

    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><FaHome className="inline mr-2" />Basic Details</h1>
            <div className="block p-4 w-full md:py-6 shadow-lg bg-white border border-gray-200  mx-auto absolute top-14">

           <form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                  
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="col-span-4 grid grid-cols-1 md:grid-cols-5">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Old Ward No</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.old_ward_no == '' || props?.preFormData?.old_ward_no == null ) ? <i>N/A</i> : props?.preFormData?.old_ward_no } 
                                    </div>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>New Ward No</label>
                                    <select name="newWardNo" className={`${commonInputStyle} cursor-pointer `} >
                                        <option value="" disabled selected>select new ward</option>
                                        {
                                            wardList?.map((data) => (
                                                <option value={data.id}>{data.wardName}</option>
                                            ))
                                        }
                                    </select>
                                    {/* <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='newWardNo' />
                                    </span> */}
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Ownership Type</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.ownership_type == '' || props?.preFormData?.ownership_type == null ) ? <i>N/A</i> : props?.preFormData?.ownership_type } 
                                    </div>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Property Type</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.property_type == '' || props?.preFormData?.property_type == null ) ? <i>N/A</i> : props?.preFormData?.property_type } 
                                    </div>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Zone</label>
                                    <select name="zone" className={`${commonInputStyle} cursor-pointer `}
                                    >
                                        <option value="" disabled selected>select zone</option>
                                        <option value="1" >Zone-1</option>
                                        <option value="2" >Zone-2</option>

                                    </select>
                                    {/* <span className={`${inputErrorStyle}`}>
                                        <ErrorMessage name='zone' />
                                    </span> */}
                                </div>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>Property has Mobile Tower(s) ?</label>
                                <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.is_mobile_tower ) ? <>Yes</> :<>No</> } 
                                    </div>
                            </div>
                            <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area Covered</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.tower_area == '' || props?.preFormData?.tower_area == null ) ? <i>N/A</i> : props?.preFormData?.tower_area } 
                                    </div>
                                </div>

                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Installation Date</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.tower_installation_date == '' || props?.preFormData?.tower_installation_date == null ) ? <i>N/A</i> : props?.preFormData?.tower_installation_date } 
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-4">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Property has Hoarding Board(s) ?</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.is_hoarding_board ) ? <>Yes</> :<>No</> } 
                                    </div>
                                </div>


                                <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area</label>
                                        <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.hoarding_area == '' || props?.preFormData?.hoarding_area == null ) ? <i>N/A</i> : props?.preFormData?.hoarding_area } 
                                    </div>
                                    </div>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Installation Date</small></label>
                                        <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.hoarding_installation_date == '' || props?.preFormData?.hoarding_installation_date == null ) ? <i>N/A</i> : props?.preFormData?.hoarding_installation_date } 
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-4">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle}`}>Is property a Petrol Pump ?</label>
                                    <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.is_petrol_pump ) ? <>Yes</> :<>No</> } 
                                    </div>
                                </div>

                                <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                    <div className={`${inputContainerStyle}`}>

                                        <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">Total Area</label>
                                        <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.petrol_pump_area == '' || props?.preFormData?.petrol_pump_area == null ) ? <i>N/A</i> : props?.preFormData?.petrol_pump_area } 
                                    </div>
                                    </div>
                                    <div className={`${inputContainerStyle}`}>
                                        <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Completion Date</small></label>
                                        <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.petrol_pump_completion_date == '' || props?.preFormData?.petrol_pump_completion_date == null ) ? <i>N/A</i> : props?.preFormData?.petrol_pump_completion_date } 
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>Rainwater harvesting provision ?</label>
                                <div className={`${commonInputStyle2} cursor-pointer `}>
                                    {(props?.preFormData?.is_water_harvesting ) ? <>Yes</> :<>No</> } 
                                    </div>
                            </div>

                            <div></div>
                            <div className="col-span-4 grid grid-cols-2">
                                <div className='md:px-10'>
                                <button onClick={() => navigate('/saf-workflow')} className=" px-6 py-2.5 bg-sky-400 text-white font-medium text-xs leading-tight  rounded  hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                </div>
                                <div className='md:px-10 text-right'>
                                    <button type="submit" className=" px-6 py-2.5 bg-sky-400 text-white font-medium text-xs leading-tight  rounded  hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-2">
                            </div>
                        </div>
                 
                </form>

            </div>
        </>
    )
}

export default CitizenPropBasicDetail