//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 12 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Wd_Index (closed)
//    DESCRIPTION - Wd_Index Component
//////////////////////////////////////////////////////////////////////////////////////
import OutBox from '@/Components/MailboxComponent/OutBox'
import Search from '@/Components/MailboxComponent/Search'
import Special from '@/Components/MailboxComponent/Special'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import Wd_Content from './Wd_Content'
import Wd_Sidebar from './Wd_Sidebar'
import {useQuery,QueryClient} from 'react-query'
import axios from 'axios'


function Wd_Index() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Inbox", tabIndex: 0 },
        { title: "Outbox", tabIndex: 1 },
        { title: "Search", tabIndex: 3 },
        { title: "Special", tabIndex: 4 }
    ]
    const location = useLocation()
    const queryClient = new QueryClient()
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }

    //usequery onSuccess method to run after successful query fetching
    const onSuccess = (data)=>{
        console.log('after success ',data.data,' after succes')
        console.log(location.pathname)
    }

    //getting workflow details according to url
    const { isLoading, data, isError, error } = useQuery("wf-query", () => {
        return axios.get(`http://localhost:3001/workflowList/?url=${location.pathname}`);
    },{
        onSuccess
    });
    
    
    return (
        <>
            <span className='bg-red-100 -ml-10 text-black'>{data?.data[0].workflowName}</span>
            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '> <Wd_Sidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex==0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><Wd_Content /></div> }       {/**input box component to show list of all incoming holding applications */}
                {tabIndex==1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><OutBox /></div> }       {/**outbox component to show list of all application except incoming holdin application */}
                {tabIndex==2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><Search /></div> }       {/**serach component to search list of verfied property */}
                {tabIndex==3 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' style={{'height':'90vh'}}><Special /></div> }      {/**Special component which receives list of escalted holding applications */}

            </div>
        </>
    )
}

export default Wd_Index
/**
 * Exported to :
 * 1. 
 * 
 */