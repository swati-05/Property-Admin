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
import AddMenuMasterModel from "./AddMenuMasterModel";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import DeleteMenuMasterModel from "./DeleteMenuMasterModel";
import EditMenuMasterModal from "./EditMenuMasterModal";
import { format } from 'date-fns'
import BarLoader from "@/Components/Common/BarLoader";
import WaterApiList from "./WaterApiList";
// import RoleBasedMenuPopUp from './RoleBasedMenuPopUp';

function MenuMasterIndex(props) {
  const [openAddPopupScreen, setOpenAddPopupScreen] = useState(0);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(0)
  const [openEditPopUp, setOpenEditPopUp] = useState(0)
  const [dataToBeDeleted, setDataToBeDeleted] = useState()
  const [dataTobeEdited, setDataTobeEdited] = useState()

  const { api_getAllMenu } = WaterApiList()

  const header = ApiHeader()


  const openDeletePoup = (data) => {
    setOpenDeletePopUp(prev => prev + 1)
    setDataToBeDeleted(data)
  };

  const openEditPoup = (data) => {
    setOpenEditPopUp(prev => prev + 1)
    setDataTobeEdited(data)
  };

  const openAddMenuPopup = () => {
    setOpenAddPopupScreen(openAddPopupScreen + 1);
  };

  const columns = [
    {
      Header: "Sl.",
      Cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
    },
    {
      Header: "Parent Name",
      accessor: "parentName",
    },
    {
      Header: "Menu List",
      accessor: "menu_string",
    },
    {
      Header: "Route List",
      accessor: "route",
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
        <>
          <button onClick={() => openEditPoup(cell.row.values)} className="bg-sky-600 hover:bg-sky-400 hover:text-black py-1.5 px-3 text-white rounded-sm mx-1">Edit</button>
          <button onClick={() => openDeletePoup(cell.row.values)} className="bg-red-600 hover:bg-red-400 hover:text-black py-1.5 px-3 text-white rounded-sm mx-1">Delete</button>
        </>
      ),
    },
  ];

  const refetchMasterMenuList = () => {
    refetch();
  };

  const { isLoading, data, isError, error, refetch } = useQuery("api/crud/menu/get-all-menues--", () => {
    try {
      return axios.get(api_getAllMenu, header);
    } catch (err) {
      console.log("Error api not avalivale", err);
    }
  });


  if (!isLoading) { }
  if (isError) { console.log("Error useQuery ", isError); }


  return (
    <>
      <AddMenuMasterModel openAddPopupScreen={openAddPopupScreen} refetchMasterMenuList={refetchMasterMenuList} />
      <EditMenuMasterModal openEditPopUp={openEditPopUp} refetchMasterMenuList={refetchMasterMenuList} dataTobeEdited={dataTobeEdited} />
      <DeleteMenuMasterModel openDeletePopUp={openDeletePopUp} refetchMasterMenuList={refetchMasterMenuList} dataToBeDeleted={dataToBeDeleted} />
      <div className="border mt-0 mx-0 px-1 pt-1 pb-10 bg-white mb-20">
        <div className={`p-2 bg-green-400 shadow-lg`}>
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 text-xl font-semibold">Menu Master</div>
            <div className="col-span-1 flex flex-row-reverse">
              <button
                onClick={openAddMenuPopup}
                className="border border-blue-500 bg-blue-500 rounded-md p-2 text-white shadow-md text-base font-medium"
              >
                Create New Menu
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            {!isLoading ? (<UserPermissionDataTable searchText="Roles" columns={columns} data={data?.data?.data} />) : <BarLoader />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuMasterIndex;

/*
Exported To -
1. 
*/
