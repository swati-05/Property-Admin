import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import * as yup from 'yup'
import { useFormik } from 'formik'
import moment from 'moment'

import { useNavigate, useParams } from 'react-router-dom';
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import PropertyApiList from '@/Components/ApiList/PropertyApiList';
import TopTabs from './TopTabs';
import BarLoader from '@/Components/Common/BarLoader';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import { contextVar } from '@/Components/Context/Context';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import TopTabsCluster from './TopTabsCluster';




function ClusterHoldingTransactionHistory(props) {

    const [readyMadeListData, setreadyMadeListData] = useState();
    const [isLoading, setisLoading] = useState(false);
    const [applicationFullData, setapplicationFullData] = useState()
    const [submitButtonStatus, setSubmitButtonStatus] = useState(true)
    const [readyMadeListStatus, setreadyMadeListStatus] = useState(false);

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Cluster Holding Payment History')



    const { id } = useParams()

    const navigate = useNavigate()

    // LIST OF API'S
    const { api_getSpecificHoldingTranscationHistory, } = CitizenApplyApiList()
    const { api_getPropHoldingDetailsById } = PropertyApiList()

    const transactionRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getTranscationHistory: { method: 'get', url: api_getSpecificHoldingTranscationHistory },
        },
        transactionInfo: {
            title: '',
        },

        tableColumns: [
            {
                Header: "#",
                Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
            },
            {
                Header: "Application No.",
                accessor: "saf_no",
            },
            {
                Header: "Transaction No.",
                accessor: "tran_no",
            },
            {
                Header: "Payment Mode",
                accessor: "payment_mode",
            },
            {
                Header: "Transaction Date",
                accessor: "created_at",
            },
            {
                Header: "Amount",
                accessor: "amount",
            }
        ],
        filters: {
            // PASS true IF YOU WANT TO SEARCH TRANSACTIONS VIA APPLICATION NO ALSO
            applicationNo: true
        }
    }



    console.log('passed api at inbox list hello bellow...', transactionRules)
    console.log('passed api at inbox col...', transactionRules?.tableColumns)
    let columnSchema = [...transactionRules?.tableColumns]

    const validationSchema = yup.object({
        fromDate: yup.string().required('Select from date'),
        toDate: yup.string().required('Select to date'),
    })
    const formik = useFormik({
        initialValues: {
            fromDate: moment(new Date()).format('yy-MM-DD'),
            toDate: moment(new Date()).format('yy-MM-DD'),
            consumerCategory: '',
            consumerType: '',
            buildingType: '',
            paymentMode: '',
            wardNo: '',
            tcId: ''

        },

        onSubmit: (values) => {

            setSubmitButtonStatus(false)
            fetchTranscationList(formik.values.fromDate, formik.values.toDate)
        }
        , validationSchema
    })

    useEffect(() => {
        console.log('fethcing in useEffect')
        fetchTranscationList();
    }, [])

    const fetchTranscationList = () => {
        setreadyMadeListStatus(false)
        setisLoading(true)
        let requestBody = {
            propId: id
        }

        console.log('before fetch factory data')
        axios.post(api_getSpecificHoldingTranscationHistory, requestBody, ApiHeader())
            .then(function (response) {
                console.log("all transcation list at holding specific----- ", response.data);

                setreadyMadeListData(response?.data?.data)
                setreadyMadeListStatus(true)
                setisLoading(false)


            })
            .catch(function (error) {
                console.log('error at transactions fetch ', error);
                setreadyMadeListStatus(true)
                setisLoading(false)
            })

    }

    const getApplicationDetail = () => {

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
        axios.post(`${api_getPropHoldingDetailsById}`,
            {
                propertyId: id
            },
            header)
            .then(function (response) {
                console.log('view prop prop full details...', response.data.data)
                setapplicationFullData(response.data.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 details by id error...', error)
                setisLoading(false)
            })
    }

    useEffect(() => {
        getApplicationDetail()
    }, [])
    return (
        <>
            <div className='w-ful md:px-10 md:pt-5 mx-auto'>
                {transactionRules?.transactionInfo.title != '' && <div className='px-1 font-semibold font-serif text-2xl '>{transactionRules?.transactionInfo?.title}</div>}
                {/* <div className='text-xs opacity-60'>(select ward above to get collection in specific ward)</div> */}
                <TopTabsCluster title={`Payment History`} type="holding" id={id} safNo={''} active="payment" />
                <div className=''>
                    <div className='py-6 mt-2 bg-white rounded-lg shadow-lg p-4'>
                        <div className="flex space-x-5 pl-4 ">
                            <div className='flex-1'>
                                <div className='font-bold text-sm'>{applicationFullData?.old_ward_no ? applicationFullData?.old_ward_no : "N/A"}</div>
                                <div className='text-gray-500 text-xs'>Ward No.</div>
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

                {isLoading && (
                    <BarLoader />
                )}
                {
                    readyMadeListData?.length == 0 &&
                    <div className='text-center mt-10'>
                        <span className='text-red-600 font-bold text-lg px-4 py-2 border border-red-500  shadow-xl '> No Payments Found Yet</span>
                    </div>
                }
                {
                    readyMadeListData?.length != 0 &&
                    <div className='mt-10 bg-white shadow-xl  rounded-lg'>

                        <table className='min-w-full leading-normal mt-2'>
                            <thead className='font-bold text-left text-sm bg-white text-gray-900'>
                                <tr>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Tansaction No</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Payment Mode</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Date</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">From Qtr/Year</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Upto Qtr/Year</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Amount</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Action</th>

                                </tr>
                            </thead>
                            <tbody className="text-sm">


                                {readyMadeListData?.Holding?.map((data, index) => (
                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.tran_no}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.payment_mode}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.tran_date}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.from_qtr}/{data?.from_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.to_qtr}/{data?.to_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.amount}</td>
                                        <td className="px-2 py-2 text-sm text-left">
                                            <button onClick={() => navigate(`/paymentReceipt/${data?.tran_no}/holding`)} type="button" className="cypress_owner_add_update px-2 py-2.5 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View Receipt</button>
                                        </td>

                                    </tr>
                                ))
                                }
                                {readyMadeListData?.Saf?.map((data, index) => (
                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.tran_no}
                                            <span className='bg-indigo-500 text-white text-xs px-2 rounded-sm ml-2'>SAF</span>
                                        </td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.payment_mode}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.tran_date}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.from_qtr}/{data?.from_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.to_qtr}/{data?.to_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{data?.amount}</td>
                                        <td className="px-2 py-2 text-sm text-left">
                                            <button onClick={() => navigate(`/paymentReceipt/${data?.tran_no}/saf`)} type="button" className="cypress_owner_add_update px-2 py-2.5 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight capitalize rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer">View Receipt</button>
                                        </td>

                                    </tr>
                                ))
                                }


                            </tbody>
                        </table>
                    </div>
                }

                <div className='mt-10'>
                    <button onClick={() => navigate(`/viewDemandHoldingProperty/${id}`)} type="button" className="float-right px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Pay</button>
                </div>
                <div className='w-full h-40'></div>
            </div>
        </>
    )
}

export default ClusterHoldingTransactionHistory