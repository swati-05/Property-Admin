//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Sidebar
//    DESCRIPTION - Sidebar Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ImageCard from './ImageCard';
import { connect } from "react-redux";
import RawLink from './RawLink';
import { FaEnvelope } from 'react-icons/fa'
import { ImHome } from 'react-icons/im'
import { FcHome } from 'react-icons/fc'
import { FcFlowChart } from 'react-icons/fc'
import CollapseMenu from './CollapseMenu';
import { contextVar } from '@/Components/Context/Context';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import ProjectApiList from '@/Components/ApiList/ProjectApiList';
import axios from 'axios';
import { RotatingLines } from "react-loader-spinner";


function Sidebar(props) {

  const location = useLocation();

  // const [menuList, setmenuList] = useState([{menuName:'mark',menuPath:'shark'}])
  const { menuList, setmenuList } = useContext(contextVar)

  useEffect(() => {
    // return
    let lMenuList = menuList == '' ? JSON.parse(window.localStorage.getItem('menuList')) : menuList
    console.log('menu at console....', lMenuList)
    setmenuList(lMenuList)


  }, [])




  const menuPermission = [
    // ============================================= 1 Property Menu=============================================
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_1`, menuName: 'Property Dashboard', menuPath: '/dashboard-property', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_2`, menuName: 'Saf Workflow', menuPath: '/saf-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_3`, menuName: 'Concession Workflow', menuPath: '/concession-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_4`, menuName: 'Harvesting Workflow', menuPath: '/harvesting-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_5`, menuName: 'Objection Workflow', menuPath: '/objection-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_6`, menuName: 'Holding Deactivation', menuPath: '/saf-holding-deactivation', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_6`, menuName: 'Deactivation Workflow', menuPath: '/deactivation-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_6`, menuName: 'Tc Verification', menuPath: '/tcSafList', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_6`, menuName: 'Bifurcation Apply', menuPath: '/bifurcation', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_6`, menuName: 'Bifurcation Workflow', menuPath: '/bifurcation-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Saf Entry', menuPath: '/saf-entry', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Concession Apply', menuPath: '/con-form', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Objection Apply', menuPath: '/objection', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Cluster List', menuPath: '/cluster', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Harvesting Apply', menuPath: '/waterHarvestingFindHolding', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Role Mangement', menuPath: '/user-role', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Payment Master', menuPath: '/payment-master', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'property', id: `property_13`, menuName: 'Search Property', menuPath: '/search', subMenu: [] },

    // ============================================= 2 Water Menu =============================================
    { icon: <FcFlowChart size={14} />, module: 'water', id: `water_1`, menuName: 'Water Dashboard', menuPath: '/dashboard-water', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'water', id: `water_2`, menuName: 'Water Mailbox', menuPath: '/water-mailbox', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'water', id: `water_3`, menuName: 'Water', menuPath: '/water', subMenu: [] },

    // ============================================= 3 Trade Menu =============================================
    { icon: <FcFlowChart size={14} />, module: 'trade', id: `trade_1`, menuName: 'Trade Dashboard', menuPath: '/dashboard-trade', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'trade', id: `trade_2`, menuName: 'Trade', menuPath: '/trade', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'trade', id: `trade_3`, menuName: 'Trade Mailbox', menuPath: '/trade-mailbox', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'trade', id: `trade_4`, menuName: 'Reports', menuPath: '/trade-reports', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'trade', id: `trade_5`, menuName: 'Track License', menuPath: '/trade-track-license', subMenu: [] },

    // ============================================= 4 Advertisement Menu =============================================
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'Advertisement Dashboard', menuPath: '/dashboard-advertisement', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_2`, menuName: 'Banquet Advt', menuPath: '/banquet-advt', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_3`, menuName: 'Vehicle Advt', menuPath: '/vehicle-advt', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_4`, menuName: 'PL Advt', menuPath: '/pl-advt', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_5`, menuName: 'LodgeHostel-advt', menuPath: '/LodgeHostel-advt', subMenu: [] },
    {
      icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_6`, menuName: 'Advertisement', menuPath: '#', subMenuStatus: true, subMenu: [{ icon: <FcFlowChart size={14} />, id: 8, menuName: 'Self-Advt', menuPath: '/self-advt', subMenu: [] },
      { icon: <FcFlowChart size={14} />, id: 9, menuName: 'Notice', menuPath: '/notice', subMenu: [] }]
    },

    // -----------------new-------------
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'AdvtWorkflow', menuPath: '/advt-workflow', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'SElf-Advt', menuPath: '/self-advt', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'Movable-Vehicle', menuPath: '/movable-vehicle', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'PvtLand', menuPath: '/private-land', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'AgencyAdvt', menuPath: '/agency-advt', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'advertisement', id: `advertisement_1`, menuName: 'HoardingNew', menuPath: '/hoarding', subMenu: [] },


    // ============================================= 5 Other Menu =============================================
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_1`, menuName: 'Ulb-Workflow-Roles', menuPath: '/ulb-workflow-roles', subMenu: [] },
    {
      icon: <FcFlowChart size={14} />, module: 'other', id: `other_2`, menuName: 'Home', menuPath: '/home', subMenuStatus: true, subMenu: [{ id: 1, menuName: 'sub 1', menuPath: '/sub', subMenu: [] },
      { icon: <FcFlowChart size={14} />, id: `other_3`, menuName: 'sub 2', menuPath: '/sub', subMenu: [] }]
    },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_4`, menuName: 'Mailbox', menuPath: '/mailbox', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_5`, menuName: 'Master', menuPath: '/workflow-mstr', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_6`, menuName: 'CMS', menuPath: '/cms', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_7`, menuName: 'User Permission', menuPath: '/user-permission', subMenu: [] },
    // Advertisement menu with 6 submenus
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_8`, menuName: 'Payment-Master', menuPath: '/payment-master', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_9`, menuName: 'User-Role', menuPath: '/user-role', subMenu: [] },
    { icon: <FcFlowChart size={14} />, module: 'other', id: `other_10`, menuName: 'Accounts', menuPath: '/accounts', subMenu: [] },
  ]

  const moduleList = [
    { module: 'All', id: 0, value: 'all' },
    { module: 'Property', id: 1, value: 'property' },
    { module: 'Water', id: 2, value: 'water' },
    { module: 'Trade', id: 3, value: 'trade' },
    { module: 'Advertisement', id: 4, value: 'advertisement' },
    { module: 'Other', id: 4, value: 'other' }
  ]

  const expandSidebar = () => {
    props.navOriginalCloseStatus && props.NAV_OPEN() //if shorthand
  }
  const contractSidebar = () => {
    props.navOriginalCloseStatus && props.NAV_CLOSE() //if shorthand
  }

  const handleChange = (e) => {

    if (e.target.value == 'all') {
      setmenuList(menuPermission)
      return
    }
    setmenuList(menuPermission.filter((menu) => {
      return menu.module == e.target.value
    }))
  }

  return (
    <>
      {
        ((location.pathname != '/landing') && (location.pathname != '/')  && (location.pathname != '/login') && (location.pathname != '/error')) && <div className={(props.navCloseStatus ? "w-0 sm:w-9" : "w-56 pr-2") + " shadow-lg px-0 bg-indigo-400 h-screen pb-12 overflow-y-scroll absolute top-16 left-0  text-white  transition-all z-40 border-r-2 scbar animate__animated animate__fadeInLeft"} onMouseEnter={expandSidebar} onMouseLeave={contractSidebar}>
          <div className='py-4' >
            <ImageCard sideBarStatus={props.navCloseStatus} />
          </div>
          {/* <div>
            <select onChange={handleChange} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer"
            >
              <option>--select--</option>
              {
                moduleList?.map((module) => (
                  <option value={module.value}>{module.module}</option>
                ))
              }
            </select>
          </div> */}
          <hr />
          <ul className="list-none" style={props.navCloseStatus == true ? { 'padding': '0px 2px 0px 2px' } : { 'padding': '0px 10px 0px 10px' }}>
            {/* <li className='flex items-center pl-2 py-2 mt-2 bg-sky-100 border-l-2 border-indigo-600 text-blue-500 hover:bg-sky-100 hover:border-l-2 hover:border-indigo-600  hover:text-blue-500' style={{ 'width': '250px' }}>
              <div className="flex-none ">
                <FaEnvelope size={14} />
              </div>
              <div className="flex-initial w-40">
                <RawLink path="/settings" title="Settings" />
              </div>
            </li> */}
            {/* {
              menuPermission.map((data, index) => (
                <SidebarLink title={data.menuName} path={data.menuPath} subMenu={data.subMenu} >
                </SidebarLink>
              ))
            } */}
            {/* {
              menuList?.map((data, index) => (
                <CollapseMenu key={`sidebar_menu${index}`} title={data.menuName} path={data.menuPath} subMenu={data.subMenu} subMenuStatus={data.subMenuStatus} icon={data.icon} />
              ))
            } */}
            {props?.menuFetchStatus &&
              <div className='w-full flex justify-center items-center'>
                <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="25"
              visible={true}
          /></div>
            }
            {!props?.menuFetchStatus && menuList != '' &&
              menuList?.map((data, index) => (
                <CollapseMenu key={`sidebar_menu${index}`} title={data.name} path={data?.path} subMenu={data?.children} subMenuStatus={data?.children?.length != 0 ? true : false} icon={<FcFlowChart size={14} />} />
              ))
            }




          </ul>
        </div>
      }

    </>
  )
}

//for redux
const mapStateToProps = (state) => {
  return {
    navCloseStatus: state.navCloseStatus,
    navOriginalCloseStatus: state.navOriginalCloseStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // buyCake: () => dispatch(buyCake())
    NAV_OPEN: (data2) => dispatch({ type: "NAV_OPEN" }),
    NAV_CLOSE: (data3) => dispatch({ type: "NAV_CLOSE" })
  };
};
// export default Home // EXPORTING HOME COMPONENT
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

/**
 * Exported to :
 * 1. App.js
 * 
 */