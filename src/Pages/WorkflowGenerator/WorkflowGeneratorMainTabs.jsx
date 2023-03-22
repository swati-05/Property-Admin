//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 12 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowGeneratorMainTabs (closed)
//    DESCRIPTION - WorkflowGeneratorMainTabs Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailsWorkflow from '@/Components/WorkflowMaster/DetailsWorkflow';
import WorkflowList from '@/Components/WorkflowMaster/WorkflowList';
// import WorkflowList from '@/Components/WorkflowElements/WorkflowList';

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

function WorkflowGeneratorMainTabs() {
    const [value, setValue] = useState(0);
    const [listId, setlistId] = useState('')

    const viewDetails = (id) => {   //viewDetails to go to Details tab and show data of selected holding application
        setlistId(id)   //updating state with application primary key
        handleChange(id, 1)
    }

    const handleChange = (event, newValue) => {   //handChange to switch between tabs
        setValue(newValue);

    };

    return (
        // <TabSwitch tabSwitch={tabSwitchList} />
        // <div className="md:p-10">
        //   <WorkflowList />
        // </div>

        <>
        <h1 className='bg-green-400 text-white pl-7 shadow-lg font-semibold'>Workflow Generator</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="List" {...a11yProps(0)} />
                        <Tab label="Details" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <WorkflowList fun={viewDetails} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DetailsWorkflow id={listId} />
                </TabPanel>
            </Box>
        </>
    )
}

export default WorkflowGeneratorMainTabs
/**
 * Exported to :
 * 1. WorkflowGeneratorIndex Component
 * 
 */