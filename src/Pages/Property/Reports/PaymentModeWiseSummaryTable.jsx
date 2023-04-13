import { indianAmount } from '@/Components/Common/PowerUps/PowerupFunctions'
import React from 'react'

const PaymentModeWiseSummaryTable = (props) => {
  return (
    <>


            <div>
                <h1 className='w-full border-b-2 border-gray-700 text-gray-700 text-center text-lg font-semibold uppercase tracking-[0.7rem] mt-10'>
                    {props?.type == 'collection' && 'Collection'}
                    {props?.type == 'doorToDoor' && 'Door To Door'}
                    {props?.type == 'jsk' && 'JSK'}
                    {props?.type == 'netCollection' && 'Net Collection'}
                    {props?.type == 'refund' && 'Refund'}
                    &nbsp;
                    Summary
                </h1>
            </div>

             <table className="w-full mt-2">

<tr>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Transaction Mode</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of Holding</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of Transaction</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Amount</td>
</tr>

{props?.data?.length > 0 && 
  props?.data?.map((data, index) => 
  <tr>
    <td className="border-[1px] border-gray-700 pl-1">{(data?.transaction_mode == '' || data?.transaction_mode == null) ? 'N/A' : data?.transaction_mode}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.holding_count}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.tran_count}</td>
    <td className="border-[1px] border-gray-700 pl-1">{indianAmount(data?.amount)}</td>
</tr>
  )
}

</table>

</>
)
}

export default PaymentModeWiseSummaryTable