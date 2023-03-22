import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import moment from 'moment'
import ListTable from '@/Components/Common/ListTable/ListTable';
import CashVerificationDetailedModal from './CashVerificationDetailedModal';
import WaterApiList from '@/Components/ApiList/WaterApiList';
import { id } from 'date-fns/locale';
import BarLoader from '@/Components/Common/BarLoader';

const CashVerificationIndex = (props) => {
    const [openVewMOdel, setOpenVewMOdel] = useState(0)
    const [employeeList, setEmployeeList] = useState()
    const [fetchedData, setFetchedData] = useState()
    const [sendDataInModal, setSendDataInModal] = useState()
    const [reportType, setReportType] = useState(1)
    const [url, setUrl] = useState()
    const [loader, setLoader] = useState(false)


    let testDate = new Date().toLocaleDateString('in-IN');
    let todayDate = moment(testDate).format('YYYY-DD-MM');

    const { api_listofEmployees, api_listUnverifiedCashVerification, api_listVerifiedCashVerification, header } = WaterApiList()

    useEffect(() => {
        if (reportType == 1) {
            setUrl(api_listUnverifiedCashVerification)
        }
        if (reportType == 2) {
            setUrl(api_listVerifiedCashVerification)
        }

    }, [reportType])

    const handleViewBtn = (id, date, name) => {
        console.log("View Clicked", id, date, name)
        setSendDataInModal({ "id": id, "date": date })
        setOpenVewMOdel(prev => prev + 1)
    }

    useEffect(() => {
        axios.post(api_listofEmployees, {}, header)
            .then((res) => {
                // console.log("here is list of employees", res)
                setEmployeeList(res.data.data)
            })
            .catch((err) => console.log("Error while getting employee list", err))
    }, [])


    const COLUMNS = [
        {
            Header: 'Sl.',
            Cell: ({ row }) => (
                <div className='px-2 font-semibold'>{row.index + 1}.</div>
            )
        },
        {
            Header: "EmployeeName",
            accessor: "user_name",
        },
        {
            Header: "Property.",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.property}</span>)
        },
        {
            Header: "GBSAF.",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.GB_saf}</span>)
        },
        {
            Header: "Water",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.water}</span>)
        },
        {
            Header: "Trade",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.trade}</span>)
        },
        {
            Header: "Total Amount",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.total}</span>)
        },
        {
            Header: "Paid Date",
            accessor: "date",
        },
        {
            Header: 'Status',
            accessor: 'is_verified',
            Cell: ({ cell }) => (
                <div>
                    <div> {cell.row.values.is_verified == true && <div className='bg-green-300 text-gray-700 rounded-full text-center py-0.5'>Verified</div>} </div>
                    <div> {cell.row.values.is_verified == false && <div className='bg-red-300 text-gray-700 rounded-full text-center py-0.5'>Not Verified</div>} </div>
                </div>
            )
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: ({ cell }) => (
                <button
                    onClick={() =>
                        handleViewBtn(cell.row.values.id, cell.row.values.date, cell.row.values.user_name)
                    }
                    className="bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm"
                >
                    View
                </button>
            ),
        },
        {
            Header: "Verified Amount",
            Cell: ({ cell }) => (<span> ₹ {cell.row.original.verified_amount}</span>)
        },
        {
            Header: "Verified Date",
            accessor: "verify_date",
        },
    ]

    const searchData = (data) => {
        setLoader(true)
        const payload = {
            "date": data.collectionDate,
            "id": data.empName
        }

        axios.post(url, payload, header)
            .then((res) => {
                setLoader(false)
                console.log("response list cash", res)
                setFetchedData(res.data.data)
            })
            .catch((err) => {
                setLoader(false)
                console.log("Error while list cash verification", err)
            })
    }



    // ===========> Formik Start

    const validationSchema = yup.object({
        collectionDate: yup.string().required('Select Date'),
        empName: yup.string().required('Select Employee'),
    })
    const handleOnChange = (event) => { };
    const formik = useFormik({
        initialValues: {
            empName: '',
            collectionDate: '',
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            searchData(values)
        },
        // validationSchema,
    });

    // ===========> Formik End


    return (
        <>
            {loader && <BarLoader />}
            <CashVerificationDetailedModal openAddPopUP={openVewMOdel} data={sendDataInModal} />
            <div className='m-2 bg-white'>

                <div className='border border-gray-100 bg-indigo-100 shadow-md rounded'>

                    <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>

                        <div className='px-3 py-3'>
                            <div className='text-left'>
                                <h1 className='mb-3 text-2xl font-semibold'>Cash Verification</h1>
                            </div>

                            <div className='grid grid-cols-12 space-x-10'>
                                <div className='col-span-3'>
                                    <p className='py-1 text-base font-semibold'>Select Date <span className='text-red-400'>*</span></p>
                                    <input
                                        onChange={formik.handleChange}
                                        name="collectionDate"
                                        className="w-full rounded border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                        type="date"
                                        // defaultValue="2023-10-01"
                                        defaultValue={todayDate}
                                    />
                                    <p className='text-red-500 text-xs font-semibold absolute'> {formik.touched.collectionDate && formik.errors.collectionDate ? formik.errors.collectionDate : null}</p>
                                </div>

                                <div className='col-span-3'>
                                    <p className='py-1 text-base font-semibold'>Select Employee <span className='text-red-400'>*</span></p>
                                    <select
                                        onChange={formik.handleChange}
                                        className="w-full rounded border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                        placeholder="Enter New Taluka"
                                        type="text"
                                        name="empName"
                                    >
                                        <option value="">All</option>
                                        {
                                            employeeList?.map((item, i) => {
                                                return <option value={item.id}>{item.user_name}</option>
                                            })
                                        }
                                    </select>
                                    <p className='text-red-500 text-xs font-semibold absolute'> {formik.touched.empName && formik.errors.empName ? formik.errors.empName : null}</p>
                                </div>
                                <div className='col-span-3'>
                                    <p className='py-1 text-base font-semibold'>Report Type <span className='text-red-400'>*</span></p>
                                    <select
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-full rounded border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                        placeholder="Enter New Taluka"
                                        type="text"
                                        name="reportType"
                                    >
                                        <option value="1">UnVerified</option>
                                        <option value="2">Verified</option>

                                    </select>
                                </div>
                                <div className='col-span-3 mt-7 w-full'>
                                    <button type="submit" class="w-full py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">Search</button>
                                </div>

                            </div>

                        </div>
                    </form>
                </div>

                <p className=' mx-10 py-5'></p>
                <div className='my-5 mx-2'>
                    {fetchedData?.length == 0 ? <p className='text-center font-semibold -mt-8'>No Data Found !</p> :
                        <>{fetchedData ? <ListTable columns={COLUMNS} dataList={fetchedData} /> : <p className='text-center font-semibold -mt-8'>Please Choose Date and User</p>} </>
                    }
                </div>
            </div>

        </>
    )
}

export default CashVerificationIndex