//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - SidebarWorkflowMstr
//    DESCRIPTION - SidebarWorkflowMstr Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import RawLink from '@/Components/Common/Sidebar/RawLink'
import MailboxLink from '@/Components/MailboxComponent/MailboxLink'
import WorkFlowCandidate from '@/Components/MailboxComponent/WorkFlowCandidate'
import { useQuery } from "react-query";
import axios from 'axios'

function SidebarWorkflowMstr(props) {
    const [tabIndex, setTabIndex] = useState(0)
    // const { isLoading, data, isError, error } = useQuery("first-query", () => {
    //     return axios.get("http://localhost:3001/levelCandidateList");
    // });

    const tabSwitch = (index) => {
        setTabIndex(index)
        props.fun(index)
    }
    return (
        <>

            <aside className="" >
                <div className="py-4 rounded flex flex-row sm:flex-col pl-4 sm:pl-0">

                    <div onClick={() => tabSwitch(0)}><MailboxLink activeStatus={tabIndex == 0 ? true : false} title="WorFlow" /></div>
                    <div onClick={() => tabSwitch(1)}><MailboxLink activeStatus={tabIndex == 1 ? true : false} title="Candidates" /></div>
                    <div onClick={() => tabSwitch(2)}><MailboxLink activeStatus={tabIndex == 2 ? true : false} title="WorkFlow Track" /></div>





                </div>

            </aside>

        </>
    )
}

export default SidebarWorkflowMstr
/**
 * Exported to :
 * 1. 
 * 
 */