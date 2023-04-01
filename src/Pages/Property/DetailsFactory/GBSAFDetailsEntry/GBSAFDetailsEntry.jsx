import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import CustomErrorBoundary from '@/Components/Common/CustomErrorBoundary'
import useSetTitle from '@/Components/GlobalData/useSetTitle'
import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsFactory from '../DetailsFactory'

function GBSAFDetailsEntry() {

    // SETTING GLOBAL TITLE AT ONCE USING CUSTOM HOOK
    useSetTitle('GB Details')

    // const { id } = useParams()
    // LIST OF API'S
    const { get_GbSafDetailsById } = PropertyApiList()

    const detailRules = {
        api: {
            // 1 - API TO FETCH TRANSACTION HISTORY LIST
            api_getAppicationFullDetail: { method: 'post', url: get_GbSafDetailsById },
        },
        detailInfo: {
            title: 'GBSAF Details',
        },


        filters: {
            // PASS true IF YOU WANT TO SEARCH TRANSACTIONS VIA APPLICATION NO ALSO
            topButtons: false
        }
    }
    console.log('gb saf page is calling...')
    return (
        <CustomErrorBoundary errorMsg="Bug in GBSAF " >
            <DetailsFactory detailRules={detailRules} />
        </CustomErrorBoundary>
    )
}

export default GBSAFDetailsEntry