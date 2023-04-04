import { useNavigate, useParams } from "react-router-dom"

function BottomTabsCondition(props) {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <>

            <div className="flex gap-y-4 flex-wrap justify-center flex-row md:py-2 w-full items-center sm:justify-end">
                {props?.permissionData?.map((data) => (
                    <button className={`mr-4 bg-white border border-indigo-500 text-indigo-500 px-4 py-1 shadow-lg hover:scale-105 rounded-sm text-sm md:text-base hover:bg-indigo-500 hover:text-white`} onClick={() => {
                        if (data?.action_name == 'View Saf') {
                            navigate(`${data?.endpoint}/${props?.safId}`)
                        } else {
                            navigate(`${data?.endpoint}/${id}`)
                        }
                    }}>{data?.lebel}</button>
                ))}
            </div>
        </>
    )
}

export default BottomTabsCondition