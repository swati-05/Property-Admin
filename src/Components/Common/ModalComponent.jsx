//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ModalComponent
//    DESCRIPTION - ModalComponent Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from 'react'
import Modal from 'react-modal';


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

function ModalComponent(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        (props.openState != 0 && openModal())
    }, [props.openState])

    return (
        <>
            {/* <button className='bg-indigo-500 text-white shadow rounded-sm' onClick={openModal}>open modal</button> */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                    {props.children}
                </div>

            </Modal>
        </>
    )
}

export default ModalComponent