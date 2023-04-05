////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : Worflow Master
// Description : Default method is Post
////////////////////////////////////////////////////////////////////

import BackendUrl from "@/Components/ApiList/BackendUrl";

const ApiList = () => {
    
    let baseUrl = BackendUrl

    let apiList = {

        // Workflow Master
        // ====================================================
        // List or View
        workflowList : `${baseUrl}/api/workflow/master/list`,
        // Add
        workflowAdd : `${baseUrl}/api/workflow/master/save`,
        // Update
        workflowUpdate : `${baseUrl}/api/workflow/master/edit`,
        // Delete
        workflowDelete : `${baseUrl}/api/workflow/master/delete`,

        // Ulb Workflow
        // ==========================================================
        // Ulb Wf List
        ulbWfList : `${baseUrl}/api/workflow/wfworkflow/list`,
        workflowListById : `${baseUrl}/api/workflow/wfworkflow/byId`,
        ulbWfAdd : `${baseUrl}/api/workflow/wfworkflow/save`,
        ulbWfUpdate : `${baseUrl}/api/workflow/wfworkflow/edit`,
        ulbWfDelete : `${baseUrl}/api/workflow/wfworkflow/delete`,
        // Ulb List
        allUlb : `${baseUrl}/api/get-all-ulb`,
    

        // Workflow Role
        // ============================================
        wfRoleList : `${baseUrl}/api/workflow/role-map/list`,
        wfRoleUpdate : `${baseUrl}/api/workflow/role-map/edit`,
        wfRoleDelete : `${baseUrl}/api/workflow/role-map/delete`,
        wfRoleAdd : `${baseUrl}/api/workflow/role-map/save`,
        wfRoleListById : `${baseUrl}/api/workflow/role-map/byId`,
        // Role list
        allRole :  `${baseUrl}/api/crud/roles/get-all-roles`,
        // get wf by ulb
        wfListByUlb : `${baseUrl}/api/workflow/getWorkflowInUlb`,

        // Users Management
        // ===========================================
        UmList : `${baseUrl}/api/get-all-users`,
        UmListById : `${baseUrl}/api/get-user`,
        UmAdd : `${baseUrl}/`,
        UmDelete : `${baseUrl}/api/delete-user`,
        UmUpdate : `${baseUrl}/api/edit-user`,
        // user List
        allUser : `${baseUrl}/api/get-all-users`,
        // Add Pseudo User
        PUAdd : `${baseUrl}/`,

    }

    return apiList;

}

export default ApiList