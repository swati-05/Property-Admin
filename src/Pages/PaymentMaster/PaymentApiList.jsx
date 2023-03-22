import ApiHeader from "@/Components/ApiList/ApiHeader";

export default function PaymentApiList() {
    let baseUrl = "http://192.168.0.16:8000"

    const header = ApiHeader()


    // let baseUrl = "http://203.129.217.245:80"  // SAM PUBLIC URL



    let apiList = {
        header: header,

        getAllPayments: `${baseUrl}/api/payment/get-webhook-details`,  // Get All Details of payment transaction
        // getAllPayments: `${baseUrl}/api/get-all-payments`,
        getPaymentDetailsByTrnId: `${baseUrl}/api/payment/get-transaction-no-details`, // This is used for get data by specific trns no

        getReconcillationDetails: `${baseUrl}/api/payment/search-reconciliation-details`, // Method -> GET => Fetch all the list and Also we can get filter data if sending some filter parameter
        apiUpdateReconcillationDetails: `${baseUrl}/api/payment/update-reconciliation-details`, // Method -> POST => Update Details Recouncile of cheque/dd 

        storePayment: `${baseUrl}/api/store-payment`,

        ulbListApi: `${baseUrl}/api/get-all-ulb`,

        getDepartmentByulb: `${baseUrl}/api/payment/get-department-byulb`,

        getPaymentgatewayByRequests: `${baseUrl}/api/payment/get-paymentgateway-byrequests`,


    }

    return apiList
}


