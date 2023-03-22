import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbWebhook } from 'react-icons/tb'
import PropertyTaxCalculatorForm from './PropertyTaxCalculatorForm'
import PropertyTaxReview from './PropertyTaxReview'
import axios from 'axios';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import PropertyApiList from '@/Components/ApiList/PropertyApiList';
import Loader from './Loader';
import { ColorRing } from 'react-loader-spinner'




function PropertyTaxCalculatorIndex() {
    const [formIndex, setFormIndex] = useState(1) //formindex specifies type of form like basicdetails at index 1 ...
    const [animateform1, setAnimateform1] = useState('translate-x-0') //slide animation control state for BasicDetails form
    const [animateform2, setAnimateform2] = useState('pl-20 translate-x-full')//slide animation control state for PropertyAddressDetails form
    const [allFormData, setAllFormData] = useState({})
    const [submitButtonStatus, setsubmitButtonStatus] = useState(true)
    const [viewLevel, setviewLevel] = useState(1)
    const [reviewData, setreviewData] = useState()
    const [isLoading, setisLoading] = useState(false)


    //assessment type
    const [assTypeText, setAssTypeText] = useState()

    const { calculatePropertyTax } = PropertyApiList()
    const backFun = (formIndex) => {
        // setsubmitButtonStatus(true)
        setviewLevel(1)
    }
    const nextFun = (formIndex) => {
        setviewLevel(2)
    }
    //activating notification if no owner or no floor added
    const notify = (toastData) => {
        setviewLevel(2)
    };



    const collectAllFormData = (basicDetails, floorData, ownerData) => {
        console.log('-----basic details....', basicDetails, '----floor details...', floorData, '-----owner data in index----', ownerData)
        submitCalculatorForm(basicDetails, floorData, ownerData)
    }
    console.log('....all form data at tax calculator....', allFormData)

    const submitCalculatorForm = (basicDetails, floorData, ownerData) => {
        setsubmitButtonStatus(false)
        setisLoading(true)
        console.log('--1--at submitCalculatorForm')
        // activating loader
        const requestBody = {
            ulb_id: 2,//static for now
            // basic details
            ward: basicDetails?.wardNo,
            newWard: basicDetails?.newWardNo,
            ownershipType: basicDetails?.ownerShiptype,
            propertyType: basicDetails?.propertyType,
            zone: basicDetails?.zone,
            isMobileTower: basicDetails?.mobileTowerStatus,
            mobileTowerArea: basicDetails?.mobileTowerArea,
            mobileTowerDate: basicDetails?.mobileTowerDate,
            isHoardingBoard: basicDetails?.hoardingStatus,
            hoardingArea: basicDetails?.hoardingArea,
            hoardingDate: basicDetails?.hoardingDate,
            isPetrolPump: basicDetails?.petrolPumpStatus,
            petrolPumpArea: basicDetails?.petrolPumpArea,
            petrolPumpDate: basicDetails?.petrolPumpDate,
            isWaterHarvesting: basicDetails?.waterHarvestingStatus,
            // propertyAddressDetails
            roadType: basicDetails?.roadWidth,
            areaOfPlot: basicDetails?.plotArea,
            //floor
            floor: floorData,
            owner: ownerData

        }

        console.log('--2--before fetch in request....', requestBody)
        //    setviewLevel(2)
        //     return
        axios.post(calculatePropertyTax, requestBody, ApiHeader())
            .then(function (response) {


                console.log('==3 cacluator tax response===', response)
                setreviewData(response?.data)
                setviewLevel(2)

                // if(response?.status){
                //     nextFun(2)
                // }

                setisLoading(false)
                setsubmitButtonStatus(true)

            })
            .catch(function (error) {
                console.log('== 3 calcualte tax error== ', error);
                notify(`Something went wrong`, 'error')
                setisLoading(false)
                setsubmitButtonStatus(true)
            })
    }
    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000} />
            <div className="grid grid-cols-2">
                <div>
                    {/* <div className='text-left relative top-0'>
                    <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4'>prev-holding : A0101010101010101</span>
                </div> */}
                </div>
                <div><div className='text-right relative top-0 animate__animated animate__fadeInDown'>
                    <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold pr-4'><TbWebhook className='inline' /> {assTypeText}</span>
                </div></div>


            </div>


            <div className={`${viewLevel == 1 ? 'block' : 'hidden'} relative`}><PropertyTaxCalculatorForm submitButtonStatus={submitButtonStatus} isLoading={isLoading} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
            <div className={`${viewLevel == 2 ? 'block' : 'hidden'} relative`}><PropertyTaxReview reviewData={reviewData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
            


        </>
    )
}

export default PropertyTaxCalculatorIndex