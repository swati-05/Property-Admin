import { contextVar } from '@/Components/Context/Context';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
// import React from 'react'

function FormComponentForTcV(props) {
    const [floorList, setfloorList] = useState([])
    const { notify } = useContext(contextVar);

    console.log("prop data for form ", props.data)

    const initialValues = {
        floorMstrId: props?.data?.floor_mstr_id,
        usageType: props?.data?.usage_type_mstr_id,
        occupancyType: props?.data?.occupancy_type_mstr_id,
        constructionType: props?.data?.const_type_mstr_id,
        builtupArea: props?.data?.builtup_area,
        fromDate: props?.data?.date_from,
        toDate: props?.data?.date_upto,
        floorId: props?.data?.id,
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
            setfloorList([...floorList, values])
            props.collectAllFloorData('floorDetails', values)
            console.log("floorDetails", values)
            { (values) && notify('floor confirmed!', 'success') }
            // { (values.status == false) && notify('Oops! Something went wrong', "error") }
        }
    });

    return (
        <>
            <div className='w-full'>
                <form onSubmit={formik.handleSubmit} id={props.key}>
                    {/* FormComponentForTcV */}
                    <tr className="bg-white  border-b border-gray-100 mb-24 w-full h-12 ">
                        <td>
                            <input type="text" name='floorId' className=" form-control  w-1 md:w-1 px-2 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " value={formik.values.floorId} onChange={formik.handleChange} disabled
                            />
                        </td>
                        <td><select {...formik.getFieldProps('floorMstrId')} name='floorMstrId' className="w-20 form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        >
                            <option value="">select</option>
                            {
                                props?.masterData?.floor_type?.map((data) => (
                                    <option value={data?.id}>{data?.floor_name}</option>
                                ))
                            }
                        </select></td>
                        <td ><select {...formik.getFieldProps('usageType')} name='usageType' className="form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        >
                            <option value="">select</option>
                            {
                                props?.masterData?.usage_type?.map((data) => (
                                    <option value={data?.id}>{data?.usage_type}</option>
                                ))
                            }
                        </select></td>
                        <td><select {...formik.getFieldProps('occupancyType')} name='occupancyType' className="form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        >
                            <option value="">select</option>
                            {
                                props?.masterData?.occupancy_type?.map((data) => (
                                    <option value={data?.id}>{data?.occupancy_type}</option>
                                ))
                            }
                        </select></td>
                        <td><select {...formik.getFieldProps('constructionType')} name='constructionType' className="form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        >
                            <option value="">select</option>
                            {
                                props?.masterData?.construction_type?.map((data) => (
                                    <option value={data?.id}>{data?.construction_type}</option>
                                ))
                            }
                        </select></td>
                        <td><input {...formik.getFieldProps('builtupArea')} name='builtupArea' type="text" className="form-control block w-full md:w-28 px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        /></td>
                        <td><input {...formik.getFieldProps('fromDate')} type="date" name='fromDate' className="form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md" /></td>
                        <td><input {...formik.getFieldProps('toDate')} type="date" name='toDate' className="form-control block w-full md:w-28 cursor-pointer px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
                        /></td>
                        <button type='submit' id={props?.data?.floor_mstr_id} className='bg-green-500 text-gray-50 ml-8 px-2 py-1 font-bold mt-2 '>check & confirm
                        </button>
                    </tr>
                </form>
           
            </div>
        </>
    )
}

export default FormComponentForTcV