import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import PaymentApiList from "@/Pages/PaymentMaster/PaymentApiList";
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

function AddNewUserModel(props) {
  const [ulbList, setUlbList] = useState();

  const { ulbListApi } = PaymentApiList();

  const validationSchema = yup.object({
    // ulbid: yup.string().required("This is a required field !"),
    userName: yup.string().required("This is a required field !"),
    email: yup.string().required("This is a required field !"),
    userType: yup.string().required("This is a required field !"),
    // password: yup.string().required("This is a required field !"),

    phone: yup
      .string()
      .required("This is a required field !")
      .min(10, "Must be exactly 10 digit")
      .max(10, "Must be exactly 10 digit"),

    password: yup
      .string()
      .required("This is a required field !")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const formik = useFormik({
    initialValues: {
      // ulbid: '',
      userName: "",
      email: "",
      phone: "",
      userType: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      saveRecord(values);
    },
    validationSchema,
  });

  // const handleUlbId = e => formik.values.ulbid = e.target.value
  const handleUserName = (e) => (formik.values.userName = e.target.value);
  const handleEmail = (e) => (formik.values.email = e.target.value);
  const handlePhone = (e) => (formik.values.phone = e.target.value);
  const handleUserType = (e) => (formik.values.userType = e.target.value);
  const handlePassword = (e) => (formik.values.password = e.target.value);

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const saveRecord = (data) => {
    console.log("Data to be saved", data);

    const payload = {
      name: data.userName,
      mobile: data.phone,
      email: data.email,
      // "ulb": data.ulbid,
      userType: data.userType,
      password: data.password,
    };

    axios
      .post("http://192.168.0.16:8000/api/authorised-register", payload, header)
      .then(
        (res) => (console.log("Menu saved successfully", res), closeModal())
      )
      .catch(
        (err) => (console.log("Failed to save the menu", err), closeModal())
      );
  };

  useEffect(() => {
    if (props.openAddNewUserModel > 0) setIsOpen(true);
  }, [props.openAddNewUserModel]);

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    props.refetchListOfUsers();
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
              Add New User{" "}
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
              {/* <div>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Select ULB<span className='text-red-500'>*</span></label>
                                <select
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    onChange={e => handleUlbId(e)}
                                    name="ulbid"
                                >
                                    <option>--select--</option>
                                    {
                                        ulbList?.map((data) => (
                                            <option value={data.id}>{data.ulb_name}</option>
                                        ))
                                    }
                                </select>
                                <p className='text-red-500 text-xs'>{formik.touched.ulbid && formik.errors.ulbid ? formik.errors.ulbid : null}</p>
                            </div> */}
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  User Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  onChange={handleUserName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  User Type<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  name="userType"
                  onChange={handleUserType}
                  className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                  <option>Select</option>
                  <option value="Employee">Employee</option>
                  <option value="JSK">JSK</option>
                  <option value="Admin">Admin</option>
                  <option value="Pseudo">Pseudo</option>
                </select>
                <p className="text-red-500 text-xs">
                  {formik.touched.userType && formik.errors.userType
                    ? formik.errors.userType
                    : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Enter Contact<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  onChange={handlePhone}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Enter Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleEmail}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handlePassword}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
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

export default AddNewUserModel;

/*

Exported to-
UserPermissionList.js
*/
