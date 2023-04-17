import React, { useEffect, useState } from 'react'
import ListTable2 from './ListTable2v2'
import axios from 'axios'
import ApiHeader from '@/Components/ApiList/ApiHeader'
import BarLoader from '@/Components/Loaders/BarLoader'
import { CSVDownload } from 'react-csv'
import ListTableMargin from './ListTableMargin'

const ListTableConnect = (props) => {
    
        // ============List Table=========

        const [perPageCount, setperPageCount] = useState(5)
        const [pageCount, setpageCount] = useState(1)
        const [currentPage, setcurrentPage] = useState(0)
        const [lastPage, setlastPage] = useState(0)
        const [totalCount, settotalCount] = useState(0)
        const [exportData, setexportData] = useState()
        const [csvStatus, setcsvStatus] = useState(false)

    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)

    const searchFun = () => {
        
        setloader(true)
        // props.loading(loader)

        console.log("entered in new method...")

        console.log(`data before hitting api (${props?.api+'?page='+pageCount}) => `, {...props?.requestBody, perPage: perPageCount})

        axios.post(
            props?.api+'?page='+pageCount, {...props?.requestBody, perPage: perPageCount}, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('search success => ', res)
                setdataList(res?.data?.data?.data)
                settotalCount(res?.data?.data?.total)
                setcurrentPage(res?.data?.data?.current_page)
                setlastPage(res?.data?.data?.last_page)
            } else {
                console.log('error while search => ', res)
            }

            setloader(false)
        })
        .catch((err) => (console.log('error while search => ', err), setloader(false)))

    }

    const searchOldFun = () => {
        
        setloader(true)
        console.log("entered in old method... data before hitting", props?.requestBody)

        console.log(`data before hitting api (${props?.api}) => `, {...props?.requestBody, perPage: perPageCount, page: pageCount})

        axios.post(
            props?.api, {...props?.requestBody, perPage: perPageCount, page: pageCount}, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                console.log('search success => ', res)
                props?.getData && props?.allData(res?.data?.data)
                setdataList(res?.data?.data?.data)
                settotalCount(res?.data?.data?.total)
                setcurrentPage(res?.data?.data?.current_page)
                setlastPage(res?.data?.data?.last_page)
            } else {
                console.log('error while search => ', res)
            }

            setloader(false)
        })
        .catch((err) => (console.log('error while search => ', err), setloader(false)))

    }

    useEffect(() => {
        if(props?.requestBody!= null && props?.type == 'new') {
            console.log('calling new fun')
            setpageCount(1)
            setperPageCount(5)
            searchFun()
        }

        if(props?.requestBody!= null && props?.type == 'old') {
            console.log('calling old fun')
            setpageCount(1)
            setperPageCount(5)
            searchOldFun()
        }
        console.log('change data', props?.changeData, 'and requestBody => ', props?.requestBody)
    }, [props?.changeData])

        const nextPageFun = () => {
            setpageCount(currentPage + 1)
        }
    
        const prevPageFun = () => {
            setpageCount(currentPage - 1)
        }
    
        const perPageFun = (val) => {
            setperPageCount(val)
        }
    
        useEffect(() => {
            setloader(true)
            props?.type == 'new' && searchFun()
            props?.type == 'old' && searchOldFun()
        }, [pageCount, perPageCount])

        const firstPageFun = () => {
            setpageCount(1)
        }

        const lastPageFun = () =>{
            setpageCount(lastPage)
        }
    
        const exportDataFun = () => {

            setloader(true)
            setcsvStatus(false)

            // console.log('exporting data body => ', {...props?.requestBody, perPage: totalCount})

        props?.type == 'new' && axios.post(
            props?.api+'?page=1', {...props?.requestBody, perPage: totalCount}, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                // console.log('search success => ', res)
                setexportData(res?.data?.data?.data)
                downloadFun()
            } else {
                // console.log('error while search => ', res)
            }

            setloader(false)
        })
        .catch((err) => {
            // console.log('error while search => ', err)
            setloader(false)
        })

        props?.type == 'old' && axios.post(
            props?.api, {...props?.requestBody, perPage: totalCount}, ApiHeader())
        .then((res) => {
            if(res?.data?.status == true){
                // console.log('search success => ', res)
                setexportData(res?.data?.data?.data)
                downloadFun()
            } else {
                // console.log('error while search => ', res)
            }

            setloader(false)
        })
        .catch((err) => {
            // console.log('error while search => ', err)
            setloader(false)
        })

        }
    
        const downloadFun = () => {
            setcsvStatus(true)
        }
    
console.log('getting margin status', props?.margin)
  return (
    <>
     {
                csvStatus && <CSVDownload data={exportData} />
            }

            {
                loader && <BarLoader />
            }
    
    {
            (dataList != undefined && dataList?.length != 0) ? 

            <>
                {props?.margin ? 
                
            <ListTableMargin currentPage={currentPage} lastPage={lastPage} goFirst={firstPageFun} goLast={lastPageFun} count1={totalCount} columns={props?.columns} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} />
                
            :
            <ListTable2 currentPage={currentPage} lastPage={lastPage} goFirst={firstPageFun} goLast={lastPageFun} count1={totalCount} columns={props?.columns} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} />
            
            }
            </>
            
            :

            <>{!loader && <div className='w-full my-4 text-center text-red-500 text-lg font-bold'>No Data Found</div>}</>

    }
    
    </>
  )
}

export default ListTableConnect