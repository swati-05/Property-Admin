//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Candidates
//    DESCRIPTION - Candidates Component
//////////////////////////////////////////////////////////////////////////////////////
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import axios from 'axios'
import ListTable from "@/Components/Common/ListTable/ListTable";
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import WorkFlowCandidate from "@/Components/MailboxComponent/WorkFlowCandidate";
import WorkflowCandidateCard from "./WorkflowCandidateCard";




function Candidates(props) {
  const [candidateList, setCandidateList] = useState([])
  const addEditCandidate = () => {

  }
  const openModal2 = () => {

  }
  // useEffect(() => {
  //   setCandidateList(props.workflowDetailsData.candidates)
  // }, [props.workflowDetailsData])

  return (
    <>
      {
        props.workflowDetailsData?.candidate_name.map((candidate,index) => (
          <WorkflowCandidateCard name={candidate} index={index+1} />
        ))
      }
      {/* <WorkflowCandidateCard name={'dark'} index={3} /> */}
    </>
  )
}

export default Candidates
/**
 * Exported to :
 * 1. DetailsWorkflow Component
 * 
 */