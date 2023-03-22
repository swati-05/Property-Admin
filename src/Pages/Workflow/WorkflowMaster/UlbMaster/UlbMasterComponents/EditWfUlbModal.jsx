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
import apiList from '../../Common/ApiList'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { contextVar } from "../../Common/Context/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

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

function EditWfUlbModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const { ulbWfUpdate, workflowListById } = apiList()

  let mapId = props?.editWorkflowId?.id;
  const [tempData, settempData] = useState()

  useEffect(() => {
    axios.post(workflowListById, {id: props?.editWorkflowId?.id}, ApiHeader())
    .then((res) => {
      console.log("data by id => ", res?.data?.data)
      settempData(res?.data?.data)
    })
    .catch((err) => console.log("data by id  err => ", err))
  },[props?.editWorkflowId?.id])


  const validationSchema = yup.object({
    workflowName: yup.string().required("This is a required field !"),
    ulbName: yup.string().required("This is a required field !"),
    isDocRequired : yup.boolean().required("This is a required field !")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workflowName:tempData?.wf_master_id,
      ulbName:tempData?.ulb_id,
      altName:tempData?.alt_name,
      isDocRequired:tempData?.is_doc_required,
      initiatorRoleName: tempData?.initiator_role_id,
      finisherRoleName: tempData?.finisher_role_id
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      updateRecord(values);
    },
    validationSchema,
  });

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const updateRecord = (data) => {
    console.log("Data to be Update", data);

    console.log("WorkflowId=======", mapId);

    const payload = {
      id: mapId,
      wfMasterId: data.workflowName,
      ulbId : data.ulbName,
      altName: data.altName,
      isDocRequired: data.isDocRequired,
      initiatorRoleId: data.initiatorRoleName,
      finisherRoleId : data.finisherRoleName
    };

    console.log("data before update => ", payload)

    axios
      .post(ulbWfUpdate, payload, header)
      .then(
        (res) => (toast.success("ULB Workflow Updated successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to Update the ULB Workflow"), closeModal())
      );
  };

  useEffect(() => {
    if (props.openModelForEdit > 0) setIsOpen(true);
  }, [props.openModelForEdit]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-indigo-300 shadow-2xl p-5 m-5 rounded-md poppins">
          <div className="flow-root">
            <p className="float-left text-center text-lg font-semibold">
              Edit ULB Workflow : {mapId}{" "}
            </p>
            <p
              onClick={closeModal}
              className="float-right cursor-pointer rounded-full bg-red-200 hover:bg-red-300 mx-3"
            >
              {" "}
              <GrFormClose size={25} />{" "}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-10"></div>
            <div className="col-span-2"></div>
          </div>

          <p className="border-b py-1 mb-3"></p>
          <div>
          <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
            <div>
                                <label className="form-label inline-block mb-1 text-gray-700 text-sm font-semibold">ULB Name<span className='text-red-500'>*</span></label>
                                <select
                                    
                                    name="ulbName"
                                    value={formik.values.ulbName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    {
                                      props?.ulbList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.ulb_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                                <p className='text-red-500 text-xs'>{formik.touched.ulbName && formik.errors.ulbName ? formik.errors.ulbName : null}</p>
                            </div>
              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Workflow Name<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="workflowName"
                                    value={formik.values.workflowName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    {
                                      props?.wfList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.workflow_name}</option>
                                      </>)  
                                    }
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.workflowName && formik.errors.workflowName
                    ? formik.errors.workflowName
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Alternate Name</label>
                                <input
                                    type="text"
                                    name="altName"
                                    value={formik.values.altName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                              placeholder="Enter alternate name..."  />
                <p className="text-red-500 text-xs">
                  {formik.touched.altName && formik.errors.altName
                    ? formik.errors.altName
                    : null}
                </p>
              </div>

              <div>
                  <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">
                    Initiator Role Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    type="text"
                    name="initiatorRoleName"
                    value={formik.values.initiatorRoleName}
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
                    {formik.touched.initiatorRoleName && formik.errors.initiatorRoleName
                      ? formik.errors.initiatorRoleName
                      : null}
                  </p>
                </div>

                <div>
                  <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">
                    Finisher Role Name<span className="text-red-500">*</span>
                  </label>
                  <select
                    type="text"
                    name="finisherRoleName"
                    value={formik.values.finisherRoleName}
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
                    {formik.touched.finisherRoleName && formik.errors.finisherRoleName
                      ? formik.errors.finisherRoleName
                      : null}
                  </p>
                </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Is Document Required<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="isDocRequired"
                                    value={formik.values.isDocRequired}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isDocRequired && formik.errors.isDocRequired
                    ? formik.errors.isDocRequired
                    : null}
                </p>
              </div>

              <div className="flex justify-center">
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
  );
}


export default EditWfUlbModal;
