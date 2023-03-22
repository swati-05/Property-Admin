//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 09 July 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Related Menus
//    DESCRIPTION - Related Menus for userPermission | Includes - Horizontal Tabs
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import UserRoles from './MyUserRoles';
import UserType from './MyUserTypes'
import EmpType from './EmpType';
import RoleUser from './RoleUser/RoleUser';
import ApiList from './ApiDesignInterface/ApiList';
import AddApi from './ApiDesignInterface/AddApi';
import UpdateApi from './ApiDesignInterface/UpdateApi';
import axios from 'axios';
function MyRelatedMenus() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const [idApi, setidApi] = useState(0)
    const [updateData, setupdateData] = useState(
        {
            category: "Not Authenticated",
            created_at: "2022-08-02 05:37:55",
            created_by: "Anshu Kumar",
            created_on: "2022-06-29 00:00:00",
            description: "abc",
            discontinued: false,
            end_point: "test2",
            id: 3,
            post_condition: "None",
            pre_condition: "Authentication is required",
            remarks: "",
            request_payload: "Token Only",
            response_payload: "username,password,userid",
            revision_no: 1,
            tags: "tag5,tag6",
            updated_at: "2022-08-02 05:37:55",
            usage: "For Saving API Keys",
            version: "Version 1.0",
        });

    const tabs = [
        { title: "Roles", tabIndex: 0 },
        { title: "Types", tabIndex: 1 },
        { title: "Users", tabIndex: 2 },
        { title: "RoleUser", tabIndex: 3 },
        { title: "ApiList", tabIndex: 4 },
    ]
    const tabSwitch = (index) => {
        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
        console.log('index called ', index)
    }

    const handleIdApi = (apiId, index) => {
        alert('api id ' + apiId + ' index ' + index)

        

        setidApi(apiId);
        tabSwitch(index)
        // console.log('id api is called ', apiId)
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '>
                    <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>

                {/**component to show list of all User Roles */}
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}> <UserRoles title="News" /> </div>}

                {/** component to show list of all user types */}
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1><UserType title="Event" /></h1></div>}

                {/* component to show all user/ Employee */}
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1><EmpType title="EmpType" /></h1></div>}

                {/** component to show  Role-Users */}
                {tabIndex == 3 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1><RoleUser title="RoleUser" /></h1></div>}

                {/** Api Design Interface */}
                {tabIndex == 4 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1>
                    <ApiList fun={tabSwitch} idApiFun={handleIdApi} title="ApiList" /></h1></div>}
                {/** Api Design Interface */}
                {tabIndex == 5 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1>
                    <AddApi fun={tabSwitch} title="AddApi" /></h1></div>}
                {/** Api Design Interface */}
                {tabIndex == 6 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><h1>
                    <UpdateApi fun={tabSwitch} id={idApi} title="UpdateApi" /></h1></div>}


            </div>
        </>
    )
}

export default MyRelatedMenus
/**
 * Exported to :
 * 1. Cms.js
 * 
 *  
 */


