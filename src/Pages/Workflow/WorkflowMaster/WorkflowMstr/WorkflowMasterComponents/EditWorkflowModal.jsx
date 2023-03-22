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
import { contextVar } from "../../Common/Context/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ApiHeader from "@/Components/ApiList/ApiHeader";

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

function EditWorkflowModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  let workflowId = props?.editWorkflowId?.id;
  let workflowName = props?.editWorkflowId?.workflow_name;
  // let suspendStatus = props?.editWorkflowId?.is_suspended;

  const validationSchema = yup.object({
    workflowName: yup.string().required("This is a required field !"),
    // WorkflowStatus: yup.string().required("This is a required field !"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workflowName: workflowName,
      // WorkflowStatus: suspendStatus,
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

    console.log("WorkflowId=======", workflowId);

    const payload = {
      id: workflowId,
      workflowName: data.workflowName,
      // isSuspended: data.workflowStatus,
    };

    axios
      .post("http://192.168.0.205:8000/api/workflow/master/edit", payload, header)
      .then(
        (res) => (toast.success("Workflow Updated successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to Update the Workflow"), closeModal())
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
              Edit Workflow : {workflowId}{" "}
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
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label className="form-label inline-block mb-1 text-gray-700 text-sm font-semibold">
                  Workflow Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="workflowName"
                  onChange={formik.handleChange}
                  value={formik.values.workflowName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.workflowName && formik.errors.workflowName
                    ? formik.errors.workflowName
                    : null}
                </p>
              </div>
              {/* <div>
                <label className="form-label inline-block mb-1 text-gray-700 text-sm font-semibold">
                  Status<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  name="WorkflowStatus"
                  onChange={formik.handleChange}
                  className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                  <option disabled>--Select--</option>
                  <option selected={!suspendStatus} value="0">
                    Active
                  </option>
                  <option selected={suspendStatus} value="1">
                    Suspended
                  </option>
                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.WorkflowStatus && formik.errors.WorkflowStatus
                    ? formik.errors.WorkflowStatus
                    : null}
                </p>
              </div> */}

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


export default EditWorkflowModal;
