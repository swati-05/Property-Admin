//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 07 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowSidebar (closed)
//    DESCRIPTION - WorkflowSidebar Component
//////////////////////////////////////////////////////////////////////////////////////
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import MailboxContent from '@/Components/MailboxComponent/MailboxContent'
import OutBox from '@/Components/MailboxComponent/OutBox'
import Search from '@/Components/MailboxComponent/Search'
import Special from '@/Components/MailboxComponent/Special'
import { useState } from 'react'
import WorkflowContent from './WorkflowContent'


function WorkflowSidebar() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Search", tabIndex: 3 },
        { title: "Special", tabIndex: 4 }
    ]
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '> <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex==0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><WorkflowContent /></div> }       {/**input box component to show list of all incoming holding applications */}
                {tabIndex==1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><OutBox /></div> }       {/**outbox component to show list of all application except incoming holdin application */}
                {tabIndex==2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><Search /></div> }       {/**serach component to search list of verfied property */}
                {tabIndex==3 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><Special /></div> }      {/**Special component which receives list of escalted holding applications */}

            </div>
        </>
    )
}

export default WorkflowSidebar
/**
 * Exported to :
 * 1. 
 * 
 */