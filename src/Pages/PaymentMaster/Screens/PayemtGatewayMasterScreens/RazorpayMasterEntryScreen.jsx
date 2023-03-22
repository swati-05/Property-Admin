//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 20 Nov 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { SketchPicker } from 'react-color';
import ColorPicker from '@/Pages/PaymentMaster/Components/ColorPicker';
import { useFormik } from 'formik';
import * as yup from 'yup';

function RazorpayMasterEntryScreen() {
    const [showSecrateKey, setShowSecrateKey] = useState(false)
    const [webhookSecrateKey, setWebhookSecrateKey] = useState(false)

    const [openColorBox, setopenColorBox] = useState(false)


    // const validationSchema = yup.object(
    //     {
    //         wardNo: yup.string().required("This is a required field !"),
    //         newWardNo: yup.string().required("This is a required field !"),

    //     }
    // );

    const formik = useFormik({
        initialValues: {
            razorpayKey: '',
            organizationName: '',
            description:'',
            color:'',
            address:'',
            notes:'',
            webhookUrl:'',
            webhoookSecrateKey:'',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            // props.data("wardDetails", values)
            // props.nextFun()
        },
    });

    const handleRazorpayKey = e => formik.values.razorpayKey = e.target.value
    const handleSecKey = e => formik.values.secrateKey = e.target.value
    const handleOrgName = e => formik.values.organizationName = e.target.value
    const handleDescription = e => formik.values.description = e.target.value
    const handleColor = e => formik.values.color = e.target.value
    const handleAddress = e => formik.values.address = e.target.value
    const handleNotes = e => formik.values.notes = e.target.value
    const handleWebhookUrl = e => formik.values.webhookUrl = e.target.value
    const handleWebhookSecrate = e => formik.values.webhoookSecrateKey = e.target.value

    const handlFun = (e) => {
        console.log("Color code", e.target.values)
    }

    // console.log(formik.values.razorpayKey)

    console.log("openColorBox", openColorBox)
    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <div className='bg-gray-100 p-5'>
                    <h1 className='my-3 text-2xl text-center font-semibold'>Razorapy Paymnet Gateway</h1>
                    <div className="rounded-lg bg-white shadow-lg lg:col-span-3 lg:p-12">


                        <div className="space-y-4">

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label>Razorypay Key</label>
                                    <input
                                        onChange={e => handleRazorpayKey(e)}
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Razorypay Key"
                                        type="text"
                                        name="razorpayKey"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Secrate Key</label>
                                    <input
                                        onChange={e => handleSecKey(e)}
                                        name="secrateKey"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="**********"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label for="phone">Organization Name</label>
                                    <input
                                        onChange={e => handleOrgName(e)}
                                        name="organizationName"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Description</label>
                                    <input
                                     onChange={e => handleDescription(e)}
                                     name="description"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Color</label>
                                    <input
                                      onChange={e => handleColor(e)}
                                      name="color"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Address</label>
                                    <input
                                    onChange={e => handleAddress(e)}
                                    name="address"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Notes</label>
                                    <input
                                     onChange={e => handleNotes(e)}
                                     name="notes"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Webhook URL</label>
                                    <input
                                     onChange={e => handleWebhookUrl(e)}
                                     name="webhookUrl"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label for="phone">Webhook Secrate Key</label>
                                    <input
                                    onChange={e => handleWebhookSecrate(e)}
                                    name="webhoookSecrateKey"
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm border"
                                        placeholder="Organization Name"
                                        type="text"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mt-5">
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-white sm:w-auto"
                            >
                                <span className="font-medium"> Save Data </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-3 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* <div className='flex'>

                    <div>
                        <p>Razorypay Key</p>
                        <p>Secrate Key</p>
                        <p>Organization Name</p>
                        <p>Description</p>
                        <p>Color</p>
                        <p>Address</p>
                        <p>Notes</p>
                        <p>Logo</p>
                        <p>Webhook URL</p>
                        <p>Webhook Secrate Key</p>
                    </div>

                    <div>
                        <p>ket_KzmxfihgfKJ</p>
                        <p className='flex'>{showSecrateKey ? 'ThisisSecrateKey' : '************'} <span onClick={() => setShowSecrateKey(!showSecrateKey)} className='flex mx-2 cursor-pointer'>{showSecrateKey ? <BiShow size={20} /> : <BiHide />}</span> </p>
                        <p>My org Name</p>
                        <p>Desc</p>
                        <p><span onClick={() => setopenColorBox(true)}>Color</span>{openColorBox && <SketchPicker />}</p>
                        <p><ColorPicker onClick={() => setopenColorBox(true)} /></p>
                        <p>Address</p>
                        <p>Notes</p>
                        <p>Logo</p>
                        <p>Webhook URL</p>
                        <p className='flex'>{webhookSecrateKey ? 'ThisisSecrateKey' : '************'} <span onClick={() => setWebhookSecrateKey(!webhookSecrateKey)} className='flex mx-2 cursor-pointer'>{webhookSecrateKey ? <BiShow size={20} /> : <BiHide />}</span> </p>
                    </div>
                </div> */}
            </form>
        </>
    )
}

export default RazorpayMasterEntryScreen