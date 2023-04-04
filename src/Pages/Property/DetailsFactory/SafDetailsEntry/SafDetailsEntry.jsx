import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import PilotWorkflowDocumentRow from '@/Pages/Workflow/Property/WORKFLOW_PILOT/PilotWorkflowTabs/PilotWorkflowDocumentRow'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal';
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { ImCross } from 'react-icons/im'
import { MdTag } from 'react-icons/md'
import TopTabs from '../TopTabs'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import BrandLoader from '@/Components/Common/BrandLoader'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import CommonModal from '@/Components/GlobalData/CommonModal'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none'
    },
};
Modal.setAppElement('#root');
function SafDetailsEntry() {
    // const { id } = useParams()
    // LIST OF API'S
    const { api_getAppicationFullDetail, api_tcComparisionList } = CitizenApplyApiList()
    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('SAF Details')

    const detailRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getAppicationFullDetail: { method: 'post', url: api_getAppicationFullDetail },
        },
        detailInfo: {
            title: 'SAF Application Details',
        },
        filters: {
            // PASS true IF YOU WANT TO SEARCH TRANSACTIONS VIA APPLICATION NO ALSO
            topButtons: true
        }
    }

    const { getDocumentList, api_getStaticSafDetails } = ProjectApiList()
    const [docList, setDocList] = useState()
    const [loader, setloader] = useState(false);
    const [tcComparisonDataList, settcComparisonDataList] = useState();
    const navigate = useNavigate()
    const { id } = useParams()
    const [applicationFullData, setapplicationFullData] = useState()
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);



    useEffect(() => {

        fetUploadedDocuments()
        fetchTcComparisonList()
    }, [])

    const fetUploadedDocuments = () => {
        setloader(true)
        console.log("before document fetch ", id)
        let requestBody = {
            applicationId: id
        }
        axios.post(getDocumentList, requestBody, ApiHeader())
            .then((res) => {
                console.log("document list at saf application details ", res)
                setDocList(res?.data?.data)
                setloader(false)
            })
            .catch((err) => {
                console.log("error at saf application details ", err)
                setloader(false)
            })
    }
    // FETCHING TC COMPARISON DATA LIST
    const fetchTcComparisonList = () => {
        setloader(true)
        console.log("before document fetch ", id)
        let requestBody = {
            applicationId: id
        }
        axios.post(api_tcComparisionList, requestBody, ApiHeader())
            .then((res) => {
                console.log("tc comparision list ", res)
                settcComparisonDataList(res?.data?.data)
                setloader(false)
            })
            .catch((err) => {
                console.log("tc comparison list error ", err)
                setloader(false)
            })
    }


    const [modalIsOpen, setIsOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('')
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    const modalAction = (incomingDocUrl) => {
        console.log('incoming doc url modal => ', incomingDocUrl)
        setDocUrl(incomingDocUrl)
        openModal()
    }

    // GET APPLICATION DETAILS
    const getApplicationDetail = () => {
        seterroState(false)
        setisLoading(true)
        let token = window.localStorage.getItem('token')
        // console.log('token at basic details is  get method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
        axios.post(api_getStaticSafDetails, { applicationId: id }, header)
            .then(function (response) {
                console.log('get saf data in saf view ...', response?.data?.data)
                if (response?.data?.status) {
                    setapplicationFullData(response?.data?.data)
                } else {
                    seterroState(true)
                }
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('saf data error...', error)
                seterroState(true)
                setisLoading(false)
            })
    }

    useEffect(() => {
        getApplicationDetail()
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


    console.log('doc url modal => ', docUrl)
    return (

        <CustomErrorBoundary errorMsg="Bug in TransactionHistoryFactory" >

            <div>
                <>
                    {/* {location == 'workflow' && <div className='px-4'>
                        <button onClick={() => navigate(`/saf-workflow/${tabIndex}/${id}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer"><HiOutlineArrowSmLeft className="inline text-lg" /> Back to Workflow</button>
                    </div>} */}
                    {/* <DetailsFactory detailRules={detailRules} /> */}

                    {/* SAF DETAILS */}
                    <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-2 container sm:mx-auto w-full'>

                        <div className="col-span-12 rounded-lg sm:p-4">
                            {/* <h1 className='px-2 font-semibold mt-0 text-center text-gray-600 font-serif py-2 xl md:text-3xl '>PROPERTY DETAILS</h1> */}
                            {/* <TopTabs id={id} safNo={applicationFullData?.saf_no} active="property" application={false} /> */}
                            <TopTabs title={`SAF Details`} type="application" id={id} safNo={''} active="property" />




                            {/* Basic  details */}
                            <div className='p-2 md:p-4'>
                            <div className=''>
                                <h1 className='px-1 font-semibold font-serif  text-gray-500'><MdTag className="inline" /> Basic Details</h1>
                                <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                                    <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.saf_no)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Application No.</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.old_ward_no)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Old Ward No.</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-semibold text-lg'>{nullToNA(applicationFullData?.old_ward_no)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>New Ward No</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.ownership_type)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Ownership Type</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.property_type)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property Type</div>
                                        </div>

                                    </div>
                                    {applicationFullData?.pt_no && <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.pt_no)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>PT No.</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                        </div>

                                    </div>}
                                    {applicationFullData?.apartment_code && <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.zone_mstr_id)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Zone</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.apartment_name)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Apartment Name</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                            <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.apartment_code)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                            <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Apartment Code</div>
                                        </div>
                                        <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        </div>                          <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        </div>                          <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        </div>                          <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        </div>                      </div>}
                                </div>

                            </div>

                            {/* Property  details */}
                            <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Property Address & Details</h1>
                            <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-10 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.khata_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Khata No.</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.plot_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Plot No</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.village_mauja_name)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Village/Mauja Name</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.area_of_plot)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Area of Plot(decimal)</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.road_type)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Road Width(ft)</div>
                                    </div>
                                </div>

                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.prop_address)} , {nullToNA(applicationFullData?.prop_state)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property Address</div>
                                    </div>

                                </div>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.corr_address)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Corresponding Address</div>
                                    </div>
                                </div>


                                <div></div>

                            </div>


                            {/* owner details */}
                            <div className='mt-10 md:w-auto w-[100vw] overflow-x-auto'>
                                <h1 className='px-1 font-semibold font-serif text-gray-500'><MdTag className="inline" /> Owner Details</h1>

                                <table className='min-w-full leading-normal mt-2 bg-white rounded-lg shadow-xl p-4'>
                                    <thead className='font-bold text-left text-sm border text-gray-800 bg-white '>
                                        <tr>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Owner Name</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Gender</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">DOB</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Guardian Name</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Relation</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Mobile No.</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Aadhar</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">PAN </th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">email </th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Is-Armed-Force </th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Is-Specially-Abled? </th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">

                                        <>
                                            {applicationFullData?.owners?.map((items, index) => (
                                                <tr className="bg-white shadow-xl border-b border-gray-200">
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{index + 1}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.owner_name)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.gender)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.dob)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.guardian_name)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.relation_type)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.mobile_no)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.aadhar_no)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.pan_no)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.email)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.is_armed_force)}</td>
                                                    <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.is_specially_abled)}</td>

                                                </tr>
                                            ))}
                                        </>
                                        {/* ))} */}


                                    </tbody>
                                </table>
                            </div>


                            {/* electricity details */}


                            <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Electricity Details</h1>
                            <div className='py-6  mt-2 bg-white shadow-xl rounded-lg p-4'>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.khata_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Electricity K. No</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.elect_acc_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>ACC No.</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.elect_bind_book_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>BIND/BOOK No.</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.elect_cons_category)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Electricity Consumer Category</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                </div>

                            </div>

                            {/* BUILDING DETAILS */}
                            <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Building Details</h1>
                            <div className='py-6  mt-2 bg-white shadow-xl rounded-lg p-4'>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.building_plan_approval_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Building Plan Approval No.</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.building_plan_approval_date)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Building Plan Approval Date</div>
                                    </div>

                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                </div>
                            </div>

                            {/* WATER DETAILS */}
                            <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Water Details</h1>
                            <div className='py-6  mt-2 bg-white shadow-xl rounded-lg p-4'>

                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.khata_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Water Consumer No.</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.water_conn_date)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Water Connection Date</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                </div>
                            </div>




                            {/* floor details */}
                            <div className='mt-10 md:w-auto w-[100vw] overflow-x-auto'>
                                <h1 className='px-1 font-semibold font-serif text-gray-500 '><MdTag className="inline" /> Floor Details</h1>

                                <table className='min-w-full leading-normal mt-2 bg-white rounded-lg shadow-xl'>
                                    <thead className='font-bold text-left border text-gray-800 text-xs bg-white'>
                                        <tr>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Floor </th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Usage Type</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Occupancy Type</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Construction Type</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Built Up Area(sqt)</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">From Date</th>
                                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Upto Date</th>


                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">

                                        {applicationFullData?.floors?.map((items, index) => (
                                            <tr className="bg-white shadow-xl border-b border-gray-200">
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{index + 1}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.floor_name)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.usage_type)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.occupancy_type)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.construction_type)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.builtup_area)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.date_from)}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{nullToNA(items?.date_upto)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            {/* ADDITIONAL DETAILS  */}
                            <h1 className='px-1 font-semibold font-serif text-gray-500 mt-10'><MdTag className="inline" /> Additional Details</h1>
                            <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.is_mobile_tower)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.is_hoarding_board)} </div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-semibold text-md'>{nullToNA(applicationFullData?.is_petrol_pump)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm' >{nullToNA(applicationFullData?.is_water_harvesting)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>

                                    </div>
                                </div>
                            </div>

                        </div>

                        </div>


                    </div>

                    {/* UPLOADED DOCUMENT LIST */}
                    <div className="container mx-auto mt-10  px-5  rounded-lg">
                        <h1 className='px-1 font-semibold font-serif text-gray-500 mt-10'><MdTag className="inline" /> Document List</h1>
                        <div className="py-0 shadow-xl mt-3">
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                                <div className="inline-block min-w-full rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead className='bg-white'>
                                            <tr className='font-semibold'>
                                                <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                    #
                                                </th>
                                                <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                    Document Name
                                                </th>
                                                <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                    View
                                                </th>
                                                <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                    Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {docList &&
                                                <>{(docList?.length == 0 && !loader) && <tr className='mt-10 py-20'><td colSpan={5} className="text-center"><span className='bg-red-200 text-sm text-red-400 italic my-4 px-4 py-2 rounded-md shadow-lg '>No Document Found !!</span></td></tr>}
                                                    {
                                                        docList?.map((data, index) => (
                                                            <PilotWorkflowDocumentRow openModal={modalAction} docList={data} index={index} />
                                                        ))
                                                    }
                                                </>}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TC COMPARISON LIST */}
                    {
                        tcComparisonDataList?.length != 0 &&
                        <div className="container mx-auto mt-10  px-5  rounded-lg">
                            <h1 className='px-1 font-semibold font-serif text-gray-500 mt-10'><MdTag className="inline" /> TC Comparison List</h1>
                            <div className="py-0 shadow-xl mt-3">
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead className='bg-white'>
                                                <tr className='font-semibold'>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                        #
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                        Verified By
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                        Verification On
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm ">
                                                        View
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    tcComparisonDataList?.map((data, index) => (
                                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.veryfied_by)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.created_at)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">
                                                                <button onClick={() => navigate(`/tc-comparision/${id}/${data?.agency_verification ? 'agency' : 'ulb'}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* MEMO DETAILS */}
                    {
                        applicationFullData?.memoDtls?.length != 0 &&
                        <div className="container mx-auto mt-10  px-5  rounded-lg">
                            <h1 className='px-1 font-semibold font-serif text-gray-500 mt-10'><MdTag className="inline" /> Memo Details</h1>
                            <div className="py-0 shadow-xl mt-3">
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead className='bg-white'>
                                                <tr className='font-semibold'>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        #
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Memo No.
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Generated On
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Generated By
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        ARV
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Quarterly Tax
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Effect From
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Memo type
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Holding No.
                                                    </th>
                                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                        Action
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    applicationFullData?.memoDtls?.map((data, index) => (
                                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.memo_no)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.memo_date)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.generated_by)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.arv)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.quarterly_tax)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.from_qtr)}/{nullToNA(data?.from_fyear)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.memo_type)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.holding_no)}</td>
                                                            <td className="px-2 py-2 text-sm text-left">
                                                                <button onClick={() => {
                                                                    if (data?.memo_type == 'SAM') {
                                                                        navigate(`/sam-reciept/${data?.id}`)
                                                                    } else {
                                                                        navigate(`/fam-reciept/${data?.id}`)
                                                                    }
                                                                }} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            </div>
            <div className='w-full h-40'></div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-xl border-2 border-gray-50 ml-32 px-0" style={{ 'width': '60vw', 'height': '80vh' }}>
                    <div className="absolute top-10  bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                        <ImCross />
                    </div>
                    <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
                </div>

            </Modal>
        </CustomErrorBoundary>
    )
}

export default SafDetailsEntry