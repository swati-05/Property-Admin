//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import dummy from './dummy.pdf'
import PropertySafDocumentVerifyRow from './PilotWorkflowDocumentVerifyRow';
import axios from 'axios';
import ApiHeader from '@/Components/ApiList/ApiHeader'
import BarLoader from '@/Components/Common/BarLoader';
import { IoIosArrowRoundForward } from 'react-icons/io'


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
function PilotWorkflowDocumentVerify(props) {

    const [docList, setDocList] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('')
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(0)
    let subtitle;

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }


    useEffect(() => {
        setloader(true)
        console.log("before document verify fetch ", props?.id)

        let requestBody = {
            applicationId: props?.id
        }
        axios[props?.api?.api_documentList?.method](props?.api?.api_documentList?.url, requestBody, ApiHeader())
            .then((res) => {
                console.log("getting doc status and verify in doc verify===========> ", res)
                setDocList(res?.data?.data)
                // SETTING ALL DOC VERIFY STATUS TO RESTRICT SEND LEVEL
                props?.setallDocumentVerifyStatus(res?.data?.message?.docVerifyStatus)
                setloader(false)
            })
            .catch((err) => {
                console.log("getting doc status and verify in doc verify error  ===========> ", err)
                setloader(false)
            })
    }, [refresh])

    const modalAction = (incomingDocUrl) => {
        setDocUrl(incomingDocUrl)
        openModal()
    }

    console.log("🚀document api at document verify component", props?.api);

    return (
        <>
            {/* <PropertyDaDetailsCard applicationData={applicationData} /> */}

            {loader && <BarLoader />}
            <div className="px-4 font-semibold font-serif w-full">
                <span></span>
                {/* {props?.allDocumentVerifyStatus == 1 &&
                    <button
                        onClick={(e) => props?.handleChangeTabs(e, 2)}
                        type="button"
                        className="float-right px-4 py-1.5 bg-indigo-500 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Forward/BTC <IoIosArrowRoundForward className="inline font-bold text-xl" />
                    </button>
                } */}
            </div>

            <div className="container mx-auto  max-w-3xl ml-0  px-1 py-1 shadow-lg rounded-lg">
                <div className="py-0">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
                        <div className="inline-block min-w-full rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead className='bg-sky-100'>
                                    <tr className='font-semibold'>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            #
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            Document Name
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            View
                                        </th>
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            Status
                                        </th>
                                        {/* <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            Actions
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {docList?.length == 0 && <tr><td colSpan={5} className="text-center"><span className='bg-red-200 text-sm text-red-400 italic my-4 px-4 py-2 rounded-md shadow-lg'>No Document Found !!</span></td></tr>}

                                    {
                                        docList?.map((data, index) => (
                                            <PropertySafDocumentVerifyRow api={props?.api} openModal={modalAction} id={props?.id} docList={data} index={index} refresh={() => setrefresh(refresh + 1)} />
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

export default PilotWorkflowDocumentVerify
