//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 18 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  -
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
// import UserPermissionDataTable from './Common/UserPermissionDataTable';
import UserPermissionDataTable from "../Common/UserPermissionDataTable";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import ListTable from "@/Components/Common/ListTable/ListTable";
import BackendUrl from "@/Components/ApiList/BackendUrl";

function RoleWiseUser(props) {
  const header = ApiHeader()

  const columns = [
    {
      Header: "Sl.",
      Cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
    },
    {
      Header: "Role Name",
      accessor: "role_name",
    },
    {
      Header: "Role Desc",
      accessor: "role_description",
      // Cell: (props) => {
      //     return (
      //         <p >
      //             {props.value && '₹' + props.value}
      //         </p>
      //     );
      // }
    },
    {
      Header: "Created At",
      accessor: "created_at",
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <button
          onClick={() =>
            props.viewBtn(cell.row.values.id, cell.row.values.role_name)
          }
          className="bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm mx-1"
        >
          View Users
        </button>
      ),
    },
  ];

  const { isLoading, data, isError, error } = useQuery(
    "deleteeedfgfdgdfgget-all-paymentsery",
    () => {
      try {
        return axios.get(
          BackendUrl + `/api/crud/roles/get-all-roles`,
          header
        );
      } catch (err) {
        console.log("Erro api not avalivale", err);
      }
    }
  );
  if (!isLoading) {
  }
  // if (isError) { console.log("Error useQuery ", isError) }

  // console.log("Data from api", data?.data.data)

  return (
    <>
      <div className="border mt-0 mx-0 px-1 pt-1 pb-10 bg-white mb-20">
        <div className={`p-2 bg-green-400 shadow-lg`}>
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 text-xl font-semibold">
              Role Wise User
            </div>
          </div>
        </div>
        <div>
          <div>
            {!isLoading || data ? (
              <ListTable
                searchText="Roles"
                columns={columns}
                data={data?.data?.data}
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

export default RoleWiseUser;

/*
Exported To -
1. UserPermissionIndex
*/
