//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropOwnerDetails
// DESCRIPTION - COMPONENT-4 CitizenPropOwnerDetails Component
//               SENDING DATA TO CITIZENPROPSAFAPPLICATIONFORMINDEX
//                  # - List of owners in array []
//                  1 - ownerName
//                  2 - gender
//                  3 - dob
//                  4 - guardianName
//                  5 - relation
//                  6 - mobileNo
//                  7 - aadhar
//                  8 - pan
//                  9 - email
//                  10 - isArmedForce
//                  11 - isSpeciallyAbled
//               
//////////////////{*****}//////////////////////////////////////////


import { useContext, useState, useEffect, useRef } from 'react'
import { MdTag } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowCharacterNumberInput, allowCharacterSpaceCommaInput, allowMailInput, allowNumberInput, getCurrentDate } from '../../../Components/Common/PowerUps/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import { contextVar } from '@/Components/Context/Context'
import CommonModal from '@/Components/GlobalData/CommonModal'

function BasicEditOwnerDetails(props) {
    const [ownerList, setOwnerList] = useState([])
    const [ownerPreviewList, setownerPreviewList] = useState([])
    const [ownerPreviewForm, setownerPreviewForm] = useState()
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState(null) //to carry the index to edit if edistatus is true
    const [AddOwnerForm, setAddOwnerForm] = useState('-translate-y-full -top-[800px]') //to hide and show ownerform with animation
    const [ownerFormStatus, setownerFormStatus] = useState(false)
    const [restrictSpeciallyAbled, setrestrictSpeciallyAbled] = useState(false)
    const [firstOwnerFixed, setfirstOwnerFixed] = useState(false) //to hide and show ownerform with animation
    const { notify } = useContext(contextVar)
    const [previousOwnerArrayLength, setpreviousOwnerArrayLength] = useState(0) //to carry the index to e

    const genderRef = useRef(null);
    const relationRef = useRef(null);
    const armedRef = useRef(null);
    const speciallyAbledRef = useRef(null);

    const validationSchema = yup.object({
        ownerName: yup.string().required('Enter owner name').max(50, 'Enter maximum 50 characters'),
        guardianName: yup.string().required('Enter guardian name'),
        relation: yup.string().required('Select relation'),
        mobileNo: yup.string().required('Enter mobile no.').min(10, 'Enter 10 digit mobilen no'),
        aadhar: yup.string().required('Enter aadhar no').min(12, 'Enter 12 digit aadhar no.'),
        pan: yup.string().required('Enter PAN no.').min(10, 'enter 10 digit PAN no.'),
        email: yup.string().required('Enter email address').min(11, 'enter atleast 11 character'),
    })
    const formik = useFormik({
        initialValues: {
            ownerName: '',
            guardianName: '',
            relation: '',
            mobileNo: '',
            aadhar: '',
            pan: '',
            email: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('at form save.... owner')
            if (editStatus) {
                editOwnerList(values)
                setEditStatus(false)
                setEditIndex(null) //extra 2
                resetForm()
                return
            }

            console.log('at form save.... owner 2', ownerList)


            let tempOwnerList = [...ownerList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setOwnerList([...ownerList, values])

            //* Adding ownerpreviewlist to preview data
            // let tempOwnerPreviewList = [...ownerPreviewList, ownerPreviewForm] //taking copy of array adding latest values since setstate does not update immediatly
            let newPreviewOwner = setPreviewData() //taking copy of array adding latest values since setstate does not update immediatly
            console.log('at form save.... owner 3')

            setownerPreviewList([...ownerPreviewList, newPreviewOwner])
            props?.setownerDetails([...ownerList, values])
            props?.setownerDetailsPreview([...ownerPreviewList, newPreviewOwner])
            console.log('at form save.... owner 5')

            // props.collectFormDataFun('ownerDetails', tempOwnerList, [...ownerPreviewList, newPreviewOwner]) //sending OwnerDetails data to parent to store all form data at one container
            // resetForm()
            toggleForm()


        }
        , validationSchema
    })

    // INITIALLY CALLING DYNAMIC HOOK TO CREATE CONDITIONALLY STATES AND RETURN STATE VARIABLE AND FUNCTION WHICH WILL UPDATE STATES FOR NEXT TIME
    const [inputConditionState, setinputConditionState] = useState();

    useEffect(() => {
        feedPropertyData()
    }, [props?.existingPropertyDetails])

    const feedPropertyData = () => {
        console.log('inside feed owner dat..')
        setpreviousOwnerArrayLength(props?.ownerDetails?.length)
        //* making matching floor key to ajust in existing code since key coming is different
        if (props?.ownerDetails?.length != 0) {
            console.log('inside lenght >0..')

            // props.collectFormDataFun('ownerDetails', props?.ownerDetails, props?.ownerDetailsPreview) //sending OwnerDetails data to parent to store all form data at one container
            setOwnerList(props?.ownerDetails)
            setownerPreviewList(props?.ownerDetailsPreview)
        }
    }

    console.log('owner list by ownerlist........', props?.ownerDetails)

    const editOwnerList = () => {
        console.log('at edit owner ist...', formik.values)
        let tempOwnerlist = [...ownerList]  //*copying the array
        console.log('inside edit function edit owner list....', ownerList)
        // tempOwnerlist[editIndex] = formik.values  //*updating value of editindex

        let tempOwnerPreviewList = [...ownerPreviewList]  //*copying the preview array

        // PREVIEW DETAILS UPDATE
        tempOwnerPreviewList[editIndex].ownerName = formik.values.ownerName
        tempOwnerPreviewList[editIndex].guardianName = formik.values.guardianName
        tempOwnerPreviewList[editIndex].relation = relationRef.current.options[relationRef.current.selectedIndex].innerHTML
        tempOwnerPreviewList[editIndex].mobileNo = formik.values.mobileNo
        tempOwnerPreviewList[editIndex].aadhar = formik.values.aadhar
        tempOwnerPreviewList[editIndex].pan = formik.values.pan
        tempOwnerPreviewList[editIndex].email = formik.values.email

        tempOwnerlist[editIndex].ownerName = formik.values.ownerName
        tempOwnerlist[editIndex].guardianName = formik.values.guardianName
        tempOwnerlist[editIndex].relation = formik.values.relation
        tempOwnerlist[editIndex].mobileNo = formik.values.mobileNo
        tempOwnerlist[editIndex].aadhar = formik.values.aadhar
        tempOwnerlist[editIndex].pan = formik.values.pan
        tempOwnerlist[editIndex].email = formik.values.email

        console.log('temp owner list inside edit fucntion', tempOwnerlist)
        setOwnerList(tempOwnerlist) //*setting value in origin ownlist array
        setownerPreviewList(tempOwnerPreviewList) //resetting the preview array
        props?.setownerDetails(tempOwnerlist)
        props?.setownerDetailsPreview(tempOwnerPreviewList)


        setEditStatus(false) //*seting edit status false after successfull edit
        setEditIndex(null)
        toggleForm()
        console.log('at edit form...')
    }

    const setPreviewData = () => {

        let newPreviewOwner = {
            ownerName: formik.values.ownerName,
            gender: genderRef.current.options[genderRef.current.selectedIndex].innerHTML,
            dob: formik.values.dob,
            guardianName: formik.values.guardianName,
            relation: relationRef.current.options[relationRef.current.selectedIndex].innerHTML,
            mobileNo: formik.values.mobileNo,
            aadhar: formik.values.aadhar,
            pan: formik.values.pan,
            email: formik.values.email,
            isArmedForce: armedRef.current.options[armedRef.current.selectedIndex].innerHTML,
            isSpeciallyAbled: speciallyAbledRef.current.options[speciallyAbledRef.current.selectedIndex].innerHTML
        }
        // PREVIEW DETAILS UPDATE

        return newPreviewOwner
    }

    const toggleForm = () => {
        setownerFormStatus(!ownerFormStatus)
    }

    //funtion to remove owner from ownerlist via index
    const removeOwner = (index) => {
        setOwnerList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );

        //removing owner for preview data
        setownerPreviewList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );

    }


    console.log('owner list to check id.....', ownerList)
    console.log('ownerdetails to check id.....', props?.ownerDetails)

    //function to edit owner from owner list via index
    const editOwner = (index) => {
        setEditStatus(true)
        setEditIndex(index)
        let tempOwnerlist = [...ownerList]
        formik.resetForm()

        formik.initialValues.ownerName = tempOwnerlist[index].ownerName
        formik.initialValues.gender = tempOwnerlist[index].gender
        formik.initialValues.dob = tempOwnerlist[index].dob
        formik.initialValues.guardianName = tempOwnerlist[index].guardianName
        formik.initialValues.relation = tempOwnerlist[index].relation
        formik.initialValues.mobileNo = tempOwnerlist[index].mobileNo
        formik.initialValues.aadhar = tempOwnerlist[index].aadhar
        formik.initialValues.pan = tempOwnerlist[index].pan
        formik.initialValues.email = tempOwnerlist[index].email
        formik.initialValues.isArmedForce = tempOwnerlist[index].isArmedForce
        formik.initialValues.isSpeciallyAbled = tempOwnerlist[index].isSpeciallyAbled

        toggleForm()
    }

    const checkMinimumOwner = () => {
        console.log('inside minimum check....')
        if (ownerList.length === 0) {
            notify('Add minimum one owner', 'error')
        } else {
            if (ownerList.length > props?.oldownerDetailsPreview?.length) {
                props.nextFun(4)
            } else {
                notify('Add minimum one owner', 'error')

            }
        }
    }
    console.log('owner list preview...', ownerList?.length, 'owner old owner list...', props?.oldownerDetailsPreview?.length)
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        //input restrict validation
        { name == 'ownerName' && formik.setFieldValue("ownerName", allowCharacterSpaceCommaInput(value, formik.values.ownerName, 100)) }
        { name == 'guardianName' && formik.setFieldValue("guardianName", allowCharacterSpaceCommaInput(value, formik.values.guardianName, 100)) }
        { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
        { name == 'aadhar' && formik.setFieldValue("aadhar", allowNumberInput(value, formik.values.aadhar, 12)) }
        { name == 'pan' && formik.setFieldValue("pan", allowCharacterNumberInput(value, formik.values.pan, 10)) }
        { name == 'email' && formik.setFieldValue("email", allowMailInput(value, formik.values.email, 100)) }

        //* Collecting owner details to preview
        if (e.target.type == 'select-one') {
            setownerPreviewForm({ ...ownerPreviewForm, [name]: e.target[e.target.selectedIndex].text })
        } else {
            setownerPreviewForm({ ...ownerPreviewForm, [name]: value })
        }
    }
    return (
        <>
            <div className="flex md:pr-6 mt-6 mb-4">
                <div class="w-full">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="flex-1">
                            <div >
                                <div class="text-lg font-bold text-gray-700 leading-tight">Owner details</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className={`p-4 w-full md:py-4 md:px-0 md:pb-0 md:pt-0  md:w-full mx-auto overflow-x-auto`}>
                    {ownerPreviewList?.length != 0 &&
                        <>
                            <table className='min-w-full leading-normal mt-2'>
                                <thead className='font-bold text-left text-sm bg-sky-50'>
                                    <tr>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">#</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Owner</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Guardian</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Relation</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">mobile No.</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Aadhar No.</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">PAN No.</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Email</th>
                                        <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {
                                        ownerPreviewList?.map((data, index) => (
                                            <>
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.ownerName}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.guardianName}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.relation}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.mobileNo}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{(data?.aadhar == '' || data?.aadhar == null) ? 'N/A' : data?.aadhar}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{(data?.pan == '' || data?.pan == null) ? 'N/A' : data?.pan}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{(data?.email == '' || data?.email == null) ? 'N/A' : data?.email}</td>
                                                    <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editOwner(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' />
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>}
                </div>

                {ownerFormStatus &&
                    <>
                        <CommonModal>
                            <div className={`transition-all block w-full mt-20  md:w-full mx-auto  z-50 `}>

                                <form onSubmit={formik.handleSubmit} onChange={handleChange} className="" >
                                    <div className="grid grid-cols-12 pt-10">
                                        <div className={`md:col-start-4 col-span-12 md:col-span-6 grid grid-cols-12 bg-white relative p-10 shadow-xl`}>
                                            {/* <div className='col-span-12 absolute -top-7 left-0 font-semibold text-xl'><MdTag className="inline" />{editStatus ? 'Update Owner Form' : 'Add Owner Form'}</div> */}
                                            <button type='button' onClick={() => {
                                                setEditIndex(null)
                                                setEditStatus(false)
                                                toggleForm()
                                            }}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold ">Owner Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small> </label>
                                                {/* // IF EDITINDEX IS 0 THEN DISABLE OWNER INPUT TO RESTRICT OWNER NAME CHANGE AS THIS IS FIRST OWNER */}
                                                {/* // FOR NEW EDIT CASE CHECK IF OWNERLENGHT IS ZERO THEN RESTRICT, OR OTHER CASE CHECK EDITINDEX IS ZERO OR NOT */}
                                                <input disabled={inputConditionState?.ownerName?.readOnly}  {...formik.getFieldProps('ownerName')} type="text" className={`cypress_owner_name form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.ownerName?.style}`}
                                                    aria-describedby="emailHelp" placeholder="Enter owner name" />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.ownerName && formik.errors.ownerName ? formik.errors.ownerName : null}</span>
                                            </div>

                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Guardian Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={inputConditionState?.guardianName?.readOnly} {...formik.getFieldProps('guardianName')} type="text" className={`cypress_guardian_name form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.guardianName?.style}`}
                                                    placeholder="Enter guardian name" />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.guardianName && formik.errors.guardianName ? formik.errors.guardianName : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Relation<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <select disabled={inputConditionState?.relation?.readOnly} ref={relationRef} {...formik.getFieldProps('relation')} className={`cypress_relation form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md ${inputConditionState?.relation?.style}`} >
                                                    <option value="" >Select</option>
                                                    <option value="S/O">S/O</option>
                                                    <option value="D/O">D/O</option>
                                                    <option value="W/O">W/O</option>
                                                    <option value="C/O">C/O</option>

                                                </select>
                                                <span className="text-red-600 absolute text-xs">{formik.touched.relation && formik.errors.relation ? formik.errors.relation : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Mobile No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={inputConditionState?.mobileNo?.readOnly} {...formik.getFieldProps('mobileNo')} type="text" className={`cypress_mobile form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.mobileNo?.style}`} placeholder='Enter mobileNo no' />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Aadhar No<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={inputConditionState?.aadhar?.readOnly} {...formik.getFieldProps('aadhar')} type="text" className={`cypress_aadhar form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.aadhar?.style}`}
                                                    placeholder="Enter aadhar no." />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.aadhar && formik.errors.aadhar ? formik.errors.aadhar : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">PAN No.<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={inputConditionState?.pan?.readOnly} {...formik.getFieldProps('pan')} type="text" className={`cypress_pan form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.pan?.style}`}
                                                    placeholder="Enter pan no." />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.pan && formik.errors.pan ? formik.errors.pan : null}</span>
                                            </div>
                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Email<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                                <input disabled={inputConditionState?.email?.readOnly}  {...formik.getFieldProps('email')} type="email" className={`cypress_email form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md ${inputConditionState?.email?.style}`}
                                                    placeholder="Enter email." />
                                                <span className="text-red-600 absolute text-xs">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
                                            </div>


                                            <div className="form-group col-span-12 mb-2 md:px-4">
                                                <span className=''>   <span className='text-black text-sm'>Note : </span> <span className='text-gray-500 text-sm'> In case of armed force or specially abled, you will need to upload related documents.</span></span>
                                            </div>
                                            <div className=" col-span-12 text-center mt-10">
                                                <button type="submit" className="cypress_owner_add_update px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">Update Owner</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </CommonModal>
                    </>
                }

                <div className="col-span-12 grid grid-cols-12 mt-10">

                    <div className=' text-right col-span-6'>
                        <button onClick={() => props?.setleveFormSubmitCount(1)} className="cypress_next6_button px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm leading-tight  rounded shadow-xl hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                    </div>
                </div>



            </div>
        </>
    )
}

export default BasicEditOwnerDetails