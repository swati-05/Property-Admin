import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as yup from 'yup'
function GovSafExtra(props) {

    const [mobileTowerStatus, setMobileTowerStatus] = useState(false)
    const [hoardingStatus, setHoardingStatus] = useState(false)
    const [petrolPumpStatus, setPetrolPumpStatus] = useState(false)
    const [validationSchemaState, setValidationSchemaState] = useState({
        mobileTower: yup.string().required('Select mobile tower status'),
        waterHarvesting: yup.string().required('Select water harvesting status'),
        mobileTowerArea: yup.string().required('Enter mobile tower area'),
        petrolPumpArea: yup.string().required('Enter petrolPump Area'),
        hoardingArea: yup.string().required('Enter Hoarding Area'),
        mobileTowerDate: yup.string().required('Select Installation Date'),
        hoardingDate: yup.string().required('Enter petrolPump Area'),
        petrolPumpDate: yup.string().required('Select Installation Date'),


    })

    // const validationSchema = yup.object({
    //     wardNo: yup.string().required('Select ward').max(50, 'Enter maximum 50 characters'),
    //     newWardNo: yup.string().required('Select new ward'),
    //     ownerShiptype: yup.string().required('Select ownership type'),
    //     propertyType: yup.string().required('Select property'),
    //     zone: yup.string().required('Select zone'),
    //     mobileTower: yup.string().required('Select mobile tower status'),
    //     hoarding: yup.string().required('Select hoarding status'),
    //     petrolPump: yup.string().required('Select petrol pump status.'),
    //     waterHarvesting: yup.string().required('Select water harvesting status')

    // })
    const validationSchema = yup.object(validationSchemaState)
    const formik = useFormik({
        initialValues: {
            mobileTower: '',
            hoarding: '',
            petrolPump: '',
            waterHarvesting: '',
            mobileTowerArea: '',
            mobileTowerDate: '',
            hoardingArea: '',
            hoardingDate: '',
            petrolPumpArea: '',
            petrolPumpDate: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('basic deatils ', values)
            props.collectFormDataFun('basicDetails', values) //sending BasicDetails data to parent to store all form data at one container
            props.nextFun(3) //forwarding to next form level
        }
        , validationSchema
    })

    const seleOptions = [
        { option: 'one', value: 1 },
        { option: 'two', value: 2 },
        { option: 'three', value: 3 },
        { option: 'four', value: 4 },
        { option: 'five', value: 5 },
        { option: 'six', value: 6 },
    ]
    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name == "mobileTower") {
            value == 'yes' ? setMobileTowerStatus(true) : setMobileTowerStatus(false)
            // if (value == 'yes') {
            //     setValidationSchemaState({ ...validationSchema, mobileTowerArea: yup.string().required('Enter mobile tower area'), mobileTowerDate: yup.string().required('Select mobile tower date') })
            // } else {
            //     setValidationSchemaState({ ...validationSchema, mobileTowerArea: yup.string().nullable().notRequired(), mobileTowerDate: yup.string().nullable().notRequired() })
            // }
        }
        if (name == "hoarding") {
            value == 'yes' ? setHoardingStatus(true) : setHoardingStatus(false)
            // if (value == 'yes') {
            //     setValidationSchemaState({ ...validationSchema, hoardingArea: yup.string().required('Enter hoarding board area'), hoardingDate: yup.string().required('Select hoarding date') })
            // } else {
            //     setValidationSchemaState({ ...validationSchema, hoardingArea: yup.string().nullable().notRequired(), hoardingDate: yup.string().nullable().notRequired() })
            // }
        }
        if (name == "petrolPump") {
            value == 'yes' ? setPetrolPumpStatus(true) : setPetrolPumpStatus(false)
            // if (value == 'yes') {
            //     setValidationSchemaState({ ...validationSchema, petrolPumpArea: yup.string().required('Enter petrol pump area'), petrolPumpDate: yup.string().required('Select petrol pump date') })
            // } else {
            //     setValidationSchemaState({ ...validationSchema, petrolPumpArea: yup.string().nullable().notRequired(), petrolPumpDate: yup.string().nullable().notRequired() })
            // }
        }
    };
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><FaHome className="inline mr-2" />Basic Details</h1>
            <div className="block p-4 w-full md:py-6 shadow-lg bg-white border border-gray-200  mx-auto absolute top-14 ">

                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Does Property Have Mobile Tower(s) ?</label>
                            <select {...formik.getFieldProps('mobileTower')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.mobileTower && formik.errors.mobileTower ? formik.errors.mobileTower : null}</span>
                        </div>
                        <div className={`col-span-4 md:col-span-3 grid ${mobileTowerStatus ? 'visible' : 'invisible'} grid-cols-1 md:grid-cols-3`}>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area Covered</label>
                                <input {...formik.getFieldProps('mobileTowerArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "> Total Area Covered by Mobile Tower & its Supporting Equipments & Accessories (in Sq. Ft.)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                            </div>

                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Installation of Mobile Tower</label>

                                <input {...formik.getFieldProps('mobileTowerDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>
                            </div>
                        </div>
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Does Property Have Hoarding Board(s) ?</label>
                            <select {...formik.getFieldProps('hoarding')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.hoarding && formik.errors.hoarding ? formik.errors.hoarding : null}</span>
                        </div>


                        <div className={`col-span-4 md:col-span-3 grid ${hoardingStatus ? 'visible' : 'invisible'} grid-cols-1 md:grid-cols-3`}>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                <input {...formik.getFieldProps('hoardingArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "> Total Area of Wall / Roof / Land (in Sq. Ft.)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                            </div>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Installation of Hoarding Board(s)</small></label>
                                <input {...formik.getFieldProps('hoardingDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                            </div>
                        </div>
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is property a Petrol Pump ?</label>
                            <select {...formik.getFieldProps('petrolPump')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.petrolPump && formik.errors.petrolPump ? formik.errors.petrolPump : null}</span>
                        </div>

                        <div className={`col-span-4 md:col-span-3 grid ${petrolPumpStatus ? 'visible' : 'invisible'} grid-cols-1 md:grid-cols-3`}>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                <input {...formik.getFieldProps('petrolPumpArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Underground Storage Area (in Sq. Ft.)</small></label>
                                <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                            </div>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Completion Date of Petrol Pump</small></label>
                                <input {...formik.getFieldProps('petrolPumpDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                            </div>
                        </div>
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Rainwater harvesting provision ?</label>
                            <select {...formik.getFieldProps('waterHarvesting')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvesting && formik.errors.waterHarvesting ? formik.errors.waterHarvesting : null}</span>
                        </div>




                        <div></div>
                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            {/* <div className='md:px-10 text-right'>
                            <button onClick={() => props.nextFun(1)} type="submit" className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Save & Next</button>
                        </div> */}
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

export default GovSafExtra