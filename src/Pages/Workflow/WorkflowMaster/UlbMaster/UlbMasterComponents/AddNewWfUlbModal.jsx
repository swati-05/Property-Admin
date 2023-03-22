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

function AddNewWfUlbModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const {ulbWfAdd} = apiList()

  const [ulbList, setUlbList] = useState();

  const { ulbListApi } = PaymentApiList();

  const validationSchema = yup.object({
    workflowName: yup.string().required("This is a required field !"),
    ulbName: yup.string().required("This is a required field !"),
    isDocRequired : yup.boolean().required("This is a required field !")
  });

  const formik = useFormik({
    initialValues: {
      workflowName: "",
      ulbName: "",
      altName: "",
      isDocRequired: false,
      initiatorRoleName: '',
      finisherRoleName: ""
    },
    onSubmit: (values) => {
      console.log("ulb wf values => ", values)
      saveRecord(values);
    },
    validationSchema,
  });

  const handleworkflowName = (e) => (formik.values.workflowName = e.target.value);
  // const handleulbName = e => formik.values.ulbName = e.target.value

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const saveRecord = (data) => {

    const payload = {
      wfMasterId: data.workflowName,
      ulbId : data.ulbName,
      altName: data.altName,
      isDocRequired: data.isDocRequired,
      initiatorRoleId : data.initiatorRoleName,
      finisherRoleId : data.finisherRoleName
    };

    console.log("Data to be saved ulb wf", payload);

    axios
      .post(
        ulbWfAdd,
        payload,
        header
      )
      .then(
        (res) => (toast.success("ULB workflow added successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to add the ULB workflow"), closeModal())
      );
  };

  useEffect(() => {
    if (props.openAddNewWfUlbModal > 0) setIsOpen(true);
  }, [props.openAddNewWfUlbModal]);

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
              Add ULB Workflow{" "}
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
                                    // onChange={handleulbName}
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
                                    // onChange={handleulbName}
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
                                    // onChange={handleulbName}
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
                    {formik.touched.finisherRoleName && formik.errors.finisherRoleName
                      ? formik.errors.finisherRoleName
                      : null}
                  </p>
                </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Is Document Required<span className='text-red-500'>*</span></label>
                               
              <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" name="isDocRequired" id="true" value={true} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" name="isDocRequired" id="false" value={false} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
                               
                                {/* <select
                                    type="text"
                                    name="isDocRequired"
                                    // onChange={handleulbName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                   
                                </select> */}
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

export default AddNewWfUlbModal;