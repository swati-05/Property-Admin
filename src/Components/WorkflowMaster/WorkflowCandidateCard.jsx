import { useState } from 'react'
import user from '@/Components/MailboxComponent/user.jpg'
import { TiDeleteOutline } from 'react-icons/ti'
import Modal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'

// style for modal
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
function WorkflowCandidateCard(props) {
  const [modalIsOpen, setIsOpen] = useState(false); //manages modal open close state
  const [removeCanidateName, setRemoveCanidateName] = useState('') //holds the id of candidate which has to be removed

  let subtitle;

  //workflow candidate remove modal call
  function openModal(name) {
    setRemoveCanidateName(name) //setting remove candidate name
    setIsOpen(true); //opening remove candidate confirmation modal
  }
  function closeModal() {
    setIsOpen(false); //closiing remove candidate confirmation modal
  }
  function afterOpenModal() {
  }
  return (
    <>
      <div className="flex shadow-xl border border-white md:w-2/4 items-center rounded-lg bg-gray-100 mt-3 relative">
        <div className='absolute -left-5 text-sm'>{props.index}</div>
        <div className="flex-initial"><img className='h-10 w-10 rounded-full' src={user} alt="" /></div>
        <div className="flex-1 ml-2 font-mono font-semibold text-sm">{props.name}</div>
        <div className="flex-1 text-sm"><span className='bg-indigo-200 px-2 rounded-lg text-gray-800'>general</span></div>
        <div className="flex-initial md:mr-5 shadow-xl cursor-pointer" onClick={() => openModal(props.name)}><TiDeleteOutline className='text-red-500 text-2xl' /></div> {/**calling remove candidate confirmation modal and passing candidate name */}
      </div>

    {/** remove candidate modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative bg-white rounded-lg shadow-xl border-2 border-gray-50" >
          <div className="p-10 px-10 md:w-96 bg-red-600  text-center">
            <h1 className="text-white">Do you want to remove <b><i>{removeCanidateName}</i></b> from workflow ?</h1>
            <button className="bg-white text-red-800 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-red-900 hover:text-white hover:shadow-3xl md:mr-3 font-semibold"><MdDeleteForever className="inline" />Delete</button>
            <button onClick={closeModal} className="bg-gray-400 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-gray-700 hover:shadow-2xl md:ml-3"><TiCancel className="inline text-2xl" />Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default WorkflowCandidateCard