import axios from 'axios';
import React, { useState } from 'react'
import { Chart } from "react-google-charts";
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import PaymentDataTable2 from './Components/PaymentDataTable2';
import PaymentApiList from './PaymentApiList';
import ViewPaymnetDetailsModal from './ViewPaymnetDetailsModal';
import houseTaxImage from '@/Components/Media/houseTax.png'
import ApiHeader from '@/Components/ApiList/ApiHeader';



function PaymentDashboard(props) {
    const [openPaymentPopUp, setOpenPaymentPopUp] = useState(0)
    const [viewBtnCliedId, setViewBtnCliedId] = useState()

    const { getAllPayments } = PaymentApiList();

    const header =  ApiHeader()
    const handleViewBtn = (btnId) => {
        setViewBtnCliedId(btnId)
        setOpenPaymentPopUp(prev => prev + 1)
        console("Btn clicked", btnId)

    }

    const columns = [
        {
            Header: 'Sl.',
            Cell: ({ row }) => (
                <div className='px-2 font-semibold'>{row.index + 1}.</div>
            )
        },
        {
            Header: "Trans No",
            accessor: "transactionNo",
        },
        {
            Header: "ULB",
            accessor: "userDetails.ulbId",
            Cell: (props) => {
                return (
                    <p>
                        {props.value == "0" && <p className=''>Test</p>}
                        {props.value == "2" && <p className=''>RMC</p>}
                    </p>
                );
            }
        },
        {
            Header: "Dept.",
            accessor: "userDetails.departmentId",
            Cell: (props) => {
                return (
                    <p>
                        {props.value == "1" && <p className=''>Property</p>}
                        {props.value == "2" && <p className=''>Water</p>}
                        {props.value == "3" && <p className=''>Trade</p>}
                        {props.value == "4" && <p className=''>Grivance</p>}
                    </p>
                );
            }
        },
        {
            Header: "Rzp Order Id",
            accessor: "orderId",
        },
        {
            Header: "Payment_ID",
            accessor: "paymentId",
        },
        {
            Header: "Amount",
            accessor: "amount",
            Cell: (props) => {
                return <p>{props.value && "₹" + props.value}</p>;
            },
        },
        {
            Header: "Date Time",
            accessor: "date",
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: (props) => {
                return (
                    <p>
                        {props.value == "captured" && (
                            <div className='flex'>
                                {/* <p className='rounded-full bg-green-600 h-2 w-2'></p> */}
                                <p className="bg-green-300 text-gray-800 font-semibold text-center px-1 py-0.5 rounded-sm">
                                    Success
                                </p>
                            </div>
                        )}
                        {props.value == "failed" && (
                            <p className="bg-red-600 text-white font-semibold text-center py-0.5 rounded-md">
                                {props.value}
                            </p>
                        )}
                        {props.value == "authorized" && (
                            <p className="bg-yellow-600 text-white font-semibold text-center px-1 py-0.5 rounded-md">
                                {props.value}
                            </p>
                        )}
                    </p>
                );
            },
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: ({ cell }) => (
                <button
                    onClick={() =>
                        handleViewBtn(cell.row.values.transactionNo)
                    }
                    className="bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm"
                >
                    View
                </button>
            ),
        },
    ];


    const pieChatData = [
        ["Task", "Hours per Day"],
        ["Property", 11],
        ["Trade", 4],
        ["Water", 3],
        ["SWM", 6],
        // ["Sleep", 7],
    ];

    const pieChatOptions = {
        title: "Module Wise Yearly Collections",
        is3D: true,
        chartArea: { left: 40, top: 40, width: "80%", height: "80%" },
        // height: 500,
        // width: 500
    };

    const barChatData = [
        ["Year - 2022", "Property", "Trade", "Water", "SWM"],
        ["Sep", 1000, 400, 200, 500],
        ["Oct", 1170, 460, 250, 300],
        ["Nov", 660, 1120, 300, 200],
        ["Dec", 1030, 540, 350, 250],
    ];

    const barChatOptions = {
        chart: {
            title: "Collections in Diffrent Modules.",
            subtitle: "Property, Watrer, Trade and SWM: Month wise 2022",
        },
    };


    const { isLoading, data, isError, error } = useQuery("api/payment/get-webhook-details22--ok done", () => {
        return axios.get(getAllPayments, header);
    }
    );



    return (
        <>
            <ViewPaymnetDetailsModal openPopUp={openPaymentPopUp} selectedOrderId={viewBtnCliedId} />
            <main class="pt-10 -mt-4 mb-10">

                <div className='flex text-gray-600'>
                    <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <div className="bg-white darks:bg-gray-800 rounded-lg shadow-lg h-full p-6 relative overflow-hidden">
                            <div className='float-right mr-20'>
                                <img src={houseTaxImage} className="opacity-30 h-20 w-20 absolute" alt="" />
                            </div>
                            <h3 className="text-base font-bold mb-2">Property</h3>
                            <h2 className="text-3xl font-bold mb-4">₹ 1,200</h2>
                            {/* target */}
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex items-center" title="Target">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mr-2 bi bi-calendar-check" viewBox="0 0 16 16">
                                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg> <span className='font-medium'> Today</span>
                                </div>
                                <div className="flex items-center text-green-500">
                                    +5%
                                </div>
                            </div>
                            {/* bg circle */}

                        </div>
                    </div>
                    {/* target widget */}
                    <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <div className="bg-white darks:bg-gray-800 rounded-lg shadow-lg h-full p-6 relative overflow-hidden">
                            <h3 className="text-base font-bold mb-2">Trade</h3>
                            <h2 className="text-3xl font-bold mb-4">₹ 12,500</h2>
                            {/* target */}
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex items-center" title="Target">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mr-2 bi bi-calendar-check" viewBox="0 0 16 16">
                                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg> <span className='font-medium'> Today</span>
                                </div>
                                <div className="flex items-center text-green-500">
                                    +25%
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* target widget */}
                    <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <div className="bg-white darks:bg-gray-800 rounded-lg shadow-lg h-full p-6 relative overflow-hidden">
                            <h3 className="text-base font-bold mb-2">Water</h3>
                            <h2 className="text-3xl font-bold mb-4">₹ 5,200</h2>
                            {/* target */}
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex items-center" title="Target">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mr-2 bi bi-calendar-check" viewBox="0 0 16 16">
                                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg> <span className='font-medium'> Today</span>
                                </div>
                                <div className="flex items-center text-green-500">
                                    +10%
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* target widget */}
                    <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <div className="bg-white darks:bg-gray-800 rounded-lg shadow-lg h-full p-6 relative overflow-hidden">
                            <h3 className="text-base font-bold mb-2">SWM</h3>
                            <h2 className="text-3xl font-bold mb-4">₹ 7,200</h2>
                            {/* target */}
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex items-center" title="Target">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="mr-2 bi bi-calendar-check" viewBox="0 0 16 16">
                                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg> <span className='font-medium'> Today</span>
                                </div>
                                <div className="flex items-center text-red-500">
                                    -15%
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 space-x-5 ml-5 mr-10'>
                    <div className='col-span-1 rounded-xl shadow-xl p-1 bg-white'>
                        <Chart
                            chartType="PieChart"
                            data={pieChatData}
                            options={pieChatOptions}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>
                    <div className='col-span-1 rounded-xl shadow-xl p-4 bg-white w-full'>
                        <Chart
                            chartType="Bar"
                            data={barChatData}
                            options={barChatOptions}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>

                </div>


                <div className='m-5 border rounded-lg shadow-lg pb-3 bg-white mb-20'>
                    {isLoading ?
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="45"
                            visible={true}
                        />
                        :
                        <div className="">
                            <h1 className='text-gray-800 font-semibold text-center text-4xl py-2 mx-2'>Transaction History</h1>
                            <p className='border-b'></p>
                            <div className='flex m-3 space-x-5'>
                                <div className='bg-sky-300 shadow-lg p-3 rounded-md'>
                                    <p className="font-semibold text-3xl"> {data?.data?.data?.length}</p>
                                    <p className='text-sm font-semibold'>No of Transactions </p>
                                </div>
                                <div className='bg-green-300 shadow-lg p-3 rounded-md'>
                                    <p className="font-semibold text-3xl"><span className='text-lg mx-1'>₹</span>46430<span className='text-lg'>.00</span></p>
                                    <p className='text-sm font-semibold'>Total Success Amount</p>
                                </div>
                                <div className='bg-red-300 shadow-lg p-3 rounded-md'>
                                    <p className="font-semibold text-3xl"> <span className='text-lg mx-1'>₹</span>5036<span className='text-lg'>.00</span></p>
                                    <p className='text-sm font-semibold'>Total Failed Amount</p>
                                </div>
                            </div>

                            <div>
                                <div className="">
                                    {!isLoading && (
                                        <PaymentDataTable2
                                            columns={columns}
                                            data={data?.data?.data}
                                        // fun={selectedData}
                                        />
                                    )}
                                </div>
                            </div>

                        </div>
                    }
                </div>
                <div className='mb-40'></div>
            </main>
        </>
    )
}

export default PaymentDashboard

/*
Exported to -
PaymentMasterSidebar.js
*/