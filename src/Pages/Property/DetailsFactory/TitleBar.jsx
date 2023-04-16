import { useLocation, useNavigate, useParams } from "react-router-dom"
import { BiLeftArrowAlt } from 'react-icons/bi'
import { BsColumnsGap } from 'react-icons/bs'
import { useState } from 'react'
import useSetTitle from "@/Components/GlobalData/useSetTitle"

function TitleBar(props) {
    const [backEnabled, setbackEnabled] = useState(true)
    const routeLocation = useLocation()
    useSetTitle('Verification')

    const backFunction = () => {
        const currentURL = window.location.href;
        const referrerURL = document.referrer;
        if (currentURL !== referrerURL) {
          window.history.replaceState(null, null, ''); // Remove current URL from history
          window.history.back(); // Navigate back in history
        } else {
          // Do nothing if current URL is the same as referrer URL
          console.log('Already at the previous page.');
        }
      };

    

    if (routeLocation.pathname == '/' || routeLocation?.pathname == '/login' && routeLocation?.pathname == '/mobile-modules') {
        return
    }

    if (props?.titleBarVisibility === false) {
        return
    }

    return (
        <>
            <div className="flex flex-row  py-2 justify-center items-center pr-2 sm:pr-0">
                <div className="flex-1 flex pl-2 text-gray-700">

                    <span className="cursor-pointer hover:text-indigo-500" onClick={backFunction}><BiLeftArrowAlt className="inline" />Back</span>
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