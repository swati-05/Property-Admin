import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BackendUrl from '@/Components/ApiList/BackendUrl'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'

function HarvestingWorkflowEntry() {

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Rainwater Harvesting Workflow')

  // LIST OF API'S
  const {
    api_workflowInfo,
    api_postDepartmental,
    api_getDepartmentalData,
  } = ProjectApiList()

  const { get_HarvestingInbox,
    get_HarvestingOutbox,
    post_HarvestingNextLevel,
    get_HarvestingSpecial,
    post_HarvestingApprovalRejection,
    post_HarvestingEscalate,
    get_HarvestingUploadedDocuments,
    post_HarvestingDocumentUpload,
    get_HarvestingBtcList,
    get_HarvestingBtcAction,
    get_HarvestingDetailsById,
    get_HarvestingDocumentsToUpload,
    post_HarvestingDocVerify } = PropertyApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'post', url: get_HarvestingInbox },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: get_HarvestingOutbox },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: get_HarvestingSpecial },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: get_HarvestingBtcList },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: '' },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: get_HarvestingDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: '' },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: post_HarvestingNextLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: post_HarvestingEscalate },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: get_HarvestingBtcAction },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: post_HarvestingApprovalRejection },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: get_HarvestingDocumentsToUpload },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: post_HarvestingDocumentUpload },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: post_HarvestingDocVerify },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: get_HarvestingUploadedDocuments },
      documentBaseUrl: BackendUrl

    },
    workflow: {
      workflowName: 'Harvesting-Workflow AT',
      workflowId: 197,
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
        Header: "Applicant Name",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.applicant_name)}</span>)

      },
      {
        Header: "Property Type",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.property_type)}</span>)

      },
      // {
      //   Header: "Assessment Type",
      //   accessor: "assessment",
      //   Cell: ({ cell }) => (
      //     <div
      //       className={
      //         " rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 text-sm px-1  " +
      //         (cell.row.values.assessment == "New Assessment"
      //           ? "bg-green-200 text-green-900 "
      //           : "") +
      //         (cell.row.values.assessment == "Re Assessment"
      //           ? "bg-indigo-200 text-indigo-900 "
      //           : "") +
      //         (cell.row.values.assessment == "Mutation"
      //           ? "bg-red-200 text-red-900"
      //           : "")
      //       }
      //     >
      //       {Array.from(cell.row.values.assessment)[0]}
      //     </div>
      //   ),
      // }
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

export default HarvestingWorkflowEntry