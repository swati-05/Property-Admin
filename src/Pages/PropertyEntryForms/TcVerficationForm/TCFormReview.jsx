import React, { useContext } from 'react'
import rainWater from './Assets/storm.png'
import road from './Assets/road.png'
import home from './Assets/home.png'
import area from './Assets/radar.png'
import mobile from './Assets/tower.png'
import hoarding from './Assets/billboard.png'
import review from '@/Components/Media/view.png'
import floor from './Assets/parquet.png'
import { contextVar } from '@/Components/Context/Context'
import { useFormik } from 'formik'
import * as yup from 'yup'

function TCFormReview(props) {
    //destructuring notify function to activate toast
    const { notify } = useContext(contextVar);

    const validationSchema = yup.object({
        floorNo: yup.string().required('Select floor no.').max(50, 'Enter maximum 50 characters'),
        useType: yup.string().required('Select use type'),
        occupancyType: yup.string().required('Select occupancy type'),
        constructionType: yup.string().required('Select construction type'),
        builtupArea: yup.string().required('Enter builtup Area'),
        fromDate: yup.date().required('Select from date'),
        uptoDate: yup.date()

    })
    const formik = useFormik({
        initialValues: {
            floorNo: '',
            useType: '',
            occupancyType: '',
            constructionType: '',
            builtupArea: '',
            fromDate: '',
            uptoDate: ''
        },

        onSubmit: (values, resetForm) => {
            console.log('submit...')
        }
        , validationSchema
    })
    return (
        <>
            <div className="absolute top-0 overflow-x-auto">
                <h1 className='px-4 font-semibold font-serif'><img src={review} alt="pin" className='w-10 inline' /> Review Form</h1>
                <div className="min-w-screen min-h-screen bg-gray-100 flex md:pl-4 bg-white font-sans overflow-x-auto">
                    <div className="w-full lg:w-4/6">
                        <div className="bg-white shadow-md rounded my-2">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-amber-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => notify('just testing the context data', 'info')}>Objection</th>
                                        <th className="py-3 px-6 text-left">Assesment</th>
                                        <th className="py-3 px-6 text-center">Applicant</th>
                                        <th className="py-3 px-6 text-center">
                                            <th>
                                                <span className='px-3'>DA</span>
                                            </th>
                                            <th>
                                                <span className='px-3'>ATC</span>
                                            </th>
                                            <th>
                                                <span className='px-3'>UTC</span>
                                            </th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light bg-white">
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={rainWater} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">RainWater Harvesting</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center text-sm">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>No</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>No</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={road} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Road Width</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={home} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Property Type</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={area} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Area of Plot</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={mobile} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Mobile Tower</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={hoarding} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Hoarding Board</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center font-semibold text-sm">
                                                <span>Yes</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center font-semibold text-sm">
                                                <span>No</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                            <td><span className='bg-green-200 rounded-xl px-3 shadow-lg'>Yes</span></td>
                                        </td>

                                    </tr>
                                    <tr className="border-b border-gray-200 ">
                                        <td colSpan={4} className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                    <img src={floor} alt="rain" className='w-4' />
                                                </div>
                                                <span className="font-medium">Floor Detail</span>
                                            </div>
                                            <div className="col-span-4 overflow-x-auto">
                                                <table className='min-w-full leading-normal'>
                                                    <thead className='font-bold text-left text-sm bg-sky-50'>

                                                        <tr className="px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs text-left">
                                                            <th className='py-2 px-2'>Type</th>
                                                            <th className='py-2 px-2'>Floor No</th>
                                                            <th className='py-2 px-2'>Usage Type</th>
                                                            <th className='py-2 px-2'>Occupancy Type</th>
                                                            <th className='py-2 px-2'>Construction Type</th>
                                                            <th className='py-2 px-2'>Built Up Area </th>
                                                            <th className='py-2 px-2'>From Date</th>
                                                            <th className='py-2 px-2'>Upto Date </th>
                                                        </tr>

                                                    </thead>
                                                    <tbody className="text-xs">
                                                        {/* {
                                                    floorList.map((floor) => ( */}
                                                        <>

                                                            {/* <tr className="bg-white shadow-lg border-b border-gray-200">
                                                                <td className="px-2 py-2 text-left">{floor?.floorNo}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.usageType}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.occupancyType}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.constructionType}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.area}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.from_date}</td>
                                                                <td className="px-2 py-2 text-left">{floor?.uptoDate}</td>
                                                            </tr> */}
                                                            <tr className="bg-white shadow-lg border-b border-gray-200 font-bold">
                                                                <td className="px-2 py-2 text-left">Ast</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                            </tr>
                                                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                                                <td className="px-2 py-2 text-left font-bold">App</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                            </tr>
                                                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                                                <td className="px-2 py-2 text-left font-bold">DA</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                            </tr>
                                                            <tr className="bg-white shadow-lg border-b border-gray-200">
                                                                <td className="px-2 py-2 text-left font-bold">ATC</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                            </tr>
                                                            <tr className="bg-white shadow-lg border-b border-gray-400 ">
                                                                <td className="px-2 py-2 text-left font-bold">UTC</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                                <td className="px-2 py-2 text-left">one</td>
                                                            </tr>

                                                        </>
                                                        {/* ))
                                                } */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-12 w-full">
                            <div className='md:pl-0 col-span-4'>
                                <button onClick={() => props.backFun(2)} type="button" className=" px-6 py-2.5 bg-gray-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Back</button>
                            </div>
                            <div className='md:px-4 text-center col-span-4'>

                            </div>
                            <div className='md:pl-10 text-right col-span-4'>
                                <button onClick={() => props.nextFun(2)} type="button" className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TCFormReview