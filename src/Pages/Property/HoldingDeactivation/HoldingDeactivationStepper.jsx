
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SuccessScreen from './SuccessScreen';
// import { HEADER, TRADE } from '../tradeComponent/TradeApiListFile';
import InitialBusinessDetails from './InitialBusinessDetails';
import OwnerDetails from './OwnerDetails';
import Timeline from './Timeline';
import { ToastContainer, toast } from 'react-toastify';
import OtherDetails from './OtherDetails';

function HoldingDeactivationStepper(props) {

    const [collectAllFormData, setcollectAllFormData] = useState({});
    const [FirmStep, setFirmStep] = useState(1)
    const [regCurrentStep, setRegCurrentStep] = useState(1)
    const [colorCode, setcolorCode] = useState(false)
    const [renewToggleStatus, setrenewToggleStatus] = useState(false)
    const [applicationType, setapplicationType] = useState(3)
    const [successData, setsuccessData] = useState();
    const [paymentData, setpaymentData] = useState()
    const [initialBusinessDetails, setinitialBusinessDetails] = useState([])
    const [firmDetails, setfirmDetails] = useState([])
    const [ownerDetails, setownerDetails] = useState([])
    const [licenseDetails, setlicenseDetails] = useState([])


    console.log('all form data is: ');
    console.log(collectAllFormData);

    let finalData;
    const handleAllFormData = (key, formData, submitStatus) => {
        console.log('prev Data', collectAllFormData)
        // setAllFormData({...allFormData,formData}) //this is going to replace upcoming data since has same formData key all the time
        finalData = { ...collectAllFormData, [key]: formData }
        setcollectAllFormData({ ...collectAllFormData, [key]: formData })

        // console.log("allformdata 2", finalData);
        if (submitStatus) {
            finalSubmit(finalData)
        }
    }

    const finalSubmit = (dataToSend) => {
        let oldLicenseId = dataToSend.initialBusinessDetails?.oldLicenseId;
        setTimeout(() => {
            console.log("allFormData in state", collectAllFormData)
            console.log("allFormData", dataToSend)
            axios.post("", Object.assign({}, dataToSend))
                .then(function (response) {
                    console.log("success data ", response.data);
                    if (response.data.status) {
                        setsuccessData(response.data);
                        getPaymentDetailsForReceipt(response.data);
                        setFirmStep(5)

                        notify("Application submitted Successfully", "success")
                    }
                    else {
                        // alert(response.data.message);
                        console.log("success", response.data.message)
                        setFirmStep(4);
                        notify(response.data.message, "notify");
                    }
                    // props.showLoader(false);
                })
                .catch(function (error) {
                    console.log(error);
                    // alert("Invalid response received");
                    notify("Invalid response received", "error")
                    props.showLoader(false);
                })
        }, 500)
    }

    const getPaymentDetailsForReceipt = (data) => {
        console.log("===getting payment data====", data.data.paymentRecipt);
        axios.get(data.data.paymentRecipt)
            .then(function (response) {
                if (response.data.status) {
                    setpaymentData(response.data.data)
                    console.log("===getting payment data thorugh api====", response.data);
                }
            })
            .catch(function (error) {
                console.log("===getting payment data thorugh api erro====", error);
            })
    }



    const values = {
        renewToggleStatus: renewToggleStatus,
        renewToggleStatusFun: setrenewToggleStatus,

        applicationTypeFun: setapplicationType,
        applicationType: props.applicationType,

        showLoader: props.showLoader,

        currentStep: regCurrentStep,
        currentStepFun: setRegCurrentStep,

        collectFormDataFun: handleAllFormData,
        allFormData: collectAllFormData,

        firmStepFun: setFirmStep,
        firmStep: FirmStep,

        colorCode: colorCode,
        colorCodeFun: setcolorCode,

        showLoader: props.showLoader,
        finalSubmit: finalSubmit,
        // licenseData: props.licenseValues.licenseData

    }

    const successValues = {
        successData: successData,
        successFun: setsuccessData
    }

    const notify = (toastData, actionFlag) => {
        toast.dismiss();
        { actionFlag == 'escalated' && toast.success(toastData) }
        { actionFlag == 'success' && toast.success(toastData) }
        { actionFlag == 'de-escalated' && toast.warn(toastData) }
        { actionFlag == 'notice' && toast.warn(toastData) }
        { actionFlag == 'error' && toast.error(toastData) }
    };

    return (
        <>

            <div className=" overflow-x-clip">
                {/* Form stepper for New trade License */}
                {FirmStep == 5 ? '' : <Timeline colorCode={colorCode} currentStep={regCurrentStep} />}
                <div className={`mt-8 mr-2 pl-5 transition-all ${FirmStep == 1 ? 'translate-x-0' : 'translate-x-full'}`}><InitialBusinessDetails values={values} toast={notify} /> </div>
                <div className={`mt-8 mr-2 pl-5 transition-all ${FirmStep == 2 ? ' translate-x-0  ' : 'translate-x-full'}`}><OwnerDetails values={values} toast={notify} /></div>
                <div className={`mt-8 mr-2 pl-5 transition-all ${FirmStep == 3 ? ' translate-x-0  ' : 'translate-x-full'}`}><OtherDetails values={values} toast={notify} /></div>

                <div className={`mt-8 mr-2 transition-all ${FirmStep == 4 ? ' translate-x-0  ' : 'translate-x-full'}`}><SuccessScreen values={values} successData={successValues} paymentData={paymentData} toast={notify} /></div>
            </div>

        </>
    )
}

export default HoldingDeactivationStepper