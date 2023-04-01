import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { RiFilter2Line } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";

import ListTable from "@/Components/Common/ListTable/ListTable";
import axios from "axios";
import ProjectApiList from "@/Components/ApiList/ProjectApiList";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import searchImg from "./search.png";
import BarLoader from "@/Components/Common/BarLoader";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { contextVar } from "@/Components/Context/Context";
import { superNavigation, changeUrl } from "@/Components/Navigation/superNavigation";
import useSetTitle from "@/Components/GlobalData/useSetTitle";
import CommonModal from "@/Components/GlobalData/CommonModal";
import ServerErrorCard from "@/Components/Common/ServerErrorCard";

function SearchIndex() {
  const [searchBy, setSearchBy] = useState();
  const { type, filterParam, searchValueParam } = useParams()
  const [isLoading, setisLoading] = useState(false);
  const [readymadeListData, setreadymadeListData] = useState();
  const [readymadeListStatus, setreadymadeListStatus] = useState(false);
  const { notify } = useContext(contextVar)
  const [erroState, seterroState] = useState(false);


  // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
  useSetTitle('Search Holding')



  console.log('search params...', type, ' ', filterParam, ' ', searchValueParam)


  const { api_getWardListByLogin, api_filterPropertyDetails } =
    ProjectApiList();

  const header = ApiHeader()


  const navigate = useNavigate();
  const location = useLocation()

  console.log('last url.......')
  //Fetch Data API

  const fetchData = (data) => {
    seterroState(false)
    setreadymadeListStatus(false)
    setisLoading(true)
    const payload = {
      filteredBy: data?.filterBy,
      parameter: data?.parameter,
    };


    console.log('before fetch holding details....', payload)
    axios
      .post(api_filterPropertyDetails, payload, header)
      .then((res) => {
        console.log('search property list', res?.data)
        if (res?.data?.status) {
          setreadymadeListData(res?.data?.data)
          setreadymadeListStatus(true)
          // TO CHANGE THE URL TO REFETCH DATA WHEN COME BACK
          changeUrl(`/property/search/fresh/${encodeURIComponent(data?.filterBy)}/${encodeURIComponent(data?.parameter)}`)
        } else {
          notify('Something went wrong!!', 'error')
        }

        setisLoading(false)
      })
      .catch((err) => {
        console.log("Error while fetching Filter Data", err)
        notify('Something went wrong!!', 'error')
        seterroState(true)
        setisLoading(false)
        setreadymadeListStatus(false)
      });
  };

  // console.log("datassssssssss", filteredData)

  const validationSchema = yup.object({
    filterBy: yup.string().required("This is a required field !"),
    // wardNo: yup.string().required("This is a required field !"),
    parameter: yup.string().required("This is a required field !"),
  });

  const formik = useFormik({
    initialValues: {
      filterBy: "",
      // wardNo: "",
      parameter: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      fetchData(values);
    },
    validationSchema,
  });

  // IF CTRL AND CLICK LINK THEN OPEN IN A NEW TAB
  const sendNextPage = (e, rowId) => {
    let url = `/holdingPropertyDetails/${rowId}`
    // SENDING EVENT AND URL TO SUPERNAVIGATION FUNCTION TO NAVIGATE OR OPEN IN A NEW TAB IF CTRL + CLICK IS DETECTED
    superNavigation(e, url, navigate)
  }

  const handleFilterBy = (e) => {
    formik.values.filterBy = e.target.value;

    if (e.target.value == "holdingNo") {
      setSearchBy("Holding No");
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

  const COLUMNS = [
    {
      Header: "Ward No.",
      accessor: "ward_name",
    },
    {
      Header: "Owner's Name",
      accessor: "owner_name",
    },
    {
      Header: "Holding No",
      accessor: "holding_no",
    },
    {
      Header: "New Holding No",
      accessor: "new_holding_no",
    },
    {
      Header: "Mobile No",
      accessor: "mobile_no",
    },
    {
      Header: "Address",
      accessor: "prop_address",
    },
    {
      Header: "Status",
      Cell: ({ cell }) => (
        <div>
          {cell.row.original.active_status === 1 && <span className="text-green-400 font-semibold">Active</span>}
          {cell.row.original.active_status === 0 && <span className="text-red-400 font-semibold">Disabled</span>}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={(e) => sendNextPage(e, cell.row.values.id)}
          className="bg-indigo-500 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 text-white"
        >
          View
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (searchValueParam != 'direct') {
      formik.setFieldValue('filterBy', decodeURIComponent(filterParam));
      formik.setFieldValue('parameter', (decodeURIComponent(searchValueParam)));
      fetchData({ filterBy: decodeURIComponent(filterParam), parameter: decodeURIComponent(searchValueParam) })
    }
  }, []);


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

      {(type == 're' || type == 'mu') && <div className="bg-amber-50 px-4 py-4 mb-4 text-lg rounded-lg shadow-lg text-amber-600 inline-block">
        <AiFillInfoCircle className="inline mr-2 text-3xl" />For <span className="font-semibold">{type == 're' ? 'Re-Assessment' : 'Mutation'}</span> of property search the property and then apply for {type == 're' ? 'Re-Assessment' : 'Mutation'}
      </div>}
      <div className="border shadow-xl bg-white mt-6">
        <div className="flex ml-5 mt-2 ">
          <img src={searchImg} alt="" className="w-10 h-10" />
          <p className="font-bold text-3xl ml-4 mt-1 text-gray-600">
            Holding Search...
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center space-x-8 my-5 m-10">
            <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Filter By<span className="text-red-500">*</span>
              </label>
              <select
                {...formik.getFieldProps('filterBy')}
                // onChange={formik.handleChange}
                // onClick={(e) => setSearchBy(e.target.values)}
                className="cursor-pointer w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              >
                <option value="">Select</option>
                <option value="holdingNo">Holding No</option>
                <option value="ownerName">Owner Name</option>
                <option value="mobileNo">Mobile No</option>
                <option value="address">Address</option>
              </select>
              <p className="text-red-500 text-xs">
                {formik.touched.filterBy && formik.errors.filterBy
                  ? formik.errors.filterBy
                  : null}
              </p>
            </div>
            {/* <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Ward No<span className="text-red-500">*</span>
              </label>
              <select
                name="wardNo"
                onChange={formik.handleChange}
                className="cursor-pointer w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                disabled={disableWard}
              >
                <option value="">Select</option>
                <option value="0">All Ward</option>
                {ulbList?.map((item) => (
                  <option value={item.id}>{item.ward_name}</option>
                ))}
              </select>
              <p className="text-red-500 text-xs">
                {formik.touched.wardNo && formik.errors.wardNo
                  ? formik.errors.wardNo
                  : null}
              </p>
            </div> */}
            <div>
              <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                Search By {searchBy} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps('parameter')}
                className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
              />
              <p className="text-red-500 text-xs">
                {formik.touched.parameter && formik.errors.parameter
                  ? formik.errors.parameter
                  : null}
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full border rounded-md border-indigo-700 bg-indigo-600 hover:bg-indigo-700 text-white  shadow-lg text-base font-semibold px-5 m-3 py-1"
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

      </div>
      <div className="mt-10">
        {readymadeListStatus && readymadeListData?.length != 0 &&
          <ListTable columns={COLUMNS} dataList={readymadeListData} />
        }
        {
          readymadeListStatus && readymadeListData?.length == 0 &&
          <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
        }
        <div className="w-full h-40"></div>
      </div>

    </>
  );
}

export default SearchIndex;
