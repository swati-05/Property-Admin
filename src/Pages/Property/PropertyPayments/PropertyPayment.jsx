import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BarLoader from "@/Components/Common/BarLoader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import useSetTitle from "@/Components/GlobalData/useSetTitle";
import PaymentCard from "@/Pages/PropertyEntryForms/SafFormReview/PaymentCard";
import CitizenApplyApiList from "@/Components/CitizenApplyApiList";
import ApiHeader2 from "@/Components/ApiList/ApiHeader2";



function PropertyPayment(props) {
    const [isLoading, setisLoading] = useState(false);
    const [applicationFullData, setapplicationFullData] = useState()
    const [demandDetail, setdemandDetail] = useState()
    const [fullData, setfullData] = useState()
    const [loader, setLoader] = useState(false) // Used when click on Pay Now

    const { id, moduleType } = useParams()

    const { api_getHoldingDemandById, api_getsafDemandById, api_getClusterPropertyDemand, api_getClusterSafDemand } = CitizenApplyApiList();

    useSetTitle('Payment Screen')

    const fetchDemandDetail = () => {

        setisLoading(true)
        let url
        let requestBody

        // NORMAL HOLDING PAYMENT
        if (moduleType == 'holding') {
            url = api_getHoldingDemandById
            requestBody = {
                propId: id
            }
        }
        // NORMAL SAF PAYMENT
        if (moduleType == 'saf') {
            url = api_getsafDemandById
            requestBody = {
                id: id
            }
        }
        // CLUSTER SAF PAYMENT
        if (moduleType == 'cluster-saf') {
            url = api_getClusterSafDemand

            requestBody = {
                id: id
            }
        }
        // CLUSTER HOLDING PAYMENT
        if (moduleType == 'cluster-holding') {
            url = api_getClusterPropertyDemand
            requestBody = {
                id: id
            }
        }

        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('payment details data...', response.data)
                setdemandDetail(response.data.data)
                setfullData(response?.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('payment details error...', error)
                setisLoading(false)
            })
    }

    useEffect(() => {
        fetchDemandDetail()
    }, [])

    return (
        <>
            {isLoading && <BarLoader />}
            {/* <div className=" font-bold text-2xl pb-4 md:py-4">Holding Deactivation</div> */}

            <div className="p-10">
                <div className='w-full bg-white shadow-xl mb-6'>
                    <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
                            {moduleType != 'saf' && <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.holding_no ? demandDetail?.basicDetails?.holding_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Holding No.</div>
                            </div>}
                            {moduleType == 'saf' && <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.saf_no ? demandDetail?.basicDetails?.saf_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Application No.(Saf No)</div>
                            </div>}
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.old_ward_no ? demandDetail?.basicDetails?.old_ward_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Ward No.</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-lg'>{demandDetail?.basicDetails?.old_ward_no ? demandDetail?.basicDetails?.old_ward_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>New Ward No</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.ownership_type ? demandDetail?.basicDetails?.ownership_type : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Ownership Type</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.property_type ? demandDetail?.basicDetails?.property_type : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Property Type</div>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.zone_mstr_id ? demandDetail?.basicDetails?.zone_mstr_id : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Zone</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{demandDetail?.basicDetails?.is_mobile_tower ? demandDetail?.basicDetails?.is_mobile_tower : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.is_hoarding_board ? demandDetail?.basicDetails?.is_hoarding_board : "N/A"} </div>
                                <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{demandDetail?.basicDetails?.is_petrol_pump ? demandDetail?.basicDetails?.is_petrol_pump : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm' >{demandDetail?.basicDetails?.is_water_harvesting ? demandDetail?.basicDetails?.is_water_harvesting : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>

                    <PaymentCard basicDetails={demandDetail?.basicDetails} safPaymentDetailsData={demandDetail?.amounts} paymentDetails={demandDetail?.duesList} />
                </div>
            </div>

            <div className="w-full h-40 md:none"></div>
        </>
    );
}

export default PropertyPayment;
