import { useState } from 'react'
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
    }
};
// Modal.setAppElement('#root');
Modal.setAppElement('#modal');
function FormSubmitError() {
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
    }
    function closeModal() {
        // document.getElementById('root').style.filter='none'
        setIsOpen(false);
    }

    return (
        <>
            <button className="" onClick={openModal}>open modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="relative bg-white rounded-lg shadow-2xl border-2 border-gray-50 rounded" >
                    <div className="p-10 px-10 md:w-96 bg-red-500  text-center">
                        <h1 className="text-white text-lg font-semibold">Something Went Wrong</h1>
                        <FiAlertCircle className='text-white mx-auto text-5xl mb-5 mt-5' />
                        
                            <h1 className='font-semibold text-gray-200'>Error.......</h1>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FormSubmitError