import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import WaterApiList from "./WaterApiList";

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

const validationSchema = yup.object({
  // parentMenuName: yup.string().required("This is a required field !"),
  menuName: yup.string().required("This is a required field !"),
  // menuRoute: yup.string().required("This is a required field !"),
});

function AddMenuMasterModel(props) {

  const { api_addNewMenu, api_listParentSetial, api_getChildrenNode} = WaterApiList();

  const [listParentMenu, setListParentMenu] = useState()
  const [listChildMenu, setListChildMenu] = useState()
  const [parentMenuId, setParentMenuId] = useState()

  const formik = useFormik({
    initialValues: {
      parentMenuName: "",
      childMenuName: "",
      menuName: "",
      menuRoute: "",
      serialNo: ""
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      saveRecord(values);
      console.log("This is record", values)
    },
    validationSchema,
  });

  const handleParentMenuName = (e) => {
    formik.values.parentMenuName = e.target.value
    setParentMenuId(e.target.value)
  }
  const handleChildMenuName = (e) => (formik.values.childMenuName = e.target.value);
  const handleMenuName = (e) => (formik.values.menuName = e.target.value);
  const handleMenuRoute = (e) => (formik.values.menuRoute = e.target.value);
  const handleSerialNo = (e) => (formik.values.serialNo = e.target.value);

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const saveRecord = (data) => {
    console.log("Data to be saved", data);

    if (data.childMenuName) {
      let menuId = data.childMenuName
    } else {
      let menuId = data.parentMenuName
    }

    const payload = {
      menuName: data.menuName,
      topLevel: "",
      subLevel: "",
      parentSerial: data.childMenuName ? data.childMenuName : data.parentMenuName,
      serial: "",
      icon: "",
      route: data.menuRoute,
      description: "",
      serial: data.serialNo
    };


    console.log("final payload ==", payload)

    // return

    axios.post(api_addNewMenu, payload, header)
      .then((res) => (console.log("Menu saved successfully", res), closeModal()))
      .catch((err) => (console.log("Failed to save the menu", err), closeModal()));
  };


  useEffect(() => {
    axios.post(api_listParentSetial, {}, header)
      .then((res) => {
        setListParentMenu(res.data.data)
      })
      .catch((err) => console.log("Error while getting ", err))
  }, [])

  useEffect(() => {
    axios.post(api_getChildrenNode, { "id": parentMenuId }, header)
      .then((res) => {
        setListChildMenu(res.data.data)
      })
      .catch((err) => console.log("Error while getting chiild menu ", err))
  }, [parentMenuId])


  useEffect(() => {
    if (props.openAddPopupScreen > 0) setIsOpen(true);
  }, [props.openAddPopupScreen]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    props.refetchMasterMenuList();
  }


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
        <div className="bg-sky-200 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
          <div className="grid grid-cols-12">
            <div className="col-span-10">
              <p className="text-center text-xl">Create New Menu</p>
            </div>
            <div className="col-span-2">
              <p
                onClick={closeModal}
                className="cursor-pointer rounded-full hover:bg-gray-200 mx-3"
              >
                {" "}
                <GrFormClose size={25} />{" "}
              </p>
            </div>
          </div>

          <p className="border-b py-1 mb-3"></p>
          <div>
            <form onSubmit={formik.handleSubmit}>

              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Menu Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="menuName"
                  onChange={handleMenuName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.menuName && formik.errors.menuName
                    ? formik.errors.menuName
                    : null}
                </p>
              </div>

              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Under Menu Name
                </label>
                <select
                  name="parentMenuName"
                  onChange={handleParentMenuName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                  <option value="">Select</option>

                  {
                    listParentMenu?.map((item) => (
                      <option value={item.id}>{item.menu_string}</option>
                    ))
                  }

                </select>
                <p className="text-red-500 text-xs"> {formik.touched.parentMenuName && formik.errors.parentMenuName ? formik.errors.parentMenuName : null}</p>
              </div>

              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Under Sub-Menu Name
                </label>
                <select
                  name="childMenuName"
                  onChange={handleChildMenuName}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                  <option value="">Select</option>

                  {
                    listChildMenu?.map((item) => (
                      <option value={item.id}>{item.menu_string}</option>
                    ))
                  }

                </select>
                <p className="text-red-500 text-xs"> {formik.touched.childMenuName && formik.errors.childMenuName ? formik.errors.childMenuName : null}</p>
              </div>


              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Serial No.
                </label>
                <input
                  type="text"
                  name="serialNo"
                  onChange={handleSerialNo}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.serialNo && formik.errors.serialNo ? formik.errors.serialNo : null}
                </p>
              </div>
              <div>
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Menu Route
                </label>
                <input
                  type="text"
                  name="menuRoute"
                  onChange={handleMenuRoute}
                  className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <p className="text-red-500 text-xs">
                  {formik.touched.menuRoute && formik.errors.menuRoute
                    ? formik.errors.menuRoute
                    : null}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm py-1 text-base font-semibold px-3 m-3"
                >
                  {" "}
                  Create Menu
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

export default AddMenuMasterModel;

/*
Exported to -
MenuMasterIndex.js
*/
