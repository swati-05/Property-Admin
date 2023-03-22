import React, { useEffect, useContext } from 'react'
import { contextVar } from '@/Components/Context/Context'

function UseSetConfirmBox(props) {

    const { setconfirmBoxOpenStatus } = useContext(contextVar)
    useEffect(() => {
        setconfirmBoxOpenStatus(props)
    }, [])


}

export default UseSetConfirmBox