import { useFormik } from 'formik'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import BarLoader from '@/Components/Common/BarLoader'
import { CSVDownload, CSVLink } from 'react-csv'
import ListTable2 from '@/Components/Common/ListTableMargin/ListTable2'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'
import { indianAmount, nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import moment from 'moment'

const HoldingWiseRebate = () => {

    const { get_MasterData, searchHoldingWiseRebate, yearList } = PropertyApiList()

    useSetTitle('Holding Wise Rebate Report')

    const [wardList, setwardList] = useState()
    const [dataList, setdataList] = useState()
    const [yearData, setyearData] = useState()
    const [loader, setloader] = useState(false)
    const [propertyList, setpropertyList] = useState(null)
    const [requestBody, setrequestBody] = useState(null)// create this for list table connect
    const [changeData, setchangeData] = useState(0)// create this for list table connect

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            fromDate: moment(new Date()).format("yy-MM-DD"),
            uptoDate: moment(new Date()).format("yy-MM-DD"),
            reportType: ['property'],
            wardId: '',
            userId: '',
            paymentMode: ''
        },
        onSubmit: (values) => {
            console.log("submitting report search values => ", values)
            setrequestBody({
                reportType: formik.values.collType,
                fromDate: formik.values.fromDate,
                uptoDate: formik.values.uptoDate,
                wardId: formik.values.wardId,
                userId: formik.values.userId,
                paymentMode: formik.values.paymentMode
            })
            setchangeData(prev => prev + 1)
        }

    })

    useEffect(() => {
        axios.get(get_MasterData, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    console.log("getting master list => ", res)
                    setpropertyList(res?.data?.data?.property_type)
                    setwardList(res?.data?.data?.ward_master)
                } else {
                    console.log("error getting master list", res)
                }

            })
            .catch(err => console.log("error getting master list", err))

        axios.post(yearList, {}, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    console.log("year list data => ", res)
                    setyearData(res?.data?.data)
                } else {
                    console.log("error year list", res)
                }

            })
            .catch(err => console.log("error year list", err))
    }, [])

    const COLUMNS = [
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
            Header: "Holding No",
            accessor: "holding_no",
            Cell: (props) => { return nullToNA(props?.value) }
        },
        {
            Header: "Demand",
            accessor: "total_demand",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "Amount Paid",
            accessor: "paid_amt",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "First Quarter Rebate (5%)",
            accessor: "first_qtr_rebate",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "JSK (2.5%)",
            accessor: "jsk_rebate",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "Online (5%)",
            accessor: "online_rebate",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "Total Rebate",
            accessor: "total_rebate",
            Cell: (props) => { return indianAmount(props?.value) }
        },
        {
            Header: "1% Monthly Intrest",
            accessor: "monthly_intrest",
            Cell: (props) => { return indianAmount(props?.value) }
        },
    ]


    return (
        <>
            <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md ">
                <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Collection Report</h1>

                <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Report Type :
                        </div>
                        <div className={"col-span-6 flex items-center justify-between bg-green-100 shadow-md px-2 py-1.5 rounded-md border border-green-300 shadow-green-100"}>
                            <div className='flex items-center gap-1'>
                                <label htmlFor="1">Property</label>
                                <input className='mt-1' type="checkbox" name="reportType" id="1" value={'property'} defaultChecked />
                            </div>

                            <div className='flex items-center gap-1'>
                                <label htmlFor="2">SAF</label>
                                <input className='mt-1' type="checkbox" name="reportType" id="2" value={'saf'} />
                            </div>

                            <div className='flex items-center gap-1'>
                                <label htmlFor="3">Gov. SAF</label>
                                <input className='mt-1' type="checkbox" name="reportType" id="3" value={'gbsaf'} />
                            </div>
                        </div>
                        <div className="col-span-12 text-start">
                            {formik.touched.reportType && formik.errors.reportType && <><span className="text-red-600 text-xs">{formik.errors.reportType}</span></>}
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            From Date :
                        </div>
                        <div className="col-span-6">
                            <input type="date" name="fromDate" id="" className={commonInputStyle} value={formik.values.fromDate} />
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
                            <input type="date" name="uptoDate" id="" className={commonInputStyle} value={formik.values.uptoDate} />
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

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Property Type :
                        </div>
                        <div className="col-span-6">
                            <select name="propertyType" id="" className={commonInputStyle}>
                                <option value=''>All</option>
                                {
                                    propertyList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.property_type}</option>
                                    </>)
                                }
                            </select>
                        </div>

                    </div>

                    <div className="w-full md:w-[20%] flex justify-start items-end">
                        {loader ? <>
                            <div className='flex justify-start items-end'>
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="25"
                                    visible={true}
                                />
                            </div>
                        </>
                            :
                            <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>}
                    </div>

                </div>
            </form>

            {
                (requestBody != null) &&
                <ListTableConnect
                    type='old' // if pagination is from laravel
                    api={searchHoldingWiseRebate} // sending api
                    columns={COLUMNS} // sending column
                    requestBody={requestBody} // sending body
                    changeData={changeData} // send action for new payload
                />
            }

            <div className='h-[20vh]'></div>

        </>
    )
}

export default HoldingWiseRebate