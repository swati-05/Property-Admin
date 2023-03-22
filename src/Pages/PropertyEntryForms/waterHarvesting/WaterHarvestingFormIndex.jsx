//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// > Api Integreted and some functionality : R U Bharti
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect, useContext } from "react";
import { TbWebhook } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import WaterHarvestingScreen from "./WaterHarvestingScreen";
// import { contextVar } from '../../../Components/ContextVar';
// import SafFormDemand from '../WaterHarvesting/SafFormReview/SafFormDemand';
// import SafFormPayment from '../WaterHarvesting/SafFormReview/SafFormPayment';
// import SafFormReview from '../WaterHarvesting/SafFormReview/SafFormReview';
import safFormDemand from "../../../Pages/PropertyEntryForms/waterHarvesting/SafFormReview/SafFormDemand";
import SafFormPayment from "../../../Pages/PropertyEntryForms/waterHarvesting/SafFormReview/SafFormPayment";
import SafFormReview from "../../../Pages/PropertyEntryForms/waterHarvesting/SafFormReview/SafFormReview";

import axios from "axios";
import PropwaterHavestingFeedbackScreen from "./PropwaterHavestingFeedbackScreen";
import { contextVar } from "@/Components/Context/Context";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import SafFormDemand from "../../../Pages/PropertyEntryForms/waterHarvesting/SafFormReview/SafFormDemand";
import { ColorRing } from "react-loader-spinner";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function WaterHarvestingFormIndex() {
  const { api_getMasterDataWaterHarvesting, api_postWaterHarvestingData, api_getHoldingDetails } = ProjectApiList();

  const navigate = useNavigate()

  const { id } = useParams();

  const [rwhUpload, setrwhUpload] = useState()
  const [rwhFormUpload, setrwhFormUpload] = useState()
  const [harvestingDetails, setharvestingDetails] = useState()

  /////////{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///////
  const [formIndex, setFormIndex] = useState(1)

  ////////////{***slide animation control state for BasicDetails form***}/////////////
  const [animateform1, setAnimateform1] = useState('translate-x-0 mb-40')

  /////////{***slide animation control state for PropertyAddressDetails form***}//////////
  const [animateform2, setAnimateform2] = useState('pl-20 translate-x-full')

  ///////////{***slide animation control state for ElectricityWaterDetails form***}///////
  const [animateform3, setAnimateform3] = useState('pl-20 translate-x-full')
  ////////////{*** slide animation control state for OwnerDetails form***}////////
  const [animateform4, setAnimateform4] = useState('pl-20 translate-x-full')
  ////////////{*** slide animation control state for FloorDetails form***}//////////

  const [allFormData, setAllFormData] = useState({})
  const [responseScreenStatus, setResponseScreenStatus] = useState('')

  ///////////{***state variable to hold all form required data***}///////////
  const [preFormData, setPreFormData] = useState()

  ///////////{***state variable to hold response data after submitting the saf form***}/////////
  const [safSubmitResponse, setsafSubmitResponse] = useState()

  ///////////{***slide animation control state for BasicDetails form***}//////////
  const [loader, setloader] = useState(false)

  //////global toast function/////
  const { notify } = useContext(contextVar)

  let assTypeText = "WATER HARVESTING"

  console.log('ass type . from main ', assTypeText)


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
          // setAnimateform5('pl-20 translate-x-full mb-0')
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
      // if (tempFormIndex == 4) {
      //     setFormIndex(5)
      //     setAnimateform4('-translate-x-full right-80 mb-0')
      //     // setAnimateform5('pl-0 translate-x-0 mb-40')
      // }
  }


  ///////////{*** COLLECTING ALL FORM DATA***}/////////
  const collectAllFormData = (key, formData) => {
      console.log('prev of all Data', allFormData)
      setAllFormData({ ...allFormData, [key]: formData })
  }


  /////////{*** GETTING MASTER DATA***}/////////
  useEffect(() => {

      let token = window.localStorage.getItem('token')
      console.log('token at basic details is  get method...', token)
      const header = {
          headers:
          {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
          }
      }

      axios.get(`${api_getMasterDataWaterHarvesting}`, ApiHeader())
          .then(function (response) {
              console.log('water harvesting master data ....', response.data.data)
              setPreFormData(response.data.data)
          })
          .catch(function (error) {
              console.log('errorrr.... ', error);
          })
  }, [])

  useEffect(() => {

    let token = window.localStorage.getItem('token')
    console.log('token at basic details is  get method...', token)
    const header = {
        headers:
        {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        }
    }

    axios.post(api_getHoldingDetails, {"propertyId" : id}, header)
    .then((res) => {
        console.log("getting harvesting details => ", res)
        setharvestingDetails(res?.data?.data)
    })
    .catch((err) => {
        console.log("getting harvesting details error => ", err)
    })
},[])


  ///// SUBMIT FORM /////
  const submitButtonToggle = () => {
      // alert("submitted")
      console.log('final form ready to submit...', allFormData)
      submitSafForm()


  }
  ///////////{***WATER HARVESTING  SUBMIT FUNCTION***}/////////
  const submitSafForm = () => {
      // alert('alert')
      //// activating loader///
      setloader(true)

      const header = ApiHeader()

      ///////////{*** WATER HARVESTING***}/////////
      // const requestBody = {
      //     isWaterHarvestingBefore: allFormData.waterHarvesting.isWaterHarvestingBefore,
      //     wardNo: allFormData.waterHarvesting.wardNo,
      //     mobileNo: allFormData.waterHarvesting.mobileNo,
      //     holdingNo: allFormData.waterHarvesting.holdingNo,
      //     dateOfCompletion: allFormData.waterHarvesting.dateOfCompletion,
      //     name: allFormData.waterHarvesting.name,
      //     guardianName: allFormData.waterHarvesting.guardianName,
      //     buildingAddress: allFormData.waterHarvesting.buildingAddress

      // }

      // console.log('form request body....', requestBody)

          console.log("submittin values in index => ", allFormData?.waterHarvesting ,"and image is =>" ,rwhUpload, "and file is => ", rwhFormUpload)
      
          let fd = new FormData()
  
          fd.append("isWaterHarvestingBefore", allFormData?.waterHarvesting?.isWaterHarvestingBefore)
        //   fd.append("name", allFormData?.waterHarvesting?.name)
        //   fd.append("guardianName", allFormData?.waterHarvesting?.guardianName)
        //   fd.append("wardNo", allFormData?.waterHarvesting?.wardNo)
        //   fd.append("mobileNo", allFormData?.waterHarvesting?.mobileNo)
        //   fd.append("holdingNo", allFormData?.waterHarvesting?.holdingNo)
        //   fd.append("buildingAddress", allFormData?.waterHarvesting?.buildingAddress)
          fd.append("dateOfCompletion", allFormData?.waterHarvesting?.dateOfCompletion)
          fd.append("rwhImage", rwhUpload)
          fd.append("rwhForm", rwhFormUpload)
          fd.append('propertyId', id)


      // return
      axios.post(`${api_postWaterHarvestingData}`, fd, ApiHeader())
          .then(function (response) {
              setloader(false)
              console.log('response after submitting water harvesting data', response)
              setsafSubmitResponse(response.data)
              toast.success("Submitted Successfully !!")
              nextFun(2)
              setloader(false)

          })
          .catch(function (error) {
              console.log('errorrr.... ', error);
              setloader(false)
              toast.error("Something went wrong !!")
          })
  }

  const imageFun = (url) => {
      setrwhUpload(url)
      console.log("incoming image => ", url)
  }

  const imageFun2 = (url) => {
    setrwhFormUpload(url)
    console.log("incoming form => ", url)
}


  console.log("form index", formIndex)
  return (

      <>

<ToastContainer position="top-right" autoClose={2000} />

{loader && (
<div className="inline">
  <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
  />
</div>
)}

          {/* take a parent div ...style it as displayed below    ,....make it a grid with col-12 */}
          <div className='w-full  mt-4 grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 p-2'>

              {/* FeedBack Screen*/}
              {formIndex != 2 && <div className='col-span-3 bg-white w-full h-screen  rounded-lg p-2 overflow-auto'>
                  <PropwaterHavestingFeedbackScreen allFormData={allFormData} assTypeText={assTypeText} />
              </div>}
              {formIndex == 2 && <div className='col-span-3 bg-white w-full h-screen  rounded-lg p-2 overflow-auto'>

                  <div className='mt-4'>
                      <h1 className='font-mono h-10 border-sky-500 border-2 rounded-lg text-sky-500 hover:bg-sky-50 py-1 px-4  m-2'>FEEDBACK For <strong className='text-slate-500 text-xs capitalize'> {assTypeText} ! </strong></h1>
                  </div>
                  <img src='https://img.freepik.com/free-vector/customer-survey-concept-illustration_114360-2594.jpg?w=740&t=st=1668512900~exp=1668513500~hmac=b3ae0ac3b6592284527249c349f899bf6ed80bbc5c2581aeb2af0d557f5406bc' className='opacity-80' />
              </div>}


              {/* Rest of the component will go here ....it has a col-span of 10*/}
              <div className='col-span-9 w-full h-screen overflow-x-hidden'>

                  {/* your custom content */}
                  <div className='w-full bg-white py-4 rounded-lg'>
                      <h1 className='font-mono h-10 border-sky-500 border-2 rounded-lg text-sky-500 hover:bg-sky-50 py-1 px-4 m-2'>WELCOME TO PROPERTY. YOU ARE APPLYING FOR A <strong className='text-slate-500 text-sm capitalize'>{assTypeText} ! </strong></h1>


                      <div>
                          <div className='text-right relative top-0 animate__animated animate__fadeInDown'>
                              <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-md shadow-sky-400 font-semibold pr-4 p-2'><TbWebhook className='inline' />{assTypeText}</span>
                          </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-8  p-4 -mt-14  '>
                          <div className='col-span-8 '>


                              {/* {loader && <RoundLoader />} */}
                              <ToastContainer position="top-right"
                                  autoClose={2000} />
                              {formIndex == 1 &&
                                  <div className={`${animateform1} transition-all relative`}><WaterHarvestingScreen preFormData={preFormData} collectFormDataFun={collectAllFormData} toastFun={notify} backFun={backFun} nextFun={nextFun} rwhFile={imageFun} rwhFormFile={imageFun2} harvesting={harvestingDetails}/></div>}

                              {/* {formIndex == 6 && <div className={`${animateform2} transition-all relative`}><SafFormReview formReviewData={allFormData} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} /></div>} */}
                              {formIndex == 2 && <div className={`${animateform2} transition-all relative`}><SafFormReview formReviewData={allFormData} collectFormDataFun={collectAllFormData} submitFun={submitButtonToggle} toastFun={notify} backFun={backFun} nextFun={nextFun} rwhImGet={rwhUpload} rwhFormGet={rwhFormUpload} /></div>}


                              {/*//> after successfully form submit show safformdemand page */}
                              {formIndex == 3 && <div className={`${animateform3} transition-all relative`}><SafFormDemand toastFun={notify} backFun={backFun} nextFun={nextFun} safSubmitResponse={safSubmitResponse} /></div>}


                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </>
  )
}export default WaterHarvestingFormIndex;
