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
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackComponent from "./BackComponent";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function ActiveSafApplicationDeatilsByid() {
  const { safId, type } = useParams();
  console.log("param", safId);
  console.log("param", type);

  const navigate = useNavigate();

  const { api_getPropertyApplicationList } = ProjectApiList();

  const [applicationFullData, setapplicationFullData] = useState();

  ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
  const getApplicationDetail = () => {
    // console.log('token at basic details is  get method...', token)
    const header = {
      headers:  ApiHeader(),
    };
    axios
      .post(
        `${api_getPropertyApplicationList}`,
        {
          propertyId: safId,
        },
        header
      )
      .then(function (response) {
        console.log("view full details...", response.data.data);
        setapplicationFullData(response.data.data);
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, [safId]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-2 container mx-auto w-full p-4 mt-5   ">
        <div className="col-span-1  mx-auto">
          <button
            className="bg-amber-200 text-gray-600 border-b-2 shadow-lg border-white text-xs  w-28 px-0 py-1 rounded-md text-center"
            onClick={() => navigate(`/activeSafDemandDetails/${safId}`)}
          >
            {" "}
            DEMAND DETAIL
          </button>
        </div>
        <div className="col-span-1  mx-auto">
          <button
            className="bg-amber-200 text-gray-600 border-b-2 shadow-lg border-white text-xs w-28 px-0 py-1 rounded-md text-center"
            onClick={() => navigate(`/activeSafPayment`)}
          >
            {" "}
            PAYMENT DETAILS
          </button>
        </div>
        <div className="col-span-1  mx-auto">
          <Link to="/searchAppliedProperty">
            <BackComponent />
          </Link>
        </div>
        {/* <div className='col-span-1  mx-auto'>

                    <button className='bg-sky-200 text-gray-600 border-b-2 shadow-lg border-white text-xs  w-28 px-0 py-1 rounded-md text-center' onClick={() => navigate(`/safform/re/${safId}`)}>RE-ASSESSMENT</button>


                </div> */}
      </div>

      <div className="col-span-10 bg-gray-50 rounded-lg p-4">
        <div className=" ">
          <div className=" ">
            <h1 className=" text-gray-600 font-semibold text-2xl text-center ">
              APPLICATION REVIEW
            </h1>
          </div>
          <div className=" float-right p-2">
            {/* <Link to='/citizenPropertyApply'> */}
            {/* <BackComponent /> */}
            {/* </Link> */}
          </div>
        </div>
        <div className=" p-2  flex flex-col md:flex-row">
          <div>
            <h1 className=" text-gray-600 font-semibold text-xs md:text-lg">
              {" "}
              <span className="text-green-500">
                SAF NO:- {applicationFullData?.saf_no}
              </span>
            </h1>
          </div>
        </div>

        {/* Basic  details */}
        <div className="">
          <h1 className="px-1 font-semibold font-serif text-xl  text-[#37517e] ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6592/6592963.png"
              alt="pin"
              className="w-5 inline"
            />{" "}
            Basic Details
          </h1>
          <div className=" rounded-lg shadow-lg py-6 border mt-2 bg-white">
            <div className="flex space-x-5 pl-4 ">
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">Ward No.</div>
                <div className="font-bold text-sm text-[#37517e]">
                  {applicationFullData?.old_ward_no}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">New Ward No</div>
                <div className="font-semibold text-sm text-[#37517e]">
                  {applicationFullData?.old_ward_no}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">Ownership Type</div>
                <div className="font-semibold text-sm text-[#37517e]">
                  {applicationFullData?.ownership_type}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">Property Type</div>
                <div className="font-bold text-sm text-[#37517e]">
                  {applicationFullData?.property_type}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">Zone</div>
                <div className="font-bold text-sm text-[#37517e]">
                  {applicationFullData?.zone_mstr_id}
                </div>
              </div>
            </div>

            <div className="flex space-x-10  pl-4 mt-4">
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">
                  Property has Mobile Tower(s) ?
                </div>
                <div className="font-bold text-sm text-[#37517e]">
                  {applicationFullData?.is_mobile_tower}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">
                  Property has Hoarding Board(s) ?
                </div>
                <div className="font-semibold text-sm text-[#37517e]">
                  {applicationFullData?.is_hoarding_board}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">
                  Is property a Petrol Pump ?
                </div>
                <div className="font-semibold text-sm text-[#37517e]">
                  {applicationFullData?.is_petrol_pump}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-[#37517e]">
                  Rainwater harvesting provision ?
                </div>
                <div className="font-bold text-sm text-[#37517e]">
                  {applicationFullData?.is_water_harvesting}
                </div>
              </div>
              <div className="flex-1 text-xs"></div>
            </div>
          </div>
        </div>

        {/* Property  details */}
        <h1 className="px-1 font-semibold font-serif text-xl mt-6 text-[#37517e]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/609/609803.png"
            alt="pin"
            className="w-5 inline text-[#37517e]"
          />{" "}
          Property Address & Details
        </h1>
        <div className="border-l-2 border rounded-lg shadow-lg py-6 mt-2 bg-white">
          <div className="flex space-x-10 pl-4 ">
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Khata No.</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.khata_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Plot No</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.plot_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Village/Mauja Name</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.village_mauja_name}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Area of Plot</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.area_of_plot}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Road Width</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.road_type_mstr_id}
              </div>
            </div>
          </div>

          <div className="flex space-x-10  pl-4 mt-4">
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">City</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.prop_city}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">District</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.prop_dist}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">State</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.prop_state}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Pin</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.prop_pin_code}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Locality</div>
              {/* <div className='font-bold text-sm'>N{props?.formReviewData?.propertyAddressDetails?.locality}o</div> */}
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.prop_address}
              </div>
            </div>
          </div>

          <div></div>
          {/* coressponding address */}
          <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
            <div className="flex justify-center items-center">
              <label className="form-check-label text-gray-800">
                {" "}
                <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">
                  Corresponding Address
                </small>
              </label>
            </div>
            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
          </div>

          <div className="flex space-x-10  pl-4 mt-4">
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">City</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.corr_city}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">District</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.corr_dist}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">State</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.corr_state}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Pin</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.corr_pin_code}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Locality</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.corr_address}
              </div>
            </div>
          </div>
        </div>

        {/* electricity details */}
        <h1 className="px-1 font-semibold font-serif text-xl mt-6 text-[#37517e]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
            alt="pin"
            className="w-5 inline text-[#37517e]"
          />{" "}
          Electricity & Water Details
        </h1>
        <div className="border-l-2 border rounded-lg shadow-lg py-6  mt-2 bg-white">
          <div className="flex space-x-10 pl-4 ">
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Electricity K. No</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.khata_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">ACC No.</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.elect_acc_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">BIND/BOOK No.</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.elect_bind_book_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">
                Electricity Consumer Category
              </div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.elect_cons_category}
              </div>
            </div>
            <div className="flex-1 text-xs"></div>
          </div>

          <div className="flex space-x-10  pl-4 mt-4">
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Building Plan Approval No.</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.building_plan_approval_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Building Plan Approval Date</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.building_plan_approval_date}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Water Consumer No.</div>
              <div className="font-semibold text-sm text-[#37517e]">
                {applicationFullData?.khata_no}
              </div>
            </div>
            <div className="flex-1 text-xs">
              <div className="text-[#37517e]">Water Connection Date</div>
              <div className="font-bold text-sm text-[#37517e]">
                {applicationFullData?.water_conn_date}
              </div>
            </div>
            <div className="flex-1 text-xs"></div>
          </div>
        </div>

        {/* owner details */}
        <div className="mt-8">
          <h1 className="px-1 font-semibold font-serif text-xl text-[#37517e]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2029/2029957.png"
              alt="pin"
              className="w-5 inline text-[#37517e]"
            />{" "}
            Owner Details
          </h1>

          <table className="min-w-full leading-normal mt-2 bg-white">
            <thead className="font-bold text-left text-sm border text-[#37517e]">
              <tr>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  #
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Owner Name
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Gender
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  DOB
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Guardian Name
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Relation
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Mobile No.
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Aadhar
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  PAN{" "}
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  email{" "}
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Is-Armed-Force{" "}
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Is-Specially-Abled?{" "}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* {props?.formReviewData?.ownerDetails?.map((owner, index) => ( */}
              <>
                {applicationFullData?.owners?.map((items) => (
                  <tr className="bg-white shadow-lg border-b border-gray-200">
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      Demo
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.owner_name}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.gender}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.dob}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.guardian_name}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.relation_type}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.mobile_no}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.aadhar_no}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.pan_no}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.email}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.is_armed_force}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.is_specially_abled}
                    </td>
                  </tr>
                ))}
              </>
              {/* ))} */}
            </tbody>
          </table>
        </div>

        {/* floor details */}
        <div className="mt-8">
          <h1 className="px-1 font-semibold font-serif text-xl text-[#37517e]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7699/7699994.png"
              alt="building image"
              className="inline w-4 text-[#37517e]"
            />{" "}
            Floor Details
          </h1>

          <table className="min-w-full leading-normal mt-2 bg-white">
            <thead className="font-bold text-left text-sm border text-[#37517e]">
              <tr>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  #
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Floor{" "}
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Usage Type
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Occupancy Type
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Construction Type
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Built Up Area
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  From Date
                </th>
                <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">
                  Upto Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <>
                {applicationFullData?.floors?.map((items) => (
                  <tr className="bg-white shadow-lg border-b border-gray-200">
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      Demo
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.floor_mstr_id}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.usage_type_mstr_id}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.occupancy_type_mstr_id}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.const_type_mstr_id}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.builtup_area}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.date_from}
                    </td>
                    <td className="px-2 py-2 text-sm text-left text-[#37517e]">
                      {items?.date_upto}
                    </td>
                  </tr>
                ))}
              </>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-40 w-full"></div>
    </>
  );
}

export default ActiveSafApplicationDeatilsByid;
