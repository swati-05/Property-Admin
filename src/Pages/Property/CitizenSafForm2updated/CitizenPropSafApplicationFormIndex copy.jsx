//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - CitizenPropSafApplicationFormIndex
// DESCRIPTION - #CASES HANDLED IN THIS FORM
//               1. NEW ASSESSMENT
//               2. RE ASSESSMENT
//               3. MUTATION
//               4. AMALGAMTION
//               5. BIFURCATION
//               6. CITIZEN EDIT
//
//               # SPECIAL CASES
//               1. EDIT CASE DATA FEED
//               2. PREVIEW DATA FOR SELECT CASE
//               3. DEPENDENT INPUT FIELD DATA FETCH AND AUTO SELECT IN EDIT CASE
//
//               #. NEW ASSESSMENT CASE DATA SENDING
//                  1 - ulbId
//                  1 - assessmentType
//                  1 - ward
//                  1 - newWard
//                  1 - propertyType
//                  1 - dateOfPurchase
//                  1 - ownershipType
//                  1 - landOccupationDate
//                  1 - landOccupationDate
//                  1 - apartmentDetail
//                  1 - appartmentName
//                  1 - buildingName
//                  1 - streetName
//                  1 - location
//                  1 - landmark
//                  1 - zone
//                  1 - isMobileTower
//                  1 - mobileTower
//                  1 - isHoardingBoard
//                  1 - hoardingBoard
//                  1 - isPetrolPump
//                  1 - electricityCustNo
//                  1 - electricityKNo
//                  1 - electricityAccNo
//                  1 - electricityBindBookNo
//                  1 - electricityConsCategory
//                  1 - buildingPlanApprovalNo
//                  1 - buildingPlanApprovalDate
//                  1 - bpApprovalDate
//                  1 - waterConnNo
//                  1 - waterConnDate
//                  1 - khataNo
//                  1 - plotNo
//                  1 - villageMaujaName
//                  1 - roadType
//                  1 - areaOfPlot
//                  1 - propCity
//                  1 - propDist
//                  1 - propPinCode
//                  1 - propState
//                  1 - propAddress
//                  1 - corrCity
//                  1 - corrDist
//                  1 - corrPinCode
//                  1 - corrState
//                  1 - propAddress
//                  1 - owner : []
//                  1 - floor : []

//////////////////{*****}//////////////////////////////////////////


import { useState, useEffect, useContext, useRef } from 'react'
import CitizenPropElectricityWaterDetails from './CitizenPropElectricityWaterDetails'
import CitizenPropPropertyAddressDetails from './CitizenPropPropertyAddressDetails'
import CitizenPropOwnerDetails from './CitizenPropOwnerDetails'
import CitizenPropFloorDetails from './CitizenPropFloorDetails'
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitResponse from '@/Components/Common/ResponseScreen/FormSubmitResponse'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import PropFeedbackScreen from './PropFeedbackScreen'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import BarLoader from '@/Components/Common/BarLoader'
import { toast, ToastContainer } from 'react-toastify'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import CitizenPropBasicDetail3 from './CitizenPropBasicDetail3'
import CitizenPropAdditionalDetails from './CitizenPropAdditionalDetails'
import { Tooltip } from 'react-tooltip'
import { BiRupee } from 'react-icons/bi'
import 'animate.css';
import { contextVar } from '@/Components/Context/Context'
import HoldingNoCard from '@/Pages/Workflow/Property/CitizenAuth/HoldingNoCard'
import SafFormReview from './SafFormReview/SafFormReview'
import SafFormDemand from './SafFormReview/SafFormDemand'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BottomErrorCard from '@/Components/Common/BottomErrorCard'
import CitizenPropBasicDetail4 from './CitizenPropBasicDetail4'

