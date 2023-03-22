//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowDetailsCard
//    DESCRIPTION - WorkflowDetailsCard Component
//////////////////////////////////////////////////////////////////////////////////////
import {useState,useEffect} from 'react'
import propImage from '@/Components/MailboxComponent/prop.jpg'
import { RiFlowChart } from 'react-icons/ri'
import { GiBullseye } from 'react-icons/gi'
import flowImage from '@/Components/WorkflowMaster/flow.svg'
function WorkflowDetailsCard(props) {

    const [workflowData, setWorkflowData] = useState({})
    const [candidateCount, setCandidateCount] = useState(0)

    // usequery proble when id is passed from parent component to fetch data
    // var { isLoading, data, isError, error } = useQuery("first-query", () => {
    //     return axios.get(`http://localhost:3001/workflow/${props.id}`);
    // });

    // useEffect(() => {
    //     setWorkflowData(props.workflowDetailsData)
    //     props.workflowDetailsData.candidates && setCandidateCount(props.workflowDetailsData.candidates.length)
    // }, [props.workflowDetailsData])
    console.log('workflow data at card ',props.workflowDetailsData)



    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-auto my-0 p-2">
                    <div className="md:flex no-wrap md:-mx-2 ">

                        <div className="w-full md:w-12/12 mx-2 h-auto">
                            <div className="bg-white p-3 shadow-xl rounded-sm relative">
                                <div className="shadow-xl bg-sky-200 flex items-center pl-4 space-x-2 font-semibold text-gray-900 leading-8 mb-5 py-2 relative">
                                    <div className='flex-initial'>
                                        <RiFlowChart className='text-black' />
                                    </div>
                                    <div className="tracking-wide font-bold text-lg text-gray-900 flex-initial">{props.workflowDetailsData?.workflow_name}</div>
                                    <div className="flex-1 absolute right-6"><GiBullseye className='text-xl text-sky-900' /></div>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm pb-6">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">ULB Name</div>
                                            <div className="px-4 py-2">{props.workflowDetailsData?.ulb_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Module Name</div>
                                            <div className="px-4 py-2">{props.workflowDetailsData?.module_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Initiator</div>
                                            <div className="px-4 py-2">{props.workflowDetailsData?.initiator_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Finisher</div>
                                            <div className="px-4 py-2">{props.workflowDetailsData?.finisher_name}</div>
                                        </div>



                                    </div>
                                </div>

                                <img className='w-1/5 absolute top-20 right-2' src={flowImage} alt="flowImage" />

                            </div>

                            <div className="md:my-4"></div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkflowDetailsCard
/**
 * Exported to :
 * 1. DetailsWorkflow Component
 * 
 */