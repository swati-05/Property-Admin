//////////////////{*****}//////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19 Dec., 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - CitizenPropOwnerDetails
// >DESCRIPTION - CitizenPropOwnerDetails Component
////////////////////////////////////////////////////////////////////

import { useContext, useState, useEffect } from "react";
import { FaUserNurse } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { RiDeleteBack2Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import {
  allowCharacterNumberInput,
  allowCharacterSpaceCommaInput,
  allowMailInput,
  allowNumberInput,
  getCurrentDate,
} from "@/Components/Common/PowerUps/PowerupFunctions";
import { TiDelete } from "react-icons/ti";
import { AiFillInfoCircle } from "react-icons/ai";
import { contextVar } from "@/Components/Context/Context";
import {
  inputContainerStyle,
  inputErrorStyle,
  commonInputStyle,
  inputLabelStyle,
} from "@/Components/Common/CommonTailwind/CommonTailwind";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const CitizenPropFloorDetails = (props) => {

    console.log('pre form data in floor => ', props?.preFormData?.floors)

  return (
    <div className="-mt-[12rem]">
      <h1 className="-mt-12 mb-2 font-serif font-semibold  text-gray-600">
        <FaUserNurse className="inline mr-2" />
        Floor Details{" "}
      </h1>

      <div
        className="col-span-4 overflow-x-auto"
      >
         <table className="min-w-full leading-normal">
          <thead className="font-bold text-left text-sm bg-sky-50">
            <tr className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">
              <th className="py-2 px-2">
                
                Floor Name
              </th>
              <th className="py-2 px-2">
                
                Usage Type
              </th>
              <th className="py-2 px-2">
                
                Occupancy Type
              </th>
              <th className="py-2 px-2">
                
                Construction Type
              </th>
              <th className="py-2 px-2">
                
                Built Up Area{" "}
                <small className="block mt-1 text-xs text-gray-600 inline ">
                  (in Sq. Ft)
                </small>
              </th>
              <th className="py-2 px-2">
                
                From Date
              </th>
              <th className="py-2 px-2">
                Upto Date{" "}
                
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {props?.preFormData?.floors?.map((floor) => (
              <>
                 <tr className="bg-white shadow-lg border-b border-gray-200">
        <td className="px-2 py-2 text-left">{floor?.floor_name}</td>
        <td className="px-2 py-2 text-left">{floor?.usage_type}</td>
        <td className="px-2 py-2 text-left">{floor?.occupancy_type}</td>
        <td className="px-2 py-2 text-left">
          {floor?.construction_type}
        </td>
        <td className="px-2 py-2 text-left">{floor?.builtup_area}</td>
        <td className="px-2 py-2 text-left">{floor?.date_from}</td>
        <td className="px-2 py-2 text-left">{floor?.date_upto}</td>
      </tr>
              </>
            ))}
          </tbody>
        </table>

        <div className="col-span-5 grid grid-cols-3 mt-2">
          <div className="md:px-10">
            <button
              onClick={() => props.backFun(5)}
              type="button"
              className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Back
            </button>
          </div>
          <div className="md:px-10 text-right">
            <button
              type="button"
              onClick={() => props.nextFun(5)}
              className=" px-6 py-2.5 bg-sky-400 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Next & Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPropFloorDetails;
