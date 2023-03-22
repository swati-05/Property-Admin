import React from 'react'
import Rate from '../../../../../Components/Media/rate.png'


function UsageFactor2() {
    return (
        <>
            <div className=''>
                <h1 className='px-2 font-semibold mt-4 text-gray-600 text-sm'><img className='inline w-6' src={Rate} alt="rate-image" /> Usage Factor 2</h1>

                <table className='min-w-full leading-normal mt-2'>
                    <thead className='font-bold text-left text-sm bg-indigo-600 text-white'>
                        <tr>
                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                            <th className="px-2 py-3 border-b  text-xs capitalize text-left border-r border-l border-white">Usage Type</th>
                            <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Multiplying Factor</th>

                        </tr>
                       
                    </thead>
                    <tbody className="text-sm">
                        <>
                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                <td className="px-2 py-2 text-sm text-left ">1</td>
                                <td className="px-2 py-2 text-sm text-left border-l border-gray-500">RESIDENTIAL</td>
                                <td className="px-2 py-2 text-sm text-left border-l border-gray-500">2,241.00</td>
                               
                            </tr>
                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                <td className="px-2 py-2 text-sm text-left ">2</td>
                                <td className="px-2 py-2 text-sm text-left border-l border-gray-500">COMMERCIAL ESTABLISHMENTS AND UNDERTAKING OF STATE AND CENTRAL GOVERNMENT</td>
                                <td className="px-2 py-2 text-sm text-left border-l border-gray-500">2,241.00</td>
                            </tr>
                        </>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsageFactor2