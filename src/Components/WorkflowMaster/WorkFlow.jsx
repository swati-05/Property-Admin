//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkFlow
//    DESCRIPTION - WorkFlow Component
//////////////////////////////////////////////////////////////////////////////////////

import TabSwitch from '@/Components/Common/TabSwitch'
import {useState} from 'react'
import WorkFlowAction from './WorkFlowAction'
import WorkflowList from './WorkflowList'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailsWorkflow from './DetailsWorkflow';

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

function WorkFlow() {
  const [value, setValue] = useState(0);
  const [workflowDetails, setworkflowDetails] = useState('')  

  const viewDetails = (workflowData) => {   //viewDetails to go to Details tab and show data of selected holding application
    setworkflowDetails(workflowData)   //updating state with application primary key
    handleChange(null, 1)
  }

  const handleChange = (event, newValue) => {   //handChange to switch between tabs
    setValue(newValue);

  };
  
  return (
    // <TabSwitch tabSwitch={tabSwitchList} />
    // <div className="md:p-10">
    //   <WorkflowList />
    // </div>
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WorkflowList fun={viewDetails}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DetailsWorkflow fun={handleChange} workflowDetails={workflowDetails} />
        </TabPanel>
      </Box>
  )
}

export default WorkFlow
/**
 * Exported to :
 * 1. WorkflowMstrMain Component
 * 
 */