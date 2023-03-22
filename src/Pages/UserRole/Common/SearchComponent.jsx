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

function SearchComponent({ searchText, filter, setFilter }) {
  return (
    <>
      <div className='my-2 flex'>
       <p className='mx-2 font-semibold'> Search {searchText} : </p>
        <input className='border-2 border-gray-600 px-2 bg-gray-200 rounded-sm' type="text" value={filter || ''} onChange={e => setFilter(e.target.value)} />
      </div>
    </>
  )
}

export default SearchComponent
/**
 * Exported to :
 * 1. UserPermissionDataTable Component
 * 
 */