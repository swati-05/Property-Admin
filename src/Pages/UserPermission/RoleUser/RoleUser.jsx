import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RoleUserAssignModel from './RoleUserAssignModel';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import UserAssignmentModel from './UserAssignmentModel';

// import CircleIcon from '@mui/icons-material/Circle';

const urlString = "http://localhost:3333/";
const dbroleUser = "roleUser";

function RoleUser() {
    const [roleId, setroleId] = useState('')
    const [Users, setUsers] = useState({ user: [{ name: "...", id: 1 }] })
    const [loading, setLoading] = useState("");



    console.log(Users);
    useEffect(() => {
        if (roleId) {
            setLoading("");
            axios.get(urlString + dbroleUser + "/" + roleId)
                .then(function (response) {
                    console.log(response)
                    setTimeout(() => {
                        setLoading("hidden");
                        setUsers(response.data);
                    }, 1000);
                })
                .then(function (error) {
                    console.log(error);
                })
        }
    }, [roleId])

    const handleChange = (e) => {
        setroleId(e.target.value);

    }
    return (
        <div className='p-4 '>

            <div class={loading + " spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full float-right justify-right"} role="status">
                <span class="visually-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>

                </span>
            </div>

            <div className='flex justify-between'>
                <select name="roles" id="roles" className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(handleChange)}>
                    <option value=""> SELECT A ROLE </option>
                    <option value="1"> DEALING ASSISTANT </option>
                    <option value="2"> EXECUTIVE OFFICER </option>
                </select>
                <span>
                    <UserAssignmentModel roleId={roleId} />
                </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 p-8 '>
                {Users.user?.map((items) => (
                    <>
                        <div class=" m-2 pr-2  max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                {/* <img class="" src="https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg" alt="" /> */}
                                <RadioButtonCheckedIcon className={items.status == 1 ? 'text-green-600 ml-2 ' : 'text-slate-600 ml-2 '} sx={{ fontSize: 15 }} />
                            </a>
                            <div class="p-5 ">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{items.fname}</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Some Description about {items.fname}.</p>
                                <a href="#" class="inline-flex items-center py-1 px-3 text-sm font-medium text-center text-white bg-slate-200 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800" >
                                    <RoleUserAssignModel id={items.id} />
                                    {/* <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                                </a>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default RoleUser