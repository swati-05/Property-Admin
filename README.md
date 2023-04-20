# Changes in admin modules for modules switching

> <h1>Step 1 - TransferPage.js (Create a file TransferPage.jsx and add the following code)</h1>

```
import React,{useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import BarLoader from '@/Components/Common/BarLoader'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import { setLocalStorageItemStrigified } from '@/Components/Common/localstorage'
import { contextVar } from '@/Components/Context/Context';
import BrandLoader from '@/Components/Common/BrandLoader'


function TransferPage() {
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()
  const { api_getFreeMenuList } = ProjectApiList()
  const {  setmenuList } = useContext(contextVar)


  useEffect(() => {
    let token = window.localStorage.getItem('token')
    setisLoading(true)
    if (token == null) {
      navigate('/')
      return
    }
    fetchMenuList()

  }, [])

  // 3 CHANGE FOR SINGLE AUTH
  const fetchMenuList = () => {
    let requestBody = {
      moduleId: 1
    }

    console.log('api header to login...')
    axios.post(api_getFreeMenuList, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetched menu list.....', response)
        // return
        if (response.data.status == true) {
          setLocalStorageItemStrigified('menuList',response?.data?.data?.permission)
          setLocalStorageItemStrigified('userName',response?.data?.data?.userDetails?.userName)
          setLocalStorageItemStrigified('roles',response?.data?.data?.userDetails?.roles)
          setLocalStorageItemStrigified('userUlbName',response?.data?.data?.userDetails?.ulb)
          setLocalStorageItemStrigified('userMobile',response?.data?.data?.userDetails?.mobileNo)
          setLocalStorageItemStrigified('userEmail',response?.data?.data?.userDetails?.email)
          setLocalStorageItemStrigified('userImage',response?.data?.data?.userDetails?.imageUrl)
          setmenuList(response?.data?.data?.permission)
          navigate('/home')

        } else {
          console.log('false...')
          // seterrorMsg(response.data.message)
          // notify(response.data.message, 'error') //toast message if wrong credentails
        }
        setisLoading(true)
      })
      .catch(function (error) {
        // setLoaderStatus(false)
        // seterroState(true)
        console.log('--2--login error...', error)
        setisLoading(true)
      })


  }

  if (isLoading) {
    return (
      <BrandLoader />
    )
  }
}

export default TransferPage
```
 

> <h1>Step 2 - App.jsx (Add a route /transfer to App.jsx)</h1>
```
   <Route path='/transfer' element={<TransferPage/>} />

```



> <h1>Step 3 - Add View for modules list to switch in header.jsx</h1>
```
 <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
        contentLabel="Example Modal"
      >
        <PermittedModuleCard closeModuleModal={closeModal2} />

      </Modal>

```

> <h1>Step 4 -create component for PermittedModuleCard</h1>
```
 import React, { useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import home from '@/Components/Media/home.png'
import water from '@/Components/Media/water.png'
import team from '@/Components/Media/team.png'
import piechart from '@/Components/Media/piechart.png'
import dustbin from '@/Components/Media/dustbin.png'
import advt from '@/Components/Media/advt.png'


function PermittedModuleCard(props) {
    const navigate = useNavigate()

    const [permittedModuleList, setpermittedModuleList] = useState([
        { moduleName: 'Property', route: '/property/transfer', icon: home },
        { moduleName: 'Water', route: '/water/transfer', icon: water },
        { moduleName: 'Trade', route: '/trade/transfer', icon: team },
        { moduleName: 'Advertisement', route: '/advertisement/transfer', icon: advt },
        { moduleName: 'SWM', route: '/swm/transfer', icon: dustbin },
        { moduleName: 'Dashboard', route: '/dashboard/transfer', icon: piechart },
    ])
    const swithModule = (route) => {
        window.location.replace(route)
    }
    return (
        <div className='w-full md:w-1/2 mx-auto mt-10'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
                <button onClick={props?.closeModuleModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent bg-gray-300 hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
                    <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                            <h2 className="text-3xl font-medium text-center">Choose Module</h2>
                        </div>
                    </div>
                    <div className="my-10 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                            {/* 1 NEW ASSESSMENT */}
                            {permittedModuleList?.map((data, index) => (
                                <div onClick={() => swithModule(data?.route)}
                                    className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                    href="">
                                    <img
                                        className="h-16 w-16"
                                        src={data?.icon}
                                        alt="Mobiles" />
                                    <div className="font-bold mt-4 text-center">{data?.moduleName}</div>
                                </div>
                            ))}




                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PermittedModuleCard

```






