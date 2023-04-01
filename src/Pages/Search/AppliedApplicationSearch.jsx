import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { RiFilter2Line } from "react-icons/ri";
import ListTable from "@/Components/Common/ListTable/ListTable";
import axios from "axios";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { useNavigate, useParams } from "react-router-dom";
import searchImg from "./search.png";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BarLoader from "@/Components/Common/BarLoader";
import useSetTitle from "@/Components/GlobalData/useSetTitle";
import { changeUrl } from "@/Components/Navigation/superNavigation";
import UseSetConfirmBox from "@/Components/GlobalData/UseSetConfirmBox";
import CommonModal from "@/Components/GlobalData/CommonModal";
import ServerErrorCard from "@/Components/Common/ServerErrorCard";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";

function AppliedApplicationSearch() {
  const [readymadeListData, setreadymadeListData] = useState();
  const [readymadeListStatus, setreadymadeListStatus] = useState(false);
  const [readymadeListColumns, setreadymadeListColumns] = useState();

  const [ulbList, setUlbList] = useState();
  const [searchBy, setSearchBy] = useState();
  const [disableWard, setDisableWard] = useState(false);
  const [serarachType, setSerarachType] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);


  const { filterParam, searchValueParam } = useParams()


  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Search Applied Applications')

  const {
    api_getWardListByLogin,
    api_filterPropertyDetails,
    api_filterPropertyAppliedApplications,
  } = ProjectApiList();

  const header = ApiHeader()

  const validationSchema = yup.object({
    filterBy: yup.string().required("This is a required field !"),
    // wardNo: yup.string().required("This is a required field !"),
    entry: yup.string().required("This is a required field !"),
  });
  const formik = useFormik({
    initialValues: {
      filterBy: "",
      entry: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      fetchData(values);
      setSerarachType(values.filterBy);
    },
    validationSchema,
  });

  const navigate = useNavigate();

  //Fetch Data API

  const fetchData = (data) => {
    seterroState(false)
    setisLoading(true)
    setreadymadeListStatus(false)
    const requestBody = {
      filteredBy: data.filterBy,
      applicationNo: data.entry,
    };


    console.log('before fetch applied application..', requestBody)

    axios
      .post(api_filterPropertyAppliedApplications, requestBody, ApiHeader())
      .then((res) => {
        console.table('applied application. in at ...', res?.data)
        if (data.filterBy == 'saf') {
          setreadymadeListColumns(COLUMNS_SAF)
        }else if(data.filterBy=='gbsaf'){
          setreadymadeListColumns(COLUMNS_GBSAF)
        } else {
          setreadymadeListColumns(COLUMNS_OTHER)
        }
        changeUrl(`/property/searchAppliedProperty/${encodeURIComponent(data?.filterBy)}/${encodeURIComponent(data?.entry)}`)
        setreadymadeListData(res.data?.data)
        setreadymadeListStatus(true)
        setisLoading(false)
      })
      .catch((err) => {
        console.log("Error while fetching Filter Data", err)
        setreadymadeListStatus(false)
        seterroState(true)
        setisLoading(false)

      });
  };

  console.log("datassssssssss", readymadeListData);








  const handleFilterBy = (e) => {
    formik.values.filterBy = e.target.value;

    if (e.target.value == "holdingNo") {
      setSearchBy("15 Digit Holding No");
      setDisableWard(true);
    }
    if (e.target.value == "ownerDetails") {
      setSearchBy("Owner Details");
      setDisableWard(false);
    }
    if (e.target.value == "address") {
      setSearchBy("Address");
      setDisableWard(false);
    }
  };

  const COLUMNS_SAF = [
    {
      Header: "Ward No.",
      Cell: ({ cell }) => (
        <span>{cell.row.original.new_ward_no == '' ? nullToNA(cell.row.original.old_ward_no) : nullToNA(cell.row.original.new_ward_no)}</span>
      )
    },

    {
      Header: "Application No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.saf_no)}</span>
      )
    },
    {
      Header: "Assessment Type",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.assessment_type)}</span>
      )
    },
    {
      Header: "First Owner",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.owner_name)}</span>
      )
    },
    {
      Header: "Mobile No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.mobile_no)}</span>
      )
    },
    {
      Header: "Applied By",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.appliedby)}</span>
      )
    },
    {
      Header: "Current Level",
      Cell: ({ cell }) => (
        <span className="bg-indigo-100 text-black px-2 py-0.5 shadow-xl rounded-xl">{nullToNA(cell.row.original.currentRole)}</span>
      )
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            onClick={() =>
              navigate(
                `/propApplicationDetails/${cell.row.values.id}`
              )
            }
            className="mr-4 text-white bg-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-600 hover:text-white"
          >
            View
          </button>
          {/* // UPLOAD BUTTON WILL BE VISIBLE IF APPLIED BY CITIZEN */}
          {(cell.row.original.doc_upload_status == 1
            && cell.row.original.appliedby == 'Citizen') && <button
              onClick={() =>
                navigate(
                  `/propApplicationDetails/${cell.row.values.id}`
                )
              }
              className="ml-4 mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white"
            >
              Upload
            </button>}

          {cell.row.original.payment_status == 0 && <button
            onClick={() =>
              navigate(
                `/viewDemand/${cell.row.values.id}`
              )
            }
            className="ml-4 mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white"
          >
            Pay
          </button>}


        </>
      ),
    },
  ];
  const COLUMNS_GBSAF = [
    {
      Header: "Ward No.",
      Cell: ({ cell }) => (
        <span>{cell.row.original.new_ward_no == '' ? nullToNA(cell.row.original.old_ward_no) : nullToNA(cell.row.original.new_ward_no)}</span>
      )
    },

    {
      Header: "Application No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.saf_no)}</span>
      )
    },
    {
      Header: "Officer's Name",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.officer_name)}</span>
      )
    },
    {
      Header: "Assessment Type",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.assessment_type)}</span>
      )
    },
    {
      Header: "Mobile No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.mobile_no)}</span>
      )
    },
    {
      Header: "Apply Date",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.updated_at)}</span>
      )
    },
    {
      Header: "Current Level",
      Cell: ({ cell }) => (
        <span className="bg-indigo-100 text-black px-2 py-0.5 shadow-xl rounded-xl">{nullToNA(cell.row.original.currentRole)}</span>
      )
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            onClick={() =>
              navigate(
                `/gbsaf-details/${cell.row.values.id}`
              )
            }
            className="mr-4 text-white bg-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-600 hover:text-white"
          >
            View
          </button>
          {/* // UPLOAD BUTTON WILL BE VISIBLE IF APPLIED BY CITIZEN */}
          {(cell.row.original.doc_upload_status == 1
            && cell.row.original.appliedby == 'Citizen') && <button
              onClick={() =>
                navigate(
                  `/propApplicationDetails/${cell.row.values.id}`
                )
              }
              className="ml-4 mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white"
            >
              Upload
            </button>}

          {cell.row.original.payment_status == 0 && <button
            onClick={() =>
              navigate(
                `/viewDemand/${cell.row.values.id}`
              )
            }
            className="ml-4 mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white"
          >
            Pay
          </button>}


        </>
      ),
    },
  ];
  const COLUMNS_OTHER = [
    {
      Header: "Ward No.",
      Cell: ({ cell }) => (
        <span>{cell.row.original.new_ward_no == '' ? nullToNA(cell.row.original.old_ward_no) : nullToNA(cell.row.original.new_ward_no)}</span>
      )
    },

    {
      Header: "Application No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.application_no)}</span>
      )
    },
    {
      Header: "Holding No.",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.new_holding_no)}</span>
      )
    },
    {
      Header: "Applicant Name",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.owner_name)}</span>
      )
    },
    {
      Header: "Mobile No",
      Cell: ({ cell }) => (
        <span>{nullToNA(cell.row.original.mobile_no)}</span>
      )
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={() => {
            if (formik.values.filterBy == 'concession') {
              navigate(`/concession-details/${cell.row.values.id}`)
            }
            if (formik.values.filterBy == 'objection') {
              navigate(`/objection-details/${cell.row.values.id}`)
            }
            if (formik.values.filterBy == 'rainWaterHarvesting') {
              navigate(`/harvesting-details/${cell.row.values.id}`)
            }
            if (formik.values.filterBy == 'holdingDeactivation') {
              navigate(`/holding-deactivatioin-details/${cell.row.values.id}`)
            }
          }
          }
          className="bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black"
        >
          View
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (searchValueParam != 'direct') {
      console.log('filter param ', decodeURIComponent(filterParam))
      formik.setFieldValue('filterBy', decodeURIComponent(filterParam));
      formik.setFieldValue('entry', decodeURIComponent(searchValueParam));
      fetchData({ filterBy: decodeURIComponent(filterParam), entry: decodeURIComponent(searchValueParam) })
    }
  }, []);


  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    { name == 'filterBy' && handleFilterBy(e) }
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

      {
        isLoading && <BarLoader />
      }

      <div className="border shadow-xl bg-white mt-6">
        <div className="flex ml-5 mt-2 ">
          <img src={searchImg} alt="" className="w-10 h-10" />
          <p className="font-bold text-3xl ml-4 mt-1 text-gray-600">
            Search Applied Applications
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
          <div className="flex justify-center space-x-8 my-5 m-10">
            <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Application Type<span className="text-red-500">*</span>
              </label>
              <select
                {...formik.getFieldProps('filterBy')}
                className="cursor-pointer w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              >
                <option value="">Select</option>
                <option value="saf">SAF</option>
                <option value="gbsaf">GBSAF</option>
                <option value="concession">Concession</option>
                <option value="objection">Objection</option>
                <option value="rainWaterHarvesting">Rainwater Harvesting</option>
                <option value="holdingDeactivation">Holding Deactivation</option>
              </select>
              <p className="text-red-500 text-xs">
                {formik.touched.filterBy && formik.errors.filterBy
                  ? formik.errors.filterBy
                  : null}
              </p>
            </div>
            {/* <div>
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ward No<span className='text-red-500'>*</span></label>
                            <select
                                name="wardNo"
                                onChange={formik.handleChange}
                                className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                disabled={disableWard}
                            >
                                <option value="">Select</option>
                                <option value="0">All Ward</option>
                                {
                                    ulbList?.map((item) => (
                                        <option value={item.id}>{item.wardName}</option>
                                    ))
                                }

                            </select>
                            <p className='text-red-500 text-xs'>{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</p>
                        </div> */}
            <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                {" "}
                Application / SAF No. {searchBy}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps('entry')}
                className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              />
              <p className="text-red-500 text-xs">
                {formik.touched.entry && formik.errors.entry
                  ? formik.errors.entry
                  : null}
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full border rounded-md border-indigo-500 bg-indigo-500 hover:bg-indigo-700 text-white  shadow-lg  text-base font-semibold px-5 m-3 py-1"
              >
                {" "}
                <p className="flex">
                  {" "}
                  <span className="mt-1 mr-2">
                    {" "}
                    <RiFilter2Line />{" "}
                  </span>{" "}
                  Search record
                </p>
              </button>
            </div>
          </div>
        </form>
        {/* View Search Result in List Table */}
        <div className="m-10">
          {/* {readymadeListData == false && data?.data?.status == true ? <ListTable columns={COLUMNS} dataList={data?.data?.data} /> : readymadeListData == false && <p className='text-center font-semibold'> No data Found!</p>} */}
          {readymadeListStatus && readymadeListData?.length != 0 &&
            <ListTable columns={readymadeListColumns} dataList={readymadeListData} />
          }
          {
            readymadeListStatus && readymadeListData?.length == 0 &&
            <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
          }
        </div>
      </div>
    </>
  );
}

export default AppliedApplicationSearch;
