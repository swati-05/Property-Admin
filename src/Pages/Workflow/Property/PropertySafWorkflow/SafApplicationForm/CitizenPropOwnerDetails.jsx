////////////////////////////////////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19 Dec., 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropOwnerDetails
// >DESCRIPTION - CitizenPropOwnerDetails Component
/////////////////////////////////////////////////////////////////////

import { useContext, useState,useEffect } from 'react'
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
import { inputContainerStyle, inputErrorStyle, commonInputStyle, inputLabelStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import {toast, ToastContainer} from 'react-toastify'
import { ColorRing } from "react-loader-spinner";
import CitizenPropOwnerRow from './CitizenPropOwnerRow'

function CitizenPropOwnerDetails(props) {
    const [ownerList, setOwnerList] = useState([])
    const [editStatus, setEditStatus] = useState(false) //to check edit or add of form
    const [editIndex, setEditIndex] = useState() //to carry the index to edit if edistatus is true
    const [AddOwnerForm, setAddOwnerForm] = useState('-translate-y-full -top-[400px]') //to hide and show ownerform with animation
    const [ownersList, setownersList] = useState()
    const [loader, setloader] = useState(false)
    const [ownerData, setownerData] = useState([])

    const { notify } = useContext(contextVar)

    console.log('current date at owner ', getCurrentDate())


    const validationSchema = yup.object({
        ownerName: yup.string().required('Enter owner name').max(50, 'Enter maximum 50 characters'),
        gender: yup.string().required('Select gender'),
        dob: yup.date().required('Select DOB'),
        guardianName: yup.string(),
        relation: yup.string(),
        mobileNoNo: yup.string().required('Enter mobileNo no.'),
        aadhar: yup.string(),
        pan: yup.string(),
        email: yup.string(),
        isArmedForce: yup.string().required('Select armed force status'),
        isSpeciallyAbled: yup.string().required('Select specially-abled status'),

    })
    const formik = useFormik({
        initialValues: {
            ownerName: '',
            gender: '',
            dob: '',
            guardianName: '',
            relation: '',
            mobileNo: '',
            aadhar: '',
            pan: '',
            email: '',
            isArmedForce: '',
            isSpeciallyAbled: ''
        },

        onSubmit: (values, resetForm) => {
          console.log("values of owner => ", values)
        //     if (editStatus) {
        //         editOwnerList(values)
        //         return
        //     }
        //     //check for duplicate entry for 1-mobileNoNo 2-aadhar 3-pan
        //     let duplicateStatus = checkDuplicateOwner(values)
        //     if (duplicateStatus) {
        //         return
        //     }

        //     let tempOwnerList = [...ownerList, values] //taking copy of array adding latest values since setstate does not update immediatly
        //     setOwnerList([...ownerList, values])

        //     props.collectFormDataFun('ownerDetails', tempOwnerList) //sending OwnerDetails data to parent to store all form data at one container
        //     toggleForm()
        }
        // , validationSchema
    })

    useEffect(() => {
        if(ownerList?.length==0){
            setAddOwnerForm('translate-y-0 top-[100px]')
        }
        setownersList(props?.preFormData?.owners) 
    }, [props?.preFormData])
    
    const checkDuplicateOwner = (currentOwner) => {
        let duplicateStatus = false
        let message = ''
        console.log('at duplicate.....')
        ownerList.some((owner) => {
            if (currentOwner.mobileNoNo == owner.mobileNoNo) {
                duplicateStatus = true
                message = 'Duplicate mobileNo no.'
                //  notify(message, 'error')
                return
            }
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
        let tempOwnerlist = [...ownerList]  //copying the array
        console.log('edit index is ', editIndex)
        tempOwnerlist[editIndex] = formik.values  //updating value of editindex
        console.log('tmep owner list', tempOwnerlist)
        props.collectFormDataFun('ownerDetails', tempOwnerlist) //sending OwnerDetails data to parent to store all form data at one container
        setOwnerList(tempOwnerlist) //setting value in origin ownlist array
        setEditStatus(false) //seting edit status false after successfull edit
        toggleForm()
    }

    const toggleForm = () => {
        if (AddOwnerForm === 'translate-y-0 top-[100px]') {
            setAddOwnerForm('-translate-y-full -top-[400px]')
        } else {
            setAddOwnerForm('translate-y-0 top-[100px]')
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

    }


    console.log('owner list.....', ownerList)
    //function to edit owner from owner list via index
    const editOwner = (index) => {
        setEditStatus(true)
        setEditIndex(index)
        // let tempOwnerlist = [...ownerList]
        // // formik.resetForm()

        formik.initialValues.ownerName = ownersList[index].owner_name
        formik.initialValues.gender = ownersList[index].gender
        formik.initialValues.dob = ownersList[index].dob
        formik.initialValues.guardianName = ownersList[index].guardian_name
        formik.initialValues.relation = ownersList[index].relation_type
        formik.initialValues.mobileNo = ownersList[index].mobileNo_no
        formik.initialValues.aadhar = ownersList[index].aadhar_no
        formik.initialValues.pan = ownersList[index].pan_no
        formik.initialValues.email = ownersList[index].email
        formik.initialValues.isArmedForce = ownersList[index].is_armed_force
        formik.initialValues.isSpeciallyAbled = ownersList[index].is_specially_abled

        toggleForm()
    }
    const checkMinimumOwner = () => {
        if (ownerList.length === 0) {
            props.toastFun('Add minimum one owner')
        } else {
            props.nextFun(4)
        }
    }
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        //input restrict validation
        { name == 'ownerName' && formik.setFieldValue("ownerName", allowCharacterSpaceCommaInput(value, formik.values.ownerName, 100)) }
        { name == 'guardianName' && formik.setFieldValue("guardianName", allowCharacterSpaceCommaInput(value, formik.values.guardianName, 100)) }
        { name == 'mobileNoNo' && formik.setFieldValue("mobileNoNo", allowNumberInput(value, formik.values.mobileNoNo, 10)) }
        { name == 'aadhar' && formik.setFieldValue("aadhar", allowNumberInput(value, formik.values.aadhar, 12)) }
        { name == 'pan' && formik.setFieldValue("pan", allowCharacterNumberInput(value, formik.values.pan, 10)) }
        { name == 'email' && formik.setFieldValue("email", allowMailInput(value, formik.values.email, 100)) }

    }

    const getOwner = (datas) => {
      console.log("incoming datas => ", datas);
      let tempOwnerList = [...ownerData, datas];
      setownerData([...ownerData, datas]);
      // props?.getOwnerData(tempOwnerList);
      toast.info("Changes observed. You can proceed !!");
      console.log(
        "temp owner data => ",
        tempOwnerList,
        "\n owner list data => ",
        ownerData
      );
    };

    const submitOwner = () =>{
        props.nextFun(4)
        props?.collectFormDataFun('ownerDetails', ownerData)
    }
    
    const commonInputStyle2 = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:outline-none focus:outline-none border-2 shadow-sm cursor-text bg-gray-200`


    return (
        <>
         <ToastContainer position="top-right" autoClose={2000} />

        {loader && (
        <div className="w-full z-10 absolute mx-auto text-center flex justify-center items-center top-1/2">
          <span className="inline">
            <ColorRing
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </span>
        </div>
      )}
          
                <h1 className='mt-6 mb-2 font-serif font-semibold  text-gray-600'><FaUserNurse className="inline mr-2" />Owner Details </h1>

                <div
        className="col-span-4 overflow-x-auto"
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      >
        <table className="min-w-full leading-normal">
          <thead className="font-bold text-left text-sm bg-sky-50">
          <tr>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">#</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Owner</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Gender</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">DOB</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Guardian</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Relation</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Mobile No</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Aadhar</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">PAN</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">email</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">IsArmed</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">IsSpecially</th>
                                <th className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">Action</th>
                            </tr>
          </thead>
          <tbody className="text-xs">

            {ownersList?.map((data, index) => (
              <CitizenPropOwnerRow data={data} index={index} getowner={getOwner} tempData={ownerData}
              />
            ))}
          </tbody>
        </table>

        <div className="col-span-5 grid grid-cols-3 mt-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(4)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-10 text-right'>
                                <button type="button" onClick={() => submitOwner()} className=" px-6 py-2.5 bg-sky-400 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>
                            </div>

                        </div>

      </div>

            
        </>
    )
}

export default CitizenPropOwnerDetails