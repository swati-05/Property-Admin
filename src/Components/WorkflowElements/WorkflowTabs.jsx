//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 07 july 2022
//    Revision - 1
//    Project - JUIDCO 
//    Component  - WorkflowTabs (closed)
//    DESCRIPTION - WorkflowTabs Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState,useEffect } from 'react'
import SafDetailsCard from '@/Components/MailboxComponent/SafDetialsCard'
import TabSwitch from '@/Components/Common/TabSwitch'
import StatusTimeline from '@/Components/MailboxComponent/StatusTimeline'
import DetailsTable from '@/Components/MailboxComponent/DetailsTable'
import DocumentMailbox from '@/Components/MailboxComponent/DocumentMailbox'
import { useQuery } from "react-query";
import axios from 'axios'

function WorkflowTabs(props) {
    //dynamic tabs from workflow generators
    const [tabsData, setTabsData] = useState([
        // { title: 'Saf', tabIndex: 0, component: <SafDetailsCard /> },
        // { title: 'tab', tabIndex: 1, component: <SafDetailsCard /> },
        // { title: 'Documents', tabIndex: 2, component: <DocumentMailbox /> },
    ])

    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return axios.get("http://localhost:3001/workflowElements");
    });

    // if(!isLoading){
    //     console.log(data.data)
    //     setTabsData(data.data)
    // }
    useEffect(() => {
      if(data){
          setTabsData(data.data)
          console.log("elements ",data.data)
      }
    }, [data])
    
    return (
        <>
            <div>
                <div className="flex">
                    {/* StatusTimeline to show the progress level of holding application */}
                    <div><StatusTimeline index="1" level="Back Office" verificationStatus={true} last={false} /></div>
                    <div><StatusTimeline index="2" level="Dealing Assistant" verificationStatus={true} last={false} /></div>
                    <div><StatusTimeline index="3" level="Agency TC" verificationStatus={true} last={false} /></div>
                    <div><StatusTimeline index="4" level="UlB TC" verificationStatus={false} last={false} /></div>
                    <div><StatusTimeline index="5" level="Section Incharge" verificationStatus={false} last={false} /></div>
                    <div><StatusTimeline index="6" level="Executive Officer" verificationStatus={false} last={true} /></div>
                </div>
                {/* DetailTable to show basic details of holding application */}
                <DetailsTable id={props.id} />
                <div className=''></div>
                <TabSwitch tabSwitch={tabsData} />
            </div>
        </>
    )
}

export default WorkflowTabs