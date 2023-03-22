//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// >Version - 1.0
// >Date - 20 Nov 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - ActiveSafApplicationDeatilsByid
// >DESCRIPTION - ActiveSafApplicationDeatilsByid Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useEffect } from "react";
import rupee from "../../../Components/Media/rupee.png";
import rupee2 from "../../../Components/Media/rupee2.png";
import brief from "../../../Components/Media/brief.png";
import pay2 from "../../../Components/Media/pay2.png";
import axios from "axios";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import RazorpayPaymentMaster from "./RazorpayPaymentMaster";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackComponent from "./BackComponent";
import ApiHeader from "@/Components/ApiList/ApiHeader";

// import pay2 from '../../../../Components/Media/pay2.png'

function PropertyDemandDetails(props) {
  const { safId } = useParams();
  console.log("param demand screen...", safId);
  const navigate = useNavigate();

  const { propertyGenerateOrderId, api_DemandDetailById } = ProjectApiList();

  const [loader, setLoader] = useState(false); // Used when click on Pay Now
  const [demandDetail, setdemandDetail] = useState();
  const [responseScreenStatus, setResponseScreenStatus] = useState("");

  ///////////{*** APPLICATION DETAILS BY ID IN DEMAND SCREEN ***}/////////
  const fetchDemandDetail = () => {
    // console.log('token at basic details is  get method...', token)
    const header = ApiHeader()
    axios
      .post(
        `${api_DemandDetailById}`,
        {
          id: safId,
        },
        header
      )
      .then(function (response) {
        console.log("view deamnd details...", response.data.data);
        setdemandDetail(response.data.data);
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
      });
  };

  useEffect(() => {
    fetchDemandDetail();
  }, [safId]);

  console.log("demand.......", demandDetail?.demand?.payableAmount);

  //// PAYMENT METHOD  ////
  const dreturn = (data) => {
    // In (DATA) this function returns the Paymen Status, Message and Other Response data form Razorpay Server
    console.log("Payment Status =>", data.status);
    console.log("Payment Status =>", data.message);
    setResponseScreenStatus(data.status);
  };

  const getOrderId = async () => {
    // This Function is used to Order Id Generation
    // props.showLoader(true)

    const orderIdPayload = {
      id: safId,
      amount: demandDetail?.demand?.payableAmount,
      departmentId: 1,
      workflowId: 4,
      // "id": props?.safSubmitResponse?.data?.safId,
      // "amount": props?.safSubmitResponse?.data?.demand?.amounts?.payableAmount,
      // "departmentId": 1,
      // "workflowId": 4
    };

    // setLoader(true)

    const header = ApiHeader()
    axios
      .post(propertyGenerateOrderId, orderIdPayload, header) // This API will generate Order ID
      .then((res) => {
        console.log("Order Id Response ", res.data);
        if (res.data.status === true) {
          console.log("OrderId Generated True", res.data.data);
          RazorpayPaymentMaster(res.data.data, dreturn); //Send Response Data as Object (amount, orderId, ulbId, departmentId, applicationId, workflowId, userId, name, email, contact) will call razorpay payment function to show payment popup
          setTimeout(() => {
            // props.showLoader(false)
          }, 500);
        } else {
          // props.showLoader(false)
        }
      })
      .catch((err) => {
        alert("Backend Server error. Unable to Generate Order Id");
        console.log("ERROR :-  Unable to Generate Order Id ", err);

        // props.showLoader(false)
      });
  };

  // if (responseScreenStatus == true) {
  //     return (
  //         <>
  //             <PaymentTranscationScreen />
  //         </>
  //     )
  // }

  return (
    <>
      <div className="p-2 ">
        <Link to="/propFullDetails/:safId">
          <BackComponent />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 lg:grid-cols-12 container mx-auto ">
        <div className="col-span-12 w-full bg-gray-50 rounded-lg p-4">
          <h1
            className="px-2 font-semibold mt-0 text-center text-gray-600 font-serif py-2 xl md:text-3xl"
            onClick={() => navigate(`/propertyDemandDetails/${safId}`)}
          >
            {" "}
            DEMAND DETAILS
          </h1>
          <div>
            {!loader && (
              <div className="md:px-10 text-right flex-1">
                <button
                  onClick={getOrderId}
                  type="submit"
                  className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Pay Now{" "}
                  <img src={pay2} alt="pay image" className="inline w-5" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h1 className="px-1 font-semibold font-serif text-xl">
              <img src={rupee} alt="pin" className="w-5 inline" /> Tax Details
            </h1>
            {/* <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Floor Details</h1> */}

            <table className="min-w-full leading-normal mt-2">
              <thead className="font-bold text-left text-sm bg-green-50 text-gray-600">
                <tr>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    #
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Rebate
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    1% Penalty{" "}
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Late Assessment Penalty
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Payable Amount
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Total Demand
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Total Tax
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">
                    Adjust Amount
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <>
                  <tr className="bg-white shadow-lg border-b border-gray-200">
                    <td className="px-2 py-2 text-sm text-left">1</td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.rebatePerc}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.totalOnePercPenalty}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.lateAssessmentPenalty}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.payableAmount}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.totalDemand}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.totalTax}
                    </td>
                    <td className="px-2 py-2 text-sm text-left">
                      {demandDetail?.demand?.adjustAmount}
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>

          {/* due detail list */}
          <div className="mt-10">
            <h1 className="px-1 font-semibold font-serif text-xl">
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
            <h1 className="px-1 font-semibold font-serif text-xl mt-10">
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
                    Education Cess
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200  text-left text-xs capitalize text-left">
                    Health Cess
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
                  {demandDetail?.details?.map((items) => (
                    <tr className="bg-white shadow-lg border-b border-gray-200">
                      <td className="px-2 py-2 text-sm text-left">1</td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.arv}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.qtr}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.fyear}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.water_tax}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.rwh_penalty}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.education_cess}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.health_cess}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.holding_tax}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.latrine_tax}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.additional_tax}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.totalTax}
                      </td>
                      <td className="px-2 py-2 text-sm text-left">
                        {items.due_date}
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDemandDetails;
