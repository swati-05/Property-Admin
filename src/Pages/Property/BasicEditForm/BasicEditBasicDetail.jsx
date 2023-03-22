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
import { useFormik } from 'formik'
import * as yup from 'yup'
import { commonInputStyle } from '../../../Components/Common/CommonTailwind/CommonTailwind'
import { useNavigate } from 'react-router-dom'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import axios from 'axios'
import ApiHeader from '../../../Components/ApiList/ApiHeader'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { MdOutlineAdd } from 'react-icons/md'


function BasicEditBasicDetail(props) {

    const navigate = useNavigate()

    const [newWardList, setnewWardList] = useState()
    const [holdingNoList, setholdingNoList] = useState([])

    // const [apartmentList, setapartmentList] = useState()

    const [basicViewForm, setbasicViewForm] = useState({ mobileTowerStatus: '0', hoardingStatus: '0', petrolPumpStatus: '0', waterHarvestingStatus: '0' })

    const { api_verifyHolding } = CitizenApplyApiList()

    const validationSchema = yup.object({
        newWardNo: yup.string(),
    })
    const initialValues = {
        newWardNo: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {

            // props.collectFormDataFun('basicDetails', values, basicViewForm) //sending BasicDetails data to parent to store all form data at one container
            console.log('inside basic details submit...')
            //BASIC DETAILS DATA PUSH
            props?.setbasicDetails(values)
            props?.setbasicDetailsPreview(basicViewForm)
           props?.setleveFormSubmitCount(2)
        }
        , validationSchema
    })

    useEffect(() => {
        if (props?.leveFormSubmitCount == 1) {
            formik.handleSubmit()
        }
    }, [props?.leveFormSubmitCount])

    const handleOnChange = (event) => {
        // console.log('input type', event.target[event.target.selectedIndex].text)
        let name = event.target.name
        let value = event.target.value
        { name == 'wardNo' && props?.fetchNewWardByOldWard(value) }

        //* Collecting basic details to preview
        if (event.target.type == 'select-one') {
            setbasicViewForm({ ...basicViewForm, [name]: event.target[event.target.selectedIndex].text })
        } else {
            setbasicViewForm({ ...basicViewForm, [name]: value })
        }

    };

    // INITIALLY CALLING DYNAMIC HOOK TO CREATE CONDITIONALLY STATES AND RETURN STATE VARIABLE AND FUNCTION WHICH WILL UPDATE STATES FOR NEXT TIME
    const [inputConditionState, setinputConditionState] = useState();


    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    useEffect(() => {
        formik.setFieldValue('newWardNo', props?.basicDetails?.newWardNo)
    }, [props?.newWardList])

    const feedPropertyData = () => {

        // FETCH THOSE LIST WHICH COMES ONCHANGE EVEN OF ULB AND WARD AND THEN SET WARD,NEWWARD,ZONE AFTER RESPONSE
        props?.fetchNewWardByOldWard(props?.basicDetails?.wardNo)
        setbasicViewForm(props?.basicDetailsPreview)
    }

    return (
        <>
            <div className="flex md:pr-6">
                <div class="py-4 w-full">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="flex-1">
                            <div >
                                <div class="text-lg font-bold text-gray-700 leading-tight">Basic Details</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:p-4 w-full md:py-2 rounded-lg mx-auto  shadow-xl bg-white">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <Tooltip anchorId="my-element" />
                    <div className="grid grid-cols-12  space-x-2">
                        <div className="col-span-12  grid grid-cols-12 md:px-2  md:py-4 rounded-lg py-6">
                            <div className={`form-group col-span-12 md:col-span-3 mb-4 `}>
                                <div> <label className={`form-label text-xs mb-1 text-gray-400  font-semibold flex items-center`}><AiFillInfoCircle className="inline" />Select old ward to get new ward list</label></div>
                                <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold`}>New Ward No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <select disabled={inputConditionState?.newWardNo?.readOnly} {...formik.getFieldProps('newWardNo')} className={`${commonInputStyle} cursor-pointer cypress_new_ward ${inputConditionState?.newWardNo?.style}`} >
                                    <option value="" >Select</option>

                                    {
                                        props?.newWardList?.map((data) => (
                                            <option value={data.id}>{data.ward_name}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.newWardNo && formik.errors.newWardNo ? formik.errors.newWardNo : null}</span>

                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default BasicEditBasicDetail