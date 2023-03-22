//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 13 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafWorkflowIndex (closed)
//    DESCRIPTION - PropertySafWorkflowIndex Component
//   Name - Swati sharma (integrated Api)
//////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import Search from "@/Components/MailboxComponent/Search";
import MailboxSidebar from "@/Components/Common/MailboxSidebar";
import { useQuery } from "react-query";
import axios from "axios";
import PropertySafListBox from "./PropertySafListBox";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { useNavigate } from "react-router-dom";
import {safWorkflowCandidateNameKey} from '@/Components/Snippets/keylist'
import ApiHeader from "@/Components/ApiList/ApiHeader";


function Mailbox() {
  const { api_getWorkflowCandidates } = ProjectApiList();
  const [tabIndex, settabIndex] = useState(0); //state to store current tab index
  const [tabs, setTabs] = useState([
    { title: "Inbox", tabIndex: 0 },
    { title: "Outbox", tabIndex: 1 },
    { title: "Special", tabIndex: 2 }
  ]);
  const navigate = useNavigate()




  const safWorkflowId = 1;

  const [workflowCandidate, setWorkflowCandidate] = useState();

  console.log("workflowcandidate....", workflowCandidate);

  useEffect(() => {
    fetchDetailsById();
    setTabData()
  }, []);

  const fetchDetailsById = () => {
    const header = ApiHeader()
    axios
      .post(`${api_getWorkflowCandidates}`, { workflowId: 4 }, header)
      .then(function (response) {
        console.log("worlflow candidate list by workflow id...", response.data);
        setWorkflowCandidate(response.data);
      })
      .catch(function (error) {
        console.log("worlflow candidate list by workflow id error...", error);
      });
  };

  const setTabData = () => {
    let roles = JSON.parse(window.localStorage.getItem("roles"));
    console.log('roles in tabs..',roles)
    let filterTab = roles?.filter((role)=>{
      return role == safWorkflowCandidateNameKey?.BO
    })

    console.log('filter tab..',filterTab)
    if(filterTab?.length !=0){
      setTabs([
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Special", tabIndex: 2 },
        { title: "BTC List", tabIndex: 3 },
      ])
    }
    
  } 

  const onSuccess = (data) => {
    console.log("inbox custom quey fething data ....", data);
    // if table array is not empty then activate table
    // { (data.data.data.data_list.length > 0) && setTableState(true) }
  };

  const { isLoading, data, isError, error } = useQuery(
    "safCandidateList",
    () => {
      // return axios.post(`${api_getWorkflowCandidates()}/${safWorkflowId}`, api_headers());
      // axios.post(`${api_getWorkflowCandidates}`,{workflowId : 4}, api_headers())
    },
    {
      onSuccess,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // let isLoading=true

  if (!isLoading) {
    console.log("workflow candidate list ", data);
  }
  // tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
  const tabSwitch = (index) => {
    // updating the tab index to recent value
    settabIndex(index);
  };

  return (
    <>
      {/* <div className="grid grid-cols-12 mb-2">
                <div className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold'><TbWebhook className='inline' /> Saf WorkFlow</div>
            </div> */}

      <div className="grid grid-cols-12 rounded-lg mt-0 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">

        <div className="col-span-12 sm:col-span-12 ">
          {isLoading && <h1>Looading ...</h1>}
          {!isLoading && !isError && (
            <MailboxSidebar
              candidateListStatus={true}
              workflowCandidates={workflowCandidate}
              tabs={tabs}
              fun={tabSwitch}
            />
          )}
          {/* {!isLoading && (!isError && <MailboxSidebar candidateListStatus={true} workflowCandidates={data?.data} tabs={tabs} fun={tabSwitch} />)} */}
          {/* <MailboxSidebar candidateListStatus={true} workflowId={6} tabs={tabs} fun={tabSwitch} /> */}
        </div>{" "}
        {/** MailboxSidebar - common mailbox sidebar component */}
        {tabIndex == 0 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PropertySafListBox
              workflowCandidates={workflowCandidate}
              boxType="inbox"
            />
          </div>
        )}
        {tabIndex == 1 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PropertySafListBox boxType="outbox" />
          </div>
        )}
        {tabIndex == 2 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PropertySafListBox
              workflowCandidates={workflowCandidate}
              boxType="specialbox"
            />
          </div>
        )}
        {tabIndex == 3 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PropertySafListBox
              workflowCandidates={workflowCandidate}
              boxType="btcbox"
            />
          </div>
        )}

      </div>
    </>
  );
}

export default Mailbox;
/**
 * Exported to :
 * 1. App.js
 *
 */
