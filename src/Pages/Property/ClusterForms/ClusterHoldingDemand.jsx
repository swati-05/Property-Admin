import { useState, useEffect, useContext } from 'react'
import rupee from '../../../Components/Media/rupee.png'
import brief from '../../../Components/Media/brief.png'
import pay2 from '../../../Components/Media/pay2.png'
import axios from 'axios'
import RazorpayPaymentScreen from '../../../Components/Common/RazorpayPaymentScreen'
import { useNavigate, useParams } from 'react-router-dom'
import PaymentTranscationScreen from '../../../Components/Common/PaymentTranscationScreen'
import { ToastContainer, toast } from 'react-toastify';
import BarLoader from '@/Components/Common/BarLoader'
import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import { contextVar } from '@/Components/Context/Context'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import TopTabsCluster from '../DetailsFactory/TopTabsCluster'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import TopTabs from '../DetailsFactory/TopTabs'
import BrandLoader from '@/Components/Common/BrandLoader'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'



// import pay2 from '../../../../Components/Media/pay2.png'


function ClusterHoldingDemand(props) {
    const { id } = useParams()
    const { api_getClusterPropertyDemand } = CitizenApplyApiList();
    const navigate = useNavigate()

    const [demandDetail, setdemandDetail] = useState()
    const [fullData, setfullData] = useState()
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [demandStatus, setdemandStatus] = useState(false);



    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Cluster Holding Demand Details')

    const fetchDemandDetail = () => {
        seterroState(false)
        setisLoading(true)
        axios.post(`${api_getClusterPropertyDemand}`, { clusterId: id }, ApiHeader())
            .then(function (response) {
                console.log('view cluster demand details at property in egov...', response.data)
                setdemandStatus(response?.data?.status)
                if (response?.data?.status) {
                    setdemandDetail(response.data.data)
                    setfullData(response?.data)
                } else {
                    setdemandDetail(response.data.data)
                    setfullData(response?.data)
                }
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 cluster details by id error...', error)
                seterroState(true)
                setisLoading(false)
            })
    }

    useEffect(() => {
        fetchDemandDetail()
    }, [])

    if (isLoading) {
        return (
            <>
                <BrandLoader />
            </>
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
            <ToastContainer position="top-right"
                autoClose={2000} />
            <div className='w-full mx-auto px-6'>
                <div className='pt-10'>
                    <TopTabsCluster title={`Demand-Details`} type="holding" id={id} safNo={''} active="demand" />
                </div>

                <div className='w-full bg-white shadow-xl mb-6'>
                    <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">

                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.holding_no)}</div>
                                <div className='text-gray-500 text-xs'>Holding No.</div>
                            </div>
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
                                <div className='font-bold text-sm'>{nullToNA(demandDetail?.basicDetails?.is_mobile_tower)}</div>
                                <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{nullToNA(demandDetail?.basicDetails?.is_hoarding_board)} </div>
                                <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold text-md'>{nullToNA(demandDetail?.basicDetails?.is_petrol_pump)}</div>
                                <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-bold text-sm' >{nullToNA(demandDetail?.basicDetails?.is_water_harvesting)}</div>
                                <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row flex-wrap justify-center w-full'>

                    {demandStatus && <div class="rounded-lg pt-4 z-50 w-full">
                        <div className=''>

                            {/* basic details */}
                            <div className='flex flex-row flex-wrap'>
                                <h1 className='px-1 font-semibold font-serif text-xl text-left'><img src={rupee} alt="pin" className='w-5 inline' /> Tax Details</h1>
                                {/* <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Floor Details</h1> */}

                                <table className='min-w-full leading-normal mt-2 bg-white rounded-lg shadow-xl'>
                                    <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                        <tr>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Rebate (%)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">1% Penalty (Rs) </th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Total Tax (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Payable Amount (Rs)</th>


                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">

                                        <>

                                            <tr className="bg-white border-b border-gray-200">
                                                <td className="px-2 py-2 text-sm text-left">1</td>
                                                <td className="px-2 py-2 text-sm text-left">{nullToNA(demandDetail?.duesList?.rebateAmt)}</td>
                                                <td className="px-2 py-2 text-sm text-left">{nullToNA(demandDetail?.duesList?.onePercPenalty)}</td>


                                                <td className="px-2 py-2 text-sm text-left">{nullToNA(demandDetail?.duesList?.totalDues)}</td>
                                                <td className="px-2 py-2 text-sm text-left">{nullToNA(demandDetail?.duesList?.payableAmount)}</td>


                                            </tr>

                                        </>

                                    </tbody>
                                </table>
                            </div>



                            <div className='mt-10'>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-4">Total Dues (Rs) : <span className='font-semibold text-lg'>{nullToNA(demandDetail?.duesList?.totalDues)}</span> </div>
                                    <div className="col-span-4">Dues From : <span className='font-semibold text-lg'>{nullToNA(demandDetail?.duesList?.duesFrom)}</span> </div>
                                    <div className="col-span-4">Dues To : <span className='font-semibold text-lg'>{nullToNA(demandDetail?.duesList?.duesTo)}</span> </div>

                                    <div className="col-span-4 mt-5">Total Quarters : <span className='font-semibold text-lg'>{nullToNA(demandDetail?.duesList?.totalQuarters)}</span> </div>

                                </div>
                                {/* demand details */}
                                <h1 className='px-1 font-semibold font-serif text-xl mt-10'><img src={brief} alt="pin" className='w-5 inline' /> Demand Overview</h1>
                                <table className='min-w-full leading-normal bg-white rounded-lg shadow-lg mt-2'>
                                    <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                        <tr>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">#</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Arv</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Quater</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Quarter / Year</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Additional Tax (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Quarterly Tax (Rs)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  capitalize text-left">Payable Amount (Rs)</th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">

                                        <>
                                            {demandDetail?.demandList?.map((items, index) => (
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.arv)}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.qtr)}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.fyear)}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.additional_tax)}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.amount)}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{nullToNA(items?.balance)}</td>
                                                </tr>
                                            ))}

                                        </>

                                    </tbody>
                                </table>

                                <div className='mt-10 flex'>

                                    <>
                                        <div className='text-left flex-1'>
                                            <div>
                                                <span className='font-semibold text-gray-600 text-xl'>Total Payable Amount  </span><span className='text-3xl font-bold ml-20'>Rs {nullToNA(demandDetail?.duesList?.payableAmount)}</span>
                                            </div>
                                        </div>
                                        <div className='text-right flex-1'>
                                            <button onClick={() => navigate(`/property-payment/${id}/cluster-holding`)} type="submit" className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Pay Now <img src={pay2} alt="pay image" className='inline w-5' /></button>
                                        </div>
                                    </>
                                </div>
                            </div>

                        </div>
                    </div>}

                    {
                        !demandStatus &&
                        <div className='text-2xl font-bold text-red-500 mt-20'><span className='border border-red-500 px-4 py-2 shadow-xl'>{fullData?.message} </span></div>
                    }


                </div>

            </div>
            <div className='w-full mt-20 h-60'></div>
        </>
    )
}

export default ClusterHoldingDemand