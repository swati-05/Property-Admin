import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import { useState } from 'react'
import { useEffect } from 'react'
import BarLoader from '@/Components/Common/BarLoader'
import ListTable from '@/Components/Common/ListTable/ListTable'
import { useNavigate } from 'react-router-dom'
import useSetTitle from '@/Components/GlobalData/useSetTitle'

const LevelWisePendingReport = () => {

  const {levelWisePendingCollection} = PropertyApiList()

  useSetTitle('Level Wise Pending Report')

  const navigate = useNavigate()

  const [dataList, setdataList] = useState()
  const [loader, setloader] = useState(false)

  useEffect(() => {
    getAllList()
  },[])

  const getAllList = () => {
    setloader(true)
    axios.post(levelWisePendingCollection, {}, ApiHeader())
    .then((res) => {
      setloader(false)
      console.log('success => ', res)
      setdataList(res?.data?.data)
    })
    .catch((err) => (console.log('getting eroor => ', err), setloader(false)))
  }

  const COLUMNS = [
    {
      Header: "S.No.",
      Cell: ({ row }) => <div>{row?.index + 1}</div>
  },
  {
      Header: "Employee Name",
      accessor: "role_name",
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
},
{
    Header: <div className='w-full text-center'>Actions</div>,
    accessor: "id",
    Cell: ({ cell }) => (
        <>
            <div className='w-full flex justify-evenly'>
            <button className='w-max px-4 py-1 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer' onClick={() => navigate(`/saf-wise-details/${cell?.row?.values?.id}`)}>View SAF Wise Details</button>
            <button className='w-max px-4 py-1 bg-indigo-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer' onClick={() => navigate(`/employee-wise-details/${cell?.row?.values?.id}`)}>View Employee Wise Details</button>
            </div>
        </>
    ),
  },
  ]

  return (
    <>

    {loader && <BarLoader />}

    {/* <h1 className='mb-4 text-lg text-center w-full uppercase font-semibold text-white bg-indigo-500 px-2 py-1'>Level Wise Pending Report</h1> */}
    <div className='mt-4'></div>
    {
      (dataList != undefined && dataList?.length != 0 && !loader) ? <>
        <ListTable dataList={dataList} columns={COLUMNS} /> </>
        :
        <>
                <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
            </>
    }

    </>
  )
}

export default LevelWisePendingReport