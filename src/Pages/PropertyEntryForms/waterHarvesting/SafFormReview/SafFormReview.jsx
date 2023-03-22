//////////////////{*****}//////////////////////////////////////////
// >Author - swati sharma
// > Api Integreted and some functionality : R U Bharti
// >Version - 1.0
// >Date - 7 oct 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - SafFormReview
// >DESCRIPTION - SafFormReview Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useRef } from 'react'
import pointer from '../../../../Components/Media/pointer.png'
import folder from '../../../../Components/Media/folders.png'
import building from '../../../../Components/Media/building.png'
import home from '../../../../Components/Media/home.png'
import Modal from 'react-modal';
// import MatrixFactor from './RateChart/MatrixFactor3'
import RentalRate1 from './RateChart/RentalRate1'
import UsageFactor2 from './RateChart/UsageFactor2'
import RentalRate2 from './RateChart/RentalRate2'
import CircleRate3 from './RateChart/CircleRate3'
import OccupancyFactor3 from './RateChart/OccupancyFactor3'
import MatrixFactor3 from './RateChart/MatrixFactor3'
import CalculationFactor3 from './RateChart/CalculationFactor3'
import OccupancyFactor2 from './RateChart/OccupancyFactor2'
import CitizenTaxCard from './CitizenTaxCard'
import { useNavigate } from 'react-router-dom'
import { TbEdit } from 'react-icons/tb'
import { MdOutlineUpload } from 'react-icons/md'
import { MdViewInAr } from 'react-icons/md'



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none'
    }
};
// Modal.setAppElement('#root');
// Modal.setAppElement('#modal');


function SafFormReview(props) {
    const [rateChartText, setRateChartText] = useState('')

    const [modalIsOpen, setIsOpen] = useState(false);
    const [taxDescriptionState, setTaxDescriptionState] = useState(false)
    const [OtpModalIsOpen, setOtpModalIsOpen] = useState(false);


    const navigate = useNavigate()
    const toggleTaxDescription = () => {
        setTaxDescriptionState(!taxDescriptionState)

        // console.log('scroll top position ',document.documentElement.scrollTop)
    }

    console.log('form review data...', props?.formReviewData, "and incoming image in review => ", props?.rwhImGet, "and incoming file in review => ", props?.rwhFormGet)
    // console.log('form submit fun...',  props.submitFun())

    // function openModal(chartText) {
    //     setIsOpen(true);
    //     setRateChartText(chartText)
    // }
    function closeModal() {
        // document.getElementById('root').style.filter = 'none'
        setIsOpen(false);
        setRateChartText('')
    }

    function openModalOTP() {
        setOtpModalIsOpen(true);
    }

    function afterOtpOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeOtpModaal() {
        setIsOpen(false);
    }

  

    return (
        <>
            <div className={` block p-4 mt-4 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto`}>
                <h1 className='px-2 font-semibold mt-0 bg-gray-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white mb-10'>Review and submit your form details.</h1>

                <div className='mt-4'>
                    <div>
                        <h1 className='px-1  font-semibold font-serif text-xs'><img src={folder} alt="pin" className='w-5 inline' />Rain Water Harvesting</h1>

                        <div className='bg-green-50 rounded-lg shadow-lg py-6'>
                            <div className="flex space-x-10 pl-4 ">
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Does Completion of Water Harvesting is done before 31-03-2017?   </div>
                                    <div className='font-bold text-sm'>{props?.formReviewData?.waterHarvesting?.isWaterHarvestingBefore == 1 ? "yes" : "no"}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Holding No.</div>
                                    <div className='font-semibold text-sm'>{props?.formReviewData?.waterHarvesting?.holdingNo}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Guardian Name  </div>
                                    <div className='font-semibold text-sm'>{props?.formReviewData?.waterHarvesting?.guardianName}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Ward No</div>
                                    <div className='font-bold text-sm'>{props?.formReviewData?.waterHarvesting?.wardNo}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Mobile No.</div>
                                    <div className='font-bold text-sm'>{props?.formReviewData?.waterHarvesting?.mobileNo}</div>
                                </div>
                            </div>

                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Name of Building and Address </div>
                                    <div className='font-bold text-sm'>{props?.formReviewData?.waterHarvesting?.buildingAddress}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Date of Completion of Water Harvesting Structure </div>
                                    <div className='font-semibold text-sm'>{props?.formReviewData?.waterHarvesting?.dateOfCompletion}</div>
                                </div>
                                {/* <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Upload Water Harvesting Declaration Form </div>
                                    <div className='font-semibold text-sm'>{props?.formReviewData?.waterHarvesting?.isWaterHarvestingBefore}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Upload Water Harvesting Image </div>
                                    <div className='font-bold text-sm'>{props?.formReviewData?.waterHarvesting?.isWaterHarvestingBefore}</div>
                                </div> */}
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Water Harvesting Image </div>
                                    <div className='font-bold text-sm'>{props?.rwhImGet?.name}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Water Harvesting Form </div>
                                    <div className='font-bold text-sm'>{props?.rwhFormGet?.name}</div>
                                </div>
                                <div className='flex-1 text-xs'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex mb-10 mt-4">
                    <div className='md:px-10 flex-1'>
                        <button onClick={() => props.backFun(1)} type="button" className="pl-4 pr-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><TbEdit className='inline text-lg' /> Edit</button>
                    </div>

                    <div className='md:px-10 text-right flex-1'>
                        <button onClick={() => props.submitFun(3)} type="button" className=" px-6 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Submit <MdOutlineUpload className='inline text-lg' /></button>
                    </div>
                </div>

                <div className="w-full h-20"></div>

            </div>

            {/* rate modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="relative rounded-xl p-6 border-2 border-gray-200 rounded bg-white">
                    {(rateChartText == 'rental_rate1') && <RentalRate1 />}
                    {(rateChartText == 'usageFactor_rate2') && <UsageFactor2 />}
                    {(rateChartText == 'occupancyFactor_rate2') && <OccupancyFactor2 />}
                    {(rateChartText == 'rental_rate2') && <RentalRate2 />}
                    {(rateChartText == 'circle_rate3') && <CircleRate3 />}
                    {(rateChartText == 'occupancyFactor_rate3') && <OccupancyFactor3 />}
                    {(rateChartText == 'matrixFactor_rate3') && <MatrixFactor3 />}
                    {(rateChartText == 'calculationFactor_rate3') && <CalculationFactor3 />}
                </div>
            </Modal>

            {/* OTP modal */}
            <Modal
                isOpen={OtpModalIsOpen}
                onAfterOpen={afterOtpOpenModal}
                onRequestClose={closeOtpModaal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <OtpScreen allFormData={props?.formReviewData} submitFun={props.submitFun} closeOtpModaal={closeOtpModaal} /> */}
            </Modal>

        </>
    )
}

export default SafFormReview