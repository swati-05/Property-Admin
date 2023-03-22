import React, { useEffect } from 'react'
import { contextVar } from '@/Components/Context/Context'

export function useSetActiveMenuId(menuId) {

    const { setactiveMenuId } = React.useContext(contextVar)
    useEffect(() => {
        setactiveMenuId(menuId)
    }, [])


}
export function useGetActiveMenuId() {

    const { activeMenuId } = React.useContext(contextVar)
    return activeMenuId

}
export function useToast() {

    const { notify } = React.useContext(contextVar)
    return notify

}
