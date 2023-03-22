import { useContext, useState, useEffect } from 'react'
import rainWater from './Assets/storm.png'
import road from './Assets/road.png'
import home from './Assets/home.png'
import area from './Assets/radar.png'
import mobile from './Assets/tower.png'
import hoarding from './Assets/billboard.png'
import floor from './Assets/parquet.png'
import petrol from './Assets/petrol.png'
import L from '@/Components/Media/l.png'
import R from '@/Components/Media/r.png'
import F from '@/Components/Media/f.png'
import nav from '@/Components/Media/nav.png'
import { contextVar } from '@/Components/Context/Context'
import { FieldArray, useFormik } from 'formik'
import * as yup from 'yup'
import photo from '@/Components/Media/photo.png'
import axios from 'axios'
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import api_headers from '@/Components/ApiList/api_headers.js';
import { ColorRing } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import TextArea from '@/Components/Shared/TextArea'
import ApiHeader from '@/Components/ApiList/ApiHeader'

function TcGeoTagging(props) {

    const { id } = useParams()
    console.log('id current...saf..', id)

    const [isLoading, setisLoading] = useState(false)
    const [frontDocFile, setfrontDocFile] = useState()
    const [frontDocFilePreview, setfrontDocFilePreview] = useState()
    const [leftDocFile, setleftDocFile] = useState()
    const [leftDocFilePreview, setleftDocFilePreview] = useState()
    const [rightDocFile, setrightDocFile] = useState()
    const [rightDocFilePreview, setrightDocFilePreview] = useState()
    const [harvestingDocFile, setharvestingDocFile] = useState()
    const [harvestingDocFilePreview, setharvestingDocFilePreview] = useState()
    const [towerDocFile, settowerDocFile] = useState()
    const [towerDocFilePreview, settowerDocFilePreview] = useState()
    const [hoardingDocFile, sethoardingDocFile] = useState()
    const [hoardingDocFilePreview, sethoardingDocFilePreview] = useState()
    const [petrolPumpDocFile, setpetrolPumpDocFile] = useState()
    const [petrolPumpFilePreview, setpetrolPumpFilePreview] = useState()
    const [commentText, setCommentText] = useState('')
    const { notify } = useContext(contextVar);  //destructuring notify function to activate toast
    const { post_GeoTagging } = PropertyApiList()
    const { api_postApplicationToLevel, api_fetchRoleDetail, api_postComment } = ProjectApiList()
    const navigate = useNavigate()

    const validationSchema = yup.object({
        frontDoc: yup.mixed(),
        leftDoc: yup.mixed(),
        rightDoc: yup.mixed(),
        harvestingDoc: yup.mixed(),
        mobileTowerDoc: yup.mixed(),
        hoardingDoc: yup.mixed(),
        petrolPumpDoc: yup.mixed()
    })
    const formik = useFormik({
        initialValues: {
            frontDoc: '',
            leftDoc: '',
            rightDoc: '',
            harvestingDoc: '',
            mobileTowerDoc: '',
            hoardingDoc: '',
            petrolPumpDoc: ''
        },

        onSubmit: (values, resetForm) => {
            // alert(JSON.stringify(values, null, 2));
            console.log('submit...',)
            postGeoTagging(values)
        }
        , validationSchema
    })


    //{////********submit document for geo tagging*******//////}
    const postGeoTagging = () => {

        let fd = new FormData()

        fd.append("safId", id)

        fd.append("imagePath[]", frontDocFile)
        fd.append("imagePath[]", leftDocFile)
        fd.append("imagePath[]", rightDocFile)
        fd.append("imagePath[]", harvestingDocFile)
        fd.append("imagePath[]", towerDocFile)
        fd.append("imagePath[]", hoardingDocFile)
        fd.append("imagePath[]", petrolPumpDocFile)


        fd.append("directionType[]", "frontDoc")
        fd.append("directionType[]", "leftDoc")
        fd.append("directionType[]", "rightDoc")
        fd.append("directionType[]", "harvestingDoc")
        fd.append("directionType[]", "mobileTowerDoc")
        fd.append("directionType[]", "hoardingDoc")
        fd.append("directionType[]", "petrolPumpDoc")



        console.log("request body geotag ", fd)
        const header = ApiHeader()
        console.log("-----------------------4", post_GeoTagging, fd, header)
        axios.post(post_GeoTagging, fd, header)
            .then(function (response) {
                console.log('==2 post geo tagging response...', response)
                { (response.data.status == true) && notify('document uploaded successfully !', 'success') }
                { (response.data.status == false) && notify('failed to upload', "error") }

                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 post geo tagging error...', error)
                props.toast('failed to upload', "error")

                setisLoading(false)
            })
    }

    const handleChange = (e) => {
        let name = e.target.name
        if (name == 'frontDoc') {
            let file = e.target.files[0]
            setfrontDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                setfrontDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'leftDoc') {
            let file = e.target.files[0]
            setleftDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                setleftDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'rightDoc') {
            let file = e.target.files[0]
            setrightDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                setrightDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'harvestingDoc') {
            let file = e.target.files[0]
            setharvestingDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                setharvestingDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'mobileTowerDoc') {
            let file = e.target.files[0]
            settowerDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                settowerDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'hoardingDoc') {
            let file = e.target.files[0]
            sethoardingDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                sethoardingDocFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if (name == 'petrolPumpDoc') {
            let file = e.target.files[0]
            setpetrolPumpDocFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => {
                setpetrolPumpFilePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }

    }

    //{////********sending application to level*******//////}
    const sendApplicationToLevel = (e) => {
        console.log('button typeclicked')
        console.log("receiverRoleId ", e.target.value)
        console.log("senderRoleId", props?.applicationData?.data?.current_role)
        console.log("safId", props?.applicationData?.data?.id)


        if (commentText == '') {
            props.toastFun("Please write your remark", "error");
            return
        }

        let requestBody = {
            safId: props?.applicationData?.data?.id,
            comment: commentText,
            senderRoleId: props?.applicationData?.data?.current_role,
            receiverRoleId: e.target.value
        }

        console.log('...before next level from saf application ..', requestBody)
        axios.post(`${api_postApplicationToLevel}`, requestBody, api_headers())
            .then(function (response) {
                console.log("application forwarded", response)
                // props.showTabFun(false);    //hiding tabs
                { (e.target.id == 'btn_forward') && props.toastFun('Application is forwarded successfully', 'success') }
                { (e.target.id == 'btn_back') && props.toastFun('Application send backward successfully', 'success') }

                navigate('/tcsafList')

            })
            .catch(function (error) {
                props.toastFun('Oops! Something went wrong', 'error')
            })
    }


    //{////********recording comment here*******//////}
    const commentFun = (commentText) => {
        setCommentText(commentText);
        console.log("comment...", commentText);
    };

    // {////********sending independent comment*******//////}
    const sendIndependentComment = () => {
        let requestBody = {
            safId: props?.applicationData?.data?.id,
            comment: commentText
        }

        console.log("safId...", props?.applicationData?.data?.id)
        console.log("comment...", commentText)

      
        axios.post(`${api_postComment}`, requestBody, api_headers())
            .then(function (response) {
                console.log("comment send", response)
                { (response.data.status == true) && notify('comment send successfully !', 'success') }
                { (response.data.status == false) && notify('Oops! Something went wrong', "error") }
                // alert("comment forwarded")

            })
            .catch(function (error) {
                props.toast('Oops! Something went wrong', "error")
            })
    }

    return (
        <>
            <div className=' w-full  border  border-red-500 '>
                {isLoading && <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />}
                <form onSubmit={formik.handleSubmit} onChange={handleChange} encType="multipart/form-data" className=''>
                    <div className="top-0 w-full">

                        <h1 className='px-4 font-semibold font-serif'><img src={nav} alt="pin" className='w-10 inline' /> Geo Tagging</h1>

                        <div className="min-w-screen min-h-screen bg-gray-100 flex md:pl-4 bg-white font-sans overflow-x-auto">
                            <div className="w-full ">
                                <div className="bg-white shadow-md rounded my-2">
                                    <table className=" w-full table-auto">
                                        <thead>
                                            <tr className="bg-amber-200 text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => notify('just testing the context data', 'info')}>Image Type</th>
                                                <th className="py-3 px-6 text-left">Upload</th>
                                                <th className="py-3 px-6 text-center">Preview</th>
                                                <th className="py-3 px-6 text-center">Latitude</th>
                                                <th className="py-3 px-6 text-center">Longitude</th>

                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light bg-white">
                                            {/* front image */}
                                            <tr className="border-b border-gray-100 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={F} alt="rain" className='w-3' />
                                                        </div>
                                                        <span className="font-medium">Front</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                            <input {...formik.getFieldProps('frontDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                            <span className="text-red-600 absolute text-xs">{formik.touched.frontDoc && formik.errors.frontDoc ? formik.errors.frontDoc : null}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={frontDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr className="border-b border-gray-200 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={L} alt="rain" className='w-4' />
                                                        </div>
                                                        <span className="font-medium">Left</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('leftDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.leftDoc && formik.errors.leftDoc ? formik.errors.leftDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={leftDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        No

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr className="border-b border-gray-200 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={R} alt="rain" className='w-4' />
                                                        </div>
                                                        <span className="font-medium">Right</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('rightDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.rightDoc && formik.errors.rightDoc ? formik.errors.rightDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={rightDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>
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
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('harvestingDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.harvestingDoc && formik.errors.harvestingDoc ? formik.errors.harvestingDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={harvestingDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
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
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('mobileTowerDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.mobileTowerDoc && formik.errors.mobileTowerDoc ? formik.errors.mobileTowerDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={towerDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr className="border-b border-gray-200 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={hoarding} alt="rain" className='w-4' />
                                                        </div>
                                                        <span className="font-medium">Hoarding</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('hoardingDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.hoardingDoc && formik.errors.hoardingDoc ? formik.errors.hoardingDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={hoardingDocFilePreview} alt="previewImage" className='w-16 cursor-pointer' />

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>
                                            <tr className="border-b border-gray-200 ">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                                            <img src={petrol} alt="rain" className='w-4' />
                                                        </div>
                                                        <span className="font-medium">Petrol Pump</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="form-group col-span-4 md:col-span-1 md:px-0">
                                                        <input {...formik.getFieldProps('petrolPumpDoc')} type='file' className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36" webkitdirectory />
                                                        <span className="text-red-600 absolute text-xs">{formik.touched.petrolPumpDoc && formik.errors.petrolPumpDoc ? formik.errors.petrolPumpDoc : null}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <img src={petrolPumpFilePreview} alt="previewImage" className='w-16 cursor-pointer' />

                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center justify-center font-semibold text-sm">
                                                        <span>No</span>
                                                    </div>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                    {/* <h1 className='text-xs'>Comments</h1> */}
                                    <div className='w-full lg:w-4/6 mx-auto py-4'>
                                        <textarea commentFun={commentFun} bgColor="bg-white" value={commentText} placeholder="Write a brief remark" className='shadow-lg w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  text-sm outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out focus:bg-white h-24' required></textarea>

                                        <button className='bg-green-300 text-black rounded-sm px-1 py-0 my-2 hover:shadow-lg '><a className='' style={{ 'fontSize': '11px' }} target="_blank" href="https://www.google.com/inputtools/try/">Type Hindi &#8594;</a></button>

                                    </div>
                                </div>


                                <div className="grid grid-cols-12 w-full">
                                    <div className='md:pl-0 col-span-4'>
                                        {props?.applicationData?.data?.current_role != 7 &&
                                            <button id='btn_back' value={props?.roleDetails?.backward_role_id} onClick={sendApplicationToLevel} type="button" className=" px-6 py-2.5 bg-blue-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">BackWard</button>
                                        }
                                    </div>
                                    <div className='md:px-4 text-center col-span-4'>
                                        <button type='submit' className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Upload Document</button>
                                    </div>
                                    <div className='md:pl-10 text-right col-span-4'>
                                        <button type='button' id='btn_forward' value={props?.roleDetails?.forward_role_id} onClick={sendApplicationToLevel} className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Forward</button>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </>
    )
}

export default TcGeoTagging