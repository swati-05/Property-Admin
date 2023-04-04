import React from 'react'
import PilotWorkflowIndex from '../../PilotWorkflowIndex'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BackendUrl from '@/Components/ApiList/BackendUrl'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'

function ObjectionWorkflowEntry() {

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Objection Workflow')

  // LIST OF API'S
  const {
    api_workflowInfo,
    api_postDepartmental,
    api_getDepartmentalData
  } = ProjectApiList()

  const { get_ObjectionInbox,
    get_ObjectionOutbox,
    get_ObjectionDetailsById,
    post_ObjectionNextLevel,
    post_ObjectionApprovalRejection,
    post_ObjectionEscalate,
    get_ObjectionSpecial,
    post_ObjectionBackToCitizen,
    post_ObjectionBtcList,
    post_ObjectionComment,
    get_ObjectionUploadedDocuments,
    post_ObjectionDocumentUpload,
    get_ObjectionDocumentsToUpload,
    post_ObjectionDocVerify
  } = PropertyApiList()

  const workflowRules = {
    api: {
      // 1 - API TO FETCH INBOX LIST
      api_inboxList: { method: 'post', url: get_ObjectionInbox },
      // 2 - API TO FETCH OUTBOX LIST
      api_outboxList: { method: 'post', url: get_ObjectionOutbox },
      // 3 - API TO FETCH SPECIAL LIST
      api_specialList: { method: 'post', url: get_ObjectionSpecial },
      // 4 - API TO FETCH BACK TO CITIZEN LIST
      apt_btcList: { method: 'post', url: post_ObjectionBtcList },
      // 5 - API TO FETCH FIELD VERIFICATION LIST
      api_fieldVerificationList: { method: 'post', url: '' },

      //** POST METHOD IS REQUIRED FOR BELOW API'S  */
      //******************************************** */

      // 6 - API TO FETCH APPLICATION DETAILS BY ID 
      api_details: { method: 'post', url: get_ObjectionDetailsById },
      // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
      api_workflowInfo: { method: 'post', url: api_workflowInfo },
      // 8 - API TO SEND INDEPENDENT COMMENT
      api_independentComment: { method: 'post', url: post_ObjectionComment },
      // 9 - API TO SEND BACKWARD OR FORWARD
      api_sendLevel: { method: 'post', url: post_ObjectionNextLevel },
      // 10 - API TO ESACALATE OR DEESCALATE
      api_escalate: { method: 'post', url: post_ObjectionEscalate },
      // 11 - API TO SEND BACK TO CITIZEN
      api_btc: { method: 'post', url: post_ObjectionBackToCitizen },
      // 12 - API TO APPROVE OR REJECT
      api_approveReject: { method: 'post', url: post_ObjectionApprovalRejection },
      // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
      api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
      // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
      api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
      // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
      api_uploadDocumentShow: { method: 'post', url: get_ObjectionDocumentsToUpload },
      // 14 - API TO UPLOAD DOCUMENTS 
      api_uploadDocument: { method: 'post', url: post_ObjectionDocumentUpload },
      // 15 - API TO VERIFY DOCUMENTS
      api_verifyDocuments: { method: 'post', url: post_ObjectionDocVerify },
      // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
      api_documentList: { method: 'post', url: get_ObjectionUploadedDocuments },
      documentBaseUrl: BackendUrl

    },
    workflow: {
      workflowName: 'Objection-Workflow AT',
      departmentalPostFor: 'OBJECTION',
      workflowId: 169,
      moduleId: 1
    },

    tableColumns: [
      {
        Header: "#",
        Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
      },
      {
        Header: "Ward No",
        accessor: "old_ward_no",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.old_ward_no)}</span>)

      },
      {
        Header: "Holding No.",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.holding_no)}</span>)

      },
      {
        Header: "New Holding No.",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.new_holding_no)}</span>)

      },
      {
        Header: "Application No.",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.application_no)}</span>)

      },
      {
        Header: "Applicant Name",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.applicant_name)}</span>)

      },
      {
        Header: "Property Type",
        Cell: ({ cell }) => (<span>{nullToNA(cell.row.original?.property_type)}</span>)

      },
      {
        Header: "Objection Type",
        accessor: "objection_for",
        Cell: (props) => {
          if (props?.value == null || props?.value == '') {
            return <div className="w-full flex flex-row items-center"><i className="font-semibold ">N/A</i></div>
          }

          if (props?.value != null) {
            if (props?.value == 'Clerical Mistake') {
              return <>Clerical Objection</>
            }
            if (props?.value == 'Assessment Error') {
              return <>Assessment Objection</>
            }
            if (props?.value == 'Forgery') {
              return <>Forgery Objection</>
            }
          }
        },
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

export default ObjectionWorkflowEntry