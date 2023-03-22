//////////////////////////////////////////////////////////////////////////////////////
//    Author - + R U Bharti
//    Version - 1.0
//    Date - 5th Dec., 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////

import BackendUrl from "./BackendUrl"

export default function PropertyApiList() {

  const baseUrlT = 'http://192.168.0.205:8000'

  let baseUrl = BackendUrl
  let apiList = {

    //back to citizen
    calculatePropertyTax: `${baseUrl}/api/property/calculatePropertyTax`,
    get_dashboard: `${baseUrl}/api/property/get-dashboard`,

    ////////************ A Concession Workflow api ************\\\\\\\\\\\
    // 1 
    get_ConcessionInbox: `${baseUrl}/api/property/concession/inbox`,
    // 2
    get_ConcessionOutbox: `${baseUrl}/api/property/concession/outbox`,
    // 3
    get_ConcessionSpecial: `${baseUrl}/api/property/concession/special-inbox`,
    // 4
    get_ConcessionDetailsById: `${baseUrl}/api/property/concession/details`,
    // 5
    post_ConcessionEscalate: `${baseUrl}/api/property/concession/escalate`,
    // 6
    post_ConcessionNextLevel: `${baseUrl}/api/property/concession/next-level`,
    // 7
    post_ConcessionApprovalRejection: `${baseUrl}/api/property/concession/approvalrejection`,
    // 8
    post_ConcessionBackToCitizen: `${baseUrl}/api/property/concession/backtocitizen`,
    // 9
    post_ConcessionComment: `${baseUrl}/api/property/concession/comment-independent`,
    // 10
    get_ConcessionDocumentsToUpload: `${baseUrl}/api/property/concession/doc-list`,
    // 11
    get_ConcessionUploadedDocuments: `${baseUrl}/api/property/concession/get-uploaded-documents`,
    // 12
    post_ConcessionDocumentUpload: `${baseUrl}/api/property/concession/upload-document`,
    // 13
    get_ConcessionBtcList: `${baseUrl}/api/property/concession/btc-inbox`,
    post_ConcessionDocVerify: `${baseUrl}/api/property/concession/doc-verify-reject`,

    ////////************ B Objection Workflow api ************\\\\\\\\\\\
    // 14
    get_GbSafInbox: `${baseUrl}/api/property/gbsaf/inbox`,
    // 15
    get_GbSafOutbox: `${baseUrl}/api/property/gbsaf/outbox`,
    // 16
    get_GbSafSpecial: `${baseUrl}/api/property/gbsaf/special-inbox`,
    // 16
    get_GbSafFieldVerificationList: `${baseUrl}/api/property/gbsaf/inbox-field-verification`,
    // 17
    get_GbSafDetailsById: `${baseUrl}/api/property/gbsaf/details`,
    // 18
    post_GbSafEscalate: `${baseUrl}/api/property/gbsaf/post-escalate`,
    // 19
    post_GbSafNextLevel: `${baseUrl}/api/property/gbsaf/next-level`,
    // 20
    post_GbSafApprovalRejection: `${baseUrl}/api/property/gbsaf/final-approve-reject`,
    // 21
    post_GbSafBackToCitizen: `${baseUrl}/api/property/gbsaf/back-to-citizen`,
    // 22
    post_GbSafBtcList: `${baseUrl}/api/property/gbsaf/btc-inbox`,
    // 8
    post_GbSafComment: `${baseUrl}/api/property/gbsaf/independent-comment`,
    get_GbSafDocumentsToUpload: `${baseUrl}/api/property/gbsaf/get-doc-list`,
    get_GbSafUploadedDocuments: `${baseUrl}/api/property/gbsaf/get-uploaded-document`,
    post_GbSafDocumentUpload: `${baseUrl}/api/property/gbsaf/upload-documents`,
    post_GbSafDocVerify: `${baseUrl}/api/property/gbsaf/doc-verify-reject`,

    ////////************ C Harvesting Workflow api ************\\\\\\\\\\\
    // 27 
    get_HarvestingInbox: `${baseUrl}/api/property/harvesting/inbox`,
    // 28
    get_HarvestingOutbox: `${baseUrl}/api/property/harvesting/outbox`,
    // 29
    get_HarvestingSpecial: `${baseUrl}/api/property/harvesting/special-inbox`,
    // 30
    get_HarvestingDetailsById: `${baseUrl}/api/property/harvesting/details-by-id`,
    // 31
    post_HarvestingEscalate: `${baseUrl}/api/property/harvesting/escalate`,
    // 31
    post_HarvestingNextLevel: `${baseUrl}/api/property/harvesting/next-level`,
    // 33
    post_HarvestingApprovalRejection: `${baseUrl}/api/property/harvesting/approval-rejection`,
    // 34
    post_HarvestingBackToCitizen: `${baseUrl}/api/property/harvesting/backtocitizen`,
    // 35
    getHarvestingDocList: `${baseUrl}/api/property/harvesting-doc-id`,
    // 36
    postHarvestingDoc: `${baseUrl}/api/property/harvesting-doc-upload`,
    // 37
    postHarvestingStatus: `${baseUrl}/api/property/harvesting-doc-status`,
    // 38
    get_HarvestingDocumentsToUpload: `${baseUrl}/api/property/harvesting/get-doc-list`,
    // 39
    get_HarvestingUploadedDocuments: `${baseUrl}/api/property/harvesting/get-uploaded-documents`,
    // 30
    post_HarvestingDocumentUpload: `${baseUrl}/api/property/harvesting/upload-document`,
    // 31
    get_HarvestingBtcList: `${baseUrl}/api/property/harvesting/btc-inbox`,
    // 32
    get_HarvestingBtcAction: `${baseUrl}/api/property/harvesting/backtocitizen`,
    // 32
    post_HarvestingDocVerify: `${baseUrl}/api/property/harvesting/doc-verify-reject`,
    ////////************ D HOLDING DEACTIVATION Workflow api ************\\\\\\\\\\\
    // 33 
    get_HoldingDeactivationInbox: `${baseUrl}/api/property/inboxDeactivation`,
    // 34
    get_HoldingDeactivationOutbox: `${baseUrl}/api/property/outboxDeactivation`,
    // 35
    get_HoldingDeactivationSpecial: `${baseUrl}`,
    // 36
    get_HoldingDeactivationDetailsById: `${baseUrl}/api/property/getDeactivationDtls`,
    // 37
    post_HoldingDeactivationEscalate: `${baseUrl}/api/property/postEscalateDeactivation`,
    // 38
    post_HoldingDeactivationNextLevel: `${baseUrl}/api/property/postNextDeactivation`,
    // 39
    post_HoldingDeactivationApprovalRejection: `${baseUrl}/api/property/approve-reject-deactivation-request`,
    // 40
    post_HoldingDeactivationIndependentComment: `${baseUrl}/api/property/commentIndependentPrpDeactivation`,
    // 41
    get_HoldingDeactivationUploadedDocuments: `${baseUrl}/api/property/getDocumentsPrpDeactivation`,
    ////////************ D GB SAF WORKFLOW API ************\\\\\\\\\\\
    // 14
    get_ObjectionInbox: `${baseUrl}/api/property/objection/inbox`,
    // 15
    get_ObjectionOutbox: `${baseUrl}/api/property/objection/outbox`,
    // 16
    get_ObjectionSpecial: `${baseUrl}/api/property/objection/special-inbox`,
    // 17
    get_ObjectionDetailsById: `${baseUrl}/api/property/objection/details`,
    // 18
    post_ObjectionEscalate: `${baseUrl}/api/property/objection/post-escalate`,
    // 19
    post_ObjectionNextLevel: `${baseUrl}/api/property/objection/next-level`,
    // 20
    post_ObjectionApprovalRejection: `${baseUrl}/api/property/objection/approvalrejection`,
    // 21
    post_ObjectionBackToCitizen: `${baseUrl}/api/property/objection/backtocitizen`,
    // 22
    post_ObjectionBtcList: `${baseUrl}/api/property/objection/btc-inbox`,
    // 8
    post_ObjectionComment: `${baseUrl}/api/property/objection/comment-independent`,
    get_ObjectionDocumentsToUpload: `${baseUrl}/api/property/objection/doc-list`,
    get_ObjectionUploadedDocuments: `${baseUrl}/api/property/objection/get-uploaded-documents`,
    post_ObjectionDocumentUpload: `${baseUrl}/api/property/objection/upload-document`,
    post_ObjectionDocVerify: `${baseUrl}/api/property/objection/doc-verify-reject`,


    ////////************ Other ************\\\\\\\\\\\
    // 42 API TO GET SAF MASTER LIST OT USE FOR SAF APPLY FORM
    get_MasterData: `${baseUrl}/api/property/saf/master-saf`,
    // 43 API TO POST SITE VERIFICATION
    post_SiteVerification: `${baseUrl}/api/property/saf/site-verification`,
    // 44 API TO POST GEOTAGGING
    post_GeoTagging: `${baseUrl}/api/property/saf/geotagging`,
    // 45 API TO VERIFY SAF DOC
    post_DocVerify: `${baseUrl}/api/property/saf/verifydoc`,
    // 46 API TO SAF DOCUMENT UPLOAD
    getSafDoc: `${baseUrl}/api/property/safDocumentUpload`,
    // 47
    postSafDoc: `${baseUrl}/api/property/safDocumentUpload`, // DUPLICATE
    // 48 API TO GET SAF UPLOADED DOCUMENTS
    getDocumentList: `${baseUrl}/api/property/getSafUploadDocuments`,
    // 49 
    postSafVerify: `${baseUrl}/api/property/saf/doc-status`, // DOUBT
    // 50 API TO GET DATA BY HOLDING OR PROPID
    api_getPropHoldingDetailsById: `${baseUrl}/api/property/saf/get-prop-byholding`, // DUPLICATE
    // 51 API TO GET TC COMPARISON DATA
    api_getTcComparisonData: `${baseUrl}/api/property/saf/verifications-comp`,
    // 52 API TO DEACTIVATE HOLDING
    api_PostHolidingDeactivation: `${baseUrl}/api/property/deactivationRequest`,
    // 53 APIT TO GET DEACTIVATION DETAILS FOR DEACTIVATION APPLY
    api_getHoldingDeactivationDetails: `${baseUrl}/api/property/get-prop-dtl-for-deactivation`,
    // 54 API TO APPLY HOLDING 
    api_postHoldingDeactivationApply: `${baseUrl}/api/property/deactivationRequest `, // DUPLICATE

    // ============Reciepts api list=================
    // SAM and FAM reciept details
    api_samReciept: `${baseUrl}/api/property/saf/memo-receipt`, // POST
    demandReciept: `${baseUrl}/api/property/get-holding-dues`,
    rmcReciept: `${baseUrl}/api/property/prop-ulb-receipt`,
    comparativeDemandReciept: `${baseUrl}/api/property/prop-comparative-demand`,

    // ==========Reports API List============
    get_collectorList: `${baseUrl}/api/workflow/ward-user/list-tc`,
    get_taxCollectorList : baseUrl + '/',
    searchPropertyCollection: `${baseUrl}/api/property/reports/property/collection`,
    searchSafCollection: `${baseUrl}/api/property/reports/saf/collection`,
    searchPropSafIndDemCollection: `${baseUrl}/api/property/reports/property/prop-saf-individual-demand-collection`,
    levelWisePendingCollection: `${baseUrl}/api/property/reports/saf/levelwisependingform`,
    safWiseCollection: `${baseUrl}/api/property/reports/saf/levelformdetail`,
    employeeWiseCollection: `${baseUrl}/api/property/reports/saf/leveluserpending`, // employee
    wardWiseCollection: `${baseUrl}/api/property/reports/saf/userWiseWardWireLevelPending`,
    wardWiseHolding: baseUrl + '/api/property/reports/ward-wise-holding',
    propPaymentModeWiseSummary: baseUrl + '/api/property/reports/property/payment-mode-wise-summery',
    safPaymentModeWiseSummary: baseUrl + '/api/property/reports/saf/payment-mode-wise-summery',
    searchWardWiseDcb: baseUrl + '/api/property/reports/property/ward-wise-dcb',
    searchHoldingDcb: baseUrl + '/api/property/reports/property/dcb',
    searchWardWiseCollectionSummary: baseUrl + '/',
    searchGbSafCollection: baseUrl + '/api/property/reports/property/gbsaf-collection',
    searchTaxRecieptBulkPrint: baseUrl + '/',
    searchHoldingWiseRebate: baseUrl + '/',
    searchSafCollectionReportwithRebatePenalty: baseUrl + '/',
    searchPropCollectionReportwithRebatePenalty: baseUrl + '/',
    searchArrearCurrentCollectionSummary: baseUrl + '/',
    searchSafSamGeoTagging: baseUrl + '/',
    searchPreviousYearPaidButNotPaidCurrentYear: baseUrl + '/',
    searchNotPaidFrom20162017: baseUrl + '/',
    searchDmr: baseUrl + '/',
    searchDecisionMakingReport: baseUrl + '/',
    searchHoldingWithElectricityDetailReport: baseUrl + '/',
    searchPropIndividualDemandCollection: baseUrl + '/',
    searchGovDcbReport: baseUrl + '/',
    searchGovSafIndividualDemandCollection: baseUrl + '/',
    searchWardWiseDemand: baseUrl + '/',
    searchWardWiseSafPendingDetails: baseUrl + '/',
    searchDateWardWiseGeneratedNotice: baseUrl + '/',
    searchDeactivatedHolding: baseUrl + '/',

    yearList: baseUrl + '/api/property/reports/list-fy',

    // ===============Cash Verification======================
    api_listofEmployees: `${baseUrl}/api/list-employees`, //=> List of employees
    api_listUnverifiedCashVerification: `${baseUrl}/api/payment/list-cash-verification`, //=> Show List of Unverified User and Amount
    api_listVerifiedCashVerification: `${baseUrl}/api/payment/verified-cash-verification`, //=> Show List of Verified User and Amount
    api_notVerifiedTcCollection: `${baseUrl}/api/payment/tc-collections`,
    api_verifiedTcCollection: `${baseUrl}/api/payment/verified-tc-collections`,
    api_verifyTcCollection: `${baseUrl}/api/payment/verify-cash`,

    // ==========Bank Reconcile=======================
    getReconcillationDetails: `${baseUrl}/api/payment/search-transaction`,
    getReconcileById: `${baseUrl}/api/payment/cheque-dtl-by-id`,
    apiUpdateReconcillationDetails: `${baseUrl}/api/payment/cheque-clearance`,

  }

  return apiList
}


