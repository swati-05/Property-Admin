import { useState, useEffect } from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitResponse from '@/Components/Common/ResponseScreen/FormSubmitResponse'
import GovSafBasicDetails from './GovSafBasicDetails'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BarLoader from '@/Components/Common/BarLoader'
import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import GovSafDemand from './GovSafDemand'



function GovSafApplicationFormIndex() {
    const [formIndex, setFormIndex] = useState(1) //formindex specifies type of form like basicdetails at index 1 ...
    const [animateform1, setAnimateform1] = useState('translate-x-0') //slide animation control state for BasicDetails form
    const [animateform2, setAnimateform2] = useState('pl-20 translate-x-full')//slide animation control state for PropertyAddressDetails form
    const [animateform3, setAnimateform3] = useState('pl-20 translate-x-full')//slide animation control state for ElectricityWaterDetails form
    const [animateform4, setAnimateform4] = useState('pl-20 translate-x-full')//slide animation control state for OwnerDetails form
    const [animateform5, setAnimateform5] = useState('pl-20 translate-x-full')//slide animation control state for FloorDetails form
    const [submitStatus, setSubmitStatus] = useState(false) //checking full form filled status to toggle final submit button
    const [allFormData, setAllFormData] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [preFormData, setPreFormData] = useState()///{***state variable to hold all form required data***}///
    const [demandData, setdemandData] = useState()


    useSetTitle('Government SAF Form')

    const { api_getMasterData, api_postNewAssessment, api_getAllUlb, api_getHoldingDetails, api_getLocationByUlb, api_reviewCalculation, api_updateSafDetails } = CitizenApplyApiList()


    const backFun = (formIndex) => {
        let tempFormIndex = formIndex
        if (tempFormIndex == 2) { //backward by current form index 2
            setFormIndex(1) // go to form index 1 since back from index 2
            setAnimateform1('translate-x-0') // always setstate one index less than current index
            setAnimateform2('pl-20 translate-x-full') //always current index setstate
        }
        if (tempFormIndex == 3) {
            setFormIndex(2)
            setAnimateform2('translate-x-0')
            setAnimateform3('pl-20 translate-x-full')
        }
        if (tempFormIndex == 4) {
            setFormIndex(3)
            setAnimateform3('translate-x-0')
            setAnimateform4('pl-20 translate-x-full')
        }
        if (tempFormIndex == 5) {
            setFormIndex(4)
            setAnimateform4('translate-x-0')
            setAnimateform5('pl-20 translate-x-full')
        }


    }
    const nextFun = (formIndex) => {
        let tempFormIndex = formIndex
        if (tempFormIndex == 1) { //forward by current form index 1
            setFormIndex(2) //go to form index 2 since forward from index 1
            setAnimateform1(' -translate-x-full right-80')  //always current index setstate
            setAnimateform2('pl-0 translate-x-0') // always setstate one index greater than current index
        }
        if (tempFormIndex == 2) {
            setFormIndex(3)
            setAnimateform2('-translate-x-full right-80')
            setAnimateform3('pl-0 translate-x-0')
        }
        if (tempFormIndex == 3) {
            setFormIndex(4)
            setAnimateform3('-translate-x-full right-80')
            setAnimateform4('pl-0 translate-x-0')
        }
        if (tempFormIndex == 4) {
            setFormIndex(5)
            setAnimateform4('-translate-x-full right-80')
            setAnimateform5('pl-0 translate-x-0')
        }

    }

    useEffect(() => {

        fetchMasterData()
        // if (safType == 're' || safType == 'mu' || safType == 'bo-edit') {
        //     fetchPropertyDetails()
        // }
    }, [])

    const fetchMasterData = () => {

        axios.get(`${api_getMasterData}`, ApiHeader())
            .then(function (response) {
                console.log('saf master data ....', response.data.data)
                setPreFormData(response.data.data)
            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }

    //activating notification if no owner or no floor added
    const notify = (toastData) => {
        toast.dismiss();
        toast.error(toastData)
    };

    //
    const submitButtonToggle = () => {
        setSubmitStatus(true)
    }

    const collectAllFormData = (key, formData) => {
        console.log('prev Data', allFormData)
        // setAllFormData({...allFormData,formData}) //this is going to replace upcoming data since has same formData key all the time
        setAllFormData({ ...allFormData, [key]: formData })
    }
    if (responseScreenStatus == 'success') {
        return (
            <>
                <FormSubmitResponse />
            </>
        )
    }
    return (
        <>
            {
                isLoading &&
                <BarLoader />
            }

            {/* <div className="flex mt-0">
                <FormStatusTimeline active={formIndex == 1 && true} index="1" level="Property Details" verificationStatus={formIndex >= 2 && true} last={false} />
                <FormStatusTimeline active={formIndex == 2 && true} index="2" level="Owner Details" verificationStatus={formIndex >= 3 && true} last={false} />
                <FormStatusTimeline active={formIndex == 3 && true} index="3" level="Special Details" verificationStatus={formIndex >= 4 && true} last={false} />
                <FormStatusTimeline active={formIndex == 4 && true} index="5" level="Floor Details" verificationStatus={formIndex >= 5 && true} last={true} />
            </div> */}


            {!submitStatus && <div className={`${animateform1} transition-all relative`}><GovSafBasicDetails preFormData={preFormData} collectFormDataFun={collectAllFormData} demandData={(values) => setdemandData(values)} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>}
            {/* collectDataFun to receive form data on every save&next */}
            {/* submitFun to activate final submit button when all forms are filled */}
            {/* toastFun to activate toast notification via receiving toast message */}
            {/* backFun to go back from any specific form level */}
            {/* nextFun to go next from any specific form level */}
            {/* <div className={`${animateform2} transition-all relative`}><GovSafOwner collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
            <div className={`${animateform3} transition-all relative`}><GovSafExtra collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
            <div className={`${animateform4} transition-all relative`}><GovSafFloor collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} backFun={backFun} nextFun={nextFun} /></div> */}

            {submitStatus && <GovSafDemand safSubmitResponse={demandData?.data} />}

            {/* {submitStatus && <div onClick={() => setResponseScreenStatus('success')} className="flex items-center justify-center"><button type="submit" className="absolute bottom-40 mx-auto px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-blue-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Submit Form <ImUpload2 className='inline text-xl' /></button></div>} */}




        </>
    )
}

export default GovSafApplicationFormIndex