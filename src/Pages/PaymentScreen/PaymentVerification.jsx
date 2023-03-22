//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowList
//    DESCRIPTION - 
//                  
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from "react";
import { useQuery } from "react-query";
import axios from 'axios'
import ListTable from "@/Components/Common/ListTable/ListTable";
import { CgPlayListAdd } from 'react-icons/cg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { BsCheck } from 'react-icons/bs'
import { MdAttachMoney } from 'react-icons/md'
import deleteImage from '@/Components/WorkflowMaster/delete.svg'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none'
    }
};
// Modal.setAppElement('#root');
Modal.setAppElement('#modal');

function PaymentVerification(props) {
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [actionName, setactionName] = useState()
    const [deleteWorkflowId, setdeleteWorkflowId] = useState('')


    //to store all workflow list
    const [allWorkflowList, setAllWorkflowList] = useState([])


    const notify = (toastData, actionFlag) => {
        toast.dismiss();
        { actionFlag == 'delete' && toast.error(toastData) }
        { actionFlag == 'update' && toast.info(toastData) }
        { actionFlag == 'save' && toast.success(toastData) }
        // toast.info(toastData)
    };

    function openModal2(worflowId, workflowName) {
        document.getElementById('root').style.filter = 'blur(3px)'
        setIsOpen2(true);
    }

    function closeModal2() {
        document.getElementById('root').style.filter = 'none'
        setIsOpen2(false);
    }

    const header = {
        headers:
        {
            Authorization: `Bearer 74|1WeoocC48HCXAEwnf7iOTks49pIvIlvr4tFhLzaR`,
            Accept: 'application/json',
        }
    }


    const paymentActionProceed = () => {
        let url;
        { (actionName == 'accept') && (notify('save', 'Payment Accepted successfully !')) }
        { (actionName == 'reject') && (notify('delete', 'Payment Rejected successfully !')) }
        // {(actionName=='accept') && (url='/accept')}
        // {(actionName=='reject') && (url='/reject')}
        // console.log('workflow id to delete ',deleteWorkflowId)
        // return
        // axios.delete(`http://192.168.0.166/api/crud/ulb-workflow-masters/${deleteWorkflowId}`, header)
        //     .then(function (response) {
        //         notify(`${actionName} Worflow Deleted Successfully`, 'delete')

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        //     .then(function () {
        //     });

    }

    const paymentAction = (e,id) => {
        console.log('payment action ', e.target.checked," id ....",id)
        // setactionName(action)
        // openModal2()
    }

    const COLUMNS = [ //preparing coloumns to pass in the table component

        {
            Header: '#',
            Cell: ({ row }) => (
                <div>{row.index + 1}</div>
            )
        },
        {
            Header: 'Payment-Id',
            accessor: 'paymentId',
        },

        {
            Header: 'Order-Id',
            accessor: 'razorOrderId',

        }
        ,
        {
            Header: 'Mobile',
            accessor: 'mobile',
        },
        {
            Header: 'Created-On',
            accessor: 'timeStamp',
        },
        {
            Header: 'Amount',
            accessor: 'amount',
        }
        ,
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ cell }) => (

                <div className="w-4/5">
                    <div className={`flex justify-center items-center font-semibold border relative ${(cell.row.values.status == 'Incomplete') && 'bg-gray-200 text-gray-800'} ${(cell.row.values.status == 'Successfull') && 'bg-green-500 text-white'} ${(cell.row.values.status == 'Un-Successfull') && 'bg-red-500 text-white'} border border-white text-center shadow-xl rounded-lg text-xs py-1 px-0`}>
                        {cell.row.values.status}
                        {cell.row.values.status == 'Incomplete' && <input onChange={(e)=>paymentAction(e,cell.row.values.id)} type="checkbox" class="ml-2 form-checkbox h-4 w-4 text-red-600" />
                        }
                    </div>
                </div>
            )
        },
        // {
        //     Header: 'Action',
        //     accessor: 'id',
        //     Cell: ({ cell }) => (
        //         <div className="flex gap-4">
        //             <button onClick={() => paymentAction('accept', cell.row.values.id)} className='flex-initial border-2 border-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center'>
        //                 <BsCheck className="inline text-green-400 font-semibold text-lg" />&nbsp;Accept
        //             </button>
        //             <button onClick={() => paymentAction('reject', cell.row.values.id)} className='flex-initial border-2 border-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex'>
        //                 <MdDeleteForever className="inline text-red-400" />Reject
        //             </button>
        //         </div>
        //     )
        // }

    ]

    let fetchh = 0
    const onSuccess = (data) => {
        console.log('fetch 1 .......', fetchh++)
        setAllWorkflowList(data.data)
    }

    const { isLoading, data, isError, error, refetch } = useQuery("workflow-list", () => {
        return axios.get("http://localhost:3001/paymentList", header);
    }, {
        onSuccess
    });

    if (!isLoading) {
        console.log('wwww data full workflow.....', data)

    }


    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000} />
            {isLoading && <h1>Looading ...</h1>} {/**show loading in case of not fetched data */}
            {!isLoading && <ListTable columns={COLUMNS} dataList={data?.data}>
                <button className='pr-3 float-right bg-sky-100 border-l border-b border-white text-black col-span-12 sm:col-span-2 sm:col-start-11 pl-3 rounded-l shadow-lg font-semibold'><MdAttachMoney className='inline' /> Payment Verification</button></ListTable>}
            {/* edit modal component */}


            {/* delete modal */}
            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="relative bg-white rounded-lg shadow-2xl border-2 border-gray-50 rounded" >
                    <div className="p-10 px-10 md:w-96 bg-white  text-center">
                        <h1 className="text-black text-lg">Do you want to <b><i>{actionName}</i></b> payment ?</h1>
                        <img src={deleteImage} alt="deleteImage" />

                        <button onClick={paymentActionProceed} className={`${(actionName == 'accept') ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'} bg-white border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-red-900 hover:text-white hover:shadow-3xl md:mr-3 font-semibold`}><MdDeleteForever className="inline" />{actionName}</button>
                        <button onClick={closeModal2} className="bg-gray-400 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-gray-700 hover:shadow-2xl md:ml-3"><TiCancel className="inline text-2xl" />Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PaymentVerification
/**
 * Exported to :
 * 1. WorkFlow Component
 * 
 */