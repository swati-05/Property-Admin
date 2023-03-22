import { useContext, useState } from 'react'
import rainWater from './Assets/storm.png'
import nav from '@/Components/Media/nav.png'
import { contextVar } from '@/Components/Context/Context'
import { useFormik } from 'formik'
import * as yup from 'yup'
import photo from '@/Components/Media/photo.png'
import folder from '@/Components/Media/folders.png'


function BoDocUpload(props) {
    //destructuring notify function to activate toast
    const { notify } = useContext(contextVar);

    const [propertyDocuments, setPropertyDocuments] = useState(
        [
            { docType: 'Possession Certificate' },
            { docType: 'SAF Form' },
            { docType: 'Additional Document' },
        ]
    )
    const [ownerList, setownerList] = useState(
        [
            { ownerName: 'Mark' },
            { ownerName: 'Shark' },
            { ownerName: 'Dark' },
        ]
    )

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
            <div className="overflow-x-auto ">
                <h1 className='px-4 font-semibold font-serif'><img src={folder} alt="pin" className='w-8 inline' /> Bo Doc Upload</h1>

                <div className='bg-white'>

                    {/* Owner documents */}
                    <div className="bg-gray-100 flex md:pl-4 bg-white font-sans overflow-x-auto mt-10">
                        <div className="w-full lg:w-4/6">
                            <h1 className='text-xs'>Owner Documents</h1>
                            <div className="bg-white shadow-md rounded my-2">
                                <table className="min-w-max w-full table-auto">
                                    <thead> 
                                        <tr className="bg-amber-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left cursor-pointer">Owner Name</th>
                                            <th className="py-3 px-6 text-left cursor-pointer">Guardian Name</th>
                                            <th className="py-3 px-6 text-left cursor-pointer">Mobile</th>
                                            <th className="py-3 px-6 text-left">Applicant Image</th>
                                            <th className="py-3 px-6 text-center mx-auto">Applicant Document</th>


                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light bg-white">
                                        {/* front image */}
                                        {
                                            ownerList.map((owner) => (
                                                <tr className="border-b border-gray-200 ">
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{owner.ownerName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{owner.ownerName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">9464946494</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6">
                                                        <div className="text-center font-semibold text-sm">

                                                            <img src={photo} alt="previewImage" className='w-16 cursor-pointer block mx-auto' />
                                                            <div className="">
                                                                <input {...formik.getFieldProps('harvesting')} type='file' className="form-control block px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-28 mx-auto" />
                                                                <span className="text-red-600 absolute text-xs">{formik.touched.harvesting && formik.errors.harvesting ? formik.errors.harvesting : null}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6">
                                                        <div className="text-center font-semibold text-sm">

                                                            <img src={photo} alt="previewImage" className='w-16 cursor-pointer block mx-auto' />
                                                            <div className="">
                                                                <input {...formik.getFieldProps('harvesting')} type='file' className="form-control block px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-28 mx-auto" />
                                                                <span className="text-red-600 absolute text-xs">{formik.touched.harvesting && formik.errors.harvesting ? formik.errors.harvesting : null}</span>
                                                            </div>
                                                        </div>
                                                    </td>



                                                </tr>
                                            ))
                                        }



                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    {/* Property type */}
                    <div className="bg-gray-100 flex md:pl-4 bg-white font-sans overflow-x-auto mt-6">
                        <div className="w-full lg:w-4/6">
                            <h1 className='text-xs'>Property Documents</h1>
                            <div className="bg-white shadow-md rounded my-2">
                                <table className="min-w-max w-full table-auto">
                                    <thead>
                                        <tr className="bg-amber-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left cursor-pointer">Document Name</th>
                                            <th className="py-3 px-6 text-left">Upload</th>
                                            <th className="py-3 px-6 text-center">Preview</th>


                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light bg-white">
                                        {/* front image */}
                                        {propertyDocuments.map((document) => (
                                            <tr className="border-b border-gray-200 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={folder} alt="rain" className='w-4' />
                                                        </div>
                                                        <span className="font-medium">{document.docType}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6">
                                                    <div className="font-semibold text-sm">

                                                        <div className="">
                                                            <input {...formik.getFieldProps('harvesting')} type='file' className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" />
                                                            <span className="text-red-600 absolute text-xs">{formik.touched.harvesting && formik.errors.harvesting ? formik.errors.harvesting : null}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={photo} alt="previewImage" className='w-16 cursor-pointer' />
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}



                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-5 grid grid-cols-3 px-4">
                        <div className='md:pl-0'>
                            <button onClick={() => props.backFun(3)} type="button" className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                        </div>
                        <div className='md:px-4 text-center'>
                        </div>
                        <div className='md:pl-10 text-right'>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BoDocUpload