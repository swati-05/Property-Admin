////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : Worflow Master
////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import ListTable from "@/Components/Common/ListTable/ListTable";
import LoadingData from "@/Components/Common/Loading/LoadingData";
import { CgPlayListAdd } from "react-icons/cg";
import AddNewUmModal from "./UmComponents/AddNewUmModal";
import DeleteUmModal from "./UmComponents/DeleteUmModal";
import EditUmModal from "./UmComponents/EditUmModal";
import { ColorRing } from "react-loader-spinner";
import '../fonts.css'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiList from '../Common/ApiList'
import { useContext } from "react";
import { contextVar } from "../Common/Context/Context";
import BarLoader from "@/Components/Common/BarLoader";
import useSetTitle from "@/Components/GlobalData/useSetTitle";

function UmList(props) {

  useSetTitle("Users Management")

  const [openAddNewUmModal, setOpenAddNewUmModal] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openModelForEdit, setOpenModelForEdit] = useState(0);

  const [deleteWorkflowId, setdeleteWorkflowId] = useState();
  const [editWorkflowId, setEditWorkflowId] = useState();
 const [roleList, setroleList] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [wfUlbData, setwfUlbData] = useState()

  const {refresh, setrefresh} = useContext(contextVar)

  const {UmList, allRole} = apiList()

  useEffect(() => {
    axios.get(allRole, ApiHeader())
    .then((res) => {
      console.log("role list => ", res)
      setroleList(res?.data?.data)
    })
    .catch((err) => {
      console.log("ulb list err => ", err)
    })
  },[])

  const handleDeleteId = (id) => {
    setOpenDeleteModal((prev) => prev + 1);
    setdeleteWorkflowId(id);
  };

  const handleEditBtn = (data) => {
    setOpenModelForEdit((prev) => prev + 1);
    setEditWorkflowId(data);
    console.log("id to be edit is", data);
  };

  console.log("editWorkflowId", editWorkflowId);


  useEffect(() => {
    console.log("entering 2")
    setisLoading(true)
    axios.get(UmList,ApiHeader())
    .then((res) => {
      console.log("getting users list => ", res)
      setwfUlbData(res?.data?.data)
      setisLoading(false)
    })
    .catch((err) => {
      console.log("getting users list error =>", err)
      setisLoading(false)
    })
  },[refresh])

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
    },
    {
      Header: "User Type",
      accessor: "user_type",
    },
    {
      Header: "User Name",
      accessor: "user_name",
    },
    {
      Header : 'Mobile No.',
      accessor: 'mobile',
      Cell: (props) => {
        if(props?.value == ""){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != "")
       { return props?.value }
      }
    },
    {
      Header : 'Email',
      accessor: 'email',
      Cell: (props) => {
        if(props?.value == ""){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != "")
       { return props?.value }
      }
    },
    {
      Header : 'Role Name',
      accessor: 'role_name',
      Cell: (props) => {
        if(props?.value == null){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != "")
       { return props?.value }
      }
    },
    {
      Header: "Is Super User",
      accessor: 'super_user',
        Cell: (props) => {
          
          if(props?.value == null){
            return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
          }
  
         if(props?.value != null)
         {
        return (
          <div className="w-full flex flex-row justify-center items-center">
            
            {props?.value == false && (
              <p className="text-red-600 text-base font-semibold text-center px-5 py-1 rounded-md ">
                No
              </p>
            )}
            {props?.value == true && (
              <p className="text-green-600 text-base font-semibold px-4 py-1 rounded-md ">
                Yes
              </p>
            )}
          </div>
        )}
      }
    },
    {
      Header: "Is Workflow Participant",
      accessor: "workflow_participant",
      Cell: (props) => {
        if(props?.value == null){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != null)
       {
        return (
          <div className="w-full flex flex-row justify-center items-center">
            {props?.value == false && (
              <p className="text-red-600 text-base font-semibold text-center px-5 py-1 rounded-md ">
                No
              </p>
            )}
            {props?.value == true && (
              <p className="text-green-600 text-base font-semibold px-4 py-1 rounded-md ">
                Yes
              </p>
            )}
          </div>
        );}
      },
    },
    // {
    //   Header: "Created at",
    //   accessor: "created_at",
    //   Cell: ({ value }) => {
    //     if(value != ""){
    //       return format(new Date(value), "dd/MM/yyyy");
    //       }
  
    //       if(value == ""){
    //         return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
    //       }
    //   },
    // },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <div className="flex flex-row flex-wrap gap-2">
          <button
            onClick={() => handleEditBtn(cell?.row?.values)}
            className="poppins bg-indigo-200 mx-1 px-5 py-1 rounded-md shadow-lg hover:shadow-xl hover:bg-indigo-400 hover:text-white text-black"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteId(cell?.row?.values?.id)}
            className="poppins bg-red-300 mx-1 px-3 py-1 rounded-md shadow-lg hover:shadow-xl hover:bg-red-400 hover:text-white text-black"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];


  return (
    <>
      <AddNewUmModal
        openAddNewUmModal={openAddNewUmModal}
        roleList={roleList}
      />
      <EditUmModal
        openModelForEdit={openModelForEdit}
        editWorkflowId={editWorkflowId}
        roleList={roleList}
      />
      <DeleteUmModal
        openDeleteModal={openDeleteModal}
        deleteWorkflowId={deleteWorkflowId}
      />

      {isLoading && <BarLoader />}
      {(!isLoading && (wfUlbData?.length != null)) && (
        <div className="poppins p-4 px-6">
          <div className="uppercase font-semibold text-gray-700 text-2xl py-2 text-center tracking-[0.7rem]">
            Users   Management
          </div>
          <div className="w-full h-[0.15rem] bg-gray-400 mb-6"></div>
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={wfUlbData}
        >
          {/* <button
            onClick={() => setOpenAddNewUmModal(openAddNewUmModal + 1)}
            className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
          >
            <CgPlayListAdd /> &nbsp; Add Pseudo User
          </button> */}
        </ListTable>
        </div>
      )}
      {/* <LoadingData/> */}
      <div className="h-[20vh]"></div>
    </>
  );
}
export default UmList;
