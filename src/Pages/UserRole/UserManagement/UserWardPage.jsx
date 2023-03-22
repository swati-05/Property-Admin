//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 26 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UserWardPage.js
//    DESCRIPTION -UserWardPage.js
//////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useContext } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { TbChecks } from "react-icons/tb";
import { useQuery } from "react-query";
import axios from "axios";
import { contextVar } from "@/Components/Context/Context";
import Loder from "../Common/Loder";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function UserWardPage(props) {
  const { notify } = useContext(contextVar);
  const [loader, setLoader] = useState(false);

  const handleOnChange = (e) => {
    const { value, checked } = e.target;
    console.log(`CheckBOx: ${value} is ${checked}`);

    update(value, checked);
  };

  const header = ApiHeader()

  //Update Permission and Modify
  const update = (ward, status) => {
    setLoader(true);
    axios({
      method: "post",
      url: `http://192.168.0.16:8000/api/ward/masters/ward-user`,
      data: {
        userID: props.btnId,
        ulbWardID: ward,
        status: status,
      },
      // loading: setLoader(true),
      headers:ApiHeader(),
    })
      .then(function (response) {
        if (response.data.status) {
          notify(response.data.message, "success");
          console.log("Data Update Sussussfull", response.data.message);
          refetch();
          setLoader(false);
        } else {
          // console.log("Data Not Update..", response.data.message)
          console.log("Data Not Update..", response);
          refetch();
        }
      })
      .catch(function (response) {
        console.log("Failed to update Data", response);
        // setMsg(response.data.message)
      });
  };

  //Get List of Ward by user id
  const { isLoading, data, refetch, isError, error } = useQuery(
    "UserWardPage-fetchAPi",
    () => {
      return axios.get(
        `http://192.168.0.16:8000/api/ward/masters/ward-user/${props.btnId}`,
        header
      );
    }
  );
  if (!isLoading) {
  }

  // console.log("Length", data?.data.data)
  // return
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);
  return (
    <>
      {/* User ID - {props.btnId} */}

      {/* {loader && <Loder /> }= */}
      <div className="border-1 shadow-2xl ">
        <div className="mb-12 border bg-gray-100">
          <div className="grid grid-cols-12">
            <div className="col-start-2 h-10 w-40 py-2 px-4 my-3 bg-blue-300 flex justify-self-start border shadow-md">
              <input type="checkbox" className="h-5 w-5" name="" id="" />{" "}
              <p className="ml-2 font-semibold"> Select All</p>
            </div>
            <div className="col-start-10">
              {/* <button className='h-10 w-40 py-2 px-4 my-3 bg-blue-300 text-center font-semibold border shadow-md'>Save</button> */}
              <button className="h-10 w-40 py-2 px-4 my-3 bg-green-400 hover:bg-green-500 hover:rounded-md text-center font-semibold border-black shadow-md">
                Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 mb-2">
            {data &&
              data?.data.data.map(
                (e, i) => (
                  (<div kay={i}></div>),
                  (
                    <div className="col-span-1 ">
                      <div
                        className={`flex border shadow-2xl px-2 py-1 mt-2 bg-${
                          e.status == true ? "yellow-200" : "white"
                        } mx-2 cursor-pointer hover:animate-pulse border-1 border-${
                          e.status == true ? "black" : "gray-500"
                        }`}
                      >
                        {/* <div onClick={() => update(e.ulb_ward_id, e.status == true ? false : true)} className={`flex border shadow-2xl px-2 py-1 mt-2 bg-yellow-${e.status == true ? 200 : 100} mx-2 cursor-pointer hover:animate-pulse border-1 border-${e.status == true ? 'black' : 'gray-400'}`}> */}
                        <div className="grid grid-cols-12">
                          <div className="col-span-2">
                            <input
                              className="mr-3"
                              type="checkbox"
                              name="ward"
                              checked={e.status}
                              onChange={handleOnChange}
                              value={e.ulb_ward_id}
                            />
                          </div>
                          <div className="col-span-8 ml-2">
                            <p className="font-semibold">Ward {e.ward_name}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-semibold mt-1">
                              {e.status == true && <TbChecks color="blue" />}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
          </div>
          <div>
            <div className="flex justify-center">
              <button className="h-10 w-40 py-2 px-4 my-3 bg-green-400 hover:bg-green-500 hover:rounded-md text-center font-semibold border-black shadow-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserWardPage;

/*
Exported To -
1. RoleWardProfileTab.js
*/
