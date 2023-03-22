//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 14 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafInbox (closed)
//    DESCRIPTION - PropertySafInbox Component
//      Name - Swati sharma (integrated Api)
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import ListTable from "@/Components/Common/ListTable/ListTable";
import LoadingData from "@/Components/Common/Loading/LoadingData";
import LoadingAnimation2 from "@/Components/TestDelete/LoadingAnimation2";
import ErrorPage from "@/Components/TestDelete/ErrorPage";
import api_safOutboxList from "@/Components/ApiList/api_safOutboxList";
import NoData from "@/Components/TestDelete/NoData";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import moment from 'moment'
import ApiHeader from "@/Components/ApiList/ApiHeader";

function PropertySafOutboxList(props) {
  const { api_safOutboxList } = ProjectApiList();

  const [tableState, setTableState] = useState(false);

  const COLUMNS = [
    {
      Header: "#",
      // accessor: 'ward_no'
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Ward No.",
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
  const onSuccess = (data) => {
    console.log("saf outBox custom quey fething data  ....", data?.data.data);
    // console.log('counter  ....', data?.data.data.length)
    //> if table array is not empty then activate table
    {
      data?.data.data.length > 0 && setTableState(true);
    }
  };

  const { isLoading, data, isError, error } = useQuery(
    "safOutboxList",
    () => {
      return axios.get(api_safOutboxList, header);
    },
    {
      onSuccess,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <>
      {/* {isLoading && <LoadingAnimation2/>}
            {isError && <ErrorPage/>}
            {!isLoading && (!isError && <ListTable assessmentType={false} columns={COLUMNS} dataList={data?.data?.data_list} />)} */}
      {isLoading && <LoadingAnimation2 />}
      {isError && <ErrorPage />}
      {!isLoading && !isError && tableState && (
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={data?.data.data}
        />
      )}
      {!isLoading && !tableState && <NoData />}
    </>
  );
}

export default PropertySafOutboxList;
/**
 * Exported to :
 * 1. PropertySafInbox Component
 *
 */
