import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsFactory from '../DetailsFactory'

function ConcessionDetailsEntry() {

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Concession Details')

    // const { id } = useParams()
    // LIST OF API'S
    const { get_ConcessionDetailsById } = CitizenApplyApiList()

    const detailRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getAppicationFullDetail: { method: 'post', url: get_ConcessionDetailsById },
        },
        detailInfo: {
            title: 'Concession Details',
        },

        filters: {
            // PASS true IF YOU WANT TO SEARCH TRANSACTIONS VIA APPLICATION NO ALSO
            topButtons: false
        }
    }
    return (
        <CustomErrorBoundary errorMsg="Bug in TransactionHistoryFactory" >
            <DetailsFactory detailRules={detailRules} />
        </CustomErrorBoundary>
    )
}

export default ConcessionDetailsEntry