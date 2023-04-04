import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import rmclogo from '../images/rmclogo.png'
import rmclogo2 from '../images/rmclogo2.jpg'
import './Reciept.css'
import BrandLoader from '@/Components/Common/BrandLoader'
import ServerErrorCard from '@/Components/Common/ServerErrorCard'
import CommonModal from '@/Components/GlobalData/CommonModal'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'
import PrintButton from '@/Components/Common/PrintButton'

const ComparativeDemandReciept = () => {

  const [dataList, setdataList] = useState()
  const [arvData, setarvData] = useState()
  const [cvData, setcvData] = useState()
  const [erroState2, seterroState2] = useState(false);
  const [isLoading, setisLoading] = useState(false)


  const { comparativeDemandReciept } = PropertyApiList()

  const id = useParams()

  useEffect(() => {
    fetchComparativeDemandReciept()
  }, [])

  const fetchComparativeDemandReciept = () => {
    seterroState2(false)
    setisLoading(true)
    axios.post(comparativeDemandReciept, { propId: id?.id }, ApiHeader())
      .then((res) => {
        console.log('comparative demand success => ', res)
        if (res?.data?.status) {
          setdataList(res?.data?.data)
          setarvData(res?.data?.data?.arvRule)
          setcvData(res?.data?.data?.cvRule)
        } else {
          seterroState2(true)
        }
        setisLoading(false)
      })
      .catch((err) => {
        console.log("comparative demand error => ", err)
        seterroState2(true)
        setisLoading(false)


      })
  }

  if (isLoading) {
    return (
      <>
        <BrandLoader />
      </>
    )
  }
  if (erroState2) {
    return (
      <CommonModal>
        <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
      </CommonModal>
    )
  }

  return (
    <>

      {/* <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
    Print
</button> */}
      <PrintButton />
      <div className="flex w-full items-center justify-center text-black" id="printableArea">
        <div className="container m-2 overflow-x-hidden py-4 px-3 text-xs">

          <button onClick={() => window.print()} className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-amber-100 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out">
            Print
          </button>
          <div className="flex w-full items-center justify-center text-black" id="printableArea">
            <div className="container m-2 overflow-x-hidden py-4 px-3 text-xs">

              <img src={rmclogo} alt="" srcset="" className='absolute top-[20%] left-[27%] backImage opacity-10' />

              {/* Logo Heading */}
              <div>
                <div className="flex flex-col justify-center items-center gap-x-4">
                  <img src={rmclogo2} alt="Logo" srcset="" className="h-16 w-16" />
                  <div className="text-xs font-semibold flex flex-col justify-center items-center">
                    <span className='text-lg font-bold'>Office</span>
                    <span>(Revenue Branch)</span>
                    <span>Kachhari Road, Ranchi, PIN Number -834001</span>
                    <span>E-mail ID - {nullToNA(dataList?.basicDetails?.email)}</span>
                  </div>

                </div>
              </div>

              {/* letter date */}
              <div className='flex flex-col'>
                <span className='font-semibold'>Letter: <span>{nullToNA(dataList?.basicDetails?.letter)}</span> </span>
                <span className='font-semibold'>Date: <span>{nullToNA(dataList?.basicDetails?.letter)}</span> </span>
              </div>

              {/* information and basic */}
              <div className='flex flex-col w-full font-semibold'>
                <div className='text-center underline text-lg font-bold'>
                  Information
                </div>
                <div>Lakshmi/ Mrs./M/S.S.R.S.: {nullToNA(dataList?.basicDetails?.owner_name)}</div>
                <div>Father/Husband's Name: {nullToNA(dataList?.basicDetails?.guardian_name)}</div>
                <div>{(dataList?.basicDetails?.pt_no == '' || dataList?.basicDetails?.pt_no == undefined) ? <span>Holding Number : {dataList?.basicDetails?.new_holding_no}</span> : <span>Property Tax Number : {dataList?.basicDetails?.pt_no}</span>} <span>Ward No. {dataList?.basicDetails?.new_ward_no}</span></div>
                <div>Address: {dataList?.basicDetails?.prop_address}
                </div>
              </div>

              {/* content */}
              <div className='flex flex-col w-full gap-y-2 mt-2'>
                <div>

                  In exercise of the powers conferred by Section 2011 of the Jharkhand Municipal Act 590, the Jharkhand
                  Municipal Property Tax (Determination, Collection and Recovery) has been amended as per notification
                  1511 dated 29.04.2022 of the Governor's Urban Development and Housing Department, Jharkhand, Ranchi.
                  According to this amendment, common citizens and businesxsen living in all municipal corporations,
                  councils and panchayats of Jharkhand state are informed that from now on, the holding tax will be collected
                  from April 2022 on the basis of rules for circle rate. </div>
                <div>
                  The Property Tax Rules 2013 have been amended, so from the financial year 2022-23, property tax will be
                  assessed on the basis of capital value instead of annual rent value. The density of your building (holding
                  number - ) will be calculated according to the circle rate from 01.04.2022.
                </div>
                <div>
                  As per the prescribed provision of Jharkhand Municipal Tax Payment (Time, Procedure and Recovery)
                  Regulations Amendment 2022, you have to pay dhriti tax for the said period.
                </div>
                <div>
                  The calculation of comparative apathy on the basis of annual rent rate and capital value is as follows:
                </div>
              </div>

              {/* annual rental */}
              <div className='mt-4'>
                <div className='text-lg font-bold mb-2'>
                  Annual Rental Value - As ARV Rule (Effect From 01-04-2016 to 31-03-2022)
                </div>
                <div className='flex flex-col'>
                  <span>a. Carpet area for residential - 70% of buildup area</span>
                  <span>b. Carpet area for commercial - 80% of buildup area</span>
                </div>
                <div className='font-bold text-md'>
                  Annual Rental Value (ARV) = Carpet Area X Usage Factor X Occupancy Factor X Rental Rate
                </div>
              </div>

              {/* capital value */}
              <div className='mt-4'>
                <div className='text-lg font-bold mb-2'>
                  Capital Value - As Per Current Rule (Effect From 01-04-2022)
                </div>
                <div className='flex flex-col'>
                  <span>a. Residential - 0.075%</span>
                  <span>b. Commercial - 0.150%</span>
                  <span>c. Commercial & Greater than 25000 sqft - 0.20%</span>
                </div>
                <div className='font-bold text-md'>
                  Property Tax = Circle Rate X Buildup Area X Occupancy Factor X Tax Percentage X Calculation Factor X Matrix Factor Rate <span className='text-red-600'>(Only in case of 100% residential property)</span>
                </div>
              </div>

              {/* comparision table */}
              <table className="w-full mt-2">

                <tr>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Rule</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Floor</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Built-up-area</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Usage Factor</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Occ Factor</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Carpet Area (70%/80%)</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Rental Rate / Matrix Factor</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Tax Perc.</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Calculation Factor</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">(Annual Rental Values) p.e.f</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">Circle Rate</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">ARV Total Property Tax</td>
                  <td className="bg-gray-200 border-[1px] border-gray-700 pl-1 font-semibold">CV Total Property Tax</td>
                </tr>

                {arvData?.length > 0 &&
                  arvData?.map((data, index) =>
                    <tr>
                      {index + 1 == 1 && <td className="border-[1px] border-gray-700 pl-1" rowSpan={arvData?.length}>ARV</td>}
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.floor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.buildupArea)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.usageFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.occupancyFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.carpetArea)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.rentalRate)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.taxPerc)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.calculationFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.arvPsf)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.circleRate)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.arvTotalPropTax)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.cvArvPropTax)}</td>
                    </tr>
                  )
                }

                {cvData?.length > 0 &&
                  cvData?.map((data, index) =>
                    <tr>
                      {index + 1 == 1 && <td className="border-[1px] border-gray-700 pl-1" rowSpan={cvData?.length}>CV</td>}
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.floor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.buildupArea)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.usageFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.occupancyFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.carpetArea)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.rentalRate)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.taxPerc)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.calculationFactor)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.arvPsf)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.circleRate)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.arvTotalPropTax)}</td>
                      <td className="border-[1px] border-gray-700 pl-1">{nullToNA(data?.cvArvPropTax)}</td>
                    </tr>
                  )
                }

                <tr>
                  <td className="border-[1px] border-gray-700 pr-1 text-end" colSpan={11}>Total</td>
                  <td className="border-[1px] border-gray-700 pl-1">{nullToNA(dataList?.total?.arvTotalPropTax)}</td>
                  <td className="border-[1px] border-gray-700 pl-1">{nullToNA(dataList?.total?.cvTotalPropTax)}</td>
                </tr>

              </table>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ComparativeDemandReciept