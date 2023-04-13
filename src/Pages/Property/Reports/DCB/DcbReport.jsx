import { useFormik } from 'formik'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import BarLoader from '@/Components/Common/BarLoader'
import { CSVDownload, CSVLink } from 'react-csv'
import ListTable2 from '@/Components/Common/ListTableMargin/ListTable2'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'
import { indianAmount, nullToZero } from '@/Components/Common/PowerUps/PowerupFunctions'
import { useStepContext } from '@mui/material'
import CitizenApplyApiList from '@/Components/ApiList/CitizenApplyApiList'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'
import PieChart from '../PieChart'
import ListTable from '@/Components/Common/ListTableMargin/ListTable'

const DcbReport = () => {

    const { get_MasterData, searchWardWiseDcb, yearList, getPieChartData } = PropertyApiList()
    const {api_getAllUlb} = CitizenApplyApiList()

    useSetTitle('DCB Report')

    const [wardList, setwardList] = useState()
    const [ulbList, setulbList] = useState()
    const [yearData, setyearData] = useState()
    const [loader, setloader] = useState(false)
    const [loader2, setloader2] = useState(false)
    const [isHH, setisHH] = useState(false)
    const [dataList, setdataList] = useState(null)
    const [totalData, settotalData] = useState(null)
    const [showPiechart, setshowPiechart] = useState(true)
    const [pieChartData, setpieChartData] = useState(null)

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            wardId: '',
            fiYear: '',
            reportType : 'wardWise',
            withHh : '0'
        },
        onSubmit: (values) => {
            setshowPiechart(false)
            console.log("submitting report search values => ", values)
            // if(values?.withHh == '0' || values?.withHh[0] == null){
            //     setisHH(false)
            // }
            // if(values?.withHh[0] == 'on'){
            //     setisHH(true)
            // }
            searchFun(values)
        }

    })

    const searchFun = (values) => {

        setloader(true)

        let body = {
            ulbId : '2',
            wardId: formik.values.wardId,
            fiYear: formik.values.fiYear,
        }

        console.log('data before hitting api => ', body)

        axios.post(
            searchWardWiseDcb, body, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    console.log('search success => ', res)
                    setdataList(res?.data?.data?.dcb)
                    settotalData(res?.data?.data)
                } else {
                    console.log('error while search => ', res)
                }

                setloader(false)
            })
            .catch((err) => (console.log('error while search => ', err), setloader(false)))

    }

    useEffect(() => {

        setloader2(true)

        axios.post(getPieChartData,{ulbId : '2'}, ApiHeader())
        .then((res) => {

            if (res?.data?.status == true) {
                console.log("getting pie chart data => ", res)
                setpieChartData(res?.data?.data)
            } else {
                console.log("error getting pie chart data", res)
            }

        })
        .catch(err => console.log("error getting pie chart data", err))
        .finally(() => setloader2(false))

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

        axios.get(api_getAllUlb, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                console.log("year list data => ", res)
                setulbList(res?.data?.data)
            } else {
                console.log("error year list", res)
            }
            
        })
        .catch(err => console.log("error year list", err))

    }, [])

    const handleHHChange = (e) => {
        const checkValue = e.target.checked;

        console.log("checkValue", checkValue)

        checkValue ? formik.setFieldValue('withHh', '1') : formik.setFieldValue('withHh', '0')
    }

    const byWardWithHhColumn = [

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
                    Cell: (props) => {return nullToNA(props?.value)}
                }
            ]
            },
            {
                Header: 'HOUSEHOLD',
                columns: [
                {
                    Header: "Arrear HH",
                    accessor: "arrear_hh",
                    Cell: (props) => {return nullToZero(props?.value)}
                },
                {
                    Header: "Current HH",
                    accessor: "current_hh",
                    Cell: (props) => {return nullToZero(props?.value)}
                },
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Demand",
        //     Cell: ({cell}) => {
        //         return indianAmount(parseFloat(cell?.row?.original?.arrear_demand) + parseFloat(cell?.row?.original?.current_demand))
        //     }
        // },
            ]
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Collection",
        //     Cell: ({cell}) => {
        //         return indianAmount(parseFloat(cell?.row?.original?.arrear_collection) + parseFloat(cell?.row?.original?.current_collection))
        //     }
        // },
            ]
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Balance",
        //     accessor: 'outstanding',
        //     Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        // },
            ]
        },

    ]

    const byWardColumn = [

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
                    Cell: (props) => {return nullToNA(props?.value)}
                },
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Demand",
        //     Cell: ({cell}) => {
        //         return indianAmount(parseFloat(cell?.row?.original?.arrear_demand) + parseFloat(cell?.row?.original?.current_demand))
        //     }
        // },
            ]
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Collection",
        //     Cell: ({cell}) => {
        //         return indianAmount(parseFloat(cell?.row?.original?.arrear_collection) + parseFloat(cell?.row?.original?.current_collection))
        //     }
        // },
            ]
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        // {
        //     Header: "Total Balance",
        //     accessor: 'outstanding',
        //     Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        // },
            ]
        },

    ]

    const byUlbColumn = [

        {
            Header : "_",
            columns: [
                {
                    Header: "S.No.",
                    Cell: ({ row }) => <div>{row?.index + 1}</div>
                },
                {
                    Header : "ULB Name",
                    accessor : 'ulb_name',
                    Cell : (props) => {return nullToNA(props?.value)}
                }
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Total Demand",
            Cell: ({cell}) => {
                return indianAmount(parseFloat(cell?.row?.original?.arrear_demand) + parseFloat(cell?.row?.original?.current_demand))
            }
        },
            ]
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Total Collection",
            Cell: ({cell}) => {
                return indianAmount(parseFloat(cell?.row?.original?.arrear_collection) + parseFloat(cell?.row?.original?.current_collection))
            }
        },
            ]
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
        {
            Header: "Total Balance",
            accessor: 'outstanding',
            Cell: (props) => {return <>{indianAmount(props?.value)}</>}
        },
            ]
        },
                
    ]

    return (
        <>

        {
            loader && <BarLoader />
        }

        {
            loader2 ? <div className='my-4 w-screen flex-col items-center justify-center'>
                <ThreeDots 
                    // height="80" 
                    // width="80" 
                    radius="9"
                    color="#4338ca" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /><span className='italic'>Pie Chart Loading</span> </div>: 
<>
        {(showPiechart && pieChartData?.length > 0) && 
        <div className='my-4 bg-white rounded-md py-2 shadow-md'>
            <div className='flex flex-row-reverse flex-wrap items-end justify-evenly gap-x-2 w-[100%] '>
                {
                    pieChartData?.map((elem) => 
                        <div className='w-[20%] flex flex-col'><div className='bg-indigo-500 w-max px-2 text-white rounded-md text-xs sm:text-sm font-semibold shadow-md shadow-indigo-300'>{elem?.fyear}</div><PieChart label={['Total Demand', 'Total Collection', 'Total Balance']} data={[elem?.totaldemand, elem?.totalcollection, elem?.totalbalance]}/></div>
                    )
                }
            </div>
            <div className='flex flex-wrap justify-center gap-2 sm:gap-4 items-center pt-4'>
                <div className='flex items-center'><span className='bg-[#22C55E] h-2 sm:h-4 w-7 sm:w-14 inline-block mr-1'></span><span className='text-xs sm:text-base'>Demand</span></div>
                <div className='flex items-center'><span className='bg-[#6366F1] h-2 sm:h-4 w-7 sm:w-14 inline-block mr-1'></span><span className='text-xs sm:text-base'>Collection</span></div>
                <div className='flex items-center'><span className='bg-[#EC4899] h-2 sm:h-4 w-7 sm:w-14 inline-block mr-1'></span><span className='text-xs sm:text-base'>Balance</span></div>
            </div>
        </div>
        } </>}

            <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md">
                <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Report</h1>

                <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                {/* =========ULB============== */}
                {/* <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Select ULB :
                        </div>
                        <div className="col-span-6">
                            <select name="reportType" id="" className={commonInputStyle} disabled={loader}>
                            <option value="">Select</option>
                                {ulbList?.map((option) => (
                                  <option value={option.id}>{option.ulb_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 text-end">
                    </div>
                    </div>                     */}
                    
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
                    </div>

                            {/* ==========FY============= */}
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

                    <div className="flex flex-col justify-center w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold flex items-center mt-4">
                            <label htmlFor="withHh" className='mr-2'>With HH : </label>
                            <input type="checkbox" name="withHh" id="withHh" className='w-4 h-4 rounded' onChange={handleHHChange} onClick={() => setisHH(!isHH)} />
                        </div>
                        <div className="col-span-6">
                            {/* <input type="checkbox" name="withHh" value={1} id="yes" /> */}
                        </div>
                    </div>

                    <div className="w-full md:w-[20%] flex justify-start items-end">
                        <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>
                    </div>

                </div>
            </form>

{
                (!loader && dataList != undefined && dataList?.length > 0) ? <>

                <div className='bg-white p-2 rounded-md shadow-md mb-4 flex sm:justify-evenly flex-wrap gap-x-4 gap-y-2'>
                    <div className='flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_hh)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_hh)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total HH :</span><span className='font-semibold col-span-6'>{nullToZero(parseInt(totalData?.total_arrear_hh) + parseInt(totalData?.total_current_hh))}</span></div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Demand :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_arrear_demand)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Demand :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_demand)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Demand :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_arrear_demand) + parseFloat(totalData?.total_current_demand))}</span></div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Collection :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_arrear_collection)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Collection :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_collection)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Collection :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_arrear_collection) + parseFloat(totalData?.total_current_collection))}</span></div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Balance :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_due)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Balance :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_old_due)}</span></div>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Balance :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_current_due) + parseFloat(totalData?.total_old_due))}</span></div>
                    </div>

                </div>

                    <div className={isHH ? 'visible' : 'hidden'}>
                    <ListTable
                        columns={byWardWithHhColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> 
                    </div>
                    <div className={!isHH ? 'visible' : 'hidden'}>
                    <ListTable
                        columns={byWardColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> 
                    </div>

                </> :
                    <>
                        <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
                    </>
            }

<div className='h-[20vh]'></div>

        </>
    )
}

export default DcbReport