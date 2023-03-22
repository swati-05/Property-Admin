
const SafSamGeoTaggingTable = (props) => {
  return (
    <>

<table className="w-full mt-2">

<tr>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">S.No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Ward No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of SAF</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of SAM</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of FAM</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of Geo-Tagging</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of Back To Citizen</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of SAM Pending</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">No. of FAM Pending</td>
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
</tr>

</table>

</>
)
}

export default SafSamGeoTaggingTable