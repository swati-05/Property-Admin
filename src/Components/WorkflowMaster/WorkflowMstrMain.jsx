//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 07 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowMstrMain (closed)
//    DESCRIPTION - WorkflowMstrMain Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import WorkFlow from './WorkFlow'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'

function WorkflowMstrMain() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Workflow", tabIndex: 0 },
        { title: "..............", tabIndex: 1 },
        { title: ".......................", tabIndex: 2 }
    ]
   
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '> <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}><WorkFlow /></div>}       {/**input box component to show list of all incoming holding applications */}
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}>.........</div>}       {/**outbox component to show list of all application except incoming holdin application */}
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{ 'height': '90vh' }}>.........</div>}       {/**serach component to search list of verfied property */}

            </div>
        </>
    )
}

export default WorkflowMstrMain
/**
 * Exported to :
 * 1. WorkflowMaster
 * 
 */
