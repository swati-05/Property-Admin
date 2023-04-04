import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print-advanced';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import BarLoader from '@/Components/Common/BarLoader';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import ComponentToPrint from './GbSafPaymentReceipt';
import BrandLoader from '@/Components/Common/BrandLoader';
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';

function GbSafPaymentReceiptIndex() {

    ///////{***✅ payment Id from use param...***}///////
    const { paymentId, module } = useParams()
    console.log("param payment id ..", paymentId)
    let title
    if (module == 'saf') {
        title = "SAF Receipt"
    } else {
        title = "Holding Receipt"
    }
    useSetTitle(title)

    const componentRef = useRef();
    const [paymentData, setpaymentData] = useState();
    const [show, setshow] = useState(false)
    const [erroState2, seterroState2] = useState(false);
    const [isLoading, setisLoading] = useState(false)

    // const [paymentId, setpaymentId] = useState('pay_KiI7acuJomb5eq');

    // const { licenseId, tranId } = useParams();

    const { api_getPaymentData, api_getHoldingReceiptUrl } = CitizenApplyApiList()

    useEffect(() => {
        fetchPaymentData();
    }, [])

    const fetchPaymentData = () => {
        setisLoading(true);
        seterroState2(false)

        let url
        let requestBody
        if (module == 'holding') {
            url = api_getHoldingReceiptUrl
            requestBody = {
                // HERE paymentId is transaction no
                tranNo: paymentId
            }
        } else {
            url = api_getPaymentData
            requestBody = {
                tranNo: paymentId
            }
        }
        console.log('before fetch payment receipt....', requestBody)
        axios.post(url, requestBody, ApiHeader())
            .then((response) => {
                // console.log("payment data", response.data.data);
                console.log("payment data at receipt.....", response);
                if (response.data.status) {
                    setpaymentData(response?.data?.data);
                } else {
                    setisLoading(false);
                    seterroState2(true)
                }
                setisLoading(false)
            })
            .catch((error) => {
                setisLoading(false);
                seterroState2(true)
                console.log(error);
            })
    }

    const showLoader = (val) => {
        setshow(val);
    }

    if (isLoading) {
        return (
            <>
                <BrandLoader />
            </>
        )
    }
    if (erroState2) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }

    return (
        <div>
            {/* <NonBlockingLoader show={show} /> */}
            {
                show && <BarLoader />
            }
            <ReactToPrint
                trigger={() => <button></button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint module={module} ref={componentRef} paymentData={paymentData} />
        </div>
    )
}

export default GbSafPaymentReceiptIndex