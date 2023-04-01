//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 23rd Nov., 2022  12:00 PM
// Project     : JUIDCO
// Component   : ClusterView
// Description : Cluster View Details
//////////////////////////////////////////////////////////////////////

import React, {useState} from 'react'
import {TbListDetails} from 'react-icons/tb'
// import { BeatLoader } from 'react-spinners'
import axios from 'axios';
import apiList from '@/Components/ApiList/ClusterFormApi'
import ApiHeader from "@/Components/ApiList/ApiHeader";
import Modal from "react-modal";
import { RiBuilding2Fill } from 'react-icons/ri';
import './Fonts.css'
// import ListTable from '@/Components/Common/ListTable/ListTable';
import { FaHome } from 'react-icons/fa'
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '@/Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im';
import ListTable from '@/Components/Common/ListTable/ListTable';
import {RiDeleteBackLine} from 'react-icons/ri'
import { toast } from 'react-toastify';
import BarLoader from '@/Components/Common/BarLoader';
import { useEffect } from 'react';
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions';

const ClusterView = (props) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [addCont, setaddCont] = useState('')
    const [viewList, setviewList] = useState('SAF')
    const [searchKey, setsearchKey] = useState('')
    const [loader, setloader] = useState(false)
    const [safList, setsafList] = useState()
    const [holdingList, setholdingList] = useState([])
    const [resultData, setresultData] = useState([])
    const [multiData, setmultiData] = useState([])
    const [userData, setuserData] = useState()
    const [refresh, setrefresh] = useState(0)

    const navigate = useNavigate()

    const openModal = (cont) => {
        setIsOpen(true)
        setaddCont(cont)
        setmultiData([])
        setresultData([])
    }
    const closeModal = () => setIsOpen(false)
    const afterOpenModal = () => { }

    const {id} = useParams()

    const buttonStyle = 'bg-indigo-500  text-white border border-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm transition-all duration-100 ease-in-out cursor-pointer text-sm'
    const buttonStyle2 = 'text-indigo-500 bg-white border border-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm transition-all duration-100 ease-in-out cursor-pointer text-sm'


    // ==============Destructing API====================
    const {mapHoldingApi, mapSafApi, searchHolding, searchSaf, viewCluster} = apiList()

    useEffect(() => {
      fetchData()
    },[refresh])

    // ===================Function to view cluster=========================
  const fetchData = () => {
    setloader(true)
    axios
      .post(viewCluster, { clusterId: id }, ApiHeader())
      .then((res) => {
        console.log("--4-- getting user data => ", res?.data?.data);
        setuserData(res?.data?.data?.Cluster);
        setholdingList(res?.data?.data?.Property)
        setsafList(res?.data?.data?.Saf)
        setloader(false)
      })
      .catch((err) => {
        console.log("--4-- getting user data error => ", err)
        setloader(false)
      });
  };

    // ==========search function=================
    const searchFun = () => {

        searchKey.length > 4 && setloader(true)

        // setTimeout(() => {
        //     setloader(false)
        // }, 10000);

        let url = addCont == 'Holding' ? searchHolding : searchSaf
        let body = addCont == 'Holding' ? {
          holdingNo : searchKey
        } :
        {
          safNo : searchKey
        }

        console.log("search key before search => ", searchKey)

       searchKey.length > 4 ? axios.post(url, body, ApiHeader())
        .then((res) => {
            console.log("search result => ", res)
            setresultData(res?.data?.data)
            setloader(false)
        })
        .catch((err) => {
            console.log("search error -> ", err)
            toast.error('Something went wrong !!!')
            setloader(false)
        }) :
        toast.error('You have not entered 5 digits !!!')
    }

    const resultColumn = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>,
          },
          {
            Header: "Ward No.",
            accessor: "wardId",
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: `${addCont} No.`,
            accessor: addCont == 'Holding' ? 'holding_no' : 'saf_no',
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row justify-center items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: "Name",
            accessor: "ownerName",
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row justify-center items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: "Mobile No.",
            accessor: "mobileNo",
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row justify-center items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: "Address",
            accessor: "address",
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row justify-center items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: "Property Type",
            accessor: "propertyType",
            Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
              return (
                <div className="w-full flex flex-row justify-center items-center">
                  <i className="font-semibold ">N/A</i>
                </div>
              );
            }
    
            if (props?.value != null) {
              return props?.value;
            }
          }
          },
          {
            Header: "Action",
            Cell: ({ row }) => (
              <>
                {/* ============Action Button of Table======================= */}
                <div className="space-x-2">
                  {/* ===========Edit button============= */}
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs font-semibold py-1 px-2"
                    onClick={() => funAdd(row?.index)}
                  >
                    Select
                  </button>
                </div>
                </>
            )
          }
    ]
    
    const COLUMNS = [
      {
        Header: "S.No.",
        Cell: ({ row }) => <div>{row?.index + 1}</div>,
      },
      {
        Header: `${viewList} No.`,
        accessor: viewList == 'Holding' ? 'holdingNo' : 'saf_no',
        Cell: (props) => {
        if (props?.value == null || props?.value == '' || props?.value == undefined) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      }
      },
      {
        Header: "Name",
        accessor: "ownername",
        Cell: (props) => {
        if (props?.value == null || props?.value == '' || props?.value == undefined) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      }
      },

      {
        Header: "Mobile No.",
        accessor: "mobileno",
        Cell: (props) => {
        if (props?.value == null || props?.value == '' || props?.value == undefined) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      }
      },
      {
        Header: "Property Type",
        accessor: "propertyType",
        Cell: (props) => {
        if (props?.value == null || props?.value == '' || props?.value == undefined) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      }
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: (props) => {
        if (props?.value == null || props?.value == '' || props?.value == undefined) {
          return (
            <div className="w-full flex flex-row justify-center items-center">
              <i className="font-semibold ">N/A</i>
            </div>
          );
        }

        if (props?.value != null) {
          return props?.value;
        }
      }
      },
        
    ]

    const funAdd =(val) => {
      addCont == 'Holding' ? addHoldingNo(val) : addSafNo(val)      
    }

    const addHoldingNo = (val) => {
        if((multiData.includes(resultData[val]?.holding_no)) == false){
          setmultiData(prev => [...prev, resultData[val]?.holding_no])
        }
        if(multiData.includes(resultData[val]?.holding_no)){
          toast.error('Duplicate not allowed !!!')
        }
    }

    const addSafNo = (val) => {
      if((multiData.includes(resultData[val]?.saf_no)) == false){
        setmultiData(prev => [...prev, resultData[val]?.saf_no])
      }
      if(multiData.includes(resultData[val]?.saf_no)){
        toast.error('Duplicate not allowed !!!')
      }
    }

    const funRemove = (index) => {
      setmultiData((data) => data.filter((_, ind) => ind !== index))
    }

    const mapFun = () => {

      setloader(true)

      let url = addCont == 'Holding' ? mapHoldingApi : mapSafApi

      let body = addCont == 'Holding' ? {
        clusterId: id,
	      holdingNo: [...new Set(multiData)]
      } : 
      {
        clusterId: id,
	      safNo: [...new Set(multiData)]
      }

      console.log('before mapping data  => ', body)

      axios.post(url, body, ApiHeader())
      .then((res) => {

        if(res?.data?.status == true){
          console.log("mapping success => ", res)
        setloader(false)
        toast.success("Mapping successfull !!!")
        closeModal()
        setrefresh(refresh+1)
        }

        if(res?.data?.status == false){
          console.log("mapping error => ", res)
        setloader(false)
        toast.error(`Check out some ${addCont} no. already mapped or selected !!!`)
        }
        
      })
      .catch((err) => {
        console.log("mapping error => ", err)
        setloader(false)
        toast.error("Something went wrong !!!")
      })
    }

    if(loader){
      return <BarLoader />
    }

  return (
    <>

    <div className='flex flex-wrap flex-col w-full text-zinc-800 h-full overflow-y-auto'>

        {/* =================Basic Details============================== */}
        <div>

           
            <div className='flex flex-wrap justify-between'>

                 {/* ======================Heading========================== */}
                <div className='flex items-center space-x-2 '>
                    <span className="font-extrabold"><TbListDetails/></span>
                    <span className='font-bold'>Basic Details</span>
                </div>

                {/* ===============Add Holding Button======================== */}
                {/* <div>
                <button className="py-2 bg-green-200 hover:bg-green-300 cursor-pointer px-4 mr-20 -mt-[7rem] transition-all ease-in-out duration-300 rounded-md shadow-md text-xs font-semibold" onClick={openModal}>Add SAF</button>
                </div> */}

            </div>
            
            {/* ===================Details======================== */}
            <div  className='bg-white rounded-md shadow-lg w-full px-4 py-2.5 pb-4 mt-4 flex flex-wrap flex-row space-y-4'>

                {/* =============Ward================ */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Old Ward No.</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.ward_no)}</div>
                </div>

                {/* =============New Ward================ */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>New Ward No.</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.new_ward_no)}</div>
                </div>

                {/* =============Name================ */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Name</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.cluster_name)}</div>
                </div>

                {/* ===============Type===================== */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Type</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.cluster_type)}</div>
                </div>

                {/* =============Address======================== */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Address</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.address)}</div>
                </div>

                {/* ====================Mobile No.========================== */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Mobile No.</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.mobile_no)}</div>
                </div>

                {/* ==============Authorized Person Name=================== */}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Authorized Person Name</div>
                    <div className='text-sm font-semibold'>{nullToNA(userData?.authorized_person_name)}</div>
                </div>

                {/* ==============Created At=======================*/}
                <div className='flex flex-col-reverse poppins space-y-1 w-[15rem]'>
                    <div className='text-xs'>Created At</div>
                    <div className='text-sm font-semibold'>{nullToNA(new Date(userData?.created_at).toLocaleDateString("en-GB"))}</div>
                </div>

            </div>

        </div>

        {/* ==================Holding Table========================= */}
        <div className='relative bg-white p-4 mt-8'>

                {/* ==================Heading================= */}
                <div className='flex flex-row flex-wrap justify-between'>
                <div className='flex items-center space-x-2 '>
                    <div className={(viewList == 'SAF' ? `border-2 border-indigo-600 shadow-indigo-400` : `border-none`) + ` shadow-md rounded-md flex items-center space-x-2 px-4 py-2 cursor-pointer text-sm`} onClick={() => setviewList('SAF')}>
                    <span className="font-extrabold"><TbListDetails/></span>
                    <span className='font-semibold'>Mapped SAF List</span>
                    </div>
                    <div className={(viewList == 'Holding' ? `border-2 border-indigo-600 shadow-indigo-400` : `border-none`) + ` shadow-md rounded-md flex items-center space-x-2 px-4 py-2 cursor-pointer text-sm`} onClick={() => setviewList('Holding')}>
                    <span className="font-extrabold"><TbListDetails/></span>
                    <span className='font-semibold'>Mapped Holding List</span>
                    </div>
                </div>
               {viewList == 'SAF' && <div className='flex items-center space-x-2 '>
               <div className={buttonStyle} onClick={() => openModal('SAF')}>
                    Add SAF
                    </div>
                    <div onClick={() => navigate(`/viewDemandCluster/${id}`)} className={buttonStyle2}>
                    View SAF Demand
                    </div>
                </div>}
                {viewList == 'Holding' && <div className='flex items-center space-x-2 '>
                <div className={buttonStyle} onClick={() => openModal('Holding')}>
                    Add Holding
                    </div>
                    <div onClick={() => navigate(`/cluster-holding-transactions/${id}`)} className={buttonStyle2}>
                    View Payment History
                    </div>
                    <div onClick={() => navigate(`/viewDemandHoldingPropertyCluster/${id}`)} className={buttonStyle2}>
                    View Property Demand
                    </div>
                </div>}
                </div>

            {/* ==============Loader==================== */}
            {/* {loader && <BeatLoader color='#022751' />} */}

    {/* ==============List=================== */}
     <div className="mt-4">

    {!loader && 

     <>

     {viewList == 'Holding' && 
     <> 
        {
            holdingList?.length > 0 ? <ListTable columns={COLUMNS} dataList={holdingList} /> : <div className="text-red-500 poppins font-semibold text-lg w-full text-center py-4">No mapped holding available</div>
        }
    </>}

    {viewList == 'SAF' &&
    <>
        {
            safList?.length > 0 ? <ListTable columns={COLUMNS} dataList={safList} /> : <div className="text-red-500 poppins font-semibold text-lg w-full text-center py-4">No mapped SAF available</div>
        }
     </>}
     
     </>
       } 

     </div>

        </div>

        {/* ===================Back Button====================== */}
        {/* <div className='my-4'>
        <div onClick={() => navigate('/cluster')}
                  className="md:mt-1.5 px-6 py-1.5 cursor-pointer w-max bg-indigo-500 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-blue-060 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Back
                </div>
        </div> */}

    </div>


    {/* Modal to addd SAF and add holding */}
    <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="z-20 h-screen w-screen backdrop-blur-sm flex flex-row justify-center items-center overflow-auto"
                contentLabel="Example Modal"
            >

                <div class=" rounded-lg shadow-lg shadow-indigo-300 md:w-[73%] md:h-[80vh] w-full relative bg-gray-50 px-6 py-4 h-max border-t-2 border-l-2 overflow-auto" >

                {loader && <BarLoader />}
                
                <div className="absolute top-2 z-10 bg-red-200 hover:bg-red-300 right-2 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross fontSize={10}/>
                </div>
                      {/* ================Heading=================== */}
      <h1 className="mb-2 mx-6 font-serif font-semibold  text-gray-600 text-lg">
        <RiBuilding2Fill className="inline mr-2" />
        Add {addCont}
      </h1>

      <div className='bg-white w-full px-4 py-6 rounded-md shadow-md mt-4 flex flex-row flex-wrap gap-y-2 justify-start gap-x-6 items-center'>
        <label htmlFor="search" className='poppins 2xl:text-md text-sm'>Enter atleast last 5 digits of {addCont} number : </label>
        <input type="text" name="search" id="search" className='px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md' onChange={(e) => setsearchKey(e.target.value)} />
        <button className="md:mt-1.5 px-6 py-1.5 cursor-pointer w-max bg-green-500 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-060 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out tracking-wide" onClick={() => searchFun()}>Search</button>
      </div>

      <div className='bg-white w-[100%] p-4 rounded-md shadow-md mt-4 flex flex-row flex-wrap gap-y-2 justify-start gap-x-6 items-center poppins'>
               
            {
                resultData?.length == 0 ? <div className="text-red-500 font-semibold text-md 2xl:text-lg w-full text-center py-4 poppins">No any {addCont} found !!!</div> : <>
                
                <div className=' w-full flex flex-col md:flex-row md:items-center gap-2 border-b-2 border-gray-500 pb-2 mb-2'>
                  <div className='full text-sm md:w-[20%] w-full'>
                    Selected {addCont} &nbsp; : &nbsp; &nbsp; </div>
                    <div className='w-full md:w-[80%]'>
                          <div className='flex flex-row flex-wrap gap-x-2 gap-y-1  px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md'>
                          {[...new Set(multiData)]?.map((elem, index) => <div className='w-max'>
                          <span className='bg-indigo-100 text-gray-800 flex flex-row items-cente poppins text-xs px-2 py-1.5 rounded-md font-semibold'>{elem}&nbsp;<RiDeleteBackLine className='inline text-red-600 font-semibold text-sm cursor-pointer hover:text-red-700' onClick={() => funRemove(index)}/></span>
                          </div>)}
                        
                          </div>
                          {!loader && <button className='md:mt-1.5 px-6 py-1.5 cursor-pointer w-max bg-green-500 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-060 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out' onClick={() => mapFun()}>Map {addCont}</button>}
                    </div>
                </div>
                

                <div className='w-full'>
                <ListTable columns={resultColumn} dataList={resultData}/>
                </div>
                
                </>
            }

      </div>

      </div>

      </Modal>

    
    
    </>
  )
}

export default ClusterView

/////////////////////////////////////////////////////////////
// Export to : ClusterTable.js