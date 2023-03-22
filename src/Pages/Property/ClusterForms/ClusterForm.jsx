//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ClusterForm
// Description : Cluster Add and View Component
//////////////////////////////////////////////////////////////////////

import React from "react";
import { RiBuilding2Fill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import apiList from "@/Components/ApiList/ClusterFormApi";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ClusterForm = (props) => {
  // ===========Navigate Constant================
  const navigate = useNavigate();

  // ===========Destructing Api==================
  const { addCluster, updateCluster } = apiList();

  // ==============Form Validation=====================
  const validationSchema = yup.object({
    clusterName: yup.string().required("Enter name"),
    clusterType: yup.string().required("Select type"),
    clusterAddress: yup.string().required("Enter address"),
    clusterMobileNo: yup
      .number().typeError('must be number')
      .min(1000000000, "not valid")
      .max(9999999999, 'not valid')
      .required("Enter mobile no."),
    clusterAuthPersonName: yup
      .string()
      .required("Select authorized person name"),
  });

  // ================Checking data in console===============
  useEffect(() => {
    console.log(
      "user Data => ",
      props?.userData,
      "\n and edit state => ",
      props?.editState,
      "\n and index is => ",
      props?.userId
    );
  });

  // ==========Formik================
  const formik = useFormik({
    initialValues: {
      id: props?.userData?.id,
      clusterName: props?.userData?.cluster_name,
      clusterType: props?.userData?.cluster_type,
      clusterAddress: props?.userData?.address,
      clusterMobileNo: props?.userData?.mobile_no,
      clusterAuthPersonName: props?.userData?.authorized_person_name,
    },

    onSubmit: (values) => {
      console.log("--1-- concession form data => ", values);
      // =========Calling submit function==============
      submitForm(values);
    },
    validationSchema,
  });

  // ============Submit function=======================
  const submitForm = (values) => {
    console.log("--2-- before fetch data => ", values);

    // ===========post data with condition===================
    {
      props?.editState
        ? // ============axios to update data=====================
          axios
            .post(updateCluster, values, ApiHeader())
            .then((res) => {
              console.log("--3-- form updated successfully \n data => ", res);
              toast.success("Updated Successfully");
              props.backFun();
              props.refresh()
            })
            .catch((err) => console.log("--3-- form updation error => ", err))
        : // =============axios to add data=======================
          axios
            .post(addCluster, values, ApiHeader())
            .then((res) => {
              console.log("--3-- form added successfully \n data => ", res);
              props.backFun();
              toast.success("Added Successfully");
              props.refresh()
            })
            .catch((err) => console.log("--3-- form addition error => ", err));
    }
  };

  return (
    <>
      {/* ==============For toastify================ */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ================Heading=================== */}
      <h1 className="mt-6 mb-2 mx-6 font-serif font-semibold absolute text-gray-600">
        <RiBuilding2Fill className="inline mr-2" />
        Cluster Form
      </h1>

      {/* ================Form======================== */}
      <div className=" block mt-[4rem] md:mt-[5rem] p-4 w-full md:py-6 md:px-14 shadow-lg bg-white mx-auto border border-gray-200">
        <form onSubmit={formik.handleSubmit} className="text-xs">
          <div className="grid grid-cols-12 md:gap-x-8 gap-y-6">
            {/* =================Name================== */}
            <div className="md:col-span-4 col-span-12">
              <label className="form-label inline-block mb-1 text-gray-600 font-semibold">
                <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Name
              </label>
              <input
                type="text"
                value={formik.values.clusterName}
                onChange={formik.handleChange}
                name="clusterName"
                className="form-control block w-[80%] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                placeholder="Enter your name.."
              />
               <span className="text-red-600 absolute text-xs">
                {formik.touched.clusterName || formik.errors.clusterName
                  ? formik.errors.clusterName
                  : null}
              </span>
            </div>

            {/* ================Type=================== */}
            <div className="md:col-span-4 col-span-12">
              <label className="form-label inline-block mb-1 text-gray-600 font-semibold">
                <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Type
              </label>
              <select
                value={formik.values.clusterType}
                onChange={formik.handleChange}
                name="clusterType"
                className="form-control block w-[80%] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
              >
                <option value="" disabled selected>
                  --Select Type--
                </option>
                <option value="c-saf">C-SAF</option>
                <option value="gb-saf">GB-SAF</option>
              </select>
              <span className="text-red-600 absolute text-xs">
                {formik.touched.clusterType || formik.errors.clusterType
                  ? formik.errors.clusterType
                  : null}
              </span>
            </div>

            {/* ==================Address======================= */}
            <div className="md:col-span-4 col-span-12">
              <label className="form-label inline-block mb-1 text-gray-600 font-semibold">
                <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Address
              </label>
              <input
                value={formik.values.clusterAddress}
                onChange={formik.handleChange}
                type="text"
                name="clusterAddress"
                className="form-control block w-[80%] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                placeholder="Enter your address.."
              />
              <span className="text-red-600 absolute text-xs">
                {formik.touched.clusterAddress || formik.errors.clusterAddress
                  ? formik.errors.clusterAddress
                  : null}
              </span>
            </div>

            {/* ==========================Mobile No============================== */}
            <div className="md:col-span-4 col-span-12">
              <label className="form-label inline-block mb-1 text-gray-600 font-semibold">
                <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Mobile No.
              </label>
              <input
                value={formik.values.clusterMobileNo}
                onChange={formik.handleChange}
                type="text"
                maxLength={10}
                name="clusterMobileNo"
                className="form-control block w-[80%] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                placeholder="Enter your mobile no..."
              />
              <span className="text-red-600 absolute text-xs">
                {formik.touched.clusterMobileNo || formik.errors.clusterMobileNo
                  ? formik.errors.clusterMobileNo
                  : null}
              </span>
            </div>

            {/* ========================Authorized Person Name============================ */}
            <div className="md:col-span-4 col-span-12">
              <label className="form-label inline-block mb-1 text-gray-600 font-semibold">
                <small className=" mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Authorized Person Name
              </label>
              <input
                value={formik.values.clusterAuthPersonName}
                onChange={formik.handleChange}
                type="text"
                name="clusterAuthPersonName"
                className="form-control block w-[80%] px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                placeholder="Enter authorized person name.."
              />
              <span className="text-red-600 absolute text-xs">
                {formik.touched.clusterAuthPersonName || formik.errors.clusterAuthPersonName
                  ? formik.errors.clusterAuthPersonName
                  : null}
              </span>
            </div>

            {/* ==============Buttons================== */}
            <div className="col-span-6">
              {/* ===================Back Button====================== */}
              <button
                onClick={props.backFun}
                type="button"
                className="md:mt-1.5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Back
              </button>
            </div>

            {/* ============Add and Update common button====================== */}
            <div className="col-span-6 text-end">
              <button
                type="submit"
                className="md:mt-2 px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                {props.editState ? <>Update</> : <>Add</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

////////////////////////////////////////////////////
// Export to : ClusterTable.js