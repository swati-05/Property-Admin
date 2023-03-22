import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useParams } from 'react-router-dom'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import { CSVDownload, CSVLink } from 'react-csv'
import BarLoader from '@/Components/Common/BarLoader'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import {RiFilter2Line} from 'react-icons/ri'
import ListTable from '@/Components/Common/ListTable/ListTable'
import PaymentModeWiseSummaryTable from './PaymentModeWiseSummaryTable'

const PaymentModeWiseSummary = () => {

    const {get_MasterData, propPaymentModeWiseSummary, safPaymentModeWiseSummary, get_collectorList} = PropertyApiList()

    const location = useLocation()

    const {type} = useParams()

    const [wardList, setwardList] = useState()
    const [collectorList, setcollectorList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)
    const [isProperty, setisProperty] = useState(true)
    const [yearData, setyearData] = useState()

    useSetTitle('Ward Wise Holding Report')

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    useSetTitle(`Payment mode wise ${type} summary`)

    const validationSchema = yup.object({
        fromDate : yup.string().required('Field Required'),
        uptoDate : yup.string().required('Field Required'),
        // wardId : yup.string().required('Field Required'),
        // userId : yup.string().required('Field Required'),
        // paymentMode : yup.string().required('Field Required'),
    })

    const formik = useFormik({
        initialValues: {
            fromDate : '',
            uptoDate : '',
            wardId : '',
            userId : '',
            paymentMode: ''
        },
        onSubmit: (values) => {
            searchFun(values)
        }
        , validationSchema
    })

    const searchFun = () => {
        
        setloader(true)

        let body 
        
        type == 'saf' ? 
        body = {
            fromDate : formik.values.fromDate,
            uptoDate : formik.values.uptoDate,
            wardId : formik.values.wardId,                          
            userId : formik.values.userId,   
            paymentMode : formik.values.paymentMode,
        } 
        : 
        body = {
            fromDate : formik.values.fromDate,
            uptoDate : formik.values.uptoDate,
            wardId : formik.values.wardId,  
        }

        console.log('data before hitting api => ', body)

        axios.post(
            isProperty ? propPaymentModeWiseSummary : safPaymentModeWiseSummary, body, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('search success => ', res)
                setdataList(res?.data?.data)
            } else {
                console.log('error while search => ', res)
            }

            setloader(false)
        })
        .catch((err) => (console.log('error while search => ', err), setloader(false)))

    }

    useEffect(() => {
        gettingMasterList()
        location.pathname == '/property-report' && setisProperty(true)
        location.pathname == '/saf-report' && setisProperty(false)
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
                // console.log("getting collector list => ", res)
                setcollectorList(res?.data?.data)
            } else {
                // console.log('error getting collector list => ', res)
            }
            setloader(false)
        })
        .catch(err => (console.log('error getting collector list => ', err), setloader(false)))
    }
      
  return (
    <>

    <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md ">
            <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Summary</h1>

            <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">
                
                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        From Date :
                    </div>
                    <div className="col-span-6">
                        <input type="date" name="fromDate" id="" className={commonInputStyle} />
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
                        <input type="date" name="uptoDate" id="" className={commonInputStyle} />
                    </div>
                    <div className="col-span-12 text-end">
                        {formik.touched.uptoDate && formik.errors.uptoDate && <><span className="text-red-600 text-xs">{formik.errors.uptoDate}</span></>}
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Ward No. : 
                    </div>
                    <div className="col-span-6">
                        <select name="wardId" id="" className={commonInputStyle} onChange={gettingCollectorList}>
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

                {
                    type == 'saf' && <>
                    <div className="flex flex-col w-full md:w-[20%]">
                    <div className="col-span-6 font-semibold">
                        Collector Name :
                    </div>
                    <div className="col-span-6">
                        <select name="userId" id="" className={commonInputStyle}>
                            <option value=''>All</option>
                            {
                                collectorList?.map((elem) => <>
                                    <option value={elem?.id}>{elem?.user_name}&nbsp;({elem?.user_type})</option>
                                </>)
                            }
                        </select>
                    </div>
                    <div className="col-span-12 text-end text-xs text-red-500">
                        select ward no to get collector name list
                    </div>
                </div>

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
                </div>
                    </>
                }

                <div className="w-full md:w-[20%] flex justify-start items-end">
                    {loader ? <>
                                <div className='flex justify-start items-end'>
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
            (dataList != undefined && dataList?.length != 0) ? <>

            <PaymentModeWiseSummaryTable data={dataList?.collection} type='collection' />
            <PaymentModeWiseSummaryTable data={dataList?.doorToDoor} type='doorToDoor' />
            <PaymentModeWiseSummaryTable data={dataList?.jsk} type='jsk' />
            <PaymentModeWiseSummaryTable data={dataList?.netCollection} type='netCollection' />
            <PaymentModeWiseSummaryTable data={dataList?.refund} type='refund' />

            </> : 
            <>
                <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
            </>
        }           




    </>
  )
}

export default PaymentModeWiseSummary