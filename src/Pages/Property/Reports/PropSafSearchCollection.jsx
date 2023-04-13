import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import {RiFilter2Line} from 'react-icons/ri'
// import ListTableConnect from '@/Components/Common/ListTableCustom/ListTableConnect'
import { indianAmount, nullToNA, nullToZero } from '@/Components/Common/PowerUps/PowerupFunctions'
import moment from 'moment'
const ListTableConnect = React.lazy(() => import('@/Components/Common/ListTableCustom/ListTableConnect'))

const PropSafSearchCollection = () => {

    const {get_MasterData, get_collectorList, searchPropertyCollection, searchSafCollection, searchGbSafCollection} = PropertyApiList()

    // const {type} = useParams()

    const navigate = useNavigate()

    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [loader, setloader] = useState(false)
    const [collection, setcollection] = useState('')
    const [requestBody, setrequestBody] = useState(null)// create this for list table connect
    const [changeData, setchangeData] = useState(0)// create this for list table connect
    
    let testDate = new Date().toLocaleDateString('in-IN');
    let todayDate = moment(testDate).format('YYYY-DD-MM');

    let title;
    // type == 'property' && (title = 'Property Collection Report')
    // type == 'saf' && (title = 'SAF Collection Report')
    // type == 'gbSaf' && (title = 'GB SAF Collection Report')
    

    useSetTitle('Collection Report')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const validationSchema = yup.object({
        fromDate : yup.string().required('Field Required'),
        uptoDate : yup.string().required('Field Required'),
        collType : yup.string().required('Field Required'),
        // wardId : yup.string().required('Field Required'),
        // userId : yup.string().required('Field Required'),
        // paymentMode : yup.string().required('Field Required'),
    })

    let initialVal;

    // if(type == 'gbSaf'){
    //     initialVal = {
    //         fromDate : '',
    //         uptoDate : '',
    //         collType : '',
    //         wardId : '',
    //         paymentMode: ''
    // }
    // } else {
    //     initialVal ={
    //         fromDate : '',
    //         uptoDate : '',
    //         collType : '',
    //         wardId : '',
    //         userId : '',
    //         paymentMode: ''
    // }
    // } 

    const formik = useFormik({
        initialValues: {
            fromDate : todayDate,
            uptoDate : todayDate,
            collType : 'property',
            wardId : '',
            userId : '',
            paymentMode: ''
        },
        onSubmit: (values) => {
            setcollection(values?.collType)
            if(values?.collType == 'gbSaf'){
              setrequestBody({
                fromDate : formik.values.fromDate,
                uptoDate : formik.values.uptoDate,
                wardId : formik.values.wardId,                          
                paymentMode : formik.values.paymentMode,
            })  
            } else {
                setrequestBody({
                    fromDate : formik.values.fromDate,
                    uptoDate : formik.values.uptoDate,
                    wardId : formik.values.wardId, 
                    userId : formik.values.userId,                              
                    paymentMode : formik.values.paymentMode
                })
            }
            
            setchangeData(prev => prev + 1)
        }
        , validationSchema
    })

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

    const gettingCollectorList = (e) => {

        setloader(true)

        axios.post(get_collectorList, {wardId : e.target.value}, ApiHeader())
        .then((res) => {

            if(res?.data?.status == true){
                console.log("getting collector list => ", res)
                setcollectorList(res?.data?.data)
            } else {
                // console.log('error getting collector list => ', res)
            }
            setloader(false)
        })
        .catch(err => (console.log('error getting collector list => ', err), setloader(false)))
    }

    const propColumn = [
            {
                Header: "S.No.",
                Cell: ({ row }) => <div>{row?.index + 1}</div>
            },
            {
                Header: "Ward No",
                accessor: "ward_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Property Tax No",
                accessor: "pt_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Holding No",
                accessor: "holding_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Unique House No",
                accessor: "new_holding_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Owner Name",
                accessor: "owner_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Mobile No",
                accessor: "mobile_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Payment(From/Upto)",
                accessor: "from_upto_fy_qtr",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            
            {
                Header: "Tran. Date",
                accessor: "tran_date",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. Mode",
                accessor: "transaction_mode",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (props) => {return <>{indianAmount(props?.value)}</>}
            },
            {
                Header: "Tax Collector",
                accessor: "emp_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. No",
                accessor: "tran_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Check/DD No",
                accessor: "cheque_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Bank",
                accessor: "bank_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Branch",
                accessor: "branch_name",
                Cell: (props) => {return nullToNA(props?.value)}
            }
        ]

        const safColumn = [
            {
                Header: "S.No.",
                Cell: ({ row }) => <div>{row?.index + 1}</div>
            },
            {
                Header: "Ward No",
                accessor: "ward_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Property Tax No",
                accessor: "pt_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Holding No",
                accessor: "holding_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Saf No",
                accessor: "saf_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Owner Name",
                accessor: "owner_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Mobile No",
                accessor: "mobile_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Payment(From/Upto)",
                accessor: "from_upto_fy_qtr",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            
            {
                Header: "Tran. Date",
                accessor: "tran_date",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. Mode",
                accessor: "transaction_mode",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (props) => {return <>{indianAmount(props?.value)}</>}
            },
            {
                Header: "Tax Collector",
                accessor: "emp_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. No",
                accessor: "tran_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Check/DD No",
                accessor: "cheque_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Bank",
                accessor: "bank_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Branch",
                accessor: "branch_name",
                Cell: (props) => {return nullToNA(props?.value)}
            }
        ]

        const gbSafColumn = [
            {
                Header: "S.No.",
                Cell: ({ row }) => <div>{row?.index + 1}</div>
            },
            {
                Header: "Ward No",
                accessor: "ward_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Application No.",
                accessor: "application_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Address",
                accessor: 'prop_address',
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Payment(From/Upto)",
                accessor: "from_upto_fy_qtr",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            
            {
                Header: "Tran. Date",
                accessor: "tran_date",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. Mode",
                accessor: "transaction_mode",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (props) => {return <>{indianAmount(props?.value)}</>}
            },
            {
                Header: "Tax Collector",
                accessor: "emp_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Tran. No",
                accessor: "tran_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Check/DD No",
                accessor: "cheque_no",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Bank",
                accessor: "bank_name",
                Cell: (props) => {return nullToNA(props?.value)}
            },
            {
                Header: "Branch",
                accessor: "branch_name",
                Cell: (props) => {return nullToNA(props?.value)}
            }
        ]

        const navigateFun = () => {
            collection == 'property' ? navigate('/payment-mode-wise-summary/property') : navigate('/payment-mode-wise-summary/saf')
        }

  return (
    <>
    
        <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md ">
            <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Collection Report</h1>

            <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">
                
                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        From Date :
                    </div>
                    <div className="col-span-6">
                        <input type="date" name="fromDate" id="" className={commonInputStyle} defaultValue={todayDate}/>
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
                        <input type="date" name="uptoDate" id="" className={commonInputStyle} defaultValue={todayDate}/>
                    </div>
                    <div className="col-span-12 text-end">
                        {formik.touched.uptoDate && formik.errors.uptoDate && <><span className="text-red-600 text-xs">{formik.errors.uptoDate}</span></>}
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Collection Type : 
                    </div>
                    <div className="col-span-6">
                        <select name="collType" id="" className={commonInputStyle} onChange={formik.values.collType != 'gbSaf' && gettingCollectorList}>
                            <option value='property'>Property</option>
                            <option value='saf'>SAF</option>
                            <option value='gbSaf'>GB SAF</option>
                        </select>
                    </div>
                    <div className="col-span-12 text-end">
                        {formik.touched.collType && formik.errors.collType && <><span className="text-red-600 text-xs">{formik.errors.collType}</span></>}
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Ward No. : 
                    </div>
                    <div className="col-span-6">
                        <select name="wardId" id="" className={commonInputStyle} onChange={formik.values.collType != 'gbSaf' && gettingCollectorList}>
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

                {formik.values.collType != 'gbSaf' && <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Collector Name :
                    </div>
                    <div className="col-span-6">
                        <select name="userId" id="" className={commonInputStyle}>
                            <option value=''>All</option>
                            {
                                collectorList?.map((elem) => <>
                                    <option value={elem?.id}><span className="capitalize">{elem?.user_name}</span>&nbsp;<span className="uppercase">({elem?.user_type})</span></option>
                                </>)
                            }
                        </select>
                    </div>
                    <div className="col-span-12 text-end text-xs text-red-500">
                        select ward no to get collector name list
                    </div>
                </div>}

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Payment Mode :
                    </div>
                    <div className="col-span-6">
                        <select name="paymentMode" id="" className={commonInputStyle}>
                            <option value=''>All</option>
                            <option value="CASH" >Cash</option>
                            <option value="CHEQUE" >Cheque</option>
                            <option value="DD" >DD</option>
                            <option value="ONLINE" >Online</option>
                        </select>
                    </div>
                    {/* <div className="col-span-12 text-end">
                        {formik.touched.paymentMode && formik.errors.paymentMode && <><span className="text-red-600 text-xs">{formik.errors.paymentMode}</span></>}
                    </div> */}
                </div>

                <div className="w-full md:w-[20%] flex justify-start items-center">
                    <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>
                </div>

            </div>
        </form>

        {(collection != '' && collection != 'gbSaf') && <div className='w-full text-end'>
            <button className="font-semibold px-6 py-2 bg-indigo-500 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white" onClick={() => navigateFun()}>Payment Mode Wise Summary</button>
            </div>}

        {
                (requestBody != null && collection == 'gbSaf') && 
                <ListTableConnect 
                type='old' // if pagination is from laravel
                api={searchGbSafCollection} // sending api
                columns={gbSafColumn} // sending column
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                />
            }

{
                (requestBody != null && collection == 'saf') && 
                <ListTableConnect 
                type='old' // if pagination is from laravel
                api={searchSafCollection} // sending api
                columns={safColumn} // sending column
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                />
            }

{
                (requestBody != null && collection == 'property') && 
                <ListTableConnect 
                type='old' // if pagination is from laravel
                api={searchPropertyCollection} // sending api
                columns={propColumn} // sending column
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                />
            }

{/* {
                (requestBody != null && collection != 'gbSaf') && 
                <ListTableConnect 
                type='old' // if pagination is from laravel
                api={collection == 'property' ? searchPropertyCollection : searchSafCollection} // sending api
                columns={collection == 'property' ? propColumn : safColumn} // sending column
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                />
            } */}

<div className='h-[20vh]'></div>
    </>
  )
}

export default PropSafSearchCollection