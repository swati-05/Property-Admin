import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateRoleType from './MyCreateRoleType';
import MyRoleList from './MyRoleList';
import axios from 'axios';

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

export default function MyUserRoles() {
  const [value, setValue] = useState(0);
  const [listId, setlistId] = useState('')    //state to store application primary key
  const [userData, setuserData] = useState()
  const handleChange = (event, newValue) => {   //handChange to switch between tabs
    setValue(newValue);

  };

  const viewDetails = (id) => {   //viewDetails to go to Details tab and show data of selected holding application
    setlistId(id)   //updating state with application primary key
    handleChange(id, 1);
    handleUserData(id);
  }
  const handleUserData = (id) => {
    axios.get(`http://localhost:3333/roles/${id}?_embed=user_types`)
      .then(function (response) {
        // handle success
        console.log(response)
        setuserData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="List Roles" {...a11yProps(0)} />
          <Tab label="Add" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyRoleList fun={viewDetails} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateRoleType userData={userData}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
