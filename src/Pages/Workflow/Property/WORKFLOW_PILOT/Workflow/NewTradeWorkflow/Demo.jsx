import { Edit, Message } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

function Demo(props) {

    let username = JSON.parse(window.localStorage.getItem('userName'));

    const handleNotification = (e) => {
        // alert('njn')
        notify("Message sent to citizen for onsite verfication", "success");
        // e.preventDefault();

    }

    // console.log("props", props?.workflowPermission)

    const notify = (toastData, actionFlag) => {
        toast.dismiss();
        { actionFlag == "success" && toast.success(toastData); }
        { actionFlag == "notice" && toast.warn(toastData); }
        { actionFlag == "error" && toast.error(toastData); }
    };

    return (
        <div>
            {props?.workflowPermission?.permissions?.can_edit &&
                <>
                    <button type='submit' className="w-full py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                        <Link to={`/trade-update-application/${props?.applicationId}`}> <Edit /> Update This Application &emsp;</Link>
                    </button>
                </>
            }
            {props?.workflowPermission?.permissions?.can_send_sms &&
                <>

                    <div className=' bg-violet-50 h-44 text-center border'>
                        <h1 className='text-base font-semibold uppercase py-2'>
                            Notify citizen for onsite verification.
                        </h1>
                        <form onSubmit={handleNotification}>
                            <div className='mb-2  w-1/2 mx-auto '>
                                <label htmlFor="notificationDate" className='text-xs block uppercase text-left py-1 font-medium'>Select a date </label>
                                <input type="date" name='notificationDate' min={JSON.stringify(new Date()).slice(1, 11)} value={JSON.stringify(new Date(Date.now())).slice(1, 11)} className="border rounded px-3 py-1 w-full" />
                            </div>
                            <button type='button' className="w-1/2 py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-blue-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" onClick={handleNotification}>

                                <Message /> Send SMS &emsp;

                            </button>
                        </form>
                    </div>


                </>
            }
        </div>
    )
}

export default Demo