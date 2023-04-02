import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import PropertyApiList from "@/Components/ApiList/PropertyApiList";
import BarLoader from "@/Components/Common/BarLoader";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import useSetTitle from "@/Components/GlobalData/useSetTitle";
import BrandLoader from "@/Components/Common/BrandLoader";
import ServerErrorCard from "@/Components/Common/ServerErrorCard";
import CommonModal from "@/Components/GlobalData/CommonModal";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";

function TcComparision(props) {
  const [isLoading, setisLoading] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState()
  const [erroState, seterroState] = useState(false);

  const [comparisonData, setcomparisonData] = useState()
  const { id, type } = useParams()
  const { api_getPropHoldingDetailsById, api_getTcComparisonData } = PropertyApiList()
  let title

  if (type == 'agency') {
    title = 'Agency TC Comparison'

  } else {
    title = 'ULB TC Comparison'
  }

  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle(title)


  const openModal = () => {

  }


  const fetchTcComparisonData = () => {
    setisLoading(true)
    seterroState(true)
    let requestBody = {
      applicationId: id
    }
    axios.post(api_getTcComparisonData, requestBody, ApiHeader())
      .then(function (response) {
        console.log('tc comparison data list...', response?.data)
        if (response?.data?.status) {
          setcomparisonData(response?.data?.data)
        } else {
          seterroState(true)
        }
        setisLoading(false)
      })
      .catch(function (error) {
        console.log('tc comparison data error...', error)
        seterroState(true)
        setisLoading(false)
      })
  }

  useEffect(() => {
    fetchTcComparisonData()
  }, [])

  if (isLoading) {
    return (
      <>
        <BrandLoader />
      </>
    )
  }
  if (erroState) {
    return (
      <CommonModal>
        <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
      </CommonModal>
    )
  }

  return (
    <>
      {/* {isLoading && <BarLoader />} */}
      {/* <div className=" font-bold text-2xl pb-4 md:py-4 text-indigo-500">{type == 'agency' ? 'Agency' : 'ULB'} Tc Comparision</div> */}
      <div className=" text-xl pb-4 md:py-4 text-gray-500">
        <span>Verified By : <span className="font-semibold text-gray-800">{nullToNA(comparisonData?.employee_details?.user_name)}</span> </span>
        <span className="float-right">Verification Date : <span className="font-semibold text-gray-800">{nullToNA(comparisonData?.employee_details?.date)}</span></span> </div>
      <div className='w-full bg-white shadow-xl mb-6'>
        <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
          <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(comparisonData?.saf_details?.saf_no)}</div>
              <div className='text-gray-500 text-xs'>SAF No.</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(comparisonData?.saf_details?.ward_no) }</div>
              <div className='text-gray-500 text-xs'>Ward No.</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-lg'>{nullToNA(comparisonData?.saf_details?.old_ward_no) }</div>
              <div className='text-gray-500 text-xs'>New Ward No</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(comparisonData?.saf_details?.ownership_type) }</div>
              <div className='text-gray-500 text-xs'>Ownership Type</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(comparisonData?.saf_details?.property_type) }</div>
              <div className='text-gray-500 text-xs'>Property Type</div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(comparisonData?.saf_details?.zone_mstr_id) }</div>
              <div className='text-gray-500 text-xs'>Zone</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(comparisonData?.saf_details?.road_type)}</div>
              <div className='text-gray-500 text-xs'>Road Type</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(comparisonData?.saf_details?.holding_type) } </div>
              <div className='text-gray-500 text-xs'>Holding Type</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(comparisonData?.saf_details?.assessment_type) }</div>
              <div className='text-gray-500 text-xs'>Assessment Type</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm' >{nullToNA(comparisonData?.saf_details?.prop_address) }</div>
              <div className='text-gray-500 text-xs'>Address</div>
            </div>
          </div>
        </div>

      </div>

      <div className=" font-bold text-xl pb-4 md:py-4 text-gray-400">Verification Details</div>
      <div className='w-full bg-white shadow-xl mb-6'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
            <thead class="text-gray-700 capitalize darks:text-gray-400">
              <tr className="border-b border-gray-200 bg-gray-50">
                <th scope="col" class="text-md px-6 py-3">
                  #
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Particular
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Self-Assessed
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Check
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Verification
                </th>
              </tr>
            </thead>
            <tbody>
              {
                comparisonData?.property_comparison?.map((data, index) => (
                  <tr class="border-b border-gray-200 ">
                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                      {index + 1}
                    </th>
                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800 border-l border-l-gray-200">
                      {nullToNA(data?.key)}
                    </th>
                    <td class="px-6 py-3 border-l border-l-gray-200">
                      {nullToNA(data?.according_application)}
                    </td>
                    <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                      {nullToNA(data?.values) && <BsFillCheckCircleFill className="inline text-green-500 text-3xl ml-3" />}
                      {nullToNA(data?.values) == false && <TiDelete className="inline text-red-500 text-5xl" />}
                    </td>
                    <td class="px-6 py-3 border-l border-l-gray-200">
                      {nullToNA(data?.according_verification)}
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>



      <div className=" font-bold text-xl pb-4 md:py-4 text-gray-400">Floor Verified Details</div>
      <div className='w-full bg-white shadow-xl mb-6'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
            <thead class="text-gray-700 capitalize darks:text-gray-400">
              <tr className="border-b border-gray-200 bg-gray-50">
                <th scope="col" class="text-md px-6 py-3">
                  Floor No.
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">

                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Usage Type
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Occupany Type
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Construction Type
                </th>
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Built Up Area (in sq ft.)
                </th>
                {/* <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Carpet Area (in sq ft.)
                </th> */}
                <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                  Date of completion
                </th>
              </tr>
            </thead>
            <tbody>

              {comparisonData?.floor_comparison?.map((data) => (
                <>
                  <tr className="border-b border-gray-200 ">
                    <td rowspan="3" className="px-6 py-3 border-l border-l-gray-200">{nullToNA(data?.floar_name)}</td>
                    <td className="px-6 py-3 border-l border-l-gray-200 font-semibold text-gray-900">Self Assessed</td>
                    {
                      data?.values?.map((data) => (
                        <td className="px-6 py-3 border-l border-l-gray-200">{nullToNA(data?.according_application)}</td>
                      ))
                    }

                  </tr>
                  <tr className="border-b border-gray-200 ">
                    <td className="px-6 py-3 border-l border-l-gray-200 font-semibold text-gray-900">Check</td>
                    {
                      data?.values?.map((data) => (
                        <td className="px-6 py-3 border-l border-l-gray-200">
                          {data?.values && <BsFillCheckCircleFill className="inline text-green-500 text-3xl ml-3" />}
                          {data?.values == false && <TiDelete className="inline text-red-500 text-5xl" />}</td>
                      ))
                    }
                  </tr>
                  <tr className="border-b border-gray-200 ">
                    <td className="px-6 py-3 border-l border-l-gray-200 font-semibold text-gray-900">Verification</td>
                    {
                      data?.values?.map((data) => (
                        <td className="px-6 py-3 border-l border-l-gray-200">{nullToNA(data?.verification?.according_verification)}</td>
                      ))
                    }
                  </tr>
                </>
              ))

              }



            </tbody>
          </table>
        </div>
      </div>


      {
        type == 'agency' &&
        <>
          {/* ONLY FOR AGENCY TC */}
          <div className=" font-bold text-xl pb-4 md:py-4 text-gray-400">Geo Tagging</div>
          <div className='w-full bg-white shadow-xl mb-6'>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
                <thead class="text-gray-700 capitalize darks:text-gray-400">
                  <tr className="border-b border-gray-200 bg-gray-50">

                    <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                      Location
                    </th>
                    <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                      Image
                    </th>
                    <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                      Latitude
                    </th>
                    <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                      Longitude
                    </th>

                    <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                      View on google map
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {
                    comparisonData?.geoTagging?.map((data) => (
                      <tr class="border-b border-gray-200 ">
                        <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                          {nullToNA(data?.direction_type)}
                        </th>
                        <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800 border-l border-l-gray-200">
                          <span onClick={() => openModal(data?.imageUrl)} className="cursor-pointer">
                            {/* <img src={data?.imageUrl} /> */}
                            <img className="w-40" src={nullToNA(data?.paths)} />
                          </span>
                        </th>
                        <td class="px-6 py-3 border-l border-l-gray-200">
                          {nullToNA(data?.latitude)}
                        </td>
                        <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                          {nullToNA(data?.longitude)}
                        </td>
                        <td class="px-6 py-3 border-l border-l-gray-200">
                          {nullToNA(data?.mapUrl)}
                        </td>


                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </div>
          </div>
        </>
      }

      {
        type == 'ulb' &&
        <>
          <div className=" font-bold text-xl py-1 px-4 text-white bg-indigo-500 mt-10">Quarterly Tax Details</div>

          <>
            <div className=" font-bold text-xl pb-4 md:py-1 text-gray-800 bg-white mb-5 pl-5 mt-10">According to Assessment</div>
            <div className='w-full bg-white shadow-xl mb-6'>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
                  <thead class="text-gray-700 capitalize darks:text-gray-400">
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Effect From
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        ARV/CV
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Holding Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Water Tax
                      </th>

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Education Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Health Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Latrine Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        RWH Penalty
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Quarterly Tax
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      comparisonData?.Tax?.according_application?.details?.RuleSet1 &&
                      comparisonData?.Tax?.according_application?.details?.RuleSet1?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.according_application?.details?.RuleSet2 &&
                      comparisonData?.Tax?.according_application?.details?.RuleSet2?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.according_application?.details?.RuleSet3 &&
                      comparisonData?.Tax?.according_application?.details?.RuleSet3?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
            </div>
          </>


          {/* 2 ACCORDING TO VERIFICATION */}
          <>
            <div className=" font-bold text-xl pb-4 md:py-1 text-gray-800 bg-white mb-5 pl-5">According to Verification</div>
            <div className='w-full bg-white shadow-xl mb-6'>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
                  <thead class="text-gray-700 capitalize darks:text-gray-400">
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Effect From
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        ARV/CV
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Holding Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Water Tax
                      </th>

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Education Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Health Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Latrine Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        RWH Penalty
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Quarterly Tax
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      comparisonData?.Tax?.according_verification?.details?.RuleSet1 &&
                      comparisonData?.Tax?.according_verification?.details?.RuleSet1?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.according_verification?.details?.RuleSet2 &&
                      comparisonData?.Tax?.according_verification?.details?.RuleSet2?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.according_verification?.details?.RuleSet3 &&
                      comparisonData?.Tax?.according_verification?.details?.RuleSet3?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
            </div>
          </>
          {/* // 3 ACCORDING Differences */}
          <>
            <div className=" font-bold text-xl pb-4 md:py-1 text-gray-800 bg-white mb-5 pl-5">Differences :</div>
            <div className='w-full bg-white shadow-xl mb-6'>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 darks:text-gray-400">
                  <thead class="text-gray-700 capitalize darks:text-gray-400">
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Effect From
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        ARV/CV
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Holding Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Water Tax
                      </th>

                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Education Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Health Cess
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Latrine Tax
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        RWH Penalty
                      </th>
                      <th scope="col" class="text-md px-6 py-3 border-l border-l-gray-200">
                        Quarterly Tax
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {
                      comparisonData?.Tax?.compairTax?.details?.RuleSet1 &&
                      comparisonData?.Tax?.compairTax?.details?.RuleSet1?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.compairTax?.details?.RuleSet2 &&
                      comparisonData?.Tax?.compairTax?.details?.RuleSet2?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }
                    {
                      comparisonData?.Tax?.compairTax?.details?.RuleSet3 &&
                      comparisonData?.Tax?.compairTax?.details?.RuleSet3?.totalQtrTaxes?.map((data) => (
                        <tr class="border-b border-gray-200 ">
                          <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap  darks:bg-gray-800">
                            {nullToNA(data?.effectingFrom)}
                          </th>

                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.arv)}
                          </td>
                          <td class="px-6 py-3 darks:bg-gray-800 border-l border-l-gray-200">
                            {nullToNA(data?.holdingTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.waterTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.educationTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.healthTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.latrineTax)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.rwhPenalty)}
                          </td>
                          <td class="px-6 py-3 border-l border-l-gray-200">
                            {nullToNA(data?.quaterlyTax)}
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
            </div>
          </>

        </>
      }


      <div className="w-full h-40 md:none"></div>
    </>
  );
}

export default TcComparision;
