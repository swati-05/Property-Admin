//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Home
//    DESCRIPTION - Home Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useRef } from 'react'
import role from '@/Components/Media/role.png'
import { MdTag } from 'react-icons/md'
import { GiMoneyStack } from 'react-icons/gi'
import { Tooltip } from 'react-tooltip'
import { allowNumberInput } from '@/Components/PowerUps/PowerupFunctions'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import ApiHeader2 from '@/Components/ApiList/ApiHeader2'
import BarLoader from '@/Components/Loaders/BarLoader'
import axios from 'axios'
import { useToast } from '@/Components/GlobalData/useSetGlobalData'

function PropertyHome() {
    const [currenRoleView, setcurrenRoleView] = useState(role)
    const [isLoading, setisLoading] = useState(false)
    const [currentRole, setcurrentRole] = useState('jsk')
    const [landingDashboardData, setlandingDashboardData] = useState()
    const [landingDashboardCardData, setlandingDashboardCardData] = useState()
    const [activeApplicationType, setactiveApplicationType] = useState('saf')
    const imageRef = useRef()
    const { api_landingDashboard, api_landingDashboardCard } = ProjectApiList()
    const notify = useToast()

    // ROLES TO CHANGE VIEW ACCORDING TO ROLES
    const roles = {

        // 1 JSK VIEW
        jsk: {
            cardList: [
                { title: "Today's Applied Applications", value: 200 },
                { title: "Today's Collection Amount", value: 200 },
                { title: "Cash Amount", value: 200 },
                { title: "Cheque Amount", value: 200 },
                { title: "DD Amount", value: 200 },
                { title: "Online Amount", value: 200 },
            ]
        },

        // 2 BACK OFFICE VIEW
        bo: {
            cardList: [
                { title: "Today's Recevied Applications", value: 200 },
                { title: "Today's Forwarded Applications", value: 200 },
                { title: "Today's Re-Forwarded Applications", value: 200 },
                { title: "Total Pending Applications", value: 200 },
            ]
        },

        // 3 DEALING ASSISTANT VIEW
        da: {
            cardList: [
                { title: "Today's Recevied Applications", value: 200 },
                { title: "Today's Forwarded Applications", value: 200 },
                { title: "Today's Re-Forwarded Applications", value: 200 },
                { title: "Total Pending Applications", value: 200 },
            ]
        },

        // 4 SECTION INCHARGE VIEW
        si: {
            cardList: [
                { title: "Today's Recevied Applications", value: 200 },
                { title: "Today's Forwarded Applications", value: 200 },
                { title: "Today's Re-Forwarded Applications", value: 200 },
                { title: "Total Pending Applications", value: 200 },
            ]
        },

        // 5 EXECUTIVE OFFICER VIEW
        eo: {
            cardList: [
                { title: "Today's Recevied Applications", value: 200 },
                { title: "Today's Forwarded Applications", value: 200 },
                { title: "Today's Re-Forwarded Applications", value: 200 },
                { title: "Total Pending Applications", value: 200 },
            ]
        }
    }

    // SETTING ROLE VIEW VIA ROLES
    const setViewByRoles = () => {
        setcurrenRoleView(roles?.jsk)
    }

    useEffect(() => {
        // SET VIEW VIA LOGIN ROLE BUT NOW DIRECT
        // return
        setViewByRoles()
        fetchLandingDashboardData('saf')
        fetchLandingDashboardCard()
    }, [])

    // FUNCTION TO FETCH LANDING DASHBOARD RECENT APPLIED APPLICATIONS AND RECENT PAYMENTS
    const fetchLandingDashboardData = (applicationType) => {
        setisLoading(true)

        setactiveApplicationType(applicationType)
        let requestBody
        // IF APPLICATION TYPE IS SAF THN NO NEED TO SEND APPLICATION TYPE
        if (applicationType == 'saf') {
            requestBody = {
            }
        } else {
            requestBody = {
                applicationType: applicationType
            }
        }
        axios.post(api_landingDashboard, requestBody, ApiHeader2())
            .then(function (response) {
                console.log('JskDashboardData', response.data)
                setlandingDashboardData(response?.data?.data)
                setisLoading(false)

            })
            .catch(function (error) {
                setisLoading(false)
                notify('Network Problem', 'error')
                console.log('errorrr.... ', error);
            })
    }

    // FUNCTION TO FETCH LANDING DASHBOARD CARD DATA
    const fetchLandingDashboardCard = () => {
        let requestBody = {

        }
        axios.post(api_landingDashboardCard, requestBody, ApiHeader2())
            .then(function (response) {
                console.log('JskDashboard card', response.data)
                setlandingDashboardCardData(response?.data?.data)
                setisLoading(false)

            })
            .catch(function (error) {
                setisLoading(false)
                notify('Network Problem', 'error')
                console.log('errorrr.... ', error);
            })
    }

    return (
        <>
            {
                isLoading && <div className='inline'>
                    <BarLoader />
                </div>
            }



            <div className='grid grid-cols-12 mt-10'>
                {
                    <>
                        {landingDashboardCardData?.totalAppliedApplication != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalAppliedApplication}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Applied Application
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalCollection != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalCollection}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Collection Amount
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalCash != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalCash}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Cash
                                    </p>
                                </div>
                            </div>
                        </div>}

                        {/* // SPACER */}
                        <div className='col-span-12 my-2'></div>

                        {landingDashboardCardData?.totalCheque != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalCheque}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Cheque
                                    </p>
                                </div>
                            </div>
                        </div>}


                        {landingDashboardCardData?.totalDD != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalDD}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total DD
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalOnline != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalOnline}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Online
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalReceivedApplication != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalReceivedApplication}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Application Received
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalForwardedApplication != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalForwardedApplication}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Applicaton Forwarded
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalApprovedApplication != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalApprovedApplication}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Application Approved
                                    </p>
                                </div>
                            </div>
                        </div>}
                        {landingDashboardCardData?.totalRejectedApplication != undefined && <div className={` relative cursor-pointer transition-all duration-500 col-span-6 md:col-span-4 pr-20 `} >
                            <Tooltip anchorId={`card${1}`} />
                            <div id={`card${1}`} data-tooltip-content={1} className='w-full h-full bg-white shadow-xl flex rounded-lg'>
                                <div className='flex-initial flex justify-center items-center pl-4 pr-2'><GiMoneyStack className="block text-2xl" /></div>
                                <div className="px-6 py-2 md:py-7 flex-1">
                                    <div className="font-bold text-lg md:text-xl">{landingDashboardCardData?.totalRejectedApplication}</div>
                                    <p className="text-gray-700 text-sm w-full">
                                        Total Application Rejected
                                    </p>
                                </div>
                            </div>
                        </div>}

                    </>
                }

            </div>

            <div>
                <div className='px-1 font-semibold  text-gray-500 mt-10 google-roboto'>

                    <div className="flex-initial">
                        <MdTag className="inline" /> Recent Applications
                    </div>

                </div>
                <div className="mt-4 px-4">
                    <div className="w-full flex">
                        <button className={`mr-4 ${activeApplicationType == 'saf' ? 'bg-indigo-500 text-white' : 'border border-indigo-500 text-indigo-500'} bg-white  px-2 py-0.5 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => fetchLandingDashboardData('saf')}>SAF</button>

                        <button className={`mr-4 ${activeApplicationType == 'Concession' ? 'bg-indigo-500 text-white' : 'border border-indigo-500 text-indigo-500'} bg-white  px-2 py-0.5 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => fetchLandingDashboardData('Concession')}>Concession</button>

                        <button className={`mr-4 ${activeApplicationType == 'Harvesting' ? 'bg-indigo-500 text-white' : 'border border-indigo-500 text-indigo-500'} bg-white  px-2 py-0.5 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => fetchLandingDashboardData('Harvesting')}>Harvesting</button>
                        <button className={`mr-4 ${activeApplicationType == 'Objection' ? 'bg-indigo-500 text-white' : 'border border-indigo-500 text-indigo-500'} bg-white  px-2 py-0.5 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => fetchLandingDashboardData('Objection')}>Objection</button>
                        <button className={`mr-4 ${activeApplicationType == 'Deactivation' ? 'bg-indigo-500 text-white' : 'border border-indigo-500 text-indigo-500'} bg-white  px-2 py-0.5 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => fetchLandingDashboardData('Deactivation')}>Deactivation</button>
                    </div>
                </div>
            </div>

            {/* {
                jskDashboardData?.recentApplications?.length != 0 && */}
            <>
                <div className="container mx-auto mt-2  rounded-lg">

                    <div className="py-0 shadow-xl mt-3">

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto w-full">
                            <div className="inline-block min-w-full rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead className='bg-indigo-50'>
                                        <tr className='font-semibold'>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                #
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Application No.
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Applicant Name
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Assessment Type
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Apply Date
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {landingDashboardData?.recentApplications?.length != 0 &&
                                            landingDashboardData?.recentApplications?.map((data, index) => (
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.applicationNo}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.applicantname}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.assessmentType}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.applyDate}</td>

                                                    {/* <td className="px-2 py-2 text-sm text-left">
                                                        <button onClick={() => navigate(`/tc-comparision/${id}/${data?.agency_verification ? 'agency' : 'ulb'}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button>
                                                    </td> */}
                                                </tr>
                                            ))
                                        }
                                        {
                                            landingDashboardData?.recentApplications?.length == 0 &&
                                            <tr><td colSpan={5} className="text-center text-red-500 font-semibold py-4">No Application Found</td></tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='w-full text-right mt-5'>
                        <Tooltip anchorId="button-3" />
                        <button id="button-3" data-tooltip-content="Click to view application history." className="cypress_floor_add_update text-white px-4 py-2 bg-indigo-500 font-medium border text-xs leading-tight capitalize rounded-sm shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">View All</button>
                    </div> */}
            </>
            {/* } */}

            <>
                <div className="container mx-auto mt-10 rounded-lg">
                    <div className='px-1 font-semibold  text-gray-500 mt-10 google-roboto'>

                        <div className="flex-initial">
                            <MdTag className="inline" /> Recent Payments
                        </div>
                        <div className="flex-1 float-right">
                            {/* <div className="w-full flex justify-end">
                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>SAF</button>

                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>Concession</button>
                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>Mutation</button>
                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>Harvesting</button>
                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>Objection</button>
                                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate('')}>Deactivation</button>
                                </div> */}
                        </div>
                    </div>
                    <div className="py-0 shadow-xl mt-3">
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                            <div className="inline-block min-w-full rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead className='bg-indigo-50'>
                                        <tr className='font-semibold'>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                #
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Transaction No.
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Payment Mode
                                            </th>
                                            <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm">
                                                Date
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {landingDashboardData?.recentPayments?.length != 0 &&
                                            landingDashboardData?.recentPayments?.map((data, index) => (
                                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.transactionNo}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.amount}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.paymentMode}</td>
                                                    <td className="px-2 py-2 text-sm text-left">{data?.transactionDate}</td>

                                                    {/* <td className="px-2 py-2 text-sm text-left">
                                                        <button onClick={() => navigate(`/tc-comparision/${id}/${data?.agency_verification ? 'agency' : 'ulb'}`)} type="button" className="cypress_owner_add_update px-4 py-2 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View</button>
                                                    </td> */}
                                                </tr>
                                            ))
                                        }
                                        {
                                            landingDashboardData?.recentPayments?.length == 0 &&
                                            <tr><td colSpan={5} className="text-center text-red-500 font-semibold py-4">No Payment Found</td></tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='w-full text-right mt-5'>
                        <Tooltip anchorId="button-4" />
                        <button id="button-4" data-tooltip-content="Click to view payment history." className="cypress_floor_add_update text-white px-4 py-2 bg-indigo-500 font-medium border text-xs leading-tight capitalize rounded-sm shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">View All</button>
                    </div> */}
            </>


        </>
    )
}

export default PropertyHome
/**
 * Exported to :
 * 1. App.js
 * 
 */