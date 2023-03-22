//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - HeaderIcons
//    DESCRIPTION - HeaderIcons Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsBell } from 'react-icons/bs'
import { connect } from "react-redux";
import { FiAlertCircle } from 'react-icons/fi'
import { BsCart4 } from 'react-icons/bs'
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

function HeaderIcons(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pingStatus, setPingStatus] = useState(true)
  let subtitle;
  const iconFlex = `bg-gray-100 p-2 rounded-lg cursor-pointer hover:scale-105`

  //auto stop ping of application notification after 10 seconds
  setTimeout(() => {
    setPingStatus(false)
  }, 10000);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate()
  const rightNavToggle = () => {
    // setnavClose(true)

    !props.RightNavCloseStatus && props.RIGHT_NAV_CLOSE()
    props.RightNavCloseStatus && props.RIGHT_NAV_OPEN()
    // if (props.RightNavCloseStatus == false) {
    //   props.RIGHT_NAV_CLOSE()
    // } else {
    //   props.RIGHT_NAV_OPEN()

    // }
  }


  const logOutUser = () => {
    window.localStorage.removeItem('menuList')
    window.localStorage.removeItem('userName')
    window.localStorage.removeItem('roles')
    window.localStorage.removeItem('token')
    props.LOGOUT()
    navigate('/')
  }
  return (
    <>
      <div className="grid grid-cols-12 place-items-center h-full pr-12">
        {/* <div className='cursor-pointer col-start-1 sm:col-start-9' ><div className='bg-gray-100 p-2 rounded-lg relative'><BsBell color='black' size={16} /><RippleAnimation/></div></div> */}
        <div className='cursor-pointer col-start-1 sm:col-start-8 -ml-10' ><div onClick={openModal} className='bg-red-100 p-2 rounded-lg relative'><div className={`absolute -left-3 -top-3 bg-red-500 w-7 h-7 rounded-full p-1 text-white font-semibold shadow-lg ${pingStatus?'animate-ping visible':'invisible'}`} style={{'fontSize':'10px'}}></div> <div className='absolute -left-2 -top-2  font-sans  bg-red-600 rounded-full p-1 text-white font-semibold shadow-lg' style={{'fontSize':'10px'}}>20</div><BsCart4 className='' color='black' size={16} /></div></div>
        <div className='cursor-pointer' ><div  onClick={openModal} className='bg-gray-100 p-2 rounded-lg relative'><BsBell color='black' size={16} /></div></div>
        <div className='cursor-pointer ml-8' ><div className='bg-gray-100 p-2 rounded-lg '><AiOutlineUser color='black' size={16} /></div></div>
        <div className='cursor-pointer' onClick={rightNavToggle}><div className='bg-gray-100 p-2 rounded-lg ml-16'><BsThreeDotsVertical color='black' size={16} /></div></div>

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
            <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-6 text-center">
            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout ?</h3>
            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
              Yes, I'm sure
            </button>

          </div>
        </div>

      </Modal>
    </>
  )

  //.......................................v2.......................................
  // return (
  //   <>
  //     <div className="flex h-full md:pr-12 justify-end items-center bg-green-200 gap-x-2">
  //       <div onClick={openModal} className='bg-red-100 p-2 rounded-lg relative'><div className={`absolute -left-3 -top-3 bg-red-500 w-7 h-7 rounded-full p-1 text-white font-semibold shadow-lg ${pingStatus ? 'animate-ping visible' : 'invisible'}`} style={{ 'fontSize': '10px' }}></div> 
  //       <div className='absolute -left-2 -top-2  font-sans  bg-red-600 rounded-full p-1 text-white font-semibold shadow-lg' style={{ 'fontSize': '10px' }}>20</div><BsCart4 className='' color='black' size={16} /></div>

  //       <div onClick={openModal} className={iconFlex}><BsBell color='black' size={16} /></div>
  //       <div className={iconFlex}><AiOutlineUser color='black' size={16} /></div>
  //       <div className={iconFlex}><BsThreeDotsVertical color='black' size={16} /></div>

  //     </div>
  //     <Modal
  //       isOpen={modalIsOpen}
  //       onAfterOpen={afterOpenModal}
  //       onRequestClose={closeModal}
  //       style={customStyles}
  //       contentLabel="Example Modal"
  //     >

  //       <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
  //         <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
  //           <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
  //         </button>
  //         <div class="p-6 text-center">
  //           <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
  //           <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout ?</h3>
  //           <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
  //             Yes, I'm sure
  //           </button>

  //         </div>
  //       </div>

  //     </Modal>
  //   </>
  // )
}

//for redux
const mapStateToProps = (state) => {
  return {
    RightNavCloseStatus: state.RightNavCloseStatus,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // buyCake: () => dispatch(buyCake())
    RIGHT_NAV_OPEN: (data2) => dispatch({ type: "RIGHT_NAV_OPEN" }),
    LOGOUT: (data2) => dispatch({ type: "LOGOUT" }),
    RIGHT_NAV_CLOSE: (data3) => dispatch({ type: "RIGHT_NAV_CLOSE" })
  };
};



// export default HeaderIcons
export default connect(mapStateToProps, mapDispatchToProps)(HeaderIcons);
/**
 * Exported to :
 * 1. Header component
 * 
 */