import useSetTitle from "@/Components/GlobalData/useSetTitle"
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from "react"
import axios from "axios"
import ApiHeader from "@/Components/ApiList/ApiHeader"
import { useState } from "react"
import BarLoader from "@/Components/Common/BarLoader"

const DecisionMakingReportTable = (props) => {

  useSetTitle('Decision Making Report')

      const {searchDecisionMakingReport} = PropertyApiList()

      const [loader, setloader] = useState(false)
      const [dataList, setdataList] = useState()

      useEffect(() => {

        setloader(true)

        axios.post(
          searchDecisionMakingReport, {}, ApiHeader())
      .then((res) => {
          if(res?.data?.status == true){
              console.log('search success => ', res)
              setdataList(res?.data?.data)
          } else {
              console.log('error while search => ', res)
          }

          setloader(false)
      })
      .catch((err) => (console.log('error while search => ', err), setloader(false)))

      },[])

      if(loader){
        return <BarLoader />
      }

  return (
    <>

<div>
                <h1 className='w-full border-b-2 border-gray-700 text-gray-700 text-center text-lg font-semibold uppercase tracking-[0.7rem] mb-2 mt-8'>
                    Decision Making Report
                </h1>
            </div>

<table className="w-full mt-2">

<tr>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">S.No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Ward No.</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Legacy Data (3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Reassessment (4.1)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Mutation (4.2)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Mutation (4.3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total SAF (5)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total To Be Reassessed (6)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total HH as per Records (7=5+6)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Holding (7)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Non Assessed Percentage (8)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Fully Digitized SAF (9)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total SAM (10)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">SAM Percentage (11)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Geo Tagging (12)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Geo Tagging Percentage (13)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Pure Commercial (14.1)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Mix SAF (14.2)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Pure Govt (14.3)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total Pure Residential (14.4)</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total BTC</td>
    <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Total FAM</td>
</tr>

{(dataList != undefined && dataList?.length != 0) ? <> {

  dataList?.map((data, index) => 
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

</> : 
<tr>
                <td className='w-full my-4 text-center text-red-500 text-lg font-bold' colSpan={22}>No Data Found</td>
            </tr>
}



</table>

</>
)
}

export default DecisionMakingReportTable