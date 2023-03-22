import { useState } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'


function LegacyPropertyDetails(props) {
    const [formOpen, setformOpen] = useState(false)
    const validationSchema = yup.object({
        wardNo: yup.string().required('Select ward no.'),
        holdingNo: yup.string().required('Enter holding no'),
        ownershipType: yup.string().required('Selec ownership type'),
        propertyType: yup.string().required('Select property type'),
        roadType: yup.string().required('Select roadType'),
        city: yup.string().required('Enter city'),
        district: yup.string().required('Enter district'),
        state: yup.string().required('Enter state'),
        pin: yup.string().required('Enter pin'),
        locality: yup.string().required('Enter locality '),

    })
    const formik = useFormik({
        initialValues: {
            wardNo: '',
            holdingNo: '',
            ownershipType: '',
            propertyType: '',
            roadType: '',
            city: '',
            district: '',
            state: '',
            pin: '',
            locality: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('propertyaddressdetails ', values)
            props.collectFormDataFun('propertyAddressDetails', values) //sending PropertyAddressDetails data to parent to store all form data at one container
            props.nextFun(1) //forwarding to next form level
        }
        , validationSchema
    })
    const toggleForm = (e) => {
        console.log('checkbox is changing ', e.target.checked)
        setformOpen(e.target.checked)
    }
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Property Address & Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4">


                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-5">
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ward No.</label>
                                <select {...formik.getFieldProps('wardNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no.">
                                    <option value="0">ward 1</option>
                                    <option value="1">ward 2</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Holding No.</label>
                                <input {...formik.getFieldProps('holdingNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.holdingNo && formik.errors.holdingNo ? formik.errors.holdingNo : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ownership Type</label>
                                <select {...formik.getFieldProps('ownershipType')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no.">
                                    <option value="0">ward 1</option>
                                    <option value="1">ward 2</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.ownershipType && formik.errors.ownershipType ? formik.errors.ownershipType : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Property Type </label>
                                <select {...formik.getFieldProps('propertyType')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." >
                                    <option value="0">ward 1</option>
                                    <option value="1">ward 2</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.propertyType && formik.errors.propertyType ? formik.errors.propertyType : null}</span>
                            </div>

                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Road Type</label>
                                <select {...formik.getFieldProps('roadType')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." >
                                    <option value="0">ward 1</option>
                                    <option value="1">ward 2</option>
                                </select>
                                <label className='hidden'><small className="block mt-1 text-xs text-gray-600 inline text-red-400 leading-tight">In Case of No Road Enter "0" (For Vacant Land Only)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.roadType && formik.errors.roadType ? formik.errors.roadType : null}</span>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Basic Address</small></label></div>
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                        </div>
                        {/* Basic address */}
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City</label>
                                <input {...formik.getFieldProps('city')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.city && formik.errors.city ? formik.errors.city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District</label>
                                <input {...formik.getFieldProps('district')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.district && formik.errors.district ? formik.errors.district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State</label>
                                <input {...formik.getFieldProps('state')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.state && formik.errors.state ? formik.errors.state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin</label>
                                <input {...formik.getFieldProps('pin')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.pin && formik.errors.pin ? formik.errors.pin : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Locality</label>
                                <input {...formik.getFieldProps('locality')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.locality && formik.errors.locality ? formik.errors.locality : null}</span>
                            </div>
                        </div>
                        {/* Corresponding  address */}
                        <div className={`col-span-4 ${!formOpen ? 'hidden' : 'grid'} grid-cols-1 md:grid-cols-4`}>
                            <div className="col-span-4 grid grid-cols-5 justify-center items-center">
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                                <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-blue-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                                <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-blue-200"></div>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">City</label>
                                <input {...formik.getFieldProps('city')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.city && formik.errors.city ? formik.errors.city : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">District</label>
                                <input {...formik.getFieldProps('district')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.district && formik.errors.district ? formik.errors.district : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">State</label>
                                <input {...formik.getFieldProps('state')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.state && formik.errors.state ? formik.errors.state : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-1 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Pin</label>
                                <input {...formik.getFieldProps('pin')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.pin && formik.errors.pin ? formik.errors.pin : null}</span>
                            </div>
                            <div className="form-group mb-6 col-span-4 md:col-span-4 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Locality</label>
                                <input {...formik.getFieldProps('locality')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    placeholder="Enter new ward no." />
                                <span className="text-red-600 absolute text-xs">{formik.touched.locality && formik.errors.locality ? formik.errors.locality : null}</span>
                            </div>

                        </div>

                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(1)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
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

export default LegacyPropertyDetails