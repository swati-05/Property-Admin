//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 11 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - BasicTable
//    DESCRIPTION - BasicTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { GrFormView } from 'react-icons/gr';
import { CSVLink } from "react-csv";
import GlobalFilter from '@/Components/Common/ListTable/GlobalFilter';
import { format } from 'date-fns';
import axios from 'axios';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import ApiAddModal from './ApiAddModal';
import ApiViewModal from './ApiViewModel';
import AddApi from './AddApi';
import { TRADE, HEADER } from './TradeApiListFile';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function ApiList(props) {

    const handleUpdateSwitch = (id) => {
        // props.fun(6) 
        // props.idApi(document.getElementById('update_btn').value,6)
        props.idApiFun(id, 6)
        // console.log('idApi is ',props.idApi)

    }

    const COLUMNS = [
        {
            Header: 'ACTION',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div className=''>
                    <span>
                        <button>
                            <ApiViewModal id={cell.row.values.id} />
                        </button>
                    </span>
                    <span>
                        <button id="update_btn" onClick={() => handleUpdateSwitch(cell.row.values.id)} >
                            {cell.row.values.id} <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </span>
                </div>
            )
        },
        {
            Header: 'DISCONTINUED',
            accessor: 'discontinued',
            Cell: ({ cell }) => (
                <button
                    //onClick={(e) => props.fun(cell.row.values.discontinued)} 
                    className={(cell.row.values.discontinued == 0 ? ' text-green-500 ' : 'text-red-500') + ' px-3 py-1 rounded-lg shadow-lg hover:shadow-xl '}>
                    {/* View {cell.row.values.id} */}
                    {(cell.row.values.discontinued == 0) ? 'Active' : 'Discontinued'}
                </button>
            )
        },
        {
            Header: 'CATEGORY',
            accessor: 'category'
        },
        {
            Header: 'API ENDPOINT',
            accessor: 'end_point'
        },
        {
            Header: 'tags',
            accessor: 'tags',
            // Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

        },
        // {
        //     Header: 'Created At',
        //     accessor: 'created_at',
        //     Cell: ({ cell }) => (
        //         <button  
        //         className={' px-3 py-1 rounded-lg shadow-lg hover:shadow-xl'}>
        //            {toString(const d = new Date('2022-04-12')mdfhkghkgdfjkgdgdfgddfgdfgd}
        //         </button>
        //     )
        // },
        // {
        //     Header: 'REVISION NO',
        //     accessor: 'revision_no'
        // },
        // {
        //     Header: 'REMARKS',
        //     accessor: 'remarks'
        // },
        // {
        //     Header: 'RESPONSE FORMAT',
        //     accessor: 'response_format'
        // },



    ]

    const [bounce, setbounce] = useState('hidden')
    const [applicationLIst, setApplicationLIst] = useState([
        {
            id: 1,
            api_url: "user",
            pre_conditions: "user",
            expected_payload: "user",
            revision_no: "user",
            remarks: "user",
            status: "user",
            response_format: "user",
            category: "user",
        }
    ])
    const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => MOCK_DATA, [])
    const data = useMemo(() => applicationLIst, [applicationLIst])
    let counter = 1;
    const [loading, setLoading] = useState("");
    const [Roles, setRoles] = useState()

    // const urlString = "http://localhost:3333/";
    // const dbApi = "ApiData";

    // console.log(urlString + dbApi);

    useEffect(() => {

        setPageSize(5)
        fetchAppList()

    }, [])

    const fetchAppList = () => {
        axios.get(TRADE.GET_API_LIST, HEADER)
            .then(function (response) {

                setTimeout(() => {
                    console.log(response)
                    setApplicationLIst(response.data)

                    setLoading("hidden");
                }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        // console.log(urlString + dbRole)
        // axios.get(urlString + dbRole)
        //     .then(function (result) {
        //         setRoles(result.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

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
        setGlobalFilter
    } = useTable({
        columns,
        data,
        // applicationLIst,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <>

            <div className="flex mb-2 pb-2 ">
                <div class="flow-root ">
                    <div class={loading + " spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full float-right justify-right"} role="status">
                        <span class="visually-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>

                        </span>
                    </div>
                </div>
                <div className='flex-initial'><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
                {/* <div className='flex-initial ml-2'><button className='bg-sky-400 px-3 shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-sky-500 text-center relative'><CSVLink data={data}>Export</CSVLink></button></div> */}
                <div className={' flex-initial ml-2'}><button className='bg-sky-400 px-3 pr-3  shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-green-600 text-center relative' onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')}><CSVLink data={applicationLIst}>Export</CSVLink><div className={bounce + ' absolute h-full top-3 text-sm left-0 text-center animate-bounce'}><AiOutlineArrowDown /></div></button></div>
                <div className='flex-initial flex'>
                    <div className="flex">
                        {/* <div className='flex-initial h-4 w-4 text-green-900 text-xs font-semibold text-center bg-green-200 rounded-full flex-initial ml-4 '>N</div> */}
                        <div className='text-xs ml-2'>
                            <button onClick={() => props.fun(5)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" > ADD NEW </button>
                        </div>
                        {/* <div className='flex-initial h-4 w-4 bg-blue-200 h-4 w-4 text-blue-900 text-xs font-semibold text-center rounded-full flex-initial ml-4'>R</div><div className='flex-initial text-xs ml-2'> Re-Assessment</div>
                    <div className='flex-initial h-4 w-4 bg-red-200 h-4 w-4 text-red-900 text-xs font-semibold text-center rounded-full flex-initial ml-4'>M</div><div className='flex-initial text-xs ml-2'> Mutation</div> */}
                    </div>
                    {/* <div></div>
                    <div></div> */}
                </div>
            </div>
            <div className=" py-2 overflow-x-auto bg-white">
                <div className="inline-block min-w-full px-4  rounded-lg overflow-hidden bg-white">
                    <table {...getTableBodyProps} className="min-w-full leading-normal ">
                        <thead className='font-bold text-right text-sm bg-sky-50'>
                            {
                                headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        <th className=''>#. </th>
                                        {
                                            headerGroup.headers.map((column) => (
                                                <>

                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase text-center">{column.render('Header')}
                                                        <span>{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}</span></th>
                                                </>
                                            ))
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="text-sm ">
                            {/* {rows.map((row) => { */} {/**since used pagination */}
                            {page.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className="bg-white shadow-lg border-b border-gray-200">
                                        <td className='text-right border '>{counter++}</td>
                                        {row.cells.map((cell) => {
                                            return (
                                                <>

                                                    <td {...cell.getCellProps()} className="px-5 py-2 text-center border  text-sm">{cell.render('Cell')}</td>
                                                </>
                                            )
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
                        <div className='col-span-2'>  <select className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    show {pageSize}
                                </option>
                            ))}

                        </select></div>
                        <div className='col-span-4 text-center col-start-5'>   <span >
                            page {''}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{''}
                        </span></div>

                        <div className='col-span-4 text-right'><button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button>
                            <button className={(!canPreviousPage ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white'} onClick={() => previousPage()} disabled={!canPreviousPage}>⬅️</button>
                            <button className={(!canNextPage ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white'} onClick={() => nextPage()} disabled={!canNextPage}>➡️</button>
                            <button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>  <AiOutlineDoubleRight /></button></div>



                    </div>
                </div>
            </div>

        </>
    )
}

export default ApiList
/**
 * Exported to :
 * 1. MailboxContent Component
 * 
 */