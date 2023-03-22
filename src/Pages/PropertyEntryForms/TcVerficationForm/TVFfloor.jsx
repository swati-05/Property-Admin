import { useState, useContext, useRef } from 'react'
import rainWater from './Assets/storm.png'
import road from './Assets/road.png'
import home from './Assets/home.png'
import area from './Assets/radar.png'
import mobile from './Assets/tower.png'
import hoarding from './Assets/billboard.png'
import floor from './Assets/parquet.png'
import ward from './Assets/ward.png'
import zone from './Assets/zone.png'
import petrol from './Assets/petrol.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import verified from '@/Components/Media/verified.png'
import PropertyApiList from '@/Components/ApiList/PropertyApiList.js';
import axios from 'axios'
import api_headers from '@/Components/ApiList/api_headers.js';
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { contextVar } from '@/Components/Context/Context'
import TcVerifyFloorDetailsForm from './TcVerifyFloorDetailsForm'
import ProjectApiList from '@/Components/ApiList/ProjectApiList'
import TextArea from '@/Components/Shared/TextArea'
import { useEffect } from 'react'
import { isDisabled } from '@testing-library/user-event/dist/utils'
import ApiHeader from '@/Components/ApiList/ApiHeader'



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none'
    },
};
Modal.setAppElement('#root');
function TVFfloor(props) {

    const { api_postApplicationToLevel, api_postComment, api_getTcVerifyData } = ProjectApiList()


    const [modalIsOpen, setIsOpen] = useState(false);
    const [floorList, setfloorList] = useState()
    const [isLoading, setisLoading] = useState()
    const [finalData, setfinalData] = useState()
    const [floorData, setfloorData] = useState([])
    const [multipleFloors, setmultipleFloors] = useState([])
    const [commentText, setCommentText] = useState('')
    const [roleId, setroleId] = useState()
    const [tcVerifyData, settcVerifyData] = useState();
    const [counter, setcounter] = useState(0);

    const [mobileTowerStatusToggle, setMobileTowerStatusToggle] = useState(false)
    const [hoardingStatusToggle, setHoardingStatusToggle] = useState(false)
    const [petrolPumpStatusToggle, setPetrolPumpStatusToggle] = useState(false)


    const { post_SiteVerification } = PropertyApiList()
    const { notify } = useContext(contextVar);
    const navigate = useNavigate()


    const formRef = useRef();
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };


    useEffect(() => {
        console.log("before post prop", props?.applicationData?.data?.floors)
        setroleId(props?.applicationData?.data?.current_role)
    }, [props?.applicationData?.data?.current_role])

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const collectAllFloorData = (key, formData) => {
        console.log('floor data in index tc-------', floorData)

        let fieldata = { ...floorData, [counter]: formData };

        // console.log("before post")

        setfloorData(fieldata);

        setcounter(counter + 1);
    }

    const validationSchema = yup.object({
        wardNoStatus: yup.string(),
        wardNo: yup.string(),
        zoneStatus: yup.string(),
        zone: yup.string(),
        propertyTypeStatus: yup.string(),
        propertyType: yup.string(),
        plotAreaStatus: yup.string(),
        plotArea: yup.string(),
        roadTypeStatus: yup.string(),
        roadType: yup.string(),
        hoardingStatus: yup.string(),
        hoardingArea: yup.string(),
        hoardingDate: yup.string(),
        towerStatus: yup.string(),
        towerArea: yup.string(),
        towerDate: yup.string(),
        petrolPumpStatus: yup.string(),
        petrolPumpArea: yup.string(),
        petrolPumpDate: yup.string(),
        harvestingStatus: yup.string()
    })



    const initialValues = {
        wardNoStatus: '',
        wardNo: '',
        zoneStatus: '',
        zone: '',
        propertyTypeStatus: '',
        propertyType: '',
        plotAreaStatus: '',
        plotArea: '',
        roadTypeStatus: '',
        roadType: '',
        hoardingStatus: '',
        hoardingArea: '',
        hoardingDate: '',
        towerStatus: '',
        towerArea: '',
        towerDate: '',
        petrolPumpStatus: '',
        petrolPumpArea: '',
        petrolPumpDate: '',
        harvestingStatus: '',
    };

    const formik = useFormik({
        innerRef: { formRef },
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {
            console.log('inside submit button submit...', values)
            setfinalData(values)
            openModal()
        }
        , validationSchema
    })

    console.log("final data...", finalData)

    const submitVerficationDetails = () => {
        closeModal()
        setisLoading(true)
        let requestBody = {
            safId: props?.applicationData?.data?.id,
            propertyType: finalData?.propertyType,
            roadTypeId: finalData?.roadType,
            areaOfPlot: finalData?.plotArea,
            wardId: finalData?.wardNo,
            isMobileTower: finalData?.towerStatus,
            mobileTowerArea: finalData?.towerArea,
            mobileTowerDate: finalData?.towerDate,
            isHoardingBoard: finalData?.hoardingStatus,
            hoardingArea: finalData?.hoardingArea,
            hoardingDate: finalData?.hoardingDate,
            isPetrolPump: finalData?.petrolPumpStatus,
            petrolPumpUndergroundArea: finalData?.petrolPumpArea,
            petrolPumpDate: finalData?.petrolPumpDate,
            isHarvesting: finalData?.harvestingStatus,
            zone: finalData?.zone,
            userId: props?.applicationData?.data?.user_id,
            verificationStatus: 1,
            currentRoleId: props?.applicationData?.data?.current_role,
            floorDetails: floorData.length != 0 ? floorData : props?.applicationData?.data?.floors,
        }

        console.log('before post verificaiton data...', requestBody)
        console.log('before post floor data...', floorData)
        axios.post(post_SiteVerification, requestBody, api_headers())
            .then(function (response) {
                console.log('==2 submit verfication response..', response?.data)
                setisLoading(false)
                { (response.data.status == true) && notify('Saf details verfied successfully  !', 'success') }
                { (response.data.status == false) && notify('data is invalid,check data', "error") }

                if (roleId != 7) {
                    props?.nextFun(1)
                }
                else {

                }
            })
            .catch(function (error) {
                console.log('==2 submit verfication error...', error)
                notify('Something went wrong', 'error')
                setisLoading(false)
            })
    }


    //{////********sending application to level*******//////}
    const sendApplicationToLevel = (e) => {
        console.log('button typeclicked')
        console.log("receiverRoleId ", e.target.value)
        console.log("senderRoleId", props?.applicationData?.data?.current_role)
        console.log("safId", props?.applicationData?.data?.id)

        if (commentText == '') {
            props.toastFun("Please write some comment", "de-escalated");
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
        console.log("comment", commentText)
        let requestBody = {
            safId: props?.applicationData?.data?.id,
            comment: commentText
        }
        const header = ApiHeader()
        axios.post(`${api_postComment}`, requestBody, header)
            .then(function (response) {
                console.log("comment send", response)
                { (response.data.status == true) && notify('comment send successfully !', 'success') }
                { (response.data.status == false) && notify('Oops! Something went wrong,comment was not sent', "error") }
            })
            .catch(function (error) {
                props.toast('Oops! Something went wrong', "error")
            })
    }


    ///////////{*** APPLICATION FULL DETAIL FOR RE-ASSESSMENT***}/////////
    const fetchTcVerifyData = () => {

        let requestBody = {
            safId: props?.applicationData?.data?.id,
            // safId: 1022
        }

        console.log('...before next level from saf application ..', requestBody)
        axios.post(`${api_getTcVerifyData}`, requestBody, api_headers())
            .then(function (response) {
                console.log("--1 data verify by tc ...", response.data.data)
                settcVerifyData(response.data.data)
            })
            .catch(function (error) {
                console.log('==2 data verify by tc  error...', error)
            })
    }
    useEffect(() => {
        fetchTcVerifyData()
    }, [props?.applicationData?.data?.id])


    const handleOnChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        { name == 'wardNoStatus' && (value == '1' && formik.setFieldValue("wardNo", props?.applicationData?.data?.old_ward_no)) }
        { name == 'zoneStatus' && (value == '1' && formik.setFieldValue("zone", props?.applicationData?.data?.zone_mstr_id)) }
        { name == 'propertyTypeStatus' && (value == '1' && formik.setFieldValue("propertyType", props?.applicationData?.data?.prop_type_mstr_id)) }
        { name == 'plotAreaStatus' && (value == '1' && formik.setFieldValue("plotArea", props?.applicationData?.data?.area_of_plot)) }
        { name == 'roadTypeStatus' && (value == '1' && formik.setFieldValue("roadType", props?.applicationData?.data?.road_type_mstr_id)) }


        { name === 'hoardingStatus' && ((value == '1') ? setHoardingStatusToggle(true) : setHoardingStatusToggle(false)) }
        { name == 'hoardingStatus' && (value == '1' && formik.setFieldValue("hoardingArea", props?.applicationData?.data?.hoarding_area)) }
        { name == 'hoardingStatus' && (value == '1' && formik.setFieldValue("hoardingDate", props?.applicationData?.data?.hoarding_installation_date)) }


        { name === 'towerStatus' && ((value == '1') ? setMobileTowerStatusToggle(true) : setMobileTowerStatusToggle(false)) }
        { name == 'towerStatus' && (value == '1' && formik.setFieldValue("towerArea", props?.applicationData?.data?.tower_area)) }
        { name == 'towerStatus' && (value == '1' && formik.setFieldValue("towerDate", props?.applicationData?.data?.tower_installation_date)) }


        { name === 'petrolPumpStatus' && ((value == '1') ? setPetrolPumpStatusToggle(true) : setPetrolPumpStatusToggle(false)) }
        { name == 'petrolPumpStatus' && (value == '1' && formik.setFieldValue("petrolPumpArea", props?.applicationData?.data?.under_ground_area)) }
        { name == 'petrolPumpStatus' && (value == '1' && formik.setFieldValue("petrolPumpDate", props?.applicationData?.data?.petrol_pump_completion_date)) }

        // { name == 'harvestingStatus' && (value == '1' && formik.setFieldValue("harvestingStatus", props?.applicationData?.data?.new_ward_no)) }
    };

    console.log('prop data... ', props)

    return (
        <>
            {/* ===================new before */}

            <div className=" w-full ">
                <div className='w-full overflow-x-scroll'>
                    <table className='table-auto w-full overflow-x-scroll'>
                        <tr className="border-b border-gray-200 ">
                            <td colSpan={4} className="py-3  text-left whitespace-nowrap">
                                <TcVerifyFloorDetailsForm collectAllFloorData={collectAllFloorData} applicationData={props?.applicationData} masterData={props?.masterData} />
                            </td>

                        </tr>
                    </table>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                        <button onClick={closeModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darkshover:bg-gray-800 darkshover:text-white" >
                            <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                        <div class="p-6 text-center">
                            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 darkstext-gray-400">Confirm form submit ?</h3>
                            <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darksfocus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={submitVerficationDetails}>
                                Yes, I'm sure
                            </button>

                        </div>
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default TVFfloor