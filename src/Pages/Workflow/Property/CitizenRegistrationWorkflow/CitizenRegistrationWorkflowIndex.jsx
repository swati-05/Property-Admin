//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 8 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenRegistrationWorkflowIndex (closed)
//    DESCRIPTION - CitizenRegistrationWorkflowIndex Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import OutBox from '@/Components/MailboxComponent/OutBox'
import Search from '@/Components/MailboxComponent/Search'
import Special from '@/Components/MailboxComponent/Special'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import { useQuery } from 'react-query'
import axios from 'axios'
import CitizenInbox from './CitizenInbox'

function CitizenRegistrationWorkflowIndex() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index

    const tabs = [ //tab list to pass to common mailboxSidebar component
        { title: "Inbox", tabIndex: 0 },
        // { title: "Outbox", tabIndex: 1 },
        // { title: "Search", tabIndex: 2 },
        // { title: "Special", tabIndex: 3 },
    ]
    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return axios.get("http://localhost:3001/levelCandidateList");
    });
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            {/* <div className="grid grid-cols-12 mb-2">
                <div className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-4 rounded-l shadow-lg font-semibold'><TbWebhook className='inline' /> Saf WorkFlow</div>
            </div> */}
            <div className="grid grid-cols-12 rounded-lg mt-0 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '>{isLoading && <h1>Looading ...</h1>}
                    {!isLoading && <MailboxSidebar candidateListStatus={false} workflowCandidates={data?.data} tabs={tabs} fun={tabSwitch} />} </div> {/** MailboxSidebar - common mailbox sidebar component */}
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><CitizenInbox /></div>}       {/**PropertySafInbox  component to show list of all incoming holding applications */}
               
            </div>
        </>
    )
}

export default CitizenRegistrationWorkflowIndex
/**
 * Exported to :
 * 1. App.js
 * 
 */