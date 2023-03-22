//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 12 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowGeneratorList
//    DESCRIPTION - WorkflowGeneratorList Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from 'axios'
import ListTable from "@/Components/Common/ListTable/ListTable";
import { CgPlayListAdd } from 'react-icons/cg'
import ModalComponent from '@/Components/Common/ModalComponent'
import SelectInput from "@/Components/TestDelete/SelectInput";
import MultiSelect from "@/Components/Common/MultiSelect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useFormik } from 'formik'
import * as yup from 'yup'
import Loader from "@/Components/TestDelete/Loader";
import { MdDeleteForever } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { GrDocumentUpdate } from 'react-icons/gr'
import { FiEdit } from 'react-icons/fi'
import WorkFlowCandidate from "@/Components/MailboxComponent/WorkFlowCandidate";
import { GrFormView } from 'react-icons/gr'


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
    },
};
Modal.setAppElement('#root');

function WorkflowGeneratorList(props) {
    const [togleModalCount, setTogleModalCount] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [customLoader, setCustomLoader] = useState(false)
    const [worflowCandidatesList, setWorflowCandidatesList] = useState([])
    const [delteworkflowName, setDelteworkflowName] = useState('')
    const [deleteWorkflowId, setdeleteWorkflowId] = useState('')
    const [updateworkflowId, setUpdateworkflowId] = useState(null)
    const [totalDataCount, setTotalDataCount] = useState(0)
    const [designationList, setDesignationList] = useState()
    const [ulbList, setUlbList] = useState()
    const [workflowElements, setWorkflowElements] = useState()
    const [userList, setUserList] = useState()
    let subtitle;

    function openModal() {

        setIsOpen(true);
    }
    function openModal2(worflowId, workflowName) {
        // console.log(worflowId," ",workflowName)
        setDelteworkflowName(workflowName)
        setdeleteWorkflowId(worflowId)
        setIsOpen2(true);
    }

    function afterOpenModal() {
    }
    function afterOpenModal2() {
    }

    function closeModal() {
        formik.initialValues.workflowName = ''
        formik.initialValues.initiator = ''
        formik.initialValues.finisher = ''
        setCustomLoader(false)
        setIsOpen(false);
    }
    function closeModal2() {

        setIsOpen2(false);
    }

    const notify = (toastData) => {
        toast.dismiss();
        toast.info(toastData)
    };
    const validationSchema = yup.object({
        workflowName: yup.string().required('Enter Workflow Name').max(50, 'Enter maximum 50 characters'),
        initiator: yup.string().required('Select Initiator'),
        finisher: yup.string().required('Select Finisher'),
        candidates: yup.array().required('Select Candidates'),
        ulb: yup.string().required('Select ulb'),
        designation: yup.array().required('Select designation'),
        workflowElements: yup.array().required('Select designation'),
    })
    const formik = useFormik({
        initialValues: {
            workflowName: '',
            initiator: '',
            finisher: '',
            ulb: '',
            designation: '',
            workflowElements:''
        },

        onSubmit: values => {
            setCustomLoader(true)
            console.log('form data ', values)
            saveUpdateWorflow()
        }
        , validationSchema
    })

    const saveUpdateWorflow = () => {
        if (updateworkflowId != null) {
            axios.patch(`http://localhost:3001/workflow/${updateworkflowId}`, {
                workflowName: formik.values.workflowName,
                initiator: formik.values.initiator,
                finisher: formik.values.finisher,
                candidates: formik.values.candidates,
            })
                .then(function (response) {
                    setCustomLoader(false)
                    console.log(response)
                    notify('Worflow Update Successfully')
                    closeModal()
                    refetch()
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        } else {
            axios.post('http://localhost:3001/workflowList', {
                workflowName: formik.values.workflowName,
                ulb:formik.values.ulb,
                designation:formik.values.designation,
                // initiator: formik.values.initiator,
                // finisher: formik.values.finisher,
                candidates: formik.values.candidates,
                workflowElements:formik.values.workflowElements
            })
                .then(function (response) {
                    setCustomLoader(false)
                    console.log('result get ',response)
                    notify('Worflow Saved Successfully')
                    closeModal()
                    // refetch()
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        }



    }

    const addEditWorflow = (worflowId = null) => {
        console.log(worflowId)
        // return
        // 1 get workflow candidate
        // 2 if edit then  get specific workflow
        let workflowCanidateUrl = `http://localhost:3001/workflowCandidate`

        setUpdateworkflowId(null)
        // edit case
        if (worflowId != null) {
            setUpdateworkflowId(worflowId)
            axios.get(`http://localhost:3001/workflow/${worflowId}`)
                .then(function (response) {
                    console.log('custom id ', response.data)
                    formik.initialValues.workflowName = response.data.workflowName
                    formik.initialValues.initiator = response.data.initiator
                    formik.initialValues.finisher = response.data.finisher
                    // openModal()
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
        }
        axios.get('http://localhost:3001/DesignationMstr')
            .then(function (response) {
                setDesignationList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        axios.get('http://localhost:3001/ulbMstr')
            .then(function (response) {
                setUlbList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        axios.get('http://localhost:3001/userMstr')
            .then(function (response) {
                setUserList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        axios.get('http://localhost:3001/workflowElements')
            .then(function (response) {
                setWorkflowElements(response.data)
                openModal()
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }


    const deleteWorkflow = () => {
        axios.delete(`http://localhost:3001/workflow/${deleteWorkflowId}`)
            .then(function (response) {
                console.log('custom id ', response.data)
                setCustomLoader(false)
                console.log(response)
                notify(`${delteworkflowName} Worflow Deleted Successfully`)
                closeModal2()
                refetch()
                setDelteworkflowName(null)
                setdeleteWorkflowId(null)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }
    const COLUMNS = [ //preparing coloumns to pass in the table component

        {
            Header: '#',
            // accessor: 'id',
            Cell: ({ row }) => (
                <div>{row.index + 1}</div>
            )
        },
        {
            Header: 'Workflow Name',
            accessor: 'workflowName'
        },
        {
            Header: 'Initiator',
            accessor: 'initiator'
        },
        {
            Header: 'Finisher',
            accessor: 'finisher'
        }
        ,
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div className="flex gap-4">
                    <button onClick={() => addEditWorflow(cell.row.values.id)} className='flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center'>
                        <FiEdit className="inline" />&nbsp;Edit
                    </button>
                    <button onClick={() => openModal2(cell.row.values.id, cell.row.values.workflowName)} className='flex-initial bg-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex'>
                        <MdDeleteForever className="inline" />Delete
                    </button>
                    <button onClick={(e) => props.fun(cell.row.values.id)} className='flex-initial bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black items-center flex'>
                        <GrFormView className='inline text-lg' />View
                    </button>
                </div>
            )
        }
    ]
    //fetching data with useQuery
    const { isLoading, data, isError, error, refetch } = useQuery("first-query", () => {
        return axios.get("http://localhost:3001/workflowbackup");
    });

    //    if(!isLoading){
    //     //    console.log('data lenght ',data.data.length)
    //        let dataCount = data.data.length
    //     //    setTotalDataCount(dataCount)
    //    }
    useEffect(() => {
        if (data) {
            setTotalDataCount(data.data.length)
            console.log(data.data.length)
        }
    }, [data])


    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000} />
            {isLoading && <h1>Looading ...</h1>} {/**show loading in case of not fetched data */}
            {!isLoading && <ListTable columns={COLUMNS} dataList={data?.data}><button onClick={() => addEditWorflow()} className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"><CgPlayListAdd />Add</button></ListTable>}
            {/* edit modal component */}

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="relative  rounded-lg shadow-xl border-2 border-gray-50 z-50" >
                    {updateworkflowId == null && <h1 className="text-center bg-white text-gray-800 border-t border-gray-400 text-lg font-semibold py-1 "><CgPlayListAdd className="inline text-3xl" /> Add Worflow</h1>}
                    {updateworkflowId != null && <h1 className="text-center bg-white text-gray-800 border-t border-gray-400 text-lg font-semibold py-1 "><GrDocumentUpdate className="inline text-xl" /> Update Worflow</h1>}

                    <div className="p-10 px-10  bg-green-200" style={{'width':'60vw'}}>
                        <form className=" md:w-full md:grid md:grid-cols-2 md:gap-x-8" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black ">Workflow Name</label>
                                <input {...formik.getFieldProps('workflowName')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <span className="text-red-600">{formik.touched.workflowName && formik.errors.workflowName ? formik.errors.workflowName : null}</span>
                            </div>
                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select ULB</label>
                                <select {...formik.getFieldProps('ulb')} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {ulbList?.map((option) => (
                                        <option value={option.ulbName}>{option.ulbName}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.ulb && formik.errors.ulb ? formik.errors.ulb : null}</span>
                            </div>
                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select Designation</label>
                                <select multiple {...formik.getFieldProps('designation')} className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {designationList?.map((option) => (
                                        <option value={option.designation}>{option.designation}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.designation && formik.errors.designation ? formik.errors.designation : null}</span>
                            </div>
                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select Initiator</label>
                                <select {...formik.getFieldProps('initiator')} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {userList?.map((option) => (
                                        <option value={option.name}>{option.name}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.initiator && formik.errors.initiator ? formik.errors.initiator : null}</span>
                            </div>

                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select Finisher</label>
                                <select {...formik.getFieldProps('finisher')} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {userList?.map((option) => (
                                        <option value={option.name}>{option.name}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.finisher && formik.errors.finisher ? formik.errors.finisher : null}</span>

                            </div>
                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select Canidates</label>
                                <select multiple {...formik.getFieldProps('candidates')} className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {userList?.map((option) => (
                                        <option value={option.name}>{option.name}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.candidates && formik.errors.candidates ? formik.errors.candidates : null}</span>

                            </div>
                            <div className="mb-4">
                                <label className={'block text-sm font-medium'}>Select Worflow Elements</label>
                                <select multiple {...formik.getFieldProps('workflowElements')} className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " >
                                    <option value="_">== Select ==</option>
                                    {workflowElements?.map((option) => (
                                        <option value={option.title}>{option.title}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.workflowElements && formik.errors.workflowElements ? formik.errors.workflowElements : null}</span>

                            </div>

                           <div className="text-right"> {updateworkflowId == null && (!customLoader && <button type="submit" className="text-white bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-sky-400 hover:shadow-2xl">Submit</button>)}
                            {updateworkflowId != null && (!customLoader && <button type="submit" className="text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-400 hover:shadow-2xl">Update</button>)}
                            {customLoader && <Loader />}</div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* delete modal */}
            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="relative bg-white rounded-lg shadow-xl border-2 border-gray-50 rounded" >
                    <div className="p-10 px-10 md:w-96 bg-red-600  text-center">
                        <h1 className="text-white">Do you want to delete <b><i>{delteworkflowName}</i></b> workflow ?</h1>
                        <button onClick={deleteWorkflow} className="bg-white text-red-800 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-red-900 hover:text-white hover:shadow-3xl md:mr-3 font-semibold"><MdDeleteForever className="inline" />Delete</button>
                        <button onClick={closeModal2} className="bg-gray-400 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-gray-700 hover:shadow-2xl md:ml-3"><TiCancel className="inline text-2xl" />Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default WorkflowGeneratorList
/**
 * Exported to :
 * 1. WorkflowGeneratorMainTabs Component
 * 
 */