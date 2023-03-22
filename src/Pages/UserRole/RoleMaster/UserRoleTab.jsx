//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 19 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - UserRoleTab
//    DESCRIPTION - UserRoleTab
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRoleList from './UserRoleList';
// import UserRoleDetails from './UserRoleDetails';
// import SelfAdvtDetailsTabs from './SelfAdvtDetailsTabs';
// import SelfAdvtApplicationList from './SelfAdvtApplicationList';
// import AdvtTopLevel from '../AdvtTopLevel';


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

export default function UserRoleTab() {
  const [value, setValue] = useState(0);
  const [listId, setlistId] = useState('')
  const [actionType, setActionType] = useState("Details")
  const [openModel, setOpenModel] = useState(false)

  const [refetchList, setRefetchList] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };


  const addRoleUSer = () => {
    setActionType("Add")
    setOpenModel((prev)=> prev + 1)
    // console.log("Add btn in USerRoleTab.js 1")
  }

  const viewDetails = (id) => {
    setActionType("View")
    setOpenModel((prev)=> prev + 1)
    setlistId(id)

  }

  const editDetails = (id) => {
    setActionType("Edit")
    setOpenModel((prev)=> prev + 1)
    // console.log("Edit btn in USerRoleTab.js 1", id)
    setlistId(id)
    // handleChange(id, 1)

  }

  const deleteDetails = (id) => {
    setActionType("Delete")
    setOpenModel((prev)=> prev + 1)
    setlistId(id)

  }

  const refetchListData = () => {
    setRefetchList(refetchList + 1)
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="List" {...a11yProps(0)} />
            {/* <Tab label={actionType} {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserRoleList add={addRoleUSer} view={viewDetails} edit={editDetails} delete={deleteDetails} refetchList={refetchList} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <UserRoleDetails id={listId} /> */}
        </TabPanel>

      </Box>
    </>
  );
}
/**
 * Exported to :
 * 1. UserRoleSideBar.js
 * 
 */
