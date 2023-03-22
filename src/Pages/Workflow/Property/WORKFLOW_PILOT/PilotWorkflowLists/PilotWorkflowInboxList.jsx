//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import axios from "axios";
import ListTable from "@/Components/Common/ListTable/ListTable";
import BarLoader from "@/Components/Common/BarLoader";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function PilotWorkflowInboxList(props) {
  const [readymadeListData, setreadymadeListData] = useState(false);
  const [readymadeListStatus, setreadymadeListStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  let columnSchema = [...props?.COLUMNS]
  columnSchema = [
    ...columnSchema,
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <button
          onClick={() => {
            console.log('clicked id....', cell?.row?.original?.id)
            props.fun(cell?.row?.original?.id)
          }}
          className="bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 
            hover:text-white text-black"
        >
          View
        </button>
      ),
    }]


  useEffect(() => {
    fetchInboxList()
  }, [])

  const fetchInboxList = () => {
    console.log('at inbox list fetch')
    setisLoading(true)
    if (props?.api?.method == 'post') {
      axios[props?.api?.method](props?.api?.url, {}, ApiHeader())
        .then((res) => {
          console.log('inbox list response...',res?.data)
          setreadymadeListData(res.data?.data)
          setreadymadeListStatus(true)
          setisLoading(false)
        })
        .catch((err) => {
          console.log("Error while fetching Filter Data", err)
          setreadymadeListStatus(false)
          setisLoading(false)

        });
    } else {
      axios[props?.api?.method](props?.api?.url, ApiHeader())
        .then((res) => {
          console.log('inbox list response...')
          setreadymadeListData(res.data?.data)
          setreadymadeListStatus(true)
          setisLoading(false)
        })
        .catch((err) => {
          console.log("Error while fetching Filter Data", err)
          setreadymadeListStatus(false)
          setisLoading(false)

        });
    }
  }



  return (
    <>
      {isLoading && (
        <BarLoader />
      )}

      {readymadeListStatus && readymadeListData?.length != 0 &&
        <ListTable assessmentType={false} columns={columnSchema} dataList={readymadeListData} />
      }
      {
        readymadeListStatus && readymadeListData?.length == 0 &&
        <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
      }
    </>
  );
}

export default PilotWorkflowInboxList;

