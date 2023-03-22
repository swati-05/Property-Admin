//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenApplicationList (closed)
//    DESCRIPTION - CitizenApplicationList Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ListTable from "@/Components/Common/ListTable/ListTable";
import LoadingAnimation2 from "@/Components/TestDelete/LoadingAnimation2";
import ErrorPage from "@/Components/TestDelete/ErrorPage";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function CitizenApplicationList(props) {
  const COLUMNS = [
    {
      Header: "#",
      // accessor: 'ward_no'
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    // {
    //     Header: 'Ward No.',
    //     accessor: 'ward_no'
    // },
    {
      Header: "Citizen-Name",
      accessor: "user_name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },

    {
      Header: "ULB",
      accessor: "ulb_name",
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={() => props.fun(cell.row.values.id)}
          className="bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 
                hover:text-white text-black"
        >
          View
        </button>
      ),
    },
  ];
  const header = ApiHeader()
  const { isLoading, data, isError, error } = useQuery(
    "propertySafApplicationList-query",
    () => {
      // return axios.get("http://localhost:3001/citizenRegistraiton");
      return axios.get("http://192.168.0.166/api/get-all-citizens", header);
    }
  );
  if (!isLoading) {
    console.log("data at saf-workflow ", data);
  }
  return (
    <>
      {isLoading && <LoadingAnimation2 />}
      {isError && <ErrorPage />}
      {!isLoading && !isError && (
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={data?.data}
        />
      )}
    </>
  );
}

export default CitizenApplicationList;
/**
 * Exported to :
 * 1. PropertySafInbox Component
 *
 */
