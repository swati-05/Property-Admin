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
import BrandLoader from '@/Components/Common/BrandLoader';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';
import CommonModal from '@/Components/GlobalData/CommonModal';

const RmcPrint = () => {

    const componentRef = useRef();

    const id = useParams()

    const {rmcReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [rmcDetails, setrmcDetails] = useState()
  const [erroState2, seterroState2] = useState(false);
  const [isLoading, setisLoading] = useState(false)


    useEffect(() => {

        seterroState2(false)
        setisLoading(true)

        axios.post(rmcReciept, {tranNo : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting rmc details => ', res)
            setisLoading(false)
          
            if (res?.data?.status) {
                setrmcDetails(res?.data?.data)
            } else {
                seterroState2(true)
            }
        })
        .catch((err) => {
            console.log("getting rmc error => ", err)
            setisLoading(false)
            seterroState2(true)

        })
    },[])


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
            <RmcReciept ref={componentRef} rmcDetails={rmcDetails} />
        </div>
  )
}

export default RmcPrint