import { useContext, useState } from 'react'
import Modal from 'react-modal';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBack2Line } from 'react-icons/ri'
import { contextVar } from '@/Components/Context/Context';
import ApiHeader from '@/Components/ApiList/ApiHeader';
import { allowCharacterNumberInput } from '@/Components/Common/PowerUps/PowerupFunctions';
import CitizenApplyApiList from '@/Components/CitizenApplyApiList';
import BarLoader from '@/Components/Common/BarLoader';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none'
    },
};
Modal.setAppElement('#root');
function HoldingNoCard(props) {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [isLoading, setisLoading] = useState(false)
    const [isButtonEnabled, setisButtonEnabled] = useState(false)
    const [holdingNoList, setholdingNoList] = useState([])
    const { api_verifyHolding } = CitizenApplyApiList()
    const { notify } = useContext(contextVar)
    const navigate = useNavigate()


    const validationSchema = yup.object({
        holdingNo: yup.string().required("Enter holding no.").min(10, 'Enter 15 or 16 digit holding no.'),
    });

    const formik = useFormik({
        initialValues: {
            holdingNo: "",
        },
        onSubmit: (values) => {
            console.log('at submit form.....', values.holdingNo)
            setholdingNoList([...holdingNoList, values.holdingNo])
            formik.resetForm()
        },
        validationSchema,
    });

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value


        { name == 'holdingNo' && formik.setFieldValue("holdingNo", allowCharacterNumberInput(value, formik.values.holdingNo, 16)) }
        if (name == 'holdingNo' && (value.length >= 15)) {
            setisButtonEnabled(true)
        }
        else {
            setisButtonEnabled(false)
        }
    };

    const funcSubmitHoldingList = () => {
        if (props?.safType == 'mu') {
            funcVerifyHolding()
        } else {
            props?.funcSubmitHoldingList(holdingNoList)
        }
    }

    // FUNCTION WHICH SENDS OTP TO REGISTERED MOBILE NO
    const funcVerifyHolding = () => {
        console.log('otp send...')
        setisLoading(true)
        setisButtonEnabled(false)
        let requestBody = {
            holdingNo: holdingNoList[0],
            ulbId: props?.choosedUlbId
        }

        console.log('before verify holding no....', requestBody)
        // return
        axios
            .post(api_verifyHolding, requestBody, ApiHeader())
            .then((response) => {
                console.log('varify holding response....', response?.data)
                if (response?.data?.status) {
                    props?.setmutionHoldingId(response?.data?.data?.id)
                    props?.fetchPropertyDetails(response?.data?.data?.id)
                    props?.setholdingCardStatus(false)

                    notify('holding verified successfully', 'success')
                } else {
                    notify('Problem in sending OTP', 'error')
                }
                setisLoading(false)

            })
            .catch((err) => {
                console.log("verify holding errror", err)
                notify('Something went wrong...', 'error')
                setisLoading(false)
                setisButtonEnabled(true)
            });
    }

    //funtion to remove holding from list
    const removeHolding = (index) => {
        //use concept of proper callback here
        setholdingNoList(current =>
            current.filter((ct, cIndex) => {
                return cIndex != index
            }),
        );
    }

    return (
        <>
            {
                isLoading && <BarLoader />
            }
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="w-screen h-screen">
                    <div class="h-screen py-20 px-3">
                        <div class="container mx-auto">
                            <div class="max-w-sm mx-auto md:max-w-lg">
                                <div class="w-full">
                                    <div class="bg-white py-8 rounded text-center shadow-xl relative">

                                        <button
                                            onClick={() => props?.closeModal(false)}
                                            type="button"
                                            class="absolute top-6 right-6 bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center shadow-sm  hover:bg-red-200 hover:border-none"
                                        >
                                            <svg class="w-5 h-5" fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                        <div class="text-2xl font-bold px-10">Applying.... for &nbsp;
                                            {props?.safType == 'bi' && 'Bifurcation'}
                                            {props?.safType == 'am' && 'Amalgamation'}
                                            {props?.safType == 'mu' && 'Mutation'}</div>
                                        {!(props?.safType == 'bi' && holdingNoList?.length != 0) && <>

                                            <div class="flex flex-col mt-4 text-center">
                                                <span className='text-center font-semibold'>Enter holding no for &nbsp;
                                                    {props?.safType == 'bi' && 'Bifurcation'}
                                                    {props?.safType == 'am' && 'Amalgamation'}
                                                    {props?.safType == 'mu' && 'Mutation'}.</span>

                                            </div>
                                        </>}

                                        <div class="flex flex-row justify-center text-center px-2 mt-5">

                                            <form onSubmit={formik.handleSubmit} onChange={handleChange} >
                                                {!((props?.safType == 'bi' || props?.safType == 'mu') && holdingNoList?.length != 0) && <div className='relative'>
                                                    <label className={`form-label inline-block mb-1 text-gray-600 text-sm font-semibold w-full text-left`}>Holding No.</label>
                                                    <input type="text"  {...formik.getFieldProps('holdingNo')} className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                    />
                                                    <span className="text-red-600 absolute text-xs">{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</span>
                                                </div>}
                                                <div class="w-full text-center mt-10">

                                                    {props?.safType == 'mu' && holdingNoList?.length == 0 && <button type='submit' className="w-full  py-2.5 bg-white border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight  rounded shadow-md  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>}
                                                    {props?.safType == 'bi' && holdingNoList?.length == 0 && <button type='submit' className="w-full  py-2.5 bg-white border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight  rounded shadow-md  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>}
                                                    {props?.safType == 'am' && <button type='submit' className="w-full  py-2.5 bg-white border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight  rounded shadow-md  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Add More</button>}
                                                </div>

                                            </form>

                                        </div>
                                        {holdingNoList?.length != 0 &&
                                            <div className='px-10'><table className='min-w-full leading-normal mt-10'>
                                                <thead className='font-bold text-left text-sm bg-sky-50'>
                                                    <tr>
                                                        <th className="px-2 py-3 w-10 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">#</th>
                                                        <th className="px-2 py-3 w-10 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Holding N0.</th>

                                                        <th className="px-2 py-3 w-28 border-b border-gray-200 text-gray-800  text-xs capitalize text-left">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {
                                                        holdingNoList?.map((data, index) => (
                                                            <>
                                                                <tr key={`floorlist${index}`} className="bg-white shadow-lg border-b border-gray-200">
                                                                    <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                                    <td className="px-2 py-2 text-sm text-left">{data}</td>

                                                                    <td className="px-2 py-2 text-sm text-left">
                                                                        <RiDeleteBack2Line onClick={() => removeHolding(index)} className='inline ml-2 text-red-400 font-semibold text-lg cursor-pointer hover:text-red-700 relative hover:scale-150' />
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            </div>}

                                        <div class="w-full text-right mt-10">

                                            {holdingNoList?.length != 0 && <button type='button' onClick={funcSubmitHoldingList} className="float-right w-full  py-4 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit & Proceed</button>}
                                            {holdingNoList?.length == 0 && <button type='button' className="float-right w-full  py-4 bg-gray-400 text-white font-medium text-xs leading-tight  rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out cursor-default ">Submit & Proceed</button>}
                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

        </>
    )
}

export default HoldingNoCard