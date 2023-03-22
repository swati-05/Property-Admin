//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - SearchComponent
//    DESCRIPTION - SearchComponent Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function SearchComponent2({ searchText, filter, setFilter }) {
  return (
    <>
      <div className='my-2 flex'>
       <p className='mx-2 font-semibold'> Search in Result {searchText} : </p>
        <input className='border border-gray-600 px-2 bg-gray-100 py-1 outline-1 outline-blue-400 active:bg-gray-200 rounded-sm' type="text" value={filter || ''} onChange={e => setFilter(e.target.value)} />
      </div>
    </>
  )
}

export default SearchComponent2
/**
 * Exported to :
 * 1. UserPermissionDataTable Component
 * 
 */