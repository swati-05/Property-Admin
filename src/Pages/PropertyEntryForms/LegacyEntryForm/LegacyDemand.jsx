import { useState } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {getCurrentDate} from '@/Components/Common/PowerUps/PowerupFunctions'



function LegacyDemand(props) {
    const [formOpen, setformOpen] = useState(false)
    const validationSchema = yup.object({
        fromDate: yup.date().required('Select from date'),
        uptoDate: yup.date().required('Select upto Date'),
        arvValue: yup.string().required('Enter ARV'),
       

    })
    const formik = useFormik({
        initialValues: {
            fromDate: getCurrentDate(),
            uptoDate: getCurrentDate(),
            arvValue: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('propertyaddressdetails ', values)
            props.collectFormDataFun('propertyAddressDetails', values) //sending PropertyAddressDetails data to parent to store all form data at one container
            props.nextFun(3) //forwarding to next form level
        }
        , validationSchema
    })
    const toggleForm = (e) => {
        console.log('checkbox is changing ', e.target.checked)
        setformOpen(e.target.checked)
    }
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Demand Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4">


                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                    From Date</label>
                                <input {...formik.getFieldProps('fromDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no."/>
                                <span className="text-red-600 absolute text-xs">{formik.touched.fromDate && formik.errors.fromDate ? formik.errors.fromDate : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">To Date (Leave blank for current date)</label>
                                <input {...formik.getFieldProps('uptoDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.uptoDate && formik.errors.uptoDate ? formik.errors.uptoDate : null}</span>
                            </div>


                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">ARV</label>
                                <input {...formik.getFieldProps('arvValue')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <label className='hidden'><small className="block mt-1 text-xs text-gray-600 inline text-red-400 leading-tight">In Case of No Road Enter "0" (For Vacant Land Only)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.arvValue && formik.errors.arvValue ? formik.errors.arvValue : null}</span>
                            </div>
                        </div>

                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-10 text-right'>
                                <button type="submit" className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default LegacyDemand