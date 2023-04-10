import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import PaymentApiList from "@/Pages/PaymentMaster/PaymentApiList";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BackendUrl from "@/Components/ApiList/BackendUrl";

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

function EditRoleModal(props) {
  let roleId = props?.editRoleId?.id;
  let roleName = props?.editRoleId?.role_name;
  let suspendStatus = props?.editRoleId?.is_suspended;

  const validationSchema = yup.object({
    roleName: yup.string().required("This is a required field !"),
    roleStatus: yup.string().required("This is a required field !"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roleName: roleName,
      roleStatus: suspendStatus,
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

    console.log("roleId=======", roleId);

    const payload = {
      id: roleId,
      roleName: data.roleName,
      isSuspended: data.roleStatus,
    };

    axios
      .put(BackendUrl + "/api/crud/roles/edit-role", payload, header)
      .then(
        (res) => (console.log("Role Update successfully", res), closeModal())
      )
      .catch(
        (err) => (console.log("Failed to Update the Role", err), closeModal())
      );
  };

  useEffect(() => {
    if (props.openModelForEdit > 0) setIsOpen(true);
  }, [props.openModelForEdit]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    props.refetchListOfRoles();
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
        <div className="bg-sky-300 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
          <div className="flow-root">
            <p className="float-left text-center text-xl font-semibold">
              Edit Role : {roleId}{" "}
            </p>
            <p
              onClick={closeModal}
              className="float-right cursor-pointer rounded-full bg-sky-200 hover:bg-gray-200 mx-3"
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
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Role Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roleName"
                  onChange={formik.handleChange}
                  value={formik.values.roleName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.roleName && formik.errors.roleName
                    ? formik.errors.roleName
                    : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Status<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  name="roleStatus"
                  onChange={formik.handleChange}
                  className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                  <option>Select</option>
                  <option selected={!suspendStatus} value="0">
                    Active
                  </option>
                  <option selected={suspendStatus} value="1">
                    Suspended
                  </option>
                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.roleStatus && formik.errors.roleStatus
                    ? formik.errors.roleStatus
                    : null}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="border border-green-400 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm py-1 text-base font-semibold px-3 m-3"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ReactDOM.render(<App />, appElement);

export default EditRoleModal;

/*

Exported to-
UserPermissionList.js
*/
