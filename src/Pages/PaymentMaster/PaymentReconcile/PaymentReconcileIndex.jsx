//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 17 November 2022
//    Updated On -
//    Revision - 1
//    Project - JUIDCO
//    Component  -
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { BsCheckCircleFill } from "react-icons/bs";
import Modal from "react-modal";
import ListTable from "../../../Components/Common/ListTable/ListTable";
import PaymentApiList from "../PaymentApiList";
import axios from "axios";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
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
Modal.setAppElement("#root");

function PaymentReconcileIndex() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [actionState, setactionState] = useState("");
  const [transactionNo, setTransactionNo] = useState();
  // const [showFilterData, setShowFilterData] = useState(false)
  const [filteredData, setFilteredData] = useState(false);

  const [loaderForClearBtn, setLoaderForClearBtn] = useState(false);

  const { getReconcillationDetails, apiUpdateReconcillationDetails } =
    PaymentApiList();

  const header =ApiHeader()

  function openModal(transNo) {
    setIsOpen(true);
    setTransactionNo(transNo);
    console.log("====transactionNo in funcion", transNo);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const clearCheque = () => {
    // setclearSubmitButton(false)
    closeModal();
  };

  const fetchFilterData = (parameters) => {
    // setShowFilterData(true)
    console.log("parameters for filter data is ", parameters);

    const payloadData = {
      fromDate: parameters?.fromDate,
      toDate: parameters?.toDate,
      paymentMode: parameters?.paymentMode,
      verificationType: parameters?.verificationType,
      chequeDdNo: parameters?.cheque_dd_no,
    };

    axios
      .post(getReconcillationDetails, payloadData, header)
      .then(
        (res) => (console.log("Fetched Filter Data", res), setFilteredData(res))
      )
      .catch((err) => console.log("Error while fetching filter Data", err));
  };

  const validationSchema = yup.object({
    fromDate: yup.string().required("Select from date"),
    toDate: yup.string().required("Select to date"),
    // paymentMode: yup.string().required('Select pyement mode'),
  });
  const formik = useFormik({
    initialValues: {
      fromDate: moment(new Date()).format("yy-MM-DD"),
      toDate: moment(new Date()).format("yy-MM-DD"),
      paymentMode: "",
      verificationType: "",
      cheque_dd_no: "",
    },

    onSubmit: (values) => {
      // console.log('--1-all data for filter...', values)
      // setLoaderSpinner(true)
      // setSubmitButtonStatus(false)
      // fetchBankReconcilliation()
      fetchFilterData(values);
    },
    validationSchema,
  });

  // Form 2 - In Popup Story Start

  const updateReconcile = (data) => {
    setLoaderForClearBtn(true);
    axios
      .post(
        apiUpdateReconcillationDetails,
        {
          transactionNo: transactionNo,
          status: data.clearStatus,
          date: data.clearanceDate,
          reason: data.reason,
          cancellationCharges: data.charge,
        },
        header
      )
      .then(
        (res) => (
          console.log("Data Update Successfully", res),
          clearCheque(),
          setLoaderForClearBtn(false)
        )
      )
      .catch(
        (err) => (
          console.log("Error : Data Not Updated", err),
          setLoaderForClearBtn(false)
        )
      );
  };

  const validationSchema2 = yup.object({
    clearStatus: yup.string().required("Select to Status"),
    clearanceDate: yup.string().required("Select from Date"),
  });

  const formik2 = useFormik({
    initialValues: {
      transactionNo: transactionNo,
      clearanceDate: "",
      clearStatus: "",
      reason: "",
      charge: "",
    },

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("--2 Clear VAluee...", values);
      updateReconcile(values);

      // setLoaderSpinner(true)
      // setSubmitButtonStatus(false)
      // fetchBankReconcilliation()
    },
    validationSchema2,
  });

  const handleClearStatus = (e) => {
    console.log("============sdfsdf---------", e.target.value);
    formik2.values.clearStatus = e.target.value;
    setactionState(e.target.value);
  };
  const handleClearanceDate = (e) =>
    (formik2.values.clearanceDate = e.target.value);
  const handleClearReason = (e) => (formik2.values.reason = e.target.value);
  const HandleClearCharge = (e) => (formik2.values.charge = e.target.value);

  // Form 2 - In Popup Story END!!

  const COLUMNS = [
    {
      Header: 'Sl.',
      Cell: ({ row }) => (
        <div className='px-2 font-semibold'>{row.index + 1}.</div>
      )
    },
    {
      Header: "TransNo",
      accessor: "transactionNo",
    },
    {
      Header: "Ulb.",
      accessor: "ulbId",
    },
    {
      Header: "Dept.",
      accessor: "dpartmentId",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Trans Date",
      accessor: "transactionDate",
    },
    {
      Header: "Pay Mode",
      accessor: "paymentMode",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Cheque No",
      accessor: "chequeNo",
    },
    {
      Header: "Cheque Date",
      accessor: "chequeDate",
    },
    {
      Header: "Bank Name",
      accessor: "bankName",
    },
    {
      Header: "Branch Name",
      accessor: "branchName",
    },
    {
      Header: "Clear Date",
      accessor: "clearanceDate",
    },
    {
      Header: "Action",
      Cell: ({ cell }) =>
        cell.row.original.status == "pending" && (
          <span
            onClick={() => {
              // setCurrenTransactionId(cell.row.original.tranId)
              openModal(cell.row.original.transactionNo);
            }}
            className={` px-2 py-1 rounded-lg shadow-lg border border-gray-300 cursor-pointer`}
          >
            <span className="font-semibold">Action</span>{" "}
            <BsCheckCircleFill className="inline text-sky-500 font-semibold text-lg cursor-pointer hover:text-sky-700 mb-1 relative hover:scale-150" />
          </span>
        ),
    },
  ];

  const { isLoading, data, isError, error } = useQuery(
    "api/payment/getReconcillationDetails",
    () => {
      return axios.post(getReconcillationDetails, {}, header);
    }
  );

  // console.log("getReconcillationDetails", data?.data?.status)

  if (!isLoading) {
  }

  return (
    <>
      {/* FORM 1 -> For Search and Filter */}
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 space-x-2 bg-sky-100 p-2 rounded-md">
          <div className="col-span-12">
            <h1 className="text-gray-700 text-xl font-semibold">
              <img src="" className="inline w-10" /> Bank Reconciliation
            </h1>
          </div>

          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
              From Date<span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("fromDate")}
              type="date"
              className="form-control block w-full px-1 py-1.5 text-sm md:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
            />

            <span className="text-red-600 absolute text-xs">
              {formik.touched.fromDate && formik.errors.fromDate
                ? formik.errors.fromDate
                : null}
            </span>
          </div>
          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
              To Date<span className="text-red-500">*</span>
            </label>
            <input
              {...formik.getFieldProps("toDate")}
              type="date"
              className="form-control block w-full px-1 py-1.5 text-sm md:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
            />

            <span className="text-red-600 absolute text-xs">
              {formik.touched.toDate && formik.errors.toDate
                ? formik.errors.toDate
                : null}
            </span>
          </div>

          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
              Payment Mode<span className="text-red-500">*</span>
            </label>
            <select
              {...formik.getFieldProps("paymentMode")}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
            >
              <option value="">All</option>
              <option value="cheque">Cheque</option>
              <option value="dd">DD</option>
            </select>
            {/* <span className="text-red-600 absolute text-xs">{formik.touched.paymentMode && formik.errors.paymentMode ? formik.errors.paymentMode : null}</span> */}
          </div>
          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
              Verfication Type
            </label>
            <select
              {...formik.getFieldProps("verificationType")}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
            >
              <option>All</option>
              <option value="clear">Clear</option>
              <option value="bounce">Bounce</option>
              <option value="pending">Pending</option>
            </select>
            {/* <span className="text-red-600 absolute text-xs">{formik.touched.verificationType && formik.errors.verificationType ? formik.errors.verificationType : null}</span> */}
          </div>
          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
              Cheque/DD no.
            </label>
            <input
              {...formik.getFieldProps("cheque_dd_no")}
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
            />

            <span className="text-red-600 absolute text-xs">
              {formik.touched.cheque_dd_no && formik.errors.cheque_dd_no
                ? formik.errors.cheque_dd_no
                : null}
            </span>
          </div>

          <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
            {
              <button
                type="submit"
                className="px-10 text-base py-1.5 mt-7 bg-green-600 text-white font-medium rounded shadow-md hover:bg-green-700 hover:shadow-lg"
              >
                Filter
              </button>
            }
          </div>
        </div>
      </form>
      <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
        {
          <button
            onClick={() => setFilteredData(false)}
            className="px-10 text-base py-1.5 mt-7 bg-sky-600 text-white font-medium rounded shadow-md hover:bg-sky-700 hover:shadow-lg"
          >
            View All Record
          </button>
        }
      </div>

      <div className="border-b mx-10 my-5"></div>
      <div className="p-5">
        {filteredData == false && data?.data?.status == true ? (
          <ListTable columns={COLUMNS} dataList={data?.data?.data} />
        ) : (
          filteredData == false && (
            <p className="text-center font-semibold"> No data Found!</p>
          )
        )}
        {filteredData && filteredData?.data?.status == true ? (
          <ListTable columns={COLUMNS} dataList={filteredData?.data?.data} />
        ) : (
          filteredData && (
            <p className="text-center font-semibold"> No Filter data Found!</p>
          )
        )}
      </div>

      {/* Model Start */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* FORM 2 ->In Popup For Reconcile */}

        <form onSubmit={formik2.handleSubmit}>
          <div class="bg-sky-200 rounded-lg shadow-xl border-2 border-gray-50 grid grid-cols-2 p-4">
            <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Status
              </label>
              <select
                name="clearStatus"
                onChange={(e) => handleClearStatus(e)}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
              >
                <option value="">--select--</option>
                <option value="bounce">Bounce</option>
                <option value="clear">Clear</option>
              </select>
              <span className="text-red-600 absolute text-xs">
                {formik2.touched.clearStatus && formik2.errors.clearStatus
                  ? formik2.errors.clearStatus
                  : null}
              </span>
            </div>
            <div className="col-span-12"></div>
            <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Clearance Date
              </label>
              <input
                onChange={(e) => handleClearanceDate(e)}
                type="date"
                className="w-80 form-control block w-fullpx-1 py-1.5 px-2 text-sm md:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
              />

              <span className="text-red-600 absolute text-xs">
                {formik.touched.clearDate && formik.errors.clearDate
                  ? formik.errors.clearDate
                  : null}
              </span>
            </div>
            <div className="col-span-12"></div>

            {actionState == "bounce" && (
              <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Reason*
                </label>
                <select
                  onChange={(e) => handleClearReason(e)}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                >
                  <option value="">--select--</option>
                  <option value="Insufficient funds">Insufficient funds</option>
                  <option value="Irregular signature">
                    Irregular signature
                  </option>
                  <option value="Stale and post dated cheque">
                    Stale and post dated cheque
                  </option>
                  <option value="Alterations">Alterations</option>
                  <option value="Frozen account">Frozen account</option>
                  <option value="other">Other</option>
                </select>
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.reason && formik.errors.reason
                    ? formik.errors.reason
                    : null}
                </span>
              </div>
            )}
            <div className="col-span-12"></div>

            {actionState == "bounce" && (
              <div className="form-group mb-1 md:mb-2 col-span-4 md:col-span-3 md:px-4">
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  Cancelation Charge
                </label>
                <input
                  onChange={(e) => HandleClearCharge(e)}
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                />
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.charge && formik.errors.charge
                    ? formik.errors.charge
                    : null}
                </span>
              </div>
            )}
            <div className="col-span-12"></div>
            <div className="flex justify-end mt-4">
              {/* dipu */}
              <div>
                <RotatingLines
                  strokeColor="blue"
                  strokeWidth="5"
                  animationDuration="0.55"
                  width="40"
                  visible={loaderForClearBtn}
                />
              </div>
              {!loaderForClearBtn && (
                <button
                  type="submit"
                  className="text-center bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg transition ease-in-out hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PaymentReconcileIndex;

/**
 * Exported to :
 * 1. PaymentMasterSidebar.js
 *
 *
 */
