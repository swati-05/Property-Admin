

//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 14 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PropertySafInbox (closed)
//    DESCRIPTION - PropertySafInbox Component
//      Name - Swati sharma (integrated Api)
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import ListTable from '@/Components/Common/ListTable/ListTable'
import ErrorPage from '@/Components/TestDelete/ErrorPage'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import ApiHeader from '@/Components/ApiList/ApiHeader'

function TcVerificationInbox(props) {
    const [tableState, setTableState] = useState(false)
    const { api_safInboxList } = ProjectApiList()

    const navigate = useNavigate()

    const COLUMNS = [

        {
            Header: '#',
            // accessor: 'ward_no'
            Cell: ({ row }) => (
                <div className='pr-2'>{row.index + 1}</div>
            )
        },
        {
            Header: 'Ward No',
            accessor: 'ward_no'
        },
        {
            Header: 'Saf No.',
            accessor: 'saf_no'
        },
        {
            Header: 'Owner Name',
            accessor: 'owner_name'
        },
        {
            Header: 'Property Type',
            accessor: 'property_type'
        },
        {
            Header: 'Assessment Type',
            accessor: 'assessment', Cell: ({ cell }) => (

                <div className={' rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 text-sm px-1  ' + (cell.row.values.assessment == 'New Assessment' ? 'bg-green-200 text-green-900 ' : '') + (cell.row.values.assessment == 'Re Assessment' ? 'bg-indigo-200 text-indigo-900 ' : '') + (cell.row.values.assessment == 'Mutation' ? 'bg-red-200 text-red-900' : '')}>
                    {Array.from(cell.row.values.assessment)[0]}
                </div >
            )
        }
        ,
        // {
        //     Header: 'Apply Date',
        //     accessor: 'apply_date',
        //     Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

        // }
        // ,
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <button onClick={() => navigate(`/tcVerificationform/${cell.row.values.id}`)} className='bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 
                hover:text-white text-black'>
                    View
                </button>
            )
        }
    ]

    const header = ApiHeader()
    const onSuccess = (data) => {
        console.log('after fetching inbox list ....', data?.data)
        // if table array is not empty then activate table
        { (data?.data?.data?.length > 0) && setTableState(true) }
    }

    const { isLoading, data, isError, error } = useQuery("safinboxList", () => {
        return axios.get(api_safInboxList, header);
    }, {
        onSuccess,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });


    // if(!isLoading){
    //     console.log('inbox custom quey fething data ....',data.data.data_list)
    // }
    return (
        <>

            {isLoading && <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />}
        <h1 className='font-semibold text-lg mb-10'>Tc Saf Verfication List</h1>
            {isError && <ErrorPage />}
            {!isLoading && (!isError && (tableState == false && <img src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1670928336~exp=1670928936~hmac=f302bdb0c5ae2eefe90caf7e2833a205512274ef897149ea35603fa25481a644' className='mx-auto '/>))}

            {!isLoading && (!isError && (tableState && <ListTable assessmentType={false} columns={COLUMNS} dataList={data?.data?.data} />))}
            {/* {!isLoading &&(!tableState && <NoData/>)} */}
        </>
    )
}

export default TcVerificationInbox
/**
 * Exported to :
 * 1. PropertySafInbox Component
 * 
 */