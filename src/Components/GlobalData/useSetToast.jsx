import React, { useEffect } from 'react'
import { contextVar } from '@/Components/Context/Context'

function useSetToast(props) {

    const { notify } = React.useContext(contextVar)
    return notify


}

export default useSetToast