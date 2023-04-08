import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newAsss from '@/Components/Media/new.png'
import brief from '@/Components/Media/brief.png'
import verified from '@/Components/Media/verified.png'
import search from '@/Components/Media/search.png'
import drop from '@/Components/Media/drop.png'
import ip from '@/Components/Media/ip.png'
import objection from '@/Components/Media/objection.png'
import report from '@/Components/Media/report.png'
import useSetTitle from '@/Components/GlobalData/useSetTitle'

function VerificationOptions(props) {
    const navigate = useNavigate()
    useSetTitle('Verification')
    const [infoCardCount, setinfoCardCount] = useState(0)

    const activateInfoCard = (e, count) => {
        e.stopPropagation()
        setinfoCardCount(count)
    }

    const closeInfoModal = () => {
        setinfoCardCount(0)
    }

   
const replaceRoute = (route)=>{
    window.location.replace(route)
}


    return (
        <div className='w-full  mx-auto'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
              
                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                        </div>
                    </div>
                    <div className="my-2 relative">
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                             {/* 4 BIFURCATION */}
                             <div onClick={() => replaceRoute('/mobile/search/property')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-12 w-12"
                                    src={verified}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">SAF Verification</div>

                            </div>

                            {/* 1 NEW ASSESSMENT */}
                            <div onClick={() => replaceRoute('/mobile/search/gbSaf')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-16 w-16"
                                    src={brief}
                                    alt="Mobiles" />
                                <div className="font-bold mt-4 text-center">GBSAF Verification</div>
                            </div>
                           
                            
                            {/* 5 AMALGAMATION */}
                            <div onClick={() => replaceRoute('/mobile/search/harvesting')}
                                className="bg-gray-100  rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"
                                href="">
                                <img
                                    className="h-12 w-12"
                                    src={drop}
                                    alt="Electronics" />
                                <div className="font-bold mt-4 text-center">Harvesting Verification</div>
                            </div>
                            {/* 4 BIFURCATION */}
                          
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerificationOptions