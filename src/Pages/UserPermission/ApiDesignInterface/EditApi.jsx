import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function EditApi(props) {
    const [open, setOpen] = React.useState(false);
    const urlString = "http://localhost:3333/";
    const dbRoles = "roles";
    const dbUserType = "user_types";
    const dbApi = "ApiData";




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleApiSubmit = (values) => {
        // alert(values);

        axios.post(urlString + dbApi, values)
            .then(function (response) {
                console.log(response)
                alert('Record Created Successfully')
                props.fun();
            })
            .catch(function (error) {
                console.log(error)
            })

    }


    const validationSchema = yup.object({
        category: yup.string().required('Select category'),
        api_url: yup.string().required('Enter URL').max(100, 'Enter maximum 50 characters'),
        pre_conditions: yup.string().required('Enter Preconditions'),
        expected_payload: yup.string().required('Enter Expected Payload'),
        revision_no: yup.number().required('Choose Revision No'),
        remarks: yup.string().required('Enter Remarks'),
        response_format: yup.string().required('Select Response Format'),
        created_by: yup.string().required('Creator of this api'),
    });

    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ color: '#fff', width: 80, height: 20 }}>
                New
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" minHeight='80vh'> 


                {/* <DialogTitle sx={{ paddingLeft: 10, paddingRight: 10 }}>ADD NEW ROLE </DialogTitle> */}
                <DialogContent className='bg-white' >
                    <DialogContentText>
                        {/* Role */}
                    </DialogContentText>
                    <Formik
                        initialValues={{category:'', api_url: '', pre_conditions: '', expected_payload: '', revision_no: '', remarks: '', response_format:'', created_by:'', status: 1 }}
                        validationSchema={validationSchema}
                        onSubmit={(values, setSubmitProps) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                // setSubmitting(false);
                                handleApiSubmit(values);

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
                            <Form >
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <h1 className='w-full text-center text-xl text-slate-500 font-bold pb-4'>API NEW API<br /> </h1>
                                    <div class="w-full md:w-full px-3 mb-4 md:mb-4">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            Category
                                        </label>



                                        <Field as="select"
                                            class="block  w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pb-2 "
                                            id="grid-state"
                                            name="category" 
                                            value={values.category}
                                        >

                                            <option value="">Select Categroy</option>
                                            <option value="TRADE">TRADE</option>
                                            <option value="PROPERTY">PROPERTY</option>
                                            <option value="WATER">WATER</option>
                                        </Field>
                                        {errors.category && touched.category ? (
                                            <div className='text-red-600 text-sm'>{errors.category}</div>
                                        ) : null}
                                    </div>
                                    <div class="w-full md:w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                            Api URLs
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.api_url}
                                            class=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="api_url"
                                            name="api_url"
                                            type="text"
                                            placeholder="https://example.com/data?key=API_KEY" />
                                        {errors.api_url && touched.api_url ? (
                                            <div className='text-red-600 text-sm'>{errors.api_url}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-4">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Preconditions
                                        </label>
                                        <input
                                            name='pre_conditions'
                                            value={values.pre_conditions}
                                            onChange={handleChange}
                                            class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-password"
                                            type="text"
                                            placeholder="e.g: Authenticated Users Only" />
                                        {errors.pre_conditions && touched.pre_conditions ? (
                                            <div className='text-red-600 text-sm'>{errors.pre_conditions}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-2">
                                    <div class="w-full md:w-2/2 px-3 mb-4 md:mb-4">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                            Expected Payload
                                        </label>
                                        <Field as="textarea"
                                            name='expected_payload'
                                            onChange={handleChange}
                                            value={values.expected_payload}
                                            rows="4"
                                            class=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-city"
                                            type="text"
                                            placeholder='{ from_date:"2022-06-01", to_date:"2022-07-01" }' />

                                        {errors.expected_payload && touched.expected_payload ? (
                                            <div className='text-red-600 text-sm'>{errors.expected_payload}</div>
                                        ) : null}
                                    </div>
                                    <div class="w-full md:w-3/3 px-3 mb-4 md:mb-4">
                                        <br />
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                            Response Format
                                        </label>
                                        <Field as="select"
                                            name="response_format"
                                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state"
                                            value={values.response_format}
                                            >

                                            <option value="">Response Format</option>
                                            <option value="JSON">JSON</option>
                                        </Field>
                                        {errors.response_format && touched.response_format ? (
                                            <div className='text-red-600 text-sm'>{errors.response_format}</div>
                                        ) : null}
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>

                                    </div>
                                    <div class="w-full md:w-3/3 px-3 mb-4 md:mb-4">
                                        <br />
                                        <label for="exampleNumber0" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Revision No
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            value={values.revision_no}
                                            name="revision_no"
                                            type="number"
                                            class=" form-control block w-full px-3 py-1 text-base font-normal bg-gray-200 text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="exampleNumber0"
                                            placeholder="e.g: 1,2 or 3 etc."
                                            min="0"
                                        />
                                        {errors.revision_no && touched.revision_no ? (
                                            <div className='text-red-600 text-sm'>{errors.revision_no}</div>
                                        ) : null}
                                    </div>
                                    <div class="w-full md:w-3/3 px-3 mb-4 md:mb-4">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                            <br />
                                            Remarks
                                        </label>
                                        <Field
                                            as="textarea"
                                            onChange={handleChange}
                                            name="remarks"
                                            rows="4"
                                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-zip"
                                            value={values.remarks}
                                            placeholder="e.g : v1 is stable. v2 is expected soon" />

                                        {errors.remarks && touched.remarks ? (
                                            <div className='text-red-600 text-sm'>{errors.remarks}</div>
                                        ) : null}
                                    </div>
                                    
                                    <div class="w-full md:w-3/3 px-3 mb-4 md:mb-4">
                                        <br />
                                        <label for="exampleNumber0" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Created By
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            value={values.created_by}
                                            name="created_by"
                                            type="text"
                                            class=" form-control block w-full px-3 py-1 text-base font-normal bg-gray-200 text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="exampleNumber0"
                                            placeholder="e.g: Anshu Verma"
                                            min="0"
                                        />
                                        {errors.created_by && touched.created_by ? (
                                            <div className='text-red-600 text-sm'>{errors.created_by}</div>
                                        ) : null}
                                    </div>
                                    <div class="form-check inline-block ">
                                        <input
                                            name="status"
                                            onChange={handleChange}
                                            class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            type="checkbox"
                                            value="0"
                                            id="flexCheckDefault" />
                                        <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                                            Discontinue This Resource
                                        </label>
                                    </div>
                                    <div class=" block w-full m-4 bg-cyan-800 text-center text-white p-2 rounded"
                                    >
                                        <button type="submit" name='submit' disabled={isSubmitting}  >
                                            Submit
                                        </button>


                                    </div>
                                </div>
                            </Form>


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
