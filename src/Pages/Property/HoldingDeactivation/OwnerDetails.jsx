
//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 19 july 2022
//    Updated On - 13/Aug/2022 - API Integrated
//    Revision - 1
//    Project - JUIDCO
//    Component  - Trade (closed)
//    DESCRIPTION - New application (OwnerDetails) Component
//////////////////////////////////////////////////////////////////////////////////////


import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
// import { getCurrentDate, allowFloatInput } from '@/Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '../../../Pages/Trade/tradeComponent/CommonStyles'
import DifferenceIcon from '@mui/icons-material/Difference';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

function OwnerDetails(props) {

    const { applicationType, colorCode, currentStep, currentStepFun, collectFormDataFun, firmStepFun, firmStep, colorCodeFun, showLoader } = props.values;
    // const { ownerDtl } = props.values.licenseData?.ownerDtl;
    // console.log("owner dtl", props.values.licenseData.ownerDtl);
    // console.log('firm step is :', firmStep);
    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [formToggleStatus, setformToggleStatus] = useState(true)
    const [ownerDataVisibility, setownerDataVisibility] = useState(false)
    const [AddMore, setAddMore] = useState(false);
    const [MultipleOwnerDetails, setMultipleOwnerDetails] = useState([])






    const validationSchema = yup.object({
        businessOwnerName: yup.string().required('This field is required !'),
        guardianName: yup.string().required('This field is required !'),
        mobileNo: yup.string().length(10).required('This field is required !'),
        email: yup.string().required('This field is required !'),

    });




    const initialValues = {
        businessOwnerName: '',
        guardianName: '',
        mobileNo: '',
        email: '',
        natureOfBusiness: '',
    };

    const formik = useFormik(
        {
            initialValues: initialValues,
            onSubmit: (values, resetForm) => {
                alert(values);

            }
            , validationSchema
        });

    const handleMultipleSubmit = () => {

        showLoader(true);
        // console.log('Final submission of the form ', ownerDetails)

        collectFormDataFun('ownerDetails', MultipleOwnerDetails, 0) //sending BasicDetails data to parent to store all form data at one container

        setTimeout(() => {
            firmStepFun(4) //forwarding to next form level
            currentStepFun(4)
            colorCodeFun(3)

            showLoader(false);
        }, 500)

    }

    const handleBack = () => {
        firmStepFun(2)
    }


    const handleOnChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name === 'applyWith' && (value === '1' ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }

    };

    const handleOwnerShow = () => {
        alert(formToggleStatus);
        { formToggleStatus == false ? setformToggleStatus(true) : setformToggleStatus(false) }
    }

    return (
        <>
            <div className={`absolute w-full`} >
                <div className='w-full text-center'>
                    {/* <button type='submit' className={`${AddMore ? '' : 'hidden'}  bg-green-600 px-4 py-2 rounded-lg`} onClick={handleOwnerShow}> Add More Owners <DifferenceIcon /> </button> */}
                </div>
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit} >

                    {/* <div className='block'>
                        <div className={`${formToggleStatus ? '' : 'hidden'}`}>
                            <div className="grid grid-cols-3 w-full md:grid-cols-3 gap-2">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle} text-xs`}><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Owner Name *</label>
                                    <input type="text" name="businessOwnerName" className={`${commonInputStyle} cursor-pointer `} placeholder="Ex: John Doe" value={formik.values.businessOwnerName} onChange={formik.handleChange} />

                                    <span className={`${inputErrorStyle}`}>
                                        {formik.touched.businessOwnerName && formik.errors.businessOwnerName ? formik.errors.businessOwnerName : null}
                                    </span>

                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle} text-xs`}><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small> Guardian Name</label>
                                    <input type="text" name="guardianName" className={`${commonInputStyle} cursor-pointer `} value={formik.values.guardianName} onChange={formik.handleChange} />

                                    <span className={`${inputErrorStyle}`}>
                                        {formik.touched.guardianName && formik.errors.guardianName ? formik.errors.guardianName : null}
                                    </span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle} text-xs`}><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Mobile No.</label>
                                    <input type="number" name="mobileNo" className={`${commonInputStyle} cursor-pointer `} value={formik.values.mobileNo} onChange={formik.handleChange} />

                                    <span className={`${inputErrorStyle}`}>
                                        {formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-3 gap-1">
                                <div className={`${inputContainerStyle}`}>
                                    <label className={`${inputLabelStyle} text-xs`}><small className=" mt-1 text-sm font-semibold text-red-600 inline ">*</small>Email.</label>
                                    <input type="email" name="email" className={`${commonInputStyle} cursor-pointer `} value={formik.values.email} onChange={formik.handleChange} />

                                    <span className={`${inputErrorStyle}`}>
                                        {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                    </span>
                                </div>


                                <div className='p-4'>
                                    <button type="submit" onClick={() => setAddMore(true)} className=" mt-4 px-10 py-1.5  bg-indigo-600 text-white font-bold text-xs leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:bg-indigo-700 focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-700 active:text-white active:shadow-lg transition duration-150 ease-in-out">Confirm this owner<GroupAddIcon />  </button>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <table className='table-auto w-full text-center my-8 mr-4'>
                        <thead>
                            <tr className='bg-slate-100 text-gray-600 text-xs h-8 hover:bg-amber-200 uppercase'>
                                <th> Owner Name</th>
                                <th> Guardian Name</th>
                                <th> Mobile</th>
                                <th> Email</th>
                                <th> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {props.values.licenseData?.ownerDtl.map((item) => (
                                <tr className='border-t-2 hover:bg-slate-50 text-sm hover:shadow-lg text-center'>
                                    <td>
                                        <input type="text" name="businessOwnerName[]" value={item.owner_name} className={`${commonInputStyle} bg-gray-200 cursor-pointer `} readOnly />
                                    </td>
                                    <td>

                                        <input type="text" name="guardianName[]" value={item.guardianName} className={`${commonInputStyle} bg-gray-200 cursor-pointer `} readOnly />
                                    </td>
                                 
                                    <td>

                                        <input type="text" name="mobileNo[]" value={item.mobile} className={`${commonInputStyle} bg-gray-200 cursor-pointer `} readOnly />
                                    </td>
                                    <td>

                                        <input type="text" name="email[]" value={item.emailid} className={`${commonInputStyle} bg-gray-200 cursor-pointer `} readOnly />
                                    </td>
                                    <td className='bg-gray-200'>
                                        <span>...</span>

                                    </td>
                                </tr>
                            ))}

                            {MultipleOwnerDetails?.map((items, index) => (
                                <tr className='border-t-2 hover:bg-slate-50 text-sm hover:shadow-lg text-center  my-2'>
                                    <td>
                                        <input type="text" name="businessOwnerName[]" value={items.businessOwnerName} className={`${commonInputStyle} cursor-pointer  my-2`} readOnly />
                                    </td>
                                    <td>

                                        <input type="text" name="guardianName[]" value={items.guardianName} className={`${commonInputStyle} cursor-pointer `} readOnly />
                                    </td>
                               
                                    <td>

                                        <input type="text" name="mobileNo[]" value={items.mobileNo} className={`${commonInputStyle} cursor-pointer `} readOnly />
                                    </td>
                                    <td>

                                        <input type="text" name="email[]" value={items.email} className={`${commonInputStyle} cursor-pointer `} readOnly />
                                    </td>
                                    <td>
                                        <button type='button' className='text-red-400' onClick={() => handleRemove(index)}>
                                            <DeleteIcon color="secondary" />
                                        </button>
                                    </td>
                                </tr>
                            ))} */}

                        </tbody>
                    </table>




                    <div className="grid grid-cols-2">
                        <div className=' text-left'>
                            <button type="button" onClick={handleBack} className=" mt-4 px-12 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">&#60;&#60; Back </button>
                        </div>
                        <div className=' text-right'>
                            <button type='button' onClick={handleMultipleSubmit} className=" mb-8 mt-4 px-6 mr-8 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next&#62;&#62; </button>
                        </div>
                    </div>


                </form>


            </div>

        </>
    )
}

export default OwnerDetails