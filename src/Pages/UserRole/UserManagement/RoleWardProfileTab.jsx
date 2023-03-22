//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 26 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TiArrowBack } from 'react-icons/ti';
import ManageUserRoleByID from './ManageUserRoleByID';
import UserProfileView from './UserProfileView';
import UserWardPage from './UserWardPage';
import { useEffect } from 'react'
import UserMenuPermission from './UserMenuPermission';

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
                <Box sx={{ p: 0 }}>
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

export default function RoleWardProfileTab(props) {
    const [value, setValue] = React.useState(0);
    const [currentTabName, setcurrentTabName] = React.useState("Role");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // if(newValue == 0){
        // }
    };

    useEffect(() => {
        if (value === 0) {
            setcurrentTabName("Role")
        }else if (value === 1) {
            setcurrentTabName("Profile")
        }else if (value === 2) {
            setcurrentTabName("Ward")
        }else if (value === 3) {
            setcurrentTabName("Menu")
        }
    }, [value])

    return (
        <>
            <div className="border shadow-lg bg-green-50">
                <div className="p-2 bg-green-400 shadow-md">
                    <div className='grid grid-cols-2 '>
                        <div className='col-span-1'> <span>Manage User</span> <span className='text-xl font-semibold'> {props.userName}'s</span> <span className='font-semibold'>{currentTabName}</span></div>
                        <div className='col-span-1 justify-self-end'><button onClick={props.handleBackBtn} className='bg-blue-600 hover:bg-blue-500 font-semibold text-white px-5 pl-2 py-1 shadow-lg rounded'><span className='inline-block'><TiArrowBack /></span> Back</button></div>
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Mange Role" {...a11yProps(0)} />
                        <Tab label="View Profile" {...a11yProps(1)} />
                        <Tab label="Ward Permission" {...a11yProps(2)} />
                        <Tab label="Menu Permission" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >
                    <ManageUserRoleByID btnId={props.btnId} userName={props.userName} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserProfileView btnId={props.btnId} userName={props.userName}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <UserWardPage btnId={props.btnId} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <UserMenuPermission btnId={props.btnId} userName={props.userName} />
                </TabPanel>
            </Box>
        </>
    );
}


/*
Export to -
1. UserPermissionIndex.js
*/
