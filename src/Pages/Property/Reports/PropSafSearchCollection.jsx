import { useFormik } from 'formik'
import React, { lazy } from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
// import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'
import { indianAmount, nullToNA, nullToZero } from '@/Components/Common/PowerUps/PowerupFunctions'
import moment from 'moment'
import BarLoader from '@/Components/Common/BarLoader'
import Modal from "react-modal";
const ListTableConnect = lazy(() => import('@/Components/Common/ListTableCustom/ListTableConnect'))

const PropSafSearchCollection = () => {

    const { get_MasterData, get_collectorList, searchCollection, getCollectionData, get_taxCollectorList, searchPropertyCollection, searchSafCollection, searchGbSafCollection } = PropertyApiList()

    // const {type} = useParams()

    const navigate = useNavigate()

    const [modalIsOpen, setIsOpen] = useState(false);
    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [collectionData, setcollectionData] = useState(null)
    const [dataList, setdataList] = useState(null)
    const [totalAmount, settotalAmount] = useState(0)
    const [loader, setloader] = useState(false)
    const [collection, setcollection] = useState('')
    const [index, setindex] = useState(null)
    const [requestBody, setrequestBody] = useState(null)// create this for list table connect
    const [changeData, setchangeData] = useState(0)// create this for list table connect

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    let testDate = new Date().toLocaleDateString('in-IN');
    let todayDate = moment(testDate).format('DD-MM-YYYY');

    let title;
    // type == 'property' && (title = 'Property Collection Report')
    // type == 'saf' && (title = 'SAF Collection Report')
    // type == 'gbSaf' && (title = 'GB SAF Collection Report')


    useSetTitle('Collection Report')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const validationSchema = yup.object({
        fromDate: yup.string().required('Field Required'),
        uptoDate: yup.string().required('Field Required'),
        collType: yup.array().min(1, 'Check atleast one')
            .of(yup.string().required('Array items must be non-empty strings')),
        // wardId : yup.string().required('Field Required'),
        // userId : yup.string().required('Field Required'),
        // paymentMode : yup.string().required('Field Required'),
    })

    let initialVal;

    // if(type == 'gbSaf'){
    //     initialVal = {
    //         fromDate : '',
    //         uptoDate : '',
    //         collType : '',
    //         wardId : '',
    //         paymentMode: ''
    // }
    // } else {
    //     initialVal ={
    //         fromDate : '',
    //         uptoDate : '',
    //         collType : '',
    //         wardId : '',
    //         userId : '',
    //         paymentMode: ''
    // }
    // } 

    const formik = useFormik({
        initialValues: {
            fromDate: moment(new Date()).format("yy-MM-DD"),
            uptoDate: moment(new Date()).format("yy-MM-DD"),
            collType: ['property'],
            wardId: '',
            userId: '',
            paymentMode: ''
        },
        onSubmit: (values) => {
            console.log('values =>  ', values)
            setindex(null)
            // setcollection(values?.collType)
            // if (values?.collType == 'gbSaf') {
            //     setrequestBody({
            //         fromDate: formik.values.fromDate,
            //         uptoDate: formik.values.uptoDate,
            //         wardId: formik.values.wardId,
            //         paymentMode: formik.values.paymentMode,
            //     })
            // } else {
            setrequestBody({
                collectionType: formik.values.collType,
                fromDate: formik.values.fromDate,
                uptoDate: formik.values.uptoDate,
                wardId: formik.values.wardId,
                userId: formik.values.userId,
                paymentMode: formik.values.paymentMode
            })
            // }
            setchangeData(prev => prev + 1)
        }
        , validationSchema
    })

    console.log('getting data => ', dataList)

    useEffect(() => {
        settotalAmount(dataList?.totalAmt)
    }, [dataList, changeData])

    useEffect(() => {
        gettingCollectorList()
        gettingMasterList()
        setcollection(formik.values?.collType)
        setrequestBody({
            collectionType : formik.values.collType,
            fromDate: formik.values.fromDate,
            uptoDate: formik.values.uptoDate,
            wardId: formik.values.wardId,
            userId: formik.values.userId,
            paymentMode: formik.values.paymentMode
        })
        setchangeData(prev => prev + 1)
    }, [])

    const gettingMasterList = () => {
        axios.get(get_MasterData, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    // console.log("getting master list data => ", res)
                    setwardList(res?.data?.data?.ward_master)
                } else {
                    // console.log("error getting master list", res)
                }

            })
            .catch(err => console.log("error getting master list", err))
    }

    const gettingCollectorList = () => {

        // setloader(true)

        axios.post(get_taxCollectorList, {}, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    console.log("getting collector list => ", res)
                    setcollectorList(res?.data?.data)
                } else {
                    console.log('error getting collector list => ', res)
                }
                setloader(false)
            })
            .catch(err => (console.log('error getting collector list => ', err), setloader(false)))
            .finally(() => setloader(false))
    }

    const viewDetailFun = (ind) => {
        // setloader(true)
        // axios.post(getCollectionData, {id : id}, ApiHeader())
        // .then((res) => {
        //     res?.data?.status ?
        //     (console.log('getting full data => ', res), setcollectionData(res?.data?.data), openModal())
        //     :
        //     console.log('getting false full data => ', res)
        // })
        // .catch((err) => console.log('getting error full data => ', err))
        // .finally(() => setloader(false))
        setindex(ind)
        console.log('view data => ', dataList?.data[ind])
        openModal()
    }

    const column = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>,
            className: 'w-[5%]'
        },
        {
            Header: "Ward No.",
            accessor: "ward_no",
            Cell: (props) => { return nullToNA(props?.value) },
            className: 'w-[5%]'
        },
        // {
        //     Header: "Property Tax No",
        //     accessor: "pt_no",
        //     Cell: (props) => { return nullToNA(props?.value) }
        // },
        {
            Header: "Holding No.",
            Cell: ({ cell }) => { return <>{nullToNA(cell?.row?.original?.new_holding_no) == 'NA' ? nullToNA(cell?.row?.original?.holding_no) : nullToNA(cell?.row?.original?.new_holding_no)}</> },
        },
        {
            Header: 'SAF No.',
            accessor: 'saf_no',
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Owner Name",
            accessor: "owner_name",
            Cell: (props) => { return nullToNA(props?.value) },
            className: 'w-1/3'
        },
        {
            Header: "Payment(From/Upto)",
            accessor: "from_upto_fy_qtr",
            Cell: (props) => { return nullToNA(props?.value) }
        },

        {
            Header: "Tran. Date",
            accessor: "tran_date",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => { return <>{indianAmount(props?.value)}</> }
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <>
                    <div className='flex items-center justify-center w-full'>
                        <button onClick={() => viewDetailFun(row?.index)} className='px-2 py-1 rounded-md bg-indigo-400 text-white text-sm hover:bg-indigo-600'>View</button>
                    </div>
                </>
            )
        }
    ]

    const propColumn = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>
        },
        {
            Header: "Ward No",
            accessor: "ward_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Property Tax No",
            accessor: "pt_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Holding No",
            accessor: "holding_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Unique House No",
            accessor: "new_holding_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Owner Name",
            accessor: "owner_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Mobile No",
            accessor: "mobile_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Payment(From/Upto)",
            accessor: "from_upto_fy_qtr",
            Cell: (props) => { return nullToNA(props?.value) }
        },

        {
            Header: "Tran. Date",
            accessor: "tran_date",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. Mode",
            accessor: "transaction_mode",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => { return <>{indianAmount(props?.value)}</> }
        },
        {
            Header: "Tax Collector",
            accessor: "emp_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. No",
            accessor: "tran_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Check/DD No",
            accessor: "cheque_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Bank",
            accessor: "bank_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Branch",
            accessor: "branch_name",
            Cell: (props) => { return nullToNA(props?.value) }
        }
    ]

    const safColumn = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>
        },
        {
            Header: "Ward No",
            accessor: "ward_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Property Tax No",
            accessor: "pt_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Holding No",
            accessor: "holding_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Saf No",
            accessor: "saf_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Owner Name",
            accessor: "owner_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Mobile No",
            accessor: "mobile_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Payment(From/Upto)",
            accessor: "from_upto_fy_qtr",
            Cell: (props) => { return nullToNA(props?.value) }
        },

        {
            Header: "Tran. Date",
            accessor: "tran_date",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. Mode",
            accessor: "transaction_mode",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => { return <>{indianAmount(props?.value)}</> }
        },
        {
            Header: "Tax Collector",
            accessor: "emp_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. No",
            accessor: "tran_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Check/DD No",
            accessor: "cheque_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Bank",
            accessor: "bank_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Branch",
            accessor: "branch_name",
            Cell: (props) => { return nullToNA(props?.value) }
        }
    ]

    const gbSafColumn = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>
        },
        {
            Header: "Ward No",
            accessor: "ward_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Application No.",
            accessor: "application_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Address",
            accessor: 'prop_address',
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Payment(From/Upto)",
            accessor: "from_upto_fy_qtr",
            Cell: (props) => { return nullToNA(props?.value) }
        },

        {
            Header: "Tran. Date",
            accessor: "tran_date",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. Mode",
            accessor: "transaction_mode",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => { return <>{indianAmount(props?.value)}</> }
        },
        {
            Header: "Tax Collector",
            accessor: "emp_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Tran. No",
            accessor: "tran_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Check/DD No",
            accessor: "cheque_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Bank",
            accessor: "bank_name",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Branch",
            accessor: "branch_name",
            Cell: (props) => { return nullToNA(props?.value) }
        }
    ]

    const navigateFun = () => {
        collection == 'property' ? navigate('/payment-mode-wise-summary/property') : navigate('/payment-mode-wise-summary/saf')
    }

    console.log("collType ", dataList)

    return (
        <>

            {loader && <BarLoader />}

            <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md ">
                <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Collection Report</h1>

                <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Collection Type :
                        </div>
                        <div className={"col-span-6 flex items-center justify-between bg-green-100 shadow-md px-2 py-1.5 rounded-md border border-green-300 shadow-green-100"}>
                            <div className='flex items-center gap-1'>
                                <label htmlFor="1">Property</label>
                                <input className='mt-1' type="checkbox" name="collType" id="1" value={'property'} defaultChecked />
                            </div>

                            <div className='flex items-center gap-1'>
                                <label htmlFor="2">SAF</label>
                                <input className='mt-1' type="checkbox" name="collType" id="2" value={'saf'} />
                            </div>

                            <div className='flex items-center gap-1'>
                                <label htmlFor="3">Gov. SAF</label>
                                <input className='mt-1' type="checkbox" name="collType" id="3" value={'gbsaf'} />
                            </div>
                        </div>
                        <div className="col-span-12 text-start">
                            {formik.touched.collType && formik.errors.collType && <><span className="text-red-600 text-xs">{formik.errors.collType}</span></>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            From Date :
                        </div>
                        <div className="col-span-6">
                            <input type="date" name="fromDate" value={formik.values.fromDate} id="" className={commonInputStyle} defaultValue={todayDate} />
                        </div>
                        <div className="col-span-12 text-end">
                            {formik.touched.fromDate && formik.errors.fromDate && <><span className="text-red-600 text-xs">{formik.errors.fromDate}</span></>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Upto Date :
                        </div>
                        <div className="col-span-6">
                            <input type="date" name="uptoDate" value={formik.values.uptoDate} id="" className={commonInputStyle} defaultValue={todayDate} />
                        </div>
                        <div className="col-span-12 text-end">
                            {formik.touched.uptoDate && formik.errors.uptoDate && <><span className="text-red-600 text-xs">{formik.errors.uptoDate}</span></>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Ward No. :
                        </div>
                        <div className="col-span-6">
                            <select name="wardId" id="" className={commonInputStyle}>
                                <option value=''>All</option>
                                {
                                    wardList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.ward_name}</option>
                                    </>)
                                }
                            </select>
                        </div>
                        {/* <div className="col-span-12 text-end">
                        {formik.touched.wardId && formik.errors.wardId && <><span className="text-red-600 text-xs">{formik.errors.wardId}</span></>}
                    </div> */}
                    </div>

                    {formik.values.collType != 'gbSaf' && <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Collector Name :
                        </div>
                        <div className="col-span-6">
                            <select name="userId" id="" className={commonInputStyle}>
                                <option value=''>All</option>
                                {
                                    collectorList?.map((elem) => <>
                                        <option value={elem?.id}><span className="capitalize">{elem?.user_name}</span>&nbsp;<span className="uppercase">({elem?.user_type})</span></option>
                                    </>)
                                }
                            </select>
                        </div>
                        {/* <div className="col-span-12 text-end text-xs text-red-400">
                            select ward no to get collector name list
                        </div> */}
                    </div>}

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Payment Mode :
                        </div>
                        <div className="col-span-6">
                            <select name="paymentMode" id="" className={commonInputStyle}>
                                <option value=''>All</option>
                                <option value="CASH" >Cash</option>
                                <option value="CHEQUE" >Cheque</option>
                                <option value="DD" >DD</option>
                                <option value="ONLINE" >Online</option>
                            </select>
                        </div>
                        {/* <div className="col-span-12 text-end">
                        {formik.touched.paymentMode && formik.errors.paymentMode && <><span className="text-red-600 text-xs">{formik.errors.paymentMode}</span></>}
                    </div> */}
                    </div>

                    <div className="w-full md:w-[20%] flex justify-start items-center">
                        <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-400 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>
                    </div>

                </div>
            </form>

            {(collection != '' && collection != 'gbSaf' && dataList?.data?.length > 1) && <div className='w-full text-end'>
                <button className="font-semibold px-6 py-2 bg-indigo-400 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-140 ease-in-out shadow-xl border border-white" onClick={() => navigateFun()}>Payment Mode Wise Summary</button>
            </div>}

            {
                (requestBody != null) &&
                <div className='relative'>
                    {dataList?.data?.length > 1 && <div className='absolute top-11 right-0'>
                        Total Amount : <span className="font-semibold">{indianAmount(totalAmount)}</span>
                    </div>}
                    <ListTableConnect
                        getData={true}
                        allData={(data) => setdataList(data)}
                        type='old' // if pagination is from laravel
                        api={searchCollection} // sending api
                        columns={column} // sending column
                        requestBody={requestBody} // sending body
                        changeData={changeData} // send action for new payload
                    />
                </div>
            }

            <div className='h-[20vh]'></div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center sm:ml-10 overflow-auto"
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-lg shadow-indigo-300 md:w-[73%] mt-16 sm:h-max w-full relative border-2 border-indigo-400 bg-gray-40 px-6 py-4 h-[88vh] border-t-2 border-l-2 overflow-auto" >

                    <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-md px-2 text-xl cursor-pointer" onClick={closeModal}>
                        &times;
                    </div>

                    <div className="2xl:mt-6 mt-3 bg-indigo-400 text-white flex flex-row md:justify-evenly items-center justify-center uppercase text-base poppins mb-4 shadow-md py-2 rounded-md">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold poppins 2xl:text-xl text-base sm:text-lg">
                                View Details
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 flex-wrap items-center justify-evenly w-full relative'>

                        <button className='text-xs px-2 py-1 bg-green-400 hover:bg-green-500 rounded-md shadow-md shadow-green-100 absolute bottom-0 right-0 transition-all duration-150 ' onClick={() => {
                            dataList?.data[index]?.type == 'property' && navigate('/holdingPropertyDetails/' + dataList?.data[index]?.id)
                            dataList?.data[index]?.type == 'saf' && navigate('/propApplicationDetails/' + dataList?.data[index]?.id)
                            dataList?.data[index]?.type == 'gbsaf' && navigate('/gbsaf-details/' + dataList?.data[index]?.id)
                        }}>View More</button>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Collector Name : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.emp_name)}</span>
                        </div>

                        {dataList?.data[index]?.type == 'saf' && <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Assesment Type : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.assessment_type)}</span>
                        </div>}

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Ward No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.ward_no)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">New Ward No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.new_ward_no)}</span>
                        </div>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Holding No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.holding_no)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">New Holding No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.new_holding_no)}</span>
                        </div>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">SAF No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.saf_no)}</span>
                        </div>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Owner Name : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.owner_name)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Mobile No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.mobile_no)}</span>
                        </div>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Payment (From-Upto) : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.from_upto_fy_qtr)}</span>
                        </div>

                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Transaction Date : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.tran_date)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Transaction Mode : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.transaction_mode)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Transaction Amount : </span><span className="col-span-6 items-center font-semibold">{indianAmount(dataList?.data[index]?.amount)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Cheque No. : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.cheque_no)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Bank Name : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.bank_name)}</span>
                        </div>
                        <div className='w-full sm:w-[40%] grid grid-cols-12'>
                            <span className="col-span-6 items-center">Branch Name : </span><span className="col-span-6 items-center font-semibold">{nullToNA(dataList?.data[index]?.branch_name)}</span>
                        </div>

                        {dataList?.data[index]?.type != 'saf' && <div className='w-full sm:w-[40%] grid grid-cols-12'>
                        </div>}

                    </div>

                </div>

            </Modal>

        </>
    )
}

export default PropSafSearchCollection