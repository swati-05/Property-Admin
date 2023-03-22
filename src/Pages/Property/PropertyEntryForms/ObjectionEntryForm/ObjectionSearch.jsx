//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ObjectionSearch
// Description : Concession entry form Index page
//////////////////////////////////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbWebhook } from "react-icons/tb";
import "animate.css";
import { useFormik } from "formik";
import * as yup from "yup";
import apiLinks from "@/Components/ApiList/ConcessionApi";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { RiBuilding2Fill } from "react-icons/ri";
import "animate.css";
import { ColorRing } from "react-loader-spinner";
import ObjectionIndex from "./ObjectionIndex";
import { contextVar } from "@/Components/Context/Context";

function ObjectionSearch() {
  const [index, setindex] = useState(0);
  const [access, setaccess] = useState(false);
  const [loader, setloader] = useState(false);
  const [wardId, setwardId] = useState();

  const { postHolding, wardList } = apiLinks();

  const { setpropId } = useContext(contextVar);

  const validationSchema = yup.object({
    holdingNo: yup.string().required("Enter holding number"),
    wardId: yup.string().required("Enter ward no."),
  });

  useEffect(() => {
    setloader(true);
    axios
      .get(wardList, ApiHeader())
      .then((res) => {
        console.log("getting all ward list => ", res);
        setwardId(res?.data?.data);
        setloader(false);
      })
      .catch((err) => {
        console.log("error getting all ward list => ", err);
        toast.error("Something went Wrong");
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      holdingNo: "",
      wardId: "",
    },

    onSubmit: (values) => {
      console.log("--1-- holding no. => ", values);
      submitHoldingNo(values);
    },
    validationSchema,
  });

  console.log("updattion status => ", access);

  const submitHoldingNo = (values) => {
    console.log("--2-- entering to submit function values => ", values);
    console.log("header", ApiHeader());
    setloader(true);
    axios
      .post(postHolding, values, ApiHeader())
      .then((res) => {
        console.log("--3-- holding no. submitted", res);
        setpropId(res?.data?.data?.id);
        if (res?.data?.status == true) {
          console.log("index no. => ", index);
          toast.success("Found successfully...");
          setaccess(true);
          setloader(false);
        } else if (res?.data?.status == false) {
          toast.error("Not found ...");
          setaccess(false);
          setloader(false);
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log("--3-- holding submission error => ", err);
        toast.error("Something went wrong !!");
        setloader(false);
      });
  };

  const backFun = () => {
    setaccess(false);
    formik.setFieldValue("holdingNo", "");
  };

  // ================================================== Old Code ================================================================//
  const [formIndex, setFormIndex] = useState(1); //formindex specifies type of form like basicdetails at index 1 ...
  const [animateform1, setAnimateform1] = useState("translate-x-0"); //slide animation control state for BasicDetails form
  const [animateform2, setAnimateform2] = useState("pl-20 translate-x-full"); //slide animation control state for PropertyAddressDetails form
  const [animateform3, setAnimateform3] = useState("pl-20 translate-x-full"); //slide animation control state for ElectricityWaterDetails form
  const [animateform4, setAnimateform4] = useState("pl-20 translate-x-full"); //slide animation control state for OwnerDetails form
  const [animateform5, setAnimateform5] = useState("pl-20 translate-x-full"); //slide animation control state for FloorDetails form
  const [submitStatus, setSubmitStatus] = useState(false); //checking full form filled status to toggle final submit button
  const [allFormData, setAllFormData] = useState({});

  const backFunD = (formIndex) => {
    let tempFormIndex = formIndex;
    if (tempFormIndex == 2) {
      //backward by current form index 2
      setFormIndex(1); // go to form index 1 since back from index 2
      setAnimateform1("translate-x-0"); // always setstate one index less than current index
      setAnimateform2("pl-20 translate-x-full"); //always current index setstate
    }
    if (tempFormIndex == 3) {
      setFormIndex(2);
      setAnimateform2("translate-x-0");
      setAnimateform3("pl-20 translate-x-full");
    }
    if (tempFormIndex == 4) {
      setFormIndex(3);
      setAnimateform3("translate-x-0");
      setAnimateform4("pl-20 translate-x-full");
    }
    if (tempFormIndex == 5) {
      setFormIndex(4);
      setAnimateform4("translate-x-0");
      setAnimateform5("pl-20 translate-x-full");
    }
  };
  const nextFun = (formIndex) => {
    let tempFormIndex = formIndex;
    if (tempFormIndex == 1) {
      //forward by current form index 1
      setFormIndex(2); //go to form index 2 since forward from index 1
      setAnimateform1(" -translate-x-full right-80"); //always current index setstate
      setAnimateform2("pl-0 translate-x-0"); // always setstate one index greater than current index
    }
    if (tempFormIndex == 2) {
      setFormIndex(3);
      setAnimateform2("-translate-x-full right-80");
      setAnimateform3("pl-0 translate-x-0");
    }
    if (tempFormIndex == 3) {
      setFormIndex(4);
      setAnimateform3("-translate-x-full right-80");
      setAnimateform4("pl-0 translate-x-0");
    }
    if (tempFormIndex == 4) {
      setFormIndex(5);
      setAnimateform4("-translate-x-full right-80");
      setAnimateform5("pl-0 translate-x-0");
    }
  };
  //activating notification if no owner or no floor added
  const notify = (toastData) => {
    toast.dismiss();
    toast.error(toastData);
  };

  //
  const submitButtonToggle = () => {
    setSubmitStatus(true);
  };

  const collectAllFormData = (key, formData) => {
    console.log("prev Data", allFormData);
    // setAllFormData({...allFormData,formData}) //this is going to replace upcoming data since has same formData key all the time
    setAllFormData({ ...allFormData, [key]: formData });
  };

  // ================================================================================================================================

  console.log("all form data ", allFormData);
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="text-right relative top-0 animate__animated animate__fadeInDown">
        <span className="bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4">
          <TbWebhook className="inline" /> Objection
        </span>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="mt-6">
        {access ? (
          <ObjectionIndex backFun={backFun} index={index} />
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            onChange={formik.handleChange}
            className="animate__animated animate__fadeInDown flex flex-wrap flex-col md:flex-row md:space-x-4  md:items-center md:justify-evenly justify-center items-evenly border-t-2 border-l-2 border-zinc-100 rounded-md shadow-lg py-3 pb-6 bg-sky-100 hover:bg-sky-200 transition-all duration-300 px-4 w-[100%] md:w-[80rem]"
          >
            <div className="md:w-[35%] w-full">
              <label
                className="form-label inline-block mt-2 text-gray-600 text-sm font-semibold"
                htmlFor="wardId"
              >
                Select Ward No. :{" "}
              </label>

              <div>
                <select
                  name="wardId"
                  id="wardId"
                  className="form-control block w-full px-3 py-1.5 md:py-1 md:text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md text-sm"
                >
                  <option value="" selected disabled>
                    ---Select---
                  </option>
                  {wardId?.map((elem) => (
                    <>
                      <option value={elem?.wardName}>{elem?.wardName}</option>
                    </>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:w-[35%] w-full">
              <label
                className="form-label inline-block mt-2 text-gray-600 text-sm font-semibold"
                htmlFor="holdingNo"
              >
                Holding No. :{" "}
              </label>

              <div>
                <input
                  type="text"
                  name="holdingNo"
                  id="holdingNo"
                  maxLength={15}
                  className="form-control block w-full px-3 py-1.5 md:py-1 md:text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md text-sm"
                />
              </div>
            </div>

            <div className="mt-4 w-[20%]">
              <button
                type="submit"
                className=" px-6 py-2.5 bg-blue-600 text-white mt-4 font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        )}
      </div>

      {loader && (
        <div className="w-full z-10  mx-auto text-center flex justify-center items-center">
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

      {/* ==================================================== Old Code ================================================================== */}
      {/* <div className={`${animateform1} transition-all relative`}>
        <ConcessionForm
          collectFormDataFun={collectAllFormData}
          submitFun={submitButtonToggle}
          toastFun={notify}
          backFun={backFun}
          nextFun={nextFun}
        />
      </div> */}
      {/* collectDataFun to receive form data on every save&next */}
      {/* submitFun to activate final submit button when all form is filled */}
      {/* toastFun to activate toast notification via receiving toast message */}
      {/* backFun to go back from any specific form level */}
      {/* nextFun to go next from any specific form level */}

      {/* {submitStatus && (
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="absolute bottom-40 mx-auto px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-blue-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit Form <ImUpload2 className="inline text-xl" />
          </button>
        </div>
      )} */}
      {/* ========================================================================================================================== */}
    </>
  );
}

export default ObjectionSearch;

//////////////////////////////////////////////
// Export to : App.js
//////////////////////////////////////////////
