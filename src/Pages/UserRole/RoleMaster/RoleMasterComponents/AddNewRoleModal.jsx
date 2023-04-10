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

function AddNewRoleModal(props) {
  const [ulbList, setUlbList] = useState();

  const { ulbListApi } = PaymentApiList();

  const validationSchema = yup.object({
    roleName: yup.string().required("This is a required field !"),
    // roleStatus: yup.string().required("This is a required field !"),
  });

  const formik = useFormik({
    initialValues: {
      roleName: "",
      // roleStatus: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      saveRecord(values);
    },
    validationSchema,
  });

  const handleroleName = (e) => (formik.values.roleName = e.target.value);
  // const handleroleStatus = e => formik.values.roleStatus = e.target.value

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const saveRecord = (data) => {
    console.log("Data to be saved", data);

    const payload = {
      roleName: data.roleName,
      // "roleStatus": data.roleStatus,
    };

    axios
      .post(
        BackendUrl + "/api/crud/roles/save-role",
        payload,
        header
      )
      .then(
        (res) => (console.log("Role saved successfully", res), closeModal())
      )
      .catch(
        (err) => (console.log("Failed to save the Role", err), closeModal())
      );
  };

  useEffect(() => {
    if (props.openAddNewRoleModal > 0) setIsOpen(true);
  }, [props.openAddNewRoleModal]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    props.refetchListOfRoles();
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
        <div className="bg-sky-300 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
          <div className="flow-root">
            <p className="float-left text-center text-xl font-semibold">
              Add New Role{" "}
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
                  onChange={handleroleName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.roleName && formik.errors.roleName
                    ? formik.errors.roleName
                    : null}
                </p>
              </div>
              {/* <div>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">User Type<span className='text-red-500'>*</span></label>
                                <select
                                    type="text"
                                    name="roleStatus"
                                    onChange={handleroleStatus}
                                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                >
                                    <option >Select</option>
                                    <option value="1">Active</option>
                                    <option value="0">Suspended</option>
                                   
                                </select>
                                <p className='text-red-500 text-xs'>{formik.touched.roleStatus && formik.errors.roleStatus ? formik.errors.roleStatus : null}</p>
                            </div> */}

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

export default AddNewRoleModal;

/*

Exported to-
UserPermissionList.js
*/
