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
import BrandLoader from '@/Components/Common/BrandLoader';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';
import CommonModal from '@/Components/GlobalData/CommonModal';

const PrintPage = () => {

    const componentRef = useRef();

    const id = useParams()

    const {api_samReciept} = PropertyApiList()

    const [loader, setloader] = useState(false)
    const [famDetails, setfamDetails] = useState()
  const [erroState2, seterroState2] = useState(false);
  const [isLoading, setisLoading] = useState(false)
    
    useEffect(() => {

        seterroState2(false)
        setisLoading(true)

        axios.post(api_samReciept, {memoId : id?.id}, ApiHeader())
        .then((res) => {
            console.log('getting fam memo details => ', res)
            setisLoading(false)
            if (res?.data?.status) {
                setfamDetails(res?.data?.data)
              } else {
                seterroState2(true)
              }
        })
        .catch((err) => {
            console.log("getting fam memo error => ", err)
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
            <FamReciept ref={componentRef} famDetails={famDetails} />
        </div>
  )
}

export default PrintPage