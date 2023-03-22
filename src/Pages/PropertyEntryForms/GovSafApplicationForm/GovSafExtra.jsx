import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {allowFloatInput, getCurrentDate} from '@/Components/Common/PowerUps/PowerupFunctions'

function GovSafExtra(props) {

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [validationSchemaState, setValidationSchemaState] = useState({
        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        hoardingStatus: yup.string().required('Select hoarding status'),
        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        // mobileTowerArea: yup.string().required('Enter mobile tower area'),
        // hoardingArea: yup.string().required('Enter Hoarding Area'),
        // petrolPumpArea: yup.string().required('Enter petrolPump Area'),
        // mobileTowerDate: yup.string().required('Select mobile tower installation date'),
        // hoardingDate: yup.string().required('Select hoarding installation date'),
        // petrolPumpDate: yup.string().required('Select petrol pump Installation date'),

        mobileTowerArea: yup.string().when('mobileTowerStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.string().required('Field is required')
        }),
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: 'yes',
            then: yup.date().required('Field is required')
        }),


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
         
            mobileTowerStatus: '',
            hoardingStatus: '',
            petrolPumpStatus: '',
            waterHarvestingStatus: '',
            mobileTowerArea: '',
            hoardingArea: '',
            petrolPumpArea: '',
            mobileTowerDate: getCurrentDate(),
            hoardingDate: getCurrentDate(),
            petrolPumpDate: getCurrentDate(),
          
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

        //toggle specific input fields accordingly
        {(name=='mobileTowerStatus') && ((value == 'yes') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false))}
        {(name=='hoardingStatus') && ((value == 'yes') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false))}
        {(name=='petrolPumpStatus') && ((value == 'yes') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false))}
       
        //allow restricted inputs
        {name=='mobileTowerArea' &&  formik.setFieldValue("mobileTowerArea",allowFloatInput(value,formik.values.mobileTowerArea,20))} //(currentValue,oldValue,max,isCapital)
        {name=='hoardingArea' &&  formik.setFieldValue("hoardingArea",allowFloatInput(value,formik.values.hoardingArea,20,true))} 
        {name=='petrolPumpArea' &&  formik.setFieldValue("petrolPumpArea",allowFloatInput(value,formik.values.petrolPumpArea,20))}
    };
    return (
        <>
            <h1 className='mt-6 mb-2 font-serif font-semibold absolute text-gray-600'><FaHome className="inline mr-2" />Basic Details</h1>
            <div className="block p-4 w-full md:py-6 shadow-lg bg-white border border-gray-200  mx-auto absolute top-14 ">

                <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Mobile Tower(s) ?</label>
                            <select {...formik.getFieldProps('mobileTowerStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>
                        </div>
                        <div className={`col-span-4 md:col-span-3 ${mobileTowerStatusToggle ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3`}>
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area Covered</label>
                                <input {...formik.getFieldProps('mobileTowerArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-[10px] text-gray-600 inline leading-[0.5px]"> Total Area Covered by Mobile Tower & its Supporting Equipments & Accessories (in Sq. Ft.)</small></label> */}
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                            </div>

                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Installation of Mobile Tower</label>

                                <input {...formik.getFieldProps('mobileTowerDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-4">
                            <div className={`form-group col-span-4 md:col-span-1 mb-6 md:px-4`}>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Hoarding Board(s) ?</label>
                                <select {...formik.getFieldProps('hoardingStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                >
                                    <option value="no" selected>No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>
                            </div>


                            <div className={`col-span-4 md:col-span-3 ${hoardingStatusToggle ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3`}>
                                <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                    <input {...formik.getFieldProps('hoardingArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                    {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "> Total Area of Wall / Roof / Land (in Sq. Ft.)</small></label> */}
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                    <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Date of Installation of Hoarding Board(s)</small></label>
                                    <input {...formik.getFieldProps('hoardingDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-4">
                            <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is property a Petrol Pump ?</label>
                                <select {...formik.getFieldProps('petrolPumpStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                                >
                                    <option value="no" selected>No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>
                            </div>

                            <div className={`col-span-4 md:col-span-3 ${petrolPumpStatusToggle ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-3`}>
                                <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">

                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                    <input {...formik.getFieldProps('petrolPumpArea')} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md" />
                                    {/* <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline ">Underground Storage Area (in Sq. Ft.)</small></label> */}
                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                                </div>
                                <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                                    <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Completion Date of Petrol Pump</small></label>
                                    <input {...formik.getFieldProps('petrolPumpDate')} type="date" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-span-4 md:col-span-1 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Rainwater harvesting provision ?</label>
                            <select {...formik.getFieldProps('waterHarvestingStatus')} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md"
                            >
                                <option value="no" selected>No</option>
                                <option value="yes">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>
                        </div>




                        <div></div>
                        <div className="col-span-4 grid grid-cols-2">
                            <div className='md:px-10'>
                                <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
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