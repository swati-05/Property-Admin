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
import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'

const WardWiseDetails = () => {

  const {wardWiseCollection} = PropertyApiList()

  const navigate = useNavigate()

  const [loader, setloader] = useState(false)
  const [dataList, setdataList] = useState()
  const [requestBody, setrequestBody] = useState(null)// create this for list table connect
  const [changeData, setchangeData] = useState(0)// create this for list table connect

  useSetTitle('Ward Wise Details')

  const {id} = useParams()

  useEffect(() => {
    getAllData()
  },[])

  const getAllData = () => {

    setloader(true)

    setrequestBody({
        userId:id,
    })
    setchangeData(prev => prev + 1)

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


    return (
        <>
            <div className="mt-4"></div>

            {
                (requestBody != null) && 
                <ListTableConnect 
                    type='old' // if pagination is from laravel
                    api={wardWiseCollection} // sending api
                    columns={COLUMNS} // sending column
                    requestBody={requestBody} // sending body
                    changeData={changeData} // send action for new payload
                />
            }

<div className='h-[20vh]'></div>

        </>
      )
    }
export default WardWiseDetails