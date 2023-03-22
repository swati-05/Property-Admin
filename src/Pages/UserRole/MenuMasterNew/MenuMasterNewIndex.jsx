import axios from 'axios'
import WaterApiList from '../MenuMaster/WaterApiList';
import React, { useEffect, useState } from 'react'

const MenuMasterNewIndex = () => {
    const [listParentMenu, setListParentMenu] = useState()
    const [selectedMenu, setSelectedMenu] = useState()

    const { api_listParentSetial, header } = WaterApiList();

    useEffect(() => {
        axios.post(api_listParentSetial, {}, header)
            .then((res) => {
                setListParentMenu(res.data.data)
            })
            .catch((err) => console.log("Error while getting ", err))
    }, [])


    const handleParentMenuName = (e) => {
        console.log(e.target.value)
        setSelectedMenu(e.target.value)
    }


    return (
        <>
            <div>MenuMasterNewIndex</div>
            <div className='flex justify-center'>
                <select
                    name="parentMenuName"
                    onChange={handleParentMenuName}
                    className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                >
                    <option value="">Select</option>

                    {
                        listParentMenu?.map((item) => (
                            <option value={item.id}>{item.menu_string}</option>
                        ))
                    }

                </select>
            </div>
            <div className='m-5'>
                Seleced Menu is {selectedMenu}
                <div className='mx-10 mt-5'>
                    <p className='border-2 border-black w-32 rounded p-2'>Parent</p>
                    <p className='border-l-2 h-10 border-black ml-14'></p>

                    <div className='flex'>
                        <hr className="h-px w-14 bg-gray-900 border-2 " />
                        {/* <p className='border-b-2 w-10'></p> */}
                        <p className='border-2 border-blue-400 w-32 rounded'> child 1</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuMasterNewIndex