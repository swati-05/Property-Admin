import { useFormik } from 'formik'
import React from 'react'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { useEffect } from 'react'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import BarLoader from '@/Components/Common/BarLoader'
import { CSVDownload, CSVLink } from 'react-csv'
import ListTable2 from '@/Components/Common/ListTableCustom/ListTable2'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import { RiFilter2Line } from 'react-icons/ri'
import ListTable3 from '@/Components/Common/ListTableCustom/ListTable3'

const GovSafIndividualDemandCollection = () => {

    const { get_MasterData, searchGovSafIndividualDemandCollection } = PropertyApiList()

    useSetTitle('Govt. SAF Individual Demand And Collection')

    const [wardList, setwardList] = useState()
    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)

    const commonInputStyle = `form-control block w-full px-2 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md`

    const formik = useFormik({
        initialValues: {
            wardId: '',
        },
        onSubmit: (values) => {
            console.log("submitting report search values => ", values)
            setperPageCount(5)  // this constant is from ListTable2 constant
            setpageCount(1) // this constant is from ListTable2 constant
            searchFun(values)
        }

    })

    const searchFun = (values) => {

        setloader(true)

        let body = {
            wardId: formik.values.wardId,
            page: pageCount,    // this constant is from ListTable2 constant
            perPage: perPageCount   // this constant is from ListTable2 constant
        }

        console.log('data before hitting api => ', body)

        axios.post(
            searchGovSafIndividualDemandCollection, body, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    console.log('search success => ', res)
                    setdataList(res?.data?.data?.items)
                    settotalCount(res?.data?.data?.total)
                } else {
                    console.log('error while search => ', res)
                }

                setloader(false)
                setloader2(false)
            })
            .catch((err) => (console.log('error while search => ', err), setloader(false), setloader2(false)))

    }


    useEffect(() => {
        axios.get(get_MasterData, ApiHeader())
            .then((res) => {

                if (res?.data?.status == true) {
                    console.log("getting master list data => ", res)
                    setwardList(res?.data?.data?.ward_master)
                } else {
                    console.log("error getting master list", res)
                }

            })
            .catch(err => console.log("error getting master list", err))
    }, [])

    const COLUMNS = [
        {
            Header: "S.No.",
            Cell: ({ row }) => <div>{row?.index + 1}</div>
        },
        {
            Header: "Ward No",
            accessor: "ward_no",
            Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (props?.value != null) {
                    return props?.value;
                }
            }
        },
        {
            Header: "Application No",
            accessor: "application_no",
            Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (props?.value != null) {
                    return props?.value;
                }
            }
        },
        {
            Header: "Building Colony Name",
            accessor: "new_holding_no",
            Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (props?.value != null) {
                    return props?.value;
                }
            }
        },
        {
            Header: "Building Colony Address",
            accessor: "owner_name",
            Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (props?.value != null) {
                    return props?.value;
                }
            }
        },
        {
            Header: "Total Demand",
            accessor: "total_demand",
            Cell: (props) => {
                if (props?.value == null || props?.value == '' || props?.value == undefined) {
                    return (
                        <i className="font-semibold ">N/A</i>
                    );
                }
                if (props?.value != null) {
                    return props?.value;
                }
            }
        },
        {
          Header: "Total Collection",
          accessor: "total_collection",
          Cell: (props) => {
              if (props?.value == null || props?.value == '' || props?.value == undefined) {
                  return (
                      <i className="font-semibold ">N/A</i>
                  );
              }
              if (props?.value != null) {
                  return props?.value;
              }
          }
      },
      {
        Header: "Total Remaining",
        accessor: "total_remaining",
        Cell: (props) => {
            if (props?.value == null || props?.value == '' || props?.value == undefined) {
                return (
                    <i className="font-semibold ">N/A</i>
                );
            }
            if (props?.value != null) {
                return props?.value;
            }
        }
    },
    ]

    // ============List Table (ListTable2)=========

    const [perPageCount, setperPageCount] = useState(5)  // for no. of data in single page
    const [pageCount, setpageCount] = useState(1)  // for page no.
    const [totalCount, settotalCount] = useState(0)  // total no. of data
    const [exportData, setexportData] = useState()  // to store all data for exporting as csv
    const [csvStatus, setcsvStatus] = useState(false)  // csvStatus to toggle download csv file
    const [loader2, setloader2] = useState(false)  // loader for ListTable2

    // 1 DO props.setpageCount(prev=>prev+1)  in listable3 component  ==> Ignore this comment for ListTable2

    // ========function to go to next page========
    const nextPageFun = () => {
        setpageCount(pageCount + 1)
    }

    // 2 DO props.setpageCount(prev=>prev-1)  in listable3 component  ==> Ignore this comment for ListTable2

    // =========function to go to previous page===========
    const prevPageFun = () => {
        setpageCount(pageCount - 1)
    }

    // 3 DO props.setperPageCount(20) in listable3 component  ==> Ignore this comment for ListTable2

    // ==========function to set how many data to be viewed in single page=======
    const perPageFun = (val) => {
        setperPageCount(val)
    }

    // =========on changing page no. refetching to data================
    useEffect(() => {
        setloader2(true)
        searchFun()
    }, [pageCount, perPageCount])


    // ==========function to download all data as csv============
    const exportDataFun = () => {

        setloader2(true)

        // =====toggle csvStatus download======
        setcsvStatus(false)

        // body will be changed as per requirement to get all data
        let body = {
            wardId: formik.values.wardId,
            page: '',
            perPage: totalCount
        }

        axios.post(
            searchGovSafIndividualDemandCollection, body, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    setexportData(res?.data?.data?.items) // storing all data in exportData constant
                    downloadFun()
                } else {
                }

                setloader2(false)
            })
            .catch((err) => {
                setloader2(false)
            })
    }

    // =====Event to toggle csvStatus to download=======
    const downloadFun = () => {
        setcsvStatus(true)
    }


    return (
        <>
            {/* ====Export data for ListTable2==== */}
            {
                csvStatus && <CSVDownload data={exportData} />
            }
            {/* ============================================ */}


            {
                loader2 && <BarLoader />
            }

            <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="mb-4 bg-white shadow-lg rounded-md">
                <h1 className='text-xl w-full font-bold px-8 pt-4 text-gray-700'>Search Report</h1>

                <div className="flex flex-wrap flex-row justify-start w-full gap-x-6 gap-y-2 text-sm 3xl:text-base p-4 px-8">

                    <div className="flex flex-col w-full md:w-[20%]">
                        <div className="col-span-6 font-semibold">
                            Ward No. :
                        </div>
                        <div className="col-span-6">
                            <select name="wardId" id="" className={commonInputStyle} >
                                <option value=''>All</option>
                                {
                                    wardList?.map((elem) => <>
                                        <option value={elem?.id}>{elem?.ward_name}</option>
                                    </>)
                                }
                            </select>
                        </div>
                        {/* <div className="col-span-12 text-end">
                        {formik.touched.wardId && formik.errors.wardId && <><span className="text-red-600 text-xs">{formik.errors.wardId}</span></>}
                    </div> */}
                    </div>

                    <div className="w-full md:w-[20%] flex justify-start items-end">
                        {loader ? <>
                            <div className='flex justify-end'>
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="25"
                                    visible={true}
                                />
                            </div>
                        </>
                            :
                            <button type="submit" className="flex flex-row items-center border border-green-600 bg-green-600 hover:bg-green-500 text-white hover:text-black shadow-lg rounded-sm text-sm font-semibold px-5 py-1 w-max"> <span className='mr-2'><RiFilter2Line /></span>Search</button>}
                    </div>

                </div>
            </form>

            {
                (dataList != undefined && dataList?.length != 0) ? <>

                    <ListTable2 
                        columns={COLUMNS}            // sending columns 
                        dataList={dataList}          // sending data List
                        exportStatus={true}          // recieving export status toggle
                        perPage={perPageCount}       // sending no. of data in single page also for s.no.
                        perPageC={perPageFun}        // recieving to change no. of data in single page
                        totalCount={totalCount}      // sending total no. of data
                        nextPage={nextPageFun}       // recieving to go to next page
                        prevPage={prevPageFun}       // recieving to go to previous page
                        exportDataF={exportDataFun}  // recieving action to export data
                    /> 

                    {/* <ListTable3 setpageCount={setpageCount} setperPageCount={setperPageCount} perPage={perPageCount} count1={totalCount} columns={COLUMNS} dataList={dataList} exportStatus={true}  exportDataF={exportDataFun} exportData={exportData} /> */}

                </> :
                    <>
                        <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>
                    </>
            }

        </>
    )
}

export default GovSafIndividualDemandCollection