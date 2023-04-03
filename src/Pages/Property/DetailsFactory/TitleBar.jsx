import { useLocation, useNavigate, useParams } from "react-router-dom"
import { BiLeftArrowAlt } from 'react-icons/bi'
import { BsColumnsGap } from 'react-icons/bs'
import { useState } from 'react'

function TitleBar(props) {
    const [backEnabled, setbackEnabled] = useState(true)
    const routeLocation = useLocation()


    if (routeLocation.pathname == '/' || routeLocation?.pathname == '/login') {
        return
    }


    return (
        <>
            <div className="flex sm:flex-row flex-col py-2 justify-center items-center">
                <div className="flex-1 flex pl-2 text-gray-700">

                    <span className="cursor-pointer hover:text-indigo-500" onClick={() => window.history.back()}><BiLeftArrowAlt className="inline" />Back</span>
                </div>
                <div className="flex justify-right items-center text-gray-800 text-xl font-semibold">
                    <BsColumnsGap className="inline mr-2" />{props?.titleText}
                </div>
            </div>
            <hr />
        </>
    )
}

export default TitleBar