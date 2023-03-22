import React from 'react'
import { useRef } from 'react';
import ReactToPrint from 'react-to-print-advanced';
import RmcReciept from './RmcReciept';
import { useParams } from 'react-router'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import BarLoader from '@/Components/Common/BarLoader';

const RmcPrint = () => {

    const componentRef = useRef();

    const id = useParams()

    const {rmcReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [rmcDetails, setrmcDetails] = useState()

    useEffect(() => {

        setTimeout(() => {
            setloader(false)
        }, 10000);

        setloader(true)

        axios.post(rmcReciept, {tranNo : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting rmc details => ', res)
            setloader(false)
            setrmcDetails(res?.data?.data)
        })
        .catch((err) => {
            console.log("getting rmc error => ", err)
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
            <RmcReciept ref={componentRef} rmcDetails={rmcDetails} />
        </div>
  )
}

export default RmcPrint