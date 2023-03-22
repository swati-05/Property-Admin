import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BackendUrl from '@/Components/ApiList/BackendUrl'

function HoldingDeactivationWorkflowEntry() {

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Holding Deactivation Workflow')

  // LIST OF API'S
  const {

    post_HoldingDeactivationIndependentComment,
    api_workflowInfo,
    api_verifyDocuments,
    api_postDepartmental,
    api_getDepartmentalData,
  } = ProjectApiList()
  const {
    get_HoldingDeactivationInbox,
    get_HoldingDeactivationOutbox,
    post_HoldingDeactivationApprovalRejection,
    get_HoldingDeactivationDetailsById,
    post_HoldingDeactivationNextLevel,
    post_HoldingDeactivationEscalate,
    get_HoldingDeactivationUploadedDocuments } = PropertyApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'post', url: get_HoldingDeactivationInbox },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: get_HoldingDeactivationOutbox },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: '' },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: '' },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: '' },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: get_HoldingDeactivationDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: post_HoldingDeactivationIndependentComment },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: post_HoldingDeactivationNextLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: post_HoldingDeactivationEscalate },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: '' },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: post_HoldingDeactivationApprovalRejection },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: '' },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: '' },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: api_verifyDocuments },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: get_HoldingDeactivationUploadedDocuments },
      documentBaseUrl: BackendUrl

    },
    workflow: {
      workflowName: 'Holding-Deactivation-Workflow',
      workflowId: 167,
      moduleId: 1
    },

    tableColumns: [
      {
        Header: "#",
        Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
      },

      {
        Header: "Owner's Name",
        accessor: "owner_name",
      },
      {
        Header: "Guardian Name",
        accessor: "guardian_name",
      },
      {
        Header: "Holding No.",
        Cell: ({ cell }) => (
          <span>{cell.row.original.new_holding_no == '' ? cell.row.original.holding_no : cell.row.original.new_holding_no}</span>
        ),
      },
      {
        Header: "Mobile No.",
        accessor: "mobile_no",
      },

    ],
    // ADD CUSTOM TAB HERE eg: - 
    // NOTE(KEY MUST BE lable and tabComponent)
    // customTabs: {
    //   label: 'Test Tab',
    //   tabComponent: <TestTab />
    // }
    // IF CUSTOM TAB IS NOT NEEDED, PLEASE PASS null value 
    customTabs: null,
    hasBTC: false,
    hasFieldVerification: false
  }
  return (
    < PilotWorkflowIndex workflowData={workflowRules} />
  )
}

export default HoldingDeactivationWorkflowEntry