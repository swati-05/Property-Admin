import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import { CSVDownload, CSVLink } from 'react-csv'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import {RiFilter2Line} from 'react-icons/ri'

const DateWardWiseGeneratedNotice = () => {

    const {get_MasterData, searchDateWardWiseGeneratedNotice} = PropertyApiList()

    const {type} = useParams()

    const navigate = useNavigate()

    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)
    // const [isProperty, setisProperty] = useState(true)

    useSetTitle('Date and Ward Wise Generated Notice')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const validationSchema = yup.object({
        fromDate : yup.string().required('Field Required'),
        uptoDate : yup.string().required('Field Required'),
        // wardId : yup.string().required('Field Required'),
        // userId : yup.string().required('Field Required'),
        // paymentMode : yup.string().required('Field Required'),
    })

    const formik = useFormik({
        initialValues: {
            fromDate : '',
            uptoDate : '',
            wardId : '',
            noticeType: ''
        },
        onSubmit: (values) => {
            // console.log("submitting report search values => ", values)
            setperPageCount(5)
            setpageCount(1)
            searchFun(values)
        }
        , validationSchema
    })

    const searchFun = () => {
        
        setloader(true)

        let body = {
            fromDate : formik.values.fromDate,
            uptoDate : formik.values.uptoDate,
            wardId : formik.values.wardId,                          
            noticeType : formik.values.noticeType,
            page : pageCount,
            perPage : perPageCount
        }

        // console.log('data before hitting api => ', body)

        axios.post(searchDateWardWiseGeneratedNotice, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('search success => ', res)
                setdataList(res?.data?.data?.items)
                settotalCount(res?.data?.data?.total)
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
    }


    const COLUMNS = [
            {
                Header: "S.No.",
                Cell: ({ row }) => <div>{row?.index + 1}</div>
            },
            {
                Header: "Notice No",
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
                Header: "Notice Date",
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
                Header: "Notice Type",
                accessor: "saf_no",
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
                Header: "Ward No.",
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
              Header: "holding No.",
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
                Header: "Demand From/Upto",
                accessor: "from_upto_fy_qtr",
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
                Header: "Amount",
                accessor: "tran_date",
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
                Header: "Penalty Amount",
                accessor: "transaction_mode",
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
                Header: "Generated Date",
                accessor: "amount",
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
                Header: "Generated By",
                accessor: "emp_name",
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
                Header: "Deactive Reason",
                accessor: "tran_no",
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
                Header: "Deactivated Date",
                accessor: "cheque_no",
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
                Header: "Deactivated By",
                accessor: "bank_name",
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
            }
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
            noticeType : formik.values.noticeType,
            page : '',
            perPage : totalCount
        }
           
        // console.log('data before hitting api => ', body)

        axios.post(searchDateWardWiseGeneratedNotice, body, ApiHeader())
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
                        From Date :
                    </div>
                    <div className="col-span-6">
                        <input type="date" name="fromDate" id="" className={commonInputStyle} />
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
                        <input type="date" name="uptoDate" id="" className={commonInputStyle} />
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
                        Notice Type :
                    </div>
                    <div className="col-span-6">
                        <select name="paymentMode" id="" className={commonInputStyle}>
                        <option value="">All</option>
                                <option value="Assessment">Assessment</option>
                                <option value="Demand">Demand</option>
                        </select>
                    </div>
                    {/* <div className="col-span-12 text-end">
                        {formik.touched.paymentMode && formik.errors.paymentMode && <><span className="text-red-600 text-xs">{formik.errors.paymentMode}</span></>}
                    </div> */}
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
            
            <ListTable2 count1={totalCount} columns={COLUMNS} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} />

            </> : 
            <>
                <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
            </>
        }
<div className='h-[20vh]'></div>

    </>
  )
}

export default DateWardWiseGeneratedNotice