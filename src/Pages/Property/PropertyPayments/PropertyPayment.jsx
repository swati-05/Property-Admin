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
import { nullToNA } from "@/Components/PowerUps/PowerupFunctions";



function PropertyPayment(props) {
    const [isLoading, setisLoading] = useState(false);
    const [applicationFullData, setapplicationFullData] = useState()
    const [demandDetail, setdemandDetail] = useState()
    const [fullData, setfullData] = useState()
    const [loader, setLoader] = useState(false) // Used when click on Pay Now
    const [changeQtr, setchangeQtr] = useState(null)
    const [selectedPaymentYear, setselectedPaymentYear] = useState(null)
    const [selectedPaymentQtr, setselectedPaymentQtr] = useState(null)

    const { id, moduleType } = useParams()

    const { api_getHoldingDemandById, api_getsafDemandById } = CitizenApplyApiList();

    useSetTitle('Payment Screen')

    const fetchDemandDetail = (fYear = null, fQtr = null) => {

        setisLoading(true)
        let url
        let requestBody

        // NORMAL HOLDING PAYMENT
        if (moduleType == 'holding') {
            url = api_getHoldingDemandById
            requestBody = {
                propId: id,
                fYear: fYear,
                qtr: fQtr
            }
        }
        // NORMAL SAF PAYMENT
        if (moduleType == 'saf') {
            url = api_getsafDemandById
            requestBody = {
                id: id
            }
        }

        axios.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('payment details data...', response?.data)
                setdemandDetail(response?.data?.data)
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
                    {(moduleType != 'cluster-saf' && moduleType != 'cluster-holding') && <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
                            {moduleType != 'saf' && <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.holding_no)}</div>
                                <div className='text-gray-500 text-xs'>Holding No.</div>
                            </div>}
                            {moduleType == 'saf' && <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.saf_no)}</div>
                                <div className='text-gray-500 text-xs'>Application No.(Saf No)</div>
                            </div>}
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.old_ward_no)}</div>
                                <div className='text-gray-500 text-xs'>Ward No.</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-lg'>{nullToNA(demandDetail?.basicDetails?.old_ward_no)}</div>
                                <div className='text-gray-500 text-xs'>New Ward No</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{nullToNA(demandDetail?.basicDetails?.ownership_type)}</div>
                                <div className='text-gray-500 text-xs'>Ownership Type</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.property_type)}</div>
                                <div className='text-gray-500 text-xs'>Property Type</div>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.zone_mstr_id)}</div>
                                <div className='text-gray-500 text-xs'>Zone</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>
                                    {nullToNA(demandDetail?.basicDetails?.is_mobile_tower)}
                                </div>
                                <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>
                                    {nullToNA(demandDetail?.basicDetails?.is_hoarding_board)}
                                </div>
                                <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>
                                    {nullToNA(demandDetail?.basicDetails?.is_petrol_pump)}
                                </div>
                                <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm' >
                                    {nullToNA(demandDetail?.basicDetails?.is_water_harvesting)}
                                </div>
                                <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                            </div>
                        </div>
                    </div>}

                    {(moduleType == 'cluster-saf' || moduleType == 'cluster-holding') &&
                        <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">

                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.cluster_name)}</div>
                                    <div className='text-gray-500 text-xs'>Cluster Name</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.cluster_type)}</div>
                                    <div className='text-gray-500 text-xs'>Cluster Type</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-sm'>{nullToNA(demandDetail?.basicDetails?.authorized_person_name)}</div>
                                    <div className='text-gray-500 text-xs'>Authorized Person Name</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-sm'>{nullToNA(demandDetail?.basicDetails?.mobile_no)}</div>
                                    <div className='text-gray-500 text-xs'>Mobile No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.address)}</div>
                                    <div className='text-gray-500 text-xs'>Address</div>
                                </div>

                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{nullToNA(new Date(demandDetail?.basicDetails?.created_at).toLocaleDateString("en-GB"))}</div>
                                    <div className='text-gray-500 text-xs'>Created At</div>
                                </div>

                            </div>

                        </div>
                    }

                </div>
                <div>

                    <PaymentCard selectedPaymentQtr={selectedPaymentQtr} selectedPaymentYear={setselectedPaymentYear} fetchDemandDetail={fetchDemandDetail} basicDetails={demandDetail?.basicDetails} safPaymentDetailsData={demandDetail?.amounts} paymentDetails={demandDetail?.duesList} />
                </div>
            </div>

            <div className="w-full h-40 md:none"></div>
        </>
    );
}

export default PropertyPayment;
