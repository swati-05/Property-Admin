////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : Worflow Master
////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import PaymentApiList from "@/Pages/PaymentMaster/PaymentApiList";
import "../../fonts.css";
import apiList from "../../Common/ApiList";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { toast, ToastContainer } from "react-toastify";
import { contextVar } from "../../Common/Context/Context";
import { useContext } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
  },
};

function AddNewWorkflowRoleModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const { wfRoleAdd, wfListByUlb } = apiList();

  const [wfList, setwfList] = useState();

  const { ulbListApi } = PaymentApiList();

  const validationSchema = yup.object({
    workflowName: yup.string().required("Select workflow name"),
    ulbName: yup.string().required("Select ULB name"),
    roleName: yup.string().required("Select role name"),
    // isInitiator: yup.boolean().required("This field is required"),
    // isFinisher: yup.boolean().required("This field is required"),
    allowFullList: yup.boolean().required("This field is required"),
    canEscalate: yup.boolean().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      workflowName: "",
      ulbName: "",
      roleName: "",
      fdRoleName: "",
      bdRoleName: "",
      isInitiator: "",
      isFinisher: "",
      isBtc : '',
      canViewDocument : '',
      canUploadDocument : '',
      canVerifyDocument: '',
      allowFreeCommunication : '',
      allowFullList: "",
      canEscalate: "",
      canForward : "",
      canBackward: '',
      showFieldVerification : '',
      isPseudo : '',
      serialNo : ''
    },
    onSubmit: (values) => {
      console.log("ulb wf values => ", values);
      saveRecord(values);
    },
    validationSchema,
  });

  const handleworkflowName = (e) =>
    (formik.values.workflowName = e.target.value);
  // const handleulbName = e => formik.values.ulbName = e.target.value

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const saveRecord = (data) => {
    const payload = {
      workflowId: data.workflowName,
      // ulbId : data.ulbName,
      wfRoleId: data.roleName,
      forwardRoleId: data.fdRoleName,
      backwardRoleId: data.bdRoleName,
      isInitiator: data.isInitiator,
      isFinisher: data.isFinisher,
      isBtc : data.isBtc,
      canViewDocument : data.canViewDocument,
      canUploadDocument : data.canUploadDocument,
      canVerifyDocument : data.canVerifyDocument,
      allowFreeCommunication : data.allowFreeCommunication,
      allowFullList: data.allowFullList,
      canEscalate: data.canEscalate,
      canForward : data.canForward,
      canBackward : data.canBackward,
      isPseudo : data.isPseudo,
      showFieldVerification : data.showFieldVerification,
      serialNo : data.serialNo
    };

    console.log("unique Data to be saved ulb wf", payload);

    axios
      .post(wfRoleAdd, payload, header)
      .then((res) => {
        toast.success("Workflow Role Map added successfully !!");
        console.log("unique success => ", res);
        closeModal();
        setrefresh(refresh+1)
      })
      .catch((err) => {
        toast.success("Failed to add the workflow role map !!");
        console.log("unique error getting => ", err);
        closeModal();
      });

  };

  useEffect(() => {
    if (props.openAddNewWorkflowRoleModal > 0) setIsOpen(true);
  }, [props.openAddNewWorkflowRoleModal]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
   
  }

  const handleulbName = (e) => {
    axios
      .post(wfListByUlb, { ulbId: e.target.value }, ApiHeader())
      .then((res) => {
        console.log("getting wf list by ulb => ", res);
        setwfList(res?.data?.data);
      })
      .catch((err) => {
        console.log("error getting wf list by id => ", err);
      });
  };

  return (
    <>
      <div className="">
        {/* <button className='border bg-yellow-300' onClick={openModal}>Open Modal</button> */}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="bg-indigo-300 shadow-2xl p-5 mx-auto rounded-md poppins md:w-[50%]">
            <div className="flow-root">
              <p className="float-left text-center text-lg font-semibold">
                Add Workflow Role Map{" "}
              </p>
              <p
                onClick={closeModal}
                className="float-right cursor-pointer rounded-full bg-red-200 hover:bg-red-300 mx-3"
              >
                {" "}
                <GrFormClose size={25} />{" "}
              </p>
            </div>

            <p className="border-b py-1 mb-3"></p>
            <div>
              <form
                onSubmit={formik.handleSubmit}
                onChange={formik.handleChange}
                className='md:grid md:grid-cols-3 md:gap-6 gap-2 flex flex-col flex-wrap'
              >

              <div>
              <label className="form-label inline-block  text-gray-700 text-sm font-semibold">
                    Serial No.<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="serialNo"
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    type="number"
                    />
                  <p className="text-red-500 text-xs">
                    {formik.touched.serialNo && formik.errors.serialNo
                      ? formik.errors.serialNo
                      : null}
                  </p>
              </div>
                
                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm font-semibold">
                    ULB Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="ulbName"
                    onChange={handleulbName}
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                  >
                    <option selected disabled>
                      --Select--
                    </option>
                    {props?.ulbList?.map((elem) => (
                      <>
                        <option value={elem?.id}>{elem?.ulb_name}</option>
                      </>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">
                    {formik.touched.ulbName && formik.errors.ulbName
                      ? formik.errors.ulbName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Workflow Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    type="text"
                    name="workflowName"
                    // onChange={handleulbName}
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                  >
                    <option selected disabled>
                      --Select--
                    </option>
                    {wfList?.map((elem) => (
                      <>
                        <option value={elem?.id}>{elem?.workflow_name}</option>
                      </>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">
                    {formik.touched.workflowName && formik.errors.workflowName
                      ? formik.errors.workflowName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Role Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    type="text"
                    name="roleName"
                    // onChange={handleulbName}
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                  >
                    <option selected disabled>
                      --Select--
                    </option>
                    {props?.roleList?.map((elem) => (
                      <>
                        <option value={elem?.id}>{elem?.role_name}</option>
                      </>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">
                    {formik.touched.roleName && formik.errors.roleName
                      ? formik.errors.roleName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Forward Role Name
                  </label>
                  <select
                    type="text"
                    name="fdRoleName"
                    // onChange={handleulbName}
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                  >
                    <option selected disabled>
                      --Select--
                    </option>
                    {props?.roleList?.map((elem) => (
                      <>
                        <option value={elem?.id}>{elem?.role_name}</option>
                      </>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">
                    {formik.touched.fdRoleName && formik.errors.fdRoleName
                      ? formik.errors.fdRoleName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Backward Role Name
                  </label>
                  <select
                    type="text"
                    name="bdRoleName"
                    // onChange={handleulbName}
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                  >
                    <option selected disabled>
                      --Select--
                    </option>
                    {props?.roleList?.map((elem) => (
                      <>
                        <option value={elem?.id}>{elem?.role_name}</option>
                      </>
                    ))}
                  </select>
                  <p className="text-red-500 text-xs">
                    {formik.touched.bdRoleName && formik.errors.bdRoleName
                      ? formik.errors.bdRoleName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Is Initiator<span className="text-red-500">*</span>
                  </label>
<div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isInitiator" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isInitiator" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.isInitiator && formik.errors.isInitiator
                      ? formik.errors.isInitiator
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Is Finisher<span className="text-red-500">*</span>
                  </label>
<div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isFinisher" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isFinisher" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.isFinisher && formik.errors.isFinisher
                      ? formik.errors.isFinisher
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Is BTC<span className="text-red-500">*</span>
                  </label>
<div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isBtc" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isBtc" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.isBtc && formik.errors.isBtc
                      ? formik.errors.isBtc
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Can View Document
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canViewDocument" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canViewDocument" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canViewDocument && formik.errors.canViewDocument
                      ? formik.errors.canViewDocument
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Can Upload Document
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canUploadDocument" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canUploadDocument" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canUploadDocument && formik.errors.canUploadDocument
                      ? formik.errors.canUploadDocument
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Can Verify Document
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canVerifyDocument" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canVerifyDocument" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canVerifyDocument && formik.errors.canVerifyDocument
                      ? formik.errors.canVerifyDocument
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Allow Free Communication
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="allowFreeCommunication" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="allowFreeCommunication" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.allowFreeCommunication && formik.errors.allowFreeCommunication
                      ? formik.errors.allowFreeCommunication
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Allow Full List
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                  <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="allowFullList" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="allowFullList" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>
                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.allowFullList && formik.errors.allowFullList
                      ? formik.errors.allowFullList
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Allow Escalate<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canEscalate" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canEscalate" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canEscalate && formik.errors.canEscalate
                      ? formik.errors.canEscalate
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Can Forward<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canForward" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canForward" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canForward && formik.errors.canForward
                      ? formik.errors.canForward
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Can Backward<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canBackward" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="canBackward" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.canBackward && formik.errors.canBackward
                      ? formik.errors.canBackward
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Pseudo User Permission<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isPseudo" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isPseudo" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.isPseudo && formik.errors.isPseudo
                      ? formik.errors.isPseudo
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block  text-gray-700 text-sm  font-semibold">
                    Show Field Verification Permission<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="showFieldVerification" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="showFieldVerification" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                  <p className="text-red-500 text-xs">
                    {formik.touched.showFieldVerification && formik.errors.showFieldVerification
                      ? formik.errors.showFieldVerification
                      : null}
                  </p>
                </div>

                <div className="flex justify-center col-span-3">
                  <button
                    type="submit"
                    className="rounded-md bg-green-300 hover:bg-green-400  hover:text-black shadow-lg  py-1 text-sm px-3 m-3"
                  >
                    {" "}
                    Add{" "}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default AddNewWorkflowRoleModal;
