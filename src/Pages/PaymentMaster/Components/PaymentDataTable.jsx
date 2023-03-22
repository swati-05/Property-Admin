//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 16 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react'
import { useTable, usePagination, useRowSelect } from 'react-table'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import Tooltip from "@material-ui/core/Tooltip";
import { ArrowForward, FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';


const IndeterminateCheckbox = React.forwardRef(
  // ({ title1, callThis, callThisFun, indeterminate, ...rest }, ref) => {
    ({ title1, callThis, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef


    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    // console.log("Lovis..",title1)

    return (
      <>
        {/* <input type="checkbox" onClick={()=>callThis()} ref={resolvedRef} {...rest} /> */}
        <input type="checkbox"  ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function PaymentDataTable({ fun, columns, data }) {

  const [selectedDataArray, setSelectedDataArray] = useState([])

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox   {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              {/* <IndeterminateCheckbox callThis={callThisFun} title1="86s71f8" callThisFun={callThisFun} {...row.getToggleRowSelectedProps()} /> */}
              <IndeterminateCheckbox  {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  // console.log("original data Test..", selectedFlatRows)

  // const callThisFun = () => {
  //   console.log("Good News..........", selectedFlatRows)
  //   // fun(selectedFlatRows)
  // }

  useEffect(() => {
    // fun(selectedFlatRows)
    fun(selectedFlatRows)
    // console.log("Selected data is ", selectedFlatRows)
    // selectedFlatRows.map((e) => (
    //   console.log("Selected ID in DataTable",e.original.id),
    //   setSelectedDataArray(e.original.id)
    // ))
    // console.log("Data in State",selectedDataArray)
  },[selectedFlatRows])


  // Render the UI for your table
  return (
    <>
      <div className="overflow-hidden">
        <table {...getTableProps()} className="min-w-full leading-normal">
          <thead className='font-bold text-center text-sm bg-gray-200'>
            {headerGroups.map(headerGroup => (
              <tr className='' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    // className="px-6 -pt-8 pb-5 bg-blue-500 text-white text-left text-xs leading-4 font-medium uppercase tracking-wider"
                    className="px-2 py-3 border-b border-gray-200 text-gray-800 text-xs uppercase text-center"
                    {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr className='' {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return <td
                      style={{backgroundColor: !row.isSelected ? "" : "#b6fcc0", color: !row.isSelected ? "" : "#000000" }}
                      className="px-2 py-2 bg-gray-50 text-left leading-4 text-sm text-gray-900 tracking-wider border-b "
                      {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}

      <div className="pagination grid grid-cols-12 mt-5">
        <div className='col-span-4'>
          <button className='hover:bg-gray-300' onClick={() => gotoPage(0)} disabled={!canPreviousPage}> <FirstPage /> </button>{' '}  {/* {'First PAge'} */}
          <button className='hover:bg-gray-300' onClick={() => previousPage()} disabled={!canPreviousPage}><NavigateBefore /> </button>{' '}
          <button className='hover:bg-gray-300' onClick={() => nextPage()} disabled={!canNextPage}><NavigateNext /></button>{' '} {/* {'Next Page'} */}
          <button className='hover:bg-gray-300' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><LastPage /></button>{' '} {/* LAst Page*/}
        </div>
        <div className='col-span-4 justify-self-center md:px-4'>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        {/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
          </span>{' '} */}
        <div className='col-span-4 justify-self-end md:px-4'>

          <select className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

        </div>

        {/* <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre> */}


        {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIdsDIPU: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}

      </div>
    </>
  )
}

// function DataTable(props) {

//   // const serverData = props.data



//   // const data = React.useMemo(() => makeData(100000), [])

//   return (
//     <div className=''>

//       <Table columns={props.columns} data={props.data} />
//     </div>

//   )
// }

export default PaymentDataTable
