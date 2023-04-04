import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import { CSVDownload, CSVLink } from 'react-csv'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import {RiFilter2Line} from 'react-icons/ri'
import ListTable from '@/Components/Common/ListTable/ListTable'

const WardWiseHolding = () => {

    const {get_MasterData, wardWiseHolding, yearList} = PropertyApiList()

    const location = useLocation()

    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)
    const [isProperty, setisProperty] = useState(true)
    const [yearData, setyearData] = useState()

    useSetTitle('Ward Wise Holding Report')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const validationSchema = yup.object({
        // wardMstrId : yup.string().required("Select ward"),
        // year: yup.string().required("Select year")
    })

    const formik = useFormik({
        initialValues: {
            wardMstrId : '',
            year : '',
        },
        onSubmit: (values) => {
            // console.log("submitting report search values => ", values)
            setperPageCount(5)
            setpageCount(1)
            searchFun(values)
            // console.log("year =============>>> ", (values.year).split('-')[0])
        }
        // , validationSchema
    })

    const searchFun = () => {
        
        setloader(true)

        let body = {
            wardMstrId : formik.values.wardMstrId,
            year : (formik.values.year).split('-')[0],
            // page : pageCount,
            // perPage : perPageCount
        }

        console.log('data before hitting api => ', body)

        axios.post(
            wardWiseHolding, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('search success => ', res)
                setdataList(res?.data?.data)
                // settotalCount(res?.data?.data?.total)
            } else {
                console.log('error while search => ', res)
            }

            setloader(false)
            setloader2(false)
        })
        .catch((err) => (console.log('error while search => ', err), setloader(false), setloader2(false)))

    }

    useEffect(() => {
        gettingMasterList()
        location.pathname == '/property-report' && setisProperty(true)
        location.pathname == '/saf-report' && setisProperty(false)
    },[])

    const gettingMasterList = () => {
        axios.get(get_MasterData, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                // console.log("getting master list data => ", res)
                setwardList(res?.data?.data?.ward_master)
            } else {
                // console.log("error getting master list", res)
            }
            
        })
        .catch(err => console.log("error getting master list", err))

        axios.post(yearList,{}, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                console.log("year list data => ", res)
                setyearData(res?.data?.data)
            } else {
                console.log("error year list", res)
            }
            
        })
        .catch(err => console.log("error year list", err))


    }

    const COLUMNS = [
            {
                Header: "S.No.",
                Cell: ({ row }) => <div>{row?.index + 1}</div>
            },
            {
                Header: "Ward No",
                accessor: "ward_no",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                  }
                }
            },
            {
                Header: "Property Tax No",
                accessor: "pt_no",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Holding No",
                accessor: "holding_no",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Unique House No",
                accessor:  "new_holding_no",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Owner Name",
                accessor: "owner_name",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Mobile No",
                accessor: "mobile_no",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Address",
                accessor: "prop_address",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "From(QTR|FY)",
                accessor: "fyear",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
            {
                Header: "Due Amount",
                accessor: "balance",
                Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
                }
                if (props?.value != null) {
                    return props?.value;
                }
                }
            },
        ]

        // ============List Table=========

        const [perPageCount, setperPageCount] = useState(5)
        const [pageCount, setpageCount] = useState(1)
        const [totalCount, settotalCount] = useState(0)
        const [exportData, setexportData] = useState()
        const [csvStatus, setcsvStatus] = useState(false)
        const [loader2, setloader2] = useState(false)

        const nextPageFun = () => {
            setpageCount(pageCount + 1)
        }
    
        const prevPageFun = () => {
            setpageCount(pageCount - 1)
        }
    
        const perPageFun = (val) => {
            setperPageCount(val)
        }
    
        useEffect(() => {
            setloader2(true)
            searchFun()
        }, [pageCount, perPageCount])
    
        const exportDataFun = () => {

            setloader2(true)
            setcsvStatus(false)

            let body = {
                fromDate : formik.values.fromDate,
                uptoDate : formik.values.uptoDate,
                wardId : formik.values.wardId,                          
                userId : formik.values.userId,   
                paymentMode : formik.values.paymentMode,
                page : '',
                perPage : totalCount
            }
    
            // console.log('data before hitting api => ', body)

        axios.post(
            wardWiseHolding, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                // console.log('search success => ', res)
                setexportData(res?.data?.data?.items)
                downloadFun()
            } else {
                // console.log('error while search => ', res)
            }

            setloader2(false)
        })
        .catch((err) => {
            // console.log('error while search => ', err)
            setloader2(false)
        })
        }
    
        const downloadFun = () => {
            setcsvStatus(true)
        }
    
  return (
    <>

            {
                csvStatus && <CSVDownload data={exportData} />
            }

            {
                loader2 && <BarLoader />
            }
    
        <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md ">
            <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Report</h1>

            <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Ward No. : 
                    </div>
                    <div className="col-span-6">
                        <select name="wardMstrId" id="" className={commonInputStyle}>
                            <option value=''>All</option>
                            {
                                wardList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.ward_name}</option>
                                </>)
                            }
                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Not Paid From :
                    </div>
                    <div className="col-span-6">
                        <select name="year" id="" className={commonInputStyle}>
                            <option value=''>All</option>
                            {
                                yearData?.map((elem) => <>
                                    <option value={elem}>{elem}</option>
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
            (dataList != undefined && dataList?.length != 0) ? <>
            
            {/* <ListTable2 count1={totalCount} columns={COLUMNS} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} /> */}

            <ListTable columns={COLUMNS} dataList={dataList} />
            </> : 
            <>
                <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
            </>
        }
<div className='h-[20vh]'></div>

    </>
  )
}

export default WardWiseHolding