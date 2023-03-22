//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImUpload2 } from "react-icons/im";
import FormSubmitResponse from "@/Components/Common/ResponseScreen/FormSubmitResponse";
import { TbWebhook } from "react-icons/tb";
import ObjectionEntryForm from "./ObjectionEntryForm";

function ObjectionFormIndex(props) {
  // const {id} = useParams()

  const [formIndex, setFormIndex] = useState(1); //formindex specifies type of form like basicdetails at index 1 ...
  const [animateform1, setAnimateform1] = useState("translate-x-0"); //slide animation control state for BasicDetails form
  const [submitStatus, setSubmitStatus] = useState(false); //checking full form filled status to toggle final submit button
  const [allFormData, setAllFormData] = useState({});
  const [responseScreenStatus, setResponseScreenStatus] = useState("");

  //activating notification if no owner or no floor added
  const notify = (toastData) => {
    toast.dismiss();
    toast.error(toastData);
  };

  //
  const submitButtonToggle = () => {
    setSubmitStatus(true);
  };

  const collectAllFormData = (key, formData) => {
    // console.log("prev Data", allFormData);
    // setAllFormData({...allFormData,formData}) //this is going to replace upcoming data since has same formData key all the time
    setAllFormData({ ...allFormData, [key]: formData });
  };
  if (responseScreenStatus == "success") {
    return <>{/* <FormSubmitResponse/> */} Done</>;
  }

  const closeModal = () => {
    props.closePopUp()
  }

  const submitObForm = (id) => {
    props.submitForm(id)
  }
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* <div className="text-right absoltue top-0 animate__animated animate__fadeInDown">
        <span className="bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4">
          <TbWebhook className="inline" /> Objection
        </span>
      </div> */}

      <div className={`${animateform1} transition-all relative md:mx-14`}>
        <ObjectionEntryForm
        //   id={id}
          collectFormDataFun={collectAllFormData}
          submitFun={submitButtonToggle}
          toastFun={notify}
          closePopUp={closeModal}
          submitForm={submitObForm}
        />
      </div>
      {/* collectDataFun to receive form data on every save&next */}
      {/* submitFun to activate final submit button when all forms are filled */}
      {/* toastFun to activate toast notification via receiving toast message */}
      {/* backFun to go back from any specific form level */}
      {/* nextFun to go next from any specific form level */}

      {submitStatus && (
        <div
          onClick={() => setResponseScreenStatus("success")}
          className="flex items-center justify-center"
        >
          <button
            type="submit"
            className="absolute bottom-40 mx-auto px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-blue-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit Form <ImUpload2 className="inline text-xl" />
          </button>
        </div>
      )}
    </>
  );
}

export default ObjectionFormIndex;
