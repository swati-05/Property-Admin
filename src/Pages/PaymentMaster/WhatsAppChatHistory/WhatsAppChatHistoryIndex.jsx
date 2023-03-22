import React from 'react'
import ListTable from '@/Components/Common/ListTable/ListTable';
import axios from 'axios';
import { useQuery } from "react-query";



const WhatsAppChatHistoryIndex = () => {
    const header = {
        headers: {
            Accept: "application/json",
        },
    };

    const COLUMNS = [
        {
            Header: 'Sl.',
            Cell: ({ row }) => (
                <div className='px-2 font-semibold'>{row.index + 1}.</div>
            )
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Phone",
            accessor: "phone",
        },
        {
            Header: "Message",
            accessor: "message",
        },
        {
            Header: "timestamp",
            accessor: "timestamp",
        }

    ]

    const { isLoading, data, refetch, isError, error } = useQuery("WHATSAPPget-all-roleserew-query", () => {
        return axios.get(`http://localhost:5002/wp/data`, header);
    },
        {
            refetchInterval: 2000,
        }
    );

    console.log("WhatsAPppppppppp========", data)
    return (
        <>

            <p className=' mx-10 py-5'></p>
            <p>Whatsts s</p>
            <div className='my-5 mx-2'>
                {data?.data && <ListTable columns={COLUMNS} dataList={data?.data?.data} />}
            </div>
        </>
    )
}

export default WhatsAppChatHistoryIndex