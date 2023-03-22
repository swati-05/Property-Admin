import * as React from 'react';
import { Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { TRADE, HEADER } from './TradeApiListFile';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


function AddApi(props) {

    const [open, setOpen] = React.useState(false);
    const baseApiUrl = '192.168.0.166/';




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleApiSubmit = (values) => {
        axios.post(TRADE.SAVE_API_LIST, values, HEADER)
            .then(function (response) {
                console.log(response)
                alert('Record Created Successfully')
                props.fun(4);
            })
            .catch(function (error) {
                console.log(error)
            })

    }


    const validationSchema = yup.object({
        category: yup.string().required('Choose a category'),
        revisionNo: yup.number().required('Select Revisions'),
        apiBaseUrl: yup.string().required('Enter api base url').max(100, 'Enter maximum 50 characters'),
        preCondition: yup.string().required('Precondition'),
        endPoint: yup.string().required('Enter api endPoint').max(100, 'Enter maximum 50 characters'),
        requestPayload: yup.string().required('Request Payload'),
        responsePayload: yup.string().required('Response Payload'),
        description: yup.string().required('Short description'),
        remarks: yup.string().required('Enter Remarks'),
        responseFormat: yup.string().required('Select Response Format'),
        createdBy: yup.string().required('Creator of this api'),
    });

    return (
        <div className='m-10'>
            <Formik
                initialValues={{ category: '', revisionNo: '', apiBaseUrl: 'http://192.168.0.166/', preCondition: '', endPoint: '', requestPayload: '', responsePayload: '', description: '', remarks: '', responseFormat: 'JSON', createdBy: '', discontinued: 0, tags: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, setSubmitProps) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        // setSubmitting(false);
                        handleApiSubmit(values);

                        setSubmitProps.setSubmitting(false)

                        // setSubmitProps.resetForm();

                        props.fun(5)
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


                    <Form>
                        <h1 className='text-xl mb-10  text-center font-bold text-cyan-400'>ADD NEW API<hr /></h1>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="select"
                                    id="category"
                                    name='category'
                                    value={values.category}
                                    onChange={handleChange}
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                                    required="">

                                    <option value="">SELECT</option>
                                    <option value="TRADE">TRADE</option>
                                    <option value="PROPERTY">PROPERTY</option>
                                    <option value="WATER">WATER</option>
                                    <option value="RM">ROLE MANAGEMENT</option>
                                </Field>
                                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> CATEGORY </label>
                                {errors.category && touched.category ? (
                                    <div className='text-red-600 text-sm'>{errors.category}</div>
                                ) : null}

                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <input type="number"
                                    name='revisionNo'
                                    onChange={handleChange}
                                    value={values.revisionNo}
                                    id="revisionNo"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-transparent peer"
                                    placeholder="revisionNo : 1st, 2nd or 3rd"
                                    min="0"
                                    required=""
                                    autoComplete='off' />
                                <label for="revisionNo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REVISION</label>

                                {errors.revisionNo && touched.revisionNo ? (
                                    <div className='text-red-600 text-sm'>{errors.revisionNo}</div>
                                ) : null}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <input type="text"
                                    name="apiBaseUrl"
                                    id="apiBaseUrl"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.apiBaseUrl}
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                                    placeholder="Base Url :http://smartulb.co.in/api/property/"
                                    required="" autoComplete='on' readOnly />
                                <label for="apiBaseUrl" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API BASE URL</label>
                                {errors.apiBaseUrl && touched.apiBaseUrl ? (
                                    <div className='text-red-600 text-sm'>{errors.apiBaseUrl}</div>
                                ) : null}
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <input type="text"
                                    name="preCondition"
                                    id="preCondition"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.preCondition}
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                                    placeholder="PreCondition : Authenticated Users Only "
                                    required="" />
                                <label for="preCondition" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PRE-CONDITIONS</label>
                                {errors.preCondition && touched.preCondition ? (
                                    <div className='text-red-600 text-sm'>{errors.preCondition}</div>
                                ) : null}
                            </div>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input type="text"
                                name="endPoint"
                                id="endPoint"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.endPoint}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                                placeholder=" EndPoint : /wardMaster/getWardNoByWardMasterId/1"
                                required="" />
                            <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API END-POINT</label>
                            {errors.endPoint && touched.endPoint ? (
                                <div className='text-red-600 text-sm'>{errors.endPoint}</div>
                            ) : null}
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="textarea"
                                    id="requestPayload"
                                    name='requestPayload'
                                    value={values.requestPayload}
                                    onChange={handleChange}
                                    rows="4"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                                    placeholder="request :
                                    { fname: Anshuman, lname: Singh,status: 1, id: 1 }} "
                                    required="" />
                                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REQUEST PAYLOAD</label>
                                {errors.requestPayload && touched.requestPayload ? (
                                    <div className='text-red-600 text-sm'>{errors.requestPayload}</div>
                                ) : null}

                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="textarea"
                                    name='responsePayload'
                                    onChange={handleChange}
                                    value={values.responsePayload}
                                    id="responsePayload"
                                    rows="4"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-transparent peer"
                                    placeholder=" response :
                                    {   fname: Anshuman, lname: Singh,status: 1, id: 1 },
                                        {   fname: Monu,lname: Singh,status: 0,id: } } "
                                    required="" />
                                <label for="responsePayload" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RESPONSE PAYLOAD</label>

                                {errors.responsePayload && touched.responsePayload ? (
                                    <div className='text-red-600 text-sm'>{errors.responsePayload}</div>
                                ) : null}
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="textarea"
                                    onChange={handleChange}
                                    name="description"
                                    rows="2"
                                    value={values.description}
                                    id="description"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                    focus:bg-transparent
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Api short description : Ex - This api generates dynamic data based on certain parameters."
                                    required="" />
                                <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DESCRIPTION</label>
                                {errors.description && touched.description ? (
                                    <div className='text-red-600 text-sm'>{errors.description}</div>
                                ) : null}
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="textarea"
                                    onChange={handleChange}
                                    value={values.remarks}
                                    name="remarks"
                                    rows="2"
                                    id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                    focus:bg-transparent
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" Enter some remarks.  Ex:- v1 is stable, V2 is expected Soon"
                                    required=""
                                />
                                <label for="created_by" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REMARKS</label>
                                {errors.remarks && touched.remarks ? (
                                    <div className='text-red-600 text-sm'>{errors.remarks}</div>
                                ) : null}
                            </div>
                        </div>

                        {/* code added below for extra options */}

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <Field as="select"
                                    name="responseFormat"
                                    value={values.responseFormat}
                                    id="responseFormat"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    required="" >
                                    <option value="JSON">JSON</option>
                                </Field>
                                <label for="responseFormat" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Response Format</label>
                                {errors.responseFormat && touched.responseFormat ? (
                                    <div className='text-red-600 text-sm'>{errors.responseFormat}</div>
                                ) : null}
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={values.createdBy}
                                    name="createdBy"
                                    id="createdBy"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                                    placeholder="Ex: Anshu Verma "
                                    required=""
                                />
                                <label for="createdBy" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CREATED BY</label>
                                {errors.createdBy && touched.createdBy ? (
                                    <div className='text-red-600 text-sm'>{errors.createdBy}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='flex'>
                            <div className='flex-1 block mb-4 '>
                                <input
                                    type="checkbox"
                                    className='py-2'
                                    name='discontinued'
                                    value="1"
                                    onChange={handleChange}
                                />
                                <label htmlFor="discontinued"> Discontinue this resource</label>
                            </div>
                            <div className='relative z-0 mb-6 w-1/2 group'>
                                <input
                                    type="text"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                                    name='tags'
                                    value={values.tags}
                                    onChange={handleChange}
                                    placeholder="Tag1, Tag2, Tag3"
                                    multiple
                                />
                                <label for="tags" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API TAGS</label>
                            </div>
                        </div>
                        <button type="submit" name='submit' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </Form>



                )}
            </Formik>
        </div>
    )
}

export default AddApi