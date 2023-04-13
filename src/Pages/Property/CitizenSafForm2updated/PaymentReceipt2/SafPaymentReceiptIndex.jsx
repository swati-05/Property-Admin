import BrandLoader from '@/Components/Common/BrandLoader';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';
import CommonModal from '@/Components/GlobalData/CommonModal';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print-advanced';
import ApiHeader from '../../../../Components/ApiList/ApiHeader';
import CitizenApplyApiList from '../../../../Components/CitizenApplyApiList';
import BarLoader from '../../../../Components/Common/BarLoader';
import NonBlockingLoader from '../NonBlockingLoader';
// import ComponentToPrint from './SafPaymentReceipt';
import ComponentToPrint from './SafPaymentReceiptFunctional';


function SafPaymentReceiptIndex() {

    const { paymentId, module } = useParams()
    console.log("param payment id ..", paymentId)

    let title
   
        if (module == 'saf') {
            title = 'SAF Payment Receipt'
        } 
        if(module == 'holding') {
            title = 'Holding Payment Receipt'
        }
   
        if(module == 'cluster-saf'){
            title = 'Cluster SAF Payment Reciept'
        }
        if(module == 'cluster-holding'){
            title = 'Cluster Holding Payment Reciept'
        }
    
    useSetTitle(title)

    const componentRef = useRef();
    const [paymentData, setpaymentData] = useState();
    const [show, setshow] = useState(false)
    const [erroState, seterroState] = useState(false);
    const [isLoading, setisLoading] = useState(false);


    // const [paymentId, setpaymentId] = useState('pay_KiI7acuJomb5eq');

    // const { licenseId, tranId } = useParams();

    const { api_getPaymentData, api_getHoldingReceiptUrl, api_getClusterReciept } = CitizenApplyApiList()

    useEffect(() => {
        fetchPaymentData();
    }, [])

    const fetchPaymentData = () => {
        seterroState(false)
        setisLoading(true)

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
            } 
            if(module == 'saf') {
                url = api_getPaymentData
                requestBody = {
                    tranNo: paymentId
                }
            }
        

        if(module == 'cluster-saf' || module == 'cluster-holding') {
            url = api_getClusterReciept
            requestBody={tranNo : paymentId}   
        }

        console.log('before fetch payment receipt....', requestBody)
        axios.post(url, requestBody, ApiHeader())
            .then((response) => {
                // console.log("payment data", response.data.data);
                console.log("payment data at receipt.....", response);
                if (response.data.status) {
                    setpaymentData(response.data.data);
                } else {
                    seterroState(true)
                }
                setisLoading(false)
            })
            .catch((error) => {
                seterroState(true)
                setisLoading(false)
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
    if (erroState) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }

    return (
        <div>

            <ReactToPrint
                trigger={() => <button></button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint module={module} ref={componentRef} paymentData={paymentData} />
        </div>
    )
}

export default SafPaymentReceiptIndex