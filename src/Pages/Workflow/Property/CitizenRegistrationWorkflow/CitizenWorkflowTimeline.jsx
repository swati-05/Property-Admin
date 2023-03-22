//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenWorkflowTimeline (closed)
//    DESCRIPTION - CitizenWorkflowTimeline Component
//////////////////////////////////////////////////////////////////////////////////////
import CheckBoxInput from "@/Components/Shared/CheckBoxInput";
import RippleAnimation from "@/Components/Shared/RippleAnimation";
import TextArea from "@/Components/Shared/TextArea";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import CitizenTimeline from "./CitizenTimeline";
import deleteImage from "@/Components/WorkflowMaster/delete.svg";
import approve from "@/Components/Media/approve.svg";
import { TiCancel } from "react-icons/ti";
import { ContentPasteOffSharp } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import ApiHeader from "@/Components/ApiList/ApiHeader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
  },
};
// Modal.setAppElement('#root');
Modal.setAppElement("#modal");

function CitizenWorkflowTimeline(props) {
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [escalateStatus, setescalateStatus] = useState(false);
  const [actionName, setactionName] = useState();
  const [buttonStatus, setButtonStatus] = useState(true);
  const [commentText, setcommentText] = useState("");
  const navigate = useNavigate();

  const swithEscalateStatus = (status) => {
    setescalateStatus(status);
  };

  const notify = (toastData, actionFlag) => {
    toast.dismiss();
    {
      actionFlag == "Reject" && toast.error(toastData);
    }
    {
      actionFlag == "Approve" && toast.success(toastData);
    }
    // toast.info(toastData)
  };

  function openModal2(worflowId, workflowName) {
    document.getElementById("root").style.filter = "blur(3px)";
    setIsOpen2(true);
  }

  function closeModal2() {
    document.getElementById("root").style.filter = "none";
    setIsOpen2(false);
  }
  const approveAction = (action, id) => {
    console.log("payment action ", action);
    setactionName(action);
    openModal2();
  };

  const header = ApiHeader()
  const citizenActionProceed = () => {
    setButtonStatus(false);
    closeModal2();
    // { (actionName == 'Approve') && notify('User Approved Successfully !', 'Approve') }
    if (actionName == "Approve") {
      axios
        .post(
          `http://192.168.0.166/api/edit-citizen-by-id/${props?.id}`,
          { isApproved: 1 },
          header
        )
        .then(function (response) {
          console.log("inside approve ..... ", props.id);
          notify("Citizen Approved Successfully", "Approve");
          closeModal2();
          props.fun("dummy", 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (actionName == "Reject") {
      axios
        .post(
          `http://192.168.0.166/api/edit-citizen-by-id/${props?.id}`,
          { isApproved: 0 },
          header
        )
        .then(function (response) {
          console.log("inside reject ..... ", props.id);
          notify("Citizen Rejected Successfully", "Reject");
          closeModal2();
          props.fun("dummy", 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // { (actionName == 'Reject') && notify('User Rejected Successfully !', 'Reject') }
  };

  const commentFun = (comment) => {
    console.log("parent ", comment);
    setcommentText(comment);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {buttonStatus && (
        <div className="flex gap-4">
          <button
            onClick={() => approveAction("Approve")}
            className="flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center"
          >
            {/* <button onClick={() => notify('User Approved Successfully !', 'approved')} className='flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center'> */}
            <FiEdit className="inline" />
            &nbsp;Approved
          </button>
          <button
            onClick={() => approveAction("Reject")}
            className="flex-initial bg-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex"
          >
            <MdDeleteForever className="inline" />
            Reject
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative bg-white rounded-lg shadow-2xl border-2 border-gray-50 rounded">
          <div
            className={`p-10 px-10 md:w-96 bg-white  text-center border-2 ${
              actionName == "Approve" ? "border-green-400" : "border-red-400"
            }`}
          >
            <h1 className="text-black text-lg mb-2">
              Do you want to{" "}
              <b>
                <i>{actionName}</i>
              </b>{" "}
              citizen ?
            </h1>
            {actionName == "Approve" && (
              <img src={approve} className="w-2/3 mx-auto" alt="deleteImage" />
            )}
            {actionName == "Reject" && (
              <img
                src={deleteImage}
                className="w-2/3 mx-auto"
                alt="deleteImage"
              />
            )}
            <div>
              <h1 className="text-sm text-left">Write comment</h1>
              <TextArea
                commentFun={commentFun}
                bgColor="bg-white"
                value={commentText}
              />
            </div>

            <button
              onClick={citizenActionProceed}
              className={`${
                actionName == "Approve"
                  ? "text-green-600 border-green-600 hover:bg-green-800"
                  : "text-red-600 border-red-600 hover:bg-red-800"
              } bg-white border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg  hover:text-white hover:shadow-3xl md:mr-3 font-semibold`}
            >
              <MdDeleteForever className="inline" />
              {actionName}
            </button>
            <button
              onClick={closeModal2}
              className="bg-gray-400 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-gray-700 hover:shadow-2xl md:ml-3"
            >
              <TiCancel className="inline text-2xl" />
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CitizenWorkflowTimeline;
/**
 * Exported to :
 * 1.PropertySafDetailsTabs Component
 *
 */
