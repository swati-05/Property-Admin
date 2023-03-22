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

const DemandPrint = () => {

    const componentRef = useRef();

    const id = useParams()

    const {demandReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [demandDetails, setdemandDetails] = useState()

    useEffect(() => {

        setTimeout(() => {
            setloader(false)
        }, 10000);

        setloader(true)

        axios.post(demandReciept, {propId : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting demand details => ', res)
            setloader(false)
            setdemandDetails(res?.data?.data?.dueReceipt)
        })
        .catch((err) => {
            console.log("getting demand error => ", err)
            setloader(false)
            toast.error('Something went wrong !!!')
        })
    },[])

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