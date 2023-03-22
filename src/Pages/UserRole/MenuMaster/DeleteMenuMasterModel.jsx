import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
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
  parentMenuName: yup.string().required("This is a required field !"),
  menuName: yup.string().required("This is a required field !"),
  menuRoute: yup.string().required("This is a required field !"),
});

function DeleteMenuMasterModel(props) {

  let data = props?.dataToBeDeleted;

  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { api_menuMasterDelete, header } = WaterApiList()


  useEffect(() => {
    if (props.openDeletePopUp > 0) setIsOpen(true);
  }, [props.openDeletePopUp]);

  function afterOpenModal() { }

  function closeModal() {
    setIsOpen(false);
    props.refetchMasterMenuList();
  }

  const handleDelete = (data) => {
    axios.post(api_menuMasterDelete, { "id": data.id }, header)
      .then((res) => {
        console.log("Menu Delted", res)
        props.refetchMasterMenuList()
        closeModal()
      })
      .catch((err) => console.log("Error while Data Deleting", err))
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
              <p className="text-center text-xl">Do You Want to delete menu ?</p>
            </div>
            <div className="col-span-2">
              <p onClick={closeModal} className="cursor-pointer rounded-full hover:bg-gray-200 mx-3" > <GrFormClose size={25} /> </p>
            </div>
          </div>
          <div>
            <p>

              Menu Name = {data?.menu_string}
            </p>
            <p>
              Parent Name = {data?.parentName}
            </p>
            <p>
              Route = {data?.route}
            </p>
          </div>
          <p className="border-b py-1 mb-3"></p>

          <div className="flex justify-center">
            <button onClick={() => handleDelete(data)} className="rounded text-white bg-red-600 hover:bg-red-500 shadow py-2 text-base px-3 m-3" >
              Yes, Delete
            </button>
            <button onClick={closeModal} className="rounded bg-green-500 hover:bg-green-400 shadow py-2 text-base px-3 m-3" >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ReactDOM.render(<App />, appElement);

export default DeleteMenuMasterModel;

/*
Exported to -
MenuMasterIndex.js
*/
