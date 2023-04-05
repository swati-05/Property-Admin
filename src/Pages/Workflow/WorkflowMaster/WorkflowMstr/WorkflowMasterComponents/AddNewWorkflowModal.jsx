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
import '../../fonts.css'
import apiList from '../../Common/ApiList'
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

function AddNewWorkflowModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const { workflowAdd } = apiList()

  const [ulbList, setUlbList] = useState();

  const { ulbListApi } = PaymentApiList();

  const validationSchema = yup.object({
    workflowName: yup.string().required("This is a required field !"),
    // workflowStatus: yup.string().required("This is a required field !"),
  });

  const formik = useFormik({
    initialValues: {
      workflowName: "",
      // workflowStatus: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      saveRecord(values);
    },
    validationSchema,
  });

  const handleworkflowName = (e) => (formik.values.workflowName = e.target.value);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header =ApiHeader()

  const saveRecord = (data) => {
    console.log("Data to be saved", data);

    const payload = {
      workflowName: data.workflowName,
      // "workflowStatus": data.workflowStatus,
    };

    axios
      .post(
        workflowAdd,
        payload,
        header
      )
      .then(
        (res) => (toast.success("Workflow added successfully"), closeModal(), setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to add the workflow"), closeModal())
      );
  };

  useEffect(() => {
    if (props.openAddNewWorkflowModal > 0) setIsOpen(true);
  }, [props.openAddNewWorkflowModal]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    //get ulb list
    axios
      .get(ulbListApi)
      .then(function (res) {
        setUlbList(res.data);
      })
      .catch(function (err) {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="">
      {/* <button className='border bg-yellow-300' onClick={openModal}>Open Modal</button> */}

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
              Add New Workflow{" "}
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
                  onChange={handleworkflowName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.workflowName && formik.errors.workflowName
                    ? formik.errors.workflowName
                    : null}
                </p>
              </div>

              <div className="flex justify-center">
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
  );
}

export default AddNewWorkflowModal;