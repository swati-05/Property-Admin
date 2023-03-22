//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 14 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafWorkflowTimeline (closed)
//    DESCRIPTION - PropertySafWorkflowTimeline Component
//      
//////////////////////////////////////////////////////////////////////////////////////
import CheckBoxInput from "@/Components/Shared/CheckBoxInput";
import RippleAnimation from "@/Components/Shared/RippleAnimation";
import TextArea from "@/Components/Shared/TextArea";
import { useState } from "react";
import axios from "axios";
import PilotWorkflowCommentTimeline from "./PilotWorkflowCommentTimeline";
import { useEffect } from "react";
import WorkflowTimelineCard from "../WorkflowTimelineCard";
import WorkflowTimelineCardLeft from "../WorkflowTimelineCardLeft";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import { IoIosArrowRoundForward } from 'react-icons/io'
import BarLoader from "@/Components/Common/BarLoader";







const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: 'none'
  },
};
Modal.setAppElement('#root');


function PilotWorkflowActions(props) {
  const [escalateStatus, setescalateStatus] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [roleDetails, setRoleDetails] = useState("");
  const [daId, setdaId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [comingRole, setcomingRole] = useState();
  const [independentRoleId, setindependentRoleId] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isResolved, setIsResolved] = useState(false);

  let prResponse // GLOBAL PROMISE FUNCTION VARIABLE

  function closeModal() {
    setIsOpen(false);
  }

  console.log("roleDetails", roleDetails);
  console.log(
    "workflow timeline in all.....",
    props?.applicationData?.data?.levelComments
  );

  const header = ApiHeader()

  //{////********recording comment here*******//////}
  const commentFun = (commentText) => {
    setCommentText(commentText);
    console.log("comment...", commentText);
  };

  // {////********sending independent comment*******//////}
  const sendIndependentComment = () => {
    setisLoading(true)
    console.log("comment", commentText);
    let requestBody = {
      // safId: props?.id,
      applicationId: props?.id,
      comment: commentText,
    };
    axios
    [props?.api?.api_independentComment?.method](props?.api?.api_independentComment?.url, requestBody, header)
      .then(function (response) {
        console.log('indpendent comment response..', response?.data)
        if (response?.data?.status) {
          props.toast("comment recorded successfully", "escalated"); // text escalated is just for color
        } else {
          props.toast("Something went wrongg", "error");
        }
        setisLoading(false)

      })
      .catch(function (error) {
        console.log('error in comment...', error)
        props.toast("Oops! Something went wrong", "error");
        setisLoading(false)

      });
  };

  //{////********sending application to level*******//////}
  const sendApplicationToLevel = (e) => {

    setisLoading(true)

    // if all document is not uploaded then back office cannot forward the application
    // if(comingRole == safWorkflowCandidateNameKey?.BO && props?.applicationData?.data?.doc_upload_status ==0){
    //   console.log('doucment is not uploaded my friend')
    //   props.toast("Please upload all document to forward the application", "error");
    //   return
    // }
    console.log("receiverRoleId ", e.target.value);
    console.log("senderRoleId", props?.applicationData?.data?.roleDetails?.wf_role_id);
    console.log("wow all", props?.applicationData);
    console.log("safId", props?.id);

    if (props?.permissions?.can_comment && commentText == '') {
      props.toast("Please write some comment", "de-escalated");
      return
    }
    let action
    if (e.target.id == 'btn_forward') {
      action = 'forward'
    }
    if (e.target.id == 'btn_backward') {
      action = 'backward'
    }

    let requestBody = {
      // safId: props?.id,
      applicationId: props?.id,
      comment: commentText,
      senderRoleId: props?.applicationData?.data?.roleDetails?.wf_role_id,
      receiverRoleId: e.target.value,
      action: action
    };

    console.log("...before next level concession applicaton..", requestBody);

    axios
    [props?.api?.api_sendLevel?.method](props?.api?.api_sendLevel?.url, requestBody, header)
      .then(function (response) {
        console.log("application forwarded", response);

        if (response?.data?.status) {
          props.showTabFun(false); //hiding tabs

          props.toast("comment recorded successfully", "escalated"); // text escalated is just for color
          {
            e.target.id == "btn_forward" &&
              props.toast("Application is forwarded successfully !", "escalated");
          }
          {
            e.target.id == "btn_back" &&
              props.toast(
                "Application send backward successfully",
                "de-escalated"
              );
          }
          {
            e.target.id == "btn_backToDa" &&
              props.toast(
                "Application send back to Dealing Assistant successfully !",
                "de-escalated"
              );
          }
          {
            e.target.id == "btn_independent_level" &&
              props.toast(
                "Application send back to Dealing Assistant successfully !",
                "de-escalated"
              );
          }
          props?.fun(null, 0)
        } else {
          console.log('document uploaded no...', response?.data)
          props.toast(response?.data?.message, "error");
        }
        setisLoading(false)


      })
      .catch(function (error) {
        props.toast("Oops! Something went wrong", "error");
        setisLoading(false)

      });

  };

  //{////********toggle escalate function*******//////}
  const escalateAction = async (status) => {
    setisLoading(true)

    // const promise = new Promise((resolve, reject) => {
    //   prResponse = resolve
    // });
    // console.log('prrrr..',prResponse)
    // setIsOpen(true)
    // console.log('before await')
    // const res = await promise;
    // if (res == 'reject') {
    //   console.log('promise rejected, going outside')
    //   return
    // }

    // console.log('after promise call')

    // return

    // CALL MODAL AND THEN PROCEED OF RETURN IF TRUE OR FALSE VALUE
    // myPromise
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // console.log('after promise')

    // return

    let escalateStatus;
    //setting escalate status via checkbox
    {
      status && (escalateStatus = 1);
    }
    {
      !status && (escalateStatus = 0);
    }

    //setting request body
    let requestBody = {
      escalateStatus: escalateStatus,
      // safId: props?.id,
      applicationId: props?.id,
    };

    console.log("escalate body....", requestBody);
    console.log(
      "---------------------------------escalate body....",
      props?.id
    );
    // return
    axios
    [props?.api?.api_escalate?.method](props?.api?.api_escalate?.url, requestBody, header)
      .then(function (response) {

        if (response?.data?.status) {
          {
            escalateStatus == 1 &&
              props.toast("Application Escalated Successfully!", "escalated");
          }
          {
            escalateStatus == 0 &&
              props.toast(
                "Application De-Escalated Successfully!",
                "de-escalated"
              );
          }

        } else {
          props.toast("Something went wrongg", "error");
        }
        setisLoading(false)


      })
      .catch(function (error) {
        props.toast("Oops! Something went wrong", "error");
        setisLoading(false)

      });
  };
  const swithEscalateStatus = (status) => {
    setescalateStatus(status); //setting the escalateStatus to show escalate view
    escalateAction(status);
  };

  //{////********sending back to citizen*******//////}
  const sendBackToCitizen = (e) => {
    setisLoading(true)

    console.log("safId", props?.id);
    if (commentText == '') {
      props.toast("Please write some comment", "de-escalated");
      return
    }
    let requestBody = {
      // safId: props?.id,
      applicationId: props?.id,
      workflowId: props?.applicationData?.data?.roleDetails?.workflow_id,
      comment: commentText,
      currentRoleId: props?.applicationData?.data?.roleDetails?.wf_role_id,
    };

    console.log('before saf back to citizen....', requestBody)

    axios
    [props?.api?.api_btc?.method](props?.api?.api_btc?.url, requestBody, header)
      .then(function (response) {
        console.log("back to citizen................. ", response);
        if (response?.data?.status) {
          props.showTabFun(false); //hiding tabs

          {
            e.target.id == "btn_backToCitizen" &&
              props.toast(
                "Application is forwarded to BTC successfully",
                "escalated"
              );
          }
          props?.fun(null, 0)
        } else {
          props.toast(response?.data?.message, "error");
        }
        setisLoading(false)

      })
      .catch(function (error) {
        props.toast("Oops! Something went wrong", "error");
        setisLoading(false)

      });
  };



  //{////********Application Approve & Reject*******//////}
  const approveRejectApplication = (e) => {
    setisLoading(true)


    // alert("clicked")
    console.log("safId", props?.id);
    console.log("Status for Approve Reject", e.target.value);

    let requestBody = {
      // safId: props?.id,
      applicationId: props?.id,
      workflowId: props?.applicationData?.data?.roleDetails?.workflow_id,
      roleId: props?.applicationData?.data?.roleDetails?.wf_role_id,
      status: e.target.value,
    };

    console.log("before approved requestbody...", requestBody);
    axios
    [props?.api?.api_approveReject?.method](props?.api?.api_approveReject?.url, requestBody, header)
      .then(function (response) {
        console.log("application status for approve a reject", response?.data);

        if (response?.data?.status) {
          console.log("inside approval.....", response?.data?.message);
          props.showTabFun(false); //hiding tabs

          props?.openModal(response?.data?.message);
          {
            e.target.value == "1" &&
              props.toast("Application is Approved ", "escalated");
          }
          {
            e.target.value == "0" &&
              props.toast("Application is Rejected", "de-escalated");
          }
          props?.fun(null, 0)
        } else {
          props.toast(response?.data?.message, "error");

        }
        setisLoading(false)


      })
      .catch(function (error) {
        console.log("errror ", error);
        props.toast("Oops! Something went wrong", 'error');
        setisLoading(false)

      });
  };
  console.log("data at timeline .....", props?.id);
  console.log(
    "current role id of user .....",
    props?.applicationData?.data?.roleDetails?.wf_role_id
  );
  console.log(
    "workFlow Id on workflowtimelinfe .....",
    props?.applicationData?.data?.workflow_id
  );

  console.log('permission at actions', props?.permissions)

  return (
    <>
      {isLoading && <BarLoader />}
      <div
        className={` grid grid-cols-12 shadow-lg border-2 border-gray-200 relative overflow-hidden h-auto`}
      >
        {
          props.showTabs && <>
            <div className={"bg-gray-200 col-span-12 md:col-span-5 h-auto"}>
              <h1
                className={
                  (escalateStatus ? "bg-sky-200" : "bg-sky-200") +
                  "  text-black font-semibold text-center py-2 mb-8"
                }
              >
                Members {escalateStatus ? <RippleAnimation /> : ""}
              </h1>



              {/**RippleAnimation to  highlight escalated application*/}
              <div className="px-2 hidden">
                <select className="shadow-lg h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
                  {props?.applicationData?.data?.time_line?.length
                    ? props?.applicationData?.data?.time_line.map((data) => (
                      <option value={data.id}>{data.designation}</option>
                    ))
                    : ""}
                </select>
              </div>
              <div className="px-2 mt-4 h-auto">
                {
                  props?.permissions?.can_comment &&
                  <>
                    <h1 className="text-xs">Comments</h1>
                    <div className="h-28">
                      <TextArea
                        commentFun={commentFun}
                        bgColor="bg-gray-100"
                        value={commentText}
                      />
                    </div>
                    <div className="flex mt-2 w-full">
                      <div className="flex-1">
                        <button className="bg-sky-400 text-white rounded-sm px-2 py-0 hover:shadow-lg">
                          <a
                            className=""
                            style={{ fontSize: "10px" }}
                            target="_blank"
                            href="https://www.google.com/inputtools/try/"
                          >
                            Type Hindi &#8594;
                          </a>
                        </button>
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={sendIndependentComment}
                          style={{ fontSize: "10px" }}
                          className="bg-sky-400 text-white rounded-sm px-2 hover:shadow-lg py-1 float-right"
                        >
                          Send Comment
                        </button>
                      </div>
                    </div>
                  </>
                }
                {props?.permissions?.can_escalate &&
                  <div>
                    <CheckBoxInput
                      is_escalate={props?.applicationData?.data?.is_escalate}
                      fun={swithEscalateStatus}
                    />
                  </div>
                }

                {/* SEND TO ANY LEVEL INDEPENDENTLY */}
                {props?.permissions?.allow_full_list == true && <div className="mt-4">
                  <div className="form-group mb-6 col-span-5 md:col-span-1 px-2">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Select Level</label>
                    <select onChange={(e) => setindependentRoleId(e.target.value)} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
                      placeholder="Enter new ward no." >
                      {
                        props?.workflowInfo?.members.map((data) => (
                          <option value={data?.role_id} >{data?.role_name}</option>
                        ))
                      }
                    </select>

                  </div>
                  <div className="flex justify-center items-center">
                    <button id="btn_independent_level" value={independentRoleId} onClick={sendApplicationToLevel} type="button" className="hover:scale-105 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Send Application</button>
                  </div>
                </div>}

                <div className="flex space-x-2">
                  {props?.permissions?.can_backward && <div className="flex-initial ">
                    <button
                      type="button"
                      id="btn_back"
                      value={props?.applicationData?.data?.roleDetails.backward_role_id}
                      className="w-full bg-indigo-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                      onClick={sendApplicationToLevel}
                    >
                      backward
                    </button>
                  </div>}
                  {props?.permissions?.can_forward &&
                    <div className="flex-initial">
                      <button
                        type="button"
                        id="btn_forward"
                        value={props?.applicationData?.data?.roleDetails.forward_role_id}
                        className="w-full bg-indigo-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                        onClick={sendApplicationToLevel}
                      >
                        forward
                      </button>
                    </div>
                  }
                  {/* {(props?.allDocumentUploadStatus == 0 && props?.permissions?.can_upload_document) &&
                    <div className="flex-initial">
                      <button
                        type="button"
                        className="w-full bg-white border border-indigo-500 text-indigo-500  shadow-lg  text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                        onClick={(e) => props?.handleChangeTabs(e, 3)}
                      >
                        Upload Documents
                      </button>
                    </div>
                  } */}
                  {/* {(props?.allDocumentVerifyStatus == 0 && props?.permissions?.can_verify_document) &&
                    <div className="flex-initial ">
                      <button
                        type="button"
                        className="w-full bg-white border border-indigo-500 text-indigo-500  shadow-lg  text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                        onClick={(e) => props?.handleChangeTabs(e, 4)}
                      >
                        Verify Documents
                      </button>
                    </div>
                  } */}
                </div>
                {props?.permissions?.buttonBTD && (
                  <div className="flex-initial ">
                    <button
                      type="button"
                      id="btn_backToDa"
                      value={daId}
                      className="bg-indigo-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                      onClick={sendApplicationToLevel}
                    >
                      Back to DA
                    </button>
                  </div>
                )}
                {props?.permissions?.can_btc && (
                  <div className="flex-initial ">
                    <button
                      type="button"
                      id="btn_backToCitizen"
                      value={daId}
                      className=" bg-indigo-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4 text-center"
                      onClick={sendBackToCitizen}
                    >
                      Back to Citizen
                    </button>
                  </div>
                )}

                {props?.permissions?.can_reject && (
                  <div className={`flex`}>
                    <div className="flex-1 pr-10">
                      <button
                        type="button"
                        id="btn_approve"
                        value={1}
                        className="block w-full bg-green-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-green-600 hover:text-white my-4"
                        onClick={approveRejectApplication}
                      >
                        Approve
                      </button>
                    </div>
                    <div className="flex-1 pl-10">
                      <button
                        type="button"
                        id="btn_reject"
                        value={0}
                        className="block w-full bg-red-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-red-600 hover:text-white my-4"
                        onClick={approveRejectApplication}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>


            </div>
          </>
        }
        <div className="col-span-12 md:col-span-7 bg-white oveflow-y-scroll">
          {/* <TimeLine /> */}
          <h1 className="text-center bg-gray-200 h-10 grid items-center font-semibold">
            Timeline
          </h1>

          {/* {props?.applicationData?.data?.time_line?.length &&
                        props?.applicationData?.data?.time_line.map((data, index) => (
                            <PilotWorkflowCommentTimeline index={index + 1} comment={data.message} role={data.role_name} track_date={data.track_date} />
                        ))
                    } */}
          {/* {props?.applicationData?.data?.citizenComment?.map((data, index) =>
            index % 2 == 0 ? (
              <WorkflowTimelineCard data={data} index={index} />
            ) : (
              <WorkflowTimelineCardLeft data={data} index={index} />
            )
          )}
          {props?.applicationData?.data?.levelComments?.map((data, index) =>
            index % 2 == 0 ? (
              <WorkflowTimelineCard data={data} index={index} />
            ) : (
              <WorkflowTimelineCardLeft data={data} index={index} />
            )
          )} */}
          {props?.applicationData?.data?.citizenComment == 0 && <div className="w-full text-center mt-4">
            <span className="text-red-400 font-semibold">
              No Comment Yet !
            </span>
          </div>}
          {props?.applicationData?.data?.citizenComment?.map((data, index) =>
            <WorkflowTimelineCardLeft data={data} index={index} />
          )}
          <div className="px-10"><hr></hr></div>
          {props?.applicationData?.data?.levelComment?.map((data, index) =>
            <WorkflowTimelineCardLeft data={data} index={index} />
          )}
        </div>
      </div>

      <div className="w-full h-20"></div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <button onClick={() => prResponse('reject')} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
            <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-6 text-center">
            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout ?</h3>
            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => prResponse('resolve')}>
              Yes, I'm sure
            </button>

          </div>
        </div>

      </Modal>
    </>


  );
}

export default PilotWorkflowActions;
/**
 * Exported to :
 * 1.PropertySafDetailsTabs Component
 *
 */
