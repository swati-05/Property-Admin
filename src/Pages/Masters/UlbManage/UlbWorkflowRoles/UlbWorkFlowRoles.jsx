//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 31 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UlbWorkFlowRoles
//    DESCRIPTION -UlbWorkFlowRoles
//////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { TbChecks } from "react-icons/tb";
import { Formik, Field, Form } from "formik";
import { actions } from "react-table/dist/react-table.development";
import ApiHeader from "@/Components/ApiList/ApiHeader";

function UlbWorkFlowRoles() {
  const [roleUlb, setRoleUlb] = useState(0);
  const [worlflowId, setWorlflowId] = useState(0);
  const [roles, setRoles] = useState();
  const [initiatorId, setInitiatorId] = useState();
  const [finisherId, setFinisherId] = useState();

  //selecteddata
  const [roleID, setRoleID] = useState();
  const [forwardTo, setsForwardTo] = useState();
  const [backwardTo, setsBackwardTo] = useState();
  const [fullaccess, setFullAccess] = useState();
  const [finalArray, setFinalArray] = useState([]);

  let fullSelectedArray = {
    ID: roleID,
    forwodID: forwardTo,
    backwodID: backwardTo,
    showFullList: false,
  };

  console.log("Test Before", fullSelectedArray);

  const Aactions = () => {
    setFinalArray([...finalArray, fullSelectedArray]);
    console.log("ok..", finalArray);
  };
  console.log("Test After", fullSelectedArray);
  console.log("Final Array", finalArray);

  const handleAssignbtn = () => {
    // 1combine all arrays in one

    let dataSet = {
      ulbID: roleUlb,
      workflowsID: worlflowId,
      initiator: initiatorId,
      finisher: finisherId,
      rolles: finalArray,
    };

    console.log("Final data to submit..", dataSet);
    // Save Data Code Start

    axios({
      method: "post",
      url: `http://192.168.0.166/api/ulb/workflow/member`,
      data: dataSet,
      headers: ApiHeader(),
    })
      .then(function (response) {
        if (response.data.status) {
          // notify(response.data.message, 'success')
          console.log("Data Update Sussussfull", response.data.message);
          // refetch()
        } else {
          // console.log("Data Not Update..", response.data.message)
          console.log("Data Not Update..", response);
        }
      })
      .catch(function (response) {
        console.log("Failed to update Data", response);
        // setMsg(response.data.message)
      });
  };

  //Get Bearer Token form LocalStorage
  //This Header for Authentication as Bearer Token
  const header =  ApiHeader()

  const handleFullAccessCheckBox = (value, status) => {
    console.log(`CheckBOx: ${value} is ${status}`);
  };

  //Fetch ULB List and ID
  const { isLoading, data, isError, error } = useQuery(
    "UlbWorkFlowRolesJSThis-Query",
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
  } = useQuery("UlbWorkFlowListDatasthisNItdfjgoisduw", () => {
    return axios.get(
      `http://192.168.0.166/api/admin/workflows/${roleUlb}`,
      header
    );
  });

  // This is used for refetch workflow list after any ulb selected
  useEffect(() => {
    refetchWorkFlowList();
  }, [roleUlb]);

  //Fetch Role List and ID
  useEffect(() => {
    // console.log("Yehh!!, its worked.")
    axios
      .get(
        `http://192.168.0.166/api/ulb/workflow/member?ulbID=${roleUlb}&workflowsID=${worlflowId}`,
        header
      )
      .then(function (response) {
        // console.log("AXIOS Response ---- ", response.data);
        setRoles(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [roleUlb, worlflowId]);

  // console.log("Roles Member ==", roles?.data.data)
  // console.log("Roles Member ==", roles?.data.data.rolls)

  return (
    <>
      <div className="border shadow-xl">
        <div className="border shadow-lg">
          <div className="p-2 shadow-md bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            <div className="grid grid-cols-2 ">
              <div className="col-span-1">
                {" "}
                <span className="text-xl font-semibold">
                  Manage ULB Workflow Roles
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-sky-100 py-4 justify-center">
          <div className="mx-2">
            <span className="font-medium">Select ULB : </span>
            <select
              type="text"
              className="pl-2 w-72 border border-blue-300 rounded-sm h-8 font-semibold"
              onChange={(e) => setRoleUlb(e.target.value)}
            >
              <option value="">Select Your ULB</option>
              {!isLoading
                ? data.data.map((data) => (
                    <option value={data.id}>{data.ulb_name}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="mx-2">
            <span className="font-medium">Workflow List : </span>
            <select
              type="text"
              className="pl-2 w-52 border border-blue-300 rounded-sm h-8 font-semibold"
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
        <div className="m-5">
          <div className="flex justify-center my-5">
            {roles?.data.status && (
              <div className="flex">
                <div>
                  <span className="font-semibold text-xl"> Initiator</span>
                  <select
                    onChange={(e) => setInitiatorId(e.target.value)}
                    className="border border-black h-8 w-48 mx-3 px-2 rounded-bl-lg font-semibold"
                  >
                    <option> -- Choose Initiator -- </option>
                    {roles?.data.data.rolls?.map(
                      (e, i) => (
                        (<td>{i}</td>),
                        (<option value={e.rolle_id}>{e.role_name}</option>)
                      )
                    )}
                  </select>
                </div>
                <div>
                  <span className="font-semibold text-xl"> Finisher</span>
                  <select
                    onChange={(e) => setFinisherId(e.target.value)}
                    className="border border-black h-8 w-48 mx-3 px-2 rounded-br-lg font-semibold"
                  >
                    <option value=""> -- Choose Finisher -- </option>
                    {
                      // roles?.data?.data.map((e) => (
                      roles?.data.data.rolls
                        ?.filter((item) => item.rolle_id != initiatorId)
                        .map(
                          (e) => (
                            (<td>{e.id}</td>),
                            (<option value={e.rolle_id}>{e.role_name}</option>)
                          )
                        )
                    }
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {initiatorId && (
            <table className="w-full">
              <tr className="border-y h-8 bg-sky-100 ">
                <th>Role List</th>
                <th>Forward To</th>
                <th>Backward To</th>
                <th>Access</th>
              </tr>
              {roles?.data.data.rolls?.map(
                (e, i) => (
                  (<td>{i}</td>),
                  (
                    <tr
                      className={`text-center h-8 bg-green-${
                        e.show_full_list && 100
                      }`}
                    >
                      <td className="font-medium">
                        {e.role_name}({e.rolle_id})
                      </td>
                      {/* <input onChange={(e) => setRoleID(e.target.value)} type="hidden" name="RoleID" value={e.rolle_id} /> */}
                      <td>
                        <select
                          onChange={(a) => {
                            setsForwardTo(a.target.value);
                          }}
                          name="forwodID"
                          className="border border-black w-48"
                        >
                          <option value=""> -- Select -- </option>
                          {roles?.data.data.rolls
                            ?.filter((item) => item.rolle_id != initiatorId)
                            .map((e) => (
                              <option value={e.rolle_id}>{e.role_name}</option>
                            ))}
                        </select>
                      </td>
                      <td>
                        <select
                          onChange={(a) => {
                            setsBackwardTo(a.target.value);
                            setRoleID(e.rolle_id);
                            Aactions();
                          }}
                          name="backwodID"
                          className="border border-black w-48"
                        >
                          <option value=""> -- Select -- </option>
                          {roles?.data.data.rolls
                            ?.filter((item) => item.rolle_id != finisherId)
                            .map((e) => (
                              <option value={e.rolle_id}>{e.role_name}</option>
                            ))}
                        </select>
                      </td>
                      <td>
                        <input
                          className="w-4 h-4"
                          type="checkbox"
                          name="fullaccess"
                          // checked={e.show_full_list}
                          onChange={(e) =>
                            handleFullAccessCheckBox(
                              e.target.value,
                              e.target.checked
                            )
                          }
                          value={e.rolle_id}
                        />
                        <span
                          className={`font-semibold text-${
                            e.show_full_list ? "green-600" : "black"
                          }`}
                        >
                          {" "}
                          Full Access
                        </span>
                      </td>
                    </tr>
                  )
                )
              )}
            </table>
          )}
          <div className="flex justify-center my-5">
            <button
              onClick={handleAssignbtn}
              className="px-5 py-1 mx-5 bg-blue-600 hover:bg-blue-700 hover:rounded-md font-semibold text-white rounded-sm shadow-sm"
              type="submit"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UlbWorkFlowRoles;

/*
Exported to -
1. UlbWorkflowRolesIndex.js
*/
