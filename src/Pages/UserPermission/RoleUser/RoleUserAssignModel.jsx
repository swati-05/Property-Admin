import React, {useEffect, useState} from 'react';
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

export default function RoleUserAssignModel(props) {
    const [open, setOpen] = useState(false);
    const urlString = "http://localhost:3333/";
    const dbApi = "ApiData";
    const [apiData, setapiData] = useState({id:1,api_url:"http://abc.com/apiurl"})




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const showApiData = () =>{
        // alert(values);
        axios.get("http://localhost:3333/users/"+props.id)
            .then(function (response) {
                console.log(response)
                // alert(response)
                setapiData(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
      showApiData();
    }, [props.id])
    

    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ color: '#fff', width: 'auto', height: 20 }} xz>
            {/* <img src={view} alt="view gif" /> */}
            
            <GrFormView className='inline text-2xl' />
             
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" minHeight='80vh'>


                {/* <DialogTitle sx={{ paddingLeft: 10, paddingRight: 10 }}>ADD NEW ROLE </DialogTitle> */}
                <DialogContent  >
                   
                    <ViewUserByRole apiData = {apiData}/>
                </DialogContent>
                {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions> */}

            </Dialog>

        </div >
    );
}
