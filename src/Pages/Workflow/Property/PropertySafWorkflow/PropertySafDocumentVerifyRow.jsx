//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext ,useEffect, useState} from 'react'
import axios from 'axios';
import { contextVar } from '@/Components/Context/Context'
import api_headers from '@/Components/ApiList/api_headers';
import PropertyApiList from '@/Components/ApiList/PropertyApiList';
import apiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import {toast, ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {FcDocument} from 'react-icons/fc'
import Modal from 'react-modal'
import {FiInfo} from 'react-icons/fi'
import {ImCross} from 'react-icons/im'

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

function PropertySafDocumentVeriyRow(props) {
   
    const {postSafVerify} = apiList()
    console.log("🚀 ~ file: PropertySafDocumentVerifyRow.js:32 ~ PropertySafDocumentVeriyRow ~ postSafVerify", postSafVerify);

    const { notify } = useContext(contextVar);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [docStatus, setdocStatus] = useState(0)
    const [docRemarks, setdocRemarks] = useState('')
    const [index, setindex] = useState()
    const [docUrl, setdocUrl] = useState()
    
    const verifyDocumentNotification = (type) => {
        { (type == 'Verified') && notify('Document Verified Successfully!', 'success') }
        { (type == 'Rejected') && notify('Document Rejected Successfully!', 'error') }
    }

    const openModal = () => setIsOpen(true)
    const closeModal = () => {
        setIsOpen(false)
        setIsOpen2(false)
    }
    const afterOpenModal = () => { }

    const verifyAction = (actionType, id) => {
       setdocStatus(actionType)
       setindex(id)
       closeModal()
       verifyModal()
    }

    const verifyModal = () => {
        openModal()
    }

    const openModal2 = () => setIsOpen2(true)
    const [modalIsOpen2, setIsOpen2] = useState(false);

    const modalFun = (doc) => {
        openModal2()
        setdocUrl(doc)
    }

    const submitData = () => {
        console.log("submitting verification with values => ", docStatus,"and", docRemarks, "and", index)
        let requestBody = {
            id: index,
            docStatus : docStatus,
            docRemarks : docRemarks
        }
        closeModal()
        axios.post(postSafVerify, requestBody, ApiHeader())
        .then((res) => {
            console.log("submitting doc status data => ", res, "data => ", requestBody)
            verifyDocumentNotification(docStatus)
            props.refresh()
        })
        .catch((err) => console.log("error submitting status => ", err, "data => ", requestBody))
    }

    return (
        <>
            <tr>

                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props.index + 1}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                    {props?.docList?.doc_type}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm cursor-pointer" onClick={() => modalFun(props?.docList?.doc_path)}>
                <div className="flex items-center">
                        { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'pdf' &&  <div className="flex-shrink-0 text-[28px]">
                            <FcDocument/>
                        </div>
                        }
                         { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'jpg' &&  <div className="flex-shrink-0">
                            <img src={props?.docList?.doc_path} alt="" className="md:w-[2vw] w-[5vw]" srcset="" />
                        </div>
                        }
                        { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'jpeg' &&  <div className="flex-shrink-0">
                            <img src={props?.docList?.doc_path} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                        </div>
                        }
                    </div>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="whitespace-no-wrap">
                        {props?.docList?.verify_status == 0 && <>Pending</>}</p>
                        <p className="text-green-500 whitespace-no-wrap">
                        {props?.docList?.verify_status == 1 && <>Verified</>}</p>
                        <p className="text-red-500 whitespace-no-wrap">
                        {props?.docList?.verify_status == 2 && <>Rejected</>}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {props?.docList?.verify_status == 0 && <div className="flex gap-4">
                        <button onClick={() => verifyAction("Verified", props?.docList?.id)} className='flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center'>
                            Verify
                        </button>
                        <button onClick={() => verifyAction("Rejected", props?.docList?.id)} className='flex-initial bg-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex'>
                            Reject
                        </button>
                    </div>}
                </td>
            </tr>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-xl border-2 bg-white md:ml-32 py-4 px-8 md:px-4 flex flex-col items-center justify-center gap-y-4 w-full md:w-[30vw]">
                <div className="absolute top-6 bg-white right-6 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross/>
                  </div>

                    <div className='flex flex-wrap font-semibold gap-4 justify-center items-center'>
                        <span><FiInfo/></span> 
                        {/* <span>Are You Sure ?</span> */}
                        {docStatus == 'Verified' && <span>Verify Document ?</span>}
                        {docStatus == 'Rejected' && <span>Reject Document ?</span>}
                    </div>
                    <div className='flex flex-col flex-wrap gap-1 justify-center w-full px-4'>
                        <span className='text-sm font-semibold'>Comment :</span>
                        <textarea type="text" name="docRemarks" id="" className="form-control block px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md text-xs" placeholder='Enter your comments here...' rows={2} onChange={(e) => setdocRemarks(e.target.value)} />
                    </div>

                    <div className='flex flex-wrap justify-center items-center px-6 md:px-10'>
                       {docStatus == 'Verified' && <button type="submit" className="px-4 py-2 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => submitData()}>Verify</button>}

                       {docStatus == 'Rejected' && <button type="submit" className="px-4 py-2 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => submitData()}>Reject</button>}

                        {/* <button type="submit" className=" px-4 py-2 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={closeModal}>No</button> */}
                    </div>

                </div>

            </Modal>

            <Modal
                isOpen={modalIsOpen2}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-xl border-2 border-gray-50 ml-32 px-0" style={{ 'width': '60vw', 'height': '80vh' }}>
                <div className="absolute top-10  bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross/>
                  </div>
                    <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
                </div>

                <div className="absolute bottom-10 text-center right-[40%] text-sm">
                    {props?.docList?.verify_status == 0 && <div className="flex gap-4">
                        <button onClick={() => verifyAction("Verified", props?.docList?.id)} className='flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center'>
                            Verify
                        </button>
                        <button onClick={() => verifyAction("Rejected", props?.docList?.id)} className='flex-initial bg-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex'>
                            Reject
                        </button>
                    </div>}
                </div>

            </Modal>

        </>
    )
}

export default PropertySafDocumentVeriyRow
