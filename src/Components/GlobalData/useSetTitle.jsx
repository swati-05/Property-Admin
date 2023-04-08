import React,{useEffect} from 'react'
import { contextVar } from '@/Components/Context/Context'

function useSetTitle(title,status) {

    const { settitleText,settitleBarVisibility } = React.useContext(contextVar)
    useEffect(() => {
        settitleText(title)
        settitleBarVisibility(status)
    }, [])


}

export default useSetTitle