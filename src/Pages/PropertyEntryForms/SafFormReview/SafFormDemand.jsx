import { useState } from "react";
import folder from "@/Components/Media/folders.png";
import rupee from "@/Components/Media/rupee.png";
import rupee2 from "@/Components/Media/rupee2.png";
import brief from "@/Components/Media/brief.png";
import pay2 from "@/Components/Media/pay2.png";
import { useNavigate } from "react-router-dom";
import CitizenTaxCard from "./CitizenTaxCard";
import { BiCheck } from "react-icons/bi";
import check from "@/Components/Media/check.png";
import { MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";
import { TiArrowBack } from "react-icons/ti";
import { MdViewInAr } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import RazorpayPaymentMaster from "@/Components/PaymentMaster/RazorpayPaymentMaster";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function SafFormDemand(props) {
  const { propertyGenerateOrderId } = ProjectApiList();

  const [taxDescriptionState, setTaxDescriptionState] = useState(false);
  const navigate = useNavigate();
  console.log(
    "saf submit response data at safformdemand...",
    props.safSubmitResponse
  );
  const toggleTaxDescription = () => {
    setTaxDescriptionState(!taxDescriptionState);

    // console.log('scroll top position ',document.documentElement.scrollTop)
  };

  ////// PAYMENT METHOD  ////
  const dreturn = (data) => {
    // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
    console.log("Payment Status =>", data);
  };

  const getOrderId = async () => {
    // This Function is used to Order Id Generation
    props.showLoader(true);

    const orderIdPayload = {
      // "id": safAppId,
      // "amount": amount,
      // "departmentId": 1,
      // "workflowId": safDetailsData.workflow_id
      id: props?.safSubmitResponse?.data?.safId,
      amount: props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount,
      departmentId: 1,
      workflowId: 4,
    };

    // setLoader(true)

    const header = ApiHeader()
    axios
      .post(propertyGenerateOrderId, orderIdPayload, header) // This API will generate Order ID
      .then((res) => {
        console.log("Order Id Response ", res.data);
        if (res.data.status === true) {
          console.log("OrderId Generated True", res.data);
          RazorpayPaymentMaster(res.data.data, dreturn); //Send Response Data as Object (amount, orderId, ulbId, departmentId, applicationId, workflowId, userId, name, email, contact) will call razorpay payment function to show payment popup
          setTimeout(() => {
            props.showLoader(false);
          }, 500);
        } else {
          props.showLoader(false);
        }
      })
      .catch((err) => {
        alert("Backend Server error. Unable to Generate Order Id");
        console.log("ERROR :-  Unable to Generate Order Id ", err);

        props.showLoader(false);
      });
  };

  console.log(
    "demand detail",
    props?.safSubmitResponse?.data?.demand?.amounts?.rebatePerc
  );

  return (
    <div
      className={` block p-4 mt-4 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto `}
    >
      {/* <h1 className='px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white'>Saf Demand</h1> */}
      <h1 className="px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white">
        <BsFillCheckCircleFill className="text-white inline text-3xl" /> Your
        form has been submitted successfully
      </h1>

      <div className="mt-4">
        {/* <div className="grid grid-cols-3 mt-8 bg-yellow-100 py-6"> */}
        <div className="grid grid-cols-3 mt-8">
          <div className="px-4 py-4 text-sm">
            {/* <div>SAF No. :<span onClick={(e) => copy(props?.safSubmitResponse?.data?.safNo)} className='text-sm text-black font-semibold font-mono ml-2 bg-amber-100 px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-200'>{props?.safSubmitResponse?.data?.safNo} <span><MdContentCopy className='inline' /></span> </span></div> */}
            <div>
              SAF No. :
              <span className="text-sm text-black font-semibold font-mono ml-2 bg-amber-100 px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-200">
                {props?.safSubmitResponse?.data?.safNo}{" "}
                <span>
                  <MdContentCopy className="inline" />
                </span>{" "}
              </span>
            </div>
            <div>
              Apply date :
              <span className="text-sm text-black font-semibold font-mono ml-2">
                {props?.safSubmitResponse?.data?.applyDate}
              </span>
            </div>
            <div>
              Rebate
              <span className="text-sm text-black font-semibold font-mono ml-2">
                {props?.safSubmitResponse?.data?.demand?.amounts?.rebatePerc}
              </span>
            </div>
            <div>
              Late Assessment Penalty
              <span className="text-sm text-black font-semibold font-mono ml-2">
                {
                  props?.safSubmitResponse?.data?.demand?.amounts
                    ?.lateAssessmentPenalty
                }
              </span>
            </div>
            <div>
              Special Rebate
              <span className="text-sm text-black font-semibold font-mono ml-2">
                {props?.safSubmitResponse?.data?.demand?.amounts?.rebatePerc}
              </span>
            </div>
            <div>
              1% Penalty Rebate
              <span className="text-sm text-black font-semibold font-mono ml-2">
                {
                  props?.safSubmitResponse?.data?.demand?.amounts
                    ?.totalOnePercPenalty
                }
              </span>
            </div>
            <div className="form-group mb-6 col-span-12 md:col-span-6 md:px-4">
              <div className="bg-sky-100 w-2/3 text-center rounded-lg shadow-lg py-1">
                <span>Total Amount :</span>{" "}
                <span className="font-mono font-semibold">
                  {
                    props?.safSubmitResponse?.data?.demand?.amounts
                      ?.payableAmount
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <CitizenTaxCard
              time="yearly"
              tax={props?.safSubmitResponse?.data?.demand?.amounts?.totalTax}
            />
          </div>
          {/* <div className=''><CitizenTaxCard time="quaterly" tax="50" /></div> */}
        </div>

        {taxDescriptionState && (
          <>
            <div className="mt-10">
              <h1 className="px-1 font-semibold font-serif text-xs">
                <img src={rupee} alt="pin" className="w-5 inline" /> Tax Details
              </h1>
              {/* <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Floor Details</h1> */}

              <table className="min-w-full leading-normal mt-2">
                <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                  <tr>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      #
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Rebate
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      1% Penalty{" "}
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Late Assessment Penalty
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Payable Amount
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Total Demand
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Total Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Adjust Amount
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Residential
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Late Assessment Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <>
                    <tr className="bg-white shadow-lg border-b border-gray-200">
                      <td className="px-2 py-2 text-sm text-left">1</td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.rebatePerc
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.totalOnePercPenalty
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.lateAssessmentPenalty
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.payableAmount
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.totalDemand
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.adjustAmount
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.totalTax
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.isResidential
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.healthCess
                        }
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {
                          props?.safSubmitResponse?.data?.demand?.amounts
                            ?.lateAssessmentStatus
                        }
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            </div>

            {/* due detail list */}
            <div className="mt-10">
              <h1 className="px-1 font-semibold font-serif text-xs">
                <img src={rupee2} alt="pin" className="w-6 inline" /> Due Detail
              </h1>
              {/* <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Floor Details</h1> */}

              {/* due details */}
              <div className="">
                <div className="flex space-x-10 bg-green-50 rounded-lg pl-4 py-6 shadow-lg">
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-sm">2000</div>
                    <div>Total Dues</div>
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-sm">
                      Quarter 4 / Year 2010-2011
                    </div>
                    <div>Dues From</div>
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-sm">
                      Quarter 4 / Year 2022-2023
                    </div>
                    <div>Dues Upto</div>
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-sm">49</div>
                    <div>Total Dues</div>
                  </div>
                </div>
              </div>

              {/* demand details */}
              <h1 className="px-1 font-semibold font-serif text-xs mt-10">
                <img src={brief} alt="pin" className="w-5 inline" /> Demand
                Overview
              </h1>
              <table className="min-w-full leading-normal">
                <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                  <tr>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      #
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Arv
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Quater
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Quarter / Year
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Water Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Water Harvesting Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Education Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Health Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Holding Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Latrine Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Additional Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Total Tax
                    </th>
                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <>
                    {props?.safSubmitResponse?.data?.demand?.details?.map(
                      (items) => (
                        <tr className="bg-white shadow-lg border-b border-gray-200">
                          <td className="px-2 py-2 text-sm text-left">1</td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.arv}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.qtr}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.quarterYear}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.waterTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.rwhPenalty}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.educationTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.healthCess}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.holdingTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.latrineTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.additionTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.totalTax}
                          </td>
                          <td className="px-2 py-2 text-sm text-left">
                            {items.dueDate}
                          </td>
                        </tr>
                      )
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="w-full flex mb-10 mt-10">
        <div className="flex justify-center mt-1">
          <RotatingLines
            strokeColor="#e87f0e"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
          // visible={loader}
          />
        </div>
        <div className="md:px-4 text-center">
          <button
            onClick={toggleTaxDescription}
            type="button"
            className="w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight capitalize rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
          >
            <MdViewInAr className="inline text-lg" />
            {!taxDescriptionState
              ? "View demand details"
              : "Hide demand details"}
          </button>
        </div>
        {/* <div className='md:px-10 text-right flex-1'>
        <button onClick={() => props.nextFun(7)} type="button" className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Pay Now <img src={pay2} alt="pay image" className='inline w-5' /></button>
      </div> */}

        {/* {!loader && */}
        <div className="md:px-10 text-right flex-1">
          <button
            onClick={getOrderId}
            type="submit"
            className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Pay Now <img src={pay2} alt="pay image" className="inline w-5" />
          </button>
        </div>
        {/* } */}
      </div>

      <div className="mt-40"></div>
    </div>
  );
}

export default SafFormDemand;
