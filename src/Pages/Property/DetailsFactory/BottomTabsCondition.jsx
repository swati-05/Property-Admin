import { useNavigate, useParams } from "react-router-dom"

function BottomTabsCondition(props) {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <>

            <div className="w-full flex justify-end">
                {props?.permissionData?.map((data) => (
                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm hover:bg-indigo-500 hover:text-white`} onClick={() => navigate(`${data?.endpoint}/${id}`)}>{data?.lebel}</button>
                ))}
            </div>
        </>
    )
}

export default BottomTabsCondition