import ApiHeader from "@/Components/ApiList/ApiHeader";
import BackendUrl from "@/Components/ApiList/BackendUrl";

export default function WaterApiList() {
    let baseUrl = BackendUrl;
    // let baseUrl = "http://192.168.0.16:8000"
    // let baseUrl = "http://192.168.0.148:81"

    const header = ApiHeader()


    let apiList = {
        header: header,
        api_ulbList: `${baseUrl}/api/get-all-ulb`, //GET
        api_getSafHoldingDetails: `${baseUrl}/api/water/search-holding-saf`,
        api_getPendingApplicationDetails: `${baseUrl}/api/water/application/get-by-id`,
        api_waterApprovedApplicationDetails: `${baseUrl}/api/water/consumer/get-listed-details`,
        api_waterConsumerPaymentHistory: `${baseUrl}/api/water/consumer/get-payment-history`,
        api_getProfileDetails: `${baseUrl}/api/my-profile-details`,

        // --------- JSK -------------------
        api_NewWaterConnection: `${baseUrl}/api/water/application/apply-new-connection`,
        api_WaterGetDetailsById: `${baseUrl}/api/water/admin/application/get-details-by-id`,
        api_WaterListDetailsById: `${baseUrl}/api/water/admin/application/list-details-by-date`,
        api_paymentReceipt: `${baseUrl}/api/water/admin/application/generate-payment-receipt`, // Method => POST | Fetch Data for require document
        api_waterListDemand: `${baseUrl}/api/water/consumer/list-demand`,
        api_waterSiteInspectionList: `${baseUrl}/api/water/admin/search-application`,

        api_waterMasterData: `${baseUrl}/api/water/master/get-listed-details`,
        api_waterSiteInspectionSaveData: `${baseUrl}/api/water/site-verification/save-site-details`,
        api_waterPayConnectionCharges: `${baseUrl}/api/water/application/payment/offline/pay-connection-charge`,

        api_waterApplicationPaymentHistory: `${baseUrl}/api/water/application/payment/get-payment-history`,
        api_waterInspectionSaveDate: `${baseUrl}/api/water/admin/application/save-inspection-date`,
        api_waterInspectionDetails: `${baseUrl}/api/water/admin/application/site-inspection-details`,
        api_waterCancelSiteInspection: `${baseUrl}/api/water/admin/application/cancel-inspection-scheduling`,
        api_waterGenerateDemand: `${baseUrl}/api/water/admin/consumer/generate-demand`,
        api_saveConnectionMeter: `${baseUrl}/api/water/admin/consumer/save-connection-meter`,
        api_consumerGetMeterList: `${baseUrl}/api/water/admin/consumer/get-meter-list`,


        // -------------------- Workflow ----------------

        api_waterInbox: `${baseUrl}/api/water/inbox`, //POST => Water Workflow Inbox List
        api_waterOutbox: `${baseUrl}/api/water/outbox`, //POST => Water Workflow Outbox List
        api_waterSpecialInbox: `${baseUrl}/api/water/special-inbox`, //POST => Water Workflow Special List
        api_waterPendingApplicationById: `${baseUrl}/api/water/workflow/application/get-by-id`,// => Get Pending Application BY Id
        api_waterPostMessage: `${baseUrl}/api/water/comment-independent`, // => Send Message
        api_waterPostNextLevel: `${baseUrl}/api/water/post-next-level`, //=> Send Application To Next Level
        api_waterEsclate: `${baseUrl}/api/water/escalate`, // => Escalate Application
        api_waterApproveRejectApplication: `${baseUrl}/api/water/application/approval-rejection`, // => Approve / Reject Application
        api_waterVerifyDoc: `${baseUrl}/api/workflow/document/verify-reject`, // => Water Workflow Document Verification
        api_waterDocList: `${baseUrl}/api/water/get-upload-documents`, // Water Workflow Show Uploaded Documents
        api_waterListFieldVerifyInbox: `${baseUrl}/api/water/field-verified-inbox`, // => Water Workflow List of Verified Verification Inbox
        api_waterBtcListInbox: `${baseUrl}/api/water/btc-inbox`, //POST => Water BTC Inbox List
        api_backToCitizen: `${baseUrl}/api/water/back-to-citizen`, //POST    => Water Send to BTC
        api_waterPostCustomData: `${baseUrl}/api/post-custom-data`, //POST => Water Post Custom Data
        api_waterGetCustomDataTab: `${baseUrl}/api/get-all-custom-tab-data`, //POST => Water Get All Custom Tab Data
        api_waterListDocToUpload: `${baseUrl}/api/water/workflow/get-doc-list`, //POST => Water Get Document List
        api_waterSearchConsumer: `${baseUrl}/api/water/search-consumer`, //POST => Water Search Consumer
        api_waterSearchActiveApplication: `${baseUrl}/api/water/application/search`, //POST => Water Search Active Application
        api_waterUploadDocument: `${baseUrl}/api/water/upload-document`, 


        // ------------ Menu master --------

        api_menuMasterDelete: `${baseUrl}/api/crud/menu/delete-menues`, // => Delete Menu
        api_addNewMenu: `${baseUrl}/api/crud/menu/add-new-menues`, // => Add New Menu
        api_listParentSetial: `${baseUrl}/api/menu-roles/list-parent-serial`, // => List of Parent Serial
        api_getChildrenNode: `${baseUrl}/api/sub-menu/get-children-node`, // => Get Children Node

        api_getRolesByid: `${baseUrl}/api/workflow/role-user-maps/get-roles-by-id`, // => 
        api_updateUserRoles: `${baseUrl}/api/workflows/role-user-maps/update-user-roles`, // => 
        api_getMenuById: `${baseUrl}/api/menu/get-menu-by-id`, // => 
        api_getAllMenu: `${baseUrl}/api/crud/menu/get-all-menues`, // => Method - GET  Shows List of All Menus
        api_updateMenu: `${baseUrl}/api/crud/menu/update-menues`, // =>  Update Menu



        // ------ Cash Verificatiopn -------
        api_listofEmployees: `${baseUrl}/api/list-employees`, //=> List of employees

        api_listUnverifiedCashVerification: `${baseUrl}/api/payment/list-cash-verification`, //=> Show List of Unverified User and Amount
        api_listVerifiedCashVerification: `${baseUrl}/api/payment/verified-cash-verification`, //=> Show List of Verified User and Amount

        api_tcCollection: `${baseUrl}/api/payment/tc-collections`,

        api_cashVerification: `${baseUrl}/api/payment/verify-cash`,


    }

    return apiList
}