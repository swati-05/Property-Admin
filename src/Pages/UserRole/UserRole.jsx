//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 19 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import UserRoleSideBar from './UserRoleSideBar'
import useSetTitle from '@/Components/GlobalData/useSetTitle'

function UserRole() {

  useSetTitle("User Role Management Workfow")

  return (
    <UserRoleSideBar />
  )
}

export default UserRole
/*
Exported to -
App.js
*/