//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 11 Nov 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  -
//    DESCRIPTION -
//    During - First Asprint
//    Backend - Anshu
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
// import UserPermissionDataTable from './Common/UserPermissionDataTable';
import UserPermissionDataTable from "../Common/UserPermissionDataTable";
import RoleBasedMenuPopUp from "./RoleBasedMenuPopUp";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { format } from 'date-fns'
import BackendUrl from "@/Components/ApiList/BackendUrl";

function RoleBasedMenuIndex(props) {
  const [openPopUpState, setOpenPopUpState] = useState(null);
  const [sendRoleIdToPopUP, setSendRoleIdToPopUP] = useState();
  const [sendRoleNameToPopUp, setSendRoleNameToPopUp] = useState();

  const header = ApiHeader()

  const openRolePoup = (roleId, roleName) => {
    console.log("Role Id and Name", roleId, roleName);
    setSendRoleIdToPopUP(roleId);
    setSendRoleNameToPopUp(roleName);
    setOpenPopUpState(openPopUpState + 1);
  };

  const columns = [
    {
      Header: "Sl.",
      Cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
    },
    {
      Header: "Role List",
      accessor: "role_name",
    },
    {
      Header: "Role Desc",
      accessor: "role_description",
    },
    {
      Header: "Created At",
      accessor: "created_at",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={() =>
            openRolePoup(cell.row.values.id, cell.row.values.role_name)
          }
          className="bg-sky-600 hover:bg-sky-400 hover:text-black py-1.5 px-3 text-white rounded-sm mx-1"
        >
          Assign Menu To Roles{" "}
        </button>
      ),
    },
  ];

  const { isLoading, data, isError, error } = useQuery(
    "master-GetROles-UlbrOLESD--",
    () => {
      try {
        return axios.get(
          BackendUrl + `/api/crud/roles/get-all-roles`,
          header
        );
      } catch (err) {
        console.log("Error api not avalivale", err);
      }
    }
  );
  if (!isLoading) {
  }
  // if (isError) { console.log("Error useQuery ", isError) }

  // console.log("Data from api", data?.data.data)

  return (
    <>
      <RoleBasedMenuPopUp
        roleId={sendRoleIdToPopUP}
        roleName={sendRoleNameToPopUp}
        openPopUpState={openPopUpState}
      />
      <div className="border mt-0 mx-0 px-1 pt-1 pb-10 bg-white mb-20">
        <div className={`p-2 bg-green-400 shadow-lg`}>
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 text-xl font-semibold">
              Role Based Menu Permission
            </div>
          </div>
        </div>
        <div>
          <div>
            {!isLoading || data ? (
              <UserPermissionDataTable
                searchText="Roles"
                columns={columns}
                data={data?.data.data}
              />
            ) : (
              "No Data Found"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RoleBasedMenuIndex;

/*
Exported To -
1. 
*/
