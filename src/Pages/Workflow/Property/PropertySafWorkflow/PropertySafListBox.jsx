//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropertySafInboxList from './PropertySafInboxList';
import PropertySafDetailsTabs from './PropertySafDetailsTabs';
import PropertySafDetailsTabs2 from './PropertySafDetailsTabs2';
import { AiFillStar } from 'react-icons/ai'
import { TbWebhook } from 'react-icons/tb'
import PropertySafOutboxList from './PropertySafOutboxList';
import PropertySafSpecialList from './PropertySafSpecialList';
import BTCList from './BTCList';


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

export default function PropertySafListBox(props) {


  console.log("workflow candidate sp...", props.workflowCandidates)


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



  return (
    <>

      {/* Tab view which contains two tabs, which are List and Details */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
            <div className="text-right float-right absolute right-4 top-4 text-white justify-center flex gap-4">
              {props?.isSpecial && <div className=' items-center'>
                <span className='bg-yellow-600 px-4 shadow-lg font-mono font-semibold italic rounded-l-xl'> <AiFillStar className="inline text-red-100 animate-bounce" /> special</span>
              </div>}
              <div>
                <span className='bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-3 rounded-l shadow-lg font-semibold  pr-3'> <TbWebhook className='inline' /> Saf Workflow</span>
              </div>
            </div>

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {(props.boxType == 'inbox') && <PropertySafInboxList boxType={props.boxType}  fun={viewDetails} />}
          {(props.boxType == 'outbox') && <PropertySafOutboxList boxType={props.boxType}  fun={viewDetails} />}
          {(props.boxType == 'specialbox') && <PropertySafSpecialList boxType={props.boxType}  fun={viewDetails} />}
          {(props.boxType == 'btcbox') && <BTCList boxType={props.boxType}  fun={viewDetails} />}

          {/* <PropertySafInboxList boxType={props.boxType}  fun={viewDetails} />   */}
          {/**PropertySafApplicationList component to show list of application in table */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PropertySafDetailsTabs2 fun={handleChange} id={listId} members={props.workflowCandidates} boxTypeFun={props.boxType == 'outbox'}/>   {/**PropertySafDetailsTabs to show details of selected application */}
        </TabPanel>

      </Box>
    </>
  );
}
