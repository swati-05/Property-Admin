//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PilotWorkflowInboxList from './PilotWorkflowLists/PilotWorkflowInboxList';
import PilotWorkflowTabs from './PilotWorkflowTabs';
import { AiFillStar } from 'react-icons/ai'
import { TbWebhook } from 'react-icons/tb'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary';
import { useParams } from 'react-router-dom';


function TabPanel(props) {
  const { children, value, index, ...other } = props;




  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PilotWorkflowListBox(props) {


  console.log('workflowInfo at pilotworkflowlistbox....', props?.workflowInfo)
  console.log('api at listbox...', props?.api)
  console.log("workflow candidate sp...", props.workflowCandidates)
  const { passedTabIndex, passedApplicationId } = useParams()


  // console.log('............props type............ ',props.boxType)
  const [value, setValue] = useState(0);
  const [listId, setlistId] = useState('')    //state to store application primary key
  const handleChange = (event, newValue) => {   //handChange to switch between tabs
    setValue(newValue);

  };

  const viewDetails = (id) => {   //viewDetails to go to Details tab and show data of selected holding application
    setlistId(id)   //updating state with application primary key
    handleChange(id, 1)
  }

  // useEffect(() => {
  //   // 3 IF GET ANY PASSED APPLICATION ID THEN SET APPLICATION ID TO VIEW DETAIL
  //   if (passedApplicationId != 'direct') {
  //     viewDetails(parseInt(passedApplicationId))
  //   }
  // }, [props?.autoTabIndex])

 




  return (
    <>

      {/* Tab view which contains two tabs, which are List and Details */}
      <Box sx={{ width: '100%',paddingLeft:'20px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
            <div className="text-right float-right absolute right-4 top-4 text-white justify-center flex gap-4">
              {props?.isSpecial && <div className=' items-center'>
                <span className='bg-yellow-600 px-4 shadow-lg font-mono font-semibold italic rounded-l-xl'> <AiFillStar className="inline text-red-100 animate-bounce" /> special</span>
              </div>}
              <div>
                {/* <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-3 rounded-l shadow-lg font-semibold  pr-3'> <TbWebhook className='inline' /> {props?.workflow?.workflowName}</span> */}
              </div>
            </div>

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>

          {(props.boxType == 'inbox') &&
            <CustomErrorBoundary errorMsg="Bug in PilotWorkflowInboxList" >
              <PilotWorkflowInboxList api={props?.api?.api_inboxList} COLUMNS={props?.COLUMNS} boxType={props.boxType} fun={viewDetails} />
            </CustomErrorBoundary>}

          {(props.boxType == 'outbox') &&
            <CustomErrorBoundary errorMsg="Bug in PilotWorkflowOutboxList" >
              <PilotWorkflowInboxList api={props?.api?.api_outboxList} COLUMNS={props?.COLUMNS} boxType={props.boxType} fun={viewDetails} />
            </CustomErrorBoundary>}

          {(props.boxType == 'specialbox') &&
            <CustomErrorBoundary errorMsg="Bug in PilotWorkflowSpecialList" ><PilotWorkflowInboxList api={props?.api?.api_specialList} COLUMNS={props?.COLUMNS} boxType={props.boxType} fun={viewDetails} />
            </CustomErrorBoundary>}

          {(props.boxType == 'btcbox') &&
            <CustomErrorBoundary errorMsg="Bug in PilotWorkflowBtcList" ><PilotWorkflowInboxList api={props?.api?.apt_btcList} boxType={props.boxType} COLUMNS={props?.COLUMNS} fun={viewDetails} />
            </CustomErrorBoundary>}

          {(props.boxType == 'fieldbox') &&
            <CustomErrorBoundary errorMsg="Bug in PilotWorkflowFieldVerificationList" ><PilotWorkflowInboxList api={props?.api?.api_fieldVerificationList} boxType={props.boxType} COLUMNS={props?.COLUMNS} fun={viewDetails} />
            </CustomErrorBoundary>}

          {/* <PilotWorkflowInboxList boxType={props.boxType}  fun={viewDetails} />   */}
          {/**PropertySafApplicationList to show list of application in table */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomErrorBoundary errorMsg="Bug in PilotWorkflowTabs" >
            <PilotWorkflowTabs tabIndex={props?.tabIndex} workflow={props?.workflow} workflowInfo={props?.workflowInfo} api={props?.api} fun={handleChange} id={listId} members={props.workflowCandidates} customTabs={props?.customTabs} boxType={props.boxType} boxTypeFun={props.boxType == 'outbox'} />
          </CustomErrorBoundary>
          {/**PilotWorkflowTabs to show details of selected application */}
        </TabPanel>

      </Box>
      <div className='w-full h-20'></div>
    </>
  );
}
