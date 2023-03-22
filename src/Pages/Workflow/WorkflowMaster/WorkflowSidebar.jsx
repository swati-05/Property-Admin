////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Date : 29th Dec., 2022
// Component : Workflow Master Sidebar
////////////////////////////////////////////////////////////////////

import { useState } from 'react'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import UmList from './UsersManagement/UmList'
import WorkflowRoleList from './WorkflowRole/WorkflowRoleList'
import WorkflowList from './WorkflowMstr/WorkflowList'
import WfUlbList from './UlbMaster/WfUlbList'
import './fonts.css'


function WorkflowSidebar() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Workflow Master", tabIndex: 0 },
        { title: "ULB Workflow", tabIndex: 1 },
        { title: "Workflow Role Map", tabIndex: 2 },
        { title : "Users Management", tabIndex: 3 }
    ]
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 md:col-span-12 bg-white mb-1 py-2'>
                    <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <WorkflowList /> </div>}
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <WfUlbList /> </div>}
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <WorkflowRoleList /> </div>}
                {tabIndex == 3 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UmList /> </div>}
            </div>
        </>
    )
}


export default WorkflowSidebar

/*
Exported to -
UserRole.js
*/