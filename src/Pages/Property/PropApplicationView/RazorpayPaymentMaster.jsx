//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 19 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";
import ApiHeader from "@/Components//ApiList/ApiHeader";
import ProjectApiList from "@/Components//ApiList/ProjectApiList";
// import PropertyApiList from "../../PropertyComponents/PropertyApiList";

// const { bearer, verifyPaymentStatus } = PropertyApiList();


const { verifyPaymentStatus } = ProjectApiList();

const header = ApiHeader()

export default async function RazorpayPaymentMaster(generatedData, dreturn) {



    let returnData
    var options = {
        key: "rzp_test_3MPOKRI8WOd54p",
        amount: generatedData.amount,
        currency: "INR",
        image: "http://example.com/your_logo.jpg",
        name: "JUDCO Corp.",
        description: "Testing with SAM and WEbhook",
        order_id: generatedData.orderId,
        handler: async function (response) {
            callApiLog(response)  // This function send the data to direct database => backend will verify the data
            console.log("All response", response)
            alert("Payment Susscess", response.razorpay_payment_id);
            console.log("Payment ID", response.razorpay_payment_id);
            returnData = 'data from handle: payment success'
            dreturn({ status: true, message: 'Payment Success', data: response })
        },

        prefill: {
            name: generatedData.name,
            email: generatedData.email,
            contact: generatedData.mobile
        },
        "modal": {
            "ondismiss": function (response) {
                console.log("Payment Cancel BY user", response);
            },
            "onfailed": function (response) {
                console.log("Payment Failed Response modal", response);
            }
        },
        notes: {
            ulbId: generatedData.ulbId || 0,
            departmentId: generatedData.departmentId || 0,
            applicationId: generatedData.applicationId || 0,
            workflowId: generatedData.workflowId || 0,
            userId: generatedData.userId || 0,
            name: generatedData.name || 0,
            email: generatedData.email || 0,
            contact: generatedData.mobile || 0,
        },
        theme: {
            color: "#3399cc"
        }
    };
    var pay = new window.Razorpay(options);

    pay.on('payment.failed', function (response) {
        console.log("Failed Response", response)
        callApiLogFailed(response)  // This functin called when payment got failed. and data log will saved in bacend => using api 2
        alert("Payment Failed");
        dreturn({ status: false, message: 'Payment Failed', data: response })
    });

    pay.open();

    return returnData
}


//API 2 - when payment success we will keep the log in backend
const callApiLog = (response) => {

    const sendPayload = {
        "razorpayOrderId": response.razorpay_order_id,
        "razorpayPaymentId": response.razorpay_payment_id,
        "razorpaySignature": response.razorpay_signature
    }

    axios.post(verifyPaymentStatus, sendPayload, header) /// This API Will save the data. When response come after payment Sucess -> Not Nessesary
        .then((res) => {
            console.log("2nd API Data saved ", res)
        })
        .catch((err) => {
            console.log("Error when inserting 2 api data ", err)
        })
}

//API 2 - when payment failed we will keep the log in backend
const callApiLogFailed = (response) => {

    const sendPayload = {
        "razorpayOrderId": response.error.metadata.order_id,
        "razorpayPaymentId": response.error.metadata.payment_id,
        "reason": response.error.reason,
        "source": response.error.source,
        "step": response.error.step,
        "code": response.error.code,
        "description": response.error.description,
    }

    axios.post(verifyPaymentStatus, sendPayload, header) /// This API Will save the data. When response come after payment FAILED -> Not Nessesary
        .then((res) => {
            console.log("2nd API Filed Data saved ", res)
        })
        .catch((err) => {
            console.log("Error when inserting 2 api Failed data ", err)
        })
    // }


    return RazorpayPaymentMaster
}
