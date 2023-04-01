import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import building from '../../../Components/Media/building.png'
import folders from '../../../Components/Media/folders.png'
import { ColorRing } from "react-loader-spinner";
import TopTabs from './TopTabs'
import BarLoader from '@/Components/Common/BarLoader'
import BrandLoader from '@/Components/Common/BrandLoader'
import CommonModal from '@/Components/GlobalData/CommonModal'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import {MdTag} from 'react-icons/md'


function DetailsFactory(props) {

    // DIRECT ACCESSING ID FROM PARAM
    const { id } = useParams()
    console.log("param", id)

    const navigate = useNavigate()


    const [applicationFullData, setapplicationFullData] = useState()
    const [showDetails, setshowDetails] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);




    ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
    const getApplicationDetail = () => {
        seterroState(false)
        setisLoading(true)
        let token = window.localStorage.getItem('token')
        // console.log('token at basic details is  get method...', token)
        const header = {
            headers:
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }
        axios[props?.detailRules?.api?.api_getAppicationFullDetail?.method](props?.detailRules?.api?.api_getAppicationFullDetail?.url,
            {
                applicationId: id
            },
            header)
            .then(function (response) {
                setisLoading(false)
                console.log('view full details...', response.data)
                if (response?.data?.status) {
                    setapplicationFullData(response?.data?.data)
                } else {
                    seterroState(true)
                }
            })
            .catch(function (error) {
                setisLoading(false)
                seterroState(true)
                console.log('==2 details by id error...', error)
            })
    }

    console.log('test ..........at details entry')

    useEffect(() => {
        getApplicationDetail()
    }, [])

    if (isLoading) {
        return (
            <>
                <BrandLoader />
            </>
        )
    }
    if (erroState) {
        return (
            <CommonModal>
                <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
            </CommonModal>
        )
    }


    return (
        <>

            <div className='w-full mx-auto md:px-6'>

                {/* <h1 className='px-2 font-semibold text-center text-gray-600 font-serif py-2 xl md:text-3xl mt-2'>{props?.detailRules?.detailInfo?.title}</h1> */}
                <div className='pt-10'>

                    {props?.detailRules?.filters?.topButtons && <TopTabs title={`${props?.detailRules?.detailInfo?.title} - ${applicationFullData?.application_no}`} type="application" id={id} safNo={applicationFullData?.saf_no} active="property" />}
                    {props?.detailRules?.filters?.topButtons == false &&
                        <div>
                            <span className='font-bold text-gray-800 text-2xl'>
                                {(props?.detailRules?.detailInfo?.title)}
                            </span>
                        </div>}
                </div>

                <div className='flex flex-row flex-wrap justify-center'>

                    <div class="rounded-lg pt-4 z-50 w-full">
                        <div className=''>

                            <div className="text-gray-700 py-6 ">
                                <div className="grid md:grid-cols-2 text-sm bg-white shadow-lg rounded-sm py-4">
                                    {
                                        applicationFullData?.fullDetailsData?.cardArray?.data?.map((data) => (
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">{nullToNA(data?.displayString)} : </div>
                                                <div className="px-4 py-2">{nullToNA(data?.value)}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="block bg-indigo-500 border-2  shadow-lg text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 py-2 hover:bg-indigo-600 hover:text-white my-4"
                                    onClick={() => setshowDetails(!showDetails)}
                                >
                                    {showDetails ? 'Hide Full Details' : 'Show Full Details'}
                                </button>
                            </div>

                            {/* basic details */}
                            {
                                showDetails && <>
                                    {applicationFullData?.fullDetailsData?.dataArray?.map((data) => (
                                        <div className="">
                                            <div className="container mx-auto mb-0 mt-1  py-1 ">
                                                <div className="md:flex no-wrap ">
                                                    <div className="w-full">
                                                        <div className="py-3 rounded-sm">
                                                            <div className="flex items-center pl-0 space-x-2 font-semibold text-gray-900 leading-8 mb-2">
                                                                <div className="tracking-wide flex-1 text-md"><MdTag className="inline" />  {data?.headerTitle}</div>
                                                            </div>
                                                            <div className='shadow-lg rounded-lg  py-6 bg-white'>
                                                                <div className="grid grid-cols-10 space-y-2  pl-4 ">
                                                                    {data?.data?.map((data) => (
                                                                        <div className='col-span-2 text-xs'>
                                                                            <div className='font-bold text-sm'>{nullToNA(data?.value) }</div>
                                                                            <div className='text-gray-500'>{nullToNA(data?.displayString)}</div>
                                                                        </div>
                                                                    ))}

                                                                </div>

                                                            </div>

                                                        </div>



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        applicationFullData?.fullDetailsData?.tableArray?.map((data) => (
                                            <div className="" >
                                                <div className="container mx-auto mb-0 mt-1 py-1 ">
                                                    <div className="md:flex no-wrap">
                                                        <div className="w-full">
                                                            <div className="0 py-3 rounded-sm">
                                                                <div className="flex items-center pl-0 space-x-2 font-semibold text-gray-900 leading-8 mb-2">
                                                                    <span className="tracking-wide"><MdTag className="inline" /> {nullToNA(data?.headerTitle)}</span>
                                                                </div>

                                                                <>
                                                                    <table className='min-w-full leading-normal mt-2 bg-sky-5 shadow-lg rounded-lg'>
                                                                        <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                                                            <tr>
                                                                                <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                                                {data?.tableHead?.map((head) => (
                                                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">{nullToNA(head)}</th>
                                                                                ))}



                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="text-sm">

                                                                            <>
                                                                                {data?.tableData?.map((dataIn, index) => (
                                                                                    <tr className="bg-white  border-b border-gray-200">
                                                                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                                                        {dataIn?.map((dataIn2) => (
                                                                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(dataIn2) }</td>
                                                                                        ))}
                                                                                    </tr>
                                                                                ))}
                                                                            </>


                                                                        </tbody>
                                                                    </table>
                                                                </>


                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-full mt-40'></div>
        </>
    )
}

export default DetailsFactory