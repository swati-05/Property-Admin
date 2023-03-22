//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropElectricityWaterDetails
// DESCRIPTION - COMPONENT-3 CitizenPropElectricityWaterDetails Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  1 - elecToggleCheckbox
//                  2 - electricityKNo
//                  3 - accNo
//                  4 - bindBookNo
//                  5 - electrictyConsumerNo
//                  6 - bpApprovalNo
//                  7 - bpApprovalDate
//                  8 - waterConsumerNo
//                  9 - waterConsumerNo
//                  10 - waterConnectionDate
//                 
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from 'react'
import { MdTag } from 'react-icons/md'
import { GiWaterTank } from 'react-icons/gi'
import { BsLightningChargeFill } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterNumberInput, getCurrentDate } from '../../../Components/Common/PowerUps/PowerupFunctions'

function CitizenPropElectricityWaterDetails(props) {

    const [formHide, setFormHide] = useState(false)
    const validationSchema = yup.object({
        elecToggleCheckbox: yup.boolean(),
        electricityKNo: yup.string(),
        accNo: yup.string(),
        bindBookNo: yup.string(),
        electrictyConsumerNo: yup.string(),
        bpApprovalNo: yup.string(),
        bpApprovalDate: yup.string(),
        waterConsumerNo: yup.string(),
        waterConnectionDate: yup.string(),

    })
    const formik = useFormik({
        initialValues: {
            elecToggleCheckbox: false,
            electricityKNo: '',
            accNo: '',
            bindBookNo: '',
            electrictyConsumerNo: '',
            bpApprovalNo: '',
            bpApprovalDate: '',
            waterConsumerNo: '',
            waterConnectionDate: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('electricity ', values)
            props?.setelecWaterDetails(values)
            // props.collectFormDataFun('electricityWaterDetails', values)
            //>forwarding to next form level
            props.nextFun(3)
        }
        , validationSchema
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name == 'electricityKNo' && formik.setFieldValue("electricityKNo", allowCharacterNumberInput(value, formik.values.electricityKNo, 100)) }
        { name == 'accNo' && formik.setFieldValue("accNo", allowCharacterNumberInput(value, formik.values.accNo, 100)) }
        { name == 'bindBookNo' && formik.setFieldValue("bindBookNo", allowCharacterNumberInput(value, formik.values.bindBookNo, 100)) }
        { name == 'bpApprovalNo' && formik.setFieldValue("bpApprovalNo", allowCharacterNumberInput(value, formik.values.bpApprovalNo, 100)) }
        { name == 'waterConsumerNo' && formik.setFieldValue("waterConsumerNo", allowCharacterNumberInput(value, formik.values.waterConsumerNo, 100)) }

        { name == 'elecToggleCheckbox' && setFormHide(e.target.checked) }
        if (name == 'elecToggleCheckbox' && !e.target.checked) {
            formik.setFieldValue('electricityKNo', '')
            formik.setFieldValue('accNo', '')
            formik.setFieldValue('bindBookNo', '')
            formik.setFieldValue('electrictyConsumerNo', '')
        }
    }

    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    const feedPropertyData = () => {
        console.log('inside elec detials...', props?.elecWaterDetails)
        formik.setFieldValue('electricityKNo', props?.elecWaterDetails?.electricityKNo)
        formik.setFieldValue('accNo', props?.elecWaterDetails?.accNo)
        formik.setFieldValue('bindBookNo', props?.elecWaterDetails?.bindBookNo)
        formik.setFieldValue('electrictyConsumerNo', props?.elecWaterDetails?.electrictyConsumerNo)
        formik.setFieldValue('bpApprovalNo', props?.elecWaterDetails?.bpApprovalNo)
        formik.setFieldValue('bpApprovalDate', props?.elecWaterDetails?.bpApprovalDate)
        formik.setFieldValue('waterConsumerNo', props?.elecWaterDetails?.waterConsumerNo)
        formik.setFieldValue('waterConnectionDate', props?.elecWaterDetails?.waterConnectionDate)

        // console.log('auto feed data.....elec...', formik.values)
        // props.collectFormDataFun('electricityWaterDetails', formik.values)

    }
    return (
        <>
            {/* <h1 className='mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Electricity & Water Details</h1> */}
            <div className="block md:p-4 w-full md:py-6  mx-auto  shadow-xl bg-white">
                {/* <div className='relative col-span-12 -top-14 -left-4 md:col-span-6 md:col-start-4  rounded-lg  font-semibold text-xl'><MdTag className="inline" />Electricity & Water Details</div> */}
                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12  px-10">


                            <div className="form-group col-span-12 form-check mb-2 md:px-4 flex items-center">
                                <input {...formik.getFieldProps('elecToggleCheckbox')} type="checkbox"
                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer" />
                                <label className="form-check-label text-gray-800 ml-2" > <span className='inline text-red-400 text-sm font-semibold'>Note : </span><small className="mt-1 text-sm text-red-300 inline ">In case, there is no Electric Connection. You have to upload Affidavit Form-I. (Please Tick)</small></label>
                            </div>
                            {!formHide && <div className={`col-span-12 grid grid-cols-12  `}>
                                <div className="form-group col-span-3 mb-2 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Electricity K. No</label>
                                    <input {...formik.getFieldProps('electricityKNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter Electricity K. No" />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.electricityKNo && formik.errors.electricityKNo ? formik.errors.electricityKNo : null}</span>
                                </div>
                                <div className="col-span-12 text-red-400 font-semibold pl-28 font-mono text-lg mb-0 mt-0">or</div>
                                <div className="form-group mb-6 col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">ACC No.</label>
                                    <input {...formik.getFieldProps('accNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter ACC No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.accNo && formik.errors.accNo ? formik.errors.accNo : null}</span>
                                </div>
                                <div className="form-group mb-6 col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">BIND/BOOK No.</label>
                                    <input {...formik.getFieldProps('bindBookNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter BIND/BOOK No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.bindBookNo && formik.errors.bindBookNo ? formik.errors.bindBookNo : null}</span>
                                </div>
                                <div className="form-group mb-6 col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Electricity Consumer Category</label>
                                    <select {...formik.getFieldProps('electrictyConsumerNo')} className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    >
                                        <option value="" >Select</option>
                                        <option value="DS I/II/III">DS I/II/III</option>
                                        <option value="NDS II/III">NDS II/III</option>
                                        <option value="IS I/II">IS I/II</option>
                                        <option value="LTS">LTS</option>
                                        <option value="HTS">HTS</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.electrictyConsumerNo && formik.errors.electrictyConsumerNo ? formik.errors.electrictyConsumerNo : null}</span>
                                </div>
                            </div>}
                            <div className="col-span-4 mt-4 "><hr /></div>
                            <div className="col-span-4 px-4 text-sm font-serif mt-4 mb-4 font-semibold"><GiWaterTank className="inline" />Buidling Details</div>
                            <div className='col-span-12 grid grid-cols-12'>
                                <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Building Plan Approval No.</label>
                                    <input {...formik.getFieldProps('bpApprovalNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Enter Building Plan Approval No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.bpApprovalNo && formik.errors.bpApprovalNo ? formik.errors.bpApprovalNo : null}</span>
                                </div>
                                <div className="form-group mb-6 col-span-12 md:col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Building Plan Approval Date</label>
                                    <input {...formik.getFieldProps('bpApprovalDate')} type="date" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.bpApprovalDate && formik.errors.bpApprovalDate ? formik.errors.bpApprovalDate : null}</span>
                                </div>
                            </div>
                            <div className="col-span-4 mt-4"><hr /></div>
                            <div className="col-span-4 px-4 text-sm font-serif mt-4 font-semibold"><GiWaterTank className="inline" />Water Details</div>
                            <div className="col-span-12 grid grid-cols-12">
                                <div className="form-group mb-6 col-span-4 md:col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Water Consumer No.</label>
                                    <input {...formik.getFieldProps('waterConsumerNo')} type="text" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        placeholder="Water Consumer No." />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.waterConsumerNo && formik.errors.waterConsumerNo ? formik.errors.waterConsumerNo : null}</span>
                                </div>
                                <div className="form-group mb-6 col-span-4 md:col-span-3 md:px-4">
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Water Connection Date</label>
                                    <input {...formik.getFieldProps('waterConnectionDate')} type="date" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.waterConnectionDate && formik.errors.waterConnectionDate ? formik.errors.waterConnectionDate : null}</span>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-2">
                                <div className='md:px-10'>
                                    <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-zinc-600 hover:bg-zinc-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                                </div>
                                <div className='md:px-10 text-right'>
                                    <button type='submit' className="cypress_next3_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                                </div>
                            </div>
                            <div className='w-full h-20'></div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CitizenPropElectricityWaterDetails