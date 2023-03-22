> Author - Talib Hussain

> Version - 1.0

> Date - 13 july 2022

> Revision - 1

> Project - JUIDCO



#  Common Files use case

> Rules

    1. no customization
    2. use from anywhere

> `MailboxSidebar` - sidebar of the mailbox design pattern (accept parameters)

        1
        <MailboxSidebar tabs={tabs} fun={tabSwitch} />

        2
        const tabs = [
            { title: "Workflow", tabIndex: 0 },
            { title: "Generator", tabIndex: 1 },
            { title: ".......................", tabIndex: 2 }
        ]

        3
        const [tabIndex, setTabIndex] = useState(0)
        const tabSwitch = (index) => {
                            settabIndex(index)
                        }

        4
        <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2 border-sky-200 bg-gray-200">
                <div className='col-span-12 sm:col-span-2 '> <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' 
                style={{ 'height': '90vh' }}><WorkFlow /></div>}       
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' 
                style={{ 'height': '90vh' }}><WorkflowGeneratorIndex/></div>}       
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-10 shadow-lg bg-white overflow-y-scroll' 
                style={{ 'height': '90vh' }}>.........</div>}       

            </div>


> `ListTable` - table list component, use with react query (accept parameters)

        1
        {isLoading && <h1>Looading ...</h1>}
        {!isLoading && <ListTable columns={COLUMNS} dataList={data?.data} />}

        2  
        const COLUMNS = [

        {
            Header: 'Ward No.',
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
            accessor: 'assessment_type', Cell: ({ cell }) => (

                <div className={' rounded-full shadow-lg h-7 mx-auto w-7 font-semibold text-center py-1 
                text-sm px-1  ' + (cell.row.values.assessment_type == 'New Assessment' ? 'bg-green-200 
                text-green-900 ' : '') + (cell.row.values.assessment_type == 'Reassessment' ? 'bg-indigo-200 
                text-indigo-900 ' : '') + (cell.row.values.assessment_type == 'Mutation' ? 'bg-red-200 text-red-900' : '')}>
                    {Array.from(cell.row.values.assessment_type)[0]}
                </div>
            )
        }
        ,
        {
            Header: 'Received at',
            accessor: 'received_at',
            Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <button className='bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 
                hover:text-white text-black'>
                    View
                </button>
            )
        }
        ]

        3
        const { isLoading, data, isError, error } = useQuery("first-query", () => {
            return axios.get("http://localhost:3001/applicationList");
        });