//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 31 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UlbWorkflowRolesIndex
//    DESCRIPTION -UlbWorkflowRolesIndex
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
// import UserRoleTab from './RoleMaster/UserRoleTab'
import UlbWorkFlowRoles from './UlbWorkFlowRoles'
import UlbWorkFlowMaping from './UlbWorkFlowMaping'



function UlbWorkflowRolesIndex() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "WorkFlow Maping", tabIndex: 0 },
        { title: "WorkFlow Roles", tabIndex: 1 },
        { title: "_________", tabIndex: 2 }
    
    ]
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '>
                    <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UlbWorkFlowMaping /> </div>}     
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UlbWorkFlowRoles  /> </div>}     
                {/* {tabIndex == 2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <RoleWiseUserIndex /> </div>}      */}
                
            </div>
        </>
    )
}


export default UlbWorkflowRolesIndex

/*
Exported to -
1. App.js
*/