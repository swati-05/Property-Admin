import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import TopTabs from './TopTabs'
import BarLoader from '@/Components/Common/BarLoader'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import BottomTabs from './BottomTabs'
import { MdTag } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { contextVar } from '@/Components/Context/Context'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { FiInfo } from 'react-icons/fi'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import BottomTabsCondition from './BottomTabsCondition'
import BrandLoader from '@/Components/Common/BrandLoader'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'

// import brief from '@/Components/Media/brief'
// import home from '@/Components/Media/home'
// import user from '@/Components/Media/user'
// import apartment from '@/Components/Media/apartment'


function PropApplicationFullDetail_Property() {

    /////////{***✅ application full detail ...***}///////
    const { id } = useParams()
    console.log("param", id)

    const navigate = useNavigate()

    const location = useLocation()
    console.log('last url.......', window.history.back)

    const { api_getPropHoldingDetailsById } = PropertyApiList()
    const { api_getPermissionByUser } = ProjectApiList()
    const [applicationFullData, setapplicationFullData] = useState()
    const [isLoading, setisLoading] = useState(false);
    const [permissionData, setpermissionData] = useState(null);
    const [erroState, seterroState] = useState(false);


    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Holding Details')

    ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
    const getApplicationDetail = () => {
        seterroState(false)
        setisLoading(true)

        axios.post(api_getPropHoldingDetailsById, { propertyId: id }, ApiHeader())
            .then(function (response) {
                console.log('view prop prop full details at property ...', response.data.data)
                if (response?.data?.status) {
                    setapplicationFullData(response.data.data)
                    setisLoading(false)
                } else {
                    seterroState(true)
                }
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                seterroState(true)
                setisLoading(false)
            })
    }

    // FUNCTION TO FETCH PERMISSIONS BY USER
    const fetchPermission = () => {

        // setisLoading(true)
        const requestBody = {
            module: 1
        }

        console.log('before permission fetch...', requestBody)
        axios.post(api_getPermissionByUser, requestBody, ApiHeader())
            .then(function (response) {
                console.log('after permission response ...', response.data.data)
                setpermissionData(response.data.data)
                // setisLoading(false)
            })
            .catch(function (error) {
                console.log('after permission error...', error)
                // setisLoading(false)
            })
    }

    useEffect(() => {
        getApplicationDetail()
        fetchPermission()
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


    // console.log("appliocation full detail to view", applicationFullData?.owners[0]?.id)
    return (
        <>

            <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-2 container mx-auto w-full overflow-x-auto'>

                <div className="col-span-12 rounded-lg p-4">
                    {/* <h1 className='px-2 font-semibold mt-0 text-center text-gray-600 font-serif py-2 xl md:text-3xl '>PROPERTY DETAILS</h1> */}
                    {/* <TopTabs id={id} safNo={applicationFullData?.saf_no} active="property" application={false} /> */}
                    {applicationFullData?.active_status == 1 &&
                        <>
                            <TopTabs title={`Holding No. - ${applicationFullData?.new_holding_no == '' ? applicationFullData?.holding_no : applicationFullData?.new_holding_no} `} type="holding" id={id} safNo={''} active="property" />
                            <div className='mt-2 sm:text-right'>
                                <BottomTabsCondition permissionData={permissionData} safId={applicationFullData?.saf_id} />
                            </div>
                        </>
                    }
                    {
                        applicationFullData?.active_status == 0 &&
                        <div className='pl-4'>
                            <span className='bg-red-500 text px-4 py-1 justify-center items-center font-semibold text-white shadow-xl'><FiInfo className="inline" /> This holding has been deactivated</span>
                        </div>
                    }





                    {/* Basic  details */}
                    <div className='p-2 md:p-4'>
                        <div className=''>
                            <h1 className='px-1 font-semibold font-serif  text-gray-500'><MdTag className="inline" /> Basic Details</h1>
                            <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                                <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4  ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.new_holding_no == '' ? nullToNA(applicationFullData?.holding_no) : nullToNA(applicationFullData?.new_holding_no)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Holding no.</div>
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

                                {applicationFullData?.apartment_code && <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.apartment_name)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Apartment Name</div>
                                    </div>
                                    <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                        <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.apartment_code)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                        <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Apartment Code</div>
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
                                {/* <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.prop_city ? applicationFullData?.prop_city : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>City</div>
                                </div> */}
                                {/* <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.prop_dist ? applicationFullData?.prop_dist : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>District</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.prop_state ? applicationFullData?.prop_state : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>State</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.prop_pin_code ? applicationFullData?.prop_pin_code : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Pin</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.prop_address ? applicationFullData?.prop_address : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Locality</div>
                                </div> */}
                            </div>
                            <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.corr_address)} , {nullToNA(applicationFullData?.corr_state)}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Corresponding Address</div>
                                </div>
                            </div>


                            <div></div>
                            {/* coressponding address */}
                            {/* <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                                <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                            </div> */}

                            {/* <div className="flex md:flex-row flex-col gap-y-2 md:space-x-5 pl-4 ">
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.corr_city ? applicationFullData?.corr_city : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>City</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.corr_dist ? applicationFullData?.corr_dist : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>District</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.corr_state ? applicationFullData?.corr_state : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>State</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.corr_pin_code ? applicationFullData?.corr_pin_code : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Pin</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.corr_address ? applicationFullData?.corr_address : "N/A"}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Locality</div>
                                </div>
                            </div> */}
                        </div>


                        {/* owner details */}
                        <div className='mt-10 md:w-auto w-[100vw] overflow-x-auto pr-4'>
                            <h1 className='px-1 font-semibold font-serif text-gray-500'><MdTag className="inline" /> Owner Details</h1>

                            <table className='min-w-full leading-normal mt-2 bg-white rounded-lg shadow-xl p-4'>
                                <thead className='font-bold text-left text-sm border text-gray-800 bg-white'>
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
                                        {applicationFullData?.owners?.map((items) => (
                                            <tr className="bg-white shadow-xl border-b border-gray-200">
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">#</td>
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
                            <div className="flex md:flex-row flex-col gap-y-2 md:space-x-10 pl-4 ">
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
                        <div className='mt-10 md:w-auto w-[100vw] overflow-x-auto  pr-6'>
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
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{applicationFullData?.is_mobile_tower == 1 ? 'Yes' : 'No'}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.is_hoarding_board == 1 ? 'Yes' : 'No'} </div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-semibold text-md'>{applicationFullData?.is_petrol_pump == 1 ? 'Yes' : 'No'}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm' >{applicationFullData?.is_water_harvesting == 1 ? 'Yes' : 'No'}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                                </div>
                                <div className='md:flex-1 md:block flex flex-row-reverse justify-between'>
                                    <div className='md:w-auto w-[50%] font-bold text-sm'>{nullToNA(applicationFullData?.zone_mstr_id)}</div>
                                    <div className='md:w-auto w-[50%] text-gray-500 text-xs'>Zone</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div className='mt-6'>
                        <BottomTabs safId={applicationFullData?.saf_id} />
                    </div> */}

                </div>


            </div>
            <div className='w-full h-60'></div>
        </>
    )
}

export default PropApplicationFullDetail_Property