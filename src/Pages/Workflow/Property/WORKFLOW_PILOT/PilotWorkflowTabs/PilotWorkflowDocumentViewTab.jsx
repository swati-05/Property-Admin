//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'
import PilotWorkflowDocumentRow from "./PilotWorkflowDocumentRow"
import Modal from 'react-modal';
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios';
import { ImCross } from 'react-icons/im';
import BarLoader from '@/Components/Common/BarLoader';

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
function PropertySafDocumentView(props) {


    const [docList, setDocList] = useState()
    const [loader, setloader] = useState(false);

    useEffect(() => {
        setloader(true)
        console.log("before document fetch ", props?.id)
        let requestBody = {
            applicationId:props?.id
        }
      axios[props?.api?.api_documentList?.method](props?.api?.api_documentList?.url ,requestBody, ApiHeader())
      .then((res) => {
        console.log("document list at pilotworkflowdocumentview ", res)
        setDocList(res?.data?.data)
        setloader(false)
      })
      .catch((err) => {
        console.log("error at pilotworkflowdocumentview ", err)
        setloader(false)
      })

    },[])


    const [modalIsOpen, setIsOpen] = useState(false);
    const [docUrl, setDocUrl] = useState('')
    let subtitle;

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    const modalAction = (incomingDocUrl) => {
        console.log('incoming doc url modal => ', incomingDocUrl)
        setDocUrl(incomingDocUrl)
        openModal()
    }

    console.log('doucment api at document view mr', props?.api)

    return (
        <>
         {loader &&  <BarLoader/>}

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
                                        <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm capitalize">
                                            Remarks
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {(docList?.length == 0 && !loader) && <tr className='mt-5'><td colSpan={5} className="text-center"><span className='bg-red-200 text-sm text-red-400 italic my-4 px-4 py-2 rounded-md shadow-lg'>No Document Found !!</span></td></tr>}
                                {
                                        docList?.map((data, index) => (
                                            <PilotWorkflowDocumentRow api={props?.api} openModal={modalAction} docList={data} index={index} />
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
                <div className="absolute top-10  bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross/>
                  </div>
                    <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
                </div>

            </Modal>
        </>
    )
}

export default PropertySafDocumentView