function CitizenPropSafApplicationFormIndex() {

    const { api_getMasterData, api_postNewAssessment, api_getAllUlb, api_getHoldingDetails, api_getLocationByUlbAdmin, api_reviewCalculation, api_getStaticSafDetails, api_boEdit, api_newWardByOldWard, api_zoneByUlb, api_getApartmentListByWard, api_wardByUlb } = CitizenApplyApiList()

    const { notify } = useContext(contextVar)     //////global toast function/////
    const navigate = useNavigate()
    const [formIndex, setFormIndex] = useState(1) ///{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///
    const [preFormData, setPreFormData] = useState()///{***state variable to hold all form required data***}///
    const [safSubmitResponse, setsafSubmitResponse] = useState()////{***state variable to hold response data after submitting the saf form***}//
    const [show, setshow] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [ulbList, setulbList] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [allFormData, setAllFormData] = useState({}) //* State variable to store form data from all forms at one variable
    const [allFormPreviewData, setAllFormPreviewData] = useState({}) //* State variable to store form data from all forms at one variable
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [formHeadStatus, setformHeadStatus] = useState(true)
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [existingPropertyDetails, setexistingPropertyDetails] = useState()
    const [safTypeCame, setsafTypeCame] = useState()
    const [ulbLocation, setulbLocation] = useState()
    const { calculatePropertyTax } = PropertyApiList();
    const [rulesetData, setrulesetData] = useState();
    const [viewLevel, setviewLevel] = useState(1);
    const [zoneList, setzoneList] = useState();
    const [zoneValue, setzoneValue] = useState(false)
    const [previewCloseStatus, setpreviewCloseStatus] = useState(false)
    const [totalAmountData, settotalAmountData] = useState(null)
    const [holdingNoList, setholdingNoList] = useState([])
    const [holdingCardStatus, setholdingCardStatus] = useState(false)
    const [taxSumFullDetailsStatus, settaxSumFullDetailsStatus] = useState(false)
    const [mutionHoldingId, setmutionHoldingId] = useState(null)
    // PROPERTY TYPES STATE TO SKIP FLOOR DETAILS IF VACCANT LAND HAVING ID 4
    const [propertyTypeState, setpropertyTypeState] = useState('')
    const [apartmentStatus, setapartmentStatus] = useState(false)
    const [choosedUlbId, setchoosedUlbId] = useState(null)
    const [wardByUlb, setwardByUlb] = useState()
    const [newWardList, setnewWardList] = useState()
    const [selectedUlbId, setselectedUlbId] = useState()
    const [apartmentList, setapartmentList] = useState([])
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [wardList, setwardList] = useState(null);
    const [devData, setdevData] = useState(false);
    const [devMode, setdevMode] = useState(false);
    const [devModeVisibility, setdevModeVisibility] = useState(false);







    // STATES TO HOLD ALL PAGE DATA OPEN
    const [basicDetails, setbasicDetails] = useState(
        {
            ulbId: '',
            wardNo: '',
            newWardNo: '',
            ownerShiptype: '',
            propertyType: '',
            landOccupationDate: '',
            apartment: '',
        }
    )
    const [propAddressDetails, setpropAddressDetails] = useState({
        khataNo: '',
        plotNo: '',
        village_mauja: '',
        plotArea: '',
        roadWidth: '',
        city: '',
        district: '',
        state: '',
        pin: '',
        locality: '',
        c_city: '',
        c_district: '',
        c_state: '',
        c_pin: '',
        c_locality: '',
        buildingName: '',
        streetName: '',
        location2: '',
        landmark: '',
    })
    const [elecWaterDetails, setelecWaterDetails] = useState(null)
    const [ownerDetails, setownerDetails] = useState([])
    // OLD OWNER IN CASE OF MUTATION
    const [oldOwnerDetails, setoldOwnerDetails] = useState([])
    const [floorDetails, setfloorDetails] = useState([])
    const [additionalDetails, setadditionalDetails] = useState({
        zone: '',
        mobileTowerStatus: 0,
        hoardingStatus: 0,
        petrolPumpStatus: 0,
        waterHarvestingStatus: 0,
        mobileTowerArea: '',
        mobileTowerDate: '',
        hoardingArea: '',
        hoardingDate: '',
        petrolPumpArea: '',
        petrolPumpDate: '',
    })

    const [basicDetailsPreview, setbasicDetailsPreview] = useState(null)
    const [ownerDetailsPreview, setownerDetailsPreview] = useState([])
    // OLD OWNER PREVIEW IN CASE OF MUTATION
    const [oldownerDetailsPreview, setoldownerDetailsPreview] = useState([])
    const [floorDetailsPreview, setfloorDetailsPreview] = useState([])
    const [additionalDetailsPreview, setadditionalDetailsPreview] = useState(null)
    // STATES TO HOLD FLOOR COUNT TO IMPLEMENT REMOVE AND UPDATE FOR RE-ASSESSMENT
    const [oldFloorDetailsCount, setoldFloorDetailsCount] = useState(0)


    const viewRef = useRef(null)

    // const moveToTop = () => {
    //     viewRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // };

    useEffect(() => {
        setdevData({ ...devData, basicDetails, propAddressDetails, elecWaterDetails, ownerDetails, floorDetails, additionalDetails })
    }, [basicDetails, propAddressDetails, elecWaterDetails, ownerDetails, floorDetails, additionalDetails]);

    useEffect(() => {
        // if (formIndex < 7) {
        //     moveToTop()
        // }

        if (formIndex == 7) {
            submitRuelsetData()
        }
    }, [formIndex])


    const fetchZoneByUlb = (ulbId) => {
        console.log('before fetch zone by ulb...')
        setselectedUlbId(ulbId)
        axios.post(api_zoneByUlb, { ulbId: ulbId }, ApiHeader())
            .then(function (response) {
                console.log('zone list by ulb ....', response.data.data)
                setzoneList(response.data.data)
            })
            .catch(function (error) {
                console.log('zone list error errorrr.... ', error);
            })
    }
    const fetchNewWardByOldWard = (oldWardId) => {
        let requestBody = {
            oldWardMstrId: oldWardId,
        }
        console.log('before fetch wardby old ward...', requestBody)

        axios.post(api_newWardByOldWard, requestBody, ApiHeader())
            .then(function (response) {
                console.log('wardlist by oldward list ....', response.data.data)
                setnewWardList(response.data.data)

            })
            .catch(function (error) {
                console.log('errorrr.... ', error);
            })
    }

    // APT-4 FETCHING APARTMENTLIST IN CASE OF FLATS BY WARD NO
    const fetchApartmentByOldWard = (oldWardId) => {
        let requestBody = {
            wardMstrId: oldWardId,
        }
        console.log('before fetch apartment by old ward...', requestBody)

        axios.post(api_getApartmentListByWard, requestBody, ApiHeader())
            .then(function (response) {
                console.log('apartment list .... after fetch', response)
                console.log('apartment list .... after fetch', response?.data?.data)
                setapartmentList(response?.data?.data)
                // setapartmentStatus(true)

            })
            .catch(function (error) {
                console.log('apartment error.... ', error);
            })
    }


    let assTypeText = "NEW ASSESSMENT"

    //*receiving saf type 
    const { safType, safId } = useParams()
    let title
    if (safType == 'new') { title = 'New-Assessment' }
    if (safType == 're') { title = 'Re-Assessment' }
    if (safType == 'mu') { title = 'Mutation' }
    if (safType == 'bi') { title = 'Bifurcation' }
    if (safType == 'am') { title = 'Amalgamation' }
    useSetTitle(title)


    const backFun = (formIndex) => {
        let tempFormIndex = formIndex
        // if backward by current form index 2
        if (tempFormIndex == 2) {
            setFormIndex(1)
        }
        if (tempFormIndex == 3) {
            setFormIndex(2)
        }
        if (tempFormIndex == 4) {
            setFormIndex(3)
        }
        if (tempFormIndex == 5) {
            setFormIndex(4)
        }
        if (tempFormIndex == 6) {
            // IF PROPERTY TYPE ID IS 4 FOR VACCANT LAND THEN SKIP FLOOR FORM
            if (propertyTypeState == 4) {
                setFormIndex(4)
                return
            }
            setFormIndex(5)
        }
        if (tempFormIndex == 7) {
            settotalAmountData(null)
            console.log('calling from 7')
            setFormIndex(6)
        }
        if (tempFormIndex == 8) {
            setformHeadStatus(true)
            setFormIndex(7)
        }
        if (tempFormIndex == 9) {
            setFormIndex(8)
        }
    }

    ///// NEXT FUN /////
    const nextFun = (formIndex) => {
        let tempFormIndex = formIndex
        if (tempFormIndex == 1) {
            setFormIndex(2)
        }
        if (tempFormIndex == 2) {
            setFormIndex(3)
        }
        if (tempFormIndex == 3) {
            setFormIndex(4)
        }
        if (tempFormIndex == 4) {
            // IF PROPERTY TYPE ID IS 4 FOR VACCANT LAND THEN SKIP FLOOR FORM
            if (propertyTypeState == 4) {
                setFormIndex(6)
                return
            }
            setFormIndex(5)
        }
        if (tempFormIndex == 5) {
            setFormIndex(6)
        }
        if (tempFormIndex == 6) {
            // submitRuelsetData()
            setformHeadStatus(false)

            setFormIndex(7)
        }
        if (tempFormIndex == 7) {
            settotalAmountData(null)
            setFormIndex(8)
        }
    }

    ///// SUBMIT FORM /////
    const submitButtonToggle = () => {
        // alert("submitted")
        console.log('final form ready to submit...', allFormData)
        submitSafForm()
    }

    const payloadDataMake = () => {
        let requestBody = {
            ulbId: basicDetails?.ulbId,
            assessmentType: "1",
            landOccupationDate: basicDetails?.landOccupationDate,
            ward: basicDetails?.wardNo,
            newWard: basicDetails?.newWardNo,
            ownershipType: basicDetails?.ownerShiptype,
            propertyType: basicDetails?.propertyType,
            zone: additionalDetails.zone,
            trustType: additionalDetails.trustType,
            isMobileTower: additionalDetails.mobileTowerStatus,
            mobileTower: {
                area: additionalDetails.mobileTowerArea,
                dateFrom: additionalDetails.mobileTowerDate
            },
            isHoardingBoard: additionalDetails.hoardingStatus,
            hoardingBoard: {
                area: additionalDetails.hoardingArea,
                dateFrom: additionalDetails.hoardingDate,
            },
            isPetrolPump: additionalDetails.petrolPumpStatus,
            petrolPump: {
                area: additionalDetails.petrolPumpArea,
                dateFrom: additionalDetails.petrolPumpDate
            },
            isWaterHarvesting: additionalDetails.waterHarvestingStatus,
            roadType: propAddressDetails.roadWidth,
            areaOfPlot: propAddressDetails.plotArea,
            owner: ownerDetails,
            floor: floorDetails,
        }
        return requestBody
    }

    ///////////{*** NEW ASSESSMENT TYPE SUBMIT FUNCTION***}/////////
    const submitSafForm = () => {
        setLoaderStatus(true)
        let token = window.localStorage.getItem('token')
        console.log('token at basic details is post method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }

        let url
        let requestBody
        let payloadData = payloadDataMake()

        requestBody = {
            // FIRST SOURCE IS PAYLOAD DATA
            ulbId: payloadData.ulbId,
            assessmentType: payloadData.assessmentType,
            landOccupationDate: payloadData.landOccupationDate,
            ward: payloadData.ward,
            newWard: payloadData.newWard,
            ownershipType: payloadData.ownershipType,
            propertyType: payloadData.propertyType,
            trustType: payloadData.trustType,
            zone: payloadData.zone,
            isMobileTower: payloadData.isMobileTower,
            mobileTower: {
                area: payloadData.isMobileTower == 1 ? payloadData?.mobileTower.area : '',
                dateFrom: payloadData.isMobileTower == 1 ? payloadData?.mobileTower?.dateFrom : ''
            },
            isHoardingBoard: payloadData.isHoardingBoard,
            hoardingBoard: {
                area: payloadData.isHoardingBoard == 1 ? payloadData?.hoardingBoard.area : '',
                dateFrom: payloadData.isHoardingBoard == 1 ? payloadData?.hoardingBoard.dateFrom : '',
            },
            isPetrolPump: payloadData.isPetrolPump,
            petrolPump: {
                area: payloadData.isPetrolPump == 1 ? payloadData?.petrolPump.area : '',
                dateFrom: payloadData.isPetrolPump == 1 ? payloadData?.petrolPump.dateFrom : ''
            },
            isWaterHarvesting: payloadData.isWaterHarvesting,
            roadType: payloadData.roadType,
            areaOfPlot: payloadData.areaOfPlot,
            owner: payloadData?.owner,
            floor: payloadData.floor,
            // PAYLOAD DATA SOURCE END


            dateOfPurchase: '',
            apartmentDetail: basicDetails.apartment,
            appartmentName: basicDetails.appartmentName,
            buildingName: propAddressDetails.buildingName,
            streetName: propAddressDetails.streetName,
            location: propAddressDetails.location2,
            landmark: propAddressDetails.landmark,



            //** ELECTRICITY & WATER DETAILS
            // electricityConnection: true,
            electricityCustNo: elecWaterDetails.electricityKNo,
            electricityAccNo: elecWaterDetails.electricityAccNo,
            electricityBindBookNo: elecWaterDetails.bindBookNo,
            electricityConsCategory: elecWaterDetails.electrictyConsumerNo,
            buildingPlanApprovalNo: elecWaterDetails.bpApprovalNo,
            buildingPlanApprovalDate: elecWaterDetails.bpApprovalDate,
            waterConnNo: elecWaterDetails.waterConsumerNo,
            waterConnDate: elecWaterDetails.waterConnectionDate,

            //** PROPERTY ADDRESS EXTRA
            khataNo: propAddressDetails.khataNo,
            plotNo: propAddressDetails.plotNo,
            villageMaujaName: propAddressDetails.village_mauja,


            //* PROPERTY ADDRESS MAIN
            propCity: propAddressDetails?.city,
            propDist: propAddressDetails?.district,
            propPinCode: propAddressDetails?.pin,
            propState: propAddressDetails?.state,
            propAddress: propAddressDetails?.locality,

            //* CORRESPONDING ADDRESS
            corrCity: propAddressDetails.c_city,
            corrDist: propAddressDetails.c_district,
            corrPinCode: propAddressDetails.c_pin,
            corrState: propAddressDetails.c_state,
            propAddress: propAddressDetails.c_locality,


        }

        // //* REQUESTBODY FOR NEW ASSESSMENT
        // if (safType == 'new') {
        //     requestBody = requestBody
        // }

        //* REQUESTBODY FOR RE-ASSESSMENT
        if (safType == 're') {
            requestBody.previousHoldingId = safId
            requestBody.assessmentType = 2
            requestBody.holdingNo = existingPropertyDetails?.data?.data?.holding_no
        }


        //* REQUESTBODY FOR MUTATION
        if (safType == 'mu') {
            requestBody.dateOfPurchase = basicDetails.dateOfPurchase
            requestBody.previousHoldingId = safId
            requestBody.transferModeId = basicDetails.transferMode
            requestBody.landOccupationDate = basicDetails.landOccupationDate
            requestBody.assessmentType = 3
            requestBody.holdingNo = existingPropertyDetails?.data?.data?.holding_no
            requestBody.isOwnerChanged = 1
        }

        //BIFURCATION CASE
        if (safType == 'bi') {
            requestBody.dateOfPurchase = basicDetails.dateOfPurchase
            requestBody.previousHoldingId = safId
            requestBody.transferModeId = basicDetails.transferMode
            requestBody.landOccupationDate = basicDetails.landOccupationDate
            requestBody.assessmentType = 4
            requestBody.holdingNo = holdingNoList[0]
            requestBody.isOwnerChanged = 1
        }
        //AMALGAMATION CASE
        if (safType == 'am') {
            requestBody.dateOfPurchase = basicDetails.dateOfPurchase
            requestBody.previousHoldingId = safId
            requestBody.transferModeId = basicDetails.transferMode
            requestBody.landOccupationDate = basicDetails.landOccupationDate
            requestBody.assessmentType = 5
            requestBody.holdingNoLists = holdingNoList
            requestBody.isOwnerChanged = 1
        }


        //* REQUESTBODY FOR CITIZEN EDIT
        if (safType == 'bo-edit') {
            requestBody.id = existingPropertyDetails?.data?.data?.id
        }


        if (safType == 'bo-edit') {
            url = api_boEdit
        } else {
            url = api_postNewAssessment
        }

        setdevData(requestBody)
        // CONVERTING HERE FROM EMPTY TO NA FOR OWNERS
        // requestBody.owner = requestBody?.owner?.map((data)=>{
        //     if(data?.dob==""){
        //         return (dob:'Na')
        //     }
        // })

        console.log('before saf form submit at updated....', requestBody)

        // return
        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                // setloader(false)
                console.log('response after pushing saf data', response)
                if (response?.data?.status) {

                    // IN CASE OF CITIZEN EDIT DON'T SEND TO NEXT PAGE
                    if (safType == 'bo-edit') {
                        toast.success("Application has been updated successfully !!")
                        setFormIndex(9)
                    } else {
                        toast.success("SAF Successfully Submitted !!")
                        setsafSubmitResponse(response.data)
                        nextFun(7)
                    }
                    setLoaderStatus(false)

                } else {
                    setLoaderStatus(false)
                    activateBottomErrorCard(true, 'Error occured in submitting form. Please try again later.')
                }


            })
            .catch(function (error) {
                console.log('error in submitting saf form ', 'error');
                activateBottomErrorCard(true, 'Error occured in submitting form. Please try again later.')
                setLoaderStatus(false)
            })
    }

    ///////////{*** GETTING MASTER DATA***}/////////
    useEffect(() => {

        getLocationByUlb()
        if (safType == 'bi' || safType == 'am') {
            setholdingCardStatus(true)
        }
        setsafTypeCame(safType)
        fetchMasterData()
        fetchULBList()
        fetchWardList()
        if (safType == 're' || 'bo-edit') {
            fetchPropertyDetails()
        }

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
    const fetchULBList = () => {
        // api/get-all-ulb
        axios.get(`${api_getAllUlb}`, ApiHeader())
            .then(function (response) {
                console.log('ulb list...', response)
                setulbList(response?.data)
            })
            .catch(function (error) {
                console.log('ulb list error.... ', error);
            })
    }
    const fetchWardList = () => {

        axios.post(api_wardByUlb, {}, ApiHeader())
            .then(function (response) {
                console.log('wardlist data re....', response)
                setwardList(response?.data?.data)
            })
            .catch(function (error) {
                console.log('wardlist error.. error.... ', error);
            })
    }


    const fetchPropertyDetails = () => {

        let pId = safId

        let requestBody = {
            propertyId: pId
            // propertyId: 54 //staic for checking
        }
        let url
        // CITIZEN EDIT CASE
        if (safType == 'bo-edit') {
            url = api_getStaticSafDetails
            requestBody = {
                applicationId: pId
            }
        } else {
            url = api_getHoldingDetails
            requestBody = {
                propertyId: pId
            }
        }

        setLoaderStatus(true)

        console.log('body before finding prop', requestBody)
        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('getting property detail for edit case......', response)
                setexistingPropertyDetails(response)
                // setdevData(response?.data)
                //set date in state to show
                feedExistingDetails(response)
                setLoaderStatus(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                setLoaderStatus(false)
            })
    }
    console.log('splitted holding no.', holdingNoList)
    const feedExistingDetails = (existingDetails) => {
        console.log('setting existing details with id')
        // SPLITTING HOLDING NO LIST FROM STRING HOLDING FOR AMALGAMATION CASE AND BIFURCATION CASE
        setholdingNoList(existingDetails?.data?.data?.holding_no.split(','))

        // 1 BASIC DETAILS
        setbasicDetails(
            {
                // transferMode: existingDetails?.data?.data?.ulb_id,
                // dateOfPurchase: existingDetails?.data?.data?.ulb_id,
                ulbId: existingDetails?.data?.data?.ulb_id,
                wardNo: existingDetails?.data?.data?.ward_mstr_id,
                newWardNo: existingDetails?.data?.data?.new_ward_mstr_id,
                ownerShiptype: existingDetails?.data?.data?.ownership_type_mstr_id,
                propertyType: existingDetails?.data?.data?.prop_type_mstr_id,
                landOccupationDate: existingDetails?.data?.data?.landOccupationDate,
                apartment: existingDetails?.data?.data?.apartment,
            }
        )
        setbasicDetailsPreview(
            {
                // transferMode: existingDetails?.data?.data?.ulb_id,
                // dateOfPurchase: existingDetails?.data?.data?.ulb_id,
                ulbId: existingDetails?.data?.data?.ulb_id,
                wardNo: existingDetails?.data?.data?.ward_mstr_id,
                newWardNo: existingDetails?.data?.data?.new_ward_mstr_id,
                ownerShiptype: existingDetails?.data?.data?.ownership_type,
                propertyType: existingDetails?.data?.data?.property_type,
                landOccupationDate: existingDetails?.data?.data?.landOccupationDate,
                apartment: existingDetails?.data?.data?.apartment,
            }
        )

        // 2 PROPERTY ADDRESS DETAILS
        setpropAddressDetails(
            {
                khataNo: existingDetails?.data?.data?.khata_no,
                plotNo: existingDetails?.data?.data?.plot_no,
                village_mauja: existingDetails?.data?.data?.village_mauja_name,
                plotArea: existingDetails?.data?.data?.area_of_plot,
                roadWidth: existingDetails?.data?.data?.road_width,
                city: existingDetails?.data?.data?.prop_city,
                district: existingDetails?.data?.data?.prop_dist,
                state: existingDetails?.data?.data?.prop_state,
                pin: existingDetails?.data?.data?.prop_pin_code,
                locality: existingDetails?.data?.data?.prop_address,
                c_city: existingDetails?.data?.data?.corr_city,
                c_district: existingDetails?.data?.data?.corr_dist,
                c_state: existingDetails?.data?.data?.corr_state,
                c_pin: existingDetails?.data?.data?.corr_pin_code,
                c_locality: existingDetails?.data?.data?.corr_address,
                buildingName: existingDetails?.data?.data?.building_name,
                streetName: existingDetails?.data?.data?.street_name,
                location2: existingDetails?.data?.data?.location,
                landmark: existingDetails?.data?.data?.landmark,
            }
        )

        // 3 ELECTRICITY DETAILS
        setelecWaterDetails(
            {
                electricityKNo: existingDetails?.data?.data?.elect_consumer_no,
                accNo: existingDetails?.data?.data?.elect_acc_no,
                bindBookNo: existingDetails?.data?.data?.elect_acc_no,
                electrictyConsumerNo: existingDetails?.data?.data?.data?.data?.elect_cons_categor,
                bpApprovalNo: existingDetails?.data?.data?.data?.building_plan_approval_no,
                bpApprovalDate: existingDetails?.data?.data?.data?.building_plan_approval_date,
                waterConsumerNo: existingDetails?.data?.data?.data?.water_conn_no,
                waterConnectionDate: existingDetails?.data?.data?.water_conn_date,
            }
        )

        // 4 OWNER DETAILS
        if (safType == 'mu') {
            if (existingDetails?.data?.data?.owners?.length != 0) {
                console.log('inside lenght >0..')

                let ownersMake = existingDetails?.data?.data?.owners.map((owner) => {
                    console.log('inside values of owner...', owner)
                    let rel
                    let arm
                    let spl

                    //checking armed force
                    if (owner?.is_armed_force) {
                        arm = "1"
                    }
                    if (owner?.is_armed_force == false) {
                        arm = "0"
                    }

                    //checking specially abeld
                    if (owner?.is_specially_abled) {
                        spl = "1"
                    }
                    if (owner?.is_specially_abled == false) {
                        spl = "0"
                    }
                    // IN CASE OF CITIZEN EDIT SEND ID ALSO

                    return {
                        id: owner?.id,
                        ownerName: owner?.owner_name,
                        gender: owner?.gender,
                        dob: owner?.dob,
                        guardianName: owner?.guardian_name,
                        relation: owner?.relation_type,
                        mobileNo: owner?.mobile_no,
                        aadhar: owner?.aadhar_no,
                        pan: owner?.pan_no,
                        email: owner?.email,
                        isArmedForce: arm,
                        isSpeciallyAbled: spl,
                    }


                })

                let previewOwnersMake = existingDetails?.data?.data?.owners.map((owner) => {
                    console.log('inside preview of owner...', owner)

                    let gen
                    if (owner?.gender == 'Male') {
                        gen = "Male"
                    }
                    if (owner?.gender == 'Female') {
                        gen = "Female"
                    }
                    if (owner?.gender == 'Transgender') {
                        gen = "Transgender"
                    }
                    return {
                        ownerName: owner?.owner_name,
                        gender: gen,
                        dob: owner?.dob,
                        guardianName: owner?.guardian_name,
                        relation: owner?.relation_type,
                        mobileNo: owner?.mobile_no,
                        aadhar: owner?.aadhar_no,
                        pan: owner?.pan_no,
                        email: owner?.email,
                        isArmedForce: owner?.is_armed_force,
                        isSpeciallyAbled: owner?.is_specially_abled,
                    }
                })

                setoldOwnerDetails(ownersMake)
                // setownerDetails(ownersMake)
                setoldownerDetailsPreview(previewOwnersMake)

            }
        } else {


            if (existingDetails?.data?.data?.owners?.length != 0) {
                // THIS IS TO IMPLEMENT RE-ASSESSMENT FLOOR REMOVE AND UPDATE RESTRICTION
                setoldFloorDetailsCount(existingDetails?.data?.data?.owners?.length)

                let ownersMake = existingDetails?.data?.data?.owners.map((owner) => {
                    console.log('inside values of owner...', owner)
                    let rel
                    let arm
                    let spl

                    //checking armed force
                    if (owner?.is_armed_force) {
                        arm = "1"
                    }
                    if (owner?.is_armed_force == false) {
                        arm = "0"
                    }

                    //checking specially abeld
                    if (owner?.is_specially_abled) {
                        spl = "1"
                    }
                    if (owner?.is_specially_abled == false) {
                        spl = "0"
                    }
                    // IN CASE OF CITIZEN EDIT SEND ID ALSO

                    return {
                        propOwnerDetailId: owner?.id,
                        ownerName: owner?.owner_name,
                        gender: owner?.gender,
                        dob: owner?.dob,
                        guardianName: owner?.guardian_name,
                        relation: owner?.relation_type,
                        mobileNo: owner?.mobile_no,
                        aadhar: owner?.aadhar_no,
                        pan: owner?.pan_no,
                        email: owner?.email,
                        isArmedForce: arm,
                        isSpeciallyAbled: spl,
                    }


                })

                let previewOwnersMake = existingDetails?.data?.data?.owners.map((owner) => {
                    console.log('inside preview of owner...', owner)

                    let gen
                    if (owner?.gender == 'Male') {
                        gen = "Male"
                    }
                    if (owner?.gender == 'Female') {
                        gen = "Female"
                    }
                    if (owner?.gender == 'Transgender') {
                        gen = "Transgender"
                    }
                    return {
                        ownerName: owner?.owner_name,
                        gender: gen,
                        dob: owner?.dob,
                        guardianName: owner?.guardian_name,
                        relation: owner?.relation_type,
                        mobileNo: owner?.mobile_no,
                        aadhar: owner?.aadhar_no,
                        pan: owner?.pan_no,
                        email: owner?.email,
                        isArmedForce: owner?.is_armed_force,
                        isSpeciallyAbled: owner?.is_specially_abled,
                    }
                })

                setownerDetails(ownersMake)
                setownerDetailsPreview(previewOwnersMake)

            }
        }

        // 5 FLOOR DETAILS
        if (existingDetails?.data?.data?.floors?.length != 0) {
            console.log('inside lenght >0..')

            let floorsMake = existingDetails?.data?.data?.floors.map((owner) => {

                return {
                    propFloorDetailId: owner?.id,
                    floorNo: owner?.floor_mstr_id,
                    useType: owner?.usage_type_mstr_id,
                    occupancyType: owner?.occupancy_type_mstr_id,
                    constructionType: owner?.const_type_mstr_id,
                    buildupArea: owner?.builtup_area,
                    dateFrom: owner?.date_from,
                    dateUpto: owner?.date_upto,

                }

            })

            let previewFloorsMake = existingDetails?.data?.data?.floors.map((owner) => {
                return {
                    floorNo: owner?.floor_name,
                    useType: owner?.usage_type,
                    occupancyType: owner?.occupancy_type,
                    constructionType: owner?.construction_type,
                    buildupArea: owner?.builtup_area,
                    dateFrom: owner?.date_from,
                    dateUpto: owner?.date_upto,

                }
            })

            setfloorDetails(floorsMake)
            setfloorDetailsPreview(previewFloorsMake)

        }

        // 6 ADDITIONAL DETAILS
        setadditionalDetails({
            zone: existingDetails?.data?.data?.zone_mstr_id,
            mobileTowerStatus: existingDetails?.data?.data?.is_mobile_tower == true ? 1 : 0,
            hoardingStatus: existingDetails?.data?.data?.is_hoarding_board == true ? 1 : 0,
            petrolPumpStatus: existingDetails?.data?.data?.is_petrol_pump == true ? 1 : 0,
            waterHarvestingStatus: existingDetails?.data?.data?.is_water_harvesting == true ? 1 : 0,
            mobileTowerArea: existingDetails?.data?.data?.tower_area,
            mobileTowerDate: existingDetails?.data?.data?.tower_installation_date,
            hoardingArea: existingDetails?.data?.data?.hoarding_area,
            hoardingDate: existingDetails?.data?.data?.hoarding_installation_date,
            petrolPumpArea: existingDetails?.data?.data?.under_ground_area,
            petrolPumpDate: existingDetails?.data?.data?.petrol_pump_completion_date,
        })
        setadditionalDetailsPreview({
            zone: existingDetails?.data?.data?.zone_mstr_id,
            mobileTowerStatus: existingDetails?.data?.data?.is_mobile_tower == true ? 1 : 0,
            hoardingStatus: existingDetails?.data?.data?.is_hoarding_board == true ? 1 : 0,
            petrolPumpStatus: existingDetails?.data?.data?.is_petrol_pump == true ? 1 : 0,
            waterHarvestingStatus: existingDetails?.data?.data?.is_water_harvesting == true ? 1 : 0,
            mobileTowerArea: existingDetails?.data?.data?.tower_area,
            mobileTowerDate: existingDetails?.data?.data?.tower_installation_date,
            hoardingArea: existingDetails?.data?.data?.hoarding_area,
            hoardingDate: existingDetails?.data?.data?.hoarding_installation_date,
            petrolPumpArea: existingDetails?.data?.data?.under_ground_area,
            petrolPumpDate: existingDetails?.data?.data?.petrol_pump_completion_date,
        })

    }

    const funcSubmitHoldingList = (holdingList) => {
        setholdingNoList(holdingList)
        setholdingCardStatus(false)
    }

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
    const getLocationByUlb = () => {
        let requestBody = {

        }
        console.log('before fetch location', requestBody)
        axios.post(api_getLocationByUlbAdmin, requestBody, ApiHeader())
            .then(function (response) {
                console.log('location by ulbid ...', response)
                setulbLocation(response?.data?.data)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
            })
    }

    const submitRuelsetData = () => {
        setdevData(payloadDataMake())
        setLoaderStatus(true);
        let payloadData = payloadDataMake()

        console.log("--2--before fetch ruleset data at preview....", payloadData);
        // return
        axios
            .post(api_reviewCalculation, payloadData, ApiHeader())
            .then(function (response) {
                console.log("==3 cacluator tax response===", response);
                if (response?.data?.status) {
                    settotalAmountData(response?.data?.data?.demand)
                    setrulesetData(response?.data)
                } else {
                    activateBottomErrorCard(true, 'Error occured in fetching tax details. Please try again later.')
                }

                setLoaderStatus(false)
            })
            .catch(function (error) {
                console.log("== 3 calcualte tax error== ", error);

                activateBottomErrorCard(true, 'Error occured in fetching tax details. Please try again later.')
                setLoaderStatus(false)
            });
    };




    // IF DIRECT CLOSE HOLDING CARD THEN SHOW ULB WELCOME SCREEN AGAIN
    const closeHoldingModal = (status) => {
        navigate('/home')
    }
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)

    }

    //SHOW WELCOME SCREEN FIRST
    if ((safType == 'bi' || safType == 'am') && holdingCardStatus) {
        return (
            <>
                <HoldingNoCard closeModal={closeHoldingModal} setholdingCardStatus={setholdingCardStatus} fetchPropertyDetails={fetchPropertyDetails} setmutionHoldingId={setmutionHoldingId} choosedUlbId={choosedUlbId} funcSubmitHoldingList={funcSubmitHoldingList} safType={safType} />
            </>
        )
    }




    else {
        return (
            <>
                <ToastContainer autoClose={2000} position="top-right" />
                {devModeVisibility && devMode && <CommonModal>
                    <div className='overflow-y-scroll h-[800px] '>
                        <div onClick={() => setdevMode(!devMode)} className='w-10 h-10 bg-black text-white flex justify-center items-center rounded-full cursor-pointer'>X</div>
                        <div className='grid grid-cols-12 overflow-auto h-[800px]'>
                            <div className='col-span-2 bg-white overflow-auto'></div>
                            <div className='col-span-8 bg-gray-800 overflow-y-scroll p-8 text-white'><pre className=''>{JSON.stringify(devData, null, 2)}</pre></div>
                            <div className='col-span-2 bg-white overflow-auto'></div>

                        </div>
                    </div>
                </CommonModal>}
                {devModeVisibility && <div onClick={() => setdevMode(!devMode)} className='shadow-xl border-white w-14 h-14 bg-red-500 text-white flex justify-center items-center absolute right-40 bottom-40 rounded-full cursor-pointer'>D</div>}
                {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
                {loaderStatus && <BarLoader />}
                {/* take a parent div ...style it as displayed below    ,....make it a grid with col-12 */}
                <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 px-2 md:px-2 md:space-x-2'>
                    {formIndex < 7 && <div className='col-span-12'>
                        {/* {formHeadStatus && <span className='font-bold text-gray-700  text-2xl font-serif text-center float-center'>You Are Applying For {safType == 'new' && 'New Assessment'}  {safType == 're' && 'Re Assessment'}  {safType == 'mu' && 'Mutation'}
                            {safType == 'bi' && 'Bifurcation'}
                            {safType == 'am' && 'Amalgamation'}</span>} */}

                        <span onClick={() => setpreviewCloseStatus(!previewCloseStatus)} className='hidden md:flex cursor-pointer px-4 py-1  float-right  justify-center items-center bg-indigo-500 rounded-full shadow-2xl border border-white hover:scale-105 hover:bg-indigo-700'>
                            {/* {!previewCloseStatus && <HiArrowNarrowRight className="text-white font-semibold" />}
                            {previewCloseStatus && <HiArrowNarrowLeft className="text-white font-semibold" />} */}
                            <Tooltip anchorId="preview-form-button" />
                            <span id="preview-form-button" data-tooltip-content={previewCloseStatus ? 'Click to open form preview' : 'Click to close form preview'} className='text-white'>{previewCloseStatus ? 'Show Preview' : 'Hide Preview'}</span>
                        </span>
                    </div>}


                    {/* Rest of the component will go here ....it has a col-span of 9*/}
                    <div className={`${formIndex >= 7 ? 'col-span-12' : (previewCloseStatus ? 'col-span-12' : 'col-span-9')} w-full h-screen overflow-x-hidden`}>

                        {/* your custom content */}
                        <div className='w-full  text-lg rounded-lg'>
                            {/* {5>4 && */}
                            {/* {safType != 'new' && formHeadStatus &&
                                <div className='relative font-bold text-gray-700  text-2xl text-center'><span className='text-gray-500'>Holding No.</span> {existingPropertyDetails?.data?.data?.holding_no}</div>} */}
                            <div>
                            </div>
                            {/* WEB VIEW */}
                            {formIndex < 7 && <div className="hidden sm:flex mt-5 mb-5 md:pr-6">
                                <>
                                    <div class="border-b-2 py-4 w-full">
                                        <div class="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight" >Step {formIndex} of 6</div>
                                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div class="flex-1">
                                                <div >
                                                    {formIndex == 1 && <div class="text-lg font-bold text-gray-700 leading-tight">Basic Details</div>}
                                                    {formIndex == 2 && <div class="text-lg font-bold text-gray-700 leading-tight">Property Address & Details</div>}
                                                    {formIndex == 3 && <div class="text-lg font-bold text-gray-700 leading-tight">Electricity & Water Details</div>}
                                                    {formIndex == 4 && <div class="text-lg font-bold text-gray-700 leading-tight">Owner Details</div>}
                                                    {formIndex == 5 && <div class="text-lg font-bold text-gray-700 leading-tight">Floor Details</div>}
                                                    {formIndex == 6 && <div class="text-lg font-bold text-gray-700 leading-tight">Additional Details</div>}
                                                </div>

                                            </div>
                                            <div class="flex-1 text-center">
                                                <span className='text-xl font-bold text-gray-700 leading-tight'>
                                                    {safType == 'new' && 'You are applying for New-Assessment'}
                                                    {safType == 're' && 'You are applying for Re-Assessment'}
                                                    {safType == 'mu' && 'You are applying for Mutation'}
                                                    {safType == 'bi' && 'You are applying for Bifurcation'}
                                                    {safType == 'am' && 'You are applying for Amalgamation'}
                                                    {safType == 'bo-edit' && 'Edit the Application'}
                                                </span>

                                            </div>

                                            <div className="flex-1 float-right text-right">
                                                <div class="flex items-center md:w-64 float-right">
                                                    <div class="flex-1 bg-white rounded-full mr-2 shadow-xl">
                                                        <div class={`rounded-full 
                                                    ${formIndex == 1 && 'w-[0%]'}
                                                    ${formIndex == 2 && 'w-[16%]'}
                                                    ${formIndex == 3 && 'w-[32%]'}
                                                    ${formIndex == 4 && 'w-[50%]'}
                                                    ${formIndex == 5 && 'w-[66%]'}
                                                    ${formIndex == 6 && 'w-[86%]'}
                                                     bg-indigo-400 text-xs leading-none h-3 text-center text-white`} ></div>
                                                    </div>

                                                    <div class="text-xs  text-gray-600" >
                                                        {formIndex == 1 && '0%'}
                                                        {formIndex == 2 && '16%'}
                                                        {formIndex == 3 && '32%'}
                                                        {formIndex == 4 && '50%'}
                                                        {formIndex == 5 && '66%'}
                                                        {formIndex == 6 && '86%'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>}

                            {/* MOBILE VIEW */}
                            {formIndex < 7 && <div className="flex sm:hidden md:pr-6">
                                <>
                                    <div class="border-b-2 py-4 w-full">

                                        <div class="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight" >Step {formIndex} of 6</div>
                                        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div class="flex-1">
                                                <div >
                                                    {formIndex == 1 && <div class="text-lg font-bold text-gray-700 leading-tight">Basic Details</div>}
                                                    {formIndex == 2 && <div class="text-lg font-bold text-gray-700 leading-tight">Property Address & Details</div>}
                                                    {formIndex == 3 && <div class="text-lg font-bold text-gray-700 leading-tight">Electricity & Water Details</div>}
                                                    {formIndex == 4 && <div class="text-lg font-bold text-gray-700 leading-tight">Owner Details</div>}
                                                    {formIndex == 5 && <div class="text-lg font-bold text-gray-700 leading-tight">Floor Details</div>}
                                                    {formIndex == 6 && <div class="text-lg font-bold text-gray-700 leading-tight">Additional Details</div>}
                                                </div>

                                            </div>


                                            <div className="flex-1 float-right text-right">
                                                <div class="flex items-center md:w-64 float-right">
                                                    <div class="flex-1 bg-white rounded-full mr-2 shadow-xl">
                                                        <div class={`rounded-full 
                                                    ${formIndex == 1 && 'w-[0%]'}
                                                    ${formIndex == 2 && 'w-[16%]'}
                                                    ${formIndex == 3 && 'w-[32%]'}
                                                    ${formIndex == 4 && 'w-[50%]'}
                                                    ${formIndex == 5 && 'w-[66%]'}
                                                    ${formIndex == 6 && 'w-[86%]'}
                                                     bg-indigo-400 text-xs leading-none h-3 text-center text-white`} ></div>
                                                    </div>

                                                    <div class="text-xs  text-gray-600" >
                                                        {formIndex == 1 && '0%'}
                                                        {formIndex == 2 && '16%'}
                                                        {formIndex == 3 && '32%'}
                                                        {formIndex == 4 && '50%'}
                                                        {formIndex == 5 && '66%'}
                                                        {formIndex == 6 && '86%'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </div>}

                            {formIndex < 8 &&
                                (safType == 'bi' || safType == 'am') &&
                                <div className='bg-indigo-50 flex mt-5 mb-5 md:pr-6 w-full items-center'>
                                    <h1 className='mr-10 font-semibold text-gray-700 px-4 py-1'>{safType == 'bi' ? 'Holding' : 'Holding(s)'} to {safType == 'bi' ? 'Bifurcate' : 'Amalgamate'} : </h1>
                                    {
                                        holdingNoList?.map((data) => (
                                            <span className='mr-5 text-gray-600'>{data}</span>
                                        ))
                                    }
                                </div>
                            }
                            {formIndex < 8 &&
                                (safType == 'mu') &&
                                <div className='bg-indigo-50 flex mt-5 mb-5 md:pr-6 w-full items-center'>
                                    <h1 className='mr-10 font-semibold text-gray-700 px-4 py-1'>Previous Holding No : {existingPropertyDetails?.data?.data?.holding_no} </h1>
                                </div>
                            }
                            {/* <div className='mt-4 mb-2 font-serif font-semibold text-gray-600 w-full px-4'>Form 1 out of 5</div> */}
                            <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-8  py-4  md:-mt-10'>
                                <div className='col-span-8 ' ref={viewRef}>
                                    {/* <LoaderComponent show={show} /> */}
                                    {formIndex < 8 && <>
                                        {formIndex == 1 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropBasicDetail4
                                                wardList={wardList}
                                                devData={devData}
                                                setdevData={setdevData}
                                                setselectedUlbId={setselectedUlbId}
                                                wardByUlb={wardByUlb}
                                                newWardList={newWardList}
                                                fetchZoneByUlb={fetchZoneByUlb}
                                                fetchNewWardByOldWard={fetchNewWardByOldWard}
                                                fetchApartmentByOldWard={fetchApartmentByOldWard}
                                                apartmentList={apartmentList}
                                                basicDetails={basicDetails}
                                                setbasicDetails={setbasicDetails}
                                                setbasicDetailsPreview={setbasicDetailsPreview}
                                                basicDetailsPreview={basicDetailsPreview}
                                                choosedUlbId={choosedUlbId}
                                                apartmentStatus={apartmentStatus}
                                                setapartmentStatus={setapartmentStatus}
                                                setpropertyTypeState={setpropertyTypeState}
                                                propertyTypeState={propertyTypeState}
                                                setzoneList={setzoneList}
                                                getLocationByUlb={getLocationByUlb}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                ulbList={ulbList}
                                                preFormData={preFormData}
                                                toastFun={notify}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 2 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropPropertyAddressDetails
                                                devData={devData}
                                                setdevData={setdevData}
                                                propAddressDetails={propAddressDetails}
                                                setpropAddressDetails={setpropAddressDetails}
                                                apartmentStatus={apartmentStatus}
                                                ulbLocation={ulbLocation}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                preFormData={preFormData}
                                                toastFun={notify}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 3 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropElectricityWaterDetails
                                                devData={devData}
                                                setdevData={setdevData}
                                                elecWaterDetails={elecWaterDetails}
                                                setelecWaterDetails={setelecWaterDetails}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                preFormData={preFormData}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 4 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropOwnerDetails
                                                activateBottomErrorCard={activateBottomErrorCard}
                                                devData={devData}
                                                setdevData={setdevData}
                                                ownerDetails={ownerDetails}
                                                setownerDetails={setownerDetails}
                                                ownerDetailsPreview={ownerDetailsPreview}
                                                setownerDetailsPreview={setownerDetailsPreview}
                                                oldOwnerDetails={oldOwnerDetails}
                                                oldownerDetailsPreview={oldownerDetailsPreview}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                preFormData={preFormData}
                                                assType={assTypeText}
                                                toastFun={notify}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 5 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropFloorDetails
                                                activateBottomErrorCard={activateBottomErrorCard}
                                                devData={devData}
                                                setdevData={setdevData}
                                                oldFloorDetailsCount={oldFloorDetailsCount}
                                                floorDetails={floorDetails}
                                                setfloorDetails={setfloorDetails}
                                                floorDetailsPreview={floorDetailsPreview}
                                                setfloorDetailsPreview={setfloorDetailsPreview}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                preFormData={preFormData}
                                                toastFun={notify}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 6 && <div className={`animate__animated  animate__fadeInLeft`}>
                                            <CitizenPropAdditionalDetails
                                                floorDetails={floorDetails}
                                                devData={devData}
                                                setdevData={setdevData}
                                                additionalDetails={additionalDetails}
                                                setadditionalDetails={setadditionalDetails}
                                                additionalDetailsPreview={additionalDetailsPreview}
                                                setadditionalDetailsPreview={setadditionalDetailsPreview}
                                                submitRuelsetData={submitRuelsetData}
                                                zoneValue={zoneValue}
                                                setzoneValue={setzoneValue}
                                                zoneList={zoneList}
                                                getLocationByUlb={getLocationByUlb}
                                                safType={safType}
                                                existingPropertyDetails={existingPropertyDetails}
                                                ulbList={ulbList}
                                                preFormData={preFormData}
                                                allFormData={allFormData}
                                                toastFun={notify}
                                                backFun={backFun}
                                                nextFun={nextFun} />
                                        </div>}

                                        {formIndex == 7 && <div className={``}>
                                            <SafFormReview
                                                basicDetailsPreview={basicDetailsPreview}
                                                propAddressDetails={propAddressDetails}
                                                elecWaterDetails={elecWaterDetails}
                                                ownerDetailsPreview={ownerDetailsPreview}
                                                floorDetailsPreview={floorDetailsPreview}
                                                additionalDetailsPreview={additionalDetailsPreview}
                                                propertyTypeState={propertyTypeState}
                                                zoneValue={zoneValue}
                                                rulesetData={rulesetData}
                                                formReviewData={allFormPreviewData}
                                                submitFun={submitButtonToggle}
                                                toastFun={notify}
                                                backFun={backFun} nextFun={nextFun} />
                                        </div>}
                                    </>}
                                    {/*//> after successfully form submit show safformdemand page */}
                                    {formIndex == 8 && <div className={``}><SafFormDemand toastFun={notify} backFun={backFun} nextFun={nextFun} safSubmitResponse={safSubmitResponse} showLoader={showLoader} /></div>}

                                    {/* // CITIZEN EDIT CASE */}
                                    {formIndex == 9 && <div className={``}>
                                        <div className="w-full h-full bg-white p-20">
                                            <div>
                                                <div className="text-center font-semibold text-3xl">Application Updated Successfully !</div>
                                                <div className="text-center mt-6">
                                                    <button className={`mr-4 bg-indigo-500  text-white px-6 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/propApplicationDetails/${existingPropertyDetails?.data?.data?.id}`)}>View Details</button>
                                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/propertyDashboard`)}>View Dashboard</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FeedBack Screen*/}
                    {formIndex < 7 && <div className={`hidden sm:block transition-all ${previewCloseStatus ? 'col-span-0 hidden' : 'col-span-3 block'} w-full h-screen  rounded-lg p-2 overflow-auto`}>
                        <div className=''>
                            <PropFeedbackScreen
                                basicDetailsPreview={basicDetailsPreview}
                                propAddressDetails={propAddressDetails}
                                elecWaterDetails={elecWaterDetails}
                                ownerDetailsPreview={ownerDetailsPreview}
                                floorDetailsPreview={floorDetailsPreview}
                                additionalDetailsPreview={additionalDetailsPreview}
                                propertyTypeState={propertyTypeState}
                                formIndex={formIndex}
                                verificationStatus={formIndex}
                                allFormData={allFormPreviewData}
                                assTypeText={assTypeText}
                            />
                        </div>
                    </div>}



                </div>
                {
                    totalAmountData && formIndex < 8 &&
                    <div style={{ 'zIndex': 1000 }} className='fixed bottom-0 left-0 text-black w-auto p-2 bg-white'>
                        <div className='bg-gray-200'>
                            {taxSumFullDetailsStatus &&
                                <>

                                    <div className='flex w-full'>
                                        <div className="flex-1  text-gray-800  px-4 py-2">Tax Amount :</div>
                                        <div className="flex-1"><span className=' text-lg ml-2'><BiRupee className="inline" /> {nullToNA(totalAmountData?.totalTax)}</span></div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className="flex-1  text-gray-800  px-4 py-2">Late Assessment Penalty :</div>
                                        <div className="flex-1"><span className=' text-lg ml-2'><BiRupee className="inline" /> {nullToNA(totalAmountData?.lateAssessmentPenalty)}</span></div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className="flex-1  text-gray-800  px-4 py-2">1% Penalty :</div>
                                        <div className="flex-1"><span className=' text-lg ml-2'><BiRupee className="inline" /> {nullToNA(totalAmountData?.totalOnePercPenalty)}</span></div>
                                    </div>

                                    <div className='flex w-full'>
                                        <div className="flex-1  text-gray-800  px-4 py-2">Rebate :</div>
                                        <div className="flex-1"><span className=' text-lg ml-2'><BiRupee className="inline" /> {nullToNA(totalAmountData?.rebateAmount)}</span></div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className="flex-1  text-gray-800  px-4 py-2">Special Rebate :</div>
                                        <div className="flex-1"><span className=' text-lg ml-2'><BiRupee className="inline" /> {nullToNA(totalAmountData?.specialRebateAmount)}</span></div>
                                    </div>
                                </>}

                            <hr />
                            <div className='flex w-full mt-2'>
                                <div className="flex-1 font-semibold text-gray-800 text-xl  px-4 py-2">Total Payable Amount : </div>
                                <div className="flex-1"><span className=' text-3xl font-bold ml-4 text-black'><BiRupee className="inline" /> {nullToNA(totalAmountData?.payableAmount)}</span></div>
                            </div>
                            {/* <span className='font-semibold text-white text-xl  shadow-xl px-4 py-2 border-white'>Total Payable Amount : <span className=' text-3xl font-bold ml-4'><BiRupee className="inline" /> {totalAmountData?.payableAmount}</span></span> */}
                            <div className='cursor-pointer text-center' onClick={() => settaxSumFullDetailsStatus(!taxSumFullDetailsStatus)}>{taxSumFullDetailsStatus ? 'Hide View Details' : 'Click to View Details'}</div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default CitizenPropSafApplicationFormIndex