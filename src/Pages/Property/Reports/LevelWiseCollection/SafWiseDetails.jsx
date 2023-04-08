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

const SafWiseDetails = () => {

  const {safWiseCollection} = PropertyApiList()

  const navigate = useNavigate()

  const [loader, setloader] = useState(false)
  const [dataList, setdataList] = useState()
  const [requestBody, setrequestBody] = useState(null)// create this for list table connect
  const [changeData, setchangeData] = useState(0)// create this for list table connect

  useSetTitle('SAF Wise Details')

  const {id} = useParams()

  useEffect(() => {
    getAllData()
  },[])

  const getAllData = () => {

    setloader(true)

    setrequestBody({
      roleId:id,
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
    Header: "SAF No",
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
  Header: "Property Type",
  accessor: "property_type",
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
  Header: "MObile No",
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
  Header: <div className='w-full'>Actions</div>,
  accessor: "id",
  Cell: ({ cell }) => (
      <>
          <div className='w-full'>
          <button className='w-max px-4 py-1 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer' onClick={() => navigate(`/propApplicationDetails/${cell?.row?.values?.id}`)}>View</button>
          </div>
      </>
  ),
},
  ]

    return (
        <>

            <div className="mt-4"></div>

            {
                (requestBody != null) && 
                <ListTableConnect 
                    type='old' // if pagination is from laravel
                    api={safWiseCollection} // sending api
                    columns={COLUMNS} // sending column
                    requestBody={requestBody} // sending body
                    changeData={changeData} // send action for new payload
                />
            }

<div className='h-[20vh]'></div>

        </>
      )
    }
export default SafWiseDetails