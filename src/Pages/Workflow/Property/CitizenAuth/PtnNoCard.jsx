import { useContext, useState } from 'react'
import Modal from 'react-modal';
import { allowNumberInput } from '../../../Components/Common/PowerUps/PowerupFunctions';
import { useFormik } from "formik";
import * as yup from "yup";
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList';
import BarLoader from '../../../Components/Common/BarLoader';
import axios from 'axios';
import { contextVar } from '../../../Components/ContextVar';
import { useNavigate } from 'react-router-dom';


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
function PtnNoCard(props) {

    const [modalIsOpen, setIsOpen] = useState(true);
    const [isLoading, setisLoading] = useState(false)
    const [isButtonEnabled, setisButtonEnabled] = useState(false)
    const { api_verifyMobileOtp } = CitizenApplyApiList()
    const { notify } = useContext(contextVar)
    const navigate = useNavigate()


    const validationSchema = yup.object({
        ptnNo: yup.string().required("Enter 10 digit mobile no.").min(10, 'Enter 10 digit mobile no.'),
    });

    const formik = useFormik({
        initialValues: {
            ptnNo: "",
        },
        onSubmit: (values) => {
            console.log('at submit form.....', values)
            sendOtp()
        },
        validationSchema,
    });

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name == 'ptnNo' && formik.setFieldValue("ptnNo", allowNumberInput(value, formik.values.ptnNo, 14)) }
        if (name == 'ptnNo' && (value.length >= 14)) {
            setisButtonEnabled(true)
        }
        else {
            setisButtonEnabled(false)
        }
    };

    // FUNCTION WHICH SENDS OTP TO REGISTERED MOBILE NO
    const sendOtp = () => {
        setisLoading(true)
        console.log('otp send...')
        setisLoading(true)
        setisButtonEnabled(false)
        // DUMMY OTP SEND MESSAGE
        notify('Otp has been send to your registered mobile no.', 'success')
        // IF OTP IS SENT THEN HIDE PTN CARD AND SHOW OTP CARD
        props?.setptnCardStatus(false)
        props?.setotpCardStatus(true)
        return
        let requestBody = {
            ptnNo: formik.values.ptnNo
        }

        console.log('before send otp...', requestBody)
        axios
            .post(api_verifyMobileOtp, requestBody)
            .then((response) => {
                console.log('otp send response', response?.data)
                setisLoading(false)
            })
            .catch((err) => {
                console.log("error otp send", err)
                notify('Something went wrong...', 'error')
                setisLoading(false)
                setisButtonEnabled(true)
            });
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
                                    <div class="bg-white h-80 py-8 rounded text-center shadow-xl relative">
                                        <div class="text-2xl font-bold px-10">Enter PTN No.
                                            {/* <button onClick={() => props?.setptnCardStatus(false)} type="button" class="float-right right-2.5 text-red-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " >
                                                <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </button> */}
                                        </div>
                                        <div class="flex flex-col mt-4 text-center">
                                            <span className='text-center'>Enter 14 digit PTN no,<br />which is property tax number<br />of the holding to attach a property</span>
                                            {/* <span class="font-bold">+91 ******876</span> */}
                                        </div>

                                        <div class="flex flex-row justify-center text-center px-2 mt-5">

                                            <form onSubmit={formik.handleSubmit} onChange={handleChange} >
                                                <div>
                                                    <input type="text"  {...formik.getFieldProps('ptnNo')} className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                                    />
                                                </div>
                                                <div class="w-full text-center mt-5">

                                                    {isButtonEnabled && <button type='submit' className="w-full  py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>}
                                                    {!isButtonEnabled && <button type='button' className="w-full  py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight  rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out cursor-default ">Submit</button>}
                                                </div>
                                            </form>
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

export default PtnNoCard