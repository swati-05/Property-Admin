//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// > Api Integreted and some functionality : R U Bharti
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - WaterHarvestingScreen
// >DESCRIPTION - WaterHarvestingScreen Component
//////////////////{*****}//////////////////////////////////////////

import { useState } from "react";
import { RiBuilding2Fill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
// import { commonInputStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import {
  allowCharacterCommaInput,
  allowCharacterNumberInput,
  allowCharacterInput,
  allowNumberCharacterInput,
  allowNumberCommaInput,
  allowCharacterSpaceCommaInput,
  allowFloatInput,
  allowNumberInput,
  allowCharacterNumberSpaceCommaInput,
} from "../../../Components/Common/PowerUps/PowerupFunctions";

function WaterHarvestingScreen(props) {
  const [formOpen, setformOpen] = useState(false);
  const [rwhUpload, setrwhUpload] = useState("");
  const [rwhFormUpload, setrwhFormUpload] = useState();

  const validationSchema = yup.object({
    // name: yup.string().required("This is a required field !"),
    // guardianName: yup.string().required("This is a required field !"),
    // wardNo: yup.string().required("This is a required field !"),
    // mobileNo: yup.number().min(10, 'not valid').required("This is a required field !"),
    // holdingNo: yup.string().required("This is a required field !"),
    // buildingAddress: yup.string().required("This is a required field !"),
    dateOfCompletion: yup.string().required("This is a required field !"),
  });
  const formik = useFormik({
    initialValues: {
      isWaterHarvestingBefore: "",
      // name: '',
      // guardianName: '',
      // wardNo: '',
      // mobileNo: '',
      // holdingNo: '',
      // buildingAddress: '',
      dateOfCompletion: "",
      rwhImage: "",
      rwhForm: "",
    },

    onSubmit: (values, resetForm) => {
      // alert(JSON.stringify(values, null, 2));

      console.log("waterHarvesting ", values);
      props.collectFormDataFun("waterHarvesting", values); //sending waterHarvesting data to parent to store all form data at one container
      props.nextFun(1); //forwarding to next form level
    },
    validationSchema,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    {
      name == "addressCheckbox" && setformOpen(e.target.checked);
    }

    //input restrict validation
    // { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberCommaInput(value, formik.values.khataNo, 100)) }
    // { name == 'holdingNo' && formik.setFieldValue("holdingNo", allowNumberCommaInput(value, formik.values.plotNo, 100)) }
    // { name == 'name' && formik.setFieldValue("name", allowCharacterSpaceCommaInput(value, formik.values.village_mauja, 100)) }
    // { name == 'guardianName' && formik.setFieldValue("guardianName", allowCharacterSpaceCommaInput(value, formik.values.village_mauja, 100)) }
    // { name == 'buildingAddress' && formik.setFieldValue("buildingAddress", allowCharacterSpaceCommaInput(value, formik.values.village_mauja, 100)) }
  };

  const handleChangeImage = (e) => {
    let file = e.target.files;
    let fname = e.target.name;
    switch (fname) {
      case "rwhImage": {
        setrwhUpload(e.target.files[0]);
        console.log("rwh image in change => ", file);
        props.rwhFile(e.target.files[0]);
      }
      case "rwhForm": {
        setrwhFormUpload(e.target.files[0]);
        console.log("rwh image in change => ", file);
        props?.rwhFormFile(e.target.files[0]);
      }
    }
  };

  console.log(
    "props master data in water harvesting preformdata",
    props.preFormData
  );

  return (
    <>
      <h1 className="mt-6 mb-2 font-serif font-semibold  text-gray-600">
        <RiBuilding2Fill className="inline mr-2" />
        Rain Water Harvesting
      </h1>

      {/* ===========Details View================ */}
      <div className="p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto flex flex-wrap gap-x-20 top-14 mb-6">
        {/* <div className='col-span-1'>
    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name </label>
</div> */}

        <div className="col-span-1">
          <label className="form-label inline-block mb-1 text-gray-600 text-sm">
            Holding No.: &nbsp;&nbsp;&nbsp;
          </label>
          <span className="font-semibold text-sm">
            {props?.harvesting?.holding_no}
          </span>
        </div>

        <div className="col-span-1">
          <label className="form-label inline-block mb-1 text-gray-600 text-sm">
            Ward No.: &nbsp;&nbsp;&nbsp;
          </label>
          <span className="font-semibold text-sm">
            {props?.harvesting?.ward_mstr_id}
          </span>
        </div>
      </div>

      <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto  top-14">
        <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-2 gap-4">
            <div className="col-span-1">
              <div className="flex flex-row space-x-3">
                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                  <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Does Completion of Water Harvesting is done before 31-03-2017?{" "}
                </label>
                <input
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="isWaterHarvestingBefore"
                  name="isWaterHarvestingBefore"
                  value={1}
                  onChange={formik.handleChange}
                  required
                />
                <label
                  for="option1"
                  className=" text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  Yes
                </label>

                <input
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id="isWaterHarvestingBefore"
                  name="isWaterHarvestingBefore"
                  value={0}
                  onChange={formik.handleChange}
                  required
                />
                <label
                  for="option1"
                  className="text-sm font-medium text-gray-900 dark:text-gray-700"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-2 gap-4">
            <div className="col-span-1">
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                  *
                </small>
                Date of Completion of Water Harvesting Structure
              </label>
              <input
                type="date"
                name="dateOfCompletion"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                placeholder=""
                value={formik.values.dateOfCompletion}
                onChange={formik.handleChange}
              />
              <p className="text-red-500 text-xs">
                {formik.touched.dateOfCompletion &&
                formik.errors.dateOfCompletion
                  ? formik.errors.dateOfCompletion
                  : null}
              </p>
            </div>
            <div className="col-span-1 mt-4">
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                {/* <small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small> */}
                Rain Water Harvesting Image{" "}
              </label>
              <input
                accept=".jpg,.jpeg"
                type="file"
                name="rwhImage"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                placeholder=""
                value={formik.values.rwhImage}
                onChange={handleChangeImage}
              />
              {/* <p className='text-red-500 text-xs'>{formik.touched.rwhImage && formik.errors.rwhImage ? formik.errors.rwhImage : null}</p> */}
            </div>
            <div className="col-span-1 mt-4">
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                {/* <small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small> */}
                Rain Water Harvesting Form{" "}
              </label>
              <input
                accept=".jpg,.jpeg,.pdf"
                type="file"
                name="rwhForm"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                placeholder=""
                value={formik.values.rwhForm}
                onChange={handleChangeImage}
              />
              {/* <p className='text-red-500 text-xs'>{formik.touched.rwhImage && formik.errors.rwhImage ? formik.errors.rwhImage : null}</p> */}
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-2">
            {/* <div className='md:px-10'>
                            <button onClick={() => props.backFun()} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                        </div> */}
            <div className="md:px-10 text-right">
              <button
                type="submit"
                className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Save & Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default WaterHarvestingScreen;
