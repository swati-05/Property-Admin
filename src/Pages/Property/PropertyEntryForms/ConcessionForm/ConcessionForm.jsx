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
  console.log("id in concession => ", id)

  // console.log("header => ", ApiHeader2());

  const [genderUpload, setgenderUpload] = useState();
  const [dobUpload, setdobUpload] = useState();
  const [speciallyUpload, setspeciallyUpload] = useState();
  const [armedForceUpload, setarmedForceUpload] = useState();
  // const [storeData, setstoreData] = useState([]);
  // const [stringData, setstringData] = useState({});
  // const [resultData, setresultData] = useState({});
  const [docList1, setdocList1] = useState(null)
  const [docList2, setdocList2] = useState(null)
  const [docList3, setdocList3] = useState(null)
  const [docList4, setdocList4] = useState(null)
  const [ownerList, setownerList] = useState()
  const [selectBox, setselectBox] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [appId, setappId] = useState('')
  const [genderStatus, setgenderStatus] = useState(false)
  const [seniorStatus, setseniorStatus] = useState(false)
  const [armedStatus, setarmedStatus] = useState(false)
  const [speciallyStatus, setspeciallyStatus] = useState(false)
  const [declaration, setdeclaration] = useState(false)
  const [openSubmit, setopenSubmit] = useState()
  const [genderId, setgenderId] = useState()
  const [genderName, setgenderName] = useState()
  const [seniorId, setseniorId] = useState()
  const [seniorName, setseniorName] = useState()
  const [armedId, setarmedId] = useState()
  const [armedName, setarmedName] = useState()
  const [speciallyId, setspeciallyId] = useState()
  const [speciallyName, setspeciallyName] = useState()
  const [ulbId, setulbId] = useState()
  const [errorState, seterrorState] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')

  const navigate = useNavigate();

  const closeModal = () => {
    navigate(`/holdingPropertyDetails/${id}`)
  }

  // Getting owner list
  useEffect(() => {
    setopenSubmit(false)
    setisLoading(true)
    axios.post(getConcessionOwners, { "propId": id }, ApiHeader())
      .then((res) => {
        console.log("getting owner data => ", res)
        setisLoading(false)
        setownerList(res.data)
        setulbId(res?.data?.data?.ulbId)
      })
      .catch((err) => {
        console.log("getting owner data err => ", err)
        setisLoading(false)
      })
  }, [id])

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "application/pdf"];

  const validationSchema = yup.object({
    gender: yup.string().when([], {
      is: () => genderStatus === true,
      then: yup.string().typeError('Select gender').required("Select gender")
    }),
    dob: yup.string().when([], {
      is: () => seniorStatus === true,
      then: yup.string().test(
        "dob",
        "not 60 years old",
        value => {
          return moment().diff(moment(value), 'years') >= 60;
        }
      )
    }),
    // speciallyAbledPercentage: yup.number().when([], {
    //   is: () => speciallyStatus === true,
    //   then: yup.number().min(40, 'must be between 40% to 100%').max(100, 'must be between 40% to 100%').required("Enter specially-abled percentage")
    // }),
    // genderCode: yup.string().when([], {
    //   is: () => genderStatus === true,
    //   then: yup.string().typeError('Select document').required("Select document")
    // }),
    // dobCode: yup.string().when([], {
    //   is: () => seniorStatus === true,
    //   then: yup.string().typeError('Select document').required("Select document")
    // }),
    // speciallyAbledCode: yup.string().when([], {
    //   is: () => speciallyStatus === true,
    //   then: yup.string().typeError('Select document').required("Select document")
    // }),
    // armedForceCode: yup.string().when([], {
    //   is: () => armedStatus === true,
    //   then: yup.string().typeError('Select document').required("Select document")
    // }),
    // genderDoc: yup.mixed().when([], {
    //   is: () => genderStatus === true,
    //   then: yup.mixed().required("Upload gender document")
    // }),
    // dobDoc: yup.mixed().when([], {
    //   is: () => seniorStatus === true,
    //   then: yup.mixed().required("Upload DOB document")
    // }),
    // speciallyAbledDoc: yup.mixed().when([], {
    //   is: () => speciallyStatus === true,
    //   then: yup.mixed().required("Upload specially abled document")
    // }),
    // armedForceDoc: yup.mixed().when([], {
    //   is: () => armedStatus === true,
    //   then: yup.mixed().required("Upload armed document")
    // })
  });

  // const validationSchema = yup.object().shape({
  //   gender: yup.string().when('genderStatus', {
  //     is: true,
  //     then: yup.string().typeError('Select gender').required("Select gender")
  //   }),
  //   dob: yup.string().when("seniorStatus", {
  //     is: true,
  //     then: yup.string().test(
  //       "dob",
  //       "not 60 years old",
  //       value => {
  //         return moment().diff(moment(value), 'years') >= 60;
  //       }
  //     )
  //   }),
  //   speciallyAbledPercentage: yup.number().when("speciallyStatus", {
  //     is: true,
  //     then: yup.number().min(40, 'must be between 40% to 100%').max(100, 'must be between 40% to 100%').required("Enter specially-abled percentage")
  //   }),
  //   genderCode: yup.string().when("genderStatus", {
  //     is: true,
  //     then: yup.string().typeError('Select document').required("Select document")
  //   }),
  //   dobCode: yup.string().when("seniorStatus", {
  //     is: true,
  //     then: yup.string().typeError('Select document').required("Select document")
  //   }),
  //   speciallyAbledCode: yup.string().when("speciallyStatus", {
  //     is: true,
  //     then: yup.string().typeError('Select document').required("Select document")
  //   }),
  //   armedForceCode: yup.string().when("armedStatus", {
  //     is: true,
  //     then: yup.string().typeError('Select document').required("Select document")
  //   }),
  //   genderDoc: yup.mixed().when("genderStatus", {
  //     is: true,
  //     then: yup.mixed().required("Upload gender document")
  //   }),
  //   dobDoc: yup.mixed().when("seniorStatus", {
  //     is: true,
  //     then: yup.mixed().required("Upload DOB document")
  //   }),
  //   speciallyAbledDoc: yup.mixed().when("speciallyStatus", {
  //     is: true,
  //     then: yup.mixed().required("Upload specially abled document")
  //   }),
  //   armedForceDoc: yup.mixed().when("armedStatus", {
  //     is: true,
  //     then: yup.mixed().required("Upload armed document")
  //   })
  // });

  const formik = useFormik({
    initialValues: {
      genders: "",
      dob: "",
      speciallyAbled: true,
      speciallyAbledPercentage: '',
      armedForce: true,
      genderDoc: "",
      dobDoc: "",
      speciallyAbledDoc: "",
      armedForceDoc: "",
      genderCode: "",
      dobCode: "",
      speciallyAbledCode: "",
      armedForceCode: "",
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      console.log("submitting values => ", values);
      let ruleOk = checkRuleSet(values)
      ruleOk && submitData(values);
    },
    // validationSchema,
  });

  const activateBottomErrorCard = (state, msg) => {
    seterrorMsg(msg)
    seterrorState(state)
  }

  // console.log('error data => ', errorMsg, errorState, genderStatus, formik.values.genders)

  const checkRuleSet = (values) => {

    if (genderStatus) {
      if (values.genders == '') {
        activateBottomErrorCard(true, 'Please select gender')
        return false
      }
      if (values.genderCode == '') {
        activateBottomErrorCard(true, 'Please select gender document')
        return false
      }
      if (values.genderDoc == '') {
        activateBottomErrorCard(true, 'Please upload gender proof')
        return false
      }
    }

    if (seniorStatus) {
      if (values.dob == '') {
        activateBottomErrorCard(true, 'Please enter dob')
        return false
      } else
      if((moment().diff(moment(values.dob), 'years') >= 60) == false) {
        activateBottomErrorCard(true, 'You must be atleast 60 years of age')
        return false
      }
      if (values.dobCode == '') {
        activateBottomErrorCard(true, 'Please select dob document')
        return false
      }
      if (values.dobDoc == '') {
        activateBottomErrorCard(true, 'Please upload dob proof')
        return false
      }
    }

    if (speciallyStatus) {
      if (values.speciallyAbledPercentage == '') {
        activateBottomErrorCard(true, 'Please enter Specially-Abled percentage')
        return false
      } else 
      if(values.speciallyAbledPercentage < 40){
        activateBottomErrorCard(true, 'Specially-Abled Percentage should be atleast 40%')
        return false
      }
      if (values.speciallyAbledCode == '') {
        activateBottomErrorCard(true, 'Please select Specially-Abled document')
        return false
      }
      if (values.speciallyAbledDoc == '') {
        activateBottomErrorCard(true, 'Please upload Specially-Abled proof')
        return false
      }
    }

    if (armedStatus) {
      if (values.armedForceCode == '') {
        activateBottomErrorCard(true, 'Please select armed force document')
        return false
      }
      if (values.armedForceDoc == '') {
        activateBottomErrorCard(true, 'Please upload armed force proof')
        return false
      }
    }

    return true;

  }

  const submitData = (values) => {

    // console.log('before fetch docs => ', documents)

    //creating formData object to send file data
    let fd = new FormData();


    fd.append("propId", id);
    fd.append("ulbId", ulbId)
    fd.append("applicantName", ownerList?.data?.ownerName)
    fd.append('ownerId', ownerList?.data?.ownerId)

    if (genderStatus == true) {
      fd.append("gender", values.genders);
      fd.append("genderDoc", genderUpload);
      // fd.append("genderCode", genderId)
      // fd.append("genderRefName", genderName)
      fd.append("genderCode", values.genderCode)
      fd.append('appliedFor', 'Gender')
    }
    if (seniorStatus == true) {
      fd.append("dob", values.dob);
      fd.append("dobDoc", dobUpload);
      // fd.append("dobCode", seniorId)
      // fd.append("dobRefName", seniorName)
      fd.append("dobCode", values.dobCode)
      fd.append('appliedFor', 'Senior Citizen')
    }
    if (speciallyStatus == true) {
      fd.append("speciallyAbled", true);
      fd.append("speciallyAbledPercentage", values.speciallyAbledPercentage)
      fd.append("speciallyAbledDoc", speciallyUpload);
      // fd.append("speciallyAbledCode", speciallyId)
      // fd.append("speciallyAbledRefName", speciallyName)
      fd.append("speciallyAbledCode", values.speciallyAbledCode)
      fd.append('appliedFor', 'Specially Abled')
    }
    if (armedStatus == true) {
      fd.append("armedForce", true);
      fd.append("armedForceDoc", armedForceUpload);
      // fd.append("armedForceCode", armedId)
      // fd.append("armedForceRefName", armedName)
      fd.append("armedForceCode", values.armedForceCode)
      fd.append('appliedFor', 'Armed Force')
    }

    console.log("--2-- before fetch...", fd);
    setisLoading(true)

    setTimeout(() => {
      setisLoading(false)
    }, 10000);

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
        setisLoading(false)


      }).catch((err) => {
        setisLoading(false)
        activateBottomErrorCard(true, 'Error occured in submitting Concession application. Please try again later.')

      })
  };

  const submitCon = (appId) => {
    props.submitConcession(appId)
  }

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
    const name = e.target.name
    const checkValue = e.target.checked



    if (name == 'gender' && checkValue == true) {
      setgenderStatus(true)
    }

    if (name == 'seniorCitizen' && checkValue == true) {
      setseniorStatus(true)
    }

    if (name == 'armedForce' && checkValue == true) {
      setarmedStatus(true)
    }

    if (name == 'speciallyAbled' && checkValue == true) {
      setspeciallyStatus(true)
    }

    if (name != 'declaration' && checkValue) {
      setisLoading(true)
      axios.post(getDocMaster, { doc: e.target.name }, ApiHeader())
        .then((res) => {
          console.log("response doc master id => ", res)
          if (e.target.name == 'gender') {
            // setgenderId(res?.data?.data?.code)
            setdocList1(res?.data?.data?.masters)
            setgenderName(res?.data?.data?.doc_name)
          }
          if (e.target.name == 'seniorCitizen') {
            // setseniorId(res?.data?.data?.code)
            setdocList2(res?.data?.data?.masters)
            setseniorName(res?.data?.data?.doc_name)
          }
          if (e.target.name == 'armedForce') {
            // setarmedId(res?.data?.data?.code)
            setdocList3(res?.data?.data?.masters)
            setarmedName(res?.data?.data?.doc_name)
          }
          if (e.target.name == 'speciallyAbled') {
            // setspeciallyId(res?.data?.data?.code)
            setdocList4(res?.data?.data?.masters)
            setspeciallyName(res?.data?.data?.doc_name)
          }
        })
        .finally(() => setisLoading(false))
    }

    // if (name != 'declaration') {
    //   setisLoading(true)
    //   axios.post(getDocMaster, { doc: e.target.value }, ApiHeader())
    //     .then((res) => {
    //       console.log("response doc master id => ", res)
    //       if (e.target.value == 'gender') {
    //         setdocList(res?.data?.data?.masters)
    //         setgenderName(res?.data?.data?.doc_name)
    //       }
    //       if (e.target.value == 'seniorCitizen') {
    //         setdocList(res?.data?.data?.masters)
    //         setseniorName(res?.data?.data?.doc_name)
    //       }
    //       if (e.target.value == 'armedForce') {
    //         setdocList(res?.data?.data?.masters)
    //         setarmedName(res?.data?.data?.doc_name)
    //       }
    //       if (e.target.value == 'speciallyAbled') {
    //         setdocList(res?.data?.data?.masters)
    //         setspeciallyName(res?.data?.data?.doc_name)
    //       }
    //       setisLoading(false)
    //     }).catch((err) => setisLoading(false))
    // }


    if (name == 'gender' && checkValue == false) {
      setgenderStatus(false)
      setgenderId(undefined)
      setgenderName(undefined)
    }

    if (name == 'seniorCitizen' && checkValue == false) {
      setseniorStatus(false)
      setseniorId(undefined)
      setseniorName(undefined)
    }

    if (name == 'armedForce' && checkValue == false) {
      setarmedStatus(false)
      setarmedId(undefined)
      setarmedName(undefined)
    }

    if (name == 'speciallyAbled' && checkValue == false) {
      setspeciallyStatus(false)
      setspeciallyId(undefined)
      setspeciallyName(undefined)
    }

    { (name == 'declaration' && checkValue == true) && setdeclaration(true) }
    { (name == 'declaration' && checkValue == false) && setdeclaration(false) }

  }

  // console.log("doc mstr names => ", genderName, seniorName, armedName, speciallyName)

  return (
    <>

  { errorState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={errorMsg} /> }

      <ToastContainer position="top-right" autoClose={2000} />

      {/* {isLoading && <div className="w-full z-10 absolute mx-auto text-center flex justify-center items-center top-[70%]">
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
          </div>} */}
      {isLoading && <BarLoader />}

      <div className="2xl:mt-6 mt-3 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center uppercase text-base poppins mb-4 shadow-md py-2 rounded-md">
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

      {/* <div className="flex flex-row md:justify-evenly items-center space-x-2 w-full md:w-[18vw] uppercase text-base poppins mb-4 bg-white shadow-md py-2 rounded-md">
          <span className="font-extrabold text-[30px]">
        <RiBuilding2Fill /> </span>
        <span className="font-semibold poppins text-xl">
        Concession Apply Form</span>
    </div> */}

      <div className="bg-white py-4 shadow-sm rounded-md transition-all duration-300 px-6">

        {/* <div className="mx-6 mt-6 md:mb-9 mb-2 flex flex-row space-x-2 items-center uppercase"> */}
        {/* <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold">
                  <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Owner Name
                </label>
        <select name="ownerId" className="form-control block w-[20vw] px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md">

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

          {!isLoading && <div className="bg-red-200 text-red-600 rounded-md shadow-lg px-6 py-4 poppins">
            ! No Data Found !
          </div>}

        </div>}

        {ownerList?.status == 0 &&
          <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className="animate__animated animate__fadeInUp">

            <div className="w-full mb-4 mt-2">
              <div className="poppins text-sm font-semibold">
                Check the below option by which you want to apply ?
              </div>

              <div className="flex flex-row flex-wrap gap-x-16">
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="gender"
                    id="gender"
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="gender">
                    Gender
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="seniorCitizen"
                    id="seniorCitizen"
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="seniorCitizen">
                    Senior Citizen
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="speciallyAbled"
                    id="speciallyAbled"
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="speciallyAbled">
                    Specially Abled
                  </label>
                </div>

                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name="armedForce"
                    id="armedForce"
                    onChange={handleButtons}
                    className={commonInputStyle + ` shadow-sm`}
                  />{" "}
                  &nbsp;
                  <label className="poppins 2xl:text-base text-xs" htmlFor="armedForce">
                    Armed Force
                  </label>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
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
                      {...formik.getFieldProps("genders")}
                      value={formik.values.genders}
                      className="form-control block poppins w-full px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="">--Select--</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.genders && formik.errors.genders
                        ? formik.errors.genders
                        : null}
                    </span>
                  </div>
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Select document to upload :
                    </label>
                    <select {...formik.getFieldProps("genderCode")} onChange={formik.handleChange} value={formik.values.genderCode}
                      className="form-control w-full poppins px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="" selected>Select</option>
                      {docList1?.map((elem) => <>
                        <option value={elem?.documentCode} className='poppins'>{elem?.docVal}</option>
                      </>)}
                    </select>
                    <span className="text-red-600  text-xs">
                      {formik.touched.genderCode && formik.errors.genderCode
                        ? formik.errors.genderCode
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
                      className="form-control block w-full poppins px-3 py-1.5 md:py-1 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer shadow-md"

                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.genderDoc && formik.errors.genderDoc
                        ? formik.errors.genderDoc
                        : null}
                    </span>
                  </div>
                  {/* <div className="form-group  col-span-3 md:col-span-1 text-red-600 text-sm 2xl:text-base italic flex items-end poppins">
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
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Select document to upload :
                    </label>
                    <select name="dobCode" onChange={formik.handleChange} value={formik.values.dobCode}
                      className="form-control w-full poppins px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="" selected>Select</option>
                      {docList2?.map((elem) => <>
                        <option value={elem?.documentCode} className='poppins'>{elem?.docVal}</option>
                      </>)}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.dobCode && formik.errors.dobCode
                        ? formik.errors.dobCode
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
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.dobDoc && formik.errors.dobDoc
                        ? formik.errors.dobDoc
                        : null}
                    </span>
                  </div>
                  {/* <div className="form-group  col-span-3 md:col-span-1 text-red-600 text-sm 2xl:text-base italic flex items-end poppins">
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
                    <div className="font-semibold poppins text-sm text-gray-800">
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
                      className="form-control block w-full px-3 py-1.5 2xl:text-base text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.speciallyAbledPercentage && formik.errors.speciallyAbledPercentage
                        ? formik.errors.speciallyAbledPercentage
                        : null}
                    </span>
                  </div>

                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Select document to upload :
                    </label>
                    <select name="speciallyAbledCode" onChange={formik.handleChange} value={formik.values.speciallyAbledCode}
                      className="form-control w-full poppins px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="" selected>Select</option>
                      {docList4?.map((elem) => <>
                        <option value={elem?.documentCode} className='poppins'>{elem?.docVal}</option>
                      </>)}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.speciallyAbledCode && formik.errors.speciallyAbledCode
                        ? formik.errors.speciallyAbledCode
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
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.speciallyAbledDoc &&
                        formik.errors.speciallyAbledDoc
                        ? formik.errors.speciallyAbledDoc
                        : null}
                    </span>
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
                    <div className="font-semibold poppins text-sm text-gray-800">
                      Yes
                    </div>
                  </div>
                  <div className="form-group  col-span-3 md:col-span-1 ">
                    <label className="form-label inline-block text-gray-600 2xl:text-sm text-xs font-semibold poppins">
                      <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Select document to upload :
                    </label>
                    <select name="armedForceCode" onChange={formik.handleChange} value={formik.values.armedForceCode}
                      className="form-control w-full poppins px-3 py-1.5 2xl:text-sm text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                    >
                      <option value="" selected>Select</option>
                      {docList3?.map((elem) => <>
                        <option value={elem?.documentCode} className='poppins'>{elem?.docVal}</option>
                      </>)}
                    </select>
                    <span className="text-red-600 text-xs">
                      {formik.touched.armedForceCode && formik.errors.armedForceCode
                        ? formik.errors.armedForceCode
                        : null}
                    </span>
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
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.armedForceDoc && formik.errors.armedForceDoc
                        ? formik.errors.armedForceDoc
                        : null}
                    </span>
                  </div>

                </div>
              }

              {(genderStatus || seniorStatus || speciallyStatus || armedStatus) &&
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
                    <label className="poppins 2xl:text-sm text-xs italic" htmlFor="declaration">
                      <span className="font-semibold poppins">I accept </span> that the above declaration are true.
                    </label>
                  </div>
                </div>
              }


              <div className="col-span-3 w-full flex flex-row flex-wrap justify-between">
                <div className="">
                  <button
                    onClick={props?.closeModal}
                    type="button"
                    className=" px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-blue-600 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Close
                  </button>
                </div>
                <div className="">
                  {(genderStatus || seniorStatus || speciallyStatus || armedStatus) && <button
                    type="submit"
                    disabled={!declaration}
                    className={(declaration ? `bg-green-600 hover:bg-green-700` : `bg-zinc-600 hover:bg-zinc-700 cursor-not-allowed`) + ` px-3 py-1.5 2xl:px-6 2xl:py-2.5 text-white font-medium text-xs  poppins  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
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
