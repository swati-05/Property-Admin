//////////////////{*****}//////////////////////////////////////////
// Author - R U Bharti
// Version - 1.0
// Date - 19th Dec.,2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropSafUpdateFormIndex
// DESCRIPTION - CitizenPropSafUpdateFormIndex Component
//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitResponse from '@/Components/Common/ResponseScreen/FormSubmitResponse'
import { useNavigate, useParams } from 'react-router-dom'
import { contextVar } from '@/Components/Context/Context'
import axios from 'axios'
import CitizenApplyApiList from '@/Components/ApiList/CitizenApplyApiList'
import PropFeedbackScreen from './PropFeedbackScreen'
import LoaderComponent from './LoaderComponent';
import { ColorRing } from "react-loader-spinner";
import FormStatusTimeline from './FormStatusTimeline'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import CitizenPropBasicDetail from './CitizenPropBasicDetail';
import CitizenPropPropertyAddressDetails from './CitizenPropPropertyAddressDetails';
import CitizenPropElectricityWaterDetails from './CitizenPropElectricityWaterDetails';
import CitizenPropOwnerDetails from './CitizenPropOwnerDetails';
import SafFormReview from './SafFormReview/SafFormReview';
import CitizenPropFloorDetails from './CitizenPropFloorDetails';
import { toast, ToastContainer } from 'react-toastify';

