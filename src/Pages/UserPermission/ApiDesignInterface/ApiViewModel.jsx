import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import MyProfileContent from './MyProfileContent';
import { TRADE } from './TradeApiListFile';

export default function ApiViewModal(props) {
    const [open, setOpen] = useState(false);
    // const urlString = "http://localhost:3333/";
    // const dbApi = "ApiData";
    const [apiData, setapiData] = useState({ id: 1, api_url: "http://abc.com/apiurl" })




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const showApiData = () => {
        // alert(values);
        axios.get(TRADE.GET_API_BY_ID + props.id)
            .then(function (response) {
                console.log("api data by id : ",response)
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
            <Button onClick={handleClickOpen} sx={{ color: '#fff', height: 20, marginBottom:1 }} xz>
                {/* <img src={view} alt="view gif" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" minHeight='80vh'>
                {/* <DialogTitle sx={{ paddingLeft: 10, paddingRight: 10 }}>ADD NEW ROLE </DialogTitle> */}

                <DialogContent  >
                    <MyProfileContent apiData={apiData} />
                </DialogContent>
                {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Submit</Button>
                    </DialogActions> */
                }
            </Dialog>

        </div>
    );
}
