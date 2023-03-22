import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import { TRADE } from '@/Pages/Trade/tradeComponent/TradeApiListFile'
import Demo from './Demo'

function NewTradeWorkflowEntry() {

  // LIST OF API'S
  const {
    api_safInboxList,
    api_safOutboxList,
    api_getsafSpecialList,
    api_safBTCList,
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
      api_inboxList: { method: 'post', url: TRADE.GET_APPLICATION_LIST },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: TRADE.GET_APPLICATION_LIST_OUTBOX },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: TRADE.GET_APPLICATION_LIST_SPECIAL },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: TRADE.BTC_LIST },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: api_fieldVerificationList },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: TRADE.GET_LICENSE_DTL_BY_ID },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: TRADE.SEND_INDEPENDENT_COMMENT },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: TRADE.POST_LICENSE_TO_LEVEL },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: TRADE.POST_ESCALATE },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: TRADE.POST_BTC },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: TRADE.POST_APPROVE_REJECT_APPLICATION },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: TRADE.POST_DEPARTMENTAL_POST },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: TRADE.GET_DEPARTMENTAL_POST },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: TRADE.DOCUMENT_REQUIREMENT },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: TRADE.DOCUMENT_UPLOAD },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: TRADE.GET_DOCUMENT_FOR_VERIFICATION },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: TRADE.GET_UPLOADED_DOCUMENTS },

    },
    workflow: {
      workflowName: 'New Trade Workflow',
      workflowId: 10,
      moduleId: 3,
      departmentalPostFor: 'TRADE',
      fullDetailsUrl: '/admin/trade-view'

    },

    tableColumns: [
      {
        Header: "#",
        // accessor: 'ward_no'
        Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
      },
      {
        Header: "Application No",
        accessor: "application_no",
      },
      {
        Header: "Apply Date.",
        accessor: "application_date",
      },
      {
        Header: "Apply From",
        accessor: "apply_from",
      },
      {
        Header: "Firm Name",
        accessor: "firm_name",
      },
      {
        Header: "Mobile No",
        accessor: "mobile_no",
        Cell: ({ cell }) =>
          // <div className={' rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 text-sm px-1  ' + (cell.row.values.id == 'New Assessment' ? 'bg - green - 200 text- green - 900 ' : '') + (cell.row.values.assessment_type == 'Reassessment' ? 'bg - indigo - 200 text - indigo - 900 ' : '') + (cell.row.values.assessment_type == 'Mutation' ? 'bg - red - 200 text - red - 900' : '')}>
          cell.row.values.mobile_no,
        // </div>
      },
      {
        Header: "Application Type",
        accessor: "application_type",
        // Cell: ({ value }) => <span>N/A</span>,
      }
      // ,
      // {
      //   Header: "Action",
      //   accessor: "id",
      //   Cell: ({ cell }) => (
      //     <button

      //       className="bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 
      //             hover:text-white text-black"
      //     >
      //       View
      //       {/* {cell.row.values.id} */}
      //     </button>
      //   ),
      // },
    ],
    // ADD CUSTOM TAB HERE eg: - 
    // NOTE(KEY MUST BE lable and tabComponent)
    customTabs: {
      label: 'Custom Tab',
      tabComponent: (applicationId, workflowPermission) => {
        return <Demo applicationId={applicationId} workflowPermission={workflowPermission} />
      }
    }
    // IF CUSTOM TAB IS NOT NEEDED, PLEASE PASS null value 
    // customTabs: null
  }
  return (
    <PilotWorkflowIndex workflowData={workflowRules} />
  )
}

export default NewTradeWorkflowEntry