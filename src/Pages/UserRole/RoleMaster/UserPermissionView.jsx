//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 22 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  -
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { useQuery } from "react-query";
import ManageUserRoleByID from "../UserManagement/ManageUserRoleByID";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import WaterApiList from "@/Components/ApiList/WaterApiList";
import BackendUrl from "@/Components/ApiList/BackendUrl";

function UserPermissionView(props) {
  const [bgColor, setBgcColor] = useState("red");
  const [fetchedData, setFetchedData] = useState();
  const [editPermission, setEditPermission] = useState(false);


  const { api_getRolesByid } = WaterApiList()

  const header = ApiHeader()

  const selectedCheckBox = [];

  const handleSaveIcon = (e) => {
    console.log("Save Icon Clicked", e);
    setEditPermission(true);
  };
  const handleDeleteBtn = (e) => {
    console.log("Delete Clicked", e);
  };

  const handleAssignBtn = () => {
    console.log("Assign Btn Clieked");
  };

  const handleCheckBox = (e) => {
    // if (e.target.checked) {
    //     console.log('✅ Checkbox is checked');
    //   } else {
    //     console.log('⛔️ Checkbox is NOT checked');
    //   }
    console.log(e);
    // selectedCheckBox.push[e]
  };

  useEffect(() => {
    axios
      .post(api_getRolesByid, { userId: props.btnId }, header)
      .then(function (response) {
        console.log("Data fetched left......", response.data.data);
        // return
        setFetchedData(response.data.data);
      })
      .catch(function (response) {
        console.log("Failed to fetch", response);
      });
  }, [props.btnId]);

  // console.log("Button ID in Details Page : -- ", props.btnId)
  // console.log("data in view page", props.viewData)

  const onSuccess = () => { };

  const {
    isLoading,
    data: AllRoles,
    isError,
    error,
  } = useQuery(
    "get-all-roles-UserPermissionView",
    () => {
      return axios.get(
        BackendUrl + `/api/crud/roles/get-all-roles`,
        header
      );
    },
    {
      onSuccess,
    }
  );
  if (!isLoading) {
  }

  console.log("All Roles : ", AllRoles);
  // console.log("Status Roles : ",AllRoles?.data.status )
  // console.log("Given Role : ", fetchedData)
  // return

  return (
    <>
      <ManageUserRoleByID userName={fetchedData?.user_name} />
      <div className="border shadow-lg bg-green-50">
        <div className="p-2 bg-green-400 shadow-lg">
          <div className="grid grid-cols-2 ">
            <div className="col-span-1 text-xl font-semibold">
              Manage User Permission
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

        <div className="p-5 ">
          <div className="text-center font-medium text-2xl mb-4">
            User's Name - {fetchedData?.user_name}
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6 border-2 mx-5 shadow-lg">
              <h1 className="font-semibold text-center bg-blue-400 py-1">
                Given Roles
              </h1>
              {fetchedData?.role_name.map(
                (e, i) => (
                  (<div kay={e.id}></div>),
                  (
                    <div className="space-y-1 mx-2 text-gray-700 border bg-amber-100 pl-2 my-2 py-2">
                      <div className="grid grid-cols-12 px-2">
                        <div className="col-span-6">
                          <div>
                            <span className="font-semibold">
                              {fetchedData?.role_name[i]}{" "}
                            </span>{" "}
                          </div>
                        </div>
                        <div className="col-span-4">
                          <select
                            className="shadow-xl border"
                            name="permissin"
                            id=""
                          >
                            <option value="0">
                              {fetchedData?.can_modify[i] == "true"
                                ? "Read"
                                : "Write"}
                            </option>
                            <option value="0">
                              {fetchedData?.can_modify[i] == "false"
                                ? "Read"
                                : "Write"}
                            </option>

                            {/* {fetchedData?.can_modify[i]  && <option value="1">Write</option>} */}
                          </select>
                        </div>
                        <div className="col-span-1 cursor-pointer hover:bg-sky-200 rounded-full mt-1">
                          <p>
                            <BsFillCheckCircleFill
                              className="mt-0.5"
                              onClick={() => handleSaveIcon(e.id)}
                              fill="green"
                              size={16}
                            />
                          </p>
                        </div>
                        <div className="col-span-1 cursor-pointer hover:bg-red-200 rounded-full mt-1">
                          <p>
                            <TiDelete
                              onClick={() => handleDeleteBtn(e.id)}
                              fill="red"
                              size={20}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
            <div className="col-span-6 border-2 mx-5 shadow-lg">
              <h1 className="font-semibold text-center bg-blue-400 py-1">
                Avalible Roles
              </h1>
              <div className="space-y-1 m-5 text-gray-700">
                {AllRoles?.data &&
                  AllRoles?.data?.data?.map((e) => {
                    // fetchedData?.role_id.map((data) => {
                    //     data==e.id
                    // })

                    return (
                      (<div key={e.id}></div>),
                      (
                        <div className="flex border shadow-2xl px-4 py-2 my-2 bg-green-100">
                          <div className="grid grid-cols-12">
                            <div className="col-span-1">
                              <input
                                onChange={() => handleCheckBox(e.id)}
                                // value={}
                                className="mr-3"
                                type="checkbox"
                                name="avRoles"
                                id="avRoles"
                              />
                            </div>
                            <div className="col-span-8">
                              <p className="font-semibold">{e.role_name}</p>
                            </div>
                            <div className="col-span-3">
                              <p className="ml-0 ">
                                <select
                                  className="shadow-xl border"
                                  name="permissin"
                                  id=""
                                >
                                  <option value="0">Read</option>
                                  <option value="1">Write</option>
                                </select>
                              </p>
                            </div>
                            {/* <p><button className='bg-green-400 hover:bg-green-500 px-2 mx-3 font-medium shadow-lg'>Assign</button></p> */}
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
              <div className="my-5 flex justify-center">
                <button
                  onClick={handleAssignBtn}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-600 shadow-lg"
                >
                  Assign Roles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPermissionView;
