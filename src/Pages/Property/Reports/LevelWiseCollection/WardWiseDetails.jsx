import useSetTitle from '@/Components/GlobalData/useSetTitle'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import { useState } from 'react'
import BarLoader from '@/Components/Common/BarLoader'
import { CSVDownload } from 'react-csv'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import { useNavigate, useParams } from 'react-router-dom'

const WardWiseDetails = () => {

  const {wardWiseCollection} = PropertyApiList()

  const navigate = useNavigate()

  const [loader, setloader] = useState(false)
  const [dataList, setdataList] = useState()

  // =======List table============
  const [perPageCount, setperPageCount] = useState(5)
  const [pageCount, setpageCount] = useState(1)
  const [totalCount, settotalCount] = useState(0)
  const [exportData, setexportData] = useState()
  const [csvStatus, setcsvStatus] = useState(false)
  // =========List table end=========

  useSetTitle('Ward Wise Details')

  const {id} = useParams()

  useEffect(() => {
    getAllData()
  },[])

  const getAllData = () => {

    setloader(true)

    let body = {
      userId:id,
	    page : pageCount,
      perPage : perPageCount
    }

    axios.post(
      wardWiseCollection, body, ApiHeader())
  .then((res) => {
      if(res?.data?.status == true){
          console.log('search success => ', res)
          setdataList(res?.data?.data?.items)
          settotalCount(res?.data?.data?.total)
      } else {
          console.log('error while search => ', res)
      }

      setloader(false)
  })
  .catch((err) => {
      console.log('error while search => ', err)
      setloader(false)
  })
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
    Header: "Total No of Form(s)",
    accessor: "total",
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
              getAllData()
          }, [pageCount, perPageCount])
      
          const exportDataFun = () => {
  
              setloader(true)
              setcsvStatus(false)
  
              let body = {
                  userId : id,
                  page : '',
                  perPage : totalCount
              }
      
              // console.log('data before hitting api => ', body)
  
          axios.post(
              wardWiseCollection, body, ApiHeader())
          .then((res) => {
              if(res?.data?.status == true){
                  // console.log('search success => ', res)
                  setexportData(res?.data?.data?.items)
                  downloadFun()
              } else {
                  // console.log('error while search => ', res)
              }
  
              setloader(false)
          })
          .catch((err) => {
              // console.log('error while search => ', err)
              setloader(false)
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
                loader && <BarLoader />
            }

            <div className="mt-4"></div>

          {
            (dataList != undefined && dataList?.length != 0) ? <>
            
            <ListTable2 count1={totalCount} columns={COLUMNS} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} />

            </> : 
            <>
                <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
            </>
        } 

        </>
      )
    }
export default WardWiseDetails