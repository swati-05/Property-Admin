//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : ObjectionRectificationTable
// Description : Objection Rectification Application page
//////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiLinks from "@/Components/ApiList/ObjectionRectificationApi";
import "animate.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FcDepartment } from "react-icons/fc";
import ApiHeader2 from "@/Components/ApiList/ApiHeader2";
import EmptyDetailsIllustration from "./EmptyDetailsIllustration";
import "./assets/fonts/Font.css";
import BarLoader from "@/Components/Common/BarLoader";
import PropertyAddOwnerObjection from "./PropertyAddOwnerObjection";
import { FiMinusCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import BottomErrorCard from "@/Components/Common/BottomErrorCard";
import { nullToNA } from "@/Components/PowerUps/PowerupFunctions";

const ObjectionRectificationTable = (props) => {
  const navigate = useNavigate();

  const { postClericalData, getPropData, getOnwerData, getClericalDocCode } =
    apiLinks();

  const id = useParams();

  let inputStyle =
    "shadow-md bg-white focus:outline-solid rounded-sm px-4 py-1";

  let commonInputStyle = `form-control w-full px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md w-full sm:w-max`;
  let commonInputStyle2 = `form-control w-full px-3 text-xs 2xl:text-sm py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md w-max`;

  // const [cname, setcname] = useState(false)
  // const [cmobile, setcmobile] = useState(false)
  // const [caddress, setcaddress] = useState(false)
  // const [caddress, setcaddress] = useState(false)
  const [ownerData, setownerData] = useState();
  const [nameUpload, setnameUpload] = useState();
  const [json, setjson] = useState();
  // const [addressUpload, setaddressUpload] = useState();
  const [addressUpload, setaddressUpload] = useState();
  const [status, setstatus] = useState(true);
  const [nameStatus, setnameStatus] = useState(false);
  const [mobileStatus, setmobileStatus] = useState(false);
  const [addressStatus, setaddressStatus] = useState(false);
  const [clericalStatus, setclericalStatus] = useState(false);
  const [ownerDetails, setownerDetails] = useState(null);
  const [ownerId, setownerId] = useState(0);
  const [verifyStatus, setverifyStatus] = useState(false);
  const [addMember, setaddMember] = useState();
  const [ulbId, setulbId] = useState();
  const [docStatus, setdocStatus] = useState(0);
  const [openOtpScreen, setopenOtpScreen] = useState(false);
  const [nameDocList, setnameDocList] = useState();
  const [addrDocList, setaddrDocList] = useState();
  const [mobileCardStatus, setmobileCardStatus] = useState(false);
  const [otpCardStatus, setotpCardStatus] = useState(false);
  const [verifedMobileNo, setverifedMobileNo] = useState(null);
  const [erroState, seterroState] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

  useEffect(() => {
    console.log("Api Header => ", ApiHeader());
    console.log("prop id => ", id);
    setisLoading2(true);
    axios
      .post(getPropData, { propertyId: id?.id }, ApiHeader())
      .then((res) => {
        console.log("Getting owner data => ", res);
        setownerData(res?.data?.data?.owners);
        setisLoading2(false);
        setstatus(res?.data?.status);
        setulbId(res?.data?.data?.ulb_id);
      })
      .catch((err) => {
        console.log("Error getting owner data => ", err);
        setisLoading2(false);
      });
  }, []);

  const validationSchema = yup.object({
    ownerName: yup.string().when([], {
      is: () => nameStatus === true,
      then: yup.string().required("name required"),
    }),
    nameDoc: yup.mixed().when([], {
      is: () => nameStatus === true && docStatus == 1,
      then: yup.mixed().required("document required"),
    }),
    nameCode: yup.string().when([], {
      is: () => nameStatus === true && docStatus == 1,
      then: yup.string().required("select document"),
    }),
    mobileNo: yup.string().when([], {
      is: () => mobileStatus === true,
      then: yup
        .string()
        .min(10, "must be 10 digits")
        .max(10, "must be 10 digits")
        .required("mobile no. required"),
    }),
    addrCode: yup.string().when([], {
      is: () => addressStatus === true && docStatus == 1,
      then: yup.string().required("select document"),
    }),
    corrLocality: yup.string().when([], {
      is: () => addressStatus === true,
      then: yup.string().required("locality required"),
    }),
    corrCity: yup.string().when([], {
      is: () => addressStatus === true,
      then: yup.string().required("city required"),
    }),
    corrDist: yup.string().when([], {
      is: () => addressStatus === true,
      then: yup.string().required("district required"),
    }),
    corrState: yup.string().when([], {
      is: () => addressStatus === true,
      then: yup.string().required("state required"),
    }),
    corrPinCode: yup.string().when([], {
      is: () => addressStatus === true,
      then: yup
        .string()
        .min(6, "must be 6 digits")
        .max(6, "must be 6 digits")
        .required("pin code required"),
    }),
    addressDoc: yup.mixed().when([], {
      is: () => addressStatus === true && docStatus == 1,
      then: yup.mixed().required("document required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      ownerName: ownerDetails?.owner_name,
      mobileNo: ownerDetails?.mobile_no,
      corrLocality: ownerDetails?.corr_address,
      corrCity: ownerDetails?.corr_city,
      corrDist: ownerDetails?.corr_dist,
      corrState: ownerDetails?.corr_state,
      corrPinCode: ownerDetails?.corr_pin_code,
      nameCode: "",
      addrCode: "",
      nameDoc: "",
      addressDoc: "",
      objectionFor: "Clerical Mistake",
    },

    // enableReinitialize: true,

    onSubmit: (values) => {
      console.log("--4-- application data => ", values);
      submitData(values);
    },
    // validationSchema,
  });

  const submitData = (values) => {
    setisLoading2(true);
    console.log(
      "values before sending data => ",
      values,
      "\n id is => ",
      id,
      "\n address => ",
      postClericalData
    );
    let fd = new FormData();
    {
      nameStatus && fd.append("ownerName", values.ownerName);
    }
    {
      nameStatus && docStatus == 1 && fd.append("nameDoc", nameUpload);
    }
    {
      nameStatus && docStatus == 1 && fd.append("nameCode", values.nameCode);
    }
    {
      mobileStatus && fd.append("mobileNo", values.mobileNo);
    }
    if (addressStatus == true) {
      fd.append("corrAddress", values.corrLocality);
      fd.append("corrCity", values.corrCity);
      fd.append("corrDist", values.corrDist);
      fd.append("corrState", values.corrState);
      fd.append("corrPinCode", values.corrPinCode);
    }
    {
      addressStatus && docStatus == 1 && fd.append("addressDoc", addressUpload);
    }
    {
      addressStatus &&
        docStatus == 1 &&
        fd.append("addressCode", values.nameCode);
    }
    fd.append("objectionFor", values.objectionFor);
    fd.append("propId", id?.id);
    fd.append("ownerId", ownerId);
    fd.append("ulbId", ulbId);

    console.log("--2-- before fetch...", fd);

    axios
      .post(postClericalData, fd, ApiHeader2())
      .then((res) => {
        if (res?.data?.status == true) {
          console.log(
            "successfully posted application data  => ",
            res,
            "\n result data =>",
            fd
          );
          toast.success("Clerical Objection Applied Successfully !!");
          props.submitForm(res?.data?.data);
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting objection application. Please try again later.')

        }
        setisLoading2(false);

      })
      .catch((error) => {
        activateBottomErrorCard(true, 'Error occured in submitting objection application. Please try again later.')
        setisLoading2(false);
      });
  };

  useEffect(() => {
    axios
      .post(getOnwerData, { ownerId: ownerId }, ApiHeader())
      .then((res) => {
        console.log("response owner details => ", res);
        setownerDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log("error owner details => ", err);
      });
  }, [ownerId]);

  const handleChange = (e) => {
    if (e.target.name == "nameDoc") {
      let file = e.target.files[0];
      setnameUpload(e.target.files[0]);
      console.log("--1-- name file on change..", file);
    } else if (e.target.name == "addressDoc") {
      let file = e.target.files[0];
      setaddressUpload(e.target.files[0]);
      console.log("--3-- address file on change..", file);
    }
  };

  const closeModal = () => {
    props.closePopUp();
  };

  const handleButtons = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checkValue = e.target.checked;
    const index = e.target.key;

    console.log("index is => ", e.target.value);

    {
      name == "name" && checkValue == true && setnameStatus(true);
    }
    {
      name == "mobile" && checkValue == true && setmobileStatus(true);
    }
    {
      name == "address" && checkValue == true && setaddressStatus(true);
    }
    {
      name == "name" && checkValue == false && setnameStatus(false);
    }
    {
      name == "mobile" && checkValue == false && setmobileStatus(false);
    }
    {
      name == "address" && checkValue == false && setaddressStatus(false);
    }

    {
      name == "owners" && setownerId(e.target.value);
    }

    if (name == "owners") {
      if (e.target.value == null || e.target.value == "") {
        setclericalStatus(false);
        setaddMember(undefined);
      } else {
        setownerDetails(ownerData[e.target.value]);
        setclericalStatus(true);
        setaddMember(false);
      }
    }

    axios
      .post(getClericalDocCode, { doc: name }, ApiHeader())
      .then((res) => {
        console.log(`getting doc code of ${name} => `, res);
        if (name == "name") {
          setnameDocList(res?.data?.data?.masters);
        }
        if (name == "address") {
          setaddrDocList(res?.data?.data?.masters);
        }
      })
      .catch((err) =>
        console.log(`getting doc code of ${name} error => `, err)
      );
  };

  const mobileVerify = () => {
    if (
      formik.values.mobileNo >= 1000000000 &&
      formik.values.mobileNo <= 9999999999
    ) {
      setotpCardStatus(true);
      console.log("getting status from clerical in main => ", openOtpScreen);
    } else {
      toast.error("Check your mobile number !!!");
    }
  };

  // const verifyFun = () => {
  //   setverifyStatus(true)
  //   toast.success("Mobile no. verified successfully !!")
  // }

  const submitOwner = (id) => {
    props.submitForm(id);
  };

  const callback = () => {
    toast.success("Mobile no. has been verified successfully !");
    setotpCardStatus(false);
    setverifyStatus(true);
  };

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }

  if (otpCardStatus) {
    return (
      <>
        <OtpCard
          callback={callback}
          setotpCardStatus={setotpCardStatus}
          verifedMobileNo={formik.values.mobileNo}
        />
      </>
    );
  }

  return (
    <>
      {isLoading2 && <BarLoader />}
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      <ToastContainer position="top-right" autoClose={2000} />

      {/* <div className="text-right relative top-0 animate__animated animate__fadeInDown">
        <span className="bg-indigo-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4">
          <TbWebhook className="inline" /> Objection
        </span>
      </div> */}

      {ownerData != null && !isLoading2 && (
        <>
           <div className="2xl:mt-6 mt-3 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center uppercase text-base poppins mb-4 shadow-md py-2 rounded-md">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-[30px]">
                <FcDepartment />
              </span>
              <span className="font-semibold poppins 2xl:text-xl text-base sm:text-lg">
                Clerical Objection
              </span>
            </div>
          </div>

          <div className="poppins my-2 2xl:font-base text-sm">
            Under Section 167 of the Jharkhand Municipal Act 2011, citizen can file requested amendment in “Clerical origin in the name, Correspondence address and Mobile Number.
          </div>


          {/* <div className="w-full md:w-[15vw] border-b-2 mb-2"></div> */}

          <div className="bg-white py-4 shadow-sm rounded-md transition-all duration-300">

            {/* ==============Clerical Selection=============== */}

            <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:pr-4">
              {(addMember == false || addMember == undefined) && (
                <>
                  <div className="poppins px-4 mb-4 text-sm flex flex-row items-center">
                    <label
                      htmlFor="owners"
                      className="poppins sm:mr-4 font-semibold"
                    >
                      Select the owner for clerical objection :
                    </label>
                    <select
                      name="owners"
                      id="owners"
                      className={commonInputStyle + ` w-full sm:w-[10vw] poppins text-xs`}
                      onChange={handleButtons}
                    >
                      <option value={null}>--Select--</option>
                      {ownerData?.map((elem) => (
                        <>
                          <option value={elem?.id}>{elem?.owner_name}</option>
                        </>
                      ))}
                    </select>
                  </div>

                  <div className="poppins text-sm text-red-500 font-semibold flex items-center">
                    OR
                  </div>
                </>
              )}

              {!addMember && <> <div
                className="flex self-start sm:self-auto items-center w-max poppins text-xs text-gray-800 ml-4 font-semibold px-2 py-1 rounded-sm shadow-sm cursor-pointer bg-green-200 hover:bg-green-300"
                onClick={() => setaddMember(true)}
              >
                <BsPlusCircle /> &nbsp; Add SAF Owner
              </div></>}

              {addMember == true && (
                <div
                  className="flex items-center w-max poppins text-xs text-gray-800 ml-4 font-semibold px-2 py-1 rounded-sm shadow-sm cursor-pointer bg-red-200 hover:bg-red-300"
                  onClick={() => setaddMember(undefined)}
                >
                  <FiMinusCircle /> &nbsp; Cancel Adding Owners
                </div>
              )}
            </div>

            <form
              onSubmit={formik.handleSubmit}
              onChange={formik.handleChange}
              className="poppins  rounded-md py-1.5 text-sm sm:px-4 animate__animated animate__fadeIn animate__faster"
            >
              {/* ==============Owner Selection===================== */}
              {clericalStatus != false && addMember != true && (
                <div className="w-full sm:mt-0 mt-2 px-2">
                  <div className="poppins text-sm font-semibold">
                    Check the below option which you want to change ?
                  </div>

                  <div className="flex flex-row flex-wrap gap-x-16">
                    <div className="flex flex-row items-center">
                      <input
                        type="checkbox"
                        name="name"
                        id="name"
                        onChange={handleButtons}
                        className={commonInputStyle2 + ` shadow-sm`}
                      />{" "}
                      &nbsp;
                      <label
                        className="poppins 2xl:text-base text-xs"
                        htmlFor="name"
                      >
                        Name
                      </label>
                    </div>

                    <div className="flex flex-row items-center">
                      <input
                        type="checkbox"
                        name="mobile"
                        id="mobile"
                        onChange={handleButtons}
                        className={commonInputStyle + ` shadow-sm`}
                      />{" "}
                      &nbsp;
                      <label
                        className="poppins 2xl:text-base text-xs"
                        htmlFor="mobile"
                      >
                        Mobile No.
                      </label>
                    </div>

                    {ownerDetails?.corr_address != "" &&
                      ownerDetails?.corr_address != undefined && (
                        <div className="flex flex-row items-center">
                          <input
                            type="checkbox"
                            name="address"
                            id="address"
                            onChange={handleButtons}
                            className={commonInputStyle2 + ` shadow-sm`}
                          />{" "}
                          &nbsp;
                          <label
                            className="poppins 2xl:text-base text-xs"
                            htmlFor="address"
                          >
                            Corresponding Address
                          </label>
                        </div>
                      )}
                  </div>

                  <div className="w-full mb-4 mt-2">
                    {/* <div className="flex flex-wrap flex-row items-center space-x-3">
                      <label className="form-label inline-block mb-1 text-gray-00 text-sm font-semibold poppins">
                        <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                          *
                        </small>
                        For JSK: Do you want to upload documents ?{" "}
                      </label>
                      <input
                        className="w-4 sm:w-6 h-4 sm:h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                        type="radio"
                        id="docStatus"
                        name="docStatus"
                        value={1}
                        onChange={(e) => setdocStatus(e.target.value)}
                        required
                      />
                      <label
                        for="option1"
                        className=" text-sm font-medium text-gray-900 poppins"
                      >
                        Yes
                      </label>

                      <input
                        className="w-4 sm:w-6 h-4 sm:h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                        type="radio"
                        id="docStatus"
                        name="docStatus"
                        value={0}
                        onChange={(e) => setdocStatus(e.target.value)}
                        required
                      />
                      <label
                        for="option1"
                        className="text-sm font-medium text-gray-900 poppins"
                      >
                        No
                      </label>
                    </div> */}
                  </div>
                </div>
              )}

              {/* Correction Cards */}

              {/* <div className="md:float-right md:mt-8 mb-4 mx-auto">
            <img src={require('./assets/images/objection.png')} alt="" srcset="" className="w-[35vw]" />
          </div> */}

              {clericalStatus != false && addMember != true && (
                <>
                  <div className="mt-4">
                    {/* Name Card */}
                    {nameStatus && (
                      <div className="animate__animated animate__fadeIn animate__faster grid grid-cols-12 gap-y-2  text-sm px-2 sm:px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2">
                        <div className="col-span-12 md:col-span-3 poppins 2xl:text-base text-xs">
                          Name : <br />
                          <span className="font-semibold 2xl:text-base text-sm poppins">
                            {nullToNA(ownerDetails?.owner_name)}
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-3 poppins 2xl:text-base text-xs">
                          <span className="poppins  2xl:text-base text-xs">
                            Correct Name :
                          </span>{" "}
                          <br />
                          <span>
                            <input
                              type="text"
                              onChange={formik.handleChange}
                              className={
                                commonInputStyle2 +
                                ` poppins  2xl:text-base text-xs`
                              }
                              name="ownerName"
                              value={formik.values.ownerName}
                              id=""
                              placeholder="Type your correct name..."
                            />
                          </span>
                          <div className="text-red-600 text-xs">
                            {formik.touched.ownerName && formik.errors.ownerName
                              ? formik.errors.ownerName
                              : null}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-3 poppins  2xl:text-base text-xs">
                          <span className="poppins">Select Document :</span>{" "}
                          <br />
                          <span>
                            <select
                              name="nameCode"
                              onChange={formik.handleChange}
                              value={formik.values.nameCode}
                              className={
                                commonInputStyle +
                                ` poppins  2xl:text-base text-xs`
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
                          <div className="text-red-600 text-xs poppins">
                            {formik.touched.nameCode && formik.errors.nameCode
                              ? formik.errors.nameCode
                              : null}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-3 poppins flex flex-col  2xl:text-base text-xs">
                          Upload Your Name Proof : <br />
                          <span>
                            <input
                              type="file"
                              // className="font-semibold inline"
                              onChange={handleChange}
                              className={commonInputStyle + ` poppins `}
                              accept=".pdf,.jpg,.jpeg"
                              name="nameDoc"
                              id=""
                            />
                          </span>
                          {/* <span className="italic poppins text-xs text-red-400">(Adhar Card / PAN Card / Voter ID)</span> */}
                          {docStatus == 1 && (
                            <div className="text-red-600 text-xs poppins">
                              {formik.touched.nameDoc && formik.errors.nameDoc
                                ? formik.errors.nameDoc
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* MObile Card */}{" "}
                    {mobileStatus && (
                      <div className="animate__animated animate__fadeIn animate__faster grid grid-cols-12 gap-y-2  text-sm px-2 sm:px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2">
                        <div className="col-span-12 md:col-span-4 poppins 2xl:text-base text-xs">
                          Mobile No. : <br />
                          <span className="font-semibold 2xl:text-base text-sm poppins">
                            {nullToNA(ownerDetails?.mobile_no)}
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-5 poppins  2xl:text-base text-xs">
                          Correct Mobile No. : <br />
                          <span>
                            <input
                              type="number"
                              onChange={formik.handleChange}
                              className={commonInputStyle + ` poppins `}
                              disabled={verifyStatus}
                              name="mobileNo"
                              maxLength="10"
                              value={formik.values.mobileNo}
                              id=""
                              placeholder="Type your correct mobile No...."
                            />
                          </span>{" "}
                          <span>
                            <div
                              className={
                                (verifyStatus
                                  ? `bg-green-500 hover:bg-green-600`
                                  : `bg-red-500 hover:bg-red-600`) +
                                ` cursor-pointer w-max mt-2 sm:mt-0 block sm:inline poppins px-2 py-1 rounded-md text-white 2xl:text-base text-xs`
                              }
                              onClick={() => mobileVerify()}
                            >
                              {verifyStatus ? <>Verified</> : <>Verify</>}
                            </div>
                          </span>
                          <div className="text-red-600 text-xs">
                            {formik.touched.mobileNo && formik.errors.mobileNo
                              ? formik.errors.mobileNo
                              : null}
                          </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 poppins text-red-600 text-xs flex items-center">
                          {!verifyStatus && (
                            <>Verify your mobile no. to submit the form.</>
                          )}
                        </div>
                      </div>
                    )}
                    {/* Address Card */}{" "}
                    {addressStatus &&
                      ownerDetails?.corr_address == "" ||
                      ownerDetails?.corr_address == undefined && (
                        <div className="animate__animated animate__fadeIn animate__faster grid grid-cols-12 gap-y-2 gap-x-2 sm:gap-x-0 text-sm px-2 sm:px-6 py-2 mt-2 shadow-sm font-base poppins bg-zinc-50 rounded-sm mb-2">
                          <div className="col-span-12 md:col-span-3 poppins pr-4  2xl:text-base text-xs">
                            Corresponding Address : <br />
                            <span className="font-semibold 2xl:text-base text-sm poppins">
                              {nullToNA(ownerDetails?.corr_address)},{" "}
                              {nullToNA(ownerDetails?.corr_city)},{" "}
                              {nullToNA(ownerDetails?.corr_dist)},{" "}
                              {nullToNA(ownerDetails?.corr_state)},{" "}
                              {nullToNA(ownerDetails?.corr_pin_code)}
                            </span>
                          </div>
                          <div className="col-span-12 md:col-span-3 poppins  2xl:text-base text-xs">
                            <span className="poppins">Select Document :</span>{" "}
                            <br />
                            <span>
                              <select
                                name="addrCode"
                                onChange={formik.handleChange}
                                value={formik.values.addrCode}
                                className={
                                  commonInputStyle +
                                  ` poppins  2xl:text-base text-xs`
                                }
                              >
                                <option value="" selected>
                                  Select
                                </option>
                                {addrDocList?.map((elem) => (
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
                            <div className="text-red-600 text-xs poppins">
                              {formik.touched.addrCode && formik.errors.addrCode
                                ? formik.errors.addrCode
                                : null}
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-3 poppins flex flex-col  2xl:text-base text-xs">
                            Upload Your Address Proof : <br />
                            <span>
                              <input
                                type="file"
                                // className="font-semibold inline"
                                className={commonInputStyle + ` poppins `}
                                onChange={handleChange}
                                accept=".pdf,.jpg,.jpeg"
                                name="addressDoc"
                                id=""
                              />
                            </span>
                            {/* <span className="italic poppins text-xs text-red-400">(Adhar Card / PAN Card / Voter ID)</span> */}
                            {docStatus == 1 && (
                              <div className="text-red-600 text-xs poppins">
                                {formik.touched.addressDoc &&
                                  formik.errors.addressDoc
                                  ? formik.errors.addressDoc
                                  : null}
                              </div>
                            )}
                          </div>

                          <div className="col-span-6 sm:col-span-3 my-1.5">
                            <label
                              htmlFor=""
                              className="poppins  2xl:text-base text-xs"
                            >
                              Locality :{" "}
                            </label>
                            <input
                              type="text"
                              name="corrLocality"
                              id=""
                              value={formik.values.corrLocality}
                              className={commonInputStyle + ` poppins `}
                              placeholder="Enter locality"
                            />
                            <div className="text-red-600 text-xs">
                              {formik.touched.corrLocality &&
                                formik.errors.corrLocality
                                ? formik.errors.corrLocality
                                : null}
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 my-1.5">
                            <label
                              htmlFor=""
                              className="poppins  2xl:text-base text-xs"
                            >
                              City :{" "}
                            </label>
                            <input
                              type="text"
                              name="corrCity"
                              id=""
                              value={formik.values.corrCity}
                              className={commonInputStyle + ` poppins `}
                              placeholder="Enter city"
                            />
                            <div className="text-red-600 text-xs">
                              {formik.touched.corrCity && formik.errors.corrCity
                                ? formik.errors.corrCity
                                : null}
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 my-1.5">
                            <label
                              htmlFor=""
                              className="poppins  2xl:text-base text-xs"
                            >
                              Dist :{" "}
                            </label>
                            <input
                              type="text"
                              name="corrDist"
                              id=""
                              value={formik.values.corrDist}
                              className={commonInputStyle + ` poppins `}
                              placeholder="Enter district"
                            />
                            <div className="text-red-600 text-xs">
                              {formik.touched.corrDist && formik.errors.corrDist
                                ? formik.errors.corrDist
                                : null}
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 my-1.5">
                            <label
                              htmlFor=""
                              className="poppins  2xl:text-base text-xs"
                            >
                              State :{" "}
                            </label>
                            <input
                              type="text"
                              name="corrState"
                              id=""
                              value={formik.values.corrState}
                              className={commonInputStyle + ` poppins `}
                              placeholder="Enter State"
                            />
                            <div className="text-red-600 text-xs">
                              {formik.touched.corrState &&
                                formik.errors.corrState
                                ? formik.errors.corrState
                                : null}
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3 my-1.5">
                            <label
                              htmlFor=""
                              className="poppins  2xl:text-base text-xs"
                            >
                              Pin Code :{" "}
                            </label>
                            <input
                              type="number"
                              maxLength={6}
                              value={formik.values.corrPinCode}
                              name="corrPinCode"
                              id=""
                              className={commonInputStyle + ` poppins `}
                              placeholder="Enter pin code"
                            />
                            <div className="text-red-600 text-xs">
                              {formik.touched.corrPinCode &&
                                formik.errors.corrPinCode
                                ? formik.errors.corrPinCode
                                : null}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* NOte */}
                  {(nameStatus || addressStatus) && (
                    <div className="mt-4 text-xs text-red-600 italic">
                      {" "}
                      Note : Only .pdf , .jpg and .jpeg file accepted..
                    </div>
                  )}
                </>
              )}

              {/* Buttons */}
              {addMember != true && (
                <div className="flex flex-row flex-wrap justify-between items-center mt-4 w-full">
                  <div
                    // onClick={() => navigate(`/objection/${id}`)}
                    onClick={props.closePopUp}
                    className="px-3 py-1.5 2xl:px-6 2xl:py-2.5 cursor-pointer bg-blue-600 text-white font-medium text-xs  poppins rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Close
                  </div>
                  <div>
                    {(nameStatus || addressStatus) && !mobileStatus && (
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-3 py-1.5 2xl:px-6 2xl:py-2.5 text-white font-medium text-xs  poppins  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    )}
                    {mobileStatus && (
                      <button
                        type="submit"
                        disabled={!verifyStatus}
                        className={
                          (verifyStatus
                            ? `bg-green-600 hover:bg-green-700`
                            : `bg-zinc-600 hover:bg-zinc-700 cursor-not-allowed`) +
                          ` px-3 py-1.5 2xl:px-6 2xl:py-2.5 text-white font-medium text-xs  poppins  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out`
                        }
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* ===============Add Member============ */}
          {addMember == true && (
            <PropertyAddOwnerObjection
              closePopUp={props.closePopUp}
              id={id?.id}
              submit={submitOwner}
            />
          )}
        </>
      )}

      {ownerData == null && !isLoading2 && (
        <>
          <EmptyDetailsIllustration
            title={"Oops !! No Clerical Details Found !!"}
            location={closeModal}
          />
        </>
      )}

      {/* ===========OTP Screen=========== */}
      {/* <OtpScreenLinkConnectPage
        id={3}
        openOtpScreen={openOtpScreen}
        verifyFun={verifyFun}
        closeOtpScreen={() => setopenOtpScreen(false)}
      /> */}
    </>
  );
};

export default ObjectionRectificationTable;

///////////////////////////////////////////////////////////////////
// Export to : ObjectionRectification.js
///////////////////////////////////////////////////////////////////
