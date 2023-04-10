import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import { useState } from 'react';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import PropertyApiList from '@/Components/ApiList/PropertyApiList';
import Popup from 'reactjs-popup';
import { toast, ToastContainer } from 'react-toastify';
import useSetTitle from '@/Components/GlobalData/useSetTitle';
import BarLoader from '@/Components/Common/BarLoader';
import BottomErrorCard from '@/Components/Common/BottomErrorCard';
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions';
import { nullToZero } from '@/Components/PowerUps/PowerupFunctions';

const customStyles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.5)",
        overflowY: "scroll"
    },
    content: {
        top: '60%',
        left: '55%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        height: "maxHeight" //or maxHeight  / 600px 
    },
};

function CashVerificationDetailedModal(props) {

    useSetTitle('Cash Verification')

    const { api_verifiedTcCollection, api_notVerifiedTcCollection, api_verifyTcCollection } = PropertyApiList()

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [fetchedData, setFetchedData] = useState()
    const [tradeSeleteAll, setTradeSeleteAll] = useState(false)
    const [isLoading2, setisLoading2] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);


    const [allTest, setAllTest] = useState([])

    const userId = props?.data?.id;
    const date = props?.data?.date;

    console.log('cash verification data => ', props?.data)

    //Fetch data
    useEffect(() => {
        if (!props || !props.data) return;

        const payload = {
            "date": props?.data?.date,
            "userId": props?.data?.id
        };

        let url;

        props?.reportType == '1' && (url = api_notVerifiedTcCollection)
        props?.reportType == '2' && (url = api_verifiedTcCollection)

        axios.post(url, payload, ApiHeader())
            .then((res) => {
                console.log("response of te data in modal", res)
                setFetchedData(res?.data?.data)
            })
            .catch((err) => {
                console.log("Error while tc list data in modal", err)
                activateBottomErrorCard(true, 'Some error occured. Please try again later.')

            });
    }, [props?.data]);

    console.log('getting data in cash verification modal => ', props?.data)

    //     console.log("fetchedData in modal", fetchedData)

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (props.openAddPopUP > 0)
            setIsOpen(true);
    }, [props?.openAddPopUP])


    function afterOpenModal() {
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        // props.refetchList();
        setAllTest([])
    }


    const handleCheckBox = (e, module) => {
        if (e.target.checked == true) {
            setAllTest([...allTest, { "id": e.target.value, "module": module }])
        }
        if (e.target.checked == false) {
            for (var i = 0; i < allTest.length; i++) {
                if (allTest[i] === e.target.value) {
                    allTest.splice(i, 1);
                }
            }
        }
    }

    const handleVerifyBtn = () => {
        // console.log("Verify Button Clicked", allTest)
        const payload = {
            property: fetchedData.property,
            water: fetchedData.water,
            trade: fetchedData.trade,
        }

        axios.post(api_verifyTcCollection, payload, ApiHeader())
            .then((res) => {
                console.log("Data After Verification", res)
                toast.success('Verified Successfully !!!')
                closeModal()
            })
            .catch((err) => {
                console.log("Exception While Verifying Data", err)
                activateBottomErrorCard(true, 'Some error occured. Please try again later.')
            })

        console.log("Verify Data", payload)
    }

    const tradeMainOnchage = (e) => {
        console.log(e.target.checked)
        setTradeSeleteAll(e.target.checked)
    }

    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)

    }


    return (
        <>
            {isLoading2 && <BarLoader />}
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <ToastContainer autoClose={2000} />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='overflow-auto'>
                    <div className=" bg-white rounded-lg shadow-xl border-2 border-gray-50 p-2">
                        <div className=''>

                            <div className='float-right'>
                                <div onClick={closeModal} className='hover:bg-gray-100 rounded-full w-5 cursor-pointer mr-3'>  <CgClose size={20} /></div>
                            </div>
                            <div className='float-left'>
                                <h1 className='mb-3 text-2xl ml-5 font-semibold'>TC Collection Details</h1>
                            </div>
                        </div>

                        <p className='border-b mt-10 mb-6 mx-5 border-gray-100'></p>

                        <div className='grid grid-cols-12'>
                            <div className='col-span-4'>
                                <div className='grid grid-cols-2 bg-yellow-300 rounded shadow p-4'>
                                    <div className='col-span-1'>
                                        <p> Collector Name</p>
                                        <p> Transaction Date</p>
                                        <p> Total Amount</p>
                                        <p> Number of Transaction</p>
                                    </div>
                                    <div className='col-span-1 font-semibold'>
                                        <p className='uppercase'>: {nullToNA(fetchedData?.collectorName)}</p>
                                        <p>: {nullToNA(fetchedData?.date)}</p>
                                        <p>: {nullToZero(fetchedData?.totalAmount)}</p>
                                        <p>: {nullToZero(fetchedData?.numberOfTransaction)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-span-8'>

                                <div className='flex flex-wrap-reverse m-0'>
                                    <div className='bg-emerald-500 shadow p-6 m-2 rounded'>
                                        <p className="font-semibold text-3xl"><span className='text-lg mx-1'>₹</span>{nullToZero(fetchedData?.Cash)}<span className='text-lg'>.00</span></p>
                                        <p className='text-lg font-semibold'>Cash</p>
                                    </div>
                                    <div className='bg-indigo-400 shadow p-6 m-2 rounded'>
                                        <p className="font-semibold text-3xl"><span className='text-lg mx-1'>₹</span>{nullToZero(fetchedData?.Cheque)}<span className='text-lg'>.00</span></p>
                                        <p className='text-lg font-semibold'>Cheque</p>
                                    </div>
                                    <div className='bg-cyan-400 shadow p-6 m-2 rounded'>
                                        <p className="font-semibold text-3xl"> <span className='text-lg mx-1'>₹</span>0<span className='text-lg'>.00</span></p>
                                        <p className='text-lg font-semibold'>DD</p>
                                    </div>
                                    {/* <div className='bg-lime-400 shadow p-6 m-2 rounded'>
                                        <p className="font-semibold text-3xl"> <span className='text-lg mx-1'>₹</span>0<span className='text-lg'>.00</span></p>
                                        <p className='text-lg font-semibold'>CARD</p>
                                    </div> */}
                                    {/* <div className='bg-amber-200 shadow p-3 m-2 rounded'>
                                        <p className="font-semibold text-3xl"> <span className='text-lg mx-1'>₹</span>5036<span className='text-lg'>.00</span></p>
                                        <p className='text-sm font-semibold'>RTGS</p>
                                    </div> */}
                                </div>
                            </div>

                        </div>

                        <p className='border-b mt-5 mb-6 mx-5 border-gray-100'></p>

                        {fetchedData?.property?.length > 0 && <div>
                            <p className='uppercase'>Property Payment</p>
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100 border-t border-l border-r text-left">
                                    <tr>
                                        <th className="px-2 py-2 border-r">#</th>
                                        <th className="px-2 py-2 border-r">Transaction No</th>
                                        <th className="px-2 py-2 border-r">Owner Name</th>
                                        <th className="px-2 py-2 border-r">Payment Mode</th>
                                        <th className="px-2 py-2 border-r">Application No</th>
                                        <th className="px-2 py-2 border-r">Check/DD No</th>
                                        <th className="px-2 py-2 border-r">Bank Name</th>
                                        <th className="px-2 py-2 border-r">Paid Amount</th>
                                        <th className="px-2 py-2 border-r">Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchedData?.property?.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{i + 1}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_no) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.user_name) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.payment_mode)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.application_no)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.cheque_dd_no)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.bank_name) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">₹{nullToZero(item?.amount) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_date) }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>}
                        <p className='py-2'></p>

                        {/*========= Water Start =============*/}
                        {fetchedData?.water?.length > 0 && <div>
                            <p className='uppercase'>Water Payment</p>
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100 border-t border-l border-r text-left">
                                    <tr>
                                        <th className="px-2 py-2 border-r">#</th>
                                        <th className="px-2 py-2 border-r">Transaction No</th>
                                        <th className="px-2 py-2 border-r">Owner Name</th>
                                        <th className="px-2 py-2 border-r">Payment Mode</th>
                                        <th className="px-2 py-2 border-r">Application No</th>
                                        <th className="px-2 py-2 border-r">Check/DD No</th>
                                        <th className="px-2 py-2 border-r">Bank Name</th>
                                        <th className="px-2 py-2 border-r">Paid Amount</th>
                                        <th className="px-2 py-2 border-r">Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchedData?.water?.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{i + 1}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_no) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.user_name) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.payment_mode)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.application_no) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.cheque_dd_no) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.bank_name) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">₹{nullToZero(item?.amount) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_date) }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>}

                        {/*========= Water END =============*/}

                        {/*========= Trade Start =============*/}

                        <p className='py-2'></p>
                        {fetchedData?.trade?.length > 0 && <div>
                            <p className='uppercase'>Trade Payment</p>
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100 border-t border-l border-r text-left">
                                    <tr>
                                        <th className="px-2 py-2 border-r">#</th>
                                        <th className="px-2 py-2 border-r">Transaction No</th>
                                        <th className="px-2 py-2 border-r">Owner Name</th>
                                        <th className="px-2 py-2 border-r">Payment Mode</th>
                                        <th className="px-2 py-2 border-r">Application No</th>
                                        <th className="px-2 py-2 border-r">Check/DD No</th>
                                        <th className="px-2 py-2 border-r">Bank Name</th>
                                        <th className="px-2 py-2 border-r">Paid Amount</th>
                                        <th className="px-2 py-2 border-r">Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fetchedData?.trade?.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{i + 1}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_no) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.user_name) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.payment_mode)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.application_no)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.cheque_dd_no)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.bank_name)}</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">₹{nullToZero(item?.amount) }</td>
                                                <td className="border border-gray-200 px-2 py-2 font-medium">{nullToNA(item?.tran_date) }</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>}

                        {/*========= Trade End =============*/}


                        {/* <div className='px-3 py-2 cursor-pointer'>
                            Check All
                        </div> */}
                        <div className='my-5'>
                            <div className="flex justify-center pt-3 space-x-3">
                                {props?.reportType == '1' &&
                                    <Popup
                                        trigger={
                                            <button className="w-full px-10 rounded bg-indigo-600 py-2 text-white sm:w-auto"> Verify </button>
                                        }
                                        modal
                                        nested
                                    >
                                        {(close) => (
                                            <div className="h-screen w-screen flex-row justify-center items-center backdrop-blur-sm">
                                                <div className="flex flex-col justify-center h-max w-max absolute top-[40%] right-[40%] bg-indigo-50 px-4 py-2 rounde-md shadow-lg animate__animated animate__fadeInDown animate__faster">
                                                    <button className="close text-end text-lg" onClick={close}>
                                                        &times;
                                                    </button>
                                                    <div className="text-md">
                                                        Are you sure ?
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <button
                                                            className="bg-green-500 hover:bg-green-600 text-white shadow-md text-xs px-4 py-1 m-4 rounded-md"
                                                            onClick={() => {
                                                                close()
                                                                handleVerifyBtn()
                                                            }}
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-white px-4 shadow-md text-xs py-1 m-4 rounded-md"
                                                            onClick={close}
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                }
                                <button onClick={closeModal} className="w-full px-10 rounded bg-red-600 py-2 text-white sm:w-auto"> Close </button>
                            </div>

                        </div>


                    </div>
                </div>

            </Modal>
        </>
    );
}

export default CashVerificationDetailedModal
