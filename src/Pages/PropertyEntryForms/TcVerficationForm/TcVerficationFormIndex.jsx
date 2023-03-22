import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImUpload2 } from 'react-icons/im'
import FormSubmitResponse from '@/Components/Common/ResponseScreen/FormSubmitResponse'
import { TbWebhook } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import TVFBasic from './TVFBasic.js'
import TCFormReview from './TCFormReview.js'
import TcGeoTagging from './TcGeoTagging.js'
import api_headers from '@/Components/ApiList/api_headers.js';
import ProjectApiList from '@/Components/ApiList/ProjectApiList.js';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'
import ApiHeader from '@/Components/ApiList/ApiHeader.js';
import PropertyApiList from '@/Components/ApiList/PropertyApiList.js';
import TVFfloor from './TVFfloor.js';
import TradeNonBlockingLoader from '@/Pages/Trade/tradeComponent/TradeNonBlockingLoader.js';



function TcVerficationFormIndex(props) {
    const [formIndex, setFormIndex] = useState(1) //formindex specifies type of form like basicdetails at index 1 ...
    const [submitStatus, setSubmitStatus] = useState(false) //checking full form filled status to toggle final submit button
    const [allFormData, setAllFormData] = useState({})
    //assessment type
    const [assTypeText, setAssTypeText] = useState()
    const [show, setshow] = useState(false)
    const [applicationData, setApplicationData] = useState({})
    const [masterDataList, setmasterDataList] = useState()
    const { api_getSafDetailsById, api_fetchRoleDetail } = ProjectApiList()
    const { get_MasterData } = PropertyApiList()
    const [roleDetails, setRoleDetails] = useState('')



    const { id } = useParams()


    //activating notification if no owner or no floor added
    const notify = (toastData, type) => {
        toast.dismiss();
        if (type == 'success') {
            toast.success(toastData)
        }
        if (type == 'error') {
            toast.error(toastData)
        }
    };

    //
    const submitButtonToggle = () => {
        setSubmitStatus(true)
    }

    const collectAllFormData = (key, formData) => {
        console.log('prev of all Data', allFormData)
        // setAllFormData({...allFormData,formData}) //this is going to replace upcoming data since has same formData key all the time
        setAllFormData({ ...allFormData, [key]: formData })
    }

    useEffect(() => {
        fetchDetailsById()
        fetchMstrData()


    }, [])


    const fetchDetailsById = () => {
        // showLoader(true)
        axios.post(`${api_getSafDetailsById}`, { id: id }, api_headers())
            .then(function (response) {
                console.log('application data...', response?.data?.data)
                if (response?.data?.status) {
                    setApplicationData(response?.data?.data)
                    fetchRoleDetail(response?.data?.data)
                } else {
                    // showLoader(false)
                }

            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                showLoader(false)
            })
    }

    // console.log("current role for candidates", applicationData?.data?.current_role)
    // console.log("applicationData", applicationData)

    const fetchMstrData = () => {
        axios.get(get_MasterData, api_headers())
            .then(function (response) {
                console.log('saf master data ....', response?.data?.data)
                setmasterDataList(response?.data?.data)
            })
            .catch(function (error) {
                console.log('errorrr in masterDataFetch.... ', error);
            })
    }

    //{////********Role Detail*******//////}
    const fetchRoleDetail = (applicationData) => {
        axios.post(api_fetchRoleDetail,
            {
                workflowId: applicationData?.data?.workflow_id,
                wfRoleId: applicationData?.data?.current_role
            },
            api_headers()
        )
            .then(function (response) {
                console.log("roles ", response.data);
                setRoleDetails(response.data.data)

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    const values = {
        masterData: masterDataList,
        roleDetails: roleDetails,
        applicationData: applicationData,
        collectFormDataFun: collectAllFormData,
        submitFun: submitButtonToggle,
        toast: notify
    }
    const showLoader = (val) => {
        setshow(val);
    }


    return (

        <>
            <TradeNonBlockingLoader show={show} />
            <div className='overflow-x-clip'>
                <div className={`transition-all ${formIndex == 1 ? 'translate-x-0' : 'translate-x-full'}`}>
                    <TVFBasic values={values} /></div>
                <div className={`transition-all ${formIndex == 2 ? 'translate-x-0' : 'translate-x-full'} `}>
                    <TVFfloor values={values} /></div>


                {applicationData?.data?.current_role != 7 && <div className={`  transition-all  ${formIndex == 3 ? 'translate-x-0' : 'translate-x-full'}`}>
                    <TcGeoTagging roleDetails={roleDetails} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} applicationData={applicationData} /></div>
                }

            </div>
        </>
    )
}

export default TcVerficationFormIndex