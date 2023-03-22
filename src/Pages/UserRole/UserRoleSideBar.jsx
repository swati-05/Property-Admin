//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 19 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UserRoleSideBar
//    DESCRIPTION -UserRoleSideBar
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import UserRoleList from './RoleMaster/UserRoleTab'
import UserRoleTab from './RoleMaster/UserRoleTab'
import UserPermissionIndex from './UserManagement/UserPermissionIndex'
import RoleWiseUserIndex from './RoleWiseUser/RoleWiseUserIndex'
import RoleBasedMenuIndex from './RoleBasedMenu/RoleBasedMenuIndex'
import MenuMasterIndex from './MenuMaster/MenuMasterIndex'
import MenuMasterNewIndex from './MenuMasterNew/MenuMasterNewIndex'



function UserRoleSideBar() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Role Master", tabIndex: 0 },
        { title: "User Management", tabIndex: 1 },
        { title: "Role Based Menu", tabIndex: 2 },
        { title: "Menu Master", tabIndex: 3 },
        { title: "Menu Master New", tabIndex: 4 },
        // { title: "Role wise User", tabIndex: 4 },

    ]
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 md:col-span-12 '>
                    <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UserRoleTab /> </div>}
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UserPermissionIndex /> </div>}
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <RoleBasedMenuIndex /> </div>}
                {tabIndex == 3 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <MenuMasterIndex /> </div>}
                {tabIndex == 4 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <MenuMasterNewIndex /> </div>}
                {/* {tabIndex == 4 && <div className='col-span-12 sm:col-span-12 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <RoleWiseUserIndex /> </div>} */}

            </div>
        </>
    )
}


export default UserRoleSideBar

/*
Exported to -
UserRole.js
*/