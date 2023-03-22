//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenDetailsTabs (closed)
//    DESCRIPTION - CitizenDetailsTabs Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatusTimeline from '@/Components/MailboxComponent/StatusTimeline';
import EmptyDetailsIllustration from '@/Components/Common/EmptyDetails/EmptyDetailsIllustration';
import CitizenDetailsCard from './CitizenDetailsCard';
import CitizenWorkflowTimeline from './CitizenWorkflowTimeline';

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

export default function CitizenDetailsTabs(props) {
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [applicationData, setApplicationData] = useState(
        {
            "id": 2,
            "saf_no": "0880155833",
            "owner_name": "Maddalena",
            "mobile": "2494499119",
            "property_type": "INDEPENDENT",
            "assessment_type": "Mutation",
            "ward_no": 2,
            "received_at": "5/27/2022"
        }
    )

    

    // <EmptyDetailsIllustration title="No Application Selected !" />

    if (props.id == '') {
        return <EmptyDetailsIllustration fun={props.fun} title="No Application Selected !" />
    }



    console.log('.......id at tab.......',props.id)


    return (
        <>
            <div>

                {/* <div className="flex">
                    <div><StatusTimeline index="1" level="Back Office" verificationStatus={true} last={false} active={false} backStatus={false} btc={false} /></div>
                    <div><StatusTimeline index="2" level="Dealing Assistant" verificationStatus={true} last={false} active={false} backStatus={false} btc={false} /></div>
                    <div><StatusTimeline index="3" level="Agency TC" verificationStatus={true} last={false} active={false} backStatus={false} btc={false} /></div>
                    <div><StatusTimeline index="4" level="UlB TC" verificationStatus={false} last={false} active={true} backStatus={true} btc={false} /></div>
                    <div><StatusTimeline index="5" level="Section Incharge" verificationStatus={false} last={false} active={false} backStatus={false} btc={true} /></div>
                    <div><StatusTimeline index="6" level="Executive Officer" verificationStatus={false} last={true} active={false} backStatus={false} btc={false} /></div>
                </div> */}
                {/* DetailTable to show basic details of holding application */}
                <CitizenDetailsCard id={props?.id} />
                <div className=''></div>

                {/* Tab view which contains three tabs, which are Saf Detials, Documents and Workflow */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Workflow" {...a11yProps(0)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        {/* WorkFlow contains timeline and action for holding application */}
                        <CitizenWorkflowTimeline fun={props.fun} id={props?.id} />
                    </TabPanel>

                </Box>

            </div>
        </>
    );
}
/**
 * Exported to :
 * 1. PropertySafInbox Component
 * 
 */