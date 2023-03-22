import axios from 'axios';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print-advanced';
import BarLoader from '../../../../Components/Common/BarLoader';
import ComponentToPrint from './PaymentReceipt';


function PaymentReceiptIndex(props) {

    const componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                trigger={() => <button></button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint module={module} ref={componentRef} paymentData={props?.data} />
        </div>
    )
}

export default PaymentReceiptIndex