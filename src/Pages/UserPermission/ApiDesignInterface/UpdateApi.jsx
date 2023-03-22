import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { inputErrorStyle } from './CommonStyles';
import * as yup from 'yup';
import axios from 'axios';
import { TRADE } from './TradeApiListFile';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function UpdateApi(props) {

    // alert(props.updateData[0].category);
    console.log('for update data', props)

    const [open, setOpen] = useState(false);
    // const baseApiUrl = '192.168.0.166/';


    useEffect(() => {
        getUpdateData();
    }, [1])

    const getUpdateData = () => {
        axios.get(TRADE.GET_API_BY_ID + props.id)
            .then(function (response) {
                console.log('====data to update=====', response.data[0]);
                setupdateData(response.data[0])

            })
            .then(function (error) {
                console.log(error)
            })
    }

    const setupdateData = (values) => {
        formik.setFieldValue("category", values.category);
        formik.setFieldValue("revisionNo", values.revision_no);
        formik.setFieldValue("preCondition", values.pre_condition);
        formik.setFieldValue("requestPayload", values.request_payload);
        formik.setFieldValue("responsePayload", values.response_payload);
        formik.setFieldValue("description", values.description);
        formik.setFieldValue("remarks", values.remarks);
        formik.setFieldValue("createdBy", values.created_at);
        formik.setFieldValue("discontinued", values.discontinued);
        formik.setFieldValue("endPoint", values.end_point);
        formik.setFieldValue("tags", values.tags);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleApiUpdate = (values) => {
        axios.put(TRADE.UPDATE_API_LIST + props.id, values)
            .then(function (response) {
                console.log(response)
                alert('Record Updated Successfully')
                // props.fun(4);
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    const initialvalues = {
        category: '',
        apiBaseUrl: 'http://192.168.0.16/',
        revisionNo: '',
        preCondition: '',
        endPoint: '',
        requestPayload: '',
        responsePayload: '',
        description: '',
        remarks: '',
        responseFormat: 'JSON',
        createdBy: '',
        discontinued: '',
        tags: '',
    }
    const validationSchema = yup.object({
        category: yup.string().required('Choose a category'),
        revisionNo: yup.number().required('Select Revisions'),
        apiBaseUrl: yup.string().required('Enter api base url').max(100, 'Enter maximum 50 characters'),
        preCondition: yup.string().required('Preconditions'),
        endPoint: yup.string().required('Enter api endPoint').max(100, 'Enter maximum 50 characters'),
        requestPayload: yup.string().required('Request Payload'),
        responsePayload: yup.string().required('Response Payload'),
        description: yup.string().required('Short description'),
        remarks: yup.string().required('Enter Remarks'),
        responseFormat: yup.string().required('Select Response Format'),
        createdBy: yup.string().required('Creator of this api'),
    });


    const formik = useFormik({

        initialValues: initialvalues,

        onSubmit: (values, resetForm) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                handleApiUpdate(values);
                // setSubmitProps.setSubmitting(false)
                // setSubmitProps.resetForm();

                // props.fun(5)
            }, 400);
        },
        validationSchema

    })

    const handleOnChange = (event) => {
        let name = event.target.name;
        let values = event.taget.value;


    }

    return (
        <div className='m-10'>

            {props.id}
            {/* <button onClick={getUpdateData}>click</button> */}
            <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                <h1 className='text-xl mb-10  text-center font-bold text-cyan-400'>UPDATE NEW API<hr /></h1>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 mb-6 w-full group">
                        <select
                            id="category"
                            name='category'
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900  bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                            required="">

                            <option value="">SELECT</option>
                            <option value="TRADE">TRADE</option>
                            <option value="PROPERTY">PROPERTY</option>
                            <option value="WATER">WATER</option>
                        </select>
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> CATEGORY </label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.category && formik.errors.category ? formik.errors.category : null}
                        </span>

                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <input type="number"
                            name='revisionNo'
                            value={formik.values.revisionNo}
                            onChange={formik.handleChange}
                            id="revisionNo"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-transparent peer"
                            placeholder="revisionNo : 1st, 2nd or 3rd"
                            min="0"
                            required=""
                            autoComplete='off' />
                        <label for="revisionNo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REVISION</label>

                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.revisionNo && formik.errors.revisionNo ? formik.errors.revisionNo : null}
                        </span>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 mb-6 w-full group">
                        <input type="text"
                            name="apiBaseUrl"
                            id="apiBaseUrl"
                            value={formik.values.apiBaseUrl}
                            onChange={formik.handleChange}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                            placeholder="Base Url :http://smartulb.co.in/api/property/"
                            required="" autoComplete='on' readOnly />
                        <label for="apiBaseUrl" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API BASE URL</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.apiBaseUrl && formik.errors.apiBaseUrl ? formik.errors.apiBaseUrl : null}
                        </span>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <input type="text"
                            name="preCondition"
                            id="preCondition"
                            value={formik.values.preCondition}
                            onChange={formik.handleChange}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                            placeholder="preCondition : Authenticated Users Only "
                            required="" />
                        <label for="preCondition" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PRE-CONDITIONS</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.preCondition && formik.errors.preCondition ? formik.errors.preCondition : null}
                        </span>
                    </div>
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input type="text"
                        name="endPoint"
                        id="endPoint"
                        value={formik.values.endPoint}
                        onChange={formik.handleChange}
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:bg-transparent     focus:border-blue-600 peer"
                        placeholder=" EndPoint : /wardMaster/getWardNoByWardMasterId/1"
                        required="" />
                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API END-POINT</label>
                    <span className={`${inputErrorStyle}`}>
                        {formik.touched.endPoint && formik.errors.endPoint ? formik.errors.endPoint : null}
                    </span>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 mb-6 w-full group">
                        <textarea
                            id="requestPayload"
                            name='requestPayload'
                            value={formik.values.requestPayload}
                            onChange={formik.handleChange}
                            rows="4"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                            placeholder="request :
                                    { fname: Anshuman, lname: Singh,status: 1, id: 1 }} "
                            required="">
                        </textarea>
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REQUEST PAYLOAD</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.requestPayload && formik.errors.requestPayload ? formik.errors.requestPayload : null}
                        </span>

                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <textarea
                            name='responsePayload'
                            value={formik.values.responsePayload}
                            onChange={formik.handleChange}
                            id="responsePayload"
                            rows="4"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-transparent peer"
                            placeholder=" response :
                                    {   fname: Anshuman, lname: Singh,status: 1, id: 1 },
                                        {   fname: Monu,lname: Singh,status: 0,id: } } "
                            required="" >

                        </textarea>
                        <label for="responsePayload" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RESPONSE PAYLOAD</label>

                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.responsePayload && formik.errors.responsePayload ? formik.errors.responsePayload : null}
                        </span>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 mb-6 w-full group">
                        <textarea
                            name="description"
                            rows="2"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            id="description"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                    focus:bg-transparent
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Api short description : Ex - This api generates dynamic data based on certain parameters."
                            required="" />
                        <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DESCRIPTION</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : null}
                        </span>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <textarea
                            value={formik.values.remarks}
                            onChange={formik.handleChange}
                            name="remarks"
                            rows="2"
                            id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                    focus:bg-transparent
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" Enter some remarks.  Ex:- v1 is stable, V2 is expected Soon"
                            required=""
                        >

                        </textarea>
                        <label for="created_by" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">REMARKS</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}
                        </span>
                    </div>
                </div>



                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 mb-6 w-full group">
                        <select as="select"
                            name="responseFormat"
                            value={formik.values.responseFormat}
                            onChange={formik.handleChange}
                            id="responseFormat"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required="" >
                            <option value="JSON">JSON</option>
                        </select>
                        <label for="responseFormat" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Response Format</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.responseFormat && formik.errors.responseFormat ? formik.errors.responseFormat : null}
                        </span>
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            value={formik.values.createdBy}
                            onChange={formik.handleChange}
                            name="createdBy"
                            id="createdBy"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                    focus:bg-transparent
                                    focus:border-blue-600 peer"
                            placeholder="Ex: Anshu Verma "
                            required=""
                        />
                        <label for="createdBy" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CREATED BY</label>
                        <span className={`${inputErrorStyle}`}>
                            {formik.touched.createdBy && formik.errors.createdBy ? formik.errors.createdBy : null}
                        </span>
                    </div>
                </div>


                <div className='flex'>
                    <div className='flex-1 block mb-4 '>
                        <input
                            type="checkbox"
                            className='py-2'
                            name='discontinued'
                            value="1"
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
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            placeholder="Tag1, Tag2, Tag3"
                            multiple
                        />
                        <label for="tags" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">API TAGS</label>
                    </div>
                </div>
                <button type="submit" name='submit' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>



            {/**     
        </Formik> * */}
        </div>
    )
}

export default UpdateApi