import React, { useState } from 'react'
import RoleWiseUser from './RoleWiseUser'
import ViewUsersInARole from './ViewUsersInARole'

function RoleWiseUserIndex() {

    const [btnId, setBtnId] = useState()
    const [roleName, setRoleName] = useState()
    const [rolePage, setRolePage] = useState(true)
    const [viewPage, setViewPage] = useState(false)

    const viewUsersBtn = (btnId, RoleName) => {
        setBtnId(btnId)
        setRoleName(RoleName)
        setViewPage(true)
        setRolePage(false)
    }
    const handleBackBtn = () => {
        setRolePage(true)
        setViewPage(false)
    }

    return (
        <>
            {rolePage && <RoleWiseUser viewBtn={viewUsersBtn} />}
            {viewPage && <ViewUsersInARole handleBackBtn={handleBackBtn} btnId={btnId} roleName={roleName} />}
        </>
    )
}

export default RoleWiseUserIndex

/*
Export :-
1. UserRoleSideBar.js
*/