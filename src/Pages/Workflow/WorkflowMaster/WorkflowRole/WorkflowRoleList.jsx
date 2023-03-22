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
import AddNewWorkflowRoleModal from "./WorkflowRoleComponents/AddNewWorkflowRoleModal";
import DeleteWorkflowRoleModal from "./WorkflowRoleComponents/DeleteWorkflowRoleModal";
import EditWorkflowRoleModal from "./WorkflowRoleComponents/EditWorkflowRoleModal";
import { ColorRing } from "react-loader-spinner";
import "../fonts.css";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import apiList from "../Common/ApiList";
import { useContext } from "react";
import { contextVar } from "../Common/Context/Context";

function WorkflowRoleList(props) {
  const [openAddNewWorkflowRoleModal, setOpenAddNewWorkflowRoleModal] =
    useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openModelForEdit, setOpenModelForEdit] = useState(0);

  const [deleteWorkflowId, setdeleteWorkflowId] = useState();
  const [editWorkflowId, setEditWorkflowId] = useState();
  const [roleList, setroleList] = useState();
  const [ulbList, setulbList] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [wfRoleData, setwfRoleData] = useState();

  const { wfRoleList, allRole, allUlb } = apiList();

  const { refresh, setrefresh } = useContext(contextVar);

  useEffect(() => {
    axios
      .get(allRole, ApiHeader())
      .then((res) => {
        console.log("role list => ", res);
        setroleList(res?.data?.data);
      })
      .catch((err) => {
        console.log("ulb list err => ", err);
      });

    axios
      .get(allUlb, ApiHeader())
      .then((res) => {
        console.log("ulb list => ", res);
        setulbList(res?.data?.data);
      })
      .catch((err) => {
        console.log("ulb list err => ", err);
      });
  }, []);

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
    console.log("refresh 2");
    setisLoading(true);
    axios
      .post(wfRoleList, {}, ApiHeader())
      .then((res) => {
        console.log("getting wf role list => ", res);
        setwfRoleData(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log("getting wf role list error =>", err);
        setisLoading(false);
      });
  }, [refresh]);

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
    },
    {
      Header: "Serial No.",
      accessor: "serial_no",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      },
    },
    {
      Header: "ULB Name",
      accessor: "ulb_name",
    },
    {
      Header: "Workflow Name",
      accessor: "workflow_name",
    },
    {
      Header: "Role Name",
      accessor: "role_name",
    },
    {
      Header: "Forward Role",
      accessor: "forward_role_name",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      },
    },
    {
      Header: "Backward Role",
      accessor: "backward_role_name",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      },
    },
    {
      Header: "Is Initiator",
      accessor: "is_initiator",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Is Finisher",
      accessor: "is_finisher",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Is BTC",
      accessor: "is_btc",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Can View Document",
      accessor: "can_view_document",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Can Upload Document",
      accessor: "can_upload_document",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Can Verify Document",
      accessor: "can_verify_document",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Allow Free Communication",
      accessor: "allow_free_communication",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Allow Full List",
      accessor: "allow_full_list",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Allow Escalate",
      accessor: "can_escalate",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Pseudo User Permission",
      accessor: "is_pseudo",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Can Forward",
      accessor: "can_forward",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Can Backward",
      accessor: "can_backward",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    {
      Header: "Show Field Verification Permission",
      accessor: "show_field_verification",
      Cell: (props) => {
        if (props?.value == null) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
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
        }
      },
    },
    // {
    //   Header: "Created at",
    //   accessor: "created_at",
    //   Cell: ({ value }) => {
    //     if(value != null){
    //     return format(new Date(value), "dd/MM/yyyy");
    //     }

    //     if(value == null){
    //       return <div className="w-full flex flex-row justify-center items-center"><i className="font-semibold ">N/A</i></div>
    //     }
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

  // const refresh = () => {
  //   console.log('refresh 1')
  //   setrefetch(refetch+1)
  // }

  return (
    <>
      <AddNewWorkflowRoleModal
        openAddNewWorkflowRoleModal={openAddNewWorkflowRoleModal}
        ulbList={ulbList}
        roleList={roleList}
      />
      <EditWorkflowRoleModal
        openModelForEdit={openModelForEdit}
        editWorkflowId={editWorkflowId}
        ulbList={ulbList}
        roleList={roleList}
      />
      <DeleteWorkflowRoleModal
        openDeleteModal={openDeleteModal}
        deleteWorkflowId={deleteWorkflowId}
      />

      {isLoading && (
        <div className="inline">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {!isLoading && wfRoleData?.length != null && (
        <div className="poppins p-4 px-6">
          <div className="uppercase font-semibold text-gray-700 text-2xl py-2 text-center tracking-[0.7rem]">
            Workflow Role Map
          </div>
          <div className="w-full h-[0.15rem] bg-gray-400 mb-6"></div>
          <ListTable
            assessmentType={false}
            columns={COLUMNS}
            dataList={wfRoleData}
          >
            <button
              onClick={() =>
                setOpenAddNewWorkflowRoleModal(openAddNewWorkflowRoleModal + 1)
              }
              className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
            >
              <CgPlayListAdd /> &nbsp; Add Workflow Role Map
            </button>
          </ListTable>
        </div>
      )}
      {/* <LoadingData/> */}
      <div className="h-20"></div>
    </>
  );
}
export default WorkflowRoleList;
