import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BackendUrl from '@/Components/ApiList/BackendUrl'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'

function ConcessionWorkflowEntry() {

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Concession Workflow')

  // LIST OF API'S
  const {
    api_workflowInfo,
    api_postDepartmental,
    api_getDepartmentalData
  } = ProjectApiList()

  const { get_ConcessionInbox,
    get_ConcessionOutbox,
    get_ConcessionSpecial,
    get_ConcessionDetailsById,
    post_ConcessionEscalate,
    post_ConcessionNextLevel,
    post_ConcessionApprovalRejection,
    post_ConcessionBackToCitizen,
    post_ConcessionComment,
    get_ConcessionDocumentsToUpload,
    get_ConcessionUploadedDocuments,
    post_ConcessionDocumentUpload,
    get_ConcessionBtcList,
    post_ConcessionDocVerify } = PropertyApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'post', url: get_ConcessionInbox },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: get_ConcessionOutbox },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: get_ConcessionSpecial },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: get_ConcessionBtcList },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: '' },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: get_ConcessionDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: post_ConcessionComment },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: post_ConcessionNextLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: post_ConcessionEscalate },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: post_ConcessionBackToCitizen },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: post_ConcessionApprovalRejection },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: get_ConcessionDocumentsToUpload },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: post_ConcessionDocumentUpload },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: post_ConcessionDocVerify },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: get_ConcessionUploadedDocuments },
      documentBaseUrl: BackendUrl

    },
    workflow: {
      workflowName: 'Concession-Workflow AT',
      departmentalPostFor: 'CONCESSION',
      workflowId: 106,
      moduleId: 1
    },

    tableColumns: [
      {
        Header: "#",
        Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
      },
      {
        Header: "Ward No",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.ward_no)}</span>)
      },
      {
        Header: "Application No.",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.application_no)}</span>)
      },
      {
        Header: "Holding No.",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.holding_no)}</span>)
      },
      {
        Header: "Owner Name",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.owner_name)}</span>)
      },
      {
        Header: "Apply Date",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.apply_date)}</span>)
      },
      {
        Header: "Property Type",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.property_type)}</span>)
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
    hasBTC: true,
    hasFieldVerification: false
  }
  return (
    < PilotWorkflowIndex workflowData={workflowRules} />
  )
}

export default ConcessionWorkflowEntry