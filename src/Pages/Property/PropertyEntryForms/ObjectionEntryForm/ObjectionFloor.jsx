//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getCurrentDate } from "@/Components/Common/PowerUps/PowerupFunctions";
import ObjectionFloorTable from "./ObjectionFloorTable";

const ObjectionFloor = (props) => {
  const [floorData, setfloorData] = useState();
  const [floorList, setfloorList] = useState([]);
  const [update, setupdate] = useState(true)

  const formik = useFormik({
    initialValues: {
      floorNo: "",
      usageType: "",
      occupancyType: "",
      constructionType: "",
      buildupArea: "",
      // dateFrom: "",
      // dateUpto: getCurrentDate(),
    },

    onSubmit: (values) => {
      // console.log("floor values => ", values);
    },
  });

  const getfloor =  (datas) =>  {
    // console.log("incoming datas => ", datas);
    floorList?.map((elem) => 
       { 
       if(elem?.propFloorId == datas?.propFloorId ){

          return setupdate(false)}
        }
    
    )

    // {update && // console.log("===================found==================", update)}
   
    let tempFloorList = [...floorList, datas];
    setfloorList([...floorList, datas]);
    props?.getFloorData(tempFloorList);
    toast.info("Posted...");
    //  console.log(
    //   "temp floor data => ",
    //   tempFloorList,
    //   "\n floor list data => ",
    //   floorList
    // );
  };

  // console.log("update boolean => ", update)

  // // console.log("props floor => ", props?.floor)

  return (
    <>
      <div
        className="col-span-4 overflow-x-auto"
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
      >
        <table className="min-w-full leading-normal">
          <thead className="font-bold text-left text-sm bg-sky-50">
            <tr className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs capitalize text-left">
              <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Floor No.
              </th>
              <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Usage Type
              </th>
              <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Occupancy Type
              </th>
              <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Construction Type
              </th>
              <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Built Up Area{" "}
                <small className="block mt-1 text-xs text-gray-600 inline ">
                  <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  (in Sq. Ft)
                </small>
              </th>
              {/* <th className="py-2 px-2">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                From Date
              </th>
              <th className="py-2 px-2">
                Upto Date{" "}
                <small className="block mt-1 text-xs text-gray-600 inline ">
                  (Leave blank for current date)
                </small>
              </th> */}
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs">
          {props?.floor?.length < 1 && <tr><td colSpan={8}><div className="italic bg-red-200 px-4 py-2 text-center">No Floor List Found !!</div></td></tr>}
            {props?.floor?.map((floor) => (
              <>
                <ObjectionFloorTable floor={floor} getfloor={getfloor}  />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ObjectionFloor;
