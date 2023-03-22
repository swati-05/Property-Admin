import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
// import trade from '../assets/api/trade.png';
// import property from '../assets/api/property.png'
// import water from '../assets/api/water.png'

function ViewUserForAssignMent(props) {
    console.log(props.apiData);
    let copied = <span className='text-blue-400 px-8'><DoneIcon />copied </span>;
    let copy = <span className='text-slate-600 text-sm mx-4 px-4 py-2 shadow-sm shadow-black bg-white-400 rounded-xl'>Copy url</span>
    const [CopyText, setCopyText] = useState(copy);
    const [Change, setChange] = useState([])

    const handleCopy = () => {
        navigator.clipboard.writeText(props.apiData.api_url)
        setCopyText(copied)
    }

    const handleAssign = () => {
        alert("handle Assign !");
        alert(Change)
    }
    return (
        <>

            <div class="container mx-auto p-5">
                <div class="md:flex no-wrap md:-mx-2">
                    <div class="w-full md:w-full md:mx-2">
                        <div class=" ">
                            <div class="image overflow-hidden">
                                <h1 className='text-yellow-500 font-bold text-4xl text-center'>USER LIST</h1>
                                <hr className='mt-2 pb-4' />
                            </div>

                            <form onSubmit={handleAssign}>
                                <div className='grid grid-cols-3'>
                                    {props.apiData?.map((items) => (
                                        <span class="px-3 py-3 bg-white">
                                            <input className="h-4 w-4 rounded-sm mt-1 align-top bg-center bg-contain float-left mr-2 " type="checkbox" value={items.id} onChange={(event) => setChange(event.target.value)} id="flexCheckChecked" />

                                            {items.fname}
                                        </span>
                                    ))}


                                </div>
                                <button type="submit" className='bg-blue-500 px-4 py-2 mt-2 rounded-xl text-white float-left'>Assign</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewUserForAssignMent