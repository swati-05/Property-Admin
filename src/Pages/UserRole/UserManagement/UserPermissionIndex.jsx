import React, { useState } from 'react'
import RoleWardProfileTab from './RoleWardProfileTab'
import UserPermissionList from './UserPermissionList'

function UserPermissionIndex() {
    const [list, setlist] = useState(true)
    const [addNew, setaddNew] = useState(false)
    const [allAction, setAllAction] = useState(false)
    const [btnId, setBtnId] = useState()
    const [userName, setUserName] = useState()


    const addNewPermission = () => {
        setaddNew(true)
        setlist(false)
        setAllAction(false)
    }

    const handleViewBtn = (e) => {
        setBtnId(e)
        setlist(false)
        setaddNew(false)
        setAllAction(false)

    }
    const handleBackBtn = () => {
        setlist(true)
        setaddNew(false)
        setAllAction(false)
    }

    const allActionBtn =(id,userName)=>{
        console.log('Received ID and Username ',id," ",userName)
        setBtnId(id)
        setUserName(userName)
        setlist(false)
        setaddNew(false)
        setAllAction(true)
    }


    return (
        <>
            {list && <UserPermissionList viewBtn={handleViewBtn} addNewPermission={addNewPermission} allActionBtn={allActionBtn}/>}
            {allAction && <RoleWardProfileTab handleBackBtn={handleBackBtn}  btnId={btnId} userName={userName}/> }
        </>
    )
}

export default UserPermissionIndex

/*
Exported to
1 . UserRoleSideBar.js
*/