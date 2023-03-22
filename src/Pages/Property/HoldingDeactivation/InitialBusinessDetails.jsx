
//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 19 july 2022
//    Updated On - 13/Aug/2022 - API Integrated
//    Revision - 1
//    Project - JUIDCO
//    Component  - Trade (closed)
//    DESCRIPTION - New application (InitialBusinessDetails) Component
//////////////////////////////////////////////////////////////////////////////////////

import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../../Pages/Trade/tradeComponent/CommonStyles'
import axios from 'axios'

function InitialBusinessDetails(props) {

    const { applicationType, colorCode, currentStep, currentStepFun, collectAllFormData, collectFormDataFun, firmStepFun, firmStep, colorCodeFun,  showLoader } = props?.values;
    const initialValues = {

    }

    const formik = useFormik(
        {
            initialValues: initialValues,
            onSubmit: (values, resetForm) => {
                // alert(values);
                showLoader(true);
                console.log('basic deatils ', values)
                collectFormDataFun('initialBusinessDetails', values, 0) //sending BasicDetails data to parent to store all form data at one container

                setTimeout(() => {
                    firmStepFun(2) //forwarding to next form level
                    currentStepFun(2)
                    colorCodeFun(1)

                    showLoader(false);
                }, 500)



            }
            
        });

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        // { name === 'applyWith' && (value === '1' ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        // { name === 'firmType' && (value === '5' ? setotherfirmToggleStatus(true) : setotherfirmToggleStatus(false)) }
        // { name === 'noticeNo' && (value === '1' ? setNoticeField(true) : setNoticeField(false)) }
    };

    return (
        <>
            <div className={` absolute w-full md:w-full sm:w-full`} >

                {/* <InfoComponentStepper heading="Basic Details" message="Some basic details about your business..." iconTitle="Initial Details" /> */}

                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className={`${inputContainerStyle}`}>

                                <label className={`${inputLabelStyle} text-xs`}>
                                    <small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Application type
                                </label>

                                <input type="hidden" name="oldLicenseId" className={`${commonInputStyle} cursor-pointer `} value={formik.values.oldLicenseId} readOnly />

                                <input type="hidden" name="applicationType" className={`${commonInputStyle} cursor-pointer `} value={formik.values.applicationType} readOnly />
                                <div className="border px-4 py-1.5 bg-gray-400 rounded-lg"></div>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle} text-xs`}>
                                    <small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>License No.
                                </label>
                                {/* <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal">
                                        <small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>License No.</label> */}
                                <input name="licenseNo" type="hidden" value={formik.values.licenseNo} className={`read-only:bg-gray-100  ${commonInputStyle}`} readOnly />
                                <div className="border px-4 py-1.5 bg-gray-400 rounded-lg"> </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle} text-xs`}><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small> Firm Type </label>

                                <select name="firmType" id="firmType" className={`${commonInputStyle} cursor-pointer text-xs`} onChange={formik.handleChange} value={formik.values.firmType}>
                                    <option value="">SELECT</option>

                                 
                                </select>
                                <p className='text-xs text-red-500'>
                                    {formik.touched.firmType && formik.errors.firmType ? formik.errors.firmType : null}
                                </p>
                                {/* <input type="hidden" name="firmType" className={`${commonInputStyle} cursor-pointer text-xs`} value={formik.values.firmType} /> */}
                                {/* <div className="border px-4 py-1.5 bg-white rounded-lg">{licenseData?.licenceDtl.firm_type}</div> */}

                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle} text-xs`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Premises Ownership Type</label>
                                <select name="ownershipType" id="ownershipType" className={`${commonInputStyle} cursor-pointer text-xs`} onChange={formik.handleChange} value={formik.values.ownershipType}>
                                    <option value="">SELECT</option>

                                   
                                </select>
                                <p className='text-xs text-red-500'>
                                    {formik.touched.ownershipType && formik.errors.ownershipType ? formik.errors.ownershipType : null}
                                </p>

                                {/* <input type="hidden" name="ownershipType" className={`${commonInputStyle} cursor-pointer text-xs`} value={formik.values.ownershipType} readOnly />
                                <div className="border px-4 py-1.5 bg-gray-400 rounded-lg">{licenseData?.licenceDtl.ownership_type_id}</div> */}

                            </div>
                            <div className="col-span-4 grid grid-cols-2">
                                <div className='md:px-10'>
                                </div>
                                <div className='md:px-10 text-right '>
                                    <button type="submit" className="float-left ml-16 mb-8 mt-4 px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>

                        </div>
                    </>

                </form>

            </div>

        </>
    )
}

export default InitialBusinessDetails