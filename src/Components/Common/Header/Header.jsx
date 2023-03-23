//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Header
//    DESCRIPTION - Header Component
//////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LogoText from './LogoText'
import NavButton from './NavButton'
import HeaderIcons from './HeaderIcons'
import { connect } from "react-redux";
import { BiLogOutCircle } from 'react-icons/bi'
import { BsBell } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import Modal from 'react-modal';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import NotificationComponent from './NotificationComponent'
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



// function Header() {
//   const location = useLocation();


//   return (
//     <>
//       {
//         ((location.pathname != '/landing') && (location.pathname != '/') && (location.pathname != '/error')) && <div className="grid grid-cols-12 w-100 px-0 h-16 bg-white shadow-xl  z-50 relative animate__animated animate__fadeInDown" >
//           {/* LogoText contains municipal logo and text */}
//           <div className="hidden sm:block col-span-0 sm:col-span-2"> <LogoText /></div>
//           {/* NavButton contains action button to open or close Sidebar */}
//           <div className='col-span-9 sm:col-span-3 place-items-center'><NavButton /></div>
//           {/* HeaderIcons contains action icons */}
//           <div className='col-span-3 place-items-center col-start-10'><HeaderIcons /></div>

//         </div>
//       }

//     </>
//   )

// }

// export default Header
function Header(props) {
  const location = useLocation();
  const [navClose, setnavClose] = useState(false)
  const [tootlTipId, settootlTipId] = useState(null)
  const [notificationState, setnotificationState] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const navToggle = () => {
    if (!props.navCloseStatus) {
      props.NAV_CLOSE()
      props.NAV_CLOSE_ORIGINAL_STATUS()
    }
    if (props.navCloseStatus) {
      props.NAV_OPEN()
      props.NAV_OPEN_ORIGINAL_STATUS()

    }
  }

  const logOutUser = () => {
    closeModal()
    window.localStorage.removeItem('menuList')
    window.localStorage.removeItem('userName')
    window.localStorage.removeItem('roles')
    window.localStorage.removeItem('token')
    props.LOGOUT()
    navigate('/')
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const removeNotification = (id) => {
    console.log(`${id} has been removed`)
  }

  const [module, setmodule] = useState('property')

  const handleModule = () => {
    window.location.replace(`/${module}`)
  }

  return (
    <>


      {((location.pathname != '/landing') && (location.pathname != '/') && (location.pathname != '/error')) && <div className="flex flex-col transition-all duration-500 ease-in-out ">
        {/* Navbar */}
        <nav className="w-full bg-white z-50 fixed flex flex-row flex-nowrap items-center justify-between mt-0 py-2  px-6 darks:bg-gray-800 shadow-sm transition-all duration-500 ease-in-out" id="desktop-menu">
          <div className='flex items-center'>
          <div class=" text-center py-3">
            <a href="#" class="relative">
              <h2 class="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden hidden-compact">
                <span class="text-gray-700 darks:text-gray-200">UD&HD</span>
              </h2>
              <h2 class="text-3xl font-semibold mx-auto logo-compact hidden">
                <Tooltip anchorId="navButton_icon2" />
                <svg id='navButton_icon2' data-tooltip-content="Click to Toggle Sidebar" onClick={navToggle} xmlns="http://www.w3.org/2000/svg" class="inline-block w-7 h-7 -mt-1" viewBox="0 0 300.000000 300.000000">
                  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                    <path class="text-pink-500" d="M1225 2825 c-546 -115 -959 -534 -1065 -1080 -28 -147 -28 -373 0
                  -520 81 -419 350 -774 728 -964 115 -58 120 -58 65 3 -27 29 -65 84 -85 122
                  -68 131 -90 236 -89 428 0 229 44 470 167 923 41 149 74 275 74 278 0 4 -102
                  5 -227 3 -198 -4 -236 -7 -290 -25 -35 -12 -63 -18 -63 -14 0 4 22 43 49 87
                  58 93 123 157 177 175 22 6 124 14 234 16 l195 5 33 112 c91 305 200 431 405
                  465 43 7 31 9 -73 9 -94 1 -152 -5 -235 -23z"/>
                    <path class="text-indigo-500" d="M1695 2763 c-48 -77 -122 -231 -179 -375 -25 -65 -46 -120 -46 -123
                  0 -7 995 -6 1069 1 34 4 61 12 61 18 0 6 -30 46 -65 88 -170 201 -426 361
                  -687 428 -110 29 -111 28 -153 -37z"/>
                    <path class="text-indigo-500" d="M2660 2104 c-33 -36 -54 -47 -120 -67 -21 -6 -256 -12 -595 -16
                  l-560 -6 -51 -180 c-62 -215 -116 -445 -144 -608 -74 -435 -37 -655 124 -740
                  62 -32 189 -30 274 5 174 72 337 212 410 353 l20 40 24 -50 c32 -70 32 -162
                  -1 -229 -48 -97 -216 -250 -383 -347 -86 -51 -170 -85 -261 -109 l-69 -17 94
                  -6 c469 -33 947 205 1214 605 229 342 291 790 163 1173 -24 70 -76 192 -94
                  217 -10 16 -14 14 -45 -18z"/>
                  </g>
                </svg>
              </h2>
            </a>
          </div>

          <form className="hidden sm:inline-block md:hidden lg:inline-block mx-5">
            <div className="flex flex-wrap items-stretch w-full relative">
              <select onChange={(e) => setmodule(e.target.value)} className="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-2 px-4 ltr:rounded-l rtl:rounded-r text-gray-800 bg-gray-100 overflow-x-auto focus:outline-none border border-gray-100 focus:border-gray-200 focus:ring-0 darks:text-gray-400 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600" placeholder="Search…" aria-label="Search" >
                <option value="property">Property</option>
                <option value="water">Water</option>
                <option value="trade">Trade</option>
                <option value="advertisement">Advertisement</option>
              </select>
              <div className="flex -mr-px">
                <button onClick={() => handleModule()} className="flex items-center py-2 px-4 ltr:-ml-1 rtl:-mr-1 ltr:rounded-r rtl:rounded-l leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                </button>
              </div>
            </div>
          </form>

                   {/* sidenav button*/}
          <Tooltip anchorId="navButton_icon" />
          <button id='navButton_icon' data-tooltip-content="Click to Toggle Sidebar" onClick={navToggle} type="button" className="inline-flex items-center justify-center text-gray-800 hover:text-gray-600 darks:text-gray-300 darks:hover:text-gray-200 focus:outline-none focus:ring-0" aria-controls="sidebar-menu" aria-expanded="false" >
            <span className="sr-only">Mobile menu</span>
            <svg className="hidden h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path className="hidden md:block" fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              <path className="md:hidden" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
            <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path className="md:hidden" fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              <path className="hidden md:block" d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
            {/* <i class="text-2xl fas fa-bars"></i> */}
          </button>

          </div>

 
          {/* Search */}
          <form className="hidden sm:inline-block md:hidden lg:inline-block mx-5">
            {/* <div className="flex flex-wrap items-stretch w-full relative">
              <input type="text" className="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-2 px-4 ltr:rounded-l rtl:rounded-r text-gray-800 bg-gray-100 overflow-x-auto focus:outline-none border border-gray-100 focus:border-gray-200 focus:ring-0 darks:text-gray-400 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600" placeholder="Search…" aria-label="Search" />
              <div className="flex -mr-px">
                <button className="flex items-center py-2 px-4 ltr:-ml-1 rtl:-mr-1 ltr:rounded-r rtl:rounded-l leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                </button>
              </div>
            </div> */}
          </form>
          {/* menu */}
          <ul className="flex ltr:ml-auto rtl:mr-auto mt-2 ">
            {/* Customizer (Only for demo purpose) */}
            <li x-data="{ open: false }" className="relative">
              <a href="javascript:;" className="py-3 px-4 flex text-sm rounded-full focus:outline-none" aria-controls="mobile-canvas" aria-expanded="false" >
                <span className="sr-only">Customizer</span>
                <Tooltip anchorId='logout_button' />
                <BiLogOutCircle id='logout_button' data-tooltip-content="Click to Logout User." onClick={openModal} className="inline text-2xl font-semibold" />
                {/* <i class="text-2xl fas fa-cog"></i> */}
              </a>
              {/* Right Offcanvas */}
              <div className="fixed w-full h-full inset-0 z-50 bg-red-600" id="mobile-canvas" x-description="Mobile menu" x-show="open" style={{ display: 'none' }}>
                {/* bg open */}
                <span className="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0" />
                <nav id="mobile-nav" className="flex flex-col ltr:right-0 rtl:left-0 w-72 fixed top-0 bg-white darks:bg-gray-800 h-full overflow-auto z-40 scrollbars show" >
                  <div className="p-6 bg-indigo-500 text-gray-100 border-b border-gray-200 darks:border-gray-700">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-md font-bold">Customizer</h3>
                      <button type="button" className="inline-block w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block text-gray-100 bi bi-x-lg" viewBox="0 0 16 16" id="x-lg"><path d="M1.293 1.293a1 1 0 011.414 0L8 6.586l5.293-5.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z" /></svg>
                        {/* <i class="fas fa-times"></i> */}
                      </button>
                    </div>
                  </div>
                  <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                    <p className="text-base text-semibold">Color Scheme</p>
                    <div className="flex flex-row">
                      <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="lightdark" id="lightdark" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                        <label htmlFor="lightdark" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                      </div>
                      <p className="text-sm text-gray-500 self-center">Light and Dark</p>
                    </div>
                  </div>
                  <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                    <p className="text-base text-semibold">Sidebar Color</p>
                    <div className="flex flex-row">
                      <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="sidecolor" id="sidecolor" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                        <label htmlFor="sidecolor" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                      </div>
                      <p className="text-sm text-gray-500 self-center">Light and Dark</p>
                    </div>
                  </div>
                  <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                    <p className="text-base text-semibold">Direction</p>
                    <div className="flex flex-row">
                      <div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="rtlmode" id="rtlmode" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white darks:bg-gray-900 border-2 darks:border-gray-700 appearance-none cursor-pointer" />
                        <label htmlFor="rtlmode" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 darks:bg-gray-700 cursor-pointer" />
                      </div>
                      <p className="text-sm text-gray-500 self-center">LTR and RTL</p>
                    </div>
                  </div>
                  <div className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                    <p className="text-base text-semibold">Layout</p>
                    <div className="relative mb-3">
                      <a href="index.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Default</a>
                      <a href="layout-compact.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Compact</a>
                      <a href="layout-topnav.html" className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 darks:bg-gray-900 darks:bg-opacity-20 darks:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center">Topnav</a>
                    </div>
                  </div>
                  <div id="customcolor" className="py-3 px-6 border-b border-gray-200 darks:border-gray-700">
                    <p className="text-base text-semibold">Primary Color</p>
                    <div className="relative my-3">
                      <div id="custred" title="red" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-red-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custyellow" title="yellow" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-yellow-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custgreen" title="green" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-green-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custblue" title="blue" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-blue-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custpurple" title="purple" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-purple-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custpink" title="pink" className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-pink-500 hover:opacity-90 rounded-full cursor-pointer" />
                      <div id="custindigo" title="reset color" className="inline-block cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg></div>
                    </div>
                  </div>
                  <div className="pt-6 px-6">
                    <div x-data="{ open: true }" x-show="open" className="flex justify-between items-center relative bg-yellow-100 text-yellow-900 p-3 rounded-lg mb-4">
                      <div>
                        How to apply? please read the documentation on <a href="docs/customize.html" className="underline font-semibold">Customize page</a>
                      </div>
                      <button type="button" >
                        <span className="text-2xl">×</span>
                        {/* <i class="fas fa-times"></i> */}
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </li>{/* End Customizer (Only for demo purpose) */}
            {/* messages */}
            <li x-data="{ open: false }" className="relative">
              <a href="javascript:;" className="py-3 px-4 flex text-sm rounded-full focus:outline-none" id="messages" >
                <div className="relative inline-block">
                  <Tooltip anchorId="notification_icon" />
                  <BsBell id='notification_icon' data-tooltip-content="Show all notifications." onClick={() => setnotificationState(true)} className="inline text-2xl font-semibold" />
                  <span className="flex justify-center absolute -top-2 ltr:-right-1 rtl:-left-1 text-center bg-pink-500 px-1 text-white rounded-full text-xs"><span className="align-self-center">3</span></span>
                </div>
              </a>
              <div x-show="open" className="w-72 origin-top-right absolute ltr:-right-36 md:ltr:right-0 rtl:-left-36 md:rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white darks:bg-gray-800 border darks:border-gray-700 shadow-md" style={{ display: 'none' }}>
                <div className="p-3 font-normal border-b border-gray-200 darks:border-gray-700">
                  <div className="relative">
                    <div className="font-bold">Messages</div>
                    <div x-data="{ open: false }" className="absolute top-0 ltr:right-0 rtl:left-0">
                      <a href="javascript:;" className="inline-block ltr:mr-2 rtl:ml-2" title="Search message">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-4 h-4 bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        {/* <i class="fas fa-search"></i> */}
                      </a>
                      <div x-show="open" className="origin-top-right absolute ltr:right-0 rtl:left-0 bg-white darks:bg-gray-700 z-10 rounded" style={{ minWidth: '16rem' }}>
                        <form className="inline-block w-full">
                          <div className="flex flex-wrap items-stretch w-full relative">
                            <input type="text" className="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-2 px-4 ltr:rounded-l rtl:rounded-r text-gray-800 bg-gray-100 overflow-x-auto focus:outline-none border border-gray-100 focus:border-gray-200 focus:ring-0 darks:text-gray-400 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600" placeholder="Search messages…" aria-label="Search" />
                            <div className="flex -mr-px">
                              <button className="flex items-center py-2 px-4 ltr:-ml-1 rtl:-mr-1 ltr:rounded-r rtl:rounded-l leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <a href="#" className="inline-block ltr:mr-2 rtl:ml-2" title="Mark all as read">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-4 h-4 bi bi-envelope-open" viewBox="0 0 16 16">
                          <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z" />
                        </svg> */}
                        {/* <i class="fas fa-envelope-open"></i> */}
                      </a>
                      <a href="#" className="inline-block ltr:mr-2 rtl:ml-2" title="New message">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                        {/* <i class="fas fa-edit"></i> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto scrollbars show">
                  <a href="#">
                    <div className="flex flex-wrap flex-row items-center border-b border-gray-200 darks:border-gray-700 darks:bg-gray-900 darks:bg-opacity-40 darks:hover:bg-opacity-20 py-2 hover:bg-gray-100 bg-gray-50">
                      <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                        <div className="relative">
                          <img src="src/img/avatar/avatar2.png" className="h-10 w-10 rounded-full mx-auto" alt="Daniel Esteban" />
                          <span title="online" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-green-500 border border-white w-3 h-3 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-shrink max-w-full px-2 w-3/4">
                        <div className="text-sm font-bold">Daniel Esteban</div>
                        <div className="text-gray-500 text-sm mt-1">What do you think about this project?</div>
                        <div className="text-gray-500 text-sm mt-1">12m ago</div>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex flex-wrap flex-row items-center border-b border-gray-200 darks:border-gray-700 darks:bg-gray-900 darks:bg-opacity-40 darks:hover:bg-opacity-20 py-2 hover:bg-gray-100 bg-gray-50">
                      <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                        <div className="relative">
                          <img src="src/img/avatar/avatar3.png" className="h-10 w-10 rounded-full mx-auto" alt="Carlos Garcia" />
                          <span title="busy" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-pink-500 border border-white w-3 h-3 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-shrink max-w-full px-2 w-3/4">
                        <div className="text-sm font-bold">Carlos Garcia</div>
                        <div className="text-gray-500 text-sm mt-1">Hello, how are you friends?</div>
                        <div className="text-gray-500 text-sm mt-1">30m ago</div>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex flex-wrap flex-row items-center border-b border-gray-200 darks:border-gray-700 darks:bg-gray-900 darks:bg-opacity-40 darks:hover:bg-opacity-20 py-2 hover:bg-gray-100 bg-gray-50">
                      <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                        <div className="relative">
                          <img src="src/img/avatar/avatar4.png" className="h-10 w-10 rounded-full mx-auto" alt="Steven Rey" />
                          <span title="offline" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-gray-500 border border-white w-3 h-3 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-shrink max-w-full px-2 w-3/4">
                        <div className="text-sm font-bold">Steven Rey</div>
                        <div className="text-gray-500 text-sm mt-1">Thank you for your help today.</div>
                        <div className="text-gray-500 text-sm mt-1">4h ago</div>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className="flex flex-wrap flex-row items-center border-b border-gray-200 darks:border-gray-700 darks:hover:bg-gray-900 darks:hover:bg-opacity-20 py-2 hover:bg-gray-100">
                      <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                        <div className="relative">
                          <img src="src/img/avatar/avatar.png" className="h-10 w-10 rounded-full mx-auto" alt="Roman Davis" />
                          <span title="offline" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-gray-500 border border-white w-3 h-3 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-shrink max-w-full px-2 w-3/4">
                        <div className="text-sm font-bold">Roman Davis</div>
                        <div className="text-gray-500 text-sm mt-1">Do you have time? I want to call you.</div>
                        <div className="text-gray-500 text-sm mt-1">5h ago</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-3 text-center font-normal">
                  <a href="#" className="hover:underline">Show all Messages</a>
                </div>
              </div>
            </li>
            {/* notification */}

            {/* profile */}
            <li x-data="{ open: false }" className="relative">
              <a href="javascript:;" className="px-3 flex text-sm rounded-full focus:outline-none" id="user-menu-button" >
                <div className="relative">
                  <img className="h-10 w-10 rounded-full border border-gray-700 bg-gray-700" src="src/img/avatar/avatar.png" alt="avatar" />
                  <span title="online" className="flex justify-center absolute -bottom-0.5 ltr:right-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full" />
                </div>
                <span className="hidden md:block ltr:ml-1  self-center">Ari Budin</span>
              </a>
              <ul x-show="open" className="origin-top-right absolute ltr:right-0  rounded top-full z-50 py-0.5 ltr:text-left  bg-white darks:bg-gray-800 border darks:border-gray-700 shadow-md" style={{ minWidth: '12rem', display: 'none' }}>
                <li className="relative">
                  <div className="flex flex-wrap flex-row -mx-4 px-3 py-4 items-center">
                    <div className="flex-shrink max-w-full px-4 w-1/3">
                      <img src="src/img/avatar/avatar.png" className="h-10 w-10 rounded-full" alt="Ari Budin" />
                    </div>
                    <div className="flex-shrink max-w-full px-4 w-2/3 ltr:pl-1 rtl:pr-1">
                      <div className="font-bold"><a href="#" className=" text-gray-800 darks:text-gray-300 hover:text-indigo-500">Ari Budin</a></div>
                      <div className="text-gray text-sm mt-1">Professional Front end developer.</div>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <hr className="border-t border-gray-200 darks:border-gray-700 my-0" />
                </li>
                <li className="relative">
                  <a className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline ltr:mr-2 rtl:ml-2 w-4 h-4 bi bi-gear" viewBox="0 0 16 16">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                    </svg>
                    {/* <i class="mr-2 fas fa-cog"></i> */} Settings &amp; Privacy
                  </a>
                </li>
                <li className="relative">
                  <a className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline ltr:mr-2 rtl:ml-2 w-4 h-4 bi bi-question-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                    {/* <i class="mr-2 fas fa-question-circle"></i> */} Help &amp; Support
                  </a>
                </li>
                <li className="relative">
                  <a className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline ltr:mr-2 rtl:ml-2 w-4 h-4 bi bi-translate" viewBox="0 0 16 16">
                      <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                      <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                    </svg>
                    {/* <i class="mr-2 fas fa-language"></i> */} Change Language
                  </a>
                </li>
                <li className="relative">
                  <hr className="border-t border-gray-200 darks:border-gray-700 my-0" />
                </li>
                <li className="relative">
                  <a className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline ltr:mr-2 rtl:ml-2 w-4 h-4 bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                      <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    {/* <i class="mr-2 fas fa-sign-out-alt"></i> */} Sign out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* End Navbar */}
      </div>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
            <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="p-6 text-center">
            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
            <h3 class="mb-5 text-lg font-normal text-gray-500 darks:text-gray-400">Are you sure you want to logout ?</h3>
            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darks:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
              Yes, I'm sure
            </button>

          </div>
        </div>

      </Modal>
      {
        notificationState && <NotificationComponent setnotificationState={setnotificationState} />
      }
    </>
  )

}


//for redux
const mapStateToProps = (state) => {
  return {
    navCloseStatus: state.navCloseStatus,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // buyCake: () => dispatch(buyCake())
    NAV_OPEN: (data2) => dispatch({ type: "NAV_OPEN" }),
    NAV_CLOSE: (data3) => dispatch({ type: "NAV_CLOSE" }),
    NAV_OPEN_ORIGINAL_STATUS: (data3) => dispatch({ type: "NAV_OPEN_ORIGINAL_STATUS" }),
    NAV_CLOSE_ORIGINAL_STATUS: (data3) => dispatch({ type: "NAV_CLOSE_ORIGINAL_STATUS" }),
    LOGOUT: (data2) => dispatch({ type: "LOGOUT" }),
  };
};


// export default NavigationButton
export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header
/**
 * Exported to :
 * 1. App.js
 */