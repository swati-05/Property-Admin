//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - DetailsWorkflow
//    DESCRIPTION - DetailsWorkflow Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from 'react'
import WorkflowDetailsCard from './WorkflowDetailsCard'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Candidates from './Candidates';
import WorkFlowTrack from './WorkFlowTrack';
import axios from 'axios'
import EmptyDetailsIllustration from '@/Components/Common/EmptyDetails/EmptyDetailsIllustration';


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

function DetailsWorkflow(props) {
    const [value, setValue] = useState(0);
    const [listId, setlistId] = useState('')
    const [workflowDetailsData, setWorkflowDetailsData] = useState({})


    

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/workflow/${props.id}`)
    //         .then(function (response) {
    //             setWorkflowDetailsData(response.data)
    //             console.log(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //         .then(function () {
    //         });
    // }, [props.id])

    if (props.workflowDetails == '') {
        return (
            <>
                <EmptyDetailsIllustration fun={props.fun} title="No Workflow Selected !" />
            </>
        )
    }

    const handleChange = (event, newValue) => {   //handChange to switch between tabs
        setValue(newValue);

    };
    return (
        <>
            <WorkflowDetailsCard workflowDetailsData={props.workflowDetails} />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Candidates" {...a11yProps(0)} />
                        {/* <Tab label="Workflow Track" {...a11yProps(1)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Candidates workflowDetailsData={props.workflowDetails} />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <WorkFlowTrack workflowDetailsData={workflowDetailsData} />
                </TabPanel> */}

            </Box>

        </>
    )
}

export default DetailsWorkflow
/**
 * Exported to :
 * 1. WorkFlow Component
 * 
 */