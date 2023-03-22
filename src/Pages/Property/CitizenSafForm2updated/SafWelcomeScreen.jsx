

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import WaterApiList from "../../../Components/ApiList/WaterApiList";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { string } from "yup";

const customStyles1 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
    // transparent:"none"
  },
};

const customStyles = {
  overlay: {
    // background: "rgba(0, 0, 0, 0.5)",
    background: "#e6e6fc",
    // overflowY: "scroll"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
    height: "600px", //or maxHeight
  },
};

function SafWelcomeScreen(props) {
  // Modal.setAppElement('#yourAppElement');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [ulbList, setUlbList] = useState();
  const [selectedUlb, setSelectedUlb] = useState(false);
  const [validULB, setValidULB] = useState(true);

  const { api_ulbList } = WaterApiList();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.openUlbModal == 0) setIsOpen(true);
  }, [props.openUlbModal]);

  useEffect(() => {
    axios
      .get(api_ulbList)
      .then(
        (res) => (console.log("ULB LIsts...", res), setUlbList(res.data.data))
      )
      .catch((err) => console.log("Error while fetching ulblist", err));
  }, []);

  function afterOpenModal() { }

  function closeModal() {
    setIsOpen(false);
    navigate("/propertyDashboard");
    // setPaymentStatus(false);
  }

  const payNow = () => {
    if (!selectedUlb.value) {
      setValidULB(false);
    } else {
      setValidULB(true);
      console.log("Payment Button Cliked..");
      props.nextScreen();
      props.setSelectedUlb(selectedUlb);
      setIsOpen(false);
    }
  };

  console.log("selectedUlb", selectedUlb.value, selectedUlb.text);

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div class="relative w-full h-full max-w-3xl md:h-auto border-indigo-600 shadow-indigo-200 shadow-xl rounded">
            <div class="relative bg-white rounded-lg shadow ">
              <div class="flex items-start justify-between p-4 border-b rounded-t darks:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 darks:text-white">
                  Applying For New Assessment
                </h3>
                <button
                  onClick={() => navigate('/propertyDashboard')}
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-600 darks:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 darks:text-gray-400">
                  If you're looking to apply for property holding new assessment, there are few documents you'll need to gather beforehand. Typically, you'll need to provide proof of ownership or possession of the property, such as a deed or lease agreement. You may also need to submit a recent appraisal or assessment of the property's value
                </p>
                <p class="text-base leading-relaxed text-gray-500 darks:text-gray-400">
                  Other documents that may be required include your tax ID number, proof of income or financial statements, and any relevant permits or licenses. It's important to check with your local assessment office or jurisdiction to determine the specific requirements for your application. Once you've gathered all the necessary documents, you can submit your application and await the outcome of the assessment process.
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="font-semibold">Please Select Your ULB</div>

                <div className="md:col-span-12 col-span-12 w-1/3">
                  {!ulbList ? (
                    <div className="flex justify-center">
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#5664e8"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    <select
                      onChange={(e) =>
                        // setSelectedUlb(e.target.selectedOptions[0])
                        props?.setchoosedUlbId(e.target.value)
                      }
                      name="ulb"
                      required
                      className="w-full h-8 border border-gray-500 rounded-md px-2 text-base cursor-pointer"
                    >
                      <option value="">Select</option>
                      {ulbList?.map((item) => (
                        <option value={item?.id}>{item?.ulb_name}</option>
                      ))}
                    </select>
                  )}
                  {!validULB && (
                    <p className="text-red-400">Please Select ULB</p>
                  )}
                </div>
              </div>


              <hr className="mt-10" />
              <div class="flex flex-row-reverse items-center p-6  rounded-b">
                <button
                  onClick={() => props?.setwelcomeScreenStatus(false)}
                  disabled={selectedUlb.value == ""}
                  class="mx-2 text-white disabled:bg-gray-500 disabled:scale-100 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darks:bg-indigo-600 darks:hover:bg-indigo-700 darks:focus:ring-indigo-800"
                >
                  START
                </button>
                <button
                  onClick={closeModal}
                  class="mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 focus:z-10 "
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ReactDOM.render(<App />, appElement);

export default SafWelcomeScreen;
