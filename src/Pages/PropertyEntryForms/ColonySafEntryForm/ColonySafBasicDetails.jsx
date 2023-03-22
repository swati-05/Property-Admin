import { useState } from 'react'
import { RiBuilding2Fill } from 'react-icons/ri'
import { useFormik } from 'formik'
import * as yup from 'yup'


function ColonySafBasicDetails(props) {

    const [formHide, setFormHide] = useState(false)
    const validationSchema = yup.object({
        buildingName: yup.string(),
        buildingOfficeName: yup.string(),
        wardNo: yup.string(),
        holdingNo: yup.string(),
        govUsageType: yup.string(),
        propertyUsageType: yup.string(),
        zone: yup.string(),
        roadWidth: yup.string(),
        plotArea: yup.string(),
        buildingAddress: yup.string()
        // buildingName: yup.string().required('Enter building name'),
        // buildingOfficeName: yup.string().required('Enter office name'),
        // wardNo: yup.string().required('Select Ward'),
        // holdingNo: yup.string().required('Enter holding no.'),
        // govUsageType: yup.string().required('Select gov. usage type'),
        // propertyUsageType: yup.string().required('Select property usage type'),
        // zone: yup.string().required('Select zone'),
        // roadWidth: yup.string().required('Enter width of road'),
        // plotArea: yup.string().required('Enter area of plot'),
        // buildingAddress: yup.string().required('Enter building address')
    })
    const formik = useFormik({
        initialValues: {
            buildingName: '',
            buildingOfficeName: '',
            wardNo: '',
            holdingNo: '',
            govUsageType: '',
            propertyUsageType: '',
            zone: '',
            roadWidth: '',
            plotArea: '',
            buildingAddress: '',
        },

        onSubmit: (values, resetForm) => {
            console.log('electricity ', values)
            props.collectFormDataFun('electricityWaterDetails', values) //sending ElectricityWaterDetails data to parent to store all form data at one container
            props.nextFun(1) //forwarding to next form level
        }
        , validationSchema
    })

    const toggleForm = (e) => {
        console.log('checkbox is changing ', e.target.checked)
        setFormHide(e.target.checked)
    }
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><RiBuilding2Fill className="inline mr-2" />Property Details</h1>

            <div className="block p-4 w-full md:py-6 rounded-lg shadow-lg bg-white mx-auto absolute top-14">

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-5">

                        <div className="form-group col-span-5 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name Of Colony</label>
                            <input {...formik.getFieldProps('buildingName')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingName && formik.errors.buildingName ? formik.errors.buildingName : null}</span>
                        </div>

                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ward No</label>
                            <select {...formik.getFieldProps('wardNo')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="0" >ward 1</option>
                                <option value="1" >ward 2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                        </div>


                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Govt. Building Usage Type</label>
                            <select {...formik.getFieldProps('govUsageType')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="0" >ward 1</option>
                                <option value="1" >ward 2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.govUsageType && formik.errors.govUsageType ? formik.errors.govUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Construction Type</label>
                            <select {...formik.getFieldProps('propertyUsageType')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="0" >ward 1</option>
                                <option value="1" >ward 2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.propertyUsageType && formik.errors.propertyUsageType ? formik.errors.propertyUsageType : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Ownership Type</label>
                            <select {...formik.getFieldProps('zone')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="0" >ward 1</option>
                                <option value="1" >ward 2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Zone</label>
                            <select {...formik.getFieldProps('roadWidth')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." >
                                <option value="0" >ward 1</option>
                                <option value="1" >ward 2</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.roadWidth && formik.errors.roadWidth ? formik.errors.roadWidth : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-5 md:col-span-1 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Width of Road</label>
                            <input {...formik.getFieldProps('plotArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                        </div>
                        <div className="form-group mb-6 col-span-5 md:col-span-5 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Building Address</label>
                            <input {...formik.getFieldProps('buildingAddress')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Enter new ward no." />
                            <span className="text-red-600 absolute text-xs">{formik.touched.buildingAddress && formik.errors.buildingAddress ? formik.errors.buildingAddress : null}</span>
                        </div>

                        <div className="col-span-4 grid grid-cols-2">

                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(1)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-10 text-right'>
                                {!formHide && <button type='submit' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>}
                                {formHide && <button onClick={() => props.nextFun(1)} type='button' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>}
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default ColonySafBasicDetails