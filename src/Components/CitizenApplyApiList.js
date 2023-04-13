import BackendUrl from "./ApiList/BackendUrl"

export default function CitizenApplyApiList() {
    let baseUrl = BackendUrl
    let apiList = {
        //1
        api_safInboxList: `${baseUrl}/api/saf/inbox`,
        //2
        api_getSafDetailsById: `${baseUrl}/api/saf/details`,
        //3
        api_getMasterData: `${baseUrl}/api/property/saf/master-saf`,
        //4
        api_postNewAssessment: `${baseUrl}/api/property/saf/apply`,
        //4
        api_getLocationByUlb: `${baseUrl}/api/city/state/ulb-id`,
        //4
        api_getLocationByUlbAdmin: `${baseUrl}/api/city/state/auth/ulb-id`,
        //5
        api_getProfileDetails: `${baseUrl}/api/my-profile-details`,
        //6
        api_EditMyProfile: `${baseUrl}/api/edit-my-profile`,
        //7
        api_getAllUlb: `${baseUrl}/api/get-all-ulb`,
        //login
        api_citizenLogin: `${baseUrl}/api/login`,
        //7
        api_citizenRegister: `${baseUrl}/api/citizen-register`,

        //application list by module
        api_applicationListByModule: `${baseUrl}/api/citizens/applied-applications`,
        //application list by module
        api_getAllApplicationList: `${baseUrl}/api/citizens/applied-applications`,
        //application list by module
        api_independentComment: `${baseUrl}/api/citizens/independent-comment`,

        //transcation history by module
        api_getTranscationHistory: `${baseUrl}/api/property/saf/prop-transactions`,

        //applicaton full detail
        api_getAppicationFullDetail: `${baseUrl}/api/property/saf-details`,

        //holding verification
        api_getHoldingDetails: `${baseUrl}/api/property/saf/get-prop-byholding`,

        //water harvesting master data
        api_getMasterDataWaterHarvesting: `${baseUrl}/api/property/get-wardmaster-data`,
        //water harvesting post data
        api_postWaterHarvestingData: `${baseUrl}/api/property/water-harvesting-application`,

        //all transcation history 
        api_getAllModuleTranscation: `${baseUrl}/api/payment/all-module-transaction`,


        //razor pay api
        verifyPaymentStatus: `${baseUrl}/api/payment/verify-payment-status`, //POST // use to store the data if payment failed or success=> 

        // get Order Id
        propertyGenerateOrderId: `${baseUrl}/api/property/saf/generate-order-id`, //POST

        //application demand detail in demand screen
        api_DemandDetailById: `${baseUrl}/api/property/saf/calculate-by-saf-id`,

        //application holding property demand
        api_getsafDemandById: `${baseUrl}/api/property/saf/get-demand-by-id`, //POST

        // cluster saf demand by id
        api_getClusterSafDemandById : baseUrl + '/api/property/saf/get-cluster-saf-due', //POST

        // cluster holding demand details
        api_getClusterHoldingDemandById : baseUrl + '/api/property/prop/get-cluster-holding-due', //POST

        // cluster holding and saf reciept
        api_getClusterReciept : baseUrl + '/api/property/cluster/payment-receipt',

        //application list of property generated holding
        api_getPropertyApplicationList: `${baseUrl}/api/property/saf/get-prop-byholding`, //POST
        propertyGenerateHoldingOrderId: `${baseUrl}/api/property/generate-prop-orderid`, //POST

        //safdocument
        // api_uploadSafDocument: `${baseUrl}/api/property/upload-document`, //POST

        //safdocument list
        api_listSafDocument: `${baseUrl}/api/property/get-doc-list`, //POST
        api_uploadSafDocument: `${baseUrl}/api/property/saf/document-upload`,


        //safPayment Api
        api_getPaymentData: `${baseUrl}/api/property/saf/payment-receipt`,
        //concession Api
        get_ConcessionDetailsById: `${baseUrl}/api/property/concession/details`,
        //harvesting Api
        get_HarvestingDetailsById: `${baseUrl}/api/property/harvesting/details-by-id`,
        //objection Api
        get_ObjectionDetailsById: `${baseUrl}/api/property/objection/details`,
        api_getHoldingDemandById: `${baseUrl}/api/property/get-holding-dues`,
        api_wardByUlb: `${baseUrl}/api/workflow/getWardByUlb`,
        api_newWardByOldWard: `${baseUrl}/api/get-newward-by-oldward`,
        api_zoneByUlb: `${baseUrl}/api/property/get-zone-byUlb`,
        api_citizenRegister2: `${baseUrl}/api/citizen-register`,
        api_citizenLogin2: `${baseUrl}/api/citizen-login`,
        api_reviewCalculation: `${baseUrl}/api/property/review-calculation`,
        // API FOR BO EDIT FOR SAF APPLICATION
        api_boEdit: `${baseUrl}/api/property/saf/edit`,
        api_tcComparisionList: `${baseUrl}/api/property/saf/IndiVerificationsList`,
        api_getSpecificHoldingTranscationHistory: `${baseUrl}/api/property/prop-payment-history`,
        api_getHoldingReceiptUrl: `${baseUrl}/api/property/prop-payment-receipt`,
        // API TO MAKE PAYMENT OF PROPERTY ONLINE 
        api_postPropertyPayment: `${baseUrl}/api/property/payment-holding`,
        // API TO MAKE PAYMENT OF PROPERTY OFFLINE 
        api_postPropertyPaymentOffline: `${baseUrl}/api/property/offline-payment-holding`,
        // API TO MAKE PAYMENT OF SAF ONLINE
        api_postSafPayment: `${baseUrl}/api/property/saf/saf-payment`,
        // API TO MAKE PAYMENT OF SAF ONLINE
        api_postSafPaymentOffline: `${baseUrl}/api/property/saf/offline-saf-payment`,

        // API TO MAKE PAYMENT OF CLUSTER SAF
        api_postClusterSafPayment: `${baseUrl}/api/property/saf/cluster-saf-payment`,

        // API TO MAKE PAYMENT OF CLUSTER SAF
        api_postClusterPropertyPayment: `${baseUrl}/api/property/prop/cluster-payment`,

        // API TO GET APARTMENT LIST BY WARD NO AND ULB
        api_getApartmentListByWard: `${baseUrl}/api/property/saf/list-apartment`,
        // API TO VERIFY HOLDING NO EXISTENCEF
        api_verifyHolding: `${baseUrl}/api/property/saf/verify-holding`,
        // API TO GET SAF DETAILS FOR BO EDIT CASE
        api_getStaticSafDetails: `${baseUrl}/api/property/saf/static-saf-dtls`,
        // API TO GET CLUSTER DEMAND DETAILS FOR SAF

        api_getClusterSafDemand: `${baseUrl}/api/property/saf/get-cluster-saf-due`,
        // API TO GET CLUSTER DEMAND DETAILS FOR PROPERTY

        api_getClusterPropertyDemand: `${baseUrl}/api/property/prop/get-cluster-holding-due`,
        // API TO EDIT BASIC DETAILS OF PROPERTY

        api_editPropertyDetails: `${baseUrl}/api/property/basic-edit`,

        // API TO GET CLUSTER PROPERTY TRANSACTION HISTORY
        api_getClusterPropertyPaymentHistory: `${baseUrl}/api/property/cluster/payment-history`,

          // API TO SEND OTP TO MOBILE NO 
          api_sendMobileOtp: `${baseUrl}/api/user/send-otp`,







    }

    return apiList
}