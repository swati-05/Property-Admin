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
import BottomErrorCard from "@/Components/Common/BottomErrorCard";

function PilotWorkflowInboxList(props) {
  const [readymadeListData, setreadymadeListData] = useState(false);
  const [readymadeListStatus, setreadymadeListStatus] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

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
          console.log('inbox list response...', res?.data)
          if (res?.data?.status) {
            setreadymadeListData(res?.data?.data)
            setreadymadeListStatus(true)
          } else {
            activateBottomErrorCard(true)
            setreadymadeListStatus(false)
          }
          setisLoading(false)
        })
        .catch((err) => {
          console.log("Error while fetching Filter Data", err)
          activateBottomErrorCard(true)
          setreadymadeListStatus(false)
          setisLoading(false)

        });
    } else {
      axios[props?.api?.method](props?.api?.url, ApiHeader())
        .then((res) => {
          console.log('inbox list response...')
          if (res?.data?.status) {
            setreadymadeListData(res?.data?.data)
            setreadymadeListStatus(true)
          } else {
            activateBottomErrorCard(true)
            setreadymadeListStatus(false)
          }
          setisLoading(false)
        })
        .catch((err) => {
          activateBottomErrorCard(true)
          console.log("Error while fetching Filter Data", err)
          setreadymadeListStatus(false)
          setisLoading(false)

        });
    }
  }

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }


  return (
    <>
      {isLoading && (
        <BarLoader />
      )}
      {erroState &&
        <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">Sorry! </strong>
          <span className="block sm:inline">Some error occured while fetching list. Please try again later</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      }

      {readymadeListStatus && readymadeListData?.length != 0 &&
        <ListTable exportStatus={false} assessmentType={false} columns={columnSchema} dataList={readymadeListData} />
      }
      {
        readymadeListStatus && readymadeListData?.length == 0 &&
        <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
      }
      
    </>
  );
}

export default PilotWorkflowInboxList;

