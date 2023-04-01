import { useNavigate, useParams } from "react-router-dom"
import { BiRightArrowAlt } from 'react-icons/bi'
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions"
import {BsCurrencyRupee} from 'react-icons/bs'

function TopTabs(props) {
    const navigate = useNavigate()
    const { id, location, tabIndex } = useParams()

    console.log('id direct at topnav...', id)
    // conditons :
    // # for saf application
    // 1 property details
    // 2 demand details
    // 3 upload documents

    // # for holding
    // 1 property details
    // 2 payment history
    // 3 demand details
    let properyDetailsRoute = ''
    let demandDetailsRoute = ''
    let paymentHistoryRoute = ''
    let uplodDocRoute = ''

    if (props?.type == 'application') {
        properyDetailsRoute = `/propApplicationDetails/${id}`
        demandDetailsRoute = `/viewDemand/${id}`
        uplodDocRoute = `/safdocumentupload/${id}`
    } else {
        properyDetailsRoute = `/holdingPropertyDetails/${id}`
        demandDetailsRoute = `/viewDemandHoldingProperty/${id}`
        paymentHistoryRoute = `/holding-transactions/${id}`
    }

    return (
        <>
            <div className="flex flex-col-reverse gap-y-4 md:flex-row md:py-2 justify-center items-center">
                <div className="flex-1 flex font-bold text-2xl text-gray-700">
                    {props?.title}
                    {props?.payButton && <button onClick={() => navigate(`/property-payment/${id}/${props?.type == 'holding' ? 'holding' : 'saf'}`)} type="button" className="ml-4 font-bold px-6 py-1 bg-indigo-500 text-white  text-sm leading-tight uppercase rounded  hover:bg-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl border border-white">Pay <BsCurrencyRupee className="inline mr-0 ml-2" />{nullToNA(props?.payableAmount)} <span><BiRightArrowAlt className="inline font-bold text-xl" /></span> </button>}
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-y-2 md:justify-right items-center">
                    {<button className={`mr-4 ${props?.active == 'property' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm text-sm md:text-base`} onClick={() => navigate(properyDetailsRoute)}>Property-Details</button>}

                    <button className={`mr-4 ${props?.active == 'demand' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm text-sm md:text-base`} onClick={() => navigate(demandDetailsRoute)}>Demand-Details</button>

                    {props?.type == 'holding' && <button className={`mr-4 ${props?.active == 'payment' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm text-sm md:text-base`} onClick={() => navigate(paymentHistoryRoute)}>Payment-History</button>}

                    {/* {props?.type == 'application' && <button className={`${props?.active == 'document' ? 'bg-indigo-500  text-white' : 'bg-white border border-indigo-500 text-indigo-500'} px-4 py-1 shadow-lg hover:scale-105 rounded-sm text-sm md:text-base`} onClick={() => navigate(uplodDocRoute)}>Upload-Documents</button>
                    } */}
                </div>
            </div>
        </>
    )
}

export default TopTabs