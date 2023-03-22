import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Formik } from 'formik';
import axios from 'axios';

export default function EmpAddModal(props) {
    const [open, setOpen] = React.useState(false);
    const urlString = "http://localhost:3333/";
    const dbRoles = "roles";
    const dbUserType = "user_types";
    const dbUsers = "users";




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUserSubmit = (values) => {
        // alert(values);

        axios.post(urlString + dbUsers, values)
            .then(function (response) {
                console.log(response)
                alert('Record Created Successfully')
                props.fun();
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ color: '#fff', width: 80, height: 20 }}>
                New
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" minHeight='80vh'>


                {/* <DialogTitle sx={{ paddingLeft: 10, paddingRight: 10 }}>ADD NEW ROLE </DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        {/* Role */}
                    </DialogContentText>
                    <Formik
                        initialValues={{ name: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'This is a required field';
                            }
                            return errors;
                        }}
                        onSubmit={(values, setSubmitProps) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                // setSubmitting(false);
                                handleUserSubmit(values);

                                setSubmitProps.setSubmitting(false)

                                setSubmitProps.resetForm();
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="users"
                                        label="Add User"
                                        type="text"
                                        fullWidth
                                        // variant="standard"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {/* <span className='text-red-500'>{errors.role && touched.role && errors.role}</span><br /> */}
                                    <button type="submit"
                                        className="mt-2 mb-2 inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "> Submit</button>
                                </div>
                            </form>


                        )}
                    </Formik>
                </DialogContent>
                {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions> */}

            </Dialog>

        </div >
    );
}
