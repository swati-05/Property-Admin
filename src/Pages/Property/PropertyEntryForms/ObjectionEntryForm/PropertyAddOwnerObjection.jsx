//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - PropertyAddOwnerObjection
// >DESCRIPTION - PropertyAddOwnerObjection Component
//////////////////{*****}//////////////////////////////////////////

import { useContext, useState, useEffect } from 'react'
import { FaUserNurse } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'
import { allowCharacterNumberInput, allowCharacterSpaceCommaInput, allowMailInput, allowNumberInput, getCurrentDate } from '@/Components/Common/PowerUps/PowerupFunctions'
import { TiDelete } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'
import { contextVar } from '@/Components/Context/Context'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { toast } from 'react-toastify'
import apiLinks from '@/Components/ApiList/ObjectionRectificationApi'
import axios from 'axios'
import BarLoader from '@/Components/Common/BarLoader'
import { useParams } from 'react-router-dom'
import ApiHeader2 from '@/Components/ApiList/ApiHeader2'


function PropertyAddOwnerObjection(props) {
    const [ownerList, setOwnerList] = useState([])
    const [ownerPreviewList, setownerPreviewList] = useState([])
    const [ownerPreviewForm, setownerPreviewForm] = useState({ isArmedForce: '0', isSpeciallyAbled: '0' })
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddOwnerForm, setAddOwnerForm] = useState('hidden') //to hide and show ownerform with animation
    const [loader, setloader] = useState(false)
    const [docCode, setdocCode] = useState(null)
    const [document, setdocument] = useState(null)
    const [nameDocList, setnameDocList] = useState()

    const { notify } = useContext(contextVar)

    const {clerical_add_member, getClericalDocCode} = apiLinks()

    console.log('current date at owner ', getCurrentDate())

        useEffect(() => {
        axios.post(getClericalDocCode, { doc: 'addOwner' }, ApiHeader())
      .then((res) => {
        console.log(`getting doc code of addOwner => `, res)
          setnameDocList(res?.data?.data?.masters)
      })
      .catch((err) => console.log(`getting doc code of addOwner error => `, err))
    },[])

    const validationSchema = yup.object({
        ownerName: yup.string().required('Enter owner name').max(50, 'Enter maximum 50 characters'),
        gender: yup.string().required('Select gender'),
        dob: yup.date().required('Select DOB'),
        guardianName: yup.string().required('Enter guardian name'),
        relation: yup.string().required('Select relation'),
        mobileNo: yup.string().required('Enter mobile no.').min(10, 'Enter 10 digit mobilen no'),
        aadhar: yup.string().required('Enter aadhar'),
        pan: yup.string().required('Enter pan'),
        email: yup.string().required('Enter email'),
        isArmedForce: yup.string().required('Select armed force status'),
        isSpeciallyAbled: yup.string().required('Select specially-abled status'),

    })
    const formik = useFormik({
        initialValues: {
            ownerName: '',
            gender: '',
            dob: getCurrentDate(),
            guardianName: '',
            relation: '',
            mobileNo: '',
            aadhar: '',
            pan: '',
            email: '',
            isArmedForce: '0',
            isSpeciallyAbled: '0'
        },

        onSubmit: (values, resetForm) => {
            toggleForm()

            if (editStatus) {
                editOwnerList(values)
                return
            }
            //check for duplicate entry for 1-mobileNo 2-aadhar 3-pan
            let duplicateStatus = checkDuplicateOwner(values)
            if (duplicateStatus) {
                return
            }

            let tempOwnerList = [...ownerList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setOwnerList([...ownerList, values])

            //* Adding ownerpreviewlist to preview data
            let tempOwnerPreviewList = [...ownerPreviewList, values] //taking copy of array adding latest values since setstate does not update immediatly
            setownerPreviewList([...ownerPreviewList, ownerPreviewForm])

            // collectFormDataFun('ownerDetails', tempOwnerList, tempOwnerPreviewList) //sending OwnerDetails data to parent to store all form data at one container
        }
        , validationSchema
    })

    const checkDuplicateOwner = (currentOwner) => {
        let duplicateStatus = false
        let message = ''
        console.log('at duplicate.....')
        ownerList.some((owner) => {
            // if (currentOwner.mobileNo == owner.mobileNo) {
            //     duplicateStatus = true
            //     message = 'Duplicate mobile no.'
            //     //  notify(message, 'error')
            //     return
            // }
            if (currentOwner.aadhar != '' && (currentOwner.aadhar == owner.aadhar)) {
                duplicateStatus = true
                message = 'Duplicate aadhar no.'
                // notify(message, 'error')
                return
            }
            if (currentOwner.pan != '' && (currentOwner.pan == owner.pan)) {
                duplicateStatus = true
                message = 'Duplicate PAN no.'
                // notify(message, 'error')
                return
            }

        })

        { duplicateStatus && notify(message, 'error') } //notify toast if duplicate true with message
        console.log('duplicate check....', duplicateStatus)

        return duplicateStatus
    }
    const editOwnerList = () => {
        let tempOwnerlist = [...ownerList]  //*copying the array
        tempOwnerlist[editIndex] = formik.values  //*updating value of editindex

        let tempOwnerPreviewList = [...ownerPreviewList]  //*copying the preview array
        tempOwnerPreviewList[editIndex] = ownerPreviewForm  //*updating value of preiview list

        console.log('ownerDetails', tempOwnerlist, tempOwnerPreviewList) //*sending OwnerDetails data to parent to store all form data at one container

        setOwnerList(tempOwnerlist) //*setting value in origin ownlist array
        setownerPreviewList(tempOwnerPreviewList) //resetting the preview array


        setEditStatus(false) //*seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        if (AddOwnerForm === 'translate-y-0 top-[200px]') {
            setAddOwnerForm('hidden')
        } else {
            setAddOwnerForm('translate-y-0 top-[200px]')
        }
        // (AddOwnerForm == 'translate-y-0 top-40' && setAddOwnerForm('-translate-y-full -top-80'))
        // (AddOwnerForm == '-translate-y-full -top-80' && setAddOwnerForm('translate-y-0 top-40'))
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


    console.log('owner list.....', ownerList)
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
        if (ownerList.length === 0) {
            toast.error('Add minimum one owner')
        } else {
            submitOwnerFun()
        }
    }

    console.log("gettting id => ", props?.id)

    const submitOwnerFun = () =>{

        if(docCode == null){
            toast.error('Select Document !!!')
            return
        }

        if(document == null){
            toast.error('Upload Document !!!')
            return
        }

        setloader(true)

        console.log("owner data => ", ownerPreviewList)

        // let requestBody ={
        //     propId : props?.id,
        //     ulbId : props?.ulbId,
        //     objectionFor : "Clerical Mistake",
        //     owners : ownerPreviewList
        // }

        let fd = new FormData()
        fd.append('propId', props?.id)
        fd.append('objectionFor', "Clerical Mistake")
        fd.append('docCode', docCode)
        fd.append('document', document)
        ownerList?.forEach((obj, index) => {
            fd.append(`owners[${index}][ownerName]`, obj?.ownerName);
            fd.append(`owners[${index}][gender]`, obj?.gender);
            fd.append(`owners[${index}][dob]`, obj?.dob);
            fd.append(`owners[${index}][guardianName]`, obj?.guardianName);
            fd.append(`owners[${index}][relation]`, obj?.relation);
            fd.append(`owners[${index}][mobileNo]`, obj?.mobileNo);
            fd.append(`owners[${index}][aadhar]`, obj?.aadhar);
            fd.append(`owners[${index}][pan]`, obj?.pan);
            fd.append(`owners[${index}][email]`, obj?.email);
            fd.append(`owners[${index}][isArmedForce]`, obj?.isArmedForce);
            fd.append(`owners[${index}][isSpeciallyAbled]`, obj?.isSpeciallyAbled);
          });

        // console.log("before fetch data => ", requestBody)

        axios.post(clerical_add_member, fd, ApiHeader2())
        .then((res) => {
            if(res?.data?.status == true ){
                console.log("successfully added", res)
            toast.success("Clerical Objection Applied Successfully")
            props.submit(res?.data?.data)
            } else{
                setloader(false)
            }

            if(res?.data?.status == false ){
                console.log("error add owner => ", res)
                toast.error("Something went wrong !!")
            } else{
                setloader(false)
            }
        })
        .catch((err) => {
            setloader(false)
        })
    }


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

    console.log('owner preview list...', ownerPreviewList)

    const handleDocument = (e) => {
        const name = e.target.name
        const value = e.target.value

        {name == 'docCode' && setdocCode(value)}
        
        if(name == 'document'){
            let file = e.target.files[0];
            setdocument(e.target.files[0]);
            console.log("--1-- document on change..", file);
        }
    }

    let commonInputStyle = `form-control w-full px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md w-full sm:w-max`;
    return (
        <>
        
        {loader && <BarLoader/>}

        {!loader && <div className="w-full sm:w-[70vw] h-[40vh]">

        <div className="shadow-md grid grid-cols-12 text-sm px-2 sm:px-6 py-2 mt-2 my-2 gap-y-2 font-base poppins bg-zinc-50 rounded-sm mb-2">
                        <div className="col-span-12 md:col-span-4 poppins 2xls:text-base md:text-sm text-xs">
                          Agreement Deed : 
                          <span className="font-semibold 2xls:text-base md:text-sm text-sm poppins">
                           
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-4 poppins  2xls:text-base md:text-sm text-xs">
                          <span className="poppins">Select Document :</span>{" "}
                          <br />
                          <span className='w-full'>
                            <select
                              name="docCode"
                              onChange={handleDocument}
                              className={
                                commonInputStyle +
                                ` poppins  2xls:text-base md:text-sm text-xs w-full`
                              }
                            >
                              <option value="" selected>
                                Select
                              </option>
                              {nameDocList?.map((elem) => (
                                <>
                                  <option
                                    value={elem?.documentCode}
                                    className="poppins"
                                  >
                                    {elem?.docVal}
                                  </option>
                                </>
                              ))}
                            </select>
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-4 poppins flex flex-col  2xls:text-base md:text-sm text-xs">
                          Upload Document : <br />
                          <span>
                            <input
                              type="file"
                              onChange={handleDocument}
                              className={commonInputStyle + ` poppins `}
                              accept=".pdf,.jpg,.jpeg"
                              name="document"
                              id=""
                            />
                          </span>
                        </div>
                      </div>

                <h1 className='block mb-2 font-serif font-semibold text-gray-600 2xl:text-base md:text-sm text-sm'><FaUserNurse className="inline mr-2" />Add SAF Owner </h1>

                <div className={`${AddOwnerForm} transition-all block px-4 w-full 2xl:py-6 rounded-lg shadow-lg  md:w-full absolute top-20 -left-2 bg-sky-100 z-50`}>
                    <button onClick={toggleForm}><TiDelete className='absolute top-2 right-2 text-red-500 text-3xl hover:scale-125' /></button>
                    <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="grid grid-cols-1 md:grid-cols-5">
                            <div className={`grid col-span-5 grid-cols-1 md:grid-cols-5`}>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold "><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>Owner Name</label>
                                    <input {...formik.getFieldProps('ownerName')} type="text" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        aria-describedby="emailHelp" placeholder="Enter owner name" />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.ownerName && formik.errors.ownerName ? formik.errors.ownerName : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>Gender</label>
                                    <select {...formik.getFieldProps('gender')} className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Other</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>DOB</label>
                                    <input {...formik.getFieldProps('dob')} type="date" className="block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.dob && formik.errors.dob ? formik.errors.dob : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold">Guardian Name</label>
                                    <input {...formik.getFieldProps('guardianName')} type="text" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter guardian name" />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.guardianName && formik.errors.guardianName ? formik.errors.guardianName : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold">Relation</label>
                                    <select {...formik.getFieldProps('relation')} className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value="" disabled selected>select relation</option>
                                        <option value="S/O">S/O</option>
                                        <option value="D/O">D/O</option>
                                        <option value="W/O">W/O</option>
                                        <option value="C/O">C/O</option>

                                    </select>
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.relation && formik.errors.relation ? formik.errors.relation : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>Mobile No.</label>
                                    <input {...formik.getFieldProps('mobileNo')} type="text" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" placeholder='Enter mobile no' />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.mobileNo && formik.errors.mobileNo ? formik.errors.mobileNo : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold">Aadhar No</label>
                                    <input {...formik.getFieldProps('aadhar')} type="text" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter aadhar no." />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.aadhar && formik.errors.aadhar ? formik.errors.aadhar : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold">PAN No.</label>
                                    <input {...formik.getFieldProps('pan')} type="text" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter pan no." />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.pan && formik.errors.pan ? formik.errors.pan : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold">email</label>
                                    <input {...formik.getFieldProps('email')} type="email" className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                        placeholder="Enter email." />
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>Is-Armed-Force</label>
                                    <select {...formik.getFieldProps('isArmedForce')} className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.isArmedForce && formik.errors.isArmedForce ? formik.errors.isArmedForce : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-2 md:px-4">
                                    <label className="form-label poppins inline-block mb-1 text-gray-600 2xl:text-sm text-xs font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline poppins">*</small>Is-Specially-Abled?</label>
                                    <select {...formik.getFieldProps('isSpeciallyAbled')} className="form-control poppins block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" >
                                        <option value=''>Select</option>
                                        <option value='0'>No</option>
                                        <option value='1'>Yes</option>
                                    </select>
                                    <span className="text-red-600 absolute text-xs poppins">{formik.touched.isSpeciallyAbled && formik.errors.isSpeciallyAbled ? formik.errors.isSpeciallyAbled : null}</span>
                                </div>
                                <div className=" flex justify-center items-end">
                                    <div className='md:px-10'>
                                        <button type="submit" className="poppins 2xl:px-6 px-3 2xl:py-2.5 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">{editStatus ? 'Update' : 'Add'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={`${AddOwnerForm == 'translate-y-0 top-[200px]' ? 'hidden' : 'block'}   p-4 mt-2  md:py-4 md:px-0 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto w-full overflow-x-scroll`}>

                    {ownerPreviewList?.length != 0 && <table className='w-full leading-normal mt-4 2xl:mt-0'>
                        <thead className='font-bold text-left text-sm bg-sky-50'>
                            <tr>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">#</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Owner</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Gender</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">DOB</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Guardian</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Relation</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">mobileNo</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Aadhar</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">PAN</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">email</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">IsArmed</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">IsSpecially</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left poppins text-xs capitalize text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {
                                ownerPreviewList?.map((data, index) => (
                                    <>
                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{index + 1}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.ownerName}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.gender}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.dob}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.guardianName}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.relation}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.mobileNo}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{(data.aadhar == '' || data.aadhar == null) ? 'N/A' : data.aadhar}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{(data.pan == '' || data.pan == null) ? 'N/A' : data.pan}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{(data.email == '' || data.email == null) ? 'N/A' : data.email}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.isArmedForce == '0' ? 'No' : 'Yes'}</td>
                                            <td className="px-2 py-2 2xl:text-sm text-xs poppins text-left">{data.isSpeciallyAbled == '0' ? 'No' : 'Yes'}</td>
                                            <td className="px-2 py-2 text-sm text-left"><TbEdit onClick={() => editOwner(index)} className='inline text-green-500 font-semibold text-lg cursor-pointer hover:text-green-700 relative hover:scale-150' /><RiDeleteBack2Line onClick={() => removeOwner(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' /></td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>}
                    <div>
                        <div className='sm:mx-6 my-1 bg-red-50 text-red-400 px-2 py-2 rounded-sm shadow-lg opacity-80 2xl:mt-10 mt-5 text-sm w-full'>
                            <AiFillInfoCircle className="inline mr-2" />
                            Click below <b>Add Owner</b> button to add saf owner of the property, You can add multiple owners by repeating the same method
                        </div>
                    </div>
                </div>

                <div className={`${AddOwnerForm == 'translate-y-0 top-[200px]' ? 'hidden' : 'block'} p-4 mt-4 w-full md:py-4 md:w-full mx-auto  bottom-4 `}>
                    <div className="grid grid-cols-1 md:grid-cols-5 ">
                        <div className="col-span-5 grid grid-cols-3">
                            <div className='2xl:px-10 sm:px-5'>
                                <button onClick={() => props.closePopUp()} type="button" className="px-3 py-1.5 2xl:px-6 2xl:py-2.5 cursor-pointer bg-blue-600 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Close</button>
                            </div>
                            <div className='md:px-4 text-center'>
                            <button onClick={toggleForm} type="button" className=" px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-gray-200 text-black font-medium text-xs leading-tight capitalize rounded shadow-md hover:text-white hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Add Owner <BiAddToQueue className=' hidden md:inline font-semibold text-sm md:text-lg' /></button>
                            </div>
                            <div className='md:px-10 text-right'>
                                <button type="button" onClick={checkMinimumOwner} className="bg-green-600 hover:bg-green-700 px-3 py-1.5 2xl:px-6 2xl:py-2.5 text-white font-medium text-xs  poppins  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Submit</button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>}
        </>
    )
}

export default PropertyAddOwnerObjection