import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print-advanced';
import ApiHeader from '../../../../Components/ApiList/ApiHeader';
import CitizenApplyApiList from '../../../../Components/CitizenApplyApiList';
import BarLoader from '../../../../Components/Common/BarLoader';
import NonBlockingLoader from '../NonBlockingLoader';
import ComponentToPrint from './SafPaymentReceipt';


function SafPaymentReceiptIndex() {

    ///////{***✅ payment Id from use param...***}///////
    const { paymentId, module } = useParams()
    console.log("param payment id ..", paymentId)


    const componentRef = useRef();
    const [paymentData, setpaymentData] = useState();
    const [show, setshow] = useState(false)
    // const [paymentId, setpaymentId] = useState('pay_KiI7acuJomb5eq');

    // const { licenseId, tranId } = useParams();

    const { api_getPaymentData, api_getHoldingReceiptUrl } = CitizenApplyApiList()

    useEffect(() => {
        fetchPaymentData();
    }, [])

    const fetchPaymentData = () => {
        showLoader(true);

        let token = window.localStorage.getItem('token')
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
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
        console.log('before fetch payment receipt....',requestBody)
        axios.post(url, requestBody, ApiHeader())
            .then((response) => {
                // console.log("payment data", response.data.data);
                console.log("payment data at receipt.....", response);
                if (response.data.status) {

                    setpaymentData(response.data.data);
                    setTimeout(() => {
                        showLoader(false);
                    }, 500);

                } else {


                    showLoader(false);
                }
            })
            .catch((error) => {
                // showLoader(false);
                setTimeout(() => {
                    showLoader(false);
                }, 500);

                console.log(error);
            })
    }

    const showLoader = (val) => {
        setshow(val);
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

export default SafPaymentReceiptIndex