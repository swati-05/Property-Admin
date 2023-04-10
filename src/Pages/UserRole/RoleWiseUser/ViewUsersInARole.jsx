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
import { TiArrowBack } from "react-icons/ti";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import WaterApiList from "./WaterApiList";
import ListTable from "@/Components/Common/ListTable/ListTable";

function ViewUsersInARole(props) {
  const header = ApiHeader()

  const {api_getRolesByid} = WaterApiList();

  const columns = [
    {
      Header: "Sl.",
      Cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
    },
    {
      Header: "User Name",
      accessor: "name",
    },
    {
      Header: "User Email",
      accessor: "email",
    },
    {
      Header: "User Mobile",
      accessor: "mobile",
    },
    // {
    //   Header: 'Action',
    //   accessor: 'id',
    //   Cell: ({ cell }) => (
    //     <button onClick={() => props.viewBtn(cell.row.values.id, cell.row.values.role_name)} className='bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm mx-1'>
    //       View Users</button>
    //   )
    // }
  ];

  const { isLoading, data, isError, error } = useQuery(
    "ViewUsersInARole-querty",
    () => {
      try {
        return axios.post(api_getRolesByid, { userId: props.btnId }, header);
      } catch (err) {
        console.log("Erro api not avalivale", err);
      }
    }
  );
  if (!isLoading) {
  }
  // if (isError) { console.log("Error useQuery ", isError) }

  return (
    <>
      <div className={`mx-1 border shadow-lg bg-green-50`}>
        <div className={`p-2 bg-green-400 shadow-lg`}>
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 flex">
              <p className="text-xl font-semibold">{props.roleName} </p>{" "}
              <p className="text-base mt-1 ml-2"> Role Given to Users</p>
            </div>
            <div className="col-span-1 justify-self-end">
              <button
                onClick={props.handleBackBtn}
                className="bg-blue-600 hover:bg-blue-500 font-semibold text-white px-5 pl-2 py-1 shadow-lg rounded"
              >
                <span className="inline-block">
                  <TiArrowBack />
                </span>{" "}
                Back
              </button>
            </div>
          </div>
        </div>
        <div className="pb-5">
          {!isLoading && (
            <ListTable
              searchText="Roles"
              columns={columns}
              data={data?.data?.data}
            />
          )}{" "}
        </div>
      </div>
    </>
  );
}

export default ViewUsersInARole;
