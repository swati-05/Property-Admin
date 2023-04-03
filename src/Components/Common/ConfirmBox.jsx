import React, { useState,useEffect } from 'react'
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'


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
function ConfirmBox(props) {
    const [modalIsOpen, setIsOpen] = useState(true);


    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (props?.confirmBoxOpenStatus) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [])

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                    <button onClick={() => props?.setconfirmBoxOpenStatus(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
                        <svg className="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div className="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 darks:text-gray-400">Are you sure you want to logout ?</h3>
                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darks:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={''}>
                            Yes, I'm sure
                        </button>

                    </div>
                </div>

            </Modal>
        </>
    )
}

export default ConfirmBox