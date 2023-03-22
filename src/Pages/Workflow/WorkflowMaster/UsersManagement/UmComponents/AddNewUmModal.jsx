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

function AddNewUmModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const { UmUpdate, UmListById , PUAdd} = apiList()

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
      email :  "",
      mobile :  "",
      roleName :  "",
      isSuperUser :  "",
      userName :  "",
      userType :  "Pseudo User",
      isWfParticipant : ""
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
      .post(PUAdd, payload, header)
      .then(
        (res) => (toast.success("User Update successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to Update the User"), closeModal())
      );
  };

  useEffect(() => {
    if (props.openAddNewUmModal > 0) setIsOpen(true);
  }, [props.openAddNewUmModal]);

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
              Add Pseudo User  {" "}
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
            {/* <div>
                                <label className="form-label inline-block mb-1 text-gray-700 text-sm font-semibold">User Type<span className='text-red-500'>*</span></label>
                                <select
                                    
                                    name="userType"
                                    value={formik.values.userType}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                    <option value="JSK">JSK</option>
                                    <option value="Pseudo User">Pseudo User</option>
                                   
                                </select>
                                <p className='text-red-500 text-xs'>{formik.touched.userType && formik.errors.userType ? formik.errors.userType : null}</p>
                            </div> */}
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
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
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
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option selected disabled>--Select--</option>
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
                               
              <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isSuperUser" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isSuperUser" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>

                <p className="text-red-500 text-xs">
                  {formik.touched.isSuperUser && formik.errors.isSuperUser
                    ? formik.errors.isSuperUser
                    : null}
                </p>
              </div>

              <div>  
              <label className="form-label inline-block mb-1 text-gray-700 text-sm mt-2 font-semibold">Is Workflow Participant<span className='text-red-500'>*</span></label>
              <div className="flex flex-wrap flex-row gap-5">
                              
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isWfParticipant" id="true" value={true}  />
                               <label htmlFor="true" className="text-gray-700">Yes</label>
                              </div>
                               
                              <div className="flex flex-wrap flex-row gap-2 items-center">
                              <input type="radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" name="isWfParticipant" id="false" value={false}  />
                               <label htmlFor="false" className="text-gray-700">No</label>
                              </div>

                              </div>
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


export default AddNewUmModal;
