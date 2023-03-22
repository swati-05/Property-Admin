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
import BasicEditPropertyAddressDetails from './BasicEditPropertyAddressDetails'
import BasicEditOwnerDetails from './BasicEditOwnerDetails'
import 'react-toastify/dist/ReactToastify.css';
import FormSubmitResponse from '../../../Components/Common/ResponseScreen/FormSubmitResponse'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList'
import ApiHeader from '../../../Components/ApiList/ApiHeader'
import BarLoader from '../../../Components/Common/BarLoader'
import { toast, ToastContainer } from 'react-toastify'
import BasicEditBasicDetail from './BasicEditBasicDetail'
import { contextVar } from '@/Components/Context/Context'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import CommonModal from '@/Components/GlobalData/CommonModal';
import ServerErrorCard from '@/Components/Common/ServerErrorCard';

function BasicEditFormIndex() {

    const { api_getMasterData, api_getHoldingDetails, api_getLocationByUlbAdmin, api_reviewCalculation, api_boEdit, api_newWardByOldWard, api_editPropertyDetails } = CitizenApplyApiList()

    const { notify } = useContext(contextVar)     //////global toast function/////
    const navigate = useNavigate()
    const [formIndex, setFormIndex] = useState(1) ///{***✅ formindex specifies type of form like basicdetails at index 1 ...***}///
    const [preFormData, setPreFormData] = useState()///{***state variable to hold all form required data***}///
    const [safSubmitResponse, setsafSubmitResponse] = useState()////{***state variable to hold response data after submitting the saf form***}//
    const [show, setshow] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [ulbList, setulbList] = useState(false)////{***slide animation control state for BasicDetails form***}///
    const [responseScreenStatus, setResponseScreenStatus] = useState('')
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [existingPropertyDetails, setexistingPropertyDetails] = useState()
    const [ulbLocation, setulbLocation] = useState()
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
    const [apartmentList, setapartmentList] = useState()
    const [erroState, seterroState] = useState(false);
    const [updatedStatus, setupdatedStatus] = useState(false);




    // STATES TO HOLD ALL PAGE DATA OPEN
    const [basicDetails, setbasicDetails] = useState(null)
    const [propAddressDetails, setpropAddressDetails] = useState(null)
    const [elecWaterDetails, setelecWaterDetails] = useState(null)
    const [ownerDetails, setownerDetails] = useState([])
    // OLD OWNER IN CASE OF MUTATION
    const [oldOwnerDetails, setoldOwnerDetails] = useState([])
    const [floorDetails, setfloorDetails] = useState([])
    const [additionalDetails, setadditionalDetails] = useState({
        mobileTowerStatus: 0,
        hoardingStatus: 0,
        petrolPumpStatus: 0,
        waterHarvestingStatus: 0,
    })

    const [basicDetailsPreview, setbasicDetailsPreview] = useState(null)
    const [ownerDetailsPreview, setownerDetailsPreview] = useState([])
    // OLD OWNER PREVIEW IN CASE OF MUTATION
    const [oldownerDetailsPreview, setoldownerDetailsPreview] = useState([])
    const [floorDetailsPreview, setfloorDetailsPreview] = useState([])
    const [additionalDetailsPreview, setadditionalDetailsPreview] = useState(null)
    // STATES TO HOLD FLOOR COUNT TO IMPLEMENT REMOVE AND UPDATE FOR RE-ASSESSMENT
    const [oldFloorDetailsCount, setoldFloorDetailsCount] = useState(0)
    const [leveFormSubmitCount, setleveFormSubmitCount] = useState(0)

    useSetTitle('Property Basic Edit')

    const viewRef = useRef(null)

    // const moveToTop = () => {
    //     viewRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // };

    let safType = 'mu'


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



    let assTypeText = "NEW ASSESSMENT"
    //*receiving saf type 
    const { propId } = useParams()

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

    const submitUpdateForm = () => {

    }

    ///////////{*** NEW ASSESSMENT TYPE SUBMIT FUNCTION***}/////////
    const submitSafForm = () => {
        setLoaderStatus(true)
        seterroState(false)
        let correspondingAddress
        //* If corresponding address is diffrent 
        if (propAddressDetails.addressCheckbox) {
            correspondingAddress = {
                corrAddress: propAddressDetails.c_locality,
                corrCity: propAddressDetails.c_city,
                corrDist: propAddressDetails.c_district,
                corrState: propAddressDetails.c_state,
                corrPinCode: propAddressDetails.c_pin,
            }
        } else {//* If corresponding address is same then both address will be same
            correspondingAddress = {
                corrAddress: propAddressDetails.locality,
                corrCity: propAddressDetails.city,
                corrDist: propAddressDetails.district,
                corrState: propAddressDetails.state,
                corrPinCode: propAddressDetails.pin,
            }
        }

        let requestBody
        let payloadData = payloadDataMake()
        requestBody = {
            // FIRST SOURCE IS PAYLOAD DATA
            propertyId: propId,
            newWardMstrId: payloadData.newWard,
            buildingName    : propAddressDetails.buildingName,
            streetName: propAddressDetails.streetName,
            location: propAddressDetails.location2,
            landmark: propAddressDetails.landmark,

            //** PROPERTY ADDRESS EXTRA
            khataNo: propAddressDetails.khataNo,
            plotNo: propAddressDetails.plotNo,
            villageMauja: propAddressDetails.village_mauja,
            //* PROPERTY ADDRESS MAIN
            pinCode: propAddressDetails?.pin,
            address: propAddressDetails?.locality,

            //* CORRESPONDING ADDRESS
            corrPin: correspondingAddress?.corrPinCode,
            corrAddress: correspondingAddress?.corrAddress,
            // OWNER DETAILS
            owner: payloadData?.owner,
        }

        console.log('before property update......', requestBody)
        // return
        axios.post(api_editPropertyDetails, requestBody, ApiHeader())
            .then(function (response) {
                console.log('response after update property data', response)
                if (response?.data?.status) {
                    notify("Property Details has been updated successfully !!",'success')
                    setupdatedStatus(true)
                } else {
                    notify('Network is busy, Please try again after some time', 'error')
                }
                setLoaderStatus(false)
            })
            .catch(function (error) {
                console.log('error in submitting saf form ', 'error');
                seterroState(true)
                setupdatedStatus(false)
                setLoaderStatus(false)
            })
    }

    useEffect(() => {

        getLocationByUlb()
        if (safType == 'bi' || safType == 'am') {
            setholdingCardStatus(true)
        }
        fetchMasterData()
        if (safType == 're' || 'bo-edit') {
            fetchPropertyDetails()
        }

    }, [])

    useEffect(() => {
        if (leveFormSubmitCount == 3) {
            submitSafForm()
        }
    }, [leveFormSubmitCount])

    console.log('count...', leveFormSubmitCount)

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



    const fetchPropertyDetails = () => {
        setLoaderStatus(true)
        seterroState(false)
        let requestBody = {
            propertyId: propId
        }
        console.log('body before finding prop', requestBody)

        axios.post(api_getHoldingDetails, requestBody, ApiHeader())
            .then(function (response) {
                console.log('getting property detail for edit case......', response)
                if (response?.data?.data) {
                    setexistingPropertyDetails(response)
                    feedExistingDetails(response)
                } else {
                    seterroState(true)
                }
                setLoaderStatus(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                seterroState(true)
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
                    ownerId: owner?.id,
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

    if (loaderStatus) {
        return (
            <BarLoader />
        )
    }

    if (erroState) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }

    return (
        <>
            <ToastContainer autoClose={2000} position="top-right" />
            <div className='w-full grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 px-2 md:px-2 md:space-x-2'>
                <div className={`col-span-12 w-full h-screen overflow-x-hidden`}>
                    <div className='w-full  text-lg rounded-lg'>



                        {/* <div className='mt-4 mb-2 font-serif font-semibold text-gray-600 w-full px-4'>Form 1 out of 5</div> */}
                        <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-8  py-4'>
                            <div className='col-span-8 ' ref={viewRef}>
                                {/* <LoaderComponent show={show} /> */}
                                {!updatedStatus && <>
                                    <div className={``}>
                                        <BasicEditBasicDetail
                                            setselectedUlbId={setselectedUlbId}
                                            wardByUlb={wardByUlb}
                                            newWardList={newWardList}
                                            fetchNewWardByOldWard={fetchNewWardByOldWard}
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
                                            getLocationByUlb={getLocationByUlb}
                                            safType={safType}
                                            existingPropertyDetails={existingPropertyDetails}
                                            ulbList={ulbList}
                                            preFormData={preFormData}
                                            toastFun={notify}
                                            setleveFormSubmitCount={setleveFormSubmitCount}
                                            leveFormSubmitCount={leveFormSubmitCount} />
                                    </div>
                                    <div className={``}>
                                        <BasicEditPropertyAddressDetails
                                            propAddressDetails={propAddressDetails}
                                            setpropAddressDetails={setpropAddressDetails}
                                            apartmentStatus={apartmentStatus}
                                            ulbLocation={ulbLocation}
                                            safType={safType}
                                            existingPropertyDetails={existingPropertyDetails}
                                            preFormData={preFormData}
                                            toastFun={notify}
                                            setleveFormSubmitCount={setleveFormSubmitCount}
                                            leveFormSubmitCount={leveFormSubmitCount}
                                            submitSafForm={submitSafForm} />
                                    </div>

                                    <div className={``}>
                                        <BasicEditOwnerDetails
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
                                            setleveFormSubmitCount={setleveFormSubmitCount}
                                            leveFormSubmitCount={leveFormSubmitCount} />
                                    </div>
                                </>}

                                {/* // CITIZEN EDIT CASE */}
                                {updatedStatus && <div className={``}>
                                    <div className="w-full h-full bg-white p-20 shadow-xl">
                                        <div>
                                            <div className="text-center font-semibold text-3xl">Property details has been updated successfully !</div>
                                            <div className="text-center mt-6">
                                             
                                                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => window.location.reload()}>Re Update</button>
                                                <button className={`mr-4 bg-indigo-500  text-white px-6 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/holdingPropertyDetails/${existingPropertyDetails?.data?.data?.id}`)}>View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mt-40'></div>
        </>
    )
}

export default BasicEditFormIndex