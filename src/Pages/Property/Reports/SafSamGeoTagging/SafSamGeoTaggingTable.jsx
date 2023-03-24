
const SafSamGeoTaggingTable = (props) => {
  
  const getSum = (key) => {
    let sum = 0;
    props?.data?.forEach((item) => {
      sum += parseInt(item[key]);
    });
    return sum;
  }
  
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
    <td className="border-[1px] border-gray-700 pl-1">{data?.ward_no}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.total_saf}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.total_sam}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.total_fam}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.total_geotaging}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.total_btc}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.pending_sam}</td>
    <td className="border-[1px] border-gray-700 pl-1">{data?.pending_fam}</td>
</tr>
  )
}

<tr>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold text-center" colSpan={2}>Total</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('total_saf')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('total_sam')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('total_fam')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('total_geotaging')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('total_btc')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('pending_sam')}</td>
    <td className="border-[1px] border-gray-700 pl-1 font-semibold">{getSum('pending_fam')}</td>
</tr>

</table>

</>
)
}

export default SafSamGeoTaggingTable