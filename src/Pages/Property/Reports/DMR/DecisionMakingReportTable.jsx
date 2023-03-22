const DecisionMakingReportTable = (props) => {
  return (
    <>

<table className="w-full mt-2">

<tr>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">S.No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Ward No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">ULB Provided Legacy Data (3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">New Assessment (4.1)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Re Assessment (4.2)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Mutation (4.3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total SAF (5=4)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">To Be Reassessed From DB(6)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total HH as per Records (7=5+6)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">% of non reassessed (8=3/6)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Fully Digitized SAF From DB(9)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">SAM (10)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">SAM % 11=10/9%</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Geo Tagging from DB (12)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Geo Tagging % (13=12/9)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Pure No of Comm. HH (14.1)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Mixed (14.2)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Govt Building (14.3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Vacant Land (14.4)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Pure No of Res. HH (14.5)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">BTC</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">FAM Pending</td>
</tr>

{props?.data?.length > 0 && 
  props?.data?.map((data, index) => 
  <tr>
    <td className="border-[1px] border-gray-700 pl-1">{index + 1}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.transaction_mode}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.holding_count}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.tran_count}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.amount}</td>
</tr>
  )
}

<tr>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold" colSpan={2}>Total</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.holding_count}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.tran_count}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{props?.data?.amount}</td>
</tr>

</table>

</>
)
}

export default DecisionMakingReportTable