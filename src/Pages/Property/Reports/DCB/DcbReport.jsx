import { useFormik } from 'formik'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
import { indianAmount, nullToZero } from '@/Components/Common/PowerUps/PowerupFunctions'
import CitizenApplyApiList from '@/Components/ApiList/CitizenApplyApiList'
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'
import ListTable from '@/Components/Common/ListTableMargin/ListTable'
import * as yup from 'yup'

const PieChart = React.lazy(() => import('@/Pages/Property/Reports/PieChart')) 

const DcbReport = () => {

    const { get_MasterData, searchWardWiseDcb, yearList, getPieChartData } = PropertyApiList()
    const {api_getAllUlb} = CitizenApplyApiList()

    useSetTitle('DCB Report')

    const ulbId = window.localStorage.getItem('ulbId')

    const [wardList, setwardList] = useState()
    const [ulbList, setulbList] = useState()
    const [yearData, setyearData] = useState(null)
    const [loader, setloader] = useState(false)
    const [loader2, setloader2] = useState(false)
    const [isHH, setisHH] = useState(false)
    const [dataList, setdataList] = useState(null)
    const [totalData, settotalData] = useState(null)
    const [showPiechart, setshowPiechart] = useState(true)
    const [pieChartData, setpieChartData] = useState(null)
    const [isCe, setisCe] = useState(false)
    const [byUlb, setbyUlb] = useState(false)

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            ulbId: nullToNA(ulbId) == 'NA' ? '' : ulbId,
            wardId: '',
            fiYear: yearData != null && yearData[0],
            withHh : '0',
            withCe : '0'
        },

        enableReinitialize: true,

        onSubmit: (values) => {
            setloader2(false)
            setshowPiechart(false)
            console.log("submitting report search values => ", values)
            if(values?.ulbId == ''){
                setbyUlb(true)
            } else {
                setbyUlb(false)
            }
            if(values?.withHh == '0' || values?.withHh[0] == null){
                setisHH(false)
            }
            if(values?.withHh[0] == 'on'){
                setisHH(true)
            }
            if(values?.withCe == '0' || values?.withCe[0] == null){
                setisCe(false)
            }
            if(values?.withCe[0] == 'on'){
                setisCe(true)
            }
            searchFun(values)
        },
        validationSchema : yup.object({
            ulbId : yup.string().required("Select ULB")
        })

    })
    const searchFun = (values) => {

        setloader(true)

        let body;
        
        if(nullToNA(ulbId) != 'NA') {
            body = {
                ulbId : formik.values.ulbId,
                wardId: formik.values.wardId,
                fiYear: formik.values.fiYear,
            }
        } else {
            body = {
                ulbId : "",
                fiYear: formik.values.fiYear,
            }
        }

        axios.post(
            searchWardWiseDcb, body, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    setdataList(res?.data?.data?.dcb)
                    settotalData(res?.data?.data)
                } else {
                }

                setloader(false)
            })
            .catch((err) => setloader(false))

    }

    useEffect(() => {

        setloader2(true)

        axios.post(getPieChartData,{ulbId : (nullToNA(ulbId) == 'NA' ? '' : ulbId)}, ApiHeader())
        .then((res) => {

            if (res?.data?.status == true) {
                setpieChartData(res?.data?.data)
            } else {
            }

        })
        .catch(err => {})
        .finally(() => setloader2(false))

        axios.get(get_MasterData, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    setwardList(res?.data?.data?.ward_master)
                } else {
                }

            })
            .catch(err => {})

        axios.post(yearList,{}, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                setyearData(res?.data?.data)
            } else {
            }
            
        })
        .catch(err => {})

        axios.get(api_getAllUlb, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                setulbList(res?.data?.data)
            } else {
            }
            
        })
        .catch(err => {})

    }, [])

    const handleHHChange = (e) => {
        const name = e.target.name
        const checkValue = e.target.checked;
    }

    const byWardahscColumn = [

        {
            Header : '_',
            columns : [
                {
                    Header: "Ward No",
                    accessor: "ward_no",
                    Cell: (props) => {return nullToNA(props?.value)}
                }
            ]
            },

        {
            Header : 'DEMAND',
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_demand_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#22C55E]'
                },
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "HH",
            accessor: "current_demand_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
            ],
            className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_collection_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#6366F1]'
                },
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "HH",
            accessor: "current_collection_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
            ],
            className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_balance_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#EC4899]'
                },
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "HH",
            accessor: "current_balance_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
            ],
            className: 'text-white bg-[#EC4899]'
        },

    ]

    const byWardahacColumn = [

        {
            Header : '_',
            columns : [
                {
                    Header: "Ward No",
                    accessor: "ward_no",
                    Cell: (props) => {return nullToNA(props?.value)}
                }
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_demand_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#22C55E]'
                },
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "HH",
            accessor: "current_demand_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
            ],
            className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_collection_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#6366F1]'
                },
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "HH",
            accessor: "current_collection_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
            ],
            className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_balance_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#EC4899]'
                },
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "HH",
            accessor: "current_balance_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
            ],
            className: 'text-white bg-[#EC4899]'
        },

        {
            Header : "Collection Efficiency",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_hh_eff",
                    Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
                },
                {
            Header: "Arrear",
            accessor: "arrear_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "HH",
            accessor: "current_hh_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "Current",
            accessor: "current_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
            ],
        },

    ]

    const byWardshacColumn = [

        {
            Header : '_',
            columns : [
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
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
            ],
                        className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
            ],
                        className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
            ],
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header : "Collection Efficiency",
            columns : [
                {
            Header: "Arrear",
            accessor: "arrear_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "Current",
            accessor: "current_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
            ],
        },

    ]

    const byWardshscColumn = [

        {
            Header : '_',
            columns : [
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
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
            ],
                        className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
            ],
                        className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
            ],
                        className: 'text-white bg-[#EC4899]'
        },

    ]

    const byUlbahscColumn = [
        
        {
            Header : '_',
            columns : [
                {
                    Header: "ULB Name",
                    accessor: "ulb_name",
                    Cell: (props) => {return nullToNA(props?.value)}
                },
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_demand_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#22C55E]'
                },
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "HH",
            accessor: "current_demand_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
            ],
            className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_collection_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#6366F1]'
                },
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "HH",
            accessor: "current_collection_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
            ],
            className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_balance_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#EC4899]'
                },
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "HH",
            accessor: "current_balance_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
            ],
            className: 'text-white bg-[#EC4899]'
        },

    ]

    const byUlbahacColumn = [

        {
            Header : '_',
            columns : [
                {
                    Header: "ULB Name",
                    accessor: "ulb_name",
                    Cell: (props) => {return nullToNA(props?.value)}
                },
            ]
        },

        {
            Header : 'DEMAND',
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_demand_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#22C55E]'
                },
                {
            Header: "Arrear",
            accessor: "arrear_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "HH",
            accessor: "current_demand_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#22C55E]'
        },
            ],
            className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_collection_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#6366F1]'
                },
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "HH",
            accessor: "current_collection_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#6366F1]'
        },
            ],
            className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_balance_hh",
                    Cell: (props) => {return nullToZero(props?.value)},
                    className: 'text-white bg-[#EC4899]'
                },
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "HH",
            accessor: "current_balance_hh",
            Cell: (props) => {return nullToZero(props?.value)},
            className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
            className: 'text-white bg-[#EC4899]'
        },
            ],
            className: 'text-white bg-[#EC4899]'
        },

        {
            Header : "Collection Efficiency",
            columns : [
                {
                    Header: "HH",
                    accessor: "arrear_hh_eff",
                    Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
                },
                {
            Header: "Arrear",
            accessor: "arrear_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "HH",
            accessor: "current_hh_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "Current",
            accessor: "current_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
            ],
        },

    ]

    const byUlbshacColumn = [

        {
            Header : '_',
            columns : [
                {
                    Header: "ULB Name",
                    accessor: "ulb_name",
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
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
            ],
                        className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
            ],
                        className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
            ],
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header : "Collection Efficiency",
            columns : [
                {
            Header: "Arrear",
            accessor: "arrear_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
        {
            Header: "Current",
            accessor: "current_eff",
            Cell: (props) => {return <>{nullToZero(props?.value)}%</>},
        },
            ],
        },

    ]

    const byUlbshscColumn = [

        {
            Header : '_',
            columns : [
                {
                    Header: "ULB Name",
                    accessor: "ulb_name",
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
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
        {
            Header: "Current",
            accessor: "current_demand",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#22C55E]'
        },
            ],
                        className: 'text-white bg-[#22C55E]'
        },

        {
            Header : "COLLECTION",
            columns : [
               {
            Header: "Arrear",
            accessor: "arrear_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
        {
            Header: "Current",
            accessor: "current_collection",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#6366F1]'
        },
            ],
                        className: 'text-white bg-[#6366F1]'
        },

        {
            Header : "BALANCE",
            columns : [
                {
            Header: "Arrear",
            accessor: "old_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
        {
            Header: "Current",
            accessor: "current_due",
            Cell: (props) => {return <>{indianAmount(props?.value)}</>},
                        className: 'text-white bg-[#EC4899]'
        },
            ],
                        className: 'text-white bg-[#EC4899]'
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
                    radius="9"
                    color="#4338ca" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /><span className='italic'>Pie Chart Loading...</span> </div>: 
<>
        {(pieChartData != null && (showPiechart && pieChartData?.length > 0) && dataList == null) && 
        <div className='my-4 bg-white rounded-md py-2 shadow-md'>
            <div className='flex flex-row-reverse flex-wrap items-end justify-evenly gap-x-2 w-[100%] '>
                {
                    pieChartData?.map((elem) => 
                        <div className='w-[20%] flex flex-col'><div className='bg-indigo-500 w-max px-2 text-white rounded-md text-xs sm:text-sm font-semibold shadow-md shadow-indigo-300'>{elem?.fyear}</div>
                        <PieChart label={['Total Demand', 'Total Collection', 'Total Balance']} data={[elem?.totaldemand, elem?.totalcollection, elem?.totalbalance]}/>
                        </div>
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
                {(ulbId == '' || ulbId == undefined) && <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Select ULB :
                        </div>
                        <div className="col-span-6">
                            <select name="ulbId" id="" className={commonInputStyle} disabled={loader}>
                            <option value="">Select</option>
                                {ulbList?.map((option) => (
                                  <option value={option.id}>{option.ulb_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-12 text-start">
                        {formik.touched.ulbId && formik.errors.ulbId && <><span className="text-red-600 text-xs">{formik.errors.ulbId}</span></>}
                    </div>
                    </div>}                    
                    
                    {formik.values.ulbId != '' && <div className="flex flex-col w-full md:w-[20%]">
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
                    </div>}

                            {/* ==========FY============= */}
                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Financial Year :
                        </div>
                        <div className="col-span-6">
                        <select name="fiYear" id="" className={commonInputStyle} disabled={loader}>
                            {
                                yearData?.map((elem, index) => <>
                                    <option value={elem}>{elem}</option>
                                </>)
                            }
                        </select>
                        </div>
                    </div> 

                    <div className="flex flex-col justify-center w-full md:w-[20%]">
                        <div className="col-span-12 font-semibold flex items-center justify-center mt-4">
                            <label htmlFor="withHh" className='mr-2'>With HH : </label>
                            <input type="checkbox" name="withHh" id="withHh" className='w-4 h-4 rounded' onChange={handleHHChange} 
                            // onClick={() => setisHH(!isHH)} 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center w-full md:w-[20%]">
                        <div className="col-span-12 font-semibold flex items-center justify-center mt-4">
                            <label htmlFor="withCe" className='mr-2'>With Collection Efficiency : </label>
                            <input type="checkbox" name="withCe" id="withCe" className='w-4 h-4 rounded' onChange={handleHHChange} 
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-[20%] flex justify-start items-end">
                        <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>
                    </div>

                </div>
            </form>

{
                (!loader && dataList != undefined && dataList?.length > 0) ? <>

                <div className='bg-white p-2 rounded-md shadow-md mb-4 grid grid-cols-12 flex-wrap gap-4'>

                    <div className='col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Demand :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_arrear_demand)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Demand HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_demand_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Demand :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_demand)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Demand HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_demand_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Demand :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_arrear_demand) + parseFloat(totalData?.total_current_demand))}</span></div>
                    </div>

                    <div className='col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Collection :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_arrear_collection)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Collection HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_collection_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Collection :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_collection)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Collection HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_collection_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Collection :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_arrear_collection) + parseFloat(totalData?.total_current_collection))}</span></div>
                    </div>

                    <div className='col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Balance :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_old_due)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Balance HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_balance_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Balance :</span><span className='font-semibold col-span-6'>{indianAmount(totalData?.total_current_due)}</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Balance HH :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_balance_hh)}</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Balance :</span><span className='font-semibold col-span-6'>{indianAmount(parseFloat(totalData?.total_current_due) + parseFloat(totalData?.total_old_due))}</span></div>
                    </div>

                    {isCe && <div className='col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-1'>
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear Efficiency :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_eff)}%</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Arrear HH Efficiency :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_arrear_hh_eff)}%</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current Efficiency :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_eff)}%</span></div>
                                                {isHH && <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Current HH Efficiency :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_current_hh_eff)}%</span></div>}
                        <div className='grid grid-cols-12 items-center gap-2'><span className='text-sm col-span-6'>Total Collection Efficiency :</span><span className='font-semibold col-span-6'>{nullToZero(totalData?.total_eff)}%</span></div>
                    </div>}

                </div>

                    {(!byUlb && isHH && !isCe) && <ListTable
                        columns={byWardahscColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    />} 
                    {(!byUlb && !isHH && !isCe) && <ListTable
                        columns={byWardshscColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> }
                    {(!byUlb && !isHH && isCe) && <ListTable
                        columns={byWardshacColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> }
                    {(!byUlb && isHH && isCe) && <ListTable
                        columns={byWardahacColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    />}
                    
                     {/*=====================================  */}

                     {(byUlb && isHH && !isCe) && <ListTable
                        columns={byUlbahscColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    />} 
                    {(byUlb && !isHH && !isCe) && <ListTable
                        columns={byUlbshscColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> }
                    {(byUlb && !isHH && isCe) && <ListTable
                        columns={byUlbshacColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    /> }
                    {(byUlb && isHH && isCe) && <ListTable
                        columns={byUlbahacColumn}            // sending columns 
                        dataList={dataList}          // sending data List
                    />}

                </> :
                    <>
                        {(!showPiechart && !loader) && <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>}
                    </>
            }

<div className='h-[20vh]'></div>

        </>
    )
}

export default DcbReport