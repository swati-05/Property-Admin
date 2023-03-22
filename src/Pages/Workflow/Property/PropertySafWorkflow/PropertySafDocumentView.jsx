//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'
import PropertySafDocumentRow from "./PropertySafDocumentRow"
import Modal from 'react-modal';
import apiList from '@/Components/ApiList/PropertyApiList'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios';
import { ColorRing } from "react-loader-spinner";
import { ImCross } from 'react-icons/im';

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

    const {getSafVerify} = apiList()

    const [docList, setDocList] = useState()
    const [loader, setloader] = useState(false);

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
    },[props?.id])

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

    console.log('doc url modal => ', docUrl)

    return (
        <>
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
                                            Remarks
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {(docList?.length == 0 && !loader) && <tr><td colSpan={5} className="text-center"><span className='bg-red-200 text-sm text-red-400 italic my-4 px-4 py-2 rounded-md shadow-lg'>No Document Found !!</span></td></tr>}
                                {
                                        docList?.map((data, index) => (
                                            <PropertySafDocumentRow openModal={modalAction} docList={data} index={index} />
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
