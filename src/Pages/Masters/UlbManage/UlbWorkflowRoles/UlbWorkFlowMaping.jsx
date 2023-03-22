//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 31 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UlbWorkFlowMaping
//    DESCRIPTION -UlbWorkFlowMaping
//////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { TbChecks } from "react-icons/tb";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function UlbWorkFlowMaping() {
  const [roleUlb, setRoleUlb] = useState(0);
  const [worlflowId, setWorlflowId] = useState();
  const [roles, setRoles] = useState();
  const [refetchData, setRefetchData] = useState(1);

  console.log("SELECT Role ULB", roleUlb);
  console.log("Selected workflow id", worlflowId);

  //Get Bearer Token form LocalStorage

  //This Header for Authentication as Bearer Token
  const header =ApiHeader()

  //Checkbox Event handle
  const handleOnChange = (workflowId, roleID, status) => {
    status == true ? (status = false) : (status = true);

    console.log("workflowId", workflowId, "roleID", roleID, "status", status);
    // const { value, role_id, checked, ulb_workflow_id } = e.target;
    // console.log(`CheckBOx ===================: ${value} ++ ${role_id} is ${checked} ULBWORKFOEid ${ulb_workflow_id}`);

    update(workflowId, roleID, status);
  };

  //Update Workflow Roles
  const update = (workflowId, roleID, status) => {
    axios({
      method: "post",
      url: `http://192.168.0.166/api/workflow/workflow-roles`,
      data: {
        ulbWorkflowID: workflowId,
        roleID: roleID,
        status: status,
      },
      // loading: setLoader(true),
      headers: ApiHeader(),
    })
      .then(function (response) {
        if (response.data.status) {
          // notify(response.data.message, 'success')
          console.log("Data Update Sussussfull", response.data.message);
          setRefetchData(refetchData + 1);
        } else {
          console.log("Data Not Update..", response);
          // refetch()
        }
      })
      .catch(function (response) {
        console.log("Failed to update Data", response);
        // setMsg(response.data.message)
      });
  };

  //Fetch ULB List and ID
  const { isLoading, data, isError, error } = useQuery(
    "UlbWorkFlowMaping-Query",
    () => {
      return axios.get("http://192.168.0.166/api/get-all-ulb");
    }
  );

  //Fetch Workflow List and ID
  const {
    isLoading: isLoadingWorkflowList,
    data: workflowListData,
    refetch: refetchWorkFlowList,
    isError: isErrorWorkflowList,
    error: errorWorkflowList,
  } = useQuery("UlbWorkFlowListDatas", () => {
    return axios.get(
      `http://192.168.0.166/api/admin/workflows/${roleUlb}`,
      header
    );
  });

  // This is used for refetch workflow list after any ulb selected
  useEffect(() => {
    refetchWorkFlowList();
  }, [roleUlb]);

  const body = {
    params: {
      ulbWorkflowID: "30",
      roleID: "2",
      status: "1",
    },
  };

  //Fetch Role List and ID
  useEffect(() => {
    // console.log("Yehh!!, its worked.")
    axios
      .get(
        `http://192.168.0.166/api/workflow/workflow-roles?ulbID=${roleUlb}&workflowID=${worlflowId}`,
        header
      )
      // axios.get(`http://192.168.0.166/api/workflow/workflow-roles`, body, header)
      .then(function (response) {
        console.log("AXIOS Response ---- ", response.data);
        setRoles(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refetchData, worlflowId]);

  return (
    <>
      <div className="border shadow-xl">
        <div className="border shadow-lg">
          <div className="p-2 shadow-md bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            <div className="grid grid-cols-2 ">
              <div className="col-span-1">
                {" "}
                <span className="text-xl font-semibold">
                  ULB Workflow Roles Mapping
                </span>
              </div>
              {/* <div className='col-span-1 justify-self-end'><button onClick={props.handleBackBtn} className='bg-blue-600 hover:bg-blue-500 font-semibold text-white px-5 pl-2 py-1 shadow-lg rounded'><span className='inline-block'><TiArrowBack /></span> Back</button></div> */}
            </div>
          </div>
        </div>
        <div className="flex bg-sky-100 py-2 justify-center">
          <div className="m-3">
            <span className="font-medium">Select ULB : </span>
            <select
              type="text"
              className="pl-2 w-72 border border-blue-300 rounded-sm h-8 font-semibold"
              onChange={(e) => setRoleUlb(parseInt(e.target.value))}
            >
              <option value="">Select Your ULB</option>
              {!isLoading
                ? data.data.map((data) => (
                    <option value={data.id}>{data.ulb_name}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="m-3">
            <span className="font-medium">Select Workflow : </span>
            <select
              type="text"
              className="pl-2 w-40 border border-blue-300 rounded-sm h-8 font-semibold"
              onChange={(e) => setWorlflowId(e.target.value)}
            >
              <option value="">Select Workflow</option>
              {!isLoadingWorkflowList
                ? workflowListData?.data.data.map((worflow) => (
                    <option value={worflow.workflow_id}>
                      {worflow.workflow_name}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        </div>
        <div className="py-3">
          <div className="grid grid-cols-4 mb-2">
            {roles &&
              // data?.data.data.map((e, i) => (
              roles?.data.data.map(
                (e, i) => (
                  (<div kay={i}></div>),
                  (
                    <div className="col-span-1 ">
                      <div
                        htmlFor="roles"
                        style={{
                          backgroundColor: `${
                            e.permission_status == true ? "#2dd240" : "#d9cac8"
                          }`,
                        }}
                        className={`flex border shadow-yellow-200 shadow-sm px-2 py-1 mt-2  mx-2 rounded-sm cursor-pointer hover:animate-pulse border-1 border-${
                          e.permission_status == true ? "black" : "gray-400"
                        }`}
                      >
                        <div className="grid grid-cols-12">
                          <div className="col-span-1">
                            <input
                              className="mr-1"
                              type="checkbox"
                              name="roles"
                              // id="roles"
                              checked={e.permission_status}
                              onChange={() =>
                                handleOnChange(
                                  e.ulb_workflow_id,
                                  e.role_id,
                                  e.permission_status
                                )
                              }
                              // value={e.role_id}
                              value={e.role_id}
                            />
                          </div>
                          <div className="col-span-10 ml-1 text-center">
                            <p className="font-semibold">{e.role_name}</p>
                          </div>
                          <div className="col-span-1">
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
        </div>
      </div>
    </>
  );
}

export default UlbWorkFlowMaping;

/*
Exported to -
1. UlbWorkflowRolesIndex.js
*/
