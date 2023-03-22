//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 18 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  -
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import PaymentDataTable from "./Components/PaymentDataTable";
import { useQuery } from "react-query";
import axios from "axios";
import PaymentApiList from "./PaymentApiList";
import { RotatingLines } from "react-loader-spinner";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function PaymentsList(props) {
  // const [selectedRowData, setselectedRowData] = useState([]);
  let selectedDataList = [];

  const { getAllPayments } = PaymentApiList();

  const header =  ApiHeader()

  const handlebtnSendNotice = () => {
    const idlist = selectedDataList.map((row) => {
      return row.original.id;
    });
    console.log("Selected Rows", idlist);
  };

  const columns = [
    {
      Header: "Trans No",
      accessor: "transactionNo",
    },
    {
      Header: "ULB",
      accessor: "userDetails.ulbId",
      Cell: (props) => {
        return (
          <p>
            {props.value == "0" && <p className=''>Test</p>}
            {props.value == "2" && <p className=''>RMC</p>}
          </p>
        );
      }
    },
    {
      Header: "Dept.",
      accessor: "userDetails.departmentId",
      Cell: (props) => {
        return (
          <p>
            {props.value == "1" && <p className=''>Property</p>}
            {props.value == "2" && <p className=''>Water</p>}
            {props.value == "3" && <p className=''>Trade</p>}
            {props.value == "4" && <p className=''>Grivance</p>}
          </p>
        );
      }
    },
    {
      Header: "Rzp Order Id",
      accessor: "orderId",
    },
    {
      Header: "Payment_ID",
      accessor: "paymentId",
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (props) => {
        return <p>{props.value && "₹" + props.value}</p>;
      },
    },


    {
      Header: "Date Time",
      accessor: "date",
    },

    // {
    //     Header: 'Department',
    //     accessor: 'userDetails.departmentId',
    //     Cell: (props) => {
    //         return (
    //             <p>
    //                 {props.value == "captured" && <p className='bg-green-600 text-white font-semibold text-center px-1 py-0.5 rounded-md'>{props.value.departmentId}</p>}
    //                 {props.value == "failed" && <p className='bg-red-600 text-white font-semibold text-center px-1 py-0.5 rounded-md'>{props.value.departmentId}</p>}
    //                 {props.value == "authorized" && <p className='bg-yellow-600 text-white font-semibold text-center px-1 py-0.5 rounded-md'>{props.value.departmentId}</p>}
    //             </p>
    //         );
    //     }
    // },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props) => {
        return (
          <p>
            {props.value == "captured" && (
              <p className="bg-green-600 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                {props.value}
              </p>
            )}
            {props.value == "failed" && (
              <p className="bg-red-600 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                {props.value}
              </p>
            )}
            {props.value == "authorized" && (
              <p className="bg-yellow-600 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                {props.value}
              </p>
            )}
          </p>
        );
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={() =>
            props.viewActionBtnAllDetails(cell.row.values.transactionNo)
          }
          className="bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm"
        >
          View
        </button>
      ),
    },
  ];

  const { isLoading, data, isError, error } = useQuery(
    "api/payment/get-webhook-details--ok done",
    () => {
      return axios.get(getAllPayments, header);
    }
  );

  console.log("getAllPayments", data);

  if (!isLoading) {
  }
  // console.log("Data from api", data?.data.data)

  const selectedData = (e) => {
    // console.log("testing....", e)
    selectedDataList = e;
    // console.log('value at static variable ......', selectedDataList)
    // e.map((z)=>(
    //     console.log(z.original.id)
    // ))
  };

  console.log("data?.data?.data", data?.data?.data?.length)

  return (
    <>
      <div className="text-center">
        <h1 className="font-semibold my-3 text-2xl">
          All Payment Transaction Details
        </h1>
      </div>

      {isLoading ?
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="45"
          visible={true}
        />
        :
        <div className="mt-0 mx-0 px-1 pt-1 pb-10 bg-white mb-20">
          <p>
            Total No of Transactions : <span className="font-semibold mx-2"> {data?.data?.data?.length}</span>
            Total Success Amount : <span className="font-semibold mx-2">₹336 /-</span>
            Total Failed : <span className="font-semibold mx-2">₹98 /-</span>
          </p>

          <div>
            <div className="border rounded-lg shadow-lg pb-3">
              {!isLoading && (
                <PaymentDataTable
                  columns={columns}
                  data={data?.data?.data}
                  fun={selectedData}
                />
              )}
            </div>
          </div>
          {/* <div className="mt-5">
          <button
            onClick={handlebtnSendNotice}
            className="bg-green-500 hover:bg-green-600 hover:text-white py-1 px-2 font-semibold shadow-md"
          >
            Check Status
          </button>
        </div> */}
        </div>
      }
    </>
  );
}

export default PaymentsList;

/*
Exported To -
1. .js
*/
