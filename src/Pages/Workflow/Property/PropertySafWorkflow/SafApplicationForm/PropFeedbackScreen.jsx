//////////////////{*****}//////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19th Dec., 2022
// >Revision - 1
// >Project - JUIDCO
///////////////////////////////////////////////////////////////////////////

import React from 'react'
import ThemeStyle from './ThemeStyle'

function PropFeedbackScreen(props) {
    let allFormData = props.allFormData
    let assTypeText = props.assTypeText

    console.log("props.allform data", props.allFormData)

    ///////////{***THEME STYLE***}//////////
    const { bgCardColor, headingTxtTheme, paraTextTheme, btnTextColor, btnBgColor, headBgColor, titleHeadTxtTheme } = ThemeStyle()
    return (
        <>
            <div className=''>
                {/* ///////////{*** Basic Detail ***}////////// */}
                <div>
                    <div className='mt-4'>
                        <h1 className='font-mono h-10 border-sky-500 border-2 rounded-lg text-sky-500 hover:bg-sky-50 py-1 px-2  m-2'>FEEDBACK For <strong className='text-slate-500 text-sm capitalize'> {assTypeText}  ! </strong></h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 bg-sky-50 shadow-md p-2  border-t-4 border-sky-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Basic Details</h1>
                        </div>
                        {
                            allFormData?.basicDetails?.wardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Ward No -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.wardNo}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            allFormData?.basicDetails?.newWardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>New Ward No -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {allFormData?.basicDetails?.newWardNo}</h1></div>
                                        
                                       
                                    </div>
                                </div>
                        }
                        {allFormData?.basicDetails?.ownerShiptype == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} `}>Ownership Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.ownerShiptype}</h1></div>
                                  
                                    
                                </div>
                            </div>
                        }
                        {allFormData?.basicDetails?.propertyType == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.propertyType}</h1></div>
                                   
                                    
                                </div>
                            </div>
                        }

                        {allFormData?.basicDetails?.zone == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Zone -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.zone}</h1></div>


                                </div>
                            </div>
                        }

                        {allFormData?.basicDetails?.mobileTowerStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Mobile Tower(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.mobileTowerStatus == '0' ? <>No</>: <>Yes</>}</h1></div>


                                </div>
                                {allFormData?.basicDetails?.mobileTowerStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Total Area Covered -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.mobileTowerArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Installation Date -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.mobileTowerDate}</h1></div>


                                        </div>
                                    </>
                                }
                            </div>
                        }
                        {allFormData?.basicDetails?.hoardingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Hoarding Board(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.hoardingStatus == '0' ? <>No</>: <>Yes</>}</h1></div>


                                </div>
                                {allFormData?.basicDetails?.hoardingStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Total Area -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.hoardingArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>   <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Installation Date ? -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.hoardingDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }

                        {allFormData?.basicDetails?.petrolPumpStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Is property a Petrol Pump ? -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.petrolPumpStatus == '0' ? <>No</>: <>Yes</>}</h1></div>


                                </div>
                                {allFormData?.basicDetails?.petrolPumpStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} bg-gray-200 p-1 `}>Total Area -</h1></div>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.petrolPumpArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Completion Date -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.petrolPumpDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }
                        {allFormData?.basicDetails?.waterHarvestingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Rainwater harvesting provision ? -</h1></div>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.basicDetails?.waterHarvestingStatus == '0' ? <>No</>: <>Yes</>}</h1></div>


                                </div>
                            </div>
                        }
                    </div>
                </div>


                {/* ///////////{*** Property Address & Details ***}////////// */}
                <div className='mt-4'>

                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 bg-sky-50 shadow-md p-2  border-t-2 border-sky-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Property Address & Details</h1>
                        </div>
                        {
                            allFormData?.propertyAddressDetails?.khataNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Khata No. -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.khataNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            allFormData?.propertyAddressDetails?.plotNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Plot No-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {allFormData?.propertyAddressDetails?.plotNo}</h1>
                                    </div>
                                </div>
                        }
                        {allFormData?.propertyAddressDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {allFormData?.propertyAddressDetails?.plotArea == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Area of Plot -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.plotArea}</h1>
                                </div>
                            </div>
                        }

                        {allFormData?.propertyAddressDetails?.roadWidth == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Road Width -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.roadWidth}</h1>
                                </div>
                            </div>
                        }

                        {allFormData?.propertyAddressDetails?.city == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>City -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.city}</h1>
                                </div>

                            </div>
                        }
                        {allFormData?.propertyAddressDetails?.district == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>District -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.district}</h1>
                                </div>

                            </div>
                        }

                        {allFormData?.propertyAddressDetails?.state == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>State -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.state}</h1>
                                </div>
                            </div>
                        }
                        {allFormData?.propertyAddressDetails?.pin == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Pin -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.pin}</h1>
                                </div>
                            </div>
                        }
                        {allFormData?.propertyAddressDetails?.locality == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Locality -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.propertyAddressDetails?.locality}</h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* ///////////{*** Electricity & Water Details ***}////////// */}
                <div className='mt-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 bg-sky-50 shadow-md p-2  border-t-2 border-sky-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Electricity & Water Details</h1>
                        </div>
                        {
                            allFormData?.electricityWaterDetails?.electricityKNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Electricity K. No -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.electricityKNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            allFormData?.electricityWaterDetails?.accNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>ACC No.-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {allFormData?.electricityWaterDetails?.accNo}</h1>
                                    </div>
                                </div>
                        }
                        {allFormData?.electricityWaterDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {allFormData?.electricityWaterDetails?.bindBookNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>BIND/BOOK No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.bindBookNo}</h1>
                                </div>
                            </div>
                        }

                        {allFormData?.electricityWaterDetails?.electrictyConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Electricity Consumer Category -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.electrictyConsumerNo}</h1>
                                </div>
                            </div>
                        }

                        {allFormData?.electricityWaterDetails?.bpApprovalNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.bpApprovalNo}</h1>
                                </div>

                            </div>
                        }
                        {allFormData?.electricityWaterDetails?.bpApprovalDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.bpApprovalDate}</h1>
                                </div>

                            </div>
                        }

                        {allFormData?.electricityWaterDetails?.waterConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Consumer No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.waterConsumerNo}</h1>
                                </div>
                            </div>
                        }
                        {allFormData?.electricityWaterDetails?.waterConnectionDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Connection Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{allFormData?.electricityWaterDetails?.waterConnectionDate}</h1>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {/* ///////////{*** Owner Details ***}////////// */}
             
                   {(props?.allFormData?.ownerDetails == '' || props?.allFormData?.ownerDetails == null) ? <></> : <div className='p-2 '>
                        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 bg-sky-50 shadow-md p-2  border-t-2 border-sky-400'>
                            <div className='col-span-4 '>
                                <h1 className={`${titleHeadTxtTheme} font-bold`}>Owners Detail</h1>
                            </div>

                        </div>
                        {
                            allFormData?.ownerDetails?.map((items) => (

                                <div className='bg-sky-50'>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >OWNER NAME</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.ownerName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >GENDER</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >
                                                {items?.gender == "1" && <>Male</>}
                                                {items?.gender == "2" && <>Female</>}
                                                {items?.gender == "3" && <>Transgender</>}
                                                    </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >DOB</label>

                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.dob}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >GUARDIAN NAME</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.guardianName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >RELATION</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >
                                                {items?.relation == '1' && <>S/O</>}
                                                {items?.relation == '2' && <>D/O</>}
                                                {items?.relation == '3' && <>W/O</>}
                                                {items?.relation == '4' && <>C/O</>}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >MOBILE NO.</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.mobileNo}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >AADHAR</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.aadhar}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >PAN</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.pan}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >EMAIL</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.email}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>}
             
            </div>
        </>
    )
}

export default PropFeedbackScreen