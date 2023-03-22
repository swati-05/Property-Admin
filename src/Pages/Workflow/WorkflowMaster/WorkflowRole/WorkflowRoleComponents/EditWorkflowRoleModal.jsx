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
import '../../fonts.css'
import apiList from "../../Common/ApiList";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import {toast, ToastContainer} from 'react-toastify'
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

function EditWorkflowRoleModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  let mapId = props?.editWorkflowId?.id;

  const {wfRoleListById, wfRoleUpdate, wfListByUlb} = apiList()

  const [tempData, settempData] = useState()
  const [wfList, setwfList] = useState()

   useEffect(() => {
    axios.post(wfRoleListById, {id: props?.editWorkflowId?.id}, ApiHeader())
    .then((res) => {
      console.log("incoming data wf role => ", res)
      settempData(res?.data?.data)
    })
    .catch((err) => {
      console.log("incoming data error => ", err)
    })
  },[props?.editWorkflowId])

  const validationSchema = yup.object({
    // workflowName: yup.string().required("Select workflow name"),
    // ulbName: yup.string().required("Select ULB name"),
    roleName: yup.string().required("Select role name"),
    // isInitiator: yup.boolean().required("This field is required"),
    // isFinisher: yup.boolean().required("This field is required"),
    allowFullList: yup.boolean().required("This field is required"),
    canEscalate: yup.boolean().required("This field is required")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workflowName: tempData?.workflow_id,
      // ulbName: tempData?.ulb_id,
      roleName: tempData?.wf_role_id,
      fdRoleName: tempData?.forward_role_id,
      bdRoleName: tempData?.backward_role_id,
      isInitiator: tempData?.is_initiator,
      isFinisher: tempData?.is_finisher,
      isBtc : tempData?.is_btc,
      canViewDocument : tempData?.can_view_document,
      canUploadDocument : tempData?.can_upload_document,
      canVerifyDocument: tempData?.can_verify_document,
      allowFreeCommunication : tempData?.allow_free_communication,
      allowFullList: tempData?.allow_full_list,
      canEscalate: tempData?.can_escalate,
      canForward : tempData?.can_forward,
      canBackward: tempData?.can_backward,
      showFieldVerification : tempData?.show_field_verification,
      serialNo : tempData?.serial_no,
      isPseudo : tempData?.is_pseudo
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      updateRecord(values);
    },
    // validationSchema,
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const updateRecord = (data) => {
    console.log("Data to be Update", data);

    console.log("WorkflowId=======", mapId);

    const payload = {
      id: mapId,
      workflowId: data.workflowName,
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

    console.log("data before post => ", payload)

    axios
      .post(wfRoleUpdate, payload, header)
      .then((res) => {
        toast.success("Workflow Role Map updated successfully !!")
        closeModal2()
        setrefresh(refresh+1)
      })
      .catch(
        (err) => (toast.success("Failed to Update the Workflow Role Map !!"), closeModal2())
      );

      // refreshFun()
  };

  // const refreshFun = () => {
  //   console.log('refresh 0')
  //   setTimeout(props.refetchListOfworkflows,5000)
  //  }

  useEffect(() => {
    axios.post(wfListByUlb, {ulbId : tempData?.ulb_id}, ApiHeader())
    .then((res) => {
      console.log("getting wf list by ulb => ", res)
      setwfList(res?.data?.data)
      props.refetchListOfWorkflows()
    })
    .catch((err) => {
      console.log("error getting wf list by id => ", err)
    })
  },[tempData])

  useEffect(() => {
    if (props.openModelForEdit > 0) setIsOpen(true);
  }, [props.openModelForEdit]);

  function afterOpenModal() {}

  function closeModal2() {
    setIsOpen(false);
  }

  return (<>
    <div className="">
      
       <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-indigo-300 shadow-2xl p-5 mx-auto rounded-md poppins w-[50%]">
          <div className="flow-root">
            <p className="float-left text-center text-lg font-semibold">
            Edit Workflow Role Map : {mapId}{" "}
            </p>
            <p
              onClick={closeModal2}
              className="float-right cursor-pointer rounded-full bg-red-200 hover:bg-red-300 mx-3"
            >
              {" "}
              <GrFormClose size={25} />{" "}
            </p>
          </div>

          <p className="border-b py-1 mb-3"></p>
          <div>
            
            <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className='md:grid md:grid-cols-3 md:gap-6 gap-2 flex flex-col flex-wrap'>
            
            <div>
            <label className="form-label inline-block text-gray-700 text-sm font-semibold">Serial No.<span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name="serialNo"
                                    value={formik.values.serialNo}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                />
                <p className="text-red-500 text-xs">
                  {formik.touched.serialNo && formik.errors.serialNo
                    ? formik.errors.serialNo
                    : null}
                </p>
            </div>

            <div>
                                <label className="form-label inline-block text-gray-700 text-sm font-semibold">ULB Name<span className='text-red-500'>*</span></label>
                                <select
                                    disabled                                    
                                    name="ulbName"
                                    value={tempData?.ulb_id}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                   
                                    {
                                      props?.ulbList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.ulb_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                              
             </div>
            
              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Workflow Name<span className='text-red-500'>*</span></label>
                                <select
                                    disabled
                                    type="text"
                                    name="workflowName"
                                    value={tempData?.workflow_id}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                   
                                    {
                                      wfList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.workflow_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                {/* <p className="text-red-500 text-xs">
                  {formik.touched.workflowName && formik.errors.workflowName
                    ? formik.errors.workflowName
                    : null}
                </p> */}
              </div>

<div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Role Name<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="roleName"
                                    value={formik.values.roleName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    {
                                      props?.roleList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.role_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.roleName && formik.errors.roleName
                    ? formik.errors.roleName
                    : null}
                </p>
              </div>

<div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Forward Role Name</label>
                                <select
                                    type="text"
                                    name="fdRoleName"
                                    value={formik.values.fdRoleName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    {
                                      props?.roleList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.role_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.fdRoleName && formik.errors.fdRoleName
                    ? formik.errors.fdRoleName
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Backward Role Name</label>
                                <select
                                    type="text"
                                    name="bdRoleName"
                                    value={formik.values.bdRoleName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    {
                                      props?.roleList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.role_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.bdRoleName && formik.errors.bdRoleName
                    ? formik.errors.bdRoleName
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Is Initiator<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="isInitiator"
                                    value={formik.values.isInitiator}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isInitiator && formik.errors.isInitiator
                    ? formik.errors.isInitiator
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Is Finisher<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="isFinisher"
                                    value={formik.values.isFinisher}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isFinisher && formik.errors.isFinisher
                    ? formik.errors.isFinisher
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Is BTC<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="isBtc"
                                    value={formik.values.isBtc}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isBtc && formik.errors.isBtc
                    ? formik.errors.isBtc
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Can View Document<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="canViewDocument"
                                    value={formik.values.canViewDocument}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canViewDocument && formik.errors.canViewDocument
                    ? formik.errors.canViewDocument
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Can Upload Document<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="canUploadDocument"
                                    value={formik.values.canUploadDocument}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canUploadDocument && formik.errors.canUploadDocument
                    ? formik.errors.canUploadDocument
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Can Verify Document<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="canVerifyDocument"
                                    value={formik.values.canVerifyDocument}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canVerifyDocument && formik.errors.canVerifyDocument
                    ? formik.errors.canVerifyDocument
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Allow Free Communication<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="allowFreeCommunication"
                                    value={formik.values.allowFreeCommunication}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.allowFreeCommunication && formik.errors.allowFreeCommunication
                    ? formik.errors.allowFreeCommunication
                    : null}
                </p>
              </div>
              
              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Allow Full List<span className='text-red-500'>*</span></label>
                                
                                <select
                                    type="text"
                                    name="allowFullList"
                                    value={formik.values.allowFullList}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.allowFullList && formik.errors.allowFullList
                    ? formik.errors.allowFullList
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Allow Escalate<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="canEscalate"
                                    value={formik.values.canEscalate}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canEscalate && formik.errors.canEscalate
                    ? formik.errors.canEscalate
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Pseudo User Permission<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="isPseudo"
                                    value={formik.values.isPseudo}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isPseudo && formik.errors.isPseudo
                    ? formik.errors.isPseudo
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Can Forward<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="canForward"
                                    value={formik.values.canForward}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canForward && formik.errors.canForward
                    ? formik.errors.canForward
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Can Backward<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="canBackward"
                                    value={formik.values.canBackward}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.canBackward && formik.errors.canBackward
                    ? formik.errors.canBackward
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block text-gray-700 text-sm font-semibold">Show Field Verification Permission<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="showFieldVerification"
                                    value={formik.values.showFieldVerification}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value={null}>--Select--</option>
                                    <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
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
                  Update{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
    <ToastContainer position="top-right" autoClose={2000} /></>
  );
}


export default EditWorkflowRoleModal;
