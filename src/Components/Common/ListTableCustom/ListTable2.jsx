//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTable
//    DESCRIPTION - ListTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { CSVLink } from "react-csv";
import GlobalFilter from './GlobalFilter'
import {BsExclamationCircleFill} from 'react-icons/bs'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'


function ListTable2(props) {

    const [bounce, setbounce] = useState('hidden')
    const columns = useMemo(() => props.columns, [])
    const data = useMemo(() => props.dataList, [props.dataList, props?.totalCount])
    const [pageInd, setpageInd] = useState(1)
    const [canNext, setcanNext] = useState(true)
    const [canPrev, setcanPrev] = useState(true)
    const [perPageC, setperPageC] = useState(0)
    
    useEffect(() => {
        setpageInd(1)
    }, [props?.totalCount])

    useEffect(() => {
        setcanNext(true)
        setcanPrev(true)

        let rs = props?.totalCount/props?.perPage
        let rm = props?.totalCount%props?.perPage
        
        if(rm != 0){
            setPageSize((parseInt(rs))+1)
        }
        else{
            setPageSize(parseInt(rs))
        }
    
        if(pageSize == pageInd) {
            setcanNext(false)
        }
        if(pageSize == pageInd || pageInd == 1) {
            setcanPrev(false)
        }
    },[props?.totalCount, perPageC])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,//since used pagination
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        rows,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    const nextPageFun = () => {

        if(pageSize != pageInd){
            setpageInd(pageInd + 1)
            setcanPrev(true)
            console.log("clicked next true")
            props.nextPage()
        }

        if(pageSize == pageInd) {
            setcanNext(false)
            console.log("clicked next false")
        }
    }

    const prevPageFun = () => {
        if(pageInd != 1){
            console.log("clicked prev true")
            setcanNext(true)
            setpageInd(pageInd - 1)
            props.prevPage()
        }

        if(pageInd == 1) {
            console.log("clicked prev false")
            setcanPrev(false)
        }
    }

    return (
        <>
        

            <div className="flex mb-2 pb-2">
                <div className='flex-initial opacity-50'><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
           <div className='flex-initial ml-2'><button className='bg-sky-400 px-3 pr-3  shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-green-600 text-center relative' onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')} onClick={props.exportDataF}>
                        Export
                        <div className={bounce + ' absolute h-full top-3 text-sm left-0 text-center animate-bounce'}><AiOutlineArrowDown /></div></button></div>
                <div className='flex-1'>{props.children}</div>
                
            </div>
            <div className="flex w-full">
                <div className='flex-1'><span className='opacity-50'>Total Result :&nbsp;</span><span className='font-semibold'>{props?.totalCount}</span> </div>
               {/* {props.title2 !='' && <div className='flex-1 text-right pr-4'><span className='opacity-50'>{props.title2}</span><span className='font-semibold'>{props.count2}</span> </div>} */}
            </div>
            {props?.feedback !=null && <div ><span className='text-xs bg-gray-200 opacity-50 pr-2 pl-1 py-1 rounded-sm'><BsExclamationCircleFill className="inline text-xs text-gray-400 mr-2" />{props.feedback}</span></div>}
            <div className=" py-2 overflow-x-auto bg-white">
                <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
                    <table {...getTableBodyProps} className="min-w-full leading-normal">
                        <thead className='font-bold text-left text-sm bg-sky-50'>
                            {
                                headerGroups?.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-left">{column.render('Header')}
                                                    <span>{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}</span></th>

                                            ))
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="text-sm">
                            {rows.map((row, index) => { {/**since used pagination */}
                            {/* {page?.map((row) => { */}
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className="bg-white shadow-lg border-b border-gray-200">
                                        {/* <td>{((pageInd-1)*props?.perPage)+index+1}</td> */}
                                        {row?.cells?.map((cell) => {
                                            return <td {...cell.getCellProps()} className="px-2 py-2 text-sm text-left">{cell.render('Cell')}</td>

                                            // return <td {...cell.getCellProps()} className={`px-2 py-2 text-sm text-left ${cell.getCellProps().key == 'cell_9_consumerName' ? 'hidden' : ''}`}>{cell.render('Cell')}</td>

                                        })}
                                    </tr>
                                )
                            })}
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='mt-3 grid grid-cols-12'>
                        {/* <span> Search Page Option
                            | Go to page : {''}
                            <input className='border-2 border-black rounded-lg' type="text" defaultValue={pageIndex + 1} onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }} />
                        </span> */}
                        <div className='col-span-2'>  <select className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={perPageC} onChange={(e) => {
                            setperPageC(Number(e.target.value))
                            props.perPageC(Number(e.target.value))
                            }}>
                            {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    show {pageSize}
                                </option>
                            ))}

                        </select></div>
                        <div className='col-span-4 text-center col-start-5'>   <span >
                            page {''}
                            <strong>
                                {/* {pageIndex + 1} of {pageOptions.length} */}
                                {pageInd} of {pageSize}
                            </strong>{''}
                        </span></div>

                        <div className='col-span-4 text-right'>
                            {/* <button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button> */}
                            <button className={(!canPrev ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white'} onClick={() => prevPageFun()} disabled={!canPrev}>⬅️</button>
                            <button className={(!canNext ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white'} onClick={() => nextPageFun()} disabled={!canNext}>➡️</button>
                            {/* <button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => gotoPage(pageCount - 1)} >  <AiOutlineDoubleRight /></button> */}
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default ListTable2
/**
 * Exported to :
 * 1. MailboxContent Component
 * 2. PropertySafApplicationList Component
 * 
 */