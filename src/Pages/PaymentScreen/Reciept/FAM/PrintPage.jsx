import React from 'react'
import { useRef } from 'react';
import ReactToPrint from 'react-to-print-advanced';
import FamReciept from './FamReciept';
import { useParams } from 'react-router'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import BarLoader from '@/Components/Common/BarLoader';

const PrintPage = () => {

    const componentRef = useRef();

    const id = useParams()

    const {api_samReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [famDetails, setfamDetails] = useState()

    useEffect(() => {

        setTimeout(() => {
            setloader(false)
        }, 10000);

        setloader(true)

        axios.post(api_samReciept, {memoId : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting fam memo details => ', res)
            setloader(false)
            setfamDetails(res?.data?.data)
        })
        .catch((err) => {
            console.log("getting fam memo error => ", err)
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
            <FamReciept ref={componentRef} famDetails={famDetails} />
        </div>
  )
}

export default PrintPage