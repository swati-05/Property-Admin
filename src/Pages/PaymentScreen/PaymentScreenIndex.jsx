import { useState } from 'react'
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

function PaymentScreenIndex() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loaderStatus, setloaderStatus] = useState('visible')

    const openModal = () => setIsOpen(true)
    const closeModal = () => {
        setIsOpen(false)
        setloaderStatus('visible')
    }


    return (
        <>
            <button onClick={openModal} className='flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center mb-10'>
                Pay Tax
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-xl border-2 border-gray-50 ml-32 px-0" style={{ 'width': '70vw', 'height': '80vh' }}>
                    <div className={`${loaderStatus} absolute left-1/2 top-1/2`}>
                        <div className={`w-12 h-12 rounded-full border-l-2 border-t-2 border-indigo-600 animate-spin`}>
                        </div>
                        <div>Loading ...</div>
                    </div>
                    <iframe onLoad={() => setloaderStatus('invisible')} className='w-full h-full' src={`https://rzp.io/l/735Hz3c`} frameborder="0"></iframe>
                </div>

            </Modal>
        </>
    )
}

export default PaymentScreenIndex