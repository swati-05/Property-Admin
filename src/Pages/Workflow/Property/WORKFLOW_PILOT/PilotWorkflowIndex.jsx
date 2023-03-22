//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 13 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PilotWorkflowIndex (closed)
//    DESCRIPTION - PilotWorkflowIndex Component
//////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import MailboxSidebar from "@/Components/Common/MailboxSidebar";
import axios from "axios";
import PilotWorkflowListBox from "./PilotWorkflowListBox";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { useParams } from "react-router-dom";


function PilotWorkflowIndex(props) {

  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [workflowInfo, setworkflowInfo] = useState()
  const [workflowCandidates, setworkflowCandidates] = useState(0)
  const [autoTabIndex, setautoTabIndex] = useState()
  const [tabButtonClickState, settabButtonClickState] = useState(false)
  const { passedTabIndex, passedApplicationId } = useParams()
  console.log('direc....passed..', passedTabIndex, '  ', passedApplicationId)


  const [tabIndex, settabIndex] = useState(0); //state to store current tab index
  const [tabs, setTabs] = useState([
    { title: "Inbox", tabIndex: 0 },
    { title: "Outbox", tabIndex: 1 },
    { title: "Special", tabIndex: 2 },
    // { title: "BTC List", tabIndex: 3 },
    // { title: "Field Verified List", tabIndex: 4 },
  ]);

  useEffect(() => {

    console.log('has btc...', props?.workflowData?.hasBTC, ' ....', props?.workflowData?.hasFieldVerification)
    // BOTH IS TRUE THEN SHOW BOTH
    if (props?.workflowData?.hasBTC && props?.workflowData?.hasFieldVerification) {
      setTabs([
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Special", tabIndex: 2 },
        { title: "BTC List", tabIndex: 3 },
        { title: "Field Verified List", tabIndex: 4 }
      ])
    }

    // BOTH IS NOT TRUE AND BTC LIST IS TRUE ONLY
    if (!(props?.workflowData?.hasBTC && props?.workflowData?.hasFieldVerification) && props?.workflowData?.hasBTC) {
      setTabs([
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Special", tabIndex: 2 },
        { title: "BTC List", tabIndex: 3 },
      ])
    }

    // BOTH IS NOT TRUE AND FIELD VERIFICATION IS TRUE ONLY
    if (!(props?.workflowData?.hasBTC && props?.workflowData?.hasFieldVerification) && props?.workflowData?.hasFieldVerification) {
      setTabs([
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Special", tabIndex: 2 },
        { title: "Field Verified List", tabIndex: 4 }
      ])
    }

  }, [props?.workflowData])




  useEffect(() => {
    fetchWorkflowPermission()
    // setTabData()

    // 1 IF GET ANY PASSED INDEX THEN SET STATE TO CALL FUNCTION WHICH UPDATED TAB INDEX - NEXT IN MAILBOXSIDEBAR COMPONENT

    // if (passedTabIndex == '0' || passedTabIndex == '1' || passedTabIndex == '2' || passedTabIndex == '3' || passedTabIndex == '4') {
    //   setautoTabIndex(parseInt(passedTabIndex))
    // }

  }, []);

  //FETCH WORKFLOW DATA INCLUDING PERMISSION
  const fetchWorkflowPermission = () => {
    let requestBody = {
      workflowId: props?.workflowData?.workflow?.workflowId,
      module: props?.workflowData?.workflow?.moduleId
    }

    console.log('before fetch workflow info... ', requestBody)
    console.log('passed data app url... ', props?.workflowData?.api?.api_workflowInfo?.url)
    axios[props?.workflowData?.api?.api_workflowInfo?.method](props?.workflowData?.api?.api_workflowInfo?.url, requestBody, ApiHeader())
      .then(function (response) {
        console.log("workflow data in workflow...", response.data?.data);
        setworkflowInfo(response.data?.data)
      })
      .catch(function (error) {
        console.log("workflow data error", error);
      });
  };


  // tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
  const tabSwitch = (index) => {
    // updating the tab index to recent value
    settabIndex(index);
  };



  return (
    <>
      <div className="grid grid-cols-12 rounded-lg mt-0 -ml-10 shadow-xl broder-2 border-sky-200 bg-white">
        <div className="col-span-12 sm:col-span-12 ">
          {isLoading && <h1>Looading ...</h1>}
          {!isLoading && !isError && (
            <MailboxSidebar
              settabButtonClickState={settabButtonClickState}
              autoTabIndex={autoTabIndex}
              candidateListStatus={true}
              workflowInfo={workflowInfo}
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
            className="col-span-12 sm:col-span-12 shadow-lg  overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PilotWorkflowListBox
              tabIndex={tabIndex}
              autoTabIndex={autoTabIndex}
              tabButtonClickState={tabButtonClickState}
              settabButtonClickState={settabButtonClickState}
              api={props?.workflowData?.api}
              workflow={props?.workflowData?.workflow}
              COLUMNS={props?.workflowData?.tableColumns}
              customTabs={props?.workflowData?.customTabs}
              workflowInfo={workflowInfo}
              boxType="inbox"
            />
          </div>
        )}
        {tabIndex == 1 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PilotWorkflowListBox
              tabButtonClickState={tabButtonClickState}
              settabButtonClickState={settabButtonClickState}
              tabIndex={tabIndex}
              api={props?.workflowData?.api}
              workflow={props?.workflowData?.workflow}
              COLUMNS={props?.workflowData?.tableColumns}
              customTabs={props?.workflowData?.customTabs}
              workflowInfo={workflowInfo}
              boxType="outbox" />
          </div>
        )}
        {tabIndex == 2 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PilotWorkflowListBox
              tabButtonClickState={tabButtonClickState}
              settabButtonClickState={settabButtonClickState}
              tabIndex={tabIndex}
              api={props?.workflowData?.api}
              workflow={props?.workflowData?.workflow}
              COLUMNS={props?.workflowData?.tableColumns}
              customTabs={props?.workflowData?.customTabs}
              workflowInfo={workflowInfo}
              boxType="specialbox"
            />
          </div>
        )}
        {tabIndex == 3 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PilotWorkflowListBox
              tabButtonClickState={tabButtonClickState}
              settabButtonClickState={settabButtonClickState}
              tabIndex={tabIndex}
              api={props?.workflowData?.api}
              workflow={props?.workflowData?.workflow}
              COLUMNS={props?.workflowData?.tableColumns}
              customTabs={props?.workflowData?.customTabs}
              workflowInfo={workflowInfo}
              boxType="btcbox"
            />
          </div>
        )}
        {tabIndex == 4 && (
          <div
            className="col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll"
            style={{ height: "90vh" }}
          >
            <PilotWorkflowListBox
              tabIndex={tabIndex}
              api={props?.workflowData?.api}
              workflow={props?.workflowData?.workflow}
              COLUMNS={props?.workflowData?.tableColumns}
              customTabs={props?.workflowData?.customTabs}
              workflowInfo={workflowInfo}
              boxType="fieldbox"
            />
          </div>
        )}

      </div>
    </>
  );
}

export default PilotWorkflowIndex;
/**
 * Exported to :
 * 1. App.js
 *
 */
