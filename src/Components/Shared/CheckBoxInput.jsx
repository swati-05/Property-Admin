//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ControlledCheckbox
//    DESCRIPTION - ControlledCheckbox Component
//////////////////////////////////////////////////////////////////////////////////////
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox(props) {
    //setting the escalted status ...0 for fresh
    const [checked, setChecked] = React.useState(props?.is_escalate);
    console.log('is escalate in concession...',props?.is_escalate)

    const handleChange = (event) => {
        setChecked(event.target.checked);
        // console.log(event.target.checked)
        props.fun(event.target.checked)
    };

    return (
        <>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            /> <span className='text-sm font-semibold'>Escalate</span>
        </>
    );
}
/**
 * Exported to :
 * 1. Workflow Component
 * 
 */