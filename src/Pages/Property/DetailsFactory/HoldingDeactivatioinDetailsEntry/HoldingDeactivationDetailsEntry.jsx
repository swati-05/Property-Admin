import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsFactory from '../DetailsFactory'

function HoldingDeactivationDetailsEntry() {

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Holding Deactivation Details')

    // const { id } = useParams()
    // LIST OF API'S
    const { get_HoldingDeactivationDetailsById } = PropertyApiList()

    const detailRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getAppicationFullDetail: { method: 'post', url: get_HoldingDeactivationDetailsById },
        },
        detailInfo: {
            title: 'Holding Deactivation Details',
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

export default HoldingDeactivationDetailsEntry