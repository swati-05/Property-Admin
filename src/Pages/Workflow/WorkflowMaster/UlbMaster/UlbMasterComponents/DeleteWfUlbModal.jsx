////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : Worflow Master
////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import api_headers from "@/Components/ApiList/api_headers";
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

function DeleteWfUlbModal(props) {

  const {refresh, setrefresh} = useContext(contextVar)

  const {ulbWfDelete} = apiList()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header =ApiHeader()

  const handleDelete = (id) => {
    console.log("ID to be deleted", id);

    const payload = {
      id: id,
    };

    axios
      .post(
        ulbWfDelete,
        payload,
        api_headers()
      )
      .then(
        (res) => (toast.success("ULB Workflow Deleted successfully"), closeModal(),  setrefresh(refresh+1))
      )
      .catch(
        (err) => (toast.error("Failed to Deleted the ULB Workflow"), closeModal())
      );
  };

  useEffect(() => {
    if (props.openDeleteModal > 0) setIsOpen(true);
  }, [props.openDeleteModal]);

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
              Are you sure to Delete ? {props.deleteRoleId}{" "}
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

          <div className="flex justify-center">
            <button
              onClick={() => handleDelete(props.deleteWorkflowId)}
              className="rounded-md bg-red-300 hover:bg-red-400 shadow-lg py-1.5 text-sm px-3 m-3"
            >
              {" "}
              Yes, Delete{" "}
            </button>
            <button
              onClick={closeModal}
              className="rounded-md bg-green-300 hover:bg-green-400 shadow-lg py-1.5 text-sm px-3 m-3"
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteWfUlbModal;
