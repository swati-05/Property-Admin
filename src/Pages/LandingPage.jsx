import { useState, useEffect, useContext } from 'react'
import date from '@/Components/Media/date.png'
import time from '@/Components/Media/clock.png'
import ip from '@/Components/Media/ip.png'
import user from '@/Components/Media/user.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import li from '@/Components/Media/li.png'
import { connect } from "react-redux";
// import ApiList from '../Components/ApiList/ApiList'
import lock from '@/Components/Media/lock.png'
import jd from '@/Components/Media/jd.png'
import ApiHeader from '../Components/ApiList/ApiHeader'
import role from '@/Components/Media/role.png'
// import { contextVar } from './ContextVar'
import moment from 'moment'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'





function LandingPage(props) {

    if (window.innerWidth < 600) {
        console.log('600 less')
        //   props.NAV_CLOSE()
    }
    const navigate = useNavigate()
    // const { notify, globalDataContainer, setGlobalDataContainer, userTypeId,setuserDesignation,setuserName } = useContext(contextVar)

    // const { getHomePageData } = ApiList()
    const [homePageData, setHomePageData] = useState()
  const { api_treeMenuList } = ProjectApiList()


    useEffect(() => {
        // fetchHomePageData()
        fetchTreeMenuList()
    }, [])

    const fetchTreeMenuList = () => {
        axios.post(api_treeMenuList, { roleId: 11 }, ApiHeader())
          .then(function (response) {
            console.log('tree menu list...', response.data)
    
          })
          .catch(function (error) {
            console.log('-tree menu error...', error)
          })
      }

   
    return (
        <>
            <div className='mt-4 pl-2 flex'>
                <div className='flex-1'>
                    <div className='text-2xl font-semibold font-serif'>Admin</div><div>Welcome</div>
                </div>
                <div className='flex-1'><span onClick={() => navigate('/change-password/change')} className='bg-white shadow-lg py-1 cursor-pointer hover:bg-gray-100 rounded-sm pr-1'><img className='inline w-10' src={lock} alt="" />Change Password</span></div>
            </div>
            {/* <div className='bg-white flex justify-center items-center w-full shadow-lg py-2 md:py-10 mt-2 border border-gray-200 px-4'>
                <div className="grid grid-cols-12 gap-2 mt-4 gap-x-6 w-full">

                    <div className="col-span-12 md:col-span-6 bg-amber-200 py-6 px-6 rounded-sm shadow-lg">
                        <div className="flex text-gray-600">
                            <div className='flex-initial'><img src={user} alt="" className='inline w-4 md:w-6' />  UserName :</div>
                            <div className='flex-initial font-semibold pl-4'>hello</div>
                        </div>
                        <div className="flex mt-3 text-gray-600">
                            <div className='flex-initial'><img src={date} alt="" className='inline w-4 md:w-6' />  Last Visited date :</div>
                            <div className='flex-initial font-semibold pl-4'>hello</div>
                        </div>
                        <div className="flex mt-3 text-gray-600">
                            <div className='flex-initial'><img src={time} alt="" className='inline w-4 md:w-6' />  Last Visited Time :</div>
                            <div className='flex-initial font-semibold pl-4'>hello</div>
                        </div>
                        <div className="flex mt-3 text-gray-600">
                            <div className='flex-initial'><img src={ip} alt="" className='inline w-4 md:w-6' />  Last IP Address :</div>
                            <div className='flex-initial font-semibold pl-4'>hello</div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 bg-amber-200 py-0 px-6 rounded-sm shadow-lg">
                        <img src={project_swm} alt="" />
                    </div>

                </div>
            </div> */}
            <div className="grid grid-cols-12">

                <div className="col-span-12 md:col-span-6 order-last md:order-first">
                    <img className=' w-full md:w-4/5 inline' src={jd} alt="" />
                </div>
                <div className="col-span-12 md:col-span-6 py-6 px-2 md:px-6 rounded-sm order-first md:order-last">
                    <div className='bg-amber-100 text-black py-10 px-4 shadow-lg'>
                        <div className="flex text-black">
                            <div className='flex-initial'><img src={user} alt="" className='inline w-4 md:w-6' />  UserName :</div>
                            <div className='flex-initial font-semibold pl-4'>{homePageData?.userName}</div>
                        </div>
                        <div className="flex text-black mt-3">
                            <div className='flex-initial'><img src={role} alt="" className='inline w-4 md:w-6' />  Designation :</div>
                            <div className='flex-initial font-semibold pl-4'>{homePageData?.designation}</div>
                        </div>
                        <div className="flex mt-3 text-black">
                            <div className='flex-initial'><img src={date} alt="" className='inline w-4 md:w-6' />  Last Visited date :</div>
                            <div className='flex-initial font-semibold pl-4'>{moment(homePageData?.lastVisitedDate,'DD-MM-YYYY').format('DD-MMM-yy')}</div>
                        </div>
                        <div className="flex mt-3 text-black">
                            <div className='flex-initial'><img src={ip} alt="" className='inline w-4 md:w-6' />  Address :</div>
                            <div className='flex-initial font-semibold pl-4'>{homePageData?.address}</div>
                        </div>
                        {/* <div className="flex mt-3 text-black">
                            <div className='flex-initial'><img src={time} alt="" className='inline w-4 md:w-6' />  Last Visited Time :</div>
                            <div className='flex-initial font-semibold pl-4'>{homePageData?.lastVisitedDate}</div>
                        </div>
                        <div className="flex mt-3 text-black">
                            <div className='flex-initial'><img src={ip} alt="" className='inline w-4 md:w-6' />  Last IP Address :</div>
                            <div className='flex-initial font-semibold pl-4'>{homePageData?.lastVisitedDate}</div>
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    )
}

// export default LandingPage

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
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);