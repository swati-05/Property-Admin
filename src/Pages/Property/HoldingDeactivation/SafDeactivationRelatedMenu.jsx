import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
// import HoldingDeactivationForm from './HoldingDeactivationForm'

function SafDeactivationRelatedMenu() {

    const notify = (toastData, actionFlag) => {
        toast.dismiss();
        { actionFlag == 'escalated' && toast.success(toastData) }
        { actionFlag == 'success' && toast.success(toastData) }
        { actionFlag == 'de-escalated' && toast.warn(toastData) }
        { actionFlag == 'notice' && toast.warn(toastData) }
        { actionFlag == 'error' && toast.error(toastData) }
    };

    return (
        <>
            {/* <HoldingDeactivationForm toast={notify} /> */}
        </>
    )
}

export default SafDeactivationRelatedMenu