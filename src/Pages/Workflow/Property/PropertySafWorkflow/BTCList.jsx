//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ListTable from "@/Components/Common/ListTable/ListTable";
import LoadingAnimation2 from "@/Components/TestDelete/LoadingAnimation2";
import ErrorPage from "@/Components/TestDelete/ErrorPage";
import NoData from "@/Components/TestDelete/NoData";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { ColorRing } from "react-loader-spinner";
import moment from 'moment'
import ApiHeader from "@/Components/ApiList/ApiHeader";

function BTCList(props) {
  const [tableState, setTableState] = useState(false);
  const [listStatus, setlistStatus] = useState(false);
  const [loadingStatus, setloadingStatus] = useState(false);
  const { api_safInboxList,api_safBTCList } = ProjectApiList();

  const COLUMNS = [
    {
      Header: "#",
      // accessor: 'ward_no'
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Ward No",
      accessor: "ward_no",
    },
    {
      Header: "Saf No.",
      accessor: "saf_no",
    },
    {
      Header: "Owner Name",
      accessor: "owner_name",
    },
    {
      Header: "Property Type",
      accessor: "property_type",
    },
    {
      Header: "Assessment Type",
      accessor: "assessment",
      Cell: ({ cell }) => (
        <div
          className={
            " rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 text-sm px-1  " +
            (cell.row.values.assessment == "New Assessment"
              ? "bg-green-200 text-green-900 "
              : "") +
            (cell.row.values.assessment == "Re Assessment"
              ? "bg-indigo-200 text-indigo-900 "
              : "") +
            (cell.row.values.assessment == "Mutation"
              ? "bg-red-200 text-red-900"
              : "")
          }
        >
          {Array.from(cell.row.values.assessment)[0]}
        </div>
      ),
    },
    {
        Header: 'Apply Date',
        accessor: 'apply_date',
        Cell: ({ cell }) => { return moment(cell.row.values.apply_date, 'YYYY-MM-DD').format('DD-MMM-yy') }

    }
    ,
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
  const onSuccess = (data) => {
    console.log("after fetching inbox list ....", data?.data);
    // if table array is not empty then activate table
    {
      data?.data?.data?.length > 0 && setTableState(true);
    }
  };

  const { isLoading, data, isError, error } = useQuery(
    "safBTCList",
    () => {
      return axios.post(api_safBTCList,{}, header);
    },
    {
      onSuccess,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

 
  return (
    <>
      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      {isError && <ErrorPage />}
      {!isLoading && !isError && tableState && (
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={data?.data?.data}
        />
      )}
      {/* {!isLoading &&(!tableState && <NoData/>)} */}
    </>
  );
}

export default BTCList;

