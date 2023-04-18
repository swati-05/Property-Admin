//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropBasicDetail
// DESCRIPTION - COMPONENT-1 CitizenPropBasicDetail Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  1 - transferMode
//                  2 - dateOfPurchase
//                  3 - ulbId
//                  4 - wardNo
//                  5 - newWardNo
//                  6 - ownerShiptype
//                  7 - propertyType
//                  8 - landOccupationDate
//                  9 - apartment
//                  10 - apartmentName (for flat case)
//                  11 - holdingNoList(for amalgamtion case)
//////////////////{*****}//////////////////////////////////////////



import { useState, useEffect } from 'react'
import { MdTag } from 'react-icons/md'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput, handleNullWithEmpty } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../../Components/Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import axios from 'axios'
import ApiHeader from '../../../Components/ApiList/ApiHeader'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { MdOutlineAdd } from 'react-icons/md'


function CitizenPropBasicDetail3(props) {

    const navigate = useNavigate()

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    // const [wardByUlb, setwardByUlb] = useState()
    const [newWardList, setnewWardList] = useState()
    // const [selectedUlbId, setselectedUlbId] = useState()
    const [holdingNoList, setholdingNoList] = useState([])

    console.log('geting apartmetn list in basic details...', props?.apartmentList)
    // const [apartmentList, setapartmentList] = useState()
    const [apartmentName, setapartmentName] = useState('')
    const [holdingVerificationStatus, setholdingVerificationStatus] = useState(false)

    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    const { api_verifyHolding } = CitizenApplyApiList()



    let validationSchema
    if (props?.safType == 'mu') {
        validationSchema = yup.object({
            dateOfPurchase: yup.string().required('Select date of purchase'),
            transferMode: yup.string().required('Select transfer mode'),
            wardNo: yup.string().required('Select ward'),
            newWardNo: yup.string().required('Select new ward'),
            ownerShiptype: yup.string().required('Select ownership type'),
            propertyType: yup.string().required('Select property'),
            apartment: yup.string(),
            // apartment: yup.string('enter numbers only').when('propertyType', {
            //     is: '3',
            //     then: yup.string().required('Select flat')
            // }),
            landOccupationDate: yup.string()
        })
    } else {
        validationSchema = yup.object({
            dateOfPurchase: yup.string(),
            transferMode: yup.string(),
            wardNo: yup.string().required('Select ward'),
            newWardNo: yup.string().required('Select new ward'),
            ownerShiptype: yup.string().required('Select ownership type'),
            propertyType: yup.string().required('Select property'),
            apartment: yup.string(),
            // apartment: yup.string('enter numbers only').when('propertyType', {
            //     is: '3',
            //     then: yup.string().required('Select flat')
            // }),
            landOccupationDate: yup.string()
        })
    }

    const initialValues = {
        transferMode: '',
        dateOfPurchase: '',
        wardNo: '',
        newWardNo: '',
        ownerShiptype: '',
        propertyType: '',
        landOccupationDate: '',
        apartment: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {

            let ruleOk = checkRuleSet(values)
            if (!ruleOk) {
                return
            }

            // APT-5 INJECTING APARTMENT NAME IN CASE OF FLATS 
            if (props?.apartmentStatus == true) {
                values.appartmentName = apartmentName //NOT NEED TO SET APARTMENT ID AS IT IS ALREADY IN APARTMENT KEY
            }



            console.log('basic deatils preview at submit', basicViewForm)
            console.log('after next function')

            // props.collectFormDataFun('basicDetails', values, basicViewForm) //sending BasicDetails data to parent to store all form data at one container
            //BASIC DETAILS DATA PUSH
            props?.setbasicDetails(values)
            props?.setbasicDetailsPreview(basicViewForm)
            props.nextFun(1) //forwarding to next form level
        }
        , validationSchema
    })
    const checkRuleSet = (values) => {
        console.log('inside rulecheck...')
        console.log('property type...', values.propertyType)
        console.log('apartment...', typeof (values.apartment))

        if (values.wardNo == '' || values.wardNo == null ) {
            props?.activateBottomErrorCard(true, 'Please select old ward')
            return false
        }
        if (values.newWardNo == '' || values.newWardNo == null ) {
            props?.activateBottomErrorCard(true, 'Please select new ward')
            return false
        }
        // IF PROPERTY TYPE IS FLAT THEN NEED TO SELECT APARTMENT
        if (values.propertyType === '3' && (values.apartment == '' || values.apartment == null )) {
            props?.activateBottomErrorCard(true, 'Please select apartment')
            return false
        }
        // IF PROPERTY TYPE IS VACCANT THEN NEED TO SELECT LAND OCCUPATION DATE
        if (values.propertyType === '4' && (values.landOccupationDate == '' || values.landOccupationDate == null )) {
            props?.activateBottomErrorCard(true, 'Please select land occupation date')
            return false
        }

        if(props?.safType=='mu' && (values.dateOfPurchase == '' || values.dateOfPurchase == null) ){
            props?.activateBottomErrorCard(true, 'Please select date of purchase')
            return false
        }
        if(props?.safType=='mu' && (values.transferMode == '' || values.transferMode == null) ){
            props?.activateBottomErrorCard(true, 'Please select mode of transfer')
            return false
        }

        return true
    }

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
        { name == 'wardNo' && props?.fetchNewWardByOldWard(value) }
        { name == 'wardNo' && props?.fetchApartmentByOldWard(value) }

        // 1 VACCANT LAND DIRECT CASE
        { name == 'propertyType' && props?.setpropertyTypeState(value) }

        // APT-2 SHOW APARtMENT INPUT IF FLATS SELECTED
        if (name == 'propertyType') {
            { value == 3 ? props?.setapartmentStatus(true) : props?.setapartmentStatus(false) }
        }

        // APT-3 SET APARTMENT NAME
        if (name == 'apartment') {
            setapartmentName(event.target[event.target.selectedIndex].text)
        }



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
            transferMode: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            dateOfPurchase: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            wardNo: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            newWardNo: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            ownerShiptype: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            propertyType: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            landOccupationDate: { readOnly: readOnly ? readOnly : false, style: trueStyle },
            apartment: { readOnly: readOnly ? readOnly : false, style: trueStyle },
        })
    }

    useEffect(() => {
        if (props?.safType == 'bo-edit') {
            funcSetReadonly(true)
        }

    }, [])

    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    useEffect(() => {
        formik.setFieldValue('newWardNo', props?.basicDetails?.newWardNo)
    }, [props?.newWardList])

    const feedPropertyData = () => {

        console.log('feed details at basic detials...', props?.basicDetails?.ownerShiptype)

        // FETCH THOSE LIST WHICH COMES ONCHANGE EVEN OF ULB AND WARD AND THEN SET WARD,NEWWARD,ZONE AFTER RESPONSE
        props?.setselectedUlbId(props?.basicDetails?.ulbId)
        props?.fetchNewWardByOldWard(props?.basicDetails?.wardNo)
        formik.setFieldValue('wardNo', props?.basicDetails?.wardNo)
        formik.setFieldValue('newWardNo', props?.basicDetails?.newWardNo)
        // FETCHING APARTMENT LIST DETAILS BY OLD WARD
        props?.fetchApartmentByOldWard(props?.basicDetails?.wardNo)

        formik.setFieldValue('ownerShiptype', props?.basicDetails?.ownerShiptype)
        formik.setFieldValue('propertyType', props?.basicDetails?.propertyType)

        // if (props.basicDetails?.propertyType == 3) {
        //     // FETCHING APARTMENTLIST
        //     props?.fetchApartmentByOldWard(props?.basicDetails?.wardNo)
        // }

        // OPEN APARTMENT LIST IF PROPERTY IS FLAT
        //    if(props?.basicDetails?.propertyType==3){
        //        props?.setapartmentStatus(true)
        //    }else{
        //        props?.setapartmentStatus(false)
        //    }

        // 2 VACCANT LAND REASSESSMENT / MUTATION CASE
        props?.setpropertyTypeState(props?.basicDetails?.propertyType)
        setbasicViewForm(props?.basicDetailsPreview)
    }

    let safType = props.safType

    // FUNCTION TO REMOVE HOLDING ROW INPUT
    const removeHoldingNo = (index) => {
        setholdingNoList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
    }

    // FUNCTION TO ADD HOLDING ROW INPUT
    const addHoldingRow = () => {
        let tempHoldingRowCount = [...holdingNoList]
        let modifiedRowCount = [...tempHoldingRowCount, formik.values?.holdingNo]
        setholdingNoList(modifiedRowCount)
        formik.setFieldValue('holdingNo', '')
    }

    const verifyHolding = () => {
        let requestBody = {
            holdingNo: formik.values.holdingNo,
            ulbId: 2
        }
        axios.post(api_verifyHolding, requestBody, ApiHeader())
            .then(function (response) {
                console.log('verify holding response..', response.data)
                setholdingVerificationStatus(response?.data?.status)

            })
            .catch(function (error) {
                console.log('verify holding error.... ', error);
            })
    }
    return (
        <>

            {/* <div className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600 w-full'><FaHome className="inline mr-2" /><span>Basic Details</span>{props?.safType != 'new' && <span className='inline-block float-right'> <span className='font-normal'>Holding No. : </span>{props?.existingPropertyDetails?.data?.data?.holding_no}</span>}</div> */}

            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  shadow-xl bg-white px-4 sm:px-0">
                {/* <div className='relative -top-14 -left-4 col-span-12 rounded-lg pl-2 font-semibold text-xl'><MdTag className="inline" />Basic Details</div> */}
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <Tooltip anchorId="my-element" />
                    <div className="grid grid-cols-12  sm:space-x-2">



                        <div className="col-span-12  grid grid-cols-12 md:px-12  md:py-10 rounded-lg py-6">

                            {props?.safType == 'mu' && <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}>&nbsp;</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Transafer Mode<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.transferMode?.readOnly} id='basic_details_1' {...formik.getFieldProps('transferMode')} className={`cypress_transferMode ${commonInputStyle} cursor-pointer ${inputConditionState?.transferMode?.style}`}>
                                    <option value="" >Select</option>
                                    {
                                        props?.preFormData?.transfer_mode.map((data) => (
                                            <option value={data.id}>{data.transfer_mode}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.transferMode && formik.errors.transferMode ? formik.errors.transferMode : null}</span>
                            </div>
                            }

                            {props?.safType == 'mu' && <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}>&nbsp;</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Date of Purchase<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.dateOfPurchase?.readOnly} type='date' {...formik.getFieldProps('dateOfPurchase')} className={`cypress_dateOfPurchase ${commonInputStyle} cursor-pointer ${inputConditionState?.dateOfPurchase?.style}`} />
                                <span className="text-red-600 absolute text-xs">{formik.touched.dateOfPurchase && formik.errors.dateOfPurchase ? formik.errors.dateOfPurchase : null}</span>
                            </div>
                            }

                            <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}><AiFillInfoCircle className="inline" />Select ulb to get ward list</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Old Ward No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.wardNo?.readOnly} {...formik.getFieldProps('wardNo')} className={`${commonInputStyle} cursor-pointer cypress_wardNo ${inputConditionState?.wardNo?.style}`}>
                                    <option value="" >Select</option>
                                    {
                                        props?.wardList?.map((data) => (
                                            <option value={data.id}>{data.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}><AiFillInfoCircle className="inline" />Select old ward to get new ward list</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>New Ward No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.newWardNo?.readOnly} {...formik.getFieldProps('newWardNo')} className={`${commonInputStyle} cursor-pointer cypress_newWardNo ${inputConditionState?.newWardNo?.style}`} >
                                    <option value="" >Select</option>

                                    {
                                        props?.newWardList?.map((data) => (
                                            <option value={data.id}>{data.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.newWardNo && formik.errors.newWardNo ? formik.errors.newWardNo : null}</span>

                            </div>
                            <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}>&nbsp;</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Ownership Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.ownerShiptype?.readOnly} {...formik.getFieldProps('ownerShiptype')} className={`${commonInputStyle} cursor-pointer cypress_ownerShiptype ${inputConditionState?.ownerShiptype?.style}`}
                                >
                                    <option value="" >Select</option>
                                    {
                                        props?.preFormData?.ownership_types.map((data) => (
                                            <option value={data.id}>{data.ownership_type}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.ownerShiptype && formik.errors.ownerShiptype ? formik.errors.ownerShiptype : null}</span>
                            </div>
                            <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}>&nbsp;</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Property Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.propertyType?.readOnly} {...formik.getFieldProps('propertyType')} className={`${commonInputStyle} cursor-pointer cypress_propertyType ${inputConditionState?.propertyType?.style}`}
                                >
                                    <option value="" >Select</option>
                                    {
                                        props?.preFormData?.property_type.map((data) => (
                                            <option value={data.id}>{data.property_type}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.propertyType && formik.errors.propertyType ? formik.errors.propertyType : null}</span>
                            </div>

                            {/* // APT-1 IN CASE OF FLAT/MULTI STORED BUILDING */}
                            {props?.apartmentStatus && <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Apartment<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.apartment?.readOnly} {...formik.getFieldProps('apartment')} className={`${commonInputStyle} cursor-pointer cypress_apartment ${inputConditionState?.apartment?.style}`}
                                >
                                    <option value="" >Select</option>
                                    {props?.apartmentList?.length !== 0 &&
                                        props?.apartmentList?.map((data) => (
                                            <option value={data.id}>{data.apartment_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.apartment && formik.errors.apartment ? formik.errors.apartment : null}</span>
                            </div>}
                            {props?.propertyTypeState == 4 && <div className={`form-group col-span-12 md:col-span-3 mb-4 md:px-2`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Land Purchase Date<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <input disabled={inputConditionState?.landOccupationDate?.readOnly} {...formik.getFieldProps('landOccupationDate')} type='date' className={`${commonInputStyle} cursor-pointer cypress_landOccupationDate ${inputConditionState?.landOccupationDate?.style}`}
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.landOccupationDate && formik.errors.landOccupationDate ? formik.errors.landOccupationDate : null}</span>
                            </div>}
                            {/* <div className={`form-group col-span-12 md:col-span-12 mb-4 md:px-10`}>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>Zone</label>
                                <select {...formik.getFieldProps('zone')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="" disabled selected>select zone</option>
                                    <option value="1">Zone-1</option>
                                    <option value="2">Zone-2</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>

                            </div> */}
                            <div className=' text-right col-span-12 mt-10'>
                                <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                            </div>
                        </div>

                        <div></div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default CitizenPropBasicDetail3