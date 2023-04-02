//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 26 nov 2022
// Revision - 1
// Project - JUIDCO
// Component  - PilotWorkflowTabs
// DESCRIPTION - #CASES HANDLED IN THIS FORM
//////////////////{*****}//////////////////////////////////////////
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StatusTimeline from "@/Components/MailboxComponent/StatusTimeline";
import PilotWorkflowDataCard from "./PilotWorkflowDataCard";
import PilotWorkflowDocumentViewTab from "./PilotWorkflowTabs/PilotWorkflowDocumentViewTab";
import PilotWorkflowActions from "./PilotWorkflowActions";
import EmptyDetailsIllustration from "@/Components/Common/EmptyDetails/EmptyDetailsIllustration";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { ColorRing } from "react-loader-spinner";
import PilotWorkflowDocumentVerify from "./PilotWorkflowTabs/PilotWorkflowDocumentVerify";
import PilotWorkflowDocumentUpload from "./PilotWorkflowTabs/PilotWorkflowDocumentUpload";
import PilotWorkflowDepartmentalCommunication from "./PilotWorkflowTabs/PilotWorkflowDepartmentalCommunication";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";
import apiList from "@/Components/ApiList/PropertyApiList";
import PilotWorkflowFullDetailsTab from "./PilotWorkflowTabs/PilotWorkflowFullDetailsTab";
import CustomErrorBoundary from "@/Components/Common/CustomErrorBoundary";
import BarLoader from "@/Components/Common/BarLoader";
import BottomErrorCard from "@/Components/Common/BottomErrorCard";
import { ErrorMessage } from "formik";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#00BFFF",
    border: "none",
  },
};
Modal.setAppElement("#modal");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PilotWorkflowTabs(props) {
  console.log('workflowInfo at pilotworkflowtabs....', props?.workflowInfo)
  const [modalIsOpen, setIsOpen] = useState(false);
  const { getSafDoc } = apiList()
  const [showTabs, setshowTabs] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [approvedMsg, setApprovedMsg] = useState("");
  const [index, setindex] = useState()

  const [applicationData2, setApplicationData2] = useState({})
  const [value, setValue] = useState(0);
  const [applicationData, setApplicationData] = useState({});
  //setting verification level from 0 as backoffice to show in graphics
  const [verificationLevel, setverificationLevel] = useState(0);
  const [refresh, setrefresh] = useState(0)
  const [roleId, setroleId] = useState(0)
  const [applicationId, setapplicationId] = useState()
  const [stepperCurrentIndex, setstepperCurrentIndex] = useState(0)
  const [allDocumentUploadStatus, setallDocumentUploadStatus] = useState()
  const [allDocumentVerifyStatus, setallDocumentVerifyStatus] = useState()
  const [activeTab, setactiveTab] = useState(0)
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);



  const roles = [11, 6, 5, 7, 9, 10];
  function openModal(msg) {
    console.log("inside openmodal....");
    setApprovedMsg(msg);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleChangeTabs = (event, newValue) => {
    console.log('value at workflow tabs...', newValue)
    setValue(newValue);
    setindex(newValue)
  };

  const notify = (toastData, actionFlag) => {
    toast.dismiss();
    {
      actionFlag == "escalated" && toast.success(toastData);
    }
    {
      actionFlag == "de-escalated" && toast.warn(toastData);
    }
    {
      actionFlag == "error" && toast.error(toastData);
    }
  };

  useEffect(() => {
    fetchDetailsById();
  }, [props.id, refresh]);


  useEffect(() => {
    setapplicationId(props?.id)
    console.log('refresh data => ', refresh)
    console.log("index => ", index)
    console.log("upload api => ", props?.api?.api_uploadDocumentShow)
    axios[props?.api?.api_uploadDocumentShow?.method](props?.api?.api_uploadDocumentShow?.url, { applicationId: props?.id }, ApiHeader())
      .then((res) => {
        console.log("at upload document list to show => ", res)
        setApplicationData2(res?.data?.data)
      })
      .catch((err) => {
        console.log("bo doc upload data error => ", err)
      })
    // }, [index != null, refresh])
  }, [])



  console.log('document upload status...', allDocumentUploadStatus)
  console.log('document verify status...', allDocumentVerifyStatus)
  const verificationTimeline = (cRole) => {
    console.log("current role is...", cRole);
    setverificationLevel(roles.indexOf(cRole));
  };

  const fetchDetailsById = () => {
    setisLoading(true);
    const header = ApiHeader()

    console.log("id before getting dta =>", props?.id)
    axios
    [props?.api?.api_details?.method](props?.api?.api_details?.url, { applicationId: props?.id }, header)
      .then(function (response) {
        console.log("==2 details by id response...", response?.data);
        setApplicationData(response?.data);
        stepperSetting(response?.data?.data?.timelineData?.wfRoleId)
        verificationTimeline(response?.data?.data?.current_role);
        setroleId(response?.data?.data?.current_role)
        console.log("role id in main => ", response?.data?.data?.current_role)

        // SETTING ALL DOCUMENT UPLOAD STATUS AND ALL DOCUMENT VERIFY STATUS TO RESTRICT LEVEL SENDING
        setallDocumentUploadStatus(response?.data?.data?.doc_upload_status)
        setallDocumentVerifyStatus(response?.data?.data?.doc_verify_status)

        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        setisLoading(false);
      });
  };

  const stepperSetting = (currentRoleId) => {
    //FINDING THE INDEX ID OF CURRENT ROEL FROM MEMBERS ARRAY TO SHOW STEPPER
    console.log('current role id at stepper...', currentRoleId)
    const extractedRoleArray = props?.workflowInfo?.members.map((data, index) => {
      return data?.role_id

    })
    let stepperCurrentIndex = extractedRoleArray.indexOf(currentRoleId)
    setstepperCurrentIndex(stepperCurrentIndex)
  }


  console.log('index of current role id...', stepperCurrentIndex)

  if (props.id == "") {
    return (
      <EmptyDetailsIllustration
        fun={props.fun}
        title="No Application Selected !"
      />
    );
  }

  const funId = (id) => {
    setindex(id)
    console.log("🚀 ~ file: PropertyConcessionDetailsTabs.js:147 ~ funId ~ id", id);
  }

  const changeTabFun = (index) => {
    setactiveTab(index)
  }

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }
  console.log('permission at workflow tabssss...', props?.workflowInfo)
  return (
    <>

      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      {/* <div>current role...{applicationData?.data?.current_role}</div> */}
      {isLoading && (
        <BarLoader />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="">
        <div className="flex">
          {/* StatusTimeline to show the progress level of holding application */}
          {/* DYNAMIC WORKFLOW VERIFICATION TIMELINE */}
          {
            props?.workflowInfo?.members?.map((data, index) => (
              <div>
                <StatusTimeline
                  index={index + 1}
                  level={data?.role_name}
                  verificationStatus={index < stepperCurrentIndex ? true : false}
                  last={index == props?.workflowInfo?.members?.length - 1 ? true : false}
                  active={index == stepperCurrentIndex ? true : false}
                  backStatus={false}
                  btc={false}
                />
              </div>
            ))
          }

        </div>
        {/* DetailTable to show basic details of holding application */}
        {/* <PilotWorkflowDataCard applicationData={data?.data} /> */}
        <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDataCard" >
          <PilotWorkflowDataCard permissions={props?.workflowInfo?.permissions} tabIndex={props?.tabIndex} workflow={props?.workflow} id={props?.id} applicationData={applicationData} index={funId} />
        </CustomErrorBoundary>
        {/* {props?.workflowInfo?.permission?.tabsAllowed && <div className=" "> */}
        {5 > 4 && <div className=" ">

          <div className="flex space-x-4 uppercase text-gray-600 text-sm pl-4 border-b border-gray-200 mb-6">
            <div onClick={() => changeTabFun(0)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}>
              <span>View Details</span>
            </div>
            {props?.workflowInfo?.permissions?.can_view_document == true && <div onClick={() => changeTabFun(1)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>View Documents</span></div>}

            {props?.boxType == 'inbox' && <div onClick={() => changeTabFun(2)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>Action</span></div>}

            {props?.workflowInfo?.permissions?.can_upload_document == true && props?.boxType == 'inbox' && <div onClick={() => changeTabFun(3)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 3 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>Upload Documents</span></div>}

            {props?.workflowInfo?.permissions?.can_verify_document == true && props?.boxType == 'inbox' && <div onClick={() => changeTabFun(4)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 4 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>Verify Documents</span></div>}

            {props?.workflowInfo?.permissions?.allow_free_communication == true && <div onClick={() => changeTabFun(5)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 5 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>Departmental Communication</span></div>}

            {props?.customTabs != null && <div onClick={() => changeTabFun(6)} className={`pb-3 flex-initial cursor-pointer ${activeTab == 6 ? 'border-b-2 border-blue-500 text-blue-500' : 'no-underline border-none'}`}><span>Custom Tab</span></div>}
          </div>
          {/* BO TABS */}
          <Box sx={{ width: "100%" }}>
            {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChangeTabs}
                aria-label="basic tabs example"
              >
                <Tab label="View Details" {...a11yProps(0)} />
                {props?.workflowInfo?.permissions?.can_view_document == true && <Tab label="View Documents" {...a11yProps(1)} />}
                {props?.boxType == 'inbox' && <Tab label="Workflow" {...a11yProps(1)} />}
                {props?.workflowInfo?.permissions?.can_upload_document == true && props?.boxType == 'inbox' && <Tab label="Upload Documents" {...a11yProps(2)} />}
                {props?.workflowInfo?.permissions?.can_verify_document == true && props?.boxType == 'inbox' && <Tab label="Verify Documents" {...a11yProps(4)} />}
                {props?.workflowInfo?.permissions?.allow_free_communication == true && <Tab label="Departmental Communication" {...a11yProps(3)} />}
                {props?.customTabs != null &&
                  <Tab label={props?.customTabs?.label} {...a11yProps(6)} />
                }

               

              </Tabs>
            </Box> */}

            {/* <TabPanel value={value} index={0}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowFullDetailsTab" >
                <PilotWorkflowFullDetailsTab applicationData={applicationData} id={applicationId} />
              </CustomErrorBoundary>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentViewTab" >
                <PilotWorkflowDocumentViewTab applicationData={applicationData} api={props?.api} id={applicationId} />
              </CustomErrorBoundary>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowActions" >
                <PilotWorkflowActions allDocumentUploadStatus={allDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api}
                  toast={notify}
                  permissions={props?.workflowInfo?.permissions}
                  workflowInfo={props?.workflowInfo}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  showTabs={showTabs}
                  openModal={openModal}
                  id={applicationId}
                  setrefresh={setrefresh}
                  refresh={refresh}
                  fun={props?.fun}
                />
              </CustomErrorBoundary>

            </TabPanel>
            <TabPanel value={value} index={3}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentUpload" >
                <PilotWorkflowDocumentUpload allDocumentUploadStatus={allDocumentUploadStatus} setallDocumentUploadStatus={setallDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api} id={applicationId} applicationData={applicationData} applicationData2={applicationData2} refresh={() => setrefresh(refresh + 1)} />
              </CustomErrorBoundary>

            </TabPanel>
            <TabPanel value={value} index={4}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentVerify" >
                <PilotWorkflowDocumentVerify allDocumentUploadStatus={allDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} setallDocumentVerifyStatus={setallDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api} id={applicationId} />
              </CustomErrorBoundary>

            </TabPanel>
            <TabPanel value={value} index={5}>
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDepartmentalCommunication" >
                <PilotWorkflowDepartmentalCommunication workflow={props?.workflow} permissions={props?.workflowInfo?.permissions} applicationData={applicationData} departmentalPost={applicationData?.data?.departmentalPost} api={props?.api} id={applicationId} roleId={roleId} />
              </CustomErrorBoundary>


            </TabPanel>
            {props?.customTabs != null &&
              <TabPanel value={value} index={6}>
                <CustomErrorBoundary errorMsg="Bug in custom tab passed by you" >
                  {props?.customTabs?.tabComponent(applicationId, props?.workflowInfo)}
                </CustomErrorBoundary>
              </TabPanel>
            } */}
            {activeTab == 0 && <CustomErrorBoundary errorMsg="Bug in PilotWorkflowFullDetailsTab" >
              <PilotWorkflowFullDetailsTab applicationData={applicationData} id={applicationId} />
            </CustomErrorBoundary>}
            {activeTab == 1 && props?.workflowInfo?.permissions?.can_view_document == true &&
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentViewTab" >
                <PilotWorkflowDocumentViewTab applicationData={applicationData} api={props?.api} id={applicationId} />
              </CustomErrorBoundary>
            }
            {activeTab == 2 && props?.boxType == 'inbox' &&
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowActions" >
                <PilotWorkflowActions allDocumentUploadStatus={allDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api}
                  toast={notify}
                  permissions={props?.workflowInfo?.permissions}
                  workflowInfo={props?.workflowInfo}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  showTabs={showTabs}
                  openModal={openModal}
                  id={applicationId}
                  setrefresh={setrefresh}
                  refresh={refresh}
                  fun={props?.fun}
                  activateBottomErrorCard={activateBottomErrorCard}
                />
              </CustomErrorBoundary>

            }
            {activeTab == 3 && props?.workflowInfo?.permissions?.can_upload_document == true && props?.boxType == 'inbox' &&
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentUpload" >
                <PilotWorkflowDocumentUpload allDocumentUploadStatus={allDocumentUploadStatus} setallDocumentUploadStatus={setallDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api} id={applicationId} applicationData={applicationData} applicationData2={applicationData2} refresh={() => setrefresh(refresh + 1)} activateBottomErrorCard={activateBottomErrorCard} />
              </CustomErrorBoundary>

            }
            {activeTab == 4 && props?.workflowInfo?.permissions?.can_verify_document == true && props?.boxType == 'inbox' &&
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDocumentVerify" >
                <PilotWorkflowDocumentVerify allDocumentUploadStatus={allDocumentUploadStatus} allDocumentVerifyStatus={allDocumentVerifyStatus} setallDocumentVerifyStatus={setallDocumentVerifyStatus} handleChangeTabs={handleChangeTabs} api={props?.api} id={applicationId} activateBottomErrorCard={activateBottomErrorCard} />
              </CustomErrorBoundary>

            }
            {activeTab == 5 && props?.workflowInfo?.permissions?.allow_free_communication == true &&
              <CustomErrorBoundary errorMsg="Bug in PilotWorkflowDepartmentalCommunication" >
                <PilotWorkflowDepartmentalCommunication workflow={props?.workflow} permissions={props?.workflowInfo?.permissions} applicationData={applicationData} departmentalPost={applicationData?.data?.departmentalPost} api={props?.api} id={applicationId} roleId={roleId} activateBottomErrorCard={activateBottomErrorCard} />
              </CustomErrorBoundary>


            }
            {activeTab == 6 && props?.customTabs != null &&
              <CustomErrorBoundary errorMsg="Bug in custom tab passed by you" >
                {props?.customTabs?.tabComponent(applicationId, props?.workflowInfo)}
              </CustomErrorBoundary>
            }
          </Box>

        </div>}

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <button
            onClick={closeModal}
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          ></button>
          <div class="p-6 text-center">
            <div className="w-full flex h-10">
              {" "}
              <span className="mx-auto text-green-400 text-xl font-semibold">
                <FiAlertCircle size={30} />
              </span>
            </div>
            <h3 class="mb-5 text-lg font-semibold text-gray-500 dark:text-gray-400">
              {approvedMsg}
            </h3>
            <button
              type="button"
              class="text-white bg-sky-400 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={closeModal}
            >
              Back
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

