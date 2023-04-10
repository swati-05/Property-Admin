//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ConcessionForm
// Description : Concession entry form
//////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { RiBuilding2Fill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import { getCurrentDate } from "@/Components/Common/PowerUps/PowerupFunctions";
// import apiList from "../../../../Components/ApiList/ConcessionApi";
import apiList from '@/Components/ApiList/ConcessionApi'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";
import 'animate.css'
import { ColorRing } from "react-loader-spinner";
import BarLoader from "@/Components/Common/BarLoader";
import moment from "moment/moment";
import ApplicationSubmitScreen from "../ApplicationSubmitScreen";
import BottomErrorCard from "@/Components/Common/BottomErrorCard";

function ConcessionForm(props) {
  const { getConcessionOwners, postConcessionForm, getDocMaster } = apiList();

  const { id } = useParams()
  // let id= props?.index
  console.log("id in concession => ", id)

  // console.log("header => ", ApiHeader2());

  const [genderUpload, setgenderUpload] = useState();
  const [dobUpload, setdobUpload] = useState();
  const [speciallyUpload, setspeciallyUpload] = useState();
  const [armedForceUpload, setarmedForceUpload] = useState();
  // const [storeData, setstoreData] = useState([]);
  // const [stringData, setstringData] = useState({});
  // const [resultData, setresultData] = useState({});
  const [ownerList, setownerList] = useState()
  const [selectBox, setselectBox] = useState('')
  // const [propId, setpropId] = useState(12)
  const [genderStatus, setgenderStatus] = useState(false)
  const [seniorStatus, setseniorStatus] = useState(false)
  const [armedStatus, setarmedStatus] = useState(false)
  const [speciallyStatus, setspeciallyStatus] = useState(false)
  const [declaration, setdeclaration] = useState(false)
  const [genderId, setgenderId] = useState()
  const [genderName, setgenderName] = useState()
  const [seniorId, setseniorId] = useState()
  const [seniorName, setseniorName] = useState()
  const [armedId, setarmedId] = useState()
  const [armedName, setarmedName] = useState()
  const [speciallyId, setspeciallyId] = useState()
  const [speciallyName, setspeciallyName] = useState()
  const [ulbId, setulbId] = useState()
  const [heading, setheading] = useState('')
  const [appId, setappId] = useState('')
  const [openSubmit, setopenSubmit] = useState()
  const [docStatus, setdocStatus] = useState(0)
  const [docList, setdocList] = useState()
  const [erroState, seterroState] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

  const closeModal = () => {
    navigate(`/holdingPropertyDetails/${id}`)
  }

  const navigate = useNavigate();
  // props?.index
  // Getting owner list
  useEffect(() => {
    setopenSubmit(false)
    setisLoading2(true)
    axios.post(getConcessionOwners, { "propId": id }, ApiHeader())
      .then((res) => {
        console.log("getting owner data => ", res)
        setisLoading2(false)
        setownerList(res.data)
        setulbId(res?.data?.data?.ulbId)

      })
      .catch((err) => {
        console.log("getting owner data err => ", err)
        setisLoading2(false)
      })
  }, [id])

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "application/pdf"];

  const validationSchema = yup.object({
    gender: yup.string().typeError("type error").when([], {
      is: () => genderStatus == true,
      then: yup.string().typeError('Select gender').required("Select gender")
    }),
    dob: yup.string().typeError("type error").when([], {
      is: () => seniorStatus == true,
      then: yup.string().typeError("type error").test(
        "dob",
        "not 60 years old",
        value => {
          return moment().diff(moment(value), 'years') >= 60;
        }
      )
    }),
    // speciallyAbled: yup.boolean().when([], {
    //   is: () => speciallyStatus === true,
    //   then: yup.boolean().required("Select specially-abled status")
    // }),
    speciallyAbledPercentage: yup.number().typeError("type error").when([], {
      is: () => speciallyStatus == true,
      then: yup.number().typeError("type error").min(40, 'must be between 40% to 100%').max(100, 'must be between 40% to 100%').required("Enter specially-abled percentage")
    }),
    // armedForce: yup.boolean().when([], {
    //   is: () => armedStatus === true,
    //   then: yup.boolean().required("Select armed force status")
    // }),
    // genderDoc: yup.mixed().when([], {
    //   is: () => genderStatus === true && docStatus == 1,
    //   then: yup.mixed().required("Select document")
    // }),
    // dobDoc: yup.mixed().when([], {
    //   is: () => seniorStatus === true && docStatus == 1,
    //   then: yup.mixed().required("Select document")
    // }),
    // speciallyAbledDoc: yup.mixed().when([], {
    //   is: () => speciallyStatus === true && docStatus == 1,
    //   then: yup.mixed().required("Select document")
    // }),
    // armedForceDoc: yup.mixed().when([], {
    //   is: () => armedStatus === true && docStatus == 1,
    //   then: yup.mixed().required("Select document")
    // }),
    // documentCode: yup.string().when([], {
    //   is: () => docStatus == 1,
    //   then: yup.string().required("Select document type")
    // }),

  });

  const formik = useFormik({
    initialValues: {
      gender: "",
      dob: "",
      speciallyAbled: true,
      speciallyAbledPercentage: '',
      armedForce: true,
      genderDoc: "",
      dobDoc: "",
      speciallyAbledDoc: "",
      armedForceDoc: "",
      documentCode: ''
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      console.log("--1-- values => ", values);
      submitData(values);
    },
    // validationSchema,
  });

  const submitData = (values) => {

    let documents = [
      {
        document: genderUpload,
        docMstrId: genderId,
        docRefName: genderName
      },
      {
        document: dobUpload,
        docMstrId: seniorId,
        docRefName: seniorName
      },
      {
        document: armedForceUpload,
        docMstrId: armedId,
        docRefName: armedName
      },
      {
        document: speciallyUpload,
        docMstrId: speciallyId,
        docRefName: speciallyName
      }
    ]

    // console.log('before fetch docs => ', documents)

    //creating formData object to send file data
    let fd = new FormData();

    fd.append("propId", id);
    fd.append("ulbId", ulbId)
    fd.append("applicantName", ownerList?.data?.ownerName)
    fd.append("ownerId", ownerList?.data?.ownerId)

    if (genderStatus == true) {
      fd.append("gender", values.gender);
      fd.append("genderDoc", genderUpload);
      fd.append("genderCode", values.documentCode)
      fd.append('appliedFor', 'Gender')
    }
    if (seniorStatus == true) {
      fd.append("dob", values.dob);
      fd.append("dobDoc", dobUpload);
      fd.append("dobCode", values.documentCode)
      fd.append('appliedFor', 'Senior Citizen')
    }
    if (speciallyStatus == true) {
      fd.append("speciallyAbled", true);
      fd.append("speciallyAbledPercentage", values.speciallyAbledPercentage)
      fd.append("speciallyAbledDoc", speciallyUpload);
      fd.append("speciallyAbledCode", values.documentCode)
      fd.append('appliedFor', 'Specially Abled')
    }
    if (armedStatus == true) {
      fd.append("armedForce", true);
      fd.append("armedForceDoc", armedForceUpload);
      fd.append("armedForceCode", values.documentCode)
      fd.append('appliedFor', 'Armed Force')
    }

    console.log("--2-- before fetch...", fd);
    setisLoading2(true)


    axios
      .post(postConcessionForm, fd, ApiHeader())
      .then((res) => {
        if (res?.data?.status == true) {
          console.log(
            "successfully posted => ",
            res,
            "\n result data =>",
            fd
          );
          toast.success("Concession Applied Successfully!!");
          setappId(res?.data?.data)
          setopenSubmit(true)
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting Concession application. Please try again later.')
        }
        setisLoading2(false)


      }).catch((err) => {
        setisLoading2(false)
        activateBottomErrorCard(true, 'Error occured in submitting Concession application. Please try again later.')

      })
  };

  const handleChange = (e) => {
    if (e.target.name == "genderDoc") {
      let file = e.target.files[0];
      setgenderUpload(e.target.files[0]);
      console.log("--1-file on change..", file);
    } else if (e.target.name == "dobDoc") {
      let file = e.target.files[0];
      setdobUpload(e.target.files[0]);
      console.log("--2-file on change..", file);
    } else if (e.target.name == "speciallyAbledDoc") {
      let file = e.target.files[0];
      setspeciallyUpload(e.target.files[0]);
      console.log("--3-file on change..", file);
    } else if (e.target.name == "armedForceDoc") {
      let file = e.target.files[0];
      setarmedForceUpload(e.target.files[0]);
      console.log("--4-file on change..", file);
    }
  };

  let commonInputStyle = `form-control w-full px-3 text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md w-max`;

  const handleButtons = (e) => {
    const value = e.target.value
    const name = e.target.name
    const checkValue = e.target.checked

    console.log("value of selection => ", value)

    if (value == 'gender') {
      setgenderStatus(true)
      setseniorStatus(false)
      setarmedStatus(false)
      setspeciallyStatus(false)
      formik.setFieldValue('documentCode', '')
    }

    if (value == 'seniorCitizen') {
      setgenderStatus(false)
      setseniorStatus(true)
      setarmedStatus(false)
      setspeciallyStatus(false)
      formik.setFieldValue('documentCode', '')
    }

    if (value == 'armedForce') {
      setgenderStatus(false)
      setseniorStatus(false)
      setarmedStatus(true)
      setspeciallyStatus(false)
      formik.setFieldValue('documentCode', '')
    }

    if (value == 'speciallyAbled') {
      setgenderStatus(false)
      setseniorStatus(false)
      setarmedStatus(false)
      setspeciallyStatus(true)
      formik.setFieldValue('documentCode', '')
    }

    if (name != 'declaration') {
      setisLoading2(true)
      axios.post(getDocMaster, { doc: e.target.value }, ApiHeader())
        .then((res) => {
          console.log("response doc master id => ", res)
          if (e.target.value == 'gender') {
            setdocList(res?.data?.data?.masters)
            // setgenderName(res?.data?.data?.doc_name)
          }
          if (e.target.value == 'seniorCitizen') {
            setdocList(res?.data?.data?.masters)
            // setseniorName(res?.data?.data?.doc_name)
          }
          if (e.target.value == 'armedForce') {
            setdocList(res?.data?.data?.masters)
            // setarmedName(res?.data?.data?.doc_name)
          }
          if (e.target.value == 'speciallyAbled') {
            setdocList(res?.data?.data?.masters)
            // setspeciallyName(res?.data?.data?.doc_name)
          }
          setisLoading2(false)
        }).catch((err) => setisLoading2(false))
    }

    { (name == 'declaration' && checkValue == true) && setdeclaration(true) }
    { (name == 'declaration' && checkValue == false) && setdeclaration(false) }

  }

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }

  return (
    <>

      <ToastContainer position="top-right" autoClose={2000} />

      {isLoading2 && <BarLoader />}
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      <div className="2xl:mt-6 mt-3 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center capitalize text-base poppins mb-4 shadow-md py-2 rounded-md">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[30px]">
            <RiBuilding2Fill />
          </span>
          <span className="font-semibold poppins 2xl:text-xl text-lg">
            Apply For Concession
          </span>
        </div>
      </div>

      <div className="poppins my-2 2xl:font-base text-sm">
        If properties owners belong to the following categories then he is eligible for additional 5 percent concession on demand from the current financial year to till the financial year of their ownership, if requested by the citizen for concession.
      </div>

      {/* <div className="flex flex-row md:justify-evenly items-center space-x-2 w-full md:w-[18vw] capitalize text-base poppins mb-4 bg-white shadow-md py-2 rounded-md">
          <span className="font-extrabold text-[30px]">
        <RiBuilding2Fill /> </span>
        <span className="font-semibold poppins text-xl">
        Concession Apply Form</span>
    </div> */}

      <div className="bg-white py-4 shadow-sm rounded-md transition-all duration-300 px-6">

        {/* <div className="mx-6 mt-6 md:mb-9 mb-2 flex flex-row space-x-2 items-center capitalize"> */}
        {/* <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                  <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Owner Name
                </label>
        <select name="ownerId" className="form-control block w-[20vw] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">

        <option selected disabled value="">---Select---</option>

          {
            ownerList?.map((elem) => <>
            
              <option value={elem?.ownerId}>{elem?.ownerName}</option>
            
            </>)
          }
        </select> */}

        <div className="flex flex-col gap-2 w-full">

          <div className="w-full flex flex-row flex-wrap gap-4">
            <div className="text-sm poppins">
              Owner's Name :
            </div>
            <div className="font-semibold poppins">
              {ownerList?.data?.ownerName}
            </div>
          </div>

        </div>

        {ownerList == undefined && <div className="animate__animated animate__fadeInUp w-full flex justify-center items-center">

          {/*===============Concession Selection=================== */}

          {!isLoading2 && <div className="bg-red-200 text-red-600 rounded-md shadow-lg px-6 py-4 poppins">
            ! No Data Found !
          </div>}

        </div>}

        {ownerList?.status == 0 &&
          <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className="animate__animated animate__fadeInUp">

            <div className="w-full mb-4 mt-2">
              <div className="poppins text-sm font-semibold">
                Select the below option by which you want to apply ?
              </div>

              <div className="flex flex-row flex-wrap gap-x-16">
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    name="concOption"
                    id="concOption1"
                    value='gender'
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="concOption1">
                    Gender
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    name="concOption"
                    id="concOption2"
                    value='seniorCitizen'
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="concOption2">
                    Senior Citizen
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    name="concOption"
                    id="concOption3"
                    value='speciallyAbled'
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="concOption3">
                    Specially Abled
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    name="concOption"
                    id="concOption4"
                    value='armedForce'
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="concOption4">
                    Armed Force
                  </label>
                </div>

              </div>
            </div>

            {/* {(genderStatus || seniorStatus || armedStatus || speciallyStatus) && <div className='w-full mb-4 mt-2'>
              <div className='flex flex-row space-x-3'>
                <label className="form-label inline-block mb-1 text-gray-00 text-sm font-semibold poppins"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>For JSK: Do you want to upload documents ?  </label>
                <input
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="docStatus"
                  name="docStatus"
                  value={1}
                  onChange={(e) => setdocStatus(e.target.value)}
                  required
                />
                <label for="option1" className=" text-sm font-medium text-gray-900 poppins">Yes</label>

                <input
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="docStatus"
                  name="docStatus"
                  value={0}
                  onChange={(e) => setdocStatus(e.target.value)}
                  required
                />
                <label for="option1" className="text-sm font-medium text-gray-900 poppins">No</label>

              </div>

            </div>} */}

            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* =========Document select======== */}
              {(genderStatus || seniorStatus || armedStatus || speciallyStatus) && <div className="col-span-3 grid grid-cols-1 md:grid-cols-3  animate__animated animate__fadeIn animate__faster
px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2 gap-x-6">
                <div className="form-group  col-span-3 md:col-span-3">
                  <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins  mr-2">
                    Select document to upload :
                  </label>
                  <select name="documentCode" onChange={formik.handleChange} value={formik.values.documentCode}
                    className="form-control poppins px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                  >
                    <option value="" selected>==Select==</option>
                    {docList?.map((elem) => <>
                      <option value={elem?.documentCode} className='poppins'>{elem?.docVal}</option>
                    </>)}
                  </select>
                  <span className="text-red-600 absolute text-xs">
                    {formik.touched.documentCode && formik.errors.documentCode
                      ? formik.errors.documentCode
                      : null}
                  </span>
                </div>
              </div>}

              {/* Gender */}
              {
                genderStatus &&
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3  animate__animated animate__fadeIn animate__faster
px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2 gap-x-6">
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Gender
                    </label>
                    <select onChange={formik.handleChange}
                      {...formik.getFieldProps("gender")}
                      value={formik.values.gender}
                      className="form-control block poppins w-full px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="" selected>--Select--</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.gender && formik.errors.gender
                        ? formik.errors.gender
                        : null}
                    </span>
                  </div>
                  <div className="form-group  col-span-3 md:col-span-1">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className="mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Upload gender proof
                    </label>
                    <input
                      {...formik.getFieldProps("genderDoc")}
                      type="file" accept=".jpg,.jpe" onChange={handleChange}
                      className="form-control block w-full  px-3 py-1.5 md:py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer shadow-md"

                    />
                    {<span className="text-red-600 absolute text-xs">
                      {formik.touched.genderDoc && formik.errors.genderDoc
                        ? formik.errors.genderDoc
                        : null}
                    </span>}
                  </div>
                  {/* <div className="form-group  col-span-3 md:col-span-1 text-red-600 text-xs 2xl:text-base italic flex items-end poppins">
                    (Aadhar/Passport/EPIC)
              </div> */}
                </div>
              }


              {/* DOB */}
              {
                seniorStatus &&
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3  animate__animated animate__fadeIn animate__faster
px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2 gap-x-6">
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      DOB
                    </label>
                    <input
                      {...formik.getFieldProps("dob")}
                      type="date" onChange={formik.handleChange}
                      className="form-control block w-full  px-3 py-1.5 md:py-1 2xl:text-base text-xs poppins md:text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.dob && formik.errors.dob
                        ? formik.errors.dob
                        : null}
                    </span>
                  </div>
                  <div className="form-group  col-span-3 md:col-span-1">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Upload DOB proof
                    </label>
                    <input
                      {...formik.getFieldProps("dobDoc")}
                      type="file" accept=".jpg,.jpe" onChange={handleChange}
                      className="form-control block w-full  px-3 py-1.5 md:py-1 poppins 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer shadow-md"

                    />
                    {<span className="text-red-600 absolute text-xs">
                      {formik.touched.dobDoc && formik.errors.dobDoc
                        ? formik.errors.dobDoc
                        : null}
                    </span>}
                  </div>
                  {/* <div className="form-group  col-span-3 md:col-span-1 text-red-600 text-xs 2xl:text-base italic flex items-end poppins">
                    (Aadhar/Passport/EPIC/PAN/DL)
              </div> */}
                </div>
              }


              {/* speciallyAbled */}
              {
                speciallyStatus &&
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3  animate__animated animate__fadeIn animate__faster
px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2 gap-x-6">
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Specially-Abled
                    </label>
                    {/* <select onChange={formik.handleChange}
                  {...formik.getFieldProps("speciallyAbled")}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.speciallyAbled && formik.errors.speciallyAbled
                    ? formik.errors.speciallyAbled
                    : null}
                </span> */}
                    <div className="font-semibold poppins">
                      Yes
                    </div>
                  </div>

                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Specially-Abled Percentage (%)
                    </label>
                    <input onChange={formik.handleChange}
                      type="number"
                      {...formik.getFieldProps("speciallyAbledPercentage")}
                      className="form-control block w-full px-3 py-1.5 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md" />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.speciallyAbledPercentage && formik.errors.speciallyAbledPercentage
                        ? formik.errors.speciallyAbledPercentage
                        : null}
                    </span>
                  </div>

                  <div className="form-group  col-span-3 md:col-span-1">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Upload specially-abled proof
                    </label>
                    <input
                      {...formik.getFieldProps("speciallyAbledDoc")}
                      type="file" accept=".jpg,.jpe" onChange={handleChange}
                      className="form-control block w-full  px-3 py-1.5 md:py-1 poppins 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer shadow-md"
                    />
                    {<span className="text-red-600 absolute text-xs">
                      {formik.touched.speciallyAbledDoc &&
                        formik.errors.speciallyAbledDoc
                        ? formik.errors.speciallyAbledDoc
                        : null}
                    </span>}
                  </div>
                </div>
              }


              {/* Armed Force */}
              {
                armedStatus &&
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3  animate__animated animate__fadeIn animate__faster
px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2 gap-x-6">
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Armed-Force
                    </label>
                    {/* <select onChange={formik.handleChange}
                  {...formik.getFieldProps("armedForce")}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.armedForce && formik.errors.armedForce
                    ? formik.errors.armedForce
                    : null}
                </span> */}
                    <div className="font-semibold poppins">
                      Yes
                    </div>
                  </div>
                  <div className="form-group  col-span-3 md:col-span-1">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Upload armed force proof
                    </label>
                    <input
                      {...formik.getFieldProps("armedForceDoc")}
                      type="file" accept=".jpg,.jpe" onChange={handleChange}
                      className="form-control block w-full  px-3 py-1.5 md:py-1 poppins 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer shadow-md"
                    />
                    {<span className="text-red-600 absolute text-xs">
                      {formik.touched.armedForceDoc && formik.errors.armedForceDoc
                        ? formik.errors.armedForceDoc
                        : null}
                    </span>}
                  </div>

                </div>
              }

              {/* {(genderStatus || seniorStatus || speciallyStatus || armedStatus) && 
                  <div className="flex flex-row flex-wrap gap-16 my-2 w-full col-span-3">
                  <div className="flex flex-row items-center">
                    <input
                      type="checkbox"
                      name="declaration"
                      id="declaration"
                      onChange={handleButtons}
                      className={commonInputStyle + ` shadow-sm text-indigo-700 bg-indigo-800`}
                    />{" "}
                    &nbsp; &nbsp;
                    <label className="poppins text-sm italic" htmlFor="declaration">
                        <span className="font-semibold poppins">I accept </span> that the above declaration are true.
                    </label>
                  </div>
                  </div>
                } */}


              <div className="col-span-3 w-full flex flex-row flex-wrap justify-between">
                <div className="">
                  <button
                    onClick={() => navigate(`/holdingPropertyDetails/${id}`)}
                    type="button"
                    className=" px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-blue-600 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Back
                  </button>
                </div>
                <div className="">
                  {(genderStatus || seniorStatus || speciallyStatus || armedStatus) && <button
                    type="submit"
                    // disabled={!declaration}
                    className={`bg-green-600 hover:bg-green-700 px-3 py-1.5 2xl:px-6 2xl:py-2.5 text-white font-medium text-xs  poppins  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                  >
                    Submit
                  </button>}
                </div>
              </div>
            </div>
          </form>
        }

        {ownerList?.status == 1 && <div className="animate__animated animate__fadeInUp w-full flex justify-center mt-2 items-center">

          <div className="bg-indigo-500 text-white rounded-md shadow-lg px-4 py-2">
            Your form is already submitted and it is in workflow.
          </div>

        </div>

        }

      </div>

      <ApplicationSubmitScreen heading={'Apply For Concession'} appNo={appId} openSubmit={openSubmit} navigation={closeModal} />
      <div className="h-[10rem] visible 2xl:hidden"></div>
    </>
  );
}

export default ConcessionForm;

//////////////////////////////////////////////
// Export to : ConcessionFormIndex.js
//////////////////////////////////////////////
