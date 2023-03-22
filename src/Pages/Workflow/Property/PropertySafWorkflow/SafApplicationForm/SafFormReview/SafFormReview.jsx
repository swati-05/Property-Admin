//////////////////{*****}//////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19th Dec., 2022
// >Revision - 1
// >Project - JUIDCO
// >Component  - SafFormReview
// >DESCRIPTION - SafFormReview Component
//////////////////{*****}//////////////////////////////////////////

import { useState, useRef } from 'react'
import pointer from '@/Components/Media/pointer.png'
import folder from '@/Components/Media/folders.png'
import building from '@/Components/Media/building.png'
import home from '@/Components/Media/home.png'
import Modal from 'react-modal';
// // import MatrixFactor from './RateChart/MatrixFactor3'
// import RentalRate1 from './RateChart/RentalRate1'
// import UsageFactor2 from './RateChart/UsageFactor2'
// import RentalRate2 from './RateChart/RentalRate2'
// import CircleRate3 from './RateChart/CircleRate3'
// import OccupancyFactor3 from './RateChart/OccupancyFactor3'
// import MatrixFactor3 from './RateChart/MatrixFactor3'
// import CalculationFactor3 from './RateChart/CalculationFactor3'
// import OccupancyFactor2 from './RateChart/OccupancyFactor2'
// import CitizenTaxCard from './CitizenTaxCard'
import { useNavigate } from 'react-router-dom'
import { TbEdit } from 'react-icons/tb'
import { MdOutlineUpload } from 'react-icons/md'
import { MdViewInAr } from 'react-icons/md'
// import OtpScreen from '@/Components/'
import moment from 'moment'



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
    }
};

