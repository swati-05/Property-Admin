//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkFlowTrack
//    DESCRIPTION - WorkFlowTrack Component
//////////////////////////////////////////////////////////////////////////////////////
import TimeLine2 from '@/Components/MailboxComponent/TimeLine2'
import TimeLIne2List from '@/Components/MailboxComponent/TimeLIne2List'
import TimeLineList from '@/Components/MailboxComponent/TimeLineList'
import {useState,useEffect} from 'react'

function WorkFlowTrack(props) {
  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    setTrackList(props.workflowDetailsData.workflowTrack)
  }, [props.workflowDetailsData])


  return (
    <>
      {
        trackList?.map((data) => (
          <TimeLIne2List title={data.title} date={data.date} index={data.trackId} comment={data.comment} />
        ))
      }

      {/* <TimeLIne2List title={"Sent from back office"} date={"06-07-2022"} index={3} comment={"Everythig is good."} />
      <TimeLIne2List title={"Appication verified"} date={"06-07-2022"} index={2} comment={"Everythig is good."} />
      <TimeLIne2List title={"Back to citizen"} date={"06-07-2022"} index={1} comment={"Everythig is good."} /> */}

    </>
  )
}

export default WorkFlowTrack
/**
 * Exported to :
 * 1. DetailsWorkflow Component
 * 
 */