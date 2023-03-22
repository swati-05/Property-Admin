////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : WorflowRoutes
// Description : Workflow Master Routes
////////////////////////////////////////////////////////////////////

import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./fonts.css";
import WorkflowSidebar from "./WorkflowSidebar";
import { contextVar } from "./Common/Context/Context";
import { ToastContainer } from "react-toastify";

const WorkflowRoutes = () => {

  const [refresh, setrefresh] = useState(0)

  const contextData = {
    refresh,
    setrefresh
  }

  return (
    <>

    <ToastContainer position="top-right" autoClose={2000} />

    <contextVar.Provider value={contextData}>
      <Routes>
        <Route path="/workflow-main" element={<WorkflowSidebar />} />
      </Routes>
      </contextVar.Provider>
    </>
  );
};

export default WorkflowRoutes;
