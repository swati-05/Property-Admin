//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - TabSwitch
//    DESCRIPTION - TabSwitch Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function TabSwitch(props) {
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
                        {props.tabSwitch.map((data) => (
                            <Tab label={data.title} {...a11yProps(data.tabIndex)} />
                        ))}
                    </Tabs>
                </Box>

                {props.tabSwitch.map((data) => (
                    <TabPanel value={value} index={data.tabIndex}>
                        {data.component}
                    </TabPanel>
                ))}
            </Box>
        </>
    );
}

/**
 * Exported to :
 * 1. 
 * 
 */