//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////


import React, { useContext ,useEffect, useState} from 'react'
import Modal from 'react-modal';
import dummy from './dummy.pdf'
import PropertySafDocumentVerifyRow from './PropertySafDocumentVerifyRow';
import axios from 'axios';
import apiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import {toast, ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {FcDocument} from 'react-icons/fc'
import { ColorRing } from "react-loader-spinner";

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
function PropertySafDocumentVerify(props) {
    const [docList, setDocList] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('')
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(0)
    let subtitle;

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    const {getSafVerify} = apiList()

    useEffect(() => {
        setloader(true)
        console.log("doc verify id => ", props?.id)
      axios.get(getSafVerify + "/" + props?.id, ApiHeader())
      .then((res) => {
        console.log("getting doc status and verify in doc verify===========> ", res)
        setDocList(res?.data?.data?.uploadDocument)
        setloader(false)
      })
      .catch((err) => {
        console.log("getting doc status and verify in doc verify error  ===========> ", err)
        setloader(false)
    })
    },[refresh])

    const modalAction = (incomingDocUrl) => {
        setDocUrl(incomingDocUrl)
        openModal()
    }
    
    console.log("🚀 ~ file: PropertySafDocumentVerify.js:27 ~ PropertySafDocumentVerify ~ docList", docList);

    return (
        <>
            {/* <PropertyDaDetailsCard applicationData={applicationData} /> */}

            {loader && (
          <div className="inline">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}

            <div className="container mx-auto  max-w-3xl ml-0  px-1 py-1 shadow-lg rounded-lg">
                <div className="py-0">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                        <div className="inline-block min-w-full rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead className='bg-sky-100'>
                                    <tr className='font-semibold'>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            #
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Document Name
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            View
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Status
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {docList?.length <= 1 && <tr><td colSpan={5} className="text-center"><span className='bg-red-200 text-sm text-red-400 italic my-4 px-4 py-2 rounded-md shadow-lg'>No Document Found !!</span></td></tr>}

                                    {
                                        docList?.map((data, index) => (
                                            <PropertySafDocumentVerifyRow openModal={modalAction} docList={data} index={index} refresh={() => setrefresh(refresh+1)} />
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-xl border-2 border-gray-50 ml-32 px-0" style={{ 'width': '60vw', 'height': '80vh' }}>
                    <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
                </div>

            </Modal>
        </>
    )
}

export default PropertySafDocumentVerify
