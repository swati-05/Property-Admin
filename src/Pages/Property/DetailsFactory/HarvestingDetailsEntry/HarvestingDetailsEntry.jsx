import CitizenApplyApiList from '@/Components/CitizenApplyApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsFactory from '../DetailsFactory'

function HarvestingDetailsEntry() {

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('Rainwater Harvesting Details')

    // const { id } = useParams()
    // LIST OF API'S
    const { get_HarvestingDetailsById } = CitizenApplyApiList()

    const detailRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getAppicationFullDetail: { method: 'post', url: get_HarvestingDetailsById },
        },
        detailInfo: {
            title: 'RainWater-Harvesting Details',
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

export default HarvestingDetailsEntry