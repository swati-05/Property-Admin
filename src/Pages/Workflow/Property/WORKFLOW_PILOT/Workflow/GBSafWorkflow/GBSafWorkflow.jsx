import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BackendUrl from '@/Components/ApiList/BackendUrl'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'

function GBSafWorkflow() {

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('GB-SAF Workflow')

  // LIST OF API'S
  const {
    api_workflowInfo,
    api_postDepartmental,
    api_getDepartmentalData
  } = ProjectApiList()
  const {
    get_GbSafInbox,
    get_GbSafOutbox,
    get_GbSafSpecial,
    get_GbSafFieldVerificationList,
    get_GbSafDetailsById,
    post_GbSafEscalate,
    post_GbSafNextLevel,
    post_GbSafApprovalRejection,
    post_GbSafBackToCitizen,
    post_GbSafBtcList,
    post_GbSafComment,
    get_GbSafDocumentsToUpload,
    get_GbSafUploadedDocuments,
    post_GbSafDocumentUpload,
    post_GbSafDocVerify
  } = PropertyApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'post', url: get_GbSafInbox },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: get_GbSafOutbox },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: get_GbSafSpecial },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: post_GbSafBtcList },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: get_GbSafFieldVerificationList },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: get_GbSafDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: post_GbSafComment },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: post_GbSafNextLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: post_GbSafEscalate },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: post_GbSafBackToCitizen },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: post_GbSafApprovalRejection },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: get_GbSafDocumentsToUpload },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: post_GbSafDocumentUpload },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: post_GbSafDocVerify },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: get_GbSafUploadedDocuments },
      documentBaseUrl: BackendUrl,

    },
    workflow: {
      workflowName: 'Saf-Workflow',
      departmentalPostFor: 'SAF',
      workflowId: 4,
      moduleId: 1,
      formUrl: '/admin/safform/bo-edit',
      fullDetailsUrl: '/admin/propApplicationDetails'
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
        Header: "Officer Name",
        accessor: "officer_name",
      },
      {
        Header: "Building Type",
        accessor: "building_type",
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
    //   tabComponent: (applicationId) => {
    //    return <Demo applicationId={applicationId} />
    //   }
    // }
    // IF CUSTOM TAB IS NOT NEEDED, PLEASE PASS null value 
    customTabs: null,
    hasBTC: true,
    hasFieldVerification: true
  }
  return (
    <CustomErrorBoundary errorMsg="Bug in PilotWorkflowIndex" >
      < PilotWorkflowIndex workflowData={workflowRules} />
    </CustomErrorBoundary>
  )
}

export default GBSafWorkflow