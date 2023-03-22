//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ViewPaymnetDetailsModal
//    DESCRIPTION - ViewPaymnetDetailsModal Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import PaymentApiList from "./PaymentApiList";
import { useQuery } from "react-query";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};
Modal.setAppElement("#root");

function ViewPaymnetDetailsModal(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState();

  const { getPaymentDetailsByTrnId } = PaymentApiList();

  const header = ApiHeader()

  const tranSacrionNo = props.selectedOrderId;

  useEffect(() => {
    axios
      .post(getPaymentDetailsByTrnId, { transactionNo: tranSacrionNo }, header)
      .then((response) => {
        setFetchedData(response.data.data);
        // console.log("Single Data in view model", response)
      });
  }, [tranSacrionNo]);

  console.log(
    "Fetched Data in Single View MOdel",
    fetchedData?.transactionNo,
    fetchedData
  );

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() { }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    tranSacrionNo && openModal();
  }, [props.openPopUp]);

  return (
    <>
      {/* <button className='bg-indigo-500 text-white shadow rounded-sm' onClick={openModal}>open modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="p-5 shadow-2xl border border-gray-300 bg-indigo-200 rounded-sm">
            <div className="">

              <div className="float-right">

                <p onClick={closeModal} className="cursor-pointer hover:bg-blue-500 hover:border-blue-700 hover:border hover:text-white border border-gray-500 rounded-md p-1" >
                  <AiOutlineClose size={25} />
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h1 className="text-center font-semibold text-xl">
                Details of Transaction No :{" "}
                <span className="font-bold">{tranSacrionNo}</span>
              </h1>
            </div>
            <p className="border-b border-gray-200 px-5 mt-1 mb-3"></p>

            <div>
              <div className="grid grid-cols-2 my-2">
                <div className="col-span-1">
                  <p>
                    {" "}
                    <span className="font-semibold">Order Id : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {" "}
                      {fetchedData?.orderId}{" "}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Bank Name : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.bank}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      {fetchedData?.paymentAcquirerDataType}{" "}
                    </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.paymentAcquirerDataValue}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p>
                    <span className="font-semibold">Payment Id : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.paymentId}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Payment Method : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.method}
                    </span>
                  </p>
                </div>
                <div className="col-span-2 border-b py-2"></div>
              </div>

              <div className="grid grid-cols-2 my-2">
                <div className="col-span-1">
                  <p>
                    <span className="font-semibold">Payment For : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.departmentId} ({"1 - Property"}
                      )
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Payment Against : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.applicationId} ("SAF No")
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p>
                    <span className="font-semibold">Amount : ₹ </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.amount}{" "}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">ULB ID : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.ulbId}
                    </span>
                  </p>
                </div>
                <div className="col-span-2 border-b py-2"></div>
              </div>

              <div className="grid grid-cols-2 my-2">
                <div className="col-span-1">
                  <p>
                    <span className="font-semibold">Customer Name : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.name}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Customer Phone : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.contact}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Customer Email : </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.userDetails?.email}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p>
                    <span className="font-semibold">
                      Phone While Payment :{" "}
                    </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.contact}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      Email While Payment :{" "}
                    </span>{" "}
                    <span className="font-medium text-gray-700">
                      {fetchedData?.emails}
                    </span>
                  </p>
                </div>
                <div className="col-span-2 border-b py-2"></div>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  {fetchedData?.paymentVpa && (
                    <p>
                      <span className="font-semibold">UPI ID </span>{" "}
                      <span className="font-medium text-gray-700">
                        {fetchedData?.paymentVpa}
                      </span>
                    </p>
                  )}
                  {fetchedData?.paymentCardId && (
                    <p>
                      <span className="font-semibold">UPI ID </span>{" "}
                      <span className="font-medium text-gray-700">
                        {fetchedData?.paymentCardId}
                      </span>
                    </p>
                  )}
                  {fetchedData?.paymentErrorCode && (
                    <p>
                      <span className="font-semibold">Error Code </span>{" "}
                      <span className="font-medium text-gray-700">
                        {fetchedData?.paymentErrorCode}
                      </span>
                    </p>
                  )}
                  {fetchedData?.paymentErrorReason && (
                    <p>
                      <span className="font-semibold">
                        Payment Error Reason{" "}
                      </span>{" "}
                      <span className="font-medium text-gray-700">
                        {fetchedData?.paymentErrorReason}
                      </span>
                    </p>
                  )}
                  {fetchedData?.paymentErrorSource && (
                    <p>
                      <span className="font-semibold">
                        Payment Error Source
                      </span>{" "}
                      <span className="font-medium text-gray-700">
                        {fetchedData?.paymentErrorSource}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              {fetchedData?.paymentErrorDescription && (
                <p>
                  <span className="font-semibold">Error Description </span>{" "}
                  <span className="font-medium text-gray-700 break-words">
                    {fetchedData?.paymentErrorDescription}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewPaymnetDetailsModal;