function SafFormReview(props) {
    const [rateChartText, setRateChartText] = useState('')

    const [modalIsOpen, setIsOpen] = useState(false);
    const [taxDescriptionState, setTaxDescriptionState] = useState(false)
    const [OtpModalIsOpen, setOtpModalIsOpen] = useState(false);


    const navigate = useNavigate()
    const toggleTaxDescription = () => {
        setTaxDescriptionState(!taxDescriptionState)
    }

    console.log('form review data...', props?.formReviewData)

    function openModal(chartText) {
        setIsOpen(true);
        setRateChartText(chartText)
    }
    function closeModal() {
        setIsOpen(false);
        setRateChartText('')
    }

    function openModalOTP() {
        setOtpModalIsOpen(true);
    }

    function afterOtpOpenModal() {
    }

    function closeOtpModaal() {
        setOtpModalIsOpen(false);
    }

    return (
        <>
            <div className={` block p-4 -mt-[12rem] w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto  overflow-x-auto`}>
                <h1 className='px-2 font-semibold mt-0 bg-gray-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white mb-10'>Review and update your form details.</h1>
                <div className='mt-4'>
                    <div>
                        <h1 className='px-1 font-semibold font-serif text-xs'><img src={folder} alt="pin" className='w-5 inline' /> Basic Details</h1>
                        <div className='bg-green-50 rounded-lg shadow-lg py-6'>
                            <div className="flex space-x-10 pl-4 ">
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Ward No.</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.wardNo == '' || props?.formReviewData?.basicDetails?.wardNo == null) ? <i>N/A</i> : props?.formReviewData?.basicDetails?.wardNo}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>New Ward No</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.newWardNo == '' || props?.formReviewData?.basicDetails?.newWardNo == null) ? <i>N/A</i> : props?.formReviewData?.basicDetails?.newWardNo}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Ownership Type</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.ownerShiptype == '' || props?.formReviewData?.basicDetails?.ownerShiptype == null) ? <i>N/A</i> : props?.formReviewData?.basicDetails?.ownerShiptype}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Property Type</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.propertyType == '' || props?.formReviewData?.basicDetails?.propertyType == null) ? <i>N/A</i> : props?.formReviewData?.basicDetails?.propertyType}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Zone</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.zone == '' || props?.formReviewData?.basicDetails?.zone == null) ? <i>N/A</i> : (props?.formReviewData?.basicDetails?.zone == '1' ? <>Zone-1</> : <>Zone-2</>)}</div>
                                </div>
                            </div>

                            <div className="flex space-x-10  pl-4 mt-4">
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Property has Mobile Tower(s) ?</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.mobileTowerStatus == '' || props?.formReviewData?.basicDetails?.mobileTowerStatus == null) ? <i>N/A</i> : (props?.formReviewData?.basicDetails?.mobileTowerStatus == '1' ? <>Yes</> : <>No</>)}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Property has Hoarding Board(s) ?</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.hoardingStatus == '' || props?.formReviewData?.basicDetails?.hoardingStatus == null) ? <i>N/A</i> : (props?.formReviewData?.basicDetails?.hoardingStatus == '1' ? <>Yes</> : <>No</>)}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Is property a Petrol Pump ?</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.petrolPumpStatus == '' || props?.formReviewData?.basicDetails?.petrolPumpStatus == null) ? <i>N/A</i> : (props?.formReviewData?.basicDetails?.petrolPumpStatus == '1' ? <>Yes</> : <>No</>)}</div>
                                </div>
                                <div className='flex-1 text-xs'>
                                    <div className='text-gray-500'>Rainwater harvesting provision ?</div>
                                    <div className='font-semibold text-sm'>{(props?.formReviewData?.basicDetails?.waterHarvestingStatus == '' || props?.formReviewData?.basicDetails?.waterHarvestingStatus == null) ? <i>N/A</i> : (props?.formReviewData?.basicDetails?.waterHarvestingStatus == '1' ? <>Yes</> : <>No</>)}</div>
                                </div>
                                <div className='flex-1 text-xs'>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Property  details */}
                    <h1 className='px-1 font-semibold font-serif text-xs mt-10'><img src={home} alt="pin" className='w-5 inline' /> Property Address & Details</h1>
                    <div className='bg-green-50 rounded-lg shadow-lg py-6'>
                        <div className="flex space-x-10 pl-4 ">
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Khata No.</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.khataNo == '' || props?.formReviewData?.propertyAddressDetails?.khataNo == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.khataNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Plot No</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.plotNo == '' || props?.formReviewData?.propertyAddressDetails?.plotNo == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.plotNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Village/Mauja Name</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.village_mauja == '' || props?.formReviewData?.propertyAddressDetails?.village_mauja == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.village_mauja}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Area of Plot</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.plotArea == '' || props?.formReviewData?.propertyAddressDetails?.plotArea == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.plotArea}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Road Width</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.roadWidth == '' || props?.formReviewData?.propertyAddressDetails?.roadWidth == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.roadWidth}</div>
                            </div>
                        </div>

                        <div className="flex space-x-10  pl-4 mt-4">
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>City</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.city == '' || props?.formReviewData?.propertyAddressDetails?.city == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.city}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>District</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.district == '' || props?.formReviewData?.propertyAddressDetails?.district == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.district}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>State</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.state == '' || props?.formReviewData?.propertyAddressDetails?.state == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.state}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Pin</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.pin == '' || props?.formReviewData?.propertyAddressDetails?.pin == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.pin}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Locality</div>
                                <div className='font-semibold text-sm'>N{props?.formReviewData?.propertyAddressDetails?.locality}o</div>
                            </div>
                        </div>

                        <div></div>
                        {/* coressponding address */}
                        <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                        </div>

                        <div className="flex space-x-10  pl-4 mt-4">
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>City</div>
                                <div className='font-semibold text-sm'>{props?.formReviewData?.propertyAddressDetails?.c_city}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>District</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.c_district == '' || props?.formReviewData?.propertyAddressDetails?.c_district == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.c_district}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>State</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.c_state == '' || props?.formReviewData?.propertyAddressDetails?.c_state == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.c_state}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Pin</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.c_pin == '' || props?.formReviewData?.propertyAddressDetails?.c_pin == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.c_pin}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Locality</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.propertyAddressDetails?.c_locality == '' || props?.formReviewData?.propertyAddressDetails?.c_locality == null) ? <i>N/A</i> : props?.formReviewData?.propertyAddressDetails?.c_locality}</div>
                            </div>
                        </div>
                    </div>

                    {/* electricity details */}
                    <h1 className='px-1 font-semibold font-serif text-xs mt-6'> Electricity & Water Details</h1>
                    <div className='bg-green-50 rounded-lg shadow-lg py-6'>
                        <div className="flex space-x-10 pl-4 ">
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Electricity K. No</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.electricityKNo == '' || props?.formReviewData?.electricityWaterDetails?.electricityKNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.electricityKNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>ACC No.</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.accNo == '' || props?.formReviewData?.electricityWaterDetails?.accNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.accNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>BIND/BOOK No.</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.bindBookNo == '' || props?.formReviewData?.electricityWaterDetails?.bindBookNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.bindBookNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Electricity Consumer Category</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.electrictyConsumerNo == '' || props?.formReviewData?.electricityWaterDetails?.electrictyConsumerNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.electrictyConsumerNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>

                            </div>
                        </div>


                        <div className="flex space-x-10  pl-4 mt-4">
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Building Plan Approval No.</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.bpApprovalNo == '' || props?.formReviewData?.electricityWaterDetails?.bpApprovalNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.bpApprovalNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Building Plan Approval Date</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.bpApprovalDate == '' || props?.formReviewData?.electricityWaterDetails?.bpApprovalDate == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.bpApprovalDate}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Water Consumer No.</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.waterConsumerNo == '' || props?.formReviewData?.electricityWaterDetails?.waterConsumerNo == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.waterConsumerNo}</div>
                            </div>
                            <div className='flex-1 text-xs'>
                                <div className='text-gray-500'>Water Connection Date</div>
                                <div className='font-semibold text-sm'>{(props?.formReviewData?.electricityWaterDetails?.waterConnectionDate == '' || props?.formReviewData?.electricityWaterDetails?.waterConnectionDate == null) ? <i>N/A</i> : props?.formReviewData?.electricityWaterDetails?.waterConnectionDate}</div>
                            </div>
                            <div className='flex-1 text-xs'>

                            </div>
                        </div>
                    </div>

                    {/* owner details */}
                   {(props?.formReviewData?.ownerDetails == '' || props?.formReviewData?.ownerDetails == null) ? <></> : <div className='mt-8'>
                        <h1 className='px-1 font-semibold font-serif text-xs'>Owner Details</h1>

                        <table className='min-w-full leading-normal mt-2'>
                            <thead className='font-semibold text-left text-sm bg-green-50 text-gray-600'>
                                <tr>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Owner Name</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Gender</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">DOB</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Guardian Name</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Relation</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Mobile No.</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Aadhar</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">PAN </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">email </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Is-Armed-Force </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Is-Specially-Abled? </th>

                                </tr>
                            </thead>
                            <tbody className="text-sm">

                                {props?.formReviewData?.ownerDetails?.map((owner, index) => (
                                    <>
                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.ownerName}</td>
                                            <td className="px-2 py-2 text-sm text-left">
                                            {owner?.gender == "1" && <>Male</>}
                                            {owner?.gender == "2" && <>Female</>}
                                            {owner?.gender == "3" && <>Transgender</>}
                                                </td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.dob}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.guardianName}</td>
                                            <td className="px-2 py-2 text-sm text-left">
                                                {owner?.relation == '1' && <>S/O</>}
                                                {owner?.relation == '2' && <>D/O</>}
                                                {owner?.relation == '3' && <>W/O</>}
                                                {owner?.relation == '4' && <>C/O</>}
                                                </td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.mobileNo}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.aadhar}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.pan}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.email}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.isArmedForce == '0' ? <>No</>: <>Yes</>}</td>
                                            <td className="px-2 py-2 text-sm text-left">{owner?.isSpeciallyAbled == '0' ? <>No</>: <>Yes</>}</td>

                                        </tr>
                                    </>
                                ))}


                            </tbody>
                        </table>
                    </div>}

                    <div className="w-full flex mb-10 mt-4">
                        <div className=' flex-1'>
                            <button onClick={() => props.backFun(6)} type="button" className="pl-4 pr-6 py-2 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><TbEdit className='inline text-lg' /> Edit</button>
                        </div>
                        <div className='md:px-4 text-center'>
                        </div>

                        <div className='md:px-10 text-right flex-1'>
                            <button onClick={() => props.submitFun()} type="button" className=" px-6 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Submit <MdOutlineUpload className='inline text-lg' /></button>
                        </div>

                    </div>

                </div>

                <div className="w-full h-20"></div>

            </div>

        </>
    )
}

export default SafFormReview