function CitizenPropSafUpdateFormIndex() {

    const { api_updateSafDetails, api_getSafDetailsById2 } = CitizenApplyApiList()
    const { notify } = useContext(contextVar)     //////global toast function/////
    const navigate = useNavigate()
    const [formIndex, setFormIndex] = useState(1) ///{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///
    const [animateform1, setAnimateform1] = useState('translate-x-0 mb-40') ////{***slide animation control state for BasicDetails form***}////
    const [animateform2, setAnimateform2] = useState('pl-20 translate-x-full')////{***slide animation control state for PropertyAddressDetails form***}///
    const [animateform3, setAnimateform3] = useState('pl-20 translate-x-full')//{***slide animation control state for ElectricityWaterDetails form***}//   
    const [animateform4, setAnimateform4] = useState('pl-20 translate-x-full')/////{*** slide animation control state for OwnerDetails form***}///
    const [animateform5, setAnimateform5] = useState('pl-20 translate-x-full')///{*** slide animation control state for FloorDetails form***}///
    const [animateform6, setAnimateform6] = useState('pl-20 translate-x-full')////{***slide animation control state for reviewForm page***}////
    const [animateform7, setAnimateform7] = useState('pl-20 translate-x-full')///{*** slide animation control state for formDemand page***}///
    const [animateform8, setAnimateform8] = useState('pl-20 translate-x-full')/////{***slide animation control state for payment page***}////
    const [preFormData, setPreFormData] = useState()///{***state variable to hold all form required data***}///
    const [safSubmitResponse, setsafSubmitResponse] = useState()////{***state variable to hold response data after submitting the saf form***}//
    const [show, setshow] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [allFormData, setAllFormData] = useState({}) //* State variable to store form data from all forms at one variable
    const [allFormViewData, setAllFormViewData] = useState({}) //* State variable to store form data from all forms at one variable
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [formHeadStatus, setformHeadStatus] = useState(true)
    const [loaderStatus, setLoaderStatus] = useState(false)

    let assTypeText = "NEW ASSESSMENT"
    console.log('ass type . from main ', assTypeText)

    const {id} = useParams()
    console.log("id => ", id)


    ///// BACK FUN  /////
    const backFun = (formIndex) => {
        let tempFormIndex = formIndex
        //> if backward by current form index 2
        if (tempFormIndex == 2) {
            //> go to form index 1 since back from index 2
            setFormIndex(1)
            //> always setstate one index less than current index
            setAnimateform1('translate-x-0 mb-40')
            //> always current index setstate
            setAnimateform2('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 3) {
            setFormIndex(2)
            setAnimateform2('translate-x-0 mb-40')
            setAnimateform3('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 4) {
            setFormIndex(3)
            setAnimateform3('translate-x-0 mb-40')
            setAnimateform4('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 5) {
            setFormIndex(4)
            setAnimateform4('translate-x-0 mb-40')
            setAnimateform5('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 6) {
            setFormIndex(5)
            setAnimateform5('translate-x-0 mb-40')
            setAnimateform6('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 7) {
            console.log('calling from 7')
            setformHeadStatus(false)
            setFormIndex(6)
            setAnimateform6('translate-x-0 mb-40')
            setAnimateform7('pl-20 translate-x-full mb-0')
        }
        if (tempFormIndex == 8) {
            setFormIndex(7)
            setAnimateform7('translate-x-0 mb-40')
            setAnimateform8('pl-20 translate-x-full mb-0')
        }
    }

    ///// NEXT FUN /////
    const nextFun = (formIndex) => {
        let tempFormIndex = formIndex

        ///// forward by current form index 1 /////
        if (tempFormIndex == 1) {
            ///// go to form index 2 since forward from index 1////
            setFormIndex(2)

            ///// always current index setstate////
            setAnimateform1(' -translate-x-full right-80 mb-0')

            //// always setstate one index greater than current index////
            setAnimateform2('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 2) {
            setFormIndex(3)
            setAnimateform2('-translate-x-full right-80 mb-0')
            setAnimateform3('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 3) {
            setFormIndex(4)
            setAnimateform3('-translate-x-full right-80 mb-0')
            setAnimateform4('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 4) {
            setFormIndex(5)
            setAnimateform4('-translate-x-full right-80 mb-0')
            setAnimateform5('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 5) {
            setformHeadStatus(false)
            setFormIndex(6)
            setAnimateform5('-translate-x-full right-80 mb-0')
            setAnimateform6('pl-0 translate-x-0 mb-40')
        }
        if (tempFormIndex == 6) {
            setFormIndex(7)
            setAnimateform6('-translate-x-full right-80 mb-0')
            setAnimateform7('pl-0 translate-x-0 mb-40')
        }
        // if (tempFormIndex == 7) {
        //     setFormIndex(8)
        //     setAnimateform7('-translate-x-full right-80 mb-0')
        //     setAnimateform8('pl-0 translate-x-0 mb-40')
        // }

    }

    ///// SUBMIT FORM /////
    const submitButtonToggle = () => {
        // alert("submitted")
        console.log('final form ready to submit...', allFormData)
        submitSafForm()
    }

    ///////////{*** NEW ASSESSMENT TYPE SUBMIT FUNCTION***}/////////
    const submitSafForm = () => {
        // setLoaderStatus(true)
        const header = ApiHeader()

        ///////////{*** NEW ASSESSMENT TYPE ***}/////////
        // const requestBody = {

        //     // basic details
        //     assessmentType: "1", //done
        //     ward: allFormData.basicDetails.wardNo, //done
        //     newWard: allFormData.basicDetails.newWardNo,
        //     propertyType: allFormData.basicDetails.propertyType,//done
        //     // dateOfPurchase: '',// what is this /?
        //     ownershipType: allFormData.basicDetails.ownershipType,//done

        //     zone: allFormData.basicDetails.zone,//done
        //     isMobileTower: allFormData.basicDetails.mobileTowerStatus ? '1' : '0',//done
        //     mobileTower: {
        //         area: allFormData.basicDetails.mobileTowerArea,//done
        //         dateFrom: allFormData.basicDetails.mobileTowerArea//done
        //     },
        //     isHoardingBoard: allFormData.basicDetails.hoardingStatus ? '1' : '0',//done
        //     hoardingBoard: {
        //         area: allFormData.basicDetails.hoardingArea ? '1' : '0',//done
        //         dateFrom: allFormData.basicDetails.hoardingDate,//done
        //     },
        //     isPetrolPump: allFormData.basicDetails.petrolPumpStatus ? '1' : '0',//done
        //     petrolPump: {
        //         area: allFormData.basicDetails.petrolPumpArea,//done
        //         dateFrom: allFormData.basicDetails.petrolPumpDate//done
        //     },

        //     isWaterHarvesting: allFormData.basicDetails.waterHarvestingStatus,//done

        //     //** electricityandWaterDetails
        //     // electricityConnection: true,
        //     // electricityCustNo: allFormData.electricityWaterDetails.electrictyConsumerNo,
        //     // electricityAccNo: allFormData.electricityWaterDetails.accNo,
        //     // electricityBindBookNo: allFormData.electricityWaterDetails.bindBookNo,
        //     // buildingPlanApprovalNo: allFormData.electricityWaterDetails.bpApprovalNo,
        //     // buildingPlanApprovalDate: allFormData.electricityWaterDetails.bpApprovalDate,
        //     // waterConnNo: allFormData.electricityWaterDetails.waterConsumerNo,
        //     // waterConnDate: allFormData.electricityWaterDetails.waterConnectionDate,

        //     //** propertyAddressDetails
        //     // khataNo: allFormData.propertyAddressDetails.khataNo,
        //     // plotNo: allFormData.propertyAddressDetails.plotNo,
        //     // villageMaujaName: allFormData.propertyAddressDetails.village_mauja,
        //     roadType: allFormData.propertyAddressDetails.roadWidth,//done
        //     areaOfPlot: allFormData.propertyAddressDetails.plotArea,//done
        //     // propAddress: allFormData.propertyAddressDetails.locality,
        //     // propCity: allFormData.propertyAddressDetails.city,
        //     // propDist: allFormData.propertyAddressDetails.district,
        //     // propPinCode: allFormData.propertyAddressDetails.pin,

        //     // corrAddress: allFormData.propertyAddressDetails.c_locality,
        //     // corrCity: allFormData.propertyAddressDetails.c_city,
        //     // corrDist: allFormData.propertyAddressDetails.c_district,
        //     // corrPinCode: allFormData.propertyAddressDetails.c_pin,

        //     //** owner
        //     owner: allFormData.ownerDetails,

        //     //** floor
        //     // floor: allFormData.floorDetails //done
           

        // }

        const requestBody = {

            id: id,

            // basic details
            // ======================================
            assessmentType: "1", //done

            // ward: allFormData.basicDetails.wardNo, //done
            newWard: allFormData.basicDetails.newWardNo,
            // propertyType: allFormData.basicDetails.propertyType,//done
            // ownershipType: allFormData.basicDetails.ownershipType,//done
            zone: allFormData.basicDetails.zone,//done

            // isMobileTower: allFormData.basicDetails.mobileTowerStatus ? '1' : '0',//done
            // mobileTower: {
            //     area: allFormData.basicDetails.mobileTowerArea,//done
            //     dateFrom: allFormData.basicDetails.mobileTowerArea//done
            // },
            // isHoardingBoard: allFormData.basicDetails.hoardingStatus ? '1' : '0',//done
            // hoardingBoard: {
            //     area: allFormData.basicDetails.hoardingArea ? '1' : '0',//done
            //     dateFrom: allFormData.basicDetails.hoardingDate,//done
            // },
            // isPetrolPump: allFormData.basicDetails.petrolPumpStatus ? '1' : '0',//done
            // petrolPump: {
            //     area: allFormData.basicDetails.petrolPumpArea,//done
            //     dateFrom: allFormData.basicDetails.petrolPumpDate//done
            // },

            // isWaterHarvesting : allFormData.basicDetails.waterHarvestingStatus ? '1' : '0',



            // electricityandWaterDetails
            // ===========================================
            electricityConnection: true,
            electricityCustNo: allFormData.electricityWaterDetails.electrictyConsumerNo,
            electricityAccNo: allFormData.electricityWaterDetails.accNo,
            electricityBindBookNo: allFormData.electricityWaterDetails.bindBookNo,
            buildingPlanApprovalNo: allFormData.electricityWaterDetails.bpApprovalNo,
            buildingPlanApprovalDate: allFormData.electricityWaterDetails.bpApprovalDate,
            waterConnNo: allFormData.electricityWaterDetails.waterConsumerNo,
            waterConnDate: allFormData.electricityWaterDetails.waterConnectionDate,

            //** propertyAddressDetails
            // khataNo: allFormData.propertyAddressDetails.khataNo,
            // plotNo: allFormData.propertyAddressDetails.plotNo,
            villageMaujaName: allFormData.propertyAddressDetails.village_mauja,
            // roadWidth: allFormData.propertyAddressDetails.roadWidth,//done
            // areaOfPlot: allFormData.propertyAddressDetails.plotArea,//done
            propAddress: allFormData.propertyAddressDetails.locality,
            propCity: allFormData.propertyAddressDetails.city,
            propDist: allFormData.propertyAddressDetails.district,
            propPinCode: allFormData.propertyAddressDetails.pin,

            corrAddress: allFormData.propertyAddressDetails.c_locality,
            corrCity: allFormData.propertyAddressDetails.c_city,
            corrDist: allFormData.propertyAddressDetails.c_district,
            corrPinCode: allFormData.propertyAddressDetails.c_pin,

            //** owner
            // =======================================
            owner: allFormData?.ownerDetails,

        }
       
        console.log('form submit request body....', requestBody)

        // return
        axios.post(`${api_updateSafDetails}`, requestBody, ApiHeader())
            .then(function (response) {
                // setloader(false)
                console.log('response after pushing saf data', response)
                // setsafSubmitResponse(response?.data)
                setLoaderStatus(false)
                toast.success("Details Updated Successfully !!")
                navigate('/saf-workflow')

            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
                setLoaderStatus(false)
                toast.error("Something went wrong!!")
            })
    }

    ///////////{*** COLLECTING ALL FORM DATA***}/////////
    const collectAllFormData = (key, formData) => {
        console.log('prev of all Data', allFormData)
        setAllFormData({ ...allFormData, [key]: formData })
    }

    ///////////{*** GETTING MASTER DATA***}/////////
    useEffect(() => {

        console.log('entered.........')

        const header = ApiHeader()

        axios.post(`${api_getSafDetailsById2}`, { "id": id }, header)
            .then(function (response) {
                console.log('saf master data ....', response?.data?.data)
                setPreFormData(response?.data?.data)
            })
            .catch(function (error) {
                console.log('saf master data errorrr.... ', error);
            })
    }, [id])

    if (responseScreenStatus == 'success') {
        return (
            <>
                <FormSubmitResponse />
            </>
        )
    }

    const showLoader = (value) => {
        setshow(value);
    }


    return (
        <>
        <ToastContainer position="top-right" autoClose={2000} />

            {loaderStatus && (
                <div className="w-full z-10 absolute mx-auto text-center flex justify-center items-center top-1/2">
                    <span className="inline">
                        <ColorRing
                            visible={true}
                            height="120"
                            width="120"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                        />
                    </span>
                </div>
            )}
            {/* take a parent div ...style it as displayed below    ,....make it a grid with col-12 */}
            <div className='w-full  mt-4 grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 p-2'>



                {/* Rest of the component will go here ....it has a col-span of 9*/}
                <div className='col-span-9 w-full h-screen overflow-x-hidden'>

                    {/* your custom content */}
                    <div className='w-full bg-white py-4 rounded-lg'>
                        {formHeadStatus && <h1 className='font-mono h-10 border-2 rounded-lg bg-sky-400 text-white py-1 px-4 m-2'>WELCOME TO PROPERTY. YOU ARE APPLYING FOR A <strong className='text-white text-sm capitalize'>{assTypeText} ! </strong></h1>}
                        <div>
                        </div>
                        {formIndex < 7 && <div className="flex mt-0 mb-5">
                            <FormStatusTimeline active={formIndex == 1 && true} index="1" level="Basic Details" verificationStatus={formIndex >= 2 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 2 && true} index="2" level="Property Details" verificationStatus={formIndex >= 3 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 3 && true} index="3" level="Electricity & Water" verificationStatus={formIndex >= 4 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 4 && true} index="4" level="Owner Details" verificationStatus={formIndex >= 5 && true} last={false} />
                            <FormStatusTimeline active={formIndex == 5 && true} index="5" level="Floor Details" verificationStatus={formIndex >= 6 && true} last={true} />
                        </div>}
                        <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-8  p-4 -mt-10  '>
                            <div className='col-span-8 '>
                                <LoaderComponent show={show} />
                                {formIndex < 7 && <>
                                    <div className={`${animateform1} transition-all relative`}><CitizenPropBasicDetail preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
                                    <div className={`${animateform2} transition-all relative`}><CitizenPropPropertyAddressDetails preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
                                    <div className={`${animateform3} transition-all relative`}><CitizenPropElectricityWaterDetails preFormData={preFormData} collectFormDataFun={collectAllFormData} backFun={backFun} nextFun={nextFun} /></div>
                                    <div className={`${animateform4} transition-all relative`}><CitizenPropOwnerDetails preFormData={preFormData} assType={assTypeText} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
                                    <div className={`${animateform5} transition-all relative`}><CitizenPropFloorDetails preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>
                                    {formIndex == 6 && <div className={`${animateform6} transition-all relative`}><SafFormReview formReviewData={allFormData} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>}
                                </>}
                                {/*//> after successfully form submit show safformdemand page */}
                                {/* {formIndex == 7 && <div className={`${animateform7} transition-all relative`}><SafFormDemand toastFun={notify} backFun={backFun} nextFun={nextFun} safSubmitResponse={safSubmitResponse} showLoader={showLoader} /></div>} */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FeedBack Screen*/}
                {formIndex != 6 && <div className='col-span-3 bg-white w-full h-screen  rounded-lg p-2 overflow-auto'>
                    <PropFeedbackScreen allFormData={allFormData} assTypeText={assTypeText} />
                </div>}
                {formIndex == 6 && <div className='col-span-3 bg-white w-full h-screen  rounded-lg p-2 overflow-auto'>
                    <div className='mt-4'>
                        <h1 className='font-mono h-10 border-sky-500 border-2 rounded-lg text-sky-500 hover:bg-sky-50 py-1 px-4  m-2 text-xs'>FEEDBACK For <strong className='text-slate-500 text-xs capitalize'> {assTypeText} ! </strong></h1>
                    </div>
                    <img src='https://img.freepik.com/free-vector/customer-survey-concept-illustration_114360-2594.jpg?w=740&t=st=1668512900~exp=1668513500~hmac=b3ae0ac3b6592284527249c349f899bf6ed80bbc5c2581aeb2af0d557f5406bc' className='opacity-80' />
                </div>}

            </div>
        </>
    )
}

export default CitizenPropSafUpdateFormIndex