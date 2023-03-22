import React from 'react'
import RzpTestPayment from './RzpTestPayment'
import { HiCurrencyRupee } from 'react-icons/hi';

function TestPayment() {

    const payData = {
        name: "Dipu Kumar",
        phone: 9708846652,
        email: "dsingh197@gmail.com",
        amount: 55,
        module: "property"
    }

    return (
        <>
            <h1>This is payment page</h1>

            <div className='bg-red-200 shadow-lg rounded-sm m-10'>
                <div className='bg-indigo-200 border-b-2 py-1 pl-3 font-semibold border-red-400 shadow-md flex'><HiCurrencyRupee size={20} className='mt-1 mr-1' /> Payment</div>
                <div className='grid grid-cols-12 px-8 py-3 leading-8'>
                    <div className='md:col-span-6 col-span-12'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6 font-semibold'>
                                <p>Name</p>
                                <p>Ward No</p>
                                <p>Owner Type</p>
                                <p>Property Type</p>
                                <p>Category Type</p>
                            </div>
                            <div className='col-span-6'>
                                <p>Dipu Kumar Singh</p>
                                <p>43 A</p>
                                <p>Tenet</p>
                                <p>Commercial</p>
                                <p>II / III</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:col-span-6 col-span-12'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6 font-semibold'>
                                <p>Amount</p>
                                <p>Email</p>
                                <p>Phone</p>
                            </div>
                            <div className='col-span-6'>
                                <p>{payData.amount}</p>
                                <p>{payData.email}</p>
                                <p>{payData.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 md:mt-4 mt-10'>
                        <div className='flex justify-center'>
                            {/* <button className='mx-2 bg-red-600 hover:bg-red-700 transition duration-200 hover:scale-105 font-normal text-white px-6 py-1 text-lg  rounded-sm shadow-xl'>Back</button> */}
                            <RzpTestPayment data={payData} />
                            {/* <button className='mx-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 hover:scale-105 font-normal text-white px-3 py-1 text-lg  rounded-sm shadow-xl'>Pay Now</button> */}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TestPayment