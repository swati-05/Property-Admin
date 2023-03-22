import axios from 'axios'
import PaymentApiList from '@/Pages/PaymentMaster/PaymentApiList'
import React, { useEffect, useState } from 'react'
import RazorpayMasterEntryScreen from '../PayemtGatewayMasterScreens/RazorpayMasterEntryScreen'


function MasterPaymentIndex() {

    const [ulbList, setUlbList] = useState()
    const [departmentList, setDepartmentList] = useState()
    const [pgList, setPgList] = useState()

    const [selectedUlbId, setSelectedUlbId] = useState()
    const [selectedDeparmentIs, setSelectedDeparmentIs] = useState()
    const [selectedPgList, setSelectedPgList] = useState()

    const { ulbListApi, getDepartmentByulb, getPaymentgatewayByRequests, header } = PaymentApiList(); // All Api End Url

    useEffect(() => { //get ulb list
        axios.get(ulbListApi)
            .then(function (res) { setUlbList(res.data.data) })
            .catch(function (err) { console.log("Error - get ulb list", err) })
    }, [])

    
    
    useEffect(() => { //get Department By ulb
        axios.post(getDepartmentByulb, { "ulbId": selectedUlbId }, header)  // Default "ulbId":1
        .then(function (res) { setDepartmentList(res.data.data) })
        .catch(function (err) { console.log("Error : - getDepartmentByulb", err) })
    }, [selectedUlbId])
    
    console.log("departmentList ==============", departmentList)
    
    useEffect(() => { //get Department By ulb
        axios.post(getPaymentgatewayByRequests, { "departmentId": 2, "ulbId": 1 }, header)  // Default "ulbId":1
            .then(function (res) { setPgList(res.data.data) })
            .catch(function (err) { console.log("Error : - getPaymentgatewayByRequests", err) })
    }, [selectedDeparmentIs])


    console.log("selectedUlbId", selectedUlbId, "selectedDeparmentIs", selectedDeparmentIs, "selectedPgList", selectedPgList)

    return (
        <>
            <div className='h-12 bg-sky-200 text-xl grid place-items-center font-semibold'>Master Payment Entry</div>
            <div className='flex space-x-10 justify-center py-5  shadow-xl'>
                <div>
                    <div>
                        <p className='font-semibold ml-1 my-1'>Choose a ULB</p>
                        <select onChange={(e) => setSelectedUlbId(e.target.value)} name="ulblist" className="w-full rounded-lg border-gray-200 py-2 px-5 text-sm border shadow-md">
                            <option value="">Select ULB</option>
                            {
                                ulbList?.map((item) => (
                                    <option value={item?.id}>{item?.ulb_name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <p className='font-semibold ml-1 my-1'>Choose a Department</p>
                    <select onChange={(e) => setSelectedDeparmentIs(e.target.value)} name="ulblist" className="w-full rounded-lg border-gray-200 py-2 px-5 text-sm border shadow-md">
                        <option value="">Select Department</option>
                        {departmentList?.status == true &&
                            departmentList?.map((item) => (
                                <option value={item.id}>{item.departmentName}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <p className='font-semibold ml-1 my-1'>Choose a Payment Gateway</p>
                    <select onChange={(e) => setSelectedPgList(e.target.value)} name="ulblist" className="w-full rounded-lg border-gray-200 py-2 px-5 text-sm border shadow-md">
                        <option value="">Select Payment Gateway</option>
                        {pgList &&
                            pgList?.map((item) => (
                                <option value={item.id}>{item.paymentGatewayName}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <RazorpayMasterEntryScreen />
            </div>

        </>
    )
}

export default MasterPaymentIndex