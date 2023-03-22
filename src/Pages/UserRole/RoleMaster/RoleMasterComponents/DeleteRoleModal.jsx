import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import api_headers from "@/Components/ApiList/api_headers";
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

function DeleteRoleModal(props) {
  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  const handleDelete = (id) => {
    console.log("ID to be deleted", id);

    const payload = {
      id: id,
    };

    axios
      .delete(
        "http://192.168.0.16:8000/api/crud/roles/delete-role",
        payload,
        api_headers()
      )
      .then(
        (res) => (console.log("Role Deleted successfully", res), closeModal())
      )
      .catch(
        (err) => (console.log("Failed to Deleted the Role", err), closeModal())
      );
  };

  useEffect(() => {
    if (props.openDeleteModal > 0) setIsOpen(true);
  }, [props.openDeleteModal]);

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
              Are you sure to Delete ? {props.deleteRoleId}{" "}
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

          <div className="flex justify-center">
            <button
              onClick={() => handleDelete(props.deleteRoleId)}
              className="border border-red-400 bg-red-600 hover:bg-red-500 text-white hover:text-black shadow-lg rounded-sm py-1 text-base font-semibold px-3 m-3"
            >
              {" "}
              Yes, Delete{" "}
            </button>
            <button
              onClick={closeModal}
              className="border border-green-400 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm py-1 text-base font-semibold px-3 m-3"
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

// ReactDOM.render(<App />, appElement);

export default DeleteRoleModal;
