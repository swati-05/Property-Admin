import BackendUrl from "./BackendUrl"

export default function ProjectApiList() {
    let baseUrl = BackendUrl
    let apiList = {

        // 1 API TO LOGIN
        api_login: `${baseUrl}/api/login`,

        // 2 API TO GET SAF INBOX LIST
        api_safInboxList: `${baseUrl}/api/property/saf/inbox`,

        // 3 API TO GET SAF BTC LIST
        api_safBTCList: `${baseUrl}/api/property/saf/btc-inbox`,

        // 4 API TO GET SAF FULL DETAILS
        api_getSafDetailsById: `${baseUrl}/api/property/saf-details`,

        // 5 API TO GET ROLEBYWORKFLOW
        api_getWorkflowCandidates: `${baseUrl}/api/workflow/getRoleByWorkflow`,

        // 6 API TO ESCALATE SAF ESCALATION
        api_postEscalateStatus: `${baseUrl}/api/property/saf/escalate`,

        // 7 API TO SEND INDEPENDENT COMMENT
        api_postComment: `${baseUrl}/api/property/saf/independent-comment`,

        // 8 API TO POST NEXT LEVEL
        api_postApplicationToLevel: `${baseUrl}/api/property/saf/post/level`,

        // 9 API TO GET SAF SPECIAL LIST
        api_getsafSpecialList: `${baseUrl}/api/property/saf/escalate/inbox`,

        // 10 API TO GET ROLES DETAILS
        api_fetchRoleDetail: `${baseUrl}/api/workflow/getroledetails`,

        // 11 API TO GET SAF OUTBOX LIST
        api_safOutboxList: `${baseUrl}/api/property/saf/outbox`,

        // 12 API TO APPROVE REJECT SAF
        api_approveRejectForm: `${baseUrl}/api/property/saf/approvalrejection`,

        // 13 API TO SEND BACK TO CITIZEN SAF APPLICATION
        api_backToCitizen: `${baseUrl}/api/property/saf/back-to-citizen`,

        // 14 API TO APPLY FOR NEW ASSESSMENT
        api_getPostSafFormData: `${baseUrl}/api/property/saf/apply`,

        // 15 API TO GET SAF FORM MASTER LIST
        api_getSafMasterData: `${baseUrl}/api/property/saf/master-saf`,

        // 16 API TO GET SAF FULL DETAILS
        api_getAppicationFullDetail: `${baseUrl}/api/property/saf-details`,

        // 17 API TO POST SAF DOCUMENT UPLOAD IN WORKFLOW
        api_uploadDocument: `${baseUrl}/api/property/saf/document-upload`,

        // 18 API TO GET LIST OF SAF DOCUMENTS TO UPLOAD
        api_uploadDocumentShow: `${baseUrl}/api/property/saf/get-doc-list`,

        // 19 API TO GET WORKFLOW BASIC INFO LIKE PERMISSIONS/WORKFLOW-CANDIDATES
        api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,

        // 20 API TO POST VERIFY AND REJECT DYNAMIC WORKFLOW DOCUMENTS
        api_verifyDocumentsSaf: `${baseUrl}/api/property/saf/doc-verify-reject`,

        // 21 API TO POST DEPARTMENTAL COMMUNICATION DATA
        api_postDepartmental: `${baseUrl}/api/post-custom-data`,

        // 22 API TO TO GET SAF DEPARTMENTAL COMMUNICATION LIST
        api_getDepartmentalData: `${baseUrl}/api/get-all-custom-tab-data`,

        // 23 API TO GET SAF UPLOADED DOCUMENT LIST
        getDocumentList: `${baseUrl}/api/property/saf/get-uploaded-documents`,

        // 24 API TO GET FIELD VERIFICATION INBOX LIST
        api_fieldVerificationList: `${baseUrl}/api/property/saf/field-verified-inbox`,

        // 25 API TO GET MENU LIST BY LOGIN USER
        api_treeMenuList: `${baseUrl}/api/sub-menu/tree-structure`,

        // 26 API TO GET STATIC SAF DETAILS FOR BACK OFFICE EDIT
        api_getStaticSafDetails: `${baseUrl}/api/property/saf/static-saf-dtls`,

        // 27 API TO GET DATA BY HOLDING OR PROPID
        api_getHoldingDetails: `${baseUrl}/api/property/saf/get-prop-byholding`,

        // 28 API TO GENERATE ORDER ID
        propertyGenerateOrderId: `${baseUrl}/api/property/saf/generate-order-id`, //POST

        // 29 API TO GET WARD LIST
        api_getWardListByLogin: `${baseUrl}/api/get-all-wards`,  // Get All Wardlist BY Login  => GET

        // 30 API TO STORE THE DATA IF PAYMENT FAILED OR SUCCESS
        verifyPaymentStatus: `${baseUrl}/api/payment/verify-payment-status`, //POST // use to store the data if payment failed or success=> 

        // water harvesting document code
        api_postWaterHarvestindDocCode: `${baseUrl}/api/property/harvesting/citizen-doc-list`,

        //water harvesting master data
        api_getMasterDataWaterHarvesting: `${baseUrl}/api/property/get-wardmaster-data`,

        //water harvesting post data
        api_postWaterHarvestingData: `${baseUrl}/api/property/water-harvesting-application`,

        // 1 API TO
        api_filterPropertyDetails: `${baseUrl}/api/property/get-filter-property-details `,  // Get All Wardlist BY Login  => POST

        // 1 API TO
        api_filterPropertyAppliedApplications: `${baseUrl}/api/property/get-filter-application-details`,  // Get All Wardlist BY Login  => POST


        // Bifurcation API List Start

        // 1 API TO GET BIFURCATION INBOX LIST    
        api_bifurcationInboxList: `${baseUrl}/api/property/bifurcationInbox`,

        // 1 API TO GET BIFURCATION OUTBOX LIST
        api_bifurcationOutboxList: `${baseUrl}/api/property/bifurcationOutbox`,

        // 1 API TO GET BIFURCATION DETAILS BY ID
        api_bifurcationDetailsById: `${baseUrl}/api/property/getSafDtls`, // GET

        // Bifurcation API List End

        //application list of property generated holding
        api_getPropertyApplicationList: `${baseUrl}/api/property/saf/get-prop-byholding`, //POST (DUPLICATE)

        // 1 API TO GET SAF DEMAND
        api_DemandDetailById: `${baseUrl}/api/property/saf/calculate-by-saf-id`,

        // 1 API TO GET SAF DEMAND
        api_getTcVerifyData: `${baseUrl}/api/property/saf/get-tc-verifications`,

        //application demand detail in demand screen
        api_getWorkflowPermission: `${baseUrl}/api/workflow/role-map/permission`,
        //application demand detail in demand screen
        api_uploadDocument: `${baseUrl}/api/property/saf/document-upload`,
        api_uploadDocumentShow: `${baseUrl}/api/property/saf/get-doc-list`,
        //application demand detail in demand screen
        api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,
        //application demand detail in demand screen
        api_verifyDocuments: `${baseUrl}/api/workflows/document/verify-reject`,
        //application demand detail in demand screen
        api_postDepartmental: `${baseUrl}/api/post-custom-data`,
        api_getDepartmentalData: `${baseUrl}/api/get-all-custom-tab-data`,
        getDocumentList: `${baseUrl}/api/property/saf/get-uploaded-documents`,
        api_fieldVerificationList: `${baseUrl}/api/property/saf/field-verified-inbox`,
        api_treeMenuList: `${baseUrl}/api/sub-menu/tree-structure`,
        api_getStaticSafDetails: `${baseUrl}/api/property/saf/static-saf-dtls`,

        api_changePassword: `${baseUrl}/api/change-password`,
        api_forgotPassword: `${baseUrl}/api/change-password`,

        // API TO EDIT ADMIN PROFILE
        api_editAdminProfile: `${baseUrl}/api/edit-my-profile`,
        // API TO FETCH JSK DASHBOARD RECENT APPLICATIONS AND RECENT PAYMENTS
        api_landingDashboard: `${baseUrl}/api/dashboard/jsk/prop-details`,
        // API TO FETCH JSK DASHBOARD CARD DATA
        api_landingDashboardCard: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,

        // API TO FETCH NOTIFICATION DATA
        api_getNotification: `${baseUrl}/api/get-user-notifications`,
        // API TO CREATE NOTIFICATION DATA
        api_createNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,
        // API TO DELETE NOTIFICATION DATA
        api_deleteNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,
        // PERMISSION API TO GET PERMISSION BY LOGIN USER
        api_getPermissionByUser: `${baseUrl}/api/permissions/get-user-permission`,

        //gb saf apply
        gbSafApply : baseUrl + '/api/property/saf/gb-apply',
        ulbList : baseUrl + '/api/get-all-ulb',

    }


    return apiList
}


