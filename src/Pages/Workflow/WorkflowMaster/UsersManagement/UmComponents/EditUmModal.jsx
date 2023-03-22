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

function EditUmModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const { UmUpdate, UmListById } = apiList()

  let mapId = props?.editWorkflowId?.id;
  const [tempData, settempData] = useState()

  const header =ApiHeader()
useEffect(() => {
  axios.get(UmListById + "/" + props?.editWorkflowId?.id, header)
  .then((res) => {
    console.log("getting data for updation => ", res)
    settempData(res?.data?.data[0])
  })
  .catch((err) => {
    console.log("error getting data for updation => ", err)
  })
},[props?.editWorkflowId?.id])

  const validationSchema = yup.object({
    email : yup.string().required("This field is required.."),
mobile : yup.number().required("This field is required.."),
roleName : yup.string().required("This field is required.."),
isSuperUser : yup.boolean().required("This field is required.."),
userName : yup.string().required("This field is required.."),
userType : yup.string().required("This field is required.."),
isWfParticipant : yup.boolean().required("This field is required.."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email :  tempData?.email,
      mobile :  tempData?.mobile,
      roleName :  tempData?.role_id,
      isSuperUser :  tempData?.super_user,
      userName :  tempData?.user_name,
      userType :  tempData?.user_type,
      isWfParticipant : tempData?.workflow_participant
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      updateRecord(values);
    },
    validationSchema,
  });

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const updateRecord = (data) => {
    console.log("Data to be Update", data);

    console.log("WorkflowId=======", mapId);

    const payload = {
      id: mapId,
      email : data?.email,
mobile : data?.mobile,
wfRoleId : data?.roleName,
superUser : data?.isSuperUser,
name : data?.userName,
userType : data?.userType,
workflowParticipant : data?.isWfParticipant,
    };

    console.log("data before update => ", payload)

    axios
      .post(UmUpdate, payload, header)
      .then(
        (res) => (toast.success("User Update successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to Update the User"), closeModal())
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
              Edit User : {mapId}{" "}
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
                                <label className="form-label inline-block mb-1 text-gray-700 text-sm font-semibold">User Type<span className='text-red-500'>*</span></label>
                                <select
                                    
                                    name="userType"
                                    value={formik.values.userType}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    {/* {
                                      props?.ulbList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.ulb_name}</option>
                                      </>)  
                                    } */}
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                    <option value="JSK">JSK</option>
                                    <option value="Pseudo User">Pseudo User</option>
                                   
                                </select>
                                <p className='text-red-500 text-xs'>{formik.touched.userType && formik.errors.userType ? formik.errors.userType : null}</p>
                            </div>
              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">User Name<span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formik.values.userName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                             placeholder="Enter user name"  />
                                    {/* <option selected disabled>--Select--</option>
                                    {
                                      props?.wfList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.workflow_name}</option>
                                      </>)  
                                    }
                                   
                                </select> */}
                <p className="text-red-500 text-xs">
                  {formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Mobile No.</label>
                                <input
                                    type="number"
                                    name="mobile"
                                    value={formik.values.mobile}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                              placeholder="Enter mobile no."  />
                <p className="text-red-500 text-xs">
                  {formik.touched.mobile && formik.errors.mobile
                    ? formik.errors.mobile
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Email</label>
                                <input
                                disabled
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    className="w-full px-3 py-1.5 text-base font-normal bg-gray-300 text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                              placeholder="Enter your email"  />
                <p className="text-red-500 text-xs">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </p>
              </div>

              <div>
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Role Name<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="roleName"
                                    value={formik.values.roleName}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option disabled>--Select--</option>
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
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Is Super User<span className='text-red-500'>*</span></label>
                               
              <select
                                    type="text"
                                    name="isSuperUser"
                                    value={formik.values.isSuperUser}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value='' disabled>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>

                <p className="text-red-500 text-xs">
                  {formik.touched.isSuperUser && formik.errors.isSuperUser
                    ? formik.errors.isSuperUser
                    : null}
                </p>
              </div>

              <div>  
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Is Workflow Participant<span className='text-red-500'>*</span></label>
              <select
                                    type="text"
                                    name="isWfParticipant"
                                    value={formik.values.isWfParticipant}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option value='' disabled>--Select--</option>
                                   <option value={true}>Yes</option>
                                   <option value={false}>No</option>
                                   
                                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.isWfParticipant && formik.errors.isWfParticipant
                    ? formik.errors.isWfParticipant
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


export default EditUmModal;
