import { useFormik } from 'formik'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import BarLoader from '@/Components/Common/BarLoader'
import { CSVDownload, CSVLink } from 'react-csv'
// import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'

const PropIndividualDemandCollection = () => {

    const { get_MasterData, searchPropIndividualDemandCollection } = PropertyApiList()

    useSetTitle('Property Individual Demand And Collection')

    const navigate = useNavigate()

    const [wardList, setwardList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)
    const [requestBody, setrequestBody] = useState(null)// create this for list table connect
    const [changeData, setchangeData] = useState(0)// create this for list table connect

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            wardId: '',
        },
        onSubmit: (values) => {
            console.log("submitting report search values => ", values)
             // set request body for list table connect
             setrequestBody({
                wardMstrId: formik.values.wardId,
            })
            // set change data to hit again api with new payload for list table connect
            setchangeData(prev => prev + 1)
        }

    })

    useEffect(() => {
        axios.get(get_MasterData, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    console.log("getting master list data => ", res)
                    setwardList(res?.data?.data?.ward_master)
                } else {
                    console.log("error getting master list", res)
                }

            })
            .catch(err => console.log("error getting master list", err))
    }, [])

    const COLUMNS = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>
        },
        {
            Header: "Ward No",
            accessor: "ward_name",
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
            Cell: ({cell}) => {
                if (cell?.row?.original?.pt_no == null || cell?.row?.original?.pt_no == '' || cell?.row?.original?.pt_no == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (cell?.row?.original?.pt_no != null) {
                    return <div className='cursor-pointer underline' onClick={() => navigate('/holdingPropertyDetails/' + cell?.row?.original?.id)}>{cell?.row?.original?.pt_no}</div>;
                }
            }
        },
        {
            Header: "Holding No",
            // accessor: "holding_no",
            Cell: ({cell}) => {
                if (cell?.row?.original?.holding_no == null || cell?.row?.original?.holding_no == '' || cell?.row?.original?.holding_no == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (cell?.row?.original?.holding_no != null) {
                    return <div className='cursor-pointer underline' onClick={() => navigate('/holdingPropertyDetails/' + cell?.row?.original?.id)}>{cell?.row?.original?.holding_no}</div>;
                }
            }
        },
        {
            Header: "Unique House No",
            accessor: "new_holding_no",
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
            Header: "Applicant Name",
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
            Header: "Total Demand",
            accessor: "total_demand",
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
          Header: "Total Collection",
          accessor: "collection_amount",
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
        Header: "Total Remaining",
        accessor: "balance_amount",
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

    return (
        <>
            <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md">
                <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Report</h1>

                <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Ward No. :
                        </div>
                        <div className="col-span-6">
                            <select name="wardId" id="" className={commonInputStyle} >
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

                    <div className="w-full md:w-[20%] flex justify-start items-end">
                        <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>
                    </div>

                </div>
            </form>

            {
                (requestBody != null) && 
                <ListTableConnect 
                type='new' // if pagination is from laravel
                api={searchPropIndividualDemandCollection} // sending api
                columns={COLUMNS} // sending column
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                />
            }

<div className='h-[20vh]'></div>

        </>
    )
}
export default PropIndividualDemandCollection