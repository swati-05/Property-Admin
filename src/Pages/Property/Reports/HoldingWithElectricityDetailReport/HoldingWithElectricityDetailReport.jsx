import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import { CSVDownload, CSVLink } from 'react-csv'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import {RiFilter2Line} from 'react-icons/ri'
import { useParams } from 'react-router-dom'

const HoldingWithElectricityDetailReport = () => {

    const {searchHoldingWithElectricityDetailReport} = PropertyApiList()

    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)

    const {year} = useParams()

    useSetTitle('Holding With Electricity Detail Report')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`


    const formik = useFormik({
        initialValues: {
          wardId : '',
        },
        onSubmit: (values) => {
            // console.log("submitting report search values => ", values)
            setperPageCount(5)
            setpageCount(1)
            searchFun(values)
        }

    })

    const searchFun = () => {
        
        setloader(true)

        let body = {                           
                page : pageCount,
                perPage : perPageCount
        }

        // console.log('data before hitting api => ', body)

        axios.post(searchHoldingWithElectricityDetailReport, body, ApiHeader())
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
          Header: "Name",
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
          Header: "Address",
          accessor: "address",
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
          Header: "Elect. Consumer No",
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
        Header: "Elect. Account No.",
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
      Header: "Elect. Bind Book No.",
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
    Header: "Holding Type",
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
  Header: "Buildup Area",
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
  Header: "Property Type",
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
                page : '',
                perPage : totalCount
        }
    
            // console.log('data before hitting api => ', body)

        axios.post(searchHoldingWithElectricityDetailReport, body, ApiHeader())
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

<div>
                <h1 className='w-full border-b-2 border-gray-700 text-gray-700 text-center text-lg font-semibold uppercase tracking-[0.7rem] mb-2 mt-8'>
                    Holding With Electricity Detail Report
                </h1>
            </div>

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

export default HoldingWithElectricityDetailReport