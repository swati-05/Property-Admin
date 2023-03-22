import React from 'react'
import ThemeStyle from './ThemeStyle'
import FormCheckStatus from './FormCheckStatus'

function PropFeedbackScreen(props) {
    // let props?.allFormData = props.props?.allFormData
    let assTypeText = props.assTypeText

    console.log("preview data in feedback screen", props?.basicDetailsPreview)

    ///////////{***THEME STYLE***}//////////
    const { bgCardColor, headingTxtTheme, paraTextTheme, btnTextColor, btnBgColor, headBgColor, titleHeadTxtTheme } = ThemeStyle()
    return (
        <>
            <div className='bg-white px-4 shadow-xl'>
                {/* ///////////{*** Basic Detail ***}////////// */}
                <div>
                    <div className='mt-4'>
                        <h1 className='h-10 rounded-lg py-1 text-slate-500 text-md capitalize'><strong>Form Preview </strong></h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t-4 border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 2 && true} active={props?.formIndex >= 2 && true} /> Basic Details</h1>
                        </div>
                        {
                            props?.basicDetailsPreview?.ulbId == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>ULB -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.basicDetailsPreview?.ulbId}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.basicDetailsPreview?.wardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Ward No -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.basicDetailsPreview?.wardNo}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.basicDetailsPreview?.newWardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>New Ward No -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.basicDetailsPreview?.newWardNo}</h1></div>


                                    </div>
                                </div>
                        }
                        {props?.basicDetailsPreview?.ownerShiptype == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} `}>Ownership Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.basicDetailsPreview?.ownerShiptype}</h1></div>


                                </div>
                            </div>
                        }
                        {props?.basicDetailsPreview?.propertyType == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property Type -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.basicDetailsPreview?.propertyType}</h1></div>


                                </div>
                            </div>
                        }


                    </div>
                </div>


                {/* ///////////{*** Property Address & Details ***}////////// */}
                <div className='mt-4'>

                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t bordz`er-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 3 && true} active={props?.formIndex >= 3 && true} />Property Address & Details</h1>
                        </div>
                        {
                            props?.propAddressDetails?.khataNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Khata No. -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.khataNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            props?.propAddressDetails?.plotNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Plot No-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.propAddressDetails?.plotNo}</h1>
                                    </div>
                                </div>
                        }
                        {props?.propAddressDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {props?.propAddressDetails?.plotArea == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Area of Plot(decimal) -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.plotArea}</h1>
                                </div>
                            </div>
                        }

                        {props?.propAddressDetails?.roadWidth == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Road Width(ft) -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.roadWidth}</h1>
                                </div>
                            </div>
                        }
                        <div className='col-span-4'><hr /></div>

                        {props?.propAddressDetails?.city == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>City -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.city}</h1>
                                </div>

                            </div>
                        }
                        {props?.propAddressDetails?.district == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>District -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.district}</h1>
                                </div>

                            </div>
                        }

                        {props?.propAddressDetails?.state == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>State -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.state}</h1>
                                </div>
                            </div>
                        }
                        {props?.propAddressDetails?.pin == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Pin -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.pin}</h1>
                                </div>
                            </div>
                        }
                        {props?.propAddressDetails?.locality == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Address -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.locality}</h1>
                                </div>
                            </div>
                        }
                    </div>

                    {/* In Case of coressponding address */}
                    {
                        props?.propAddressDetails?.addressCheckbox != true ? <div className='  p-2  border-t border-gray-100' >
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Corresponding Address & Details</h1>
                            <h1 className={`${paraTextTheme} font-semibold`}>Same as Property Address</h1>
                        </div> : <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-100' >
                            <div className='col-span-4'>
                                <h1 className={`${titleHeadTxtTheme} font-bold`}>Corresponding Address & Details</h1>
                            </div>

                            {props?.propAddressDetails?.city == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>City -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.c_city}</h1>
                                    </div>

                                </div>
                            }
                            {props?.propAddressDetails?.district == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>District -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.c_district}</h1>
                                    </div>

                                </div>
                            }

                            {props?.propAddressDetails?.state == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>State -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.c_state}</h1>
                                    </div>
                                </div>
                            }
                            {props?.propAddressDetails?.pin == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Pin -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.c_pin}</h1>
                                    </div>
                                </div>
                            }
                            {props?.propAddressDetails?.locality == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Address -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.propAddressDetails?.c_locality}</h1>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>

                {/* ///////////{*** Electricity & Water Details ***}////////// */}
                <div className='mt-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 4 && true} active={props?.formIndex >= 4 && true} />Electricity & Water Details</h1>
                        </div>
                        {
                            props?.elecWaterDetails?.electricityKNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>Electricity K. No -</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.electricityKNo}</h1>
                                    </div>
                                </div>
                        }
                        {
                            props?.elecWaterDetails?.accNo == null ? "N/A" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <h1 className={`${paraTextTheme} `}>ACC No.-</h1>
                                        <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.elecWaterDetails?.accNo}</h1>
                                    </div>
                                </div>
                        }
                        {props?.elecWaterDetails?.village_mauja == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Village/Mauja Name -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.village_mauja}</h1>
                                </div>
                            </div>
                        }
                        {props?.elecWaterDetails?.bindBookNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>BIND/BOOK No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.bindBookNo}</h1>
                                </div>
                            </div>
                        }

                        {props?.elecWaterDetails?.electrictyConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Electricity Consumer Category -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.electrictyConsumerNo}</h1>
                                </div>
                            </div>
                        }

                        {props?.elecWaterDetails?.bpApprovalNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.bpApprovalNo}</h1>
                                </div>

                            </div>
                        }
                        {props?.elecWaterDetails?.bpApprovalDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Building Plan Approval Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.bpApprovalDate}</h1>
                                </div>

                            </div>
                        }

                        {props?.elecWaterDetails?.waterConsumerNo == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Consumer No. -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.waterConsumerNo}</h1>
                                </div>
                            </div>
                        }
                        {props?.elecWaterDetails?.waterConnectionDate == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <h1 className={`${paraTextTheme} `}>Water Connection Date -</h1>
                                    <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.elecWaterDetails?.waterConnectionDate}</h1>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {/* ///////////{*** Owner Details ***}////////// */}
                {/* {props?.allFormData?.ownerDetails == null ? "" : */}
                <div className='p-2 '>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400'>
                        <div className='col-span-4 '>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 5 && true} active={props?.formIndex >= 5 && true} />Owners Detail</h1>
                        </div>

                    </div>
                    {
                        props?.ownerDetailsPreview?.map((items) => (

                            <div className=''>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Owner's Name</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.ownerName}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Gender</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.gender}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >DOB</label>

                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.dob}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Guardian Name</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.guardianName}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Relation</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.relation}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Mobile No.</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.mobileNo}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Aadhar No.</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.aadhar}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >PAN No.</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.pan}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex '>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-medium text-gray-500 capitalize`} >Email</label>
                                        </div>
                                        <div className='flex-1'>
                                            <label className={`text-xs ml-2 font-bold text-gray-500`} >{items.email}</label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
                </div>
                {/* } */}

                {/* ///////////{*** Owner Details ***}////////// */}
                {/* {props?.allFormData?.floorDetails == null ? "" : */}
                {props?.propertyTypeState != 4 && <div className='p-2 '>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t border-gray-400'>
                        <div className='col-span-4'>
                            <div className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 6 && true} active={props?.formIndex >= 6 && true} />Floors Detail</div>
                        </div>

                    </div>
                    {
                        props?.floorDetailsPreview?.map((items) => (

                            <>
                                <div className=''>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Floor</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.floorNo}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Usage Type</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.useType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Occupancy Type</label>

                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.occupancyType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Construction Type</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.constructionType}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Built Up Area</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.buildupArea}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >From Date</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.dateFrom}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='flex '>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >Upto Date</label>
                                            </div>
                                            <div className='flex-1'>
                                                <label className={`text-xs ml-2 font-medium text-gray-500`} >{items.dateUpto}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>

                        ))
                    }
                </div>}

                <div>

                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  p-2  border-t-4 border-gray-400' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}><FormCheckStatus verificationStatus={props?.formIndex >= 7 && true} active={props?.formIndex >= 7 && true} /> Additional Details</h1>
                        </div>
                        {props?.additionalDetailsPreview?.zone == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Zone -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.zone}</h1></div>


                                </div>
                            </div>
                        }
                        {props?.additionalDetailsPreview?.mobileTowerStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Mobile Tower(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.mobileTowerStatus}</h1></div>


                                </div>
                                {props?.additionalDetailsPreview?.mobileTowerStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Total Area Covered -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.mobileTowerArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row bg-gray-200 p-1'>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} `}>Installation Date -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.mobileTowerDate}</h1></div>


                                        </div>
                                    </>
                                }
                            </div>
                        }
                        {props?.additionalDetailsPreview?.hoardingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Property has Hoarding Board(s) ? -</h1></div>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.hoardingStatus}</h1></div>


                                </div>
                                {props?.additionalDetailsPreview?.hoardingStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Total Area -</h1></div>
                                            <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.hoardingArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>   <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Installation Date ? -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.hoardingDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }

                        {props?.additionalDetailsPreview?.petrolPumpStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'><h1 className={`${paraTextTheme} `}>Is property a Petrol Pump ? -</h1></div>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.petrolPumpStatus}</h1></div>


                                </div>
                                {props?.additionalDetailsPreview?.petrolPumpStatus != "yes" ? "" :
                                    <>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} bg-gray-200 p-1 `}>Total Area -</h1></div>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.petrolPumpArea}</h1></div>


                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex-1'>  <h1 className={`${paraTextTheme} bg-gray-200 p-1`}>Completion Date -</h1></div>
                                            <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.petrolPumpDate}</h1></div>


                                        </div>
                                    </>

                                }
                            </div>
                        }
                        {props?.additionalDetailsPreview?.waterHarvestingStatus == null ? "" :
                            <div className='col-span-4 mt-1'>
                                <div className='flex flex-row '>
                                    <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Rainwater harvesting provision ? -</h1></div>
                                    <div className='flex-1'>  <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.additionalDetailsPreview?.waterHarvestingStatus}</h1></div>


                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* } */}
                <div className='w-full h-10'></div>
            </div>
            <div className='w-full h-40'></div>
        </>
    )
}

export default PropFeedbackScreen