//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 7 oct 2022
// Revision - 1
// Project - JUIDCO
// Component  - SafFormReview
// DESCRIPTION - SafFormReview Component
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
// import OtpScreen from '../../../../Components/OtpScreen'
import moment from 'moment'
import { TiDelete } from 'react-icons/ti'
import { nullToNA } from '@/Components/Common/PowerUps/PowerupFunctions'



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
    const [taxDescriptionState, setTaxDescriptionState] = useState(true)
    const [OtpModalIsOpen, setOtpModalIsOpen] = useState(false);


    const navigate = useNavigate()
    const toggleTaxDescription = () => {
        setTaxDescriptionState(!taxDescriptionState)
    }

    console.log('form review data at review ss...', props?.formReviewData)

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
            <div className={` block p-4 mt-4 w-full md:py-4 md:pb-0 md:pt-0 rounded-lg  md:w-full mx-auto  overflow-x-auto md:px-20`}>
                <h1 className='px-2 font-semibold mt-0 text-center text-gray-700 font-serif py-2 text-2xl mb-10'>Review your form details and submit.</h1>
                <div className='mt-4 mx-auto'>
                    <div>
                        <h1 className='px-1 font-semibold font-serif text-xs'><img src={folder} alt="pin" className='w-5 inline' /> Basic Details</h1>
                        <div className='bg-white rounded-lg shadow-lg py-6'>
                            <div className="block sm:flex sm:space-x-10 pl-4 ">
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.basicDetailsPreview?.wardNo)}</div>
                                    <div className='text-gray-500'>Ward No.</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{nullToNA(props?.basicDetailsPreview?.newWardNo)}</div>
                                    <div className='text-gray-500'>New Ward No</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{nullToNA(props?.basicDetailsPreview?.ownerShiptype)}</div>
                                    <div className='text-gray-500'>Ownership Type</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.basicDetailsPreview?.propertyType)} BUILDING</div>
                                    <div className='text-gray-500'>Property Type</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    {/* <div className='font-bold text-sm'>{props?.formReviewData?.basicDetails?.zone}</div>
                                <div className='text-gray-500'>Zone</div> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Property  details */}
                    <h1 className='px-1 font-semibold font-serif text-xs mt-10'><img src={home} alt="pin" className='w-5 inline' /> Property Address & Details</h1>
                    <div className='bg-white rounded-lg shadow-lg py-6'>
                        <div className="block sm:flex sm:space-x-10 pl-4 ">
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.khataNo)}</div>
                                <div className='text-gray-500'>Khata No.</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.plotNo)}</div>
                                <div className='text-gray-500'>Plot No</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.village_mauja)}</div>
                                <div className='text-gray-500'>Village/Mauja Name</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.plotArea)}</div>
                                <div className='text-gray-500'>Area of Plot(decimal)</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.roadWidth)}</div>
                                <div className='text-gray-500'>Road Width(ft)</div>
                            </div>
                        </div>

                        <div className="block sm:flex sm:space-x-10  pl-4 mt-4">
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.city)}</div>
                                <div className='text-gray-500'>City</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.district)}</div>
                                <div className='text-gray-500'>District</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.state)}</div>
                                <div className='text-gray-500'>State</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.pin)}</div>
                                <div className='text-gray-500'>Pin</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.locality)}</div>
                                <div className='text-gray-500'>Locality</div>
                            </div>
                        </div>

                        <div></div>
                        {/* coressponding address */}

                        <div className="col-span-4 grid grid-cols-5 justify-center items-center mt-4 mb-4">
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                            <div className='flex justify-center items-center'><label className="form-check-label text-gray-800"> <small className="block mt-1 text-xs text-gray-400 inline md:px-4 font-mono text-center">Corresponding Address</small></label></div>
                            <div className="col-span-2 flex justify-center items-center w-full h-[1px] bg-gray-400"></div>
                        </div>
                        {props?.propAddressDetails?.addressCheckbox != true ? <div className='pl-4 font-bold text-sm text-center'>Same as Property Address</div> :
                            <div className="block sm:flex sm:space-x-10  pl-4 mt-4">
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.c_city) }</div>
                                    <div className='text-gray-500'>City</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.c_district) }</div>
                                    <div className='text-gray-500'>District</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{nullToNA(props?.propAddressDetails?.c_state)}</div>
                                    <div className='text-gray-500'>State</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.c_pin) }</div>
                                    <div className='text-gray-500'>Pin</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.propAddressDetails?.c_locality) }</div>
                                    <div className='text-gray-500'>Locality</div>
                                </div>
                            </div>
                        }
                    </div>

                    {/* electricity details */}
                    <h1 className='px-1 font-semibold font-serif text-xs mt-6'> Electricity & Water Details</h1>
                    <div className='bg-white rounded-lg shadow-lg py-6'>
                        <div className="block sm:flex sm:space-x-10 pl-4 ">
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.elecWaterDetails?.electricityKNo)}</div>
                                <div className='text-gray-500'>Electricity K. No</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.elecWaterDetails?.accNo)}</div>
                                <div className='text-gray-500'>ACC No.</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.elecWaterDetails?.bindBookNo) }</div>
                                <div className='text-gray-500'>BIND/BOOK No.</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.elecWaterDetails?.electrictyConsumerNo) }</div>
                                <div className='text-gray-500'>Electricity Consumer Category</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>

                            </div>
                        </div>


                        <div className="block sm:flex sm:space-x-10  pl-4 mt-4">
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.elecWaterDetails?.bpApprovalNo) }</div>
                                <div className='text-gray-500'>Building Plan Approval No.</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.elecWaterDetails?.bpApprovalDate) }</div>
                                <div className='text-gray-500'>Building Plan Approval Date</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-semibold text-sm'>{nullToNA(props?.elecWaterDetails?.waterConsumerNo)}</div>
                                <div className='text-gray-500'>Water Consumer No.</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                <div className='font-bold text-sm'>{nullToNA(props?.elecWaterDetails?.waterConnectionDate)}</div>
                                <div className='text-gray-500'>Water Connection Date</div>
                            </div>
                            <div className='flex-1 mt-2 sm:mt-0 text-xs'>

                            </div>
                        </div>
                    </div>

                    {/* owner details */}
                    <div className='mt-8 overflow-x-auto'>
                        <h1 className='px-1 font-semibold font-serif text-xs'>Owner Details</h1>

                        <table className='min-w-full leading-normal mt-2'>
                            <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                <tr>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Owner Name</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Gender</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">DOB</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Guardian Name</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Relation</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Mobile No.</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Aadhar No.</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">PAN No. </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Email </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Armed Force ? </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Specially Abled ? </th>

                                </tr>
                            </thead>
                            <tbody className="text-sm">

                                {props?.ownerDetailsPreview?.map((owner, index) => (
                                    <>
                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.ownerName)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.gender)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.dob)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.guardianName)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.relation)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.mobileNo)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner.aadhar)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner.pan)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner.email)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.isArmedForce)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(owner?.isSpeciallyAbled)}</td>

                                        </tr>
                                    </>
                                ))}


                            </tbody>
                        </table>
                    </div>

                    {/* floor details */}
                    {props?.propertyTypeState != 4 && <div className='mt-8 overflow-x-auto'>
                        <h1 className='px-1 font-semibold font-serif text-xs'><img src={building} alt="building image" className='inline w-4' /> Floor Details</h1>

                        <table className='min-w-full leading-normal mt-2'>
                            <thead className='font-bold text-left text-sm bg-white text-gray-600'>
                                <tr>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Floor </th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Usage Type</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Occupancy Type</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Construction Type</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Built Up Area</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">From Date</th>
                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Upto Date</th>


                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {props?.floorDetailsPreview?.map((floor, index) => (
                                    <>
                                        <tr className="bg-white shadow-lg border-b border-gray-200">
                                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.floorNo)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.useType)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.occupancyType)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.constructionType)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.buildupArea)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.dateFrom)}</td>
                                            <td className="px-2 py-2 text-sm text-left">{nullToNA(floor?.dateUpto)}</td>

                                        </tr>
                                    </>
                                ))}


                            </tbody>
                        </table>
                    </div>}

                    <div className='mt-8'>
                        <h1 className='px-1 font-semibold font-serif text-xs'><img src={folder} alt="pin" className='w-5 inline' /> Additional Details</h1>
                        <div className='bg-white rounded-lg shadow-lg py-6'>
                            <div className="block sm:flex sm:space-x-10  pl-4 mt-4">
                                {props?.zoneValue && <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.zone)}</div>
                                    <div className='text-gray-500'>Zone</div>
                                </div>}
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{props?.additionalDetailsPreview?.mobileTowerStatus == '0' ? 'No' : 'Yes'}</div>
                                    <div className='text-gray-500'>Property has Mobile Tower(s) ?</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{props?.additionalDetailsPreview?.hoardingStatus == '0' ? 'No' : 'Yes'}</div>
                                    <div className='text-gray-500'>Property has Hoarding Board(s) ?</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-semibold text-sm'>{props?.additionalDetailsPreview?.petrolPumpStatus == '0' ? 'No' : 'Yes'}</div>
                                    <div className='text-gray-500'>Property a Petrol Pump ?</div>
                                </div>
                                <div className='flex-1 mt-2 sm:mt-0 text-xs'>
                                    <div className='font-bold text-sm'>{props?.additionalDetailsPreview?.waterHarvestingStatus == '0' ? 'No' : 'Yes'}</div>
                                    <div className='text-gray-500'>Rainwater harvesting provision ?</div>
                                </div>
                                {props?.zoneValue == false && <div className='flex-1 mt-2 sm:mt-0 text-xs'>

                                </div>}
                            </div>
                            <div className="flex space-x-10  pl-4 mt-4">
                                {props?.zoneValue && <div className='flex-1 text-xs'>

                                </div>}
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.mobileTowerStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.mobileTowerDate)}</div>
                                        <div className='text-gray-500'>Mobile Tower Area ?</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.hoardingStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.hoardingDate)}</div>
                                        <div className='text-gray-500'>Hoarding Board Area ?</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.petrolPumpStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.petrolPumpDate)}</div>
                                        <div className='text-gray-500'>Petrol Pump Area ?</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                </div>

                                {props?.zoneValue == false && <div className='flex-1 text-xs'>

                                </div>}
                            </div>
                            <div className="flex space-x-10  pl-4 mt-4">
                                {props?.zoneValue && <div className='flex-1 text-xs'>

                                </div>}
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.mobileTowerStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{(nullToNAprops?.additionalDetailsPreview?.mobileTowerDate)}</div>
                                        <div className='text-gray-500'>Mobile Tower Installation Date</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.hoardingStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.mobileTowerArea)}</div>
                                        <div className='text-gray-500'>Hoarding Board Installation Date</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                    {props?.additionalDetailsPreview?.petrolPumpStatus == '1' && <div className='flex-1 text-xs'>
                                        <div className='font-bold text-sm'>{nullToNA(props?.additionalDetailsPreview?.mobileTowerArea)}</div>
                                        <div className='text-gray-500'>Petrol Pump Construction Date</div>
                                    </div>}
                                </div>
                                <div className='flex-1 text-xs'>
                                </div>
                                {props?.zoneValue == false && <div className='flex-1 text-xs'>

                                </div>}

                            </div>
                        </div>
                    </div>



                    {/* toggle Tax description */}
                    {taxDescriptionState && <div className=''>
                        {/* tax 1 */}
                        {props?.rulesetData?.data?.details?.RuleSet1 && <div className='mt-8' >
                            <div className='px-1 flex  font-serif underline'><div className='bg-gray-800 w-7 h-7 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>1</div> Tax Description of Annual Rental Value - As Per Old Rule (Effect Upto <div className='font-semibold'>31-03-2016</div> )</div>
                            {/* Tax description */}
                            <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>

                                <div>
                                    <div>
                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Usage Type</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Rental Rate</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Built Up Area (in Sq. Ft)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>


                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                {props?.rulesetData?.data?.details?.RuleSet1?.floors?.map((data, index) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.mUsageType)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.rentalValue)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.buildupArea)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.quarterYear)}/{nullToNA(data?.qtr)}</td>

                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.arv)}</span></td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                    <div>
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Below taxes are calculated on quarterly basis( Property Tax / 4 ).</h1>

                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Holding Tax</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Water Tax</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Latrine/Conservancy Tax</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Education Cess</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Health Cess</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quarterly Tax</th>


                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                {props?.rulesetData?.data?.details?.RuleSet1?.totalQtrTaxes.map((data) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">1</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.effectingFrom)}/{nullToNA(data?.qtr)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.arv)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.holdingTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.waterTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.latrineTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.educationTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.healthTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.quaterlyTax)}</span></td>


                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    {/* tax description toggle button */}

                                    {/* Tax description */}
                                    <div className='mt-10 bg-amber-100 pb-6'>
                                        {/* formula text */}
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                                        <div className='flex font-mono text-xs bg-amber-100 py-2 px-1 text-gray-900'>
                                            <div className='flex-initial px-2 font-bold'>Annual Rental Value (ARV)</div>
                                            <div className='flex-initial px-2'>=</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Builtup Area(sqt)</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Rental Rate</div>
                                        </div>

                                        <div className='flex-initial px-3 text-xs'>(After calculating the A.R.V. the rebates are allowed in following manner : -Holding older than 25 years (as on 1967-68) - 10% Own occupation)</div>


                                        {/* Calculation Rates*/}

                                        <div className='flex font-mono text-xs bg-amber-100 px-1 mt-3'>
                                            <div onClick={() => openModal('rental_rate1')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Rental Rate</span></div>

                                        </div>

                                        {/* Usage Types percenatage*/}
                                        <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Usage Type tax %</h1>
                                        <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Residential - <span className='font-mono text-sm font-semibold'>30%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial - <span className='font-mono text-sm font-semibold'>15%</span></span></div>


                                        </div>
                                        {/* Other taxes percenatage*/}
                                        <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Other Taxes %</h1>
                                        <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Holding tax - <span className='font-mono text-sm font-semibold'>30%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Latrine tax - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Water tax  - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Health cess - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Education cess - <span className='font-mono text-sm font-semibold'>15%</span></span></div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}


                        {/* tax 2 */}

                        {props?.rulesetData?.data?.details?.RuleSet2 && <div className='mt-16' id="scr">
                            <h1 className='px-1 flex  font-serif  underline'><div className='bg-gray-800 w-7 h-7 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>2</div>Tax Description Annual Rental Value - As ARV Rule (Effect From 01-04-2016 to 31-03-2022)</h1>
                            {/* Tax description */}
                            <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>
                                <div>
                                    <div>
                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Usage Factor</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Occupancy Factor</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Rental Rate</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Carpet Area (in Sq. Ft)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>

                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">


                                                {props?.rulesetData?.data?.details?.RuleSet2?.floors?.map((data, index) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.multiFactor)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.occupancyFactor)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.rentalRate)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.carpetArea)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.quarterYear)}/{nullToNA(data?.qtr)}</td>
                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.arv)}</span></td>
                                                    </tr>
                                                ))
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Total Quarterly Tax Details ((ARV X 2%) / 4).</h1>

                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Holding Tax (Quarterly)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">RWH Penalty</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quarterly Tax (Total)</th>


                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                {props?.rulesetData?.data?.details?.RuleSet2?.totalQtrTaxes.map((data) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">1</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.effectingFrom)}/{nullToNA(data?.qtr)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.arv)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.holdingTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.rwhPenalty)}</td>
                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.quaterlyTax)}</span></td>
                                                    </tr>
                                                ))}




                                            </tbody>
                                        </table>
                                    </div>
                                    {/* tax description toggle button */}

                                    {/* Tax description */}
                                    <div className='mt-10 bg-amber-100 pb-6'>
                                        {/* formula text */}
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                                        <div className='flex font-mono text-xs bg-amber-100 py-3 px-1 text-gray-900'>
                                            <div className='flex-initial px-2 font-bold'>Annual Rental Value (ARV)</div>
                                            <div className='flex-initial px-2'>=</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Carpet Area</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Usage Factor</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Occupancy Factor</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Tax Percentage</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Rental Rate</div>

                                        </div>
                                        {/* Calculation Rates*/}

                                        <h1 className='px-4 font-semibold mt-4 text-gray-600 text-xs'>Rates</h1>
                                        <div className='block sm:flex font-mono text-xs bg-amber-100 px-1'>
                                            <div onClick={() => openModal('usageFactor_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Usage Factor </span></div>
                                            <div onClick={() => openModal('occupancyFactor_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Occupancy Factor</span></div>
                                            <div onClick={() => openModal('rental_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Rental Rate</span></div>
                                        </div>

                                        {/* Usage Types percenatage*/}
                                        <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Carpet Area</h1>
                                        <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Carpet area for residential - <span className='font-mono text-sm font-semibold'>70% of builtup area</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Carpet area for commercial - <span className='font-mono text-sm font-semibold'>80% of builtup area</span></span></div>


                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>}

                        {/* tax 3 */}
                        {props?.rulesetData?.data?.details?.RuleSet3 && <div className='mt-16'>
                            <h1 className='px-1 flex  font-serif underline'><div className='bg-gray-800 w-7 h-7 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>3</div>Tax Description of Capital Value - As Per Current Rule (Effect From 01-04-2022)</h1>
                            {/* Tax description */}
                            <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>

                                <div>
                                    <div>
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>For Building</h1>

                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Circle Rate</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Buildup Area (in Sq. Ft)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Occupancy Factor</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Tax Percentage</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Calculation Factor</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Matrix Factor</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Property Tax</th>

                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                {props?.rulesetData?.data?.details?.RuleSet3?.floors?.map((data, index) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.circleRate)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.buildupArea)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.occupancyFactor)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.taxPerc)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.calculationFactor)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.matrixFactor)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.quarterYear)}/{nullToNA(data?.qtr)}</td>
                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.arv)}</span></td>
                                                    </tr>
                                                ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Below taxes are calculated on quarterly basis( Property Tax / 4 ).</h1>

                                        <table className='min-w-full leading-normal mt-2'>
                                            <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                                                <tr>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">#</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Effect From</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">ARV</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Holding Tax (Quarterly)</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">RWH Penalty</th>
                                                    <th className="px-2 py-3 border-b border-gray-200  text-xs capitalize text-left">Quarterly Tax (Total)</th>


                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">

                                                {props?.rulesetData?.data?.details?.RuleSet3?.totalQtrTaxes.map((data) => (
                                                    <tr className="bg-white shadow-lg border-b border-gray-200">
                                                        <td className="px-2 py-2 text-sm text-left">1</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.effectingFrom)}/{nullToNA(data?.qtr)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.arv)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.holdingTax)}</td>
                                                        <td className="px-2 py-2 text-sm text-left">{nullToNA(data?.rwhPenalty)}</td>
                                                        <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{nullToNA(data?.quaterlyTax)}</span></td>


                                                    </tr>
                                                ))}



                                            </tbody>
                                        </table>
                                    </div>
                                    {/* tax description toggle button */}

                                    {/* Tax description */}
                                    <div className='mt-10 bg-amber-100 pb-6'>
                                        {/* formula text */}
                                        <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                                        <div className='flex font-mono text-xs bg-amber-100 py-3 px-1 text-gray-900'>
                                            <div className='flex-initial px-2 font-bold'>Property Tax</div>
                                            <div className='flex-initial px-2'>=</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Capital Value Rate</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Builtup Area(sqt)</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Occupancy Factor</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Tax Percentage</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Calculation Factor</div>
                                            <div className='flex-initial px-2'>x</div>
                                            <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Matrix Factor Rate</div>
                                        </div>
                                        {/* Calculation Rates*/}

                                        <h1 className='px-4 font-semibold mt-4 text-gray-600 text-xs'>Rates</h1>
                                        <div className='block sm:flex font-mono text-xs bg-amber-100 px-1'>
                                            <div onClick={() => openModal('circle_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Circle Rate</span></div>
                                            <div onClick={() => openModal('occupancyFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Occupancy Factor</span></div>
                                            <div onClick={() => openModal('matrixFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View  Matrix Factor Rate</span></div>

                                            <div onClick={() => openModal('calculationFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Calculation Factor</span></div>
                                        </div>

                                        {/* Usage Types percenatage*/}
                                        <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Usage Type tax %</h1>
                                        <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Residential - <span className='font-mono text-sm font-semibold'>0.075%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial - <span className='font-mono text-sm font-semibold'>0.150%</span></span></div>
                                            <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial & greater than 25000 sqft - <span className='font-mono text-sm font-semibold'>0.20%</span></span></div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>}
                    </div>
                    }

                    <div className="w-full flex mb-10 mt-4">
                        <div className=' flex-1'>
                            <button onClick={() => props.backFun(7)} type="button" className="cypress_safReviewBack pl-4 pr-6 py-2 bg-gray-200 text-gray-800 font-medium text-xs leading-tight capitalize rounded shadow-lg hover:bg-sky-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><TbEdit className='inline text-lg' /> Edit</button>
                        </div>
                        <div className='md:px-4 text-center'>
                            {/* <button onClick={toggleTaxDescription} type="button" className="cypress_review_tax_desciption_toggle w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight capitalize rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><MdViewInAr className='inline text-lg' />{!taxDescriptionState ? 'View tax description' : 'Hide tax description'}</button> */}
                        </div>

                        <div className='md:px-10 text-right flex-1'>
                            <button onClick={() => props.submitFun()} type="button" className="cypress_saf_submit px-6 py-2 bg-indigo-500 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit <MdOutlineUpload className='inline text-lg' /></button>
                        </div>

                    </div>

                </div>

                {/* <div className="w-full flex mb-10 mt-4">
                <div className='md:px-10 flex-1'>
                    <button onClick={() => props.backFun(6)} type="button" className="pl-4 pr-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight capitalize rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><TbEdit className='inline text-lg' /> Edit</button>
                </div>
                <div className='md:px-4 text-center'>
                    <button onClick={toggleTaxDescription} type="button" className="w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight capitalize rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"><MdViewInAr className='inline text-lg' />{!taxDescriptionState ? 'See tax description' : 'Hide tax description'}</button>
                </div>

                <div className='md:px-10 text-right flex-1'>
                    <button onClick={openModalOTP} type="button" className=" px-6 py-1 bg-white0 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Submit <MdOutlineUpload className='inline text-lg' /></button>
                </div>

            </div> */}

                <div className="w-full h-20"></div>

            </div>

            {/* rate modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="relative rounded-xl p-6 border-2 border-gray-200 bg-white">
                    <button type='button' onClick={closeModal}><TiDelete className='absolute top-5 right-5 text-red-500 text-3xl hover:scale-125' /></button>
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

            <div className='w-full mt-48'></div>

        </>
    )
}

export default SafFormReview