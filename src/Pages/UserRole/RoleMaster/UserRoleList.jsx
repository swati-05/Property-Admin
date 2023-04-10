//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu SIngh
//    Version - 1.0
//    Date - 19 july 2022
//    Updated On - 13/Aug/2022 - API Integrated
//    Revision - 1
//    Project - JUIDCO
//    Component  - UserRoleList (closed)
//    DESCRIPTION - UserRoleList Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import ListTable from "@/Components/Common/ListTable/ListTable";
import LoadingData from "@/Components/Common/Loading/LoadingData";
import { CgPlayListAdd } from "react-icons/cg";
import AddNewRoleModal from "./RoleMasterComponents/AddNewRoleModal";
import DeleteRoleModal from "./RoleMasterComponents/DeleteRoleModal";
import EditRoleModal from "./RoleMasterComponents/EditRoleModal";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BackendUrl from "@/Components/ApiList/BackendUrl";

function UserRoleList(props) {
  const [openAddNewRoleModal, setOpenAddNewRoleModal] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(0);
  const [openModelForEdit, setOpenModelForEdit] = useState(0);

  const [deleteRoleId, setdeleteRoleId] = useState();
  const [editRoleId, setEditRoleId] = useState();

  const handleDeleteId = (id) => {
    setOpenDeleteModal((prev) => prev + 1);
    setdeleteRoleId(id);
  };

  const handleEditBtn = (data) => {
    setOpenModelForEdit((prev) => prev + 1);
    setEditRoleId(data);
    console.log("id to be edit is", data);
  };

  console.log("editRoleId", editRoleId);

  useEffect(() => {
    refetch();
  }, [props.refetchList]);

  const header =ApiHeader()
  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Role Name",
      accessor: "role_name",
    },
    {
      Header: "Created at",
      accessor: "created_at",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Status",
      accessor: "is_suspended",
      Cell: (props) => {
        return (
          <p>
            {props.value == true && (
              <p className="bg-red-400 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                Suspended
              </p>
            )}
            {props.value == false && (
              <p className="bg-green-400 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                Active
              </p>
            )}
          </p>
        );
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <div>
          <button
            onClick={() => handleEditBtn(cell.row.values)}
            className="bg-sky-200 mx-1 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteId(cell.row.values.id)}
            className="bg-red-300 mx-1 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const { isLoading, data, refetch, isError, error } = useQuery(
    "get-all-roleserew-query",
    () => {
      return axios.get(
        BackendUrl + `/api/crud/roles/get-all-roles`,
        header
      );
    }
  );
  if (!isLoading) {
  }

  // console.log("data is", data)

  return (
    <>
      <AddNewRoleModal
        openAddNewRoleModal={openAddNewRoleModal}
        refetchListOfRoles={refetch}
      />
      <EditRoleModal
        openModelForEdit={openModelForEdit}
        editRoleId={editRoleId}
        refetchListOfRoles={refetch}
      />
      <DeleteRoleModal
        openDeleteModal={openDeleteModal}
        deleteRoleId={deleteRoleId}
        refetchListOfRoles={refetch}
      />

      {isLoading && <h1>Looading ...</h1>}
      {!isLoading && (
        <ListTable
          assessmentType={false}
          columns={COLUMNS}
          dataList={data?.data.data}
        >
          <button
            onClick={() => setOpenAddNewRoleModal(openAddNewRoleModal + 1)}
            className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
          >
            <CgPlayListAdd /> Add Role
          </button>
        </ListTable>
      )}
      {/* <LoadingData/> */}
    </>
  );
}
export default UserRoleList;

/**
 * Exported to :
 * 1. UserRoleTab.js
 *
 */
