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
import AddNewWfUlbModal from "./UlbMasterComponents/AddNewWfUlbModal";
import DeleteWfUlbModal from "./UlbMasterComponents/DeleteWfUlbModal";
import EditWfUlbModal from "./UlbMasterComponents/EditWfUlbModal";
import { ColorRing } from "react-loader-spinner";
import '../fonts.css'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiList from '../Common/ApiList'
import { useContext } from "react";
import { contextVar } from "../Common/Context/Context";
import BarLoader from "@/Components/Common/BarLoader";

function WfUlbList(props) {
  const [openAddNewWfUlbModal, setOpenAddNewWfUlbModal] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openModelForEdit, setOpenModelForEdit] = useState(0);

  const [deleteWorkflowId, setdeleteWorkflowId] = useState();
  const [editWorkflowId, setEditWorkflowId] = useState();
  const [wfList, setwfList] = useState()
  const [ulbList, setulbList] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [wfUlbData, setwfUlbData] = useState()
  const [roleList, setroleList] = useState()

  const {refresh, setrefresh} = useContext(contextVar)

  const {allUlb, workflowList, allRole, ulbWfList } = apiList()

  useEffect(() => {
    axios.post(workflowList, {}, ApiHeader())
    .then((res) => {
      console.log("wf list => ", res)
      setwfList(res?.data?.data)
    })
    .catch((err) => {
      console.log("wf list err => ", err)
    })

    axios.get(allUlb, ApiHeader())
    .then((res) => {
      console.log("ulb list => ", res)
      setulbList(res?.data?.data)
    })
    .catch((err) => {
      console.log("ulb list err => ", err)
    })

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
    axios.post(ulbWfList,{},ApiHeader())
    .then((res) => {
      console.log("getting wf role list => ", res)
      setwfUlbData(res?.data?.data)
      setisLoading(false)
    })
    .catch((err) => {
      console.log("getting wf role list error =>", err)
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
      Header: "ULB Name",
      accessor: "ulb_name",
    },
    {
      Header : 'Alternate Name',
      accessor: 'alt_name',
      Cell: (props) => {
        if(props?.value == null){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != null)
       { return props?.value }
      }
    },
    {
      Header: "Initiator Role Name",
      accessor: "initiator_role_name",
      Cell: (props) => {
        if(props?.value == null){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != null)
       {
        return props?.value
      }
      },
    },
    {
      Header: "Finisher Role Name",
      accessor: "finisher_role_name",
      Cell: (props) => {
        if(props?.value == null){
          return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
        }

       if(props?.value != null)
       {
        return props?.value
      }
      },
    },
    {
      Header: "Is Document Required",
      accessor: "is_doc_required",
      Cell: (props) => {
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
        );
      },
    },
    {
      Header: "Created at",
      accessor: "created_at",
      Cell: ({ value }) => {
        if(value != null){
          return format(new Date(value), "dd/MM/yyyy");
          }
  
          if(value == null){
            return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
          }
      },
    },
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
      <AddNewWfUlbModal
        openAddNewWfUlbModal={openAddNewWfUlbModal}
        wfList={wfList}
        ulbList={ulbList}
        roleList={roleList}
      />
      <EditWfUlbModal
        openModelForEdit={openModelForEdit}
        editWorkflowId={editWorkflowId}
        wfList={wfList}
        ulbList={ulbList}
        roleList={roleList}
      />
      <DeleteWfUlbModal
        openDeleteModal={openDeleteModal}
        deleteWorkflowId={deleteWorkflowId}
      />

      {isLoading && <BarLoader />}
      {(!isLoading && (wfUlbData?.length != null)) && (
        <div className="poppins p-4 px-6">
          <div className="uppercase font-semibold text-gray-700 text-2xl py-2 text-center tracking-[0.7rem]">
            ULB   Workflow
          </div>
          <div className="w-full h-[0.15rem] bg-gray-400 mb-6"></div>
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={wfUlbData}
        >
          <button
            onClick={() => setOpenAddNewWfUlbModal(openAddNewWfUlbModal + 1)}
            className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
          >
            <CgPlayListAdd /> &nbsp; Add ULB Workflow
          </button>
        </ListTable>
        </div>
      )}
      {/* <LoadingData/> */}
      <div className="h-[20vh]"></div>
    </>
  );
}
export default WfUlbList;
