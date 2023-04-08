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

const HoldingDcb = () => {

    const { get_MasterData, searchHoldingDcb, yearList } = PropertyApiList()

    useSetTitle('Holding DCB')

    const [wardList, setwardList] = useState()
    const [dataList, setdataList] = useState()
    const [yearData, setyearData] = useState()
    const [loader, setloader] = useState(false)
    const [requestBody, setrequestBody] = useState(null)// create this for list table connect
    const [changeData, setchangeData] = useState(0)// create this for list table connect

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            wardId: '',
            fiYear: '',
        },
        onSubmit: (values) => {
            console.log("submitting report search values => ", values)
            setrequestBody({
                wardId: formik.values.wardId,
                fiYear: formik.values.fiYear,
            })
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
    }, [])

    const COLUMNS = [

        {
            Header : '_',
            columns : [
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
                    Header: "New Holding No",
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
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
            Header: "Arrear (₹)",
            accessor: "arrear_demand",
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
            Header: "Current (₹)",
            accessor: "current_demand",
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
            Header: "Total Demand (₹)",
            Cell: ({cell}) => {
                return parseFloat(cell?.row?.original?.arrear_demand) + parseFloat(cell?.row?.original?.current_demand)
            }
        },
            ]
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear (₹)",
            accessor: "arrear_collection",
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
            Header: "Current (₹)",
            accessor: "current_collection",
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
            Header: "Total Collection (₹)",
            Cell: ({cell}) => {
                return parseFloat(cell?.row?.original?.arrear_collection) + parseFloat(cell?.row?.original?.current_collection)
            }
        },
            ]
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear (₹)",
            accessor: "old_due",
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
            Header: "Current (₹)",
            accessor: "current_due",
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
            Header: "Total Balance (₹)",
            accessor: 'outstanding',
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
        },
        
        {
            Header : '%',
            columns : [
        {
            Header: "Amount % Cover",
            Cell: ({cell}) => {
                let x = (parseFloat(cell?.row?.original?.arrear_demand)+parseFloat(cell?.row?.original?.current_demand))/100
                let value = ((parseFloat(cell?.row?.original?.arrear_collection) + parseFloat(cell?.row?.original?.current_collection))/x).toFixed(2)

                return (value == 'NaN' ? '0.00' : value)
            }
        },
            ]
        }
        
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
                            <select name="wardId" id="" className={commonInputStyle} disabled={loader}>
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
                            Financial Year :
                        </div>
                        <div className="col-span-6">
                        <select name="fiYear" id="" className={commonInputStyle} disabled={loader}>
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
                            <div className='flex justify-end'>
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
                    api={searchHoldingDcb} // sending api
                    columns={COLUMNS} // sending column
                    requestBody={requestBody} // sending body
                    changeData={changeData} // send action for new payload
                />
            }

<div className='h-[20vh]'></div>

        </>
    )
}

export default HoldingDcb