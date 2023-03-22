import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'

function NoticeWorkflowEntry() {

  // LIST OF API'S
  const { api_safInboxList, api_safOutboxList, api_getsafSpecialList, api_safBTCList,
    api_postEscalateStatus,
    api_postComment,
    api_postApplicationToLevel,
    api_fetchRoleDetail,
    api_approveRejectForm,
    api_backToCitizen,
    api_getWorkflowCandidates,
    api_getSafDetailsById, api_getWorkflowPermission,
    api_workflowInfo,
    api_verifyDocuments,
    api_postDepartmental,
    api_uploadDocument,
    api_getDepartmentalData,
    getDocumentList,
    api_uploadDocumentShow,
    api_fieldVerificationList } = ProjectApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'get', url: api_safInboxList },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'get', url: api_safOutboxList },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'get', url: api_getsafSpecialList },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: api_safBTCList },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: api_fieldVerificationList },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: api_getSafDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: api_postComment },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: api_postApplicationToLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: api_postEscalateStatus },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: api_backToCitizen },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: api_approveRejectForm },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: api_uploadDocumentShow },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: api_uploadDocument },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: api_verifyDocuments },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: getDocumentList },

    },
    workflow: {
      workflowName: 'Notice-Workflow AT',
      workflowId: 4,
      moduleId: 1
    },

    tableColumns: [
      {
        Header: "#",
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
      }
    ],
    // ADD CUSTOM TAB HERE eg: - 
    // NOTE(KEY MUST BE lable and tabComponent)
    // customTabs: {
    //   label: 'Test Tab',
    //   tabComponent: <TestTab />
    // }
    // IF CUSTOM TAB IS NOT NEEDED, PLEASE PASS null value 
    customTabs: null
  }
  return (
    < PilotWorkflowIndex workflowData={workflowRules} />
  )
}

export default NoticeWorkflowEntry