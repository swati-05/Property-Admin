import React,{useEffect} from 'react'
import { contextVar } from '@/Components/Context/Context'

function useSetTitle(props) {

    const { settitleText } = React.useContext(contextVar)
    useEffect(() => {
        settitleText(props)
    }, [])


}

export default useSetTitle