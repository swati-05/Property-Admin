import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Formik } from 'formik';
import axios from 'axios';
import view from '../assets/gifs/eye.gif'
import ViewUserByRole from './ViewUserByRole'
import { GrFormView } from 'react-icons/gr';
import ViewUserForAssignMent from './ViewUserForAssignMent';

export default function UserAssignmentModel(props) {
    const [open, setOpen] = useState(false);
    const urlString = "http://localhost:3333/";
    const dbApi = "ApiData";
    const [apiData, setapiData] = useState({ id: 1, api_url: "http://abc.com/apiurl" })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const showApiData = () => {
        axios.get("http://localhost:3333/users")
            .then(function (response) {
                console.log(response)
                setapiData(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        showApiData();
    }, [props.roleId])


    return (
        <div>
            <Button onClick={handleClickOpen} className='bg-cyan-500 px-2 py-2 rounded-xl hover:bg-cyan-600 text-white' xz>
                {props.roleId == '' ? '' : 'Assign Users To This Role'}
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" minHeight='80vh'>
                <DialogContent  >
                    <ViewUserForAssignMent apiData={apiData} />
                </DialogContent>
            </Dialog>

        </div>
    );
}
