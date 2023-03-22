//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StatusTimeline from "@/Components/MailboxComponent/StatusTimeline";
import PropertySafDetailsCard from "./PropertySafDetailsCard";
import PropertySafDetailsCard2 from "./PropertySafDetailsCard2";
import PropertySafDocumentView from "./PropertySafDocumentView";
import PropertySafWorkflowTimeline from "./PropertySafWorkflowTimeline";
import EmptyDetailsIllustration from "@/Components/Common/EmptyDetails/EmptyDetailsIllustration";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import axios from "axios";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { ColorRing } from "react-loader-spinner";
import PropertySafDocumentVerify from "./PropertySafDocumentVerify";
import BoDocUpload from "./BoDocUpload";
import PropertySafCustomTab from "./PropertySafCustomTab";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";
import apiList from "@/Components/ApiList/PropertyApiList";
import { safWorkflowCandidateNameKey } from '@/Components/Snippets/keylist'

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

export default function PropertySafDetailsTabs(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { api_getSafDetailsById } = ProjectApiList();
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
  const [currentRoleName, setCurrentRoleName] = useState()
  const [currentTabList, setcurrentTabList] = useState()



  console.log("workflow candidate in safDetailTabs...", props.members);

  console.log("-----------------outbox...", props.boxTypeFun);

  const roles = [11, 6, 5, 7, 9, 10];
  function openModal(msg) {
    console.log("inside openmodal....");
    setApprovedMsg(msg);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    console.log('refresh data => ', refresh)
    console.log("index => ", index)
    axios.get(getSafDoc + "/" + index, ApiHeader())
      .then((res) => {
        console.log("bo doc upload data success => ", res)
        setApplicationData2(res?.data?.data)
      })
      .catch((err) => {
        console.log("bo doc upload data error => ", err)
      })
  }, [index != null, refresh])


  
  const verificationTimeline = (cRole) => {
    console.log("current role is...", cRole);
    setverificationLevel(roles.indexOf(cRole));
  };

  const fetchDetailsById = () => {
    setisLoading(true);
    const header =ApiHeader()
    console.log("id before getting dta =>", props?.id)
    axios
      .post(`${api_getSafDetailsById}`, { id: props?.id }, header)
      .then(function (response) {
        console.log("==2 details by id response...", response?.data);
        setApplicationData(response?.data);
        renderCustomTabs(response?.data?.data?.current_role_name)
        verificationTimeline(response?.data?.data?.current_role);
        setroleId(response?.data?.data?.current_role)
        console.log("role id in main => ", response?.data?.data?.current_role)
        setisLoading(false);
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        setisLoading(false);
      });
  };

  const renderCustomTabs = (currentRoleName) => {
    console.log('current role name...',currentRoleName)
    setCurrentRoleName(currentRoleName)
  }

  console.log('current role.......in....', applicationData?.data?.current_role)


  // <EmptyDetailsIllustration title="No Application Selected !" />

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

  return (
    <>
      {/* <div>current role...{applicationData?.data?.current_role}</div> */}
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
      <ToastContainer position="top-right" autoClose={2000} />
      <div>
        <div className="flex">
          {/* StatusTimeline to show the progress level of holding application */}
          <div>
            <StatusTimeline
              index="1"
              level="Back Office"
              verificationStatus={verificationLevel >= 1 ? true : false}
              last={false}
              active={verificationLevel == 0 ? true : false}
              backStatus={false}
              btc={false}
            />
          </div>
          <div>
            <StatusTimeline
              index="2"
              level="Dealing Assistant"
              verificationStatus={verificationLevel >= 2 ? true : false}
              last={false}
              active={verificationLevel == 1 ? true : false}
              backStatus={false}
              btc={false}
            />
          </div>
          <div>
            <StatusTimeline
              index="3"
              level="Agency TC"
              verificationStatus={verificationLevel >= 3 ? true : false}
              last={false}
              active={verificationLevel == 2 ? true : false}
              backStatus={false}
              btc={false}
            />
          </div>
          <div>
            <StatusTimeline
              index="4"
              level="UlB TC"
              verificationStatus={verificationLevel >= 4 ? true : false}
              last={false}
              active={verificationLevel == 3 ? true : false}
              backStatus={true}
              btc={false}
            />
          </div>
          <div>
            <StatusTimeline
              index="5"
              level="Section Incharge"
              verificationStatus={verificationLevel >= 5 ? true : false}
              last={false}
              active={verificationLevel == 4 ? true : false}
              backStatus={false}
              btc={true}
            />
          </div>
          <div>
            <StatusTimeline
              index="6"
              level="Executive Officer"
              verificationStatus={verificationLevel >= 6 ? true : false}
              last={true}
              active={verificationLevel == 5 ? true : false}
              backStatus={false}
              btc={false}
            />
          </div>
        </div>
        {/* DetailTable to show basic details of holding application */}
        {/* <PropertySafDetailsCard applicationData={data?.data} /> */}
        <PropertySafDetailsCard applicationData={applicationData} index={funId} />
        <div className=""></div>

        {/* Tab view which contains three tabs, which are Saf Detials, Documents and Workflow */}

        {props.boxTypeFun != true && showTabs ? (
          <div className=" ">
            {/* BO TABS */}
            {currentRoleName == safWorkflowCandidateNameKey?.BO && <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Workflow" {...a11yProps(0)} />
                  <Tab label="Upload Documents" {...a11yProps(1)} />
                  <Tab label="Communication" {...a11yProps(2)} />

                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <PropertySafWorkflowTimeline
                  toast={notify}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  openModal={openModal}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <BoDocUpload id={index} applicationData={applicationData2} refresh={() => setrefresh(refresh + 1)} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PropertySafCustomTab id={index} roleId={roleId} />
              </TabPanel>
            </Box>}


            {/* DA TABS */}
            {currentRoleName == safWorkflowCandidateNameKey?.DA && <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Workflow" {...a11yProps(0)} />
                  <Tab label="Verify Documents" {...a11yProps(1)} />
                  <Tab label="Communication" {...a11yProps(2)} />

                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <PropertySafWorkflowTimeline
                  toast={notify}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  openModal={openModal}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PropertySafDocumentVerify id={index} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PropertySafCustomTab id={index} roleId={roleId} />
              </TabPanel>
            </Box>}

            {/* SI TABS */}
            {currentRoleName == safWorkflowCandidateNameKey?.SI && <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Workflow" {...a11yProps(0)} />
                  <Tab label="View Documents" {...a11yProps(1)} />
                  <Tab label="Communication" {...a11yProps(2)} />

                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <PropertySafWorkflowTimeline
                  toast={notify}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  openModal={openModal}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PropertySafDocumentView id={index} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PropertySafCustomTab id={index} roleId={roleId} />
              </TabPanel>
            </Box>}


            {/* EO TABS */}
            {currentRoleName == safWorkflowCandidateNameKey?.EO && <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Workflow" {...a11yProps(0)} />
                  <Tab label="View Documents" {...a11yProps(1)} />
                  <Tab label="Communication" {...a11yProps(2)} />

                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <PropertySafWorkflowTimeline
                  toast={notify}
                  applicationData={applicationData}
                  members={props.members}
                  showTabFun={setshowTabs}
                  openModal={openModal}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PropertySafDocumentView id={index} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PropertySafCustomTab id={index} roleId={roleId} />
              </TabPanel>
            </Box>}
          </div>
        ) : (
          ""
        )}
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

