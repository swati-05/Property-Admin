//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 22nd Nov., 2022  10:30 PM
// Project     : JUIDCO
// Component   : Cluster List
// Description : Cluster Table List
//////////////////////////////////////////////////////////////////////

import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import apiList from "@/Components/ApiList/ClusterFormApi";
import { ClusterForm } from "./ClusterForm";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import ListTable from "@/Components/Common/ListTable/ListTable";
import { IoSearchSharp } from "react-icons/io5";
import ClusterView from "./ClusterView";
import { useEffect } from "react";
import "animate.css";
import { GrOverview } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEditCircle } from "react-icons/tb";
import { RiBuilding2Fill } from 'react-icons/ri'
import BarLoader from "@/Components/Common/BarLoader";
import { useNavigate } from "react-router-dom";
import BrandLoader from "@/Components/Common/BrandLoader";
import BottomErrorCard from "@/Components/Common/BottomErrorCard";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";

const ClusterTable = (props) => {
  // ========= Constants==================
  const [table, settable] = useState(false);
  const [edit, setedit] = useState(false);
  const [index, setindex] = useState();
  const [userData, setuserData] = useState();
  const [view, setview] = useState(false);
  const [add, setadd] = useState(false);
  const [holdingScreen, setholdingScreen] = useState(false);
  // const [columns, setcolumns] = useState();
  const [refresh, setrefresh] = useState(0);
  const [clusterData, setclusterData] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [holdingList, setholdingList] = useState()
  const [safList, setsafList] = useState()
  const [userId, setuserId] = useState()
  const [refreshMap, setrefreshMap] = useState(0)
  const [erroState, seterroState] = useState(false);
  const [erroState2, seterroState2] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);



  // ==============Destructing Api=======================
  const { getCluster, viewCluster, deleteCluster } = apiList();

  const navigate = useNavigate()

  // =============To get cluster list===================
  useEffect(() => {
    setisLoading(true)

    axios.get(getCluster, ApiHeader())
      .then((res) => {
        console.log('cluster list response => ', res)
        setclusterData(res?.data?.data)
        settable(true)
        setview(false)
        setedit(false)
        setadd(false)
        setisLoading(false)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Error in fetching cluster list. Please try again later.')
        setisLoading(false)
      })
  }, [refresh])

  // ================To delete cluster data =================
  const funDel = (ind) => {
    setisLoading(true)
    console.log("Api header => ", ApiHeader(), "\n and id is ", ind);
    axios
      .post(
        deleteCluster,
        { id: ind },
        ApiHeader()
      )
      .then((res) => {
        toast.success("Deleted Successfully !!")
        setrefresh(refresh + 1);
        setisLoading(false)
        settable(true)
        setview(false)
        setedit(false)
        setadd(false)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Error in deleting cluster. Please try again later.')
        console.log("err => ", err)
        setisLoading(false)
      })
  };

  // ===========Toggle for add screen===========
  const funAdd = () => {
    settable(false);
    setadd(true);
    setview(false)
  };

  // refresh table on submit
  useEffect(() => { setrefresh(refresh + 1) }, [])

  // ========Function to edit cluster==============
  const funEdit = (ind) => {
    setisLoading(true)
    console.log(
      "entering edit function with id => ",
      ind,
      " \n and api is => ",
      viewCluster
    );
    axios
      .post(viewCluster, { clusterId: ind }, ApiHeader())
      .then((res) => {
        console.log("--4-- getting user data => ", res?.data?.data);
        setuserData(res?.data?.data?.Cluster);
        settable(false);
        setedit(true);
        setview(false)
        setindex(ind);
        setisLoading(false)
      })
      .catch((err) => {
        console.log("--4-- getting user data error => ", err)
        activateBottomErrorCard(true, 'Error in cluster data update. Please try again later.')
        setisLoading(false)
      });
  };

  // ==============Toggle for back ===============================
  const backFun = () => {
    setview(false);
    settable(true);
    setedit(false);
    setadd(false);
    setuserData("");
  };



  // =============Columns for table========================
  const COLUMNS = [
    {
      Header: "S.No.",
      Cell: ({ row }) => <div>{row?.index + 1}</div>,
    },
    {
      Header: "Old Ward No.",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.oldWard))
    },
    {
      Header: "New Ward No.",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.newWard))
    },
    {
      Header: "Name",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.name))
    },

    {
      Header: "Type",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.type))
    },

    {
      Header: "Address",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.address))
    },
    {
      Header: "Mobile No.",
      accessor: "mobileNo",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.mobileNo))

    },
    {
      Header: "Authorized Person Name",
      accessor: "authPersonName",
      Cell: ({ cell }) => (nullToNA(cell.row.original?.authPersonName))

    },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          {/* ============Action Button of Table======================= */}
          <div className="space-x-2">
            {/* ===========Edit button============= */}
            <button
              className="text-green-500 hover:text-green-600 rounded-md text-lg shadow-lg py-1 px-2"
              onClick={() => funEdit(cell?.row?.values?.id)}
            >
              <TbEditCircle />
            </button>

            {/* ==================View Button=============== */}
            <button
              className="text-amber-500 hover:text-amber-600 rounded-md text-lg shadow-lg py-1 px-2"
              onClick={() => navigate('/viewCluster/' + cell?.row?.values?.id)}
            >
              <GrOverview />
            </button>

            {/* =================Delete Button with popup for confirming================ */}
            <Popup
              trigger={
                <button className="text-red-500 hover:text-red-600 rounded-md text-lg shadow-lg py-1 px-2">
                  <RiDeleteBin6Line />
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="h-screen w-screen flex-row justify-center items-center backdrop-blur-sm">
                  <div className="flex flex-col justify-center h-max w-max absolute top-[40%] right-[40%] bg-white px-4 py-2 rounde-md shadow-lg animate__animated animate__fadeInDown animate__faster">
                    <button className="close text-start" onClick={close}>
                      &times;
                    </button>
                    <div className="text-sm">
                      Are you sure want to delete ?
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-blue-200 hover:bg-blue-300 shadow-md text-xs px-4 py-1 m-4 rounded-md"
                        onClick={() => {
                          close();
                          funDel(cell?.row?.values?.id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-blue-200 hover:bg-blue-300 px-4 shadow-md text-xs py-1 m-4 rounded-md"
                        onClick={close}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </>
      ),
    },
  ]

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }

  if (isLoading) {
    return (
      <>
        <BrandLoader />
      </>
    )
  }
  if (erroState2) {
    return (
      <CommonModal>
        <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
      </CommonModal>
    )
  }

  return (
    <>
      {/* =========For toast================== */}
      <ToastContainer position="top-right" autoClose={2000} />

      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      {/* ===========Table================ */}
      <div className="px-2 sm:px-0">
        {(!isLoading && table) && (
          <>

            <div className="flex justify-between items-center">
              <h1 className="mt-6 mb-2 font-serif font-semibold  text-gray-600">
                <RiBuilding2Fill className="inline mr-2" />
                Cluster List
              </h1>
              <button
                className="bg-sky-400 px-3 pr-3 shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-green-600 text-center relative"
                onClick={() => funAdd()}
              >
                Add
              </button>
            </div>

            <ListTable columns={COLUMNS} dataList={clusterData} />
            <div className="h-[20vh]"></div>
          </>
        )}
      </div>

      {/* ==========Add and Edit Common component============= */}
      {(edit || add) && (
        <>
          <ClusterForm
            backFun={backFun}
            editState={edit}
            userId={index}
            userData={userData}
            refresh={() => setrefresh(refresh + 1)}
          />
        </>
      )}

      {/* ============View Component============= */}
      {view && (
        <ClusterView backFun={backFun} userData={userData} userId={index} holdingList={holdingList} safList={safList} refresh={() => setrefreshMap(refreshMap + 1)} />
      )}
    </>
  );
};

export default ClusterTable;

///////////////////////////////////////
// Export to : ClusterFormIndex.js
