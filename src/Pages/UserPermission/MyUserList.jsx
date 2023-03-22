//////////////////////////////////////////////////////////////////////////////////////
//    Author - Anshuman
//    Version - 1.0
//    Date - 11 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - BasicTable
//    DESCRIPTION - BasicTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { GrFormView } from 'react-icons/gr'
import { CSVLink } from "react-csv";
import GlobalFilter from '../../Components/Common/ListTable/GlobalFilter'
import { format } from 'date-fns'
import axios from 'axios'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import MyAddUserTypeModal from './MyAddUserTypeModal';


function MyUserList(props) {
    const COLUMNS = [

        {
            Header: 'User',
            accessor: 'user_type'
        },
        // {
        //     Header: 'User Type',
        //     accessor: 'user_type',
        //     // Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

        // },
        // {
        //     Header: 'Roles',
        //     accessor: 'role_id'
        // },
        {
            Header: 'View',
            accessor: 'id',
            Cell: ({ cell }) => (
                // (e) => props.fun(cell.row.values.id)
                <button onClick=""
                    className='bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black'>
                    {/* View {cell.row.values.id} */}
                    <GrFormView className='inline text-lg' />View </button>
            )
        }

        // {
        //     Header: 'Owner Name',
        //     accessor: 'owner_name'
        // },
        // {
        //     Header: 'Property Type',
        //     accessor: 'property_type'
        // },
        // {
        //     Header: 'Assessment Type',
        //     accessor: 'assessment_type', Cell: ({ cell }) => (

        //         <div className={' rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 text-sm px-1  ' + (cell.row.values.assessment_type == 'New Assessment' ? 'bg-green-200 text-green-900 ' : '') + (cell.row.values.assessment_type == 'Reassessment' ? 'bg-indigo-200 text-indigo-900 ' : '') + (cell.row.values.assessment_type == 'Mutation' ? 'bg-red-200 text-red-900 ' : '')}>
        //             {/* {cell.row.values.assessment_type} */}
        //             {Array.from(cell.row.values.assessment_type)[0]}
        //         </div>
        //     )
        // }
        // ,


    ]

    const [bounce, setbounce] = useState('hidden')
    const [applicationLIst, setApplicationLIst] = useState([{ "id": 1, "user_type": "vendor" },
    { "id": 2, "role": "User" }])
    const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => MOCK_DATA, [])
    const data = useMemo(() => applicationLIst, [applicationLIst])
    let counter = 1;
    const [loading, setLoading] = useState("");
    const [Roles, setRoles] = useState()

    const urlString = "http://localhost:3333/";
    const dbRole = "roles";

    useEffect(() => {

        setPageSize(5)
        fetchAppList()

    }, [])

    const fetchAppList = () => {
        axios.get('http://localhost:3333/user_types')
            .then(function (response) {

                setTimeout(() => {
                    setApplicationLIst(response.data)

                    setLoading("hidden");
                }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        console.log(urlString + dbRole)
        axios.get(urlString + dbRole)
            .then(function (result) {
                setRoles(result.data);
            })
            .catch(function (error) {
                console.log(error);
            })
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
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" > <MyAddUserTypeModal roles={Roles} fun={fetchAppList}/> </button>
                        </div>
                        {/* <div className='flex-initial h-4 w-4 bg-blue-200 h-4 w-4 text-blue-900 text-xs font-semibold text-center rounded-full flex-initial ml-4'>R</div><div className='flex-initial text-xs ml-2'> Re-Assessment</div>
                    <div className='flex-initial h-4 w-4 bg-red-200 h-4 w-4 text-red-900 text-xs font-semibold text-center rounded-full flex-initial ml-4'>M</div><div className='flex-initial text-xs ml-2'> Mutation</div> */}
                    </div>
                    {/* <div></div>
                    <div></div> */}
                </div>
            </div>
            <div className=" py-2 overflow-x-auto bg-white">
                <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
                    <table {...getTableBodyProps} className="min-w-full leading-normal ">
                        <thead className='font-bold text-right text-sm bg-sky-50'>
                            {
                                headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        <th>#. </th>
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
                                        <td className='text-right'>{counter++}</td>
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

export default MyUserList
/**
 * Exported to :
 * 1. MailboxContent Component
 * 
 */