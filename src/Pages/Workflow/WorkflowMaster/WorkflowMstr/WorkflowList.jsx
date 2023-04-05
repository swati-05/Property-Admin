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
import AddNewWorkflowModal from "./WorkflowMasterComponents/AddNewWorkflowModal";
import DeleteWorkflowModal from "./WorkflowMasterComponents/DeleteWorkflowModal";
import EditWorkflowModal from "./WorkflowMasterComponents/EditWorkflowModal";
import { ColorRing } from "react-loader-spinner";
import apiList from '../Common/ApiList'
import '../fonts.css'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { useContext } from "react";
import { contextVar } from "../Common/Context/Context";
import BarLoader from "@/Components/Common/BarLoader";
import useSetTitle from "@/Components/GlobalData/useSetTitle";

function WorkflowList(props) {

  const { workflowList} = apiList()

  useSetTitle('Worflow Master')

  const {refresh, setrefresh} = useContext(contextVar)
  
  const [openAddNewWorkflowModal, setOpenAddNewWorkflowModal] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openModelForEdit, setOpenModelForEdit] = useState(0);

  const [deleteWorkflowId, setdeleteWorkflowId] = useState();
  const [editWorkflowId, setEditWorkflowId] = useState();
  const [wfMasterData, setwfMasterData] = useState()
  const [isLoading, setisLoading] = useState(false)

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
    axios.post(workflowList,{},ApiHeader())
    .then((res) => {
      console.log("getting wf master list => ", res)
      setwfMasterData(res?.data?.data)
      setisLoading(false)
    })
    .catch((err) => {
      console.log("getting wf master list error =>", err)
      setisLoading(false)
    })
  },[refresh])


  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
    },
    {
      Header: "Workflow Name",
      accessor: "workflow_name",
    },
    {
      Header: "Created at",
      accessor: "created_at",
      Cell: ({ value }) => {
        if(value != null){
          return format(new Date(value), "dd/MM/yyyy");
          }
  
          if(value == null){
            return <i className="font-semibold ">N/A</i>
          }
      },
    },
    // {
    //   Header: "Status",
    //   accessor: "is_suspended",
    //   Cell: (props) => {
    //     return (
    //       <p>
    //         {props.value == true && (
    //           <p className="bg-red-400 text-white font-semibold text-center px-1 py-0.5 rounded-md">
    //             Suspended
    //           </p>
    //         )}
    //         {props.value == false && (
    //           <p className="bg-green-400 text-white font-semibold text-center px-1 py-0.5 rounded-md">
    //             Active
    //           </p>
    //         )}
    //       </p>
    //     );
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
      <AddNewWorkflowModal
        openAddNewWorkflowModal={openAddNewWorkflowModal}
      />
      <EditWorkflowModal
        openModelForEdit={openModelForEdit}
        editWorkflowId={editWorkflowId}
      />
      <DeleteWorkflowModal
        openDeleteModal={openDeleteModal}
        deleteWorkflowId={deleteWorkflowId}
      />

      {isLoading && <BarLoader />}
      {(!isLoading && (wfMasterData?.length != null)) && (
        <div className="poppins p-4 px-6">
          <div className="uppercase font-semibold text-gray-700 text-2xl py-2 text-center tracking-[0.7rem]">
            Workflow   Master
          </div>
          <div className="w-full h-[0.15rem] bg-gray-400 mb-6"></div>
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={wfMasterData}
        >
          <button
            onClick={() => setOpenAddNewWorkflowModal(openAddNewWorkflowModal + 1)}
            className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
          >
            <CgPlayListAdd /> Add Workflow
          </button>
        </ListTable>
        </div>
      )}
      {/* <LoadingData/> */}
      <div className="h-[20vh]"></div>
    </>
  );
}
export default WorkflowList;