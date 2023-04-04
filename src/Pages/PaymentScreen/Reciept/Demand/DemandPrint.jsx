import React from 'react'
import { useRef } from 'react';
import ReactToPrint from 'react-to-print-advanced';
import DemandReciept from './DemandReciept';
import { useParams } from 'react-router'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import BarLoader from '@/Components/Common/BarLoader';
import BrandLoader from '@/Components/Common/BrandLoader';
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';

const DemandPrint = () => {

    const componentRef = useRef();

    const id = useParams()

    const { demandReciept } = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [demandDetails, setdemandDetails] = useState()
    const [erroState2, seterroState2] = useState(false);
    const [isLoading, setisLoading] = useState(false)


    useEffect(() => {

        seterroState2(false)
        setisLoading(true)

        axios.post(demandReciept, { propId: id?.id }, ApiHeader())
            .then((res) => {
                console.log('getting demand details => ', res)
                setisLoading(false)
                if (res?.data?.status) {
                    setdemandDetails(res?.data?.data?.dueReceipt)
                } else {
                    seterroState2(true)
                }
            })
            .catch((err) => {
                console.log("getting demand error => ", err)
                setisLoading(false)
                seterroState2(true)

            })
    }, [])

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

            {loader && <BarLoader />}

            <ToastContainer position="top-right" autoClose={2000} />

            <ReactToPrint
                trigger={() => <button></button>}
                content={() => componentRef.current}
            />
            <DemandReciept ref={componentRef} demandDetails={demandDetails} />
        </div>
    )
}

export default DemandPrint