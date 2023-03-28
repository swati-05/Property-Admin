//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 18th Nov., 2022  12:45 PM
// Project     : JUIDCO
// Component   : Objection
// Description : Objection page
//////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { RiBuilding2Fill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { allowFloatInput } from "@/Components/Common/PowerUps/PowerupFunctions";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiLinks from "@/Components/ApiList/ObjectionAssessmentApi";
import ObjectionFloor from "./ObjectionFloor";
import { ColorRing } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import {contextVar} from '@/Components/Context/Context'
import {useContext} from 'react'
import EmptyDetailsIllustration from "./EmptyDetailsIllustration";
import ApiHeader2 from "@/Components/ApiList/ApiHeader2";
import BarLoader from "@/Components/Common/BarLoader";
import {FcDepartment} from 'react-icons/fc'

function ObjectionEntryForm(props) {
  const {
    getAssessment,
    postAssessment,
    getWardList
  } = apiLinks();

  const {id} = useParams()

  const navigate = useNavigate();

  const [loader, setloader] = useState(false);
  const [evidenceDoc, setevidenceDoc] = useState('');
  const [refresh, setrefresh] = useState(0);
  const [formDoc, setformDoc] = useState('');
  const [propertyList, setpropertyList] = useState();
  const [roadList, setroadList] = useState();
  const [allfloor, setallfloor] = useState();
  const [floor, setfloor] = useState();
  const [tempData, settempData] = useState();
  const [harvestingStatus, setHarvestingStatus] = useState(false);
  const [roadWidthStatus, setroadWidthStatus] = useState(false);
  const [propertyTypeStatus, setpropertyTypeStatus] = useState(false);
  const [plotAreaStatus, setplotAreaStatus] = useState(false);
  const [mobileTowerStatus, setmobileTowerStatus] = useState(false);
  const [hoardingStatus, sethoardingStatus] = useState(false);
  const [floorStatus, setfloorStatus] = useState(false);
  const [status, setstatus] = useState(true)
  const [ulbId, setulbId] = useState()

  const validationSchema = yup.object({
    harvestingToggleStatus: yup.boolean(),
    roadWidthToggleStatus: yup.boolean(),
    propertyTypeToggleStatus: yup.boolean(),
    plotAreaToggleStatus: yup.boolean(),
    mobileTowerToggleStatus: yup.boolean(),
    hoardingToggleStatus: yup.boolean(),
    floorToggleStatus: yup.boolean(),

    isWaterHarvesting: yup.string().when("harvestingToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),
    roadType: yup.string().when("roadWidthToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),
    propertyType: yup.string().when("propertyTypeToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),
    areaOfPlot: yup.string().when("plotAreaToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),
    isMobileTower: yup.string().when("mobileTowerToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),
    isHoarding: yup.string().when("hoardingToggleStatus", {
      is: true,
      then: yup.string().required("Field is required"),
    }),


    // isWaterHarvesting: yup.string().required('Enter ACC no'),
    // roadType: yup.string().required('Enter ACC no'),
    // propertyType: yup.string().required('Enter bind/book no.'),
    // areaOfPlot: yup.string().required('Enter building plan approval no.'),
    // isMobileTower: yup.string().required('Select building plan approval date'),
    // isHoarding: yup.string().required('Enter water consumer no.'),

    // objFormDoc: yup.mixed().required('Enter water consumer no.'),
    // objEvidenceDoc: yup.mixed().required('Enter water consumer no.'),
    // objRemarks: yup.string().required("Enter water consumer no."),
  });



  const formik = useFormik({
    initialValues: {
      harvestingToggleStatus: false,
      roadWidthToggleStatus: false,
      propertyTypeToggleStatus: false,
      plotAreaToggleStatus: false,
      mobileTowerToggleStatus: false,
      hoardingToggleStatus: false,
      floorToggleStatus: false,

      propId: id,
      isWaterHarvesting: tempData?.is_water_harvesting ? 1 : 0,
      roadType: tempData?.road_type_mstr_id,
      propertyType: tempData?.prop_type_mstr_id,
      areaOfPlot: tempData?.area_of_plot,
      isMobileTower: tempData?.is_mobile_tower ? 1 : 0,
      mobileArea: tempData?.tower_area,
      mobileDate: tempData?.tower_installation_date,
      isHoarding: tempData?.is_hoarding_board ? 1 : 0,
      hoardingArea: tempData?.hoarding_area,
      hoardingDate: tempData?.hoarding_installation_date,

      objFormDoc: "",
      objEvidenceDoc: "",
      objRemarks: "",
      floor: [],
    },

    // enableReinitialize: true,

    onSubmit: (values) => {
      // console.log("electricity ", values);
      // formik.setFieldValue('floor', allfloor)
      submitFun(values);
    },
    validationSchema,
  });

  const handleChangeImage = (e) => {
    if (e.target.name == "objFormDoc") {
      let file = e.target.files[0];
      setformDoc(e.target.files[0]);
      formik.setFieldValue("objFormDoc", e.target.files[0])
      // console.log("--1-- objFormDoc file on change..", file);
    } 
    
    if (e.target.name == "objEvidenceDoc") {
      let file = e.target.files[0];
      setevidenceDoc(e.target.files[0]);
      // console.log("--3-- objEvidenceDoc file on change..", file);
      formik.setFieldValue("objEvidenceDoc", e.target.files[0])
    }
  };

  useEffect(() => {
    // console.log("Entering getting details function............", id);
    setloader(true);
    axios
      .post(getAssessment, { "propertyId": id }, ApiHeader())
      .then((res) => {
        // console.log("get assessment details => ", res);
        settempData(res?.data?.data);
        setfloor(res?.data?.data?.floors);
        setrefresh(refresh + 1);
        setloader(false);
        setstatus(res?.data?.status)
        setulbId(res?.data?.data?.ulb_id)
      })
      .catch((err) => {
        // console.log("error getting assessment details => ", err);
        toast("Something went wrong !!");
        setloader(false);
      });
  }, []);

  useEffect(() => {
    // getting ward List 
    // =========================================
    axios.get(getWardList, ApiHeader())
    .then((res) => {
      // console.log("getting ward list => ", res)
      setpropertyList(res?.data?.data?.property_type)
      setroadList(res?.data?.data?.road_type);
    })
    .catch((err) => {
      // console.log("getting ward list error => ",err)
    })
  }, [refresh]);

  // useEffect(() => {
  //   //  getting road type list
  //   setloader(true);
  //   axios
  //     .get(roadTypeList, ApiHeader())
  //     .then((res) => {
  //       console.log("road type list => ", res);
  //       setroadList(res?.data?.data);
  //       setloader(false);
  //     })
  //     .catch((err) => {
  //       console.log("road type error => ", err);
  //       setloader(false);
  //     });
  // }, [refresh]);

  const getFloorData = (data) => {
    // console.log("all floor data => ", data);
    setallfloor(data);
  };

  useEffect(() => {
    // formik.setFieldValue("floor", allfloor);
  }, [allfloor]);

  const submitFun = (values) => {
    // console.log("Entering submit function with values => ", values)

    setTimeout(() => {
      setloader(false)
    }, 10000);

    setloader(true);

    let assessData = []

    if (harvestingStatus) {
      assessData.push({
        id: 2,
        value: values?.isWaterHarvesting,
      });
    }

    if (roadWidthStatus) {
      assessData.push({
        id: 3,
        value: values?.roadType,
      });
    }

    if (propertyTypeStatus) {
      assessData.push({
        id: 4,
        value: values?.propertyType,
      });
    }

    if (plotAreaStatus) {
      assessData.push({
        id: 5,
        value: values?.areaOfPlot,
      });
    }


    let requestBody = {
      objectionFor: "Assessment Error",
      propId: id,

      assessmentData: [
        {
          id: 2,
          value: values?.isWaterHarvesting,
        },
        {
          id: 3,
          value: values?.roadType,
        },
        {
          id: 4,
          value: values?.propertyType,
        },
        {
          id: 5,
          value: values?.areaOfPlot,
        },
        {
          id: 6,
          value: values?.isMobileTower,
        },
        {
          id: 7,
          value: values?.isHoarding,
        },
      ],

      floorData: allfloor,

    };

    let fd = new FormData();
    fd.append("propId", id);
    fd.append("ulbId", ulbId)
    fd.append("objectionFor", "Assessment Error");
    fd.append("assessmentData", JSON.stringify(assessData));
    fd.append("floorData", JSON.stringify(allfloor));
    // fd.append("objRemarks", values?.objRemarks);
    // fd.append("objFormDoc", formDoc);
    fd.append("objEvidenceDoc", evidenceDoc);

    console.log("before send data => ", fd,'\n assessment data => ', assessData, '\n floor data =>', allfloor);

    axios
      .post(postAssessment, fd, ApiHeader2())
      .then((res) => {
        if(res?.data?.status == true){
        // console.log("Submitted assessment => ", res);
        setloader(false);
        toast.success("Assessment Objection Applied Successfully...");
        props.submitForm(res?.data?.data);
        } else {
          setloader(false)
        }

        if(res?.data?.status == false){
        // console.log("Error assessment => ", res);
        setloader(false);
        toast.error("Something went wrong");
        } else {
          setloader(false)
        }
      })
      .catch((err) => {
       setloader(false)
      });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let checkValue = e.target.checked;
    let value = e.target.value;
    // console.log("switched is clicked ", e.target.name);

    //toggling the visibility of specific objection sections
    {
      name === "harvestingToggleStatus" &&
        (checkValue === true
          ? setHarvestingStatus(true)
          : setHarvestingStatus(false));
    }
    {
      name === "roadWidthToggleStatus" &&
        (checkValue === true
          ? setroadWidthStatus(true)
          : setroadWidthStatus(false));
    }
    {
      name === "propertyTypeToggleStatus" &&
        (checkValue === true
          ? setpropertyTypeStatus(true)
          : setpropertyTypeStatus(false));
    }
    {
      name === "plotAreaToggleStatus" &&
        (checkValue === true
          ? setplotAreaStatus(true)
          : setplotAreaStatus(false));
    }
    {
      name === "floorToggleStatus" &&
        (checkValue === true ? setfloorStatus(true) : setfloorStatus(false));
    }
    {
      name === "hoardingToggleStatus" &&
        (checkValue === true
          ? sethoardingStatus(true)
          : sethoardingStatus(false));
    }
    {
      name === "mobileTowerToggleStatus" &&
        (checkValue === true
          ? setmobileTowerStatus(true)
          : setmobileTowerStatus(false));
    }

    //input restrict validation
    {
      name == "builtupArea" &&
        formik.setFieldValue(
          "builtupArea",
          allowFloatInput(value, formik.values.builtupArea, 20)
        );
    }
  };

  const closeModal = () => {
    props.closePopUp();
  }

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />

      {/* <h1 className='mt-6 mb-2 font-serif font-semibold  text-gray-800'><GiFlatHammer className="inline mr-2" />Assessment Error</h1> */}

      {/* <h1 className="mt-6 mb-2 font-serif font-semibold  text-gray-600">
        <RiBuilding2Fill className="inline mr-2" />
        Assessment Objection
      </h1> */}

      {/* <div className="flex flex-row md:justify-evenly items-center space-x-2 px-4 w-full md:w-max capitalize text-base poppins mb-4 bg-white shadow-md py-2 rounded-md">
            <span className="font-extrabold text-[25px] text-gray-800"><RiBuilding2Fill/></span>
            <span className="font-semibold poppins text-xl">Assessment Objection</span>
      </div> */}

<div className="2xl:mt-6 mt-3 bg-indigo-500 text-white flex flex-row md:justify-evenly items-center justify-center capitalize text-xs poppins 2xl:text-base poppins mb-4 shadow-md py-2 rounded-md">
           <div className="flex items-center gap-2">
           <span className="font-extrabold text-[30px]">
              <FcDepartment />
            </span>
            <span className="font-semibold poppins 2xl:text-xl text-lg">
              Assessment Objection
            </span>
           </div>
          </div>

          <div className="poppins my-2 2xl:font-base text-sm poppins">
          Under Section 167 of the Jharkhand Municipal Act 2011, citizen can file the following objections in this objection form.
          </div>

      {loader && <BarLoader/>}

      {(status && !loader) &&
      <div className=" px-4 w-full md:py-6 rounded-lg shadow-lg bg-white mt-6 ">
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <div className="grid grid-cols-1 md:grid-cols-4 h-max">
          <FormGroup className="col-span-4 grid grid-cols-4 h-max">
              {/* harvesting objection content */}
              <div className="col-span-4 grid grid-cols-4 gap-2">
                <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        RainWater Harvesting
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={harvestingStatus}
                          // name="harvestingSwitch"
                          // onChange={switchHandleChange}
                          {...formik.getFieldProps("harvestingToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <div
                  className={`col-span-4 ${
                    harvestingStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Rainwater Harvesting
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.is_water_harvesting ? <>Yes</> : <>No</>}
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <select
                      {...formik.getFieldProps("isWaterHarvesting")}
                      value={formik.values.isWaterHarvesting}
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      <option value="0" >
                        No
                      </option>
                      <option value="1">Yes</option>
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isWaterHarvesting &&
                      formik.errors.isWaterHarvesting
                        ? formik.errors.isWaterHarvesting
                        : null}
                    </span>
                  </div>
                </div>
                {/* roadWidth objection content */}
                <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Road Width
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={roadWidthStatus}
                          // name="roadWidthSwitch"
                          // onChange={switchHandleChange}
                          {...formik.getFieldProps("roadWidthToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <div
                  className={`col-span-4 ${
                    roadWidthStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Road Width (in sq.ft.)
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.road_type}
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <select
                      {...formik.getFieldProps("roadType")}
                      value={formik.values.roadType}
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      <option disabled value="">
                        --select--
                      </option>
                      {roadList?.map((elem) => (
                        <>
                          <option value={elem?.id}>{elem?.road_type}</option>
                        </>
                      ))}
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.roadType && formik.errors.roadType
                        ? formik.errors.roadType
                        : null}
                    </span>
                  </div>
                </div>
                {/* propertyType objection content */}
                <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Property Type
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={propertyTypeStatus}
                          // name="propertyTypeSwitch"
                          // onChange={switchHandleChange}
                          {...formik.getFieldProps("propertyTypeToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <div
                  className={`col-span-4 ${
                    propertyTypeStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Property Type
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.property_type}
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <select
                      {...formik.getFieldProps("propertyType")}
                      value={formik.values.propertyType}
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      <option  disabled value="">
                        --select--
                      </option>
                      {propertyList?.map((elem) => (
                        <>
                          <option value={elem?.id}>{elem?.property_type}</option>
                        </>
                      ))}
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.propertyType && formik.errors.propertyType
                        ? formik.errors.propertyType
                        : null}
                    </span>
                  </div>
                </div>
                {/* area of plot objection content */}
                <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Area of Plot
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={plotAreaStatus} name="areaPlotSwitch"
                          //     onChange={switchHandleChange}
                          {...formik.getFieldProps("plotAreaToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <div
                  className={`col-span-4 ${
                    plotAreaStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Area of plot (in sq.ft.)
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.area_of_plot}
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <input
                      {...formik.getFieldProps("areaOfPlot")}
                      type="number"
                      value={formik.values.areaOfPlot}
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.areaOfPlot && formik.errors.areaOfPlot
                        ? formik.errors.areaOfPlot
                        : null}
                    </span>
                  </div>
                </div>

                {/* <div className="col-span-4 grid grid-cols-4">
                  mobile tower objection content
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Mobile Tower
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={mobileTowerStatus} name="mobileTowerSwitch"
                              onChange={switchHandleChange}
                          {...formik.getFieldProps("mobileTowerToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>

                <div
                  className={`col-span-4 ${
                    mobileTowerStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Mobile Tower
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.is_mobile_tower ? <>Yes</> : <>No</>}
                    </div>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <select
                      {...formik.getFieldProps("isMobileTower")}
                      value={formik.values.isMobileTower}
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      <option value="0" >
                        No
                      </option>
                      <option value="1">Yes</option>
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isMobileTower &&
                      formik.errors.isMobileTower
                        ? formik.errors.isMobileTower
                        : null}
                    </span>
                  </div>

                  {
                    formik.values.isMobileTower == 1 && <>
                    <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Total Area Covered
                    </label>
                    <input
                      {...formik.getFieldProps("mobileArea")}
                      type="number"
                      value={formik.values.mobileArea}
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isMobileTower &&
                      formik.errors.isMobileTower
                        ? formik.errors.isMobileTower
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Date of Installation
                    </label>
                    <input
                      {...formik.getFieldProps("mobileDate")}
                      value={formik.values.mobileDate}
                      type="date"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isMobileTower &&
                      formik.errors.isMobileTower
                        ? formik.errors.isMobileTower
                        : null}
                    </span>
                  </div>
                    </>
                  }

                </div> */}
                {/* hoarding objection content */}
                {/* <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Hoarding Board
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={hoardingStatus} name="hoardingSwitch"
                              onChange={switchHandleChange}
                          {...formik.getFieldProps("hoardingToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>

                </div>

                <div
                  className={`col-span-4 ${
                    hoardingStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Hording Board
                    </label>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      As Per Assessment
                    </label>
                    <div className="font-bold font-serif">
                      {tempData?.is_hoarding_board ? <>Yes</> : <>No</>}
                    </div>
                  </div>
                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      As Per Applicant
                    </label>
                    <select
                      {...formik.getFieldProps("isHoarding")}
                      value={formik.values.isHoarding}
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    >
                      <option value="0" >
                        No
                      </option>
                      <option value="1">Yes</option>
                    </select>
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isHoarding && formik.errors.isHoarding
                        ? formik.errors.isHoarding
                        : null}
                    </span>
                  </div>
                  {
                    formik.values.isHoarding == 1 && <>
                    <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Total Area Covered
                    </label>
                    <input
                      {...formik.getFieldProps("hoardingArea")}
                      value={formik.values.hoardingArea}
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isMobileTower &&
                      formik.errors.isMobileTower
                        ? formik.errors.isMobileTower
                        : null}
                    </span>
                  </div>

                  <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4">
                    <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                      <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                        *
                      </small>
                      Date of Installation
                    </label>
                    <input
                      {...formik.getFieldProps("hoardingDate")}
                      value={formik.values.hoardingDate}
                      type="date"
                      className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                    />
                    <span className="text-red-600 absolute text-xs">
                      {formik.touched.isMobileTower &&
                      formik.errors.isMobileTower
                        ? formik.errors.isMobileTower
                        : null}
                    </span>
                  </div>
                    </>
                  }
                </div> */}
                {/* floor objection content */}
                <div className="col-span-4 grid grid-cols-4">
                  <div className="col-span-4 md:col-span-1  mb-2 px-2 md:px-4 bg-gray-100 shadow-md border border-gray-300">
                    <label className=" text-gray-800 pr-2">
                      {" "}
                      <span className="inline text-gray-700 2xl:text-sm text-xs poppins font-semibold">
                        Floor Detail
                      </span>
                    </label>
                    <FormControlLabel
                      control={
                        <Switch
                          // checked={floorStatus} name="floorSwitch"
                          //     onChange={switchHandleChange}
                          {...formik.getFieldProps("floorToggleStatus")}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label=""
                    />
                  </div>
                </div>
                <div
                  className={`col-span-4 ${
                    floorStatus ? "grid" : "hidden"
                  } grid-cols-1 md:grid-cols-4  mt-2`}
                >
                  <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-red-100 shadow-md">
                    <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                      Objection On: Floor Details
                    </label>
                  </div>

                  <ObjectionFloor floor={floor} getFloorData={getFloorData} />
                </div>
              </div>
            </FormGroup>

            {/* ==========Documents=============== */}
            <div
              className={`col-span-4 grid grid-cols-1 md:grid-cols-4 h-max mt-10 border`}
            >
              <div className="form-group col-span-4 mb-6 px-2 md:px-4 bg-green-100 shadow-md">
                <label className="form-label inline-block mb-1 text-gray-700 2xl:text-sm text-xs poppins text-xs poppins font-semibold">
                  Documents
                </label>
              </div>

              {/* <div className="form-group mb-6 col-span-4 md:col-span-1 px-2 md:px-4" onChange={formik.handleChange}>
                <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                  <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Objection Form
                </label>
                <input
                  // {...formik.getFieldProps("objFormDoc")}
                  name="objFormDoc"
                  type="file"
                  onChange={handleChangeImage}
                  accept=".pdf,.jpg,.jpeg"
                  className="form-control block w-full px-3 py-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.objFormDoc && formik.errors.objFormDoc
                    ? formik.errors.objFormDoc
                    : null}
                </span>
              </div> */}
              
              <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4" onChange={formik.handleChange}>
                <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                  <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Evidence Document
                </label>
                <input
                  // {...formik.getFieldProps("objEvidenceDoc")}
                  name="objEvidenceDoc"
                  onChange={handleChangeImage}
                  accept=".pdf,.jpg,.jpeg"
                  type="file"
                  className="form-control block w-full px-3 py-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.objEvidenceDoc && formik.errors.objEvidenceDoc
                    ? formik.errors.objEvidenceDoc
                    : null}
                </span>
              </div>
              {/* <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                <label className="form-label inline-block mb-1 text-gray-600 2xl:text-sm text-xs poppins font-semibold">
                  <small className="block mt-1 text-sm font-semibold text-red-600 inline ">
                    *
                  </small>
                  Remarks
                </label>
                <input
                  {...formik.getFieldProps("objRemarks")}
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-xs poppins 2xl:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                />
                <span className="text-red-600 absolute text-xs">
                  {formik.touched.objRemarks && formik.errors.objRemarks
                    ? formik.errors.objRemarks
                    : null}
                </span>
              </div> */}
            </div>

            <div className="col-span-4 flex flex-row flex-wrap justify-between items-center w-full h-max mt-4">
              <div
                onClick={() => closeModal()}
                className="cursor-pointer px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out poppins"
              >
                Close
              </div>
              <div>
                <button
                  type="submit"
                  className=" poppins px-3 py-1.5 2xl:px-6 2xl:py-2.5 bg-green-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>}
      
     {!status &&  <>
                    <EmptyDetailsIllustration title={"Oops !! No Assessment Details Found !!"} location={closeModal}/>
      </>
      }
    </>
  );
}

export default ObjectionEntryForm;
