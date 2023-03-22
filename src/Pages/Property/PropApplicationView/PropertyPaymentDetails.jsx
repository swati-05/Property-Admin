//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 20 Nov 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - ActiveSafApplicationDeatilsByid
// >DESCRIPTION - ActiveSafApplicationDeatilsByid Component
//////////////////{*****}//////////////////////////////////////////



import React, { useState, useEffect } from 'react'


import axios from 'axios'
import { Link } from 'react-router-dom'
import BackComponent from './BackComponent'

function PropertyPaymentDetails() {

    // const { api_getTranscationHistory } = CitizenApplyApiList()

    // const [transcationList, settranscationList] = useState()

    // let token = window.localStorage.getItem('token')
    // const header = {
    //     headers:
    //     {
    //         Authorization: `Bearer ${token}`,
    //         Accept: 'application/json',
    //     }
    // }

    // //{////********ApplicationList*******//////}
    // const fetchTranscationList = () => {
    //     axios.get(api_getTranscationHistory,
    //         // {
    //         //     module: module.module
    //         // },
    //         {
    //             headers:
    //             {
    //                 Authorization: `Bearer ${token}`,
    //                 Accept: 'application/json',
    //             }
    //         }
    //     )
    //         .then(function (response) {
    //             console.log("all transcation list----- ", response.data.data);
    //             settranscationList(response.data.data)

    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })

    // }

    // useEffect(() => {
    //     fetchTranscationList();
    // }, [])

    return (
        <>

            <div className='p-2 '>
                <Link to='/activeSafFullDetails/:safId/:type'>
                    <BackComponent />
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-2 mx-auto  w-full'>

                <div className='col-span-12 bg-gray-50 p-4'>
                    <div className='flex flex-row'>
                        <h1 className='px-1 font-semibold font-serif text-2xl mt-4'>All Transcation Related To Property</h1>
                    </div>

                    <table className='min-w-full leading-normal mt-10'>
                        <thead className='font-bold text-left text-sm bg-green-50 text-gray-600'>
                            <tr>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">#</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Status</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Saf No.</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">From finanacial year</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Upto finanacial year</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">From Quater</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Upto Quater</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Transcation No.</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Transcation Date</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Amount</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Penalty Amount</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Discount Amount</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Payable Amount</th>
                                <th className="px-2 py-3 border-b border-gray-200   text-xs capitalize text-left">Demand Amount</th>

                            </tr>
                        </thead>
                        <tbody className="text-sm">

                            <>
                                {/* {transcationList?.map((items) => (
                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                        <td className="px-2 py-2 text-sm text-left">1</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.verify_status}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.saf_no}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.from_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.upto_fyear}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.from_qtr}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.upto_qtr}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.tran_no}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.tran_date}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.amount}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.penalty_amt}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.discount_amt}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.payable_amt}</td>
                                        <td className="px-2 py-2 text-sm text-left">{items.demand_amt}</td>
                                    </tr>
                                ))} */}
                                <tr className="bg-white shadow-lg border-b border-gray-200">
                                    <td className="px-2 py-2 text-sm text-left">1</td>
                                    <td className="px-2 py-2 text-sm text-left">Payment success</td>
                                    <td className="px-2 py-2 text-sm text-left">SAF1234567</td>
                                    <td className="px-2 py-2 text-sm text-left">2022</td>
                                    <td className="px-2 py-2 text-sm text-left">2023</td>
                                    <td className="px-2 py-2 text-sm text-left">1</td>
                                    <td className="px-2 py-2 text-sm text-left">2</td>
                                    <td className="px-2 py-2 text-sm text-left">45678908765476</td>
                                    <td className="px-2 py-2 text-sm text-left">23/11/2022</td>
                                    <td className="px-2 py-2 text-sm text-left">1500</td>
                                    <td className="px-2 py-2 text-sm text-left">0</td>
                                    <td className="px-2 py-2 text-sm text-left">0</td>
                                    <td className="px-2 py-2 text-sm text-left">1500</td>
                                    <td className="px-2 py-2 text-sm text-left">0</td>
                                </tr>
                            </>

                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default PropertyPaymentDetails