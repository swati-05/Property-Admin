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

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Holding Details')

    ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
    const getApplicationDetail = () => {

        setisLoading(true)

        axios.post(api_getPropHoldingDetailsById, { propertyId: id }, ApiHeader())
            .then(function (response) {
                console.log('view prop prop full details at property ...', response.data.data)
                setapplicationFullData(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
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


    // console.log("appliocation full detail to view", applicationFullData?.owners[0]?.id)
    return (
        <>
            {
                isLoading && <BarLoader />
            }

            <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-2 container mx-auto w-full'>

                <div className="col-span-12 rounded-lg p-4">
                    {/* <h1 className='px-2 font-semibold mt-0 text-center text-gray-600 font-serif py-2 xl md:text-3xl '>PROPERTY DETAILS</h1> */}
                    {/* <TopTabs id={id} safNo={applicationFullData?.saf_no} active="property" application={false} /> */}
                    {applicationFullData?.status == 1 &&
                        <>
                            <TopTabs title={`Holding No. - ${applicationFullData?.new_holding_no == '' ? applicationFullData?.holding_no : applicationFullData?.new_holding_no} `} type="holding" id={id} safNo={''} active="property" />
                            <div className='mt-2 text-right'>
                                <BottomTabsCondition permissionData={permissionData} safId={applicationFullData?.saf_id} />
                            </div>
                        </>
                    }
                    {
                        applicationFullData?.status == 0 &&
                        <div className='pl-4'>
                            <span className='bg-red-500 text px-4 py-1 justify-center items-center font-semibold text-white shadow-xl'><FiInfo className="inline" /> This holding has been deactivated</span>
                        </div>
                    }





                    {/* Basic  details */}
                    <div className='p-4'>
                        <div className=''>
                            <h1 className='px-1 font-semibold font-serif  text-gray-500'><MdTag className="inline" /> Basic Details</h1>
                            <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                                <div className="flex space-x-5 pl-4 ">
                                    <div className='flex-1'>
                                        <div className='font-bold text-sm'>{applicationFullData?.old_ward_no ? applicationFullData?.old_ward_no : "N/A"}</div>
                                        <div className='text-gray-500 text-xs'>Old Ward No.</div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-semibold text-lg'>{applicationFullData?.old_ward_no ? applicationFullData?.old_ward_no : "N/A"}</div>
                                        <div className='text-gray-500 text-xs'>New Ward No</div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-semibold text-md'>{applicationFullData?.ownership_type ? applicationFullData?.ownership_type : "N/A"}</div>
                                        <div className='text-gray-500 text-xs'>Ownership Type</div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-bold text-sm'>{applicationFullData?.property_type ? applicationFullData?.property_type : "N/A"}</div>
                                        <div className='text-gray-500 text-xs'>Property Type</div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-bold text-sm'>{applicationFullData?.zone_mstr_id ? applicationFullData?.zone_mstr_id : "N/A"}</div>
                                        <div className='text-gray-500 text-xs'>Zone</div>
                                    </div>
                                </div>

                                {applicationFullData?.apartment_code && <div className="flex space-x-10  pl-4 mt-4">
                                    <div className='flex-1'>
                                        <div className='font-bold text-sm'>{applicationFullData?.apartment_name ? applicationFullData?.apartment_name : "N/A"} , {applicationFullData?.corr_state}</div>
                                        <div className='text-gray-500 text-xs'>Apartment Name</div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-bold text-sm'>{applicationFullData?.apartment_code ? applicationFullData?.apartment_code : "N/A"} , {applicationFullData?.corr_state}</div>
                                        <div className='text-gray-500 text-xs'>Apartment Code</div>
                                    </div>
                                    <div className='flex-1'>

                                    </div>
                                    <div className='flex-1'>

                                    </div>
                                    <div className='flex-1'>

                                    </div>
                                    <div className='flex-1'>

                                    </div>
                                </div>}
                            </div>

                        </div>

                        {/* Property  details */}
                        <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Property Address & Details</h1>
                        <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                            <div className="flex space-x-10 pl-4 ">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.khata_no ? applicationFullData?.khata_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Khata No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.plot_no ? applicationFullData?.plot_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Plot No</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.village_mauja_name ? applicationFullData?.village_mauja_name : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Village/Mauja Name</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.area_of_plot ? applicationFullData?.area_of_plot : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Area of Plot(decimal)</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.road_type ? applicationFullData?.road_type : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Road Width(ft)</div>
                                </div>
                            </div>

                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.prop_address ? applicationFullData?.prop_address : "N/A"} , {applicationFullData?.prop_state}</div>
                                    <div className='text-gray-500 text-xs'>Property Address</div>
                                </div>
                                {/* <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.prop_city ? applicationFullData?.prop_city : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>City</div>
                                </div> */}
                                {/* <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.prop_dist ? applicationFullData?.prop_dist : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>District</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.prop_state ? applicationFullData?.prop_state : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>State</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.prop_pin_code ? applicationFullData?.prop_pin_code : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Pin</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.prop_address ? applicationFullData?.prop_address : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Locality</div>
                                </div> */}
                            </div>
                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.corr_address ? applicationFullData?.corr_address : "N/A"} , {applicationFullData?.corr_state}</div>
                                    <div className='text-gray-500 text-xs'>Corresponding Address</div>
                                </div>
                            </div>


                            <div></div>
                            {/* coressponding address */}
                            {/* <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                                <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                            </div> */}

                            {/* <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.corr_city ? applicationFullData?.corr_city : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>City</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.corr_dist ? applicationFullData?.corr_dist : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>District</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.corr_state ? applicationFullData?.corr_state : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>State</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.corr_pin_code ? applicationFullData?.corr_pin_code : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Pin</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.corr_address ? applicationFullData?.corr_address : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Locality</div>
                                </div>
                            </div> */}
                        </div>


                        {/* owner details */}
                        <div className='mt-10'>
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
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.owner_name ? items?.owner_name : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.gender ? items?.gender : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.dob ? items?.dob : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.guardian_name ? items?.guardian_name : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.relation_type ? items?.relation_type : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.mobile_no ? items?.mobile_no : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.aadhar_no ? items?.aadhar_no : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.pan_no ? items?.pan_no : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.email ? items?.email : "N/A"}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.is_armed_force == true ? 'yes' : 'No'}</td>
                                                <td className="px-2 py-2 text-left text-gray-500 text-xs">{items?.is_specially_abled == true ? 'yes' : 'No'}</td>

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
                            <div className="flex space-x-10 pl-4 ">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.khata_no ? applicationFullData?.khata_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Electricity K. No</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.elect_acc_no ? applicationFullData?.elect_acc_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>ACC No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.elect_bind_book_no ? applicationFullData?.elect_bind_book_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>BIND/BOOK No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.elect_cons_category ? applicationFullData?.elect_cons_category : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Electricity Consumer Category</div>
                                </div>
                                <div className='flex-1'>

                                </div>
                            </div>

                        </div>

                        {/* BUILDING DETAILS */}
                        <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Building Details</h1>
                        <div className='py-6  mt-2 bg-white shadow-xl rounded-lg p-4'>
                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.building_plan_approval_no ? applicationFullData?.building_plan_approval_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Building Plan Approval No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.building_plan_approval_date ? applicationFullData?.building_plan_approval_date : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Building Plan Approval Date</div>
                                </div>

                                <div className='flex-1'>

                                </div>
                                <div className='flex-1'>

                                </div>
                                <div className='flex-1'>

                                </div>
                            </div>
                        </div>

                        {/* WATER DETAILS */}
                        <h1 className='px-1 font-semibold font-serif mt-10 text-gray-500'><MdTag className="inline" /> Water Details</h1>
                        <div className='py-6  mt-2 bg-white shadow-xl rounded-lg p-4'>

                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.khata_no ? applicationFullData?.khata_no : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Water Consumer No.</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.water_conn_date ? applicationFullData?.water_conn_date : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Water Connection Date</div>
                                </div>
                                <div className='flex-1'>

                                </div>
                                <div className='flex-1'>

                                </div>
                                <div className='flex-1'>

                                </div>
                            </div>
                        </div>




                        {/* floor details */}
                        <div className='mt-10'>
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

                                    <>

                                        <tr className="bg-white shadow-xl border-b border-gray-200">
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">#</td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.floor_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.usage_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.occupancy_type}</option>
                                                        ))
                                                    }
                                                </select>

                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.construction_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.builtup_area}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.date_from}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="px-2 py-2 text-left text-gray-500 text-xs">
                                                <select className="appearance-none form-control block w-full  py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer "
                                                    aria-describedby="emailHelp"  >

                                                    {
                                                        applicationFullData?.floors?.map((data) => (

                                                            <option key={`floorName${data.id}`} value={data.id}>{data.date_upto}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>

                                        </tr>

                                    </>



                                </tbody>
                            </table>
                        </div>


                        {/* ADDITIONAL DETAILS  */}

                        <h1 className='px-1 font-semibold font-serif text-gray-500 mt-10'><MdTag className="inline" /> Additional Details</h1>
                        <div className='py-6 mt-2 bg-white rounded-lg shadow-xl p-4'>
                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1'>
                                    <div className='font-bold text-sm'>{applicationFullData?.is_mobile_tower ? applicationFullData?.is_mobile_tower : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.is_hoarding_board ? applicationFullData?.is_hoarding_board : "N/A"} </div>
                                    <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-semibold text-md'>{applicationFullData?.is_petrol_pump ? applicationFullData?.is_petrol_pump : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
                                </div>
                                <div className='flex-1'>
                                    <div className='font-bold text-sm' >{applicationFullData?.is_water_harvesting ? applicationFullData?.is_water_harvesting : "N/A"}</div>
                                    <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
                                </div>
                                <div className='flex-1'>

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