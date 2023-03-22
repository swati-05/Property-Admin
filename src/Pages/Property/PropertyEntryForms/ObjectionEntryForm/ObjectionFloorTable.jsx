//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiLinks from "@/Components/ApiList/ObjectionAssessmentApi";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import './assets/fonts/Font.css'

const ObjectionFloorTable = (props) => {
  const { usageTypeList, constructionTypeList, occupancyTypeList, getWardList } = apiLinks();

  const [loader, setloader] = useState(false);
  const [usageList, setusageList] = useState();
  const [occupancyList, setoccupancyList] = useState();
  const [constructionList, setconstructionList] = useState();
  const [refresh, setrefresh] = useState(0);

  useEffect(() => {
    setrefresh(refresh + 1);
  }, []);

  useEffect(() => {
    // console..log("working.......");
    setloader(true);
    // getting usage type list
    axios
      .get(getWardList, ApiHeader())
      .then((res) => {
        // console..log("usage type list => ", res);
        setusageList(res?.data?.data?.usage_type);
        setoccupancyList(res?.data?.data?.occupancy_type)
        setconstructionList(res?.data?.data?.construction_type)
        setloader(false);
      })
      .catch((err) => {
        // console..log("usage type error => ", err);
        setloader(false);
      });
  }, [refresh]);

  // useEffect(() => {
  //   setloader(true);
  //   //  getting occupancy type list
  //   axios
  //     .get(occupancyTypeList, ApiHeader())
  //     .then((res) => {
  //       // console..log("occupancy type list => ", res);
  //       setoccupancyList(res?.data);
  //       setloader(false);
  //     })
  //     .catch((err) => {
  //       // console..log("occupancy type error => ", err);
  //       setloader(false);
  //     });
  // }, [refresh]);

  // useEffect(() => {
  //   setloader(true);
  //   //  getting construction type list
  //   axios
  //     .get(constructionTypeList, ApiHeader())
  //     .then((res) => {
  //       // console..log("construction type list => ", res);
  //       setconstructionList(res?.data);
  //       setloader(false);
  //     })
  //     .catch((err) => {
  //       // console..log("construction type error => ", err);
  //       setloader(false);
  //     });
  // }, [refresh]);

  const formik = useFormik({
    initialValues: {
      propFloorId : props?.floor?.id,
      floorNo: props?.floor?.floor_mstr_id,
      usageType: props?.floor?.usage_type_mstr_id,
      occupancyType:  props?.floor?.occupancy_type_mstr_id,
      constructionType:  props?.floor?.const_type_mstr_id,
      buildupArea:  props?.floor?.builtup_area,
      // dateFrom: props?.floor?.date_from,
      // dateUpto: props?.floor?.date_upto,
    },

    enableReinitialize: true,
    
    onSubmit: (values) => {
      // console..log("floor values => ", values);
      props.getfloor(values);
      // props.updation()
    },
  });

  return (
    <>
     {loader && (
        <div className="w-full z-10 absolute mx-auto text-center flex justify-center items-center top-1/2">
          <span className="inline">
            <ColorRing
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </span>
        </div>
      )}

      <tr className="bg-white shadow-lg border-b border-gray-200 poppins">
        <td className="px-2 py-2 text-left">{props?.floor?.floor_name}</td>
        <td className="px-2 py-2 text-left">{props?.floor?.usage_type}</td>
        <td className="px-2 py-2 text-left">{props?.floor?.occupancy_type}</td>
        <td className="px-2 py-2 text-left">
          {props?.floor?.construction_type}
        </td>
        <td className="px-2 py-2 text-left">{props?.floor?.builtup_area}</td>
        {/* <td className="px-2 py-2 text-left">{props?.floor?.date_from}</td>
        <td className="px-2 py-2 text-left">{props?.floor?.date_upto}</td> */}
      </tr>
      <tr className="bg-white shadow-md  border-b border-gray-200 border-b border-gray-500 poppins">
        <td className="px-2 py-2 text-xs text-left font-semibold text-sm">{props?.floor?.floor_name}</td>
        <td className="px-2 py-2 text-sm text-left">
          <select
            {...formik.getFieldProps("usageType")}
            value={formik.values.usageType}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          >
            <option selected disabled value="">
              --select--
            </option>
            {usageList?.map((elem) => (
              <>
                <option value={elem?.id}>{elem?.usage_type}</option>
              </>
            ))}
          </select>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <select
            {...formik.getFieldProps("occupancyType")}
            value={formik.values.occupancyType}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          >
            <option selected disabled value="">
              --select--
            </option>
            {occupancyList?.map((elem) => (
              <>
                <option value={elem?.id}>{elem?.occupancy_type}</option>
              </>
            ))}
          </select>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <select
            {...formik.getFieldProps("constructionType")}
            value={formik.values.constructionType}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          >
            <option selected disabled value="">
              --select--
            </option>
            {constructionList?.map((elem) => (
              <>
                <option value={elem?.id}>{elem?.construction_type}</option>
              </>
            ))}
          </select>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="number"
            {...formik.getFieldProps("buildupArea")}
            value={formik.values.buildupArea}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          />
        </td>
        {/* <td className="px-2 py-2 text-sm text-left">
          <input
            type="date"
            {...formik.getFieldProps("dateFrom")}
            value={formik.values.dateFrom}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          />
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="date"
            {...formik.getFieldProps("dateUpto")}
            value={formik.values.dateUpto}
            className="div-control block w-full px-3 py-1.5 text-base md:text-sm font-semibold text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
          />
        </td> */}
        <td>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="bg-blue-200 hover:bg-blue-300 rounded-md shadow-md px-3 py-1.5"
          >
            Post
          </button>
        </td>
      </tr>
      <tr> <td colSpan={8}>&nbsp;</td></tr>
    </>
  );
};

export default ObjectionFloorTable;
