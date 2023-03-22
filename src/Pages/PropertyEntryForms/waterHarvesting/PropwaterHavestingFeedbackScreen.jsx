import React from 'react'
// import ThemeStyle from '../../../Components/ThemeStyle'

function PropwaterHavestingFeedbackScreen(props) {

    ///////////{***THEME STYLE***}//////////
    // const { bgCardColor, headingTxtTheme, paraTextTheme, btnTextColor, btnBgColor, headBgColor, titleHeadTxtTheme } = ThemeStyle()

    console.log("props.allFormData in feebback screen ", props?.allFormData)
    console.log("props.assTypeText in feebback screen ", props?.assTypeText)

   

    return (
        <div>
            <div className=''>
                {/* ///////////{*** Basic Detail ***}////////// */}
                <div>
                    <div className='mt-4'>
                        <h1 className='font-mono h-10 border-sky-500 border-2 rounded-lg text-sky-500 hover:bg-sky-50 py-1 px-4  m-2'>FEEDBACK For <strong className='text-slate-500 text-xs capitalize'> {props?.assTypeText}  ! </strong></h1>
                    </div>
                    FEEDBACK
                    {/* <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 bg-gray-50 shadow-md p-2  border-t-4 border-sky-300' >
                        <div className='col-span-4'>
                            <h1 className={`${titleHeadTxtTheme} font-bold`}>Water Harvesting</h1>
                        </div>
                        {
                            props?.allFormData?.waterHarvesting?.isWaterHarvestingBefore == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Does Completion of Water Harvesting is done before 31-03-2017?  -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.isWaterHarvestingBefore}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.waterHarvesting?.name == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Name -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}> {props?.allFormData?.waterHarvesting?.name}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.waterHarvesting?.guardianName == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'>  <h1 className={`${paraTextTheme} `}>Guardian Name -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.guardianName}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.waterHarvesting?.wardNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Ward No. -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.wardNo}</h1></div>
                                    </div>
                                </div>
                        }

                        {
                            props?.allFormData?.waterHarvesting?.mobileNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Mobile No. -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.mobileNo?.isWaterHarvestingBefore}</h1></div>
                                    </div>
                                </div>
                        }

                        {
                            props?.allFormData?.waterHarvesting?.holdingNo == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} `}>15 Digits Holding No./ SAF No.</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.holdingNo}</h1></div>
                                    </div>
                                </div>
                        }
                        {
                            props?.allFormData?.waterHarvesting?.buildingAddress == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} `}>Name of Building and Address  -</h1></div>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.buildingAddress}</h1></div>
                                    </div>
                                </div>
                        }

                        {
                            props?.allFormData?.waterHarvesting?.dateOfCompletion == null ? "" :
                                <div className='col-span-4 mt-1'>
                                    <div className='flex flex-row '>
                                        <div className='flex-1'><h1 className={`${paraTextTheme} `}>Date of Completion of Water Harvesting Structure -</h1></div>
                                        <div className='flex-1'> <h1 className={`${paraTextTheme} font-semibold mx-auto`}>{props?.allFormData?.waterHarvesting?.dateOfCompletion}</h1></div>
                                    </div>
                                </div>
                        }
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PropwaterHavestingFeedbackScreen