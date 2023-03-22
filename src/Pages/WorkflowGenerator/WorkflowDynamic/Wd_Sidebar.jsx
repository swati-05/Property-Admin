//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 12 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Wd_Sidebar (closed)
//    DESCRIPTION - Wd_Sidebar Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import MailboxLink from '@/Components/MailboxComponent/MailboxLink'
import {useQuery} from 'react-query'
import axios from 'axios'
import WorkFlowCandidate from '@/Components/MailboxComponent/WorkFlowCandidate'

function Wd_Sidebar(props) {
    const [tabIndex, setTabIndex] = useState(0)

    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return axios.get("http://localhost:3001/levelCandidateList");
    });
    const tabSwitch = (index) => {
        setTabIndex(index)
        props.fun(index)
    }
    return (
        <>

            <aside className="" >
                <div className="py-4 rounded flex flex-row sm:flex-col pl-4 sm:pl-0">
                    {
                        props.tabs.map((data) => (
                            <div onClick={() => tabSwitch(data.tabIndex)}><MailboxLink activeStatus={tabIndex == data.tabIndex ? true : false} title={data.title} /></div>
                        ))
                    }
                </div>

                <div className="shadow-xl bg-green-100 pt-4 border-t-4 border-green-500 h-40 sm:h-96 overflow-y-scroll">

                    {/* <div className='overflow-y-scroll h-auto'> */}
                    {!isLoading ? data.data.map((data) => {
                        return (
                            <>
                                <WorkFlowCandidate designation={data.designation} name={data.name} activeCandidateStatus={data.activeCandidateStatus} />
                                <hr />
                            </>
                        )
                    }) : ''}

                    {/* </div> */}


                </div>

            </aside>

        </>
    )
}

export default Wd_Sidebar
/**
 * Exported to :
 * 1. Wd_Index Component
 * 
 */