import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCurrentDate, allowFloatInput } from '@/Components/Common/PowerUps/PowerupFunctions'
import { inputContainerStyle, commonInputStyle, inputErrorStyle, inputLabelStyle } from '@/Components/Common/CommonTailwind/CommonTailwind'
import PropertyTaxFloorForm from './PropertyTaxFloorForm'
import { FcHome } from 'react-icons/fc'
import pin from '@/Components/Media/pin.png'
import { BiAddToQueue } from 'react-icons/bi'
import PropertyTaxOwner from './PropertyTaxOwner'
import { ColorRing } from 'react-loader-spinner'


function PropertyTaxCalculatorForm(props) {

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)
    const [floorData, setfloorData] = useState()
    const [ownerData, setownerData] = useState()


    const validationSchema = yup.object({
        wardNo: yup.string().required('Select ward'),
        newWardNo: yup.string().required('Select new ward'),
        ownerShiptype: yup.string().required('Select ownership type'),
        propertyType: yup.string().required('Select property'),
        zone: yup.string('Select Zone'),
        plotArea: yup.string('Enter plot area'),
        roadWidth: yup.string('Enter road width'),
        mobileTowerStatus: yup.string().required('Select mobile tower status'),
        hoardingStatus: yup.string().required('Select hoarding status'),
        petrolPumpStatus: yup.string().required('Select petrol pump status'),
        waterHarvestingStatus: yup.string().required('Select water harvesting status'),
        mobileTowerArea: yup.string('enter numbers only').when('mobileTowerStatus', {
            is: 1,
            then: yup.string().required('Field is required')
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        hoardingArea: yup.string().when('hoardingStatus', {
            is: 1,
            then: yup.string().required('Field is required')
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        petrolPumpArea: yup.string().when('petrolPumpStatus', {
            is: 1,
            then: yup.string().required('Field is required')
        }).min(1, 'enter minimum ').max(10, 'Enter max 10 digit'),
        mobileTowerDate: yup.date().when('mobileTowerStatus', {
            is: 1,
            then: yup.date().required('Field is required')
        }),
        hoardingDate: yup.date().when('hoardingStatus', {
            is: 1,
            then: yup.date().required('Field is required')
        }),
        petrolPumpDate: yup.date().when('petrolPumpStatus', {
            is: 1,
            then: yup.date().required('Field is required')
        }),

    })
    const formik = useFormik({
        initialValues: {
            wardNo: '',
            newWardNo: '',
            ownerShiptype: '',
            propertyType: '',
            zone: '',
            plotArea: '',
            roadWidth: '',
            mobileTowerStatus: 'no',
            hoardingStatus: 'no',
            petrolPumpStatus: 'no',
            waterHarvestingStatus: 'no',
            mobileTowerArea: '',
            hoardingArea: '',
            petrolPumpArea: '',
            mobileTowerDate: getCurrentDate(),
            hoardingDate: getCurrentDate(),
            petrolPumpDate: getCurrentDate()
        },

        onSubmit: (values, resetForm) => {
            console.log('calculator data at once', values)
            props.collectFormDataFun(values,floorData,ownerData) //sending PropertyTaxCalculatorForm data to parent to store all form data at one container
            // props.nextFun(1) //forwarding to next form level
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
    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        { name === 'mobileTowerStatus' && ((value === 1) ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name === 'hoardingStatus' && ((value === 1) ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name === 'petrolPumpStatus' && ((value === 1) ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }

        // //allow restricted inputs
        // { name == 'mobileTowerArea' && formik.setFieldValue("mobileTowerArea", allowFloatInput(value, formik.values.mobileTowerArea, 20)) } //(currentValue,oldValue,max,isCapital)
        // { name == 'hoardingArea' && formik.setFieldValue("hoardingArea", allowFloatInput(value, formik.values.hoardingArea, 20, true)) }
        // { name == 'petrolPumpArea' && formik.setFieldValue("petrolPumpArea", allowFloatInput(value, formik.values.petrolPumpArea, 20)) }
    };

    const getFloorData = (data) => {
        console.log('---floor data collection----', data)
        setfloorData(data)
    }
    const getOwnerData = (data) => {
        console.log('---Owner data collection----', data)
        setownerData(data)
    }

    const submitForm = ()=>{
        console.log('submitting form funciton')
        formik.handleSubmit()
    }
    console.log('floor data at form in state',floorData)
    return (
        <>

            <div className="block p-4 w-full md:pb-6 shadow-lg bg-white border border-gray-200  mx-auto relative">
                <div className='bg-green-400 h-16 flex justify-center items-center font-serif shadow-lg mb-6 border-b border-white relative'>
                    <span className='text-center text-white text-3xl font-semibold '> 
                 Calculate your holding tax anytime</span>
                    {/* </div> */}
                    <img src={pin} alt="pin image" className='w-24 absolute -left-5 -top-5 rotate-45' />
                </div>

                {props?.isLoading &&
               <div className='w-full absolute mx-auto text-center flex justify-center items-center top-1/2'>
                    <span className='inline'>
                    <ColorRing
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
                </span>
               </div>

            }

                <form onSubmit={formik.handleSubmit} onChange={handleChange}>
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="col-span-4 grid grid-cols-1 md:grid-cols-7">
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ward No</label>
                                <select {...formik.getFieldProps('wardNo')} className={`${commonInputStyle} cursor-pointer `}>
                                    <option>select</option>

                                    {
                                        seleOptions.map((data) => (
                                            <option value={data.value}>{data.option}</option>
                                        ))
                                    }

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.wardNo && formik.errors.wardNo ? formik.errors.wardNo : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>New Ward No</label>
                                <select {...formik.getFieldProps('newWardNo')} className={`${commonInputStyle} cursor-pointer `} >
                                    <option>select</option>

                                    {
                                        seleOptions.map((data) => (
                                            <option value={data.value}>{data.option}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.newWardNo && formik.errors.newWardNo ? formik.errors.newWardNo : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Ownership Type</label>
                                <select {...formik.getFieldProps('ownerShiptype')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option>select</option>
                                    {
                                        seleOptions.map((data) => (
                                            <option value={data.value}>{data.option}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.ownerShiptype && formik.errors.ownerShiptype ? formik.errors.ownerShiptype : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property Type</label>
                                <select {...formik.getFieldProps('propertyType')} className={`${commonInputStyle} `}
                                >
                                    <option>select</option>

                                    {
                                        seleOptions.map((data) => (
                                            <option value={data.value}>{data.option}</option>
                                        ))
                                    }
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.propertyType && formik.errors.propertyType ? formik.errors.propertyType : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>Zone</label>
                                <select {...formik.getFieldProps('zone')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option>select</option>
                                    <option value="1">Zone-1</option>
                                    <option value="2">Zone-2</option>

                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.zone && formik.errors.zone ? formik.errors.zone : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>Plot-Area</label>
                                <input {...formik.getFieldProps('plotArea')} type="text" className={`${commonInputStyle} cursor-pointer `}
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.plotArea && formik.errors.plotArea ? formik.errors.plotArea : null}</span>
                            </div>
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}>Road-Width</label>
                                <input {...formik.getFieldProps('roadWidth')} type="text" className={`${commonInputStyle} cursor-pointer `}
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.roadWidth && formik.errors.roadWidth ? formik.errors.roadWidth : null}</span>
                            </div>
                        </div>
                        <div className={`${inputContainerStyle}`}>
                            <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Mobile Tower(s) ?</label>
                            <select {...formik.getFieldProps('mobileTowerStatus')} className={`${commonInputStyle} cursor-pointer `}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerStatus && formik.errors.mobileTowerStatus ? formik.errors.mobileTowerStatus : null}</span>
                        </div>

                        <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                            <div className={`${inputContainerStyle}`}>
                                <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area Covered</label>
                                <input {...formik.getFieldProps('mobileTowerArea')} disabled={!mobileTowerStatusToggle} name="mobileTowerArea" type="text" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerArea && formik.errors.mobileTowerArea ? formik.errors.mobileTowerArea : null}</span>
                            </div>

                            <div className={`${inputContainerStyle}`}>

                                <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</label>

                                <input {...formik.getFieldProps('mobileTowerDate')} disabled={!mobileTowerStatusToggle} name="mobileTowerDate" type="date" className={`${commonInputStyle} ${!mobileTowerStatusToggle && 'bg-gray-300 opacity-30'}`} placeholder='dd-mm-yyyy' min={'2021-05-20'} max={'2024-05-25'}
                                />
                                <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDate && formik.errors.mobileTowerDate ? formik.errors.mobileTowerDate : null}</span>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-4">
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Property has Hoarding Board(s) ?</label>
                                <select {...formik.getFieldProps('hoardingStatus')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.hoardingStatus && formik.errors.hoardingStatus ? formik.errors.hoardingStatus : null}</span>
                            </div>


                            <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`${inputContainerStyle}`}>

                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                    <input {...formik.getFieldProps('hoardingArea')} disabled={!hoardingStatusToggle} name="hoardingArea" type="text" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingArea && formik.errors.hoardingArea ? formik.errors.hoardingArea : null}</span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Installation Date</small></label>
                                    <input {...formik.getFieldProps('hoardingDate')} disabled={!hoardingStatusToggle} name="hoardingDate" type="date" className={`${commonInputStyle} ${!hoardingStatusToggle && 'bg-gray-300 opacity-30'}`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDate && formik.errors.hoardingDate ? formik.errors.hoardingDate : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-4">
                            <div className={`${inputContainerStyle}`}>
                                <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Is property a Petrol Pump ?</label>
                                <select {...formik.getFieldProps('petrolPumpStatus')} className={`${commonInputStyle} cursor-pointer `}
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                                <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpStatus && formik.errors.petrolPumpStatus ? formik.errors.petrolPumpStatus : null}</span>
                            </div>

                            <div className={`col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-3`}>
                                <div className={`${inputContainerStyle}`}>

                                    <label className="form-label inline-block mb-1 text-gray-600 text-xs font-normal"><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Total Area</label>
                                    <input {...formik.getFieldProps('petrolPumpArea')} disabled={!petrolPumpStatusToggle} name="petrolPumpArea" type="text" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`} />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpArea && formik.errors.petrolPumpArea ? formik.errors.petrolPumpArea : null}</span>
                                </div>
                                <div className={`${inputContainerStyle}`}>
                                    <label className="form-check-label text-gray-800"><small className="block mt-1 text-xs text-gray-600 inline "><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Completion Date</small></label>
                                    <input {...formik.getFieldProps('petrolPumpDate')} disabled={!petrolPumpStatusToggle} name="petrolPumpDate" type="date" className={`${commonInputStyle} ${!petrolPumpStatusToggle && 'bg-gray-300 opacity-30'}`}
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDate && formik.errors.petrolPumpDate ? formik.errors.petrolPumpDate : null}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${inputContainerStyle}`}>
                            <label className={`${inputLabelStyle}`}><small className="block mt-1 text-sm font-semibold text-red-600 inline ">*</small>Rainwater harvesting provision ?</label>
                            <select {...formik.getFieldProps('waterHarvestingStatus')} className={`${commonInputStyle} cursor-pointer `}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.waterHarvestingStatus && formik.errors.waterHarvestingStatus ? formik.errors.waterHarvestingStatus : null}</span>
                        </div>






                    </div>

                </form>

                <PropertyTaxFloorForm getFloorData={getFloorData} />
                <PropertyTaxOwner getOwnerData={getOwnerData}/>
               {props?.submitButtonStatus && <div className='md:px-10 text-right mt-10'>
                    <button type="button" onClick={submitForm} className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"> Calculate <BsChevronDoubleRight className='inline font-semibold text-sm md:text-lg' /></button>
                </div>}

            </div>




            <div className='w-full h-20'></div>



        </>
    )
}

export default PropertyTaxCalculatorForm