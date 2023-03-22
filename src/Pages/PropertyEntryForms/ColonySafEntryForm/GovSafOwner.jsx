import { useState } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'


function GovSafOwner(props) {
    const validationSchema = yup.object({
        designation: yup.string().required('Enter designation').max(50, 'Enter maximum 50 characters'),
        address: yup.string().required('Enter address')

    })
    const formik = useFormik({
        initialValues: {
            designation: '',
            address: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('propertyaddressdetails ', values)
            props.collectFormDataFun('propertyAddressDetails', values) //sending PropertyAddressDetails data to parent to store all form data at one container
            props.nextFun(2) //forwarding to next form level
        }
        , validationSchema
    })
    
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Owner Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4">


                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">

                            <div className="form-group col-span-4 mb-6 md:px-4">
                                <label className="form-check-label text-gray-800" > <small className="block mt-1 text-xs text-blue-400 inline ">Authorized Person for the payment of Property Tax</small></label>
                            </div>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Designation</label>
                                <input {...formik.getFieldProps('designation')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.designation && formik.errors.designation ? formik.errors.designation : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-3 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Address </label>
                                <input {...formik.getFieldProps('address')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.address && formik.errors.address ? formik.errors.address : null}</span>
                            </div>



                        </div>


                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(2)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
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

export default GovSafOwner