import React, { useRef, useState, useEffect } from 'react';
import ComponentToPrint from './PaymentReceipt';
import { AiFillPrinter } from 'react-icons/ai'

function PaymentReceiptIndex(props) {


    return (<>
        <div>

<div>
                <div className='md:px-0 flex-1 '>
                    <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded  hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
                        <AiFillPrinter className='inline text-lg' />
                        Print All
                    </button>
                </div>
            </div>

            {
                props?.data?.data?.map((data, index) => <ComponentToPrint paymentData={data} index={index} /> )
            }
            
            
        </div>
    </>)
}

export default PaymentReceiptIndex