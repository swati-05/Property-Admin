import { useNavigate, useParams } from "react-router-dom"

function BottomTabs(props) {
    const navigate = useNavigate()
    const { id } = useParams()

    let applyReAssessment = `/safform/re/${id}`
    let applyMutation = `/safform/mu/${id}`
    let applyConcession = `/con-form/${id}`
    let applyHarvesting = `/waterHarvesting/${id}`
    let applyObjection = `/objection/${id}`
    let applyDeactivation = `/holding-deactivation/${id}`
    let viewSaf = `/propApplicationDetails/${props?.safId}`



    return (
        <>

            <div className="w-full flex justify-end">
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyReAssessment)}>Re-Assessment</button>

                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyMutation)}>Mutation</button>
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyConcession)}>Concession</button>
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyHarvesting)}>Harvesting</button>
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyObjection)}>Objection</button>
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(applyDeactivation)}>Deactivate</button>
                <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(viewSaf)}>View SAF</button>


            </div>
        </>
    )
}

export default BottomTabs