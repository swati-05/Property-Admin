//////////////////{*****}//////////////////////////////////////////
// >Author - R U Bharti
// >Version - 1.0
// >Date - 19th Dec., 2022
// >Revision - 1
// >Project - JUIDCO
///////////////////////////////////////////////////////////////////////////

import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const CitizenPropOwnerRow = (props) => {

    const [buttonState, setbuttonState] = useState(false)

    const validationSchema = yup.object({
      ownerName: yup.string().required("Enter name"),
      guardianName: yup.string().required("Enter guardian name"),
      relation: yup.string().required("Select relation"),
      mobileNo: yup.number().min(10, 'Not valid').required("Enter mobile no."),
      // aadhar: yup.number().min(0).min(12, 'Not valid')
    })

    const formik = useFormik({
        initialValues: {
            ownerId: props?.data?.id,
            ownerName: props?.data?.owner_name,
            gender: props?.data?.gender,
            dob: props?.data?.dob,
            guardianName: props?.data?.guardian_name,
            relation: props?.data?.relation_type,
            mobileNo: props?.data?.mobile_no,
            aadhar: props?.data?.aadhar_no,
            pan: props?.data?.pan_no,
            email: props?.data?.email,
            isArmedForce: props?.data?.is_armed_force ? '1' : '0',
            isSpeciallyAbled: props?.data?.is_specially_abled ? '1' : '0'
        },

        enableReinitialize: true,

        onSubmit: (values) => {
          console.log("values of owner => ", values)
          props.getowner(values)
        }, validationSchema
    })

  return (
    <>
               <tr className="bg-white shadow-lg border-b border-gray-200">
               <td className="px-2 py-2 text-left">{props?.index + 1}</td>        
        <td className="px-2 py-2 text-left">{props?.data?.owner_name}</td>
        <td className="px-2 py-2 text-left">
            {props?.data?.gender == "1" && <>Male</>}
            {props?.data?.gender == "2" && <>Female</>}
            {props?.data?.gender == "3" && <>Transgender</>}
            </td>
        <td className="px-2 py-2 text-left">{props?.data?.dob}</td>
        <td className="px-2 py-2 text-left">
          {props?.data?.guardian_name}
        </td>
        <td className="px-2 py-2 text-left">{props?.data?.relation_type}</td>
        <td className="px-2 py-2 text-left">{props?.data?.mobile_no}</td>
        <td className="px-2 py-2 text-left">{props?.data?.aadhar_no}</td>
        <td className="px-2 py-2 text-left">{props?.data?.pan_no}</td>
        <td className="px-2 py-2 text-left">{props?.data?.email}</td>
        <td className="px-2 py-2 text-left">{props?.data?.is_armed_force ? <>Yes</> : <>No</>}</td>
        <td className="px-2 py-2 text-left">{props?.data?.is_specially_abled ? <>Yes</> : <>No</>}</td>
        <td className="px-2 py-2 text-left"></td>
      </tr>

      {/* <tr className="bg-white shadow-lg border-b border-gray-200 border-b border-gray-600">
        <td className="px-2 py-2 text-sm text-left">{}</td>
        <td className="px-2 py-2 text-sm text-left">
          <input type="text"
            name='ownerName'
            value={formik.values.ownerName}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
          />
           <span className="text-red-600 absolute text-xs">
                  {formik.touched.ownerName && formik.errors.ownerName
                    ? formik.errors.ownerName
                    : null}
                </span>
        </td>
        <td className="px-2 py-2 text-sm text-left">
        {props?.data?.gender == "1" && <>Male</>}
            {props?.data?.gender == "2" && <>Female</>}
            {props?.data?.gender == "3" && <>Transgender</>}
        </td>
        <td className="px-2 py-2 text-sm text-left">
        {props?.data?.dob}
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input type="text"
            name='guardianName'
            value={formik.values.guardianName}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
          />
           <span className="text-red-600 absolute text-xs">
                  {formik.touched.guardianName && formik.errors.guardianName
                    ? formik.errors.guardianName
                    : null}
                </span>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <select
            name='relation'
            value={formik.values.relation}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  shadow-md"
          >
              <option value="">--Select--</option>
              <option value="S/O">S/O</option>
              <option value="D/O">D/O</option>
              <option value="W/O">W/O</option>
              <option value="C/O">C/O</option>

          </select>
          <span className="text-red-600 absolute text-xs">
                  {formik.touched.relation && formik.errors.relation
                    ? formik.errors.relation
                    : null}
                </span>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="text"
            name='mobileNo'
            maxLength={10}
            value={formik.values.mobileNo}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
          />
          <span className="text-red-600 absolute text-xs">
                  {formik.touched.mobileNo && formik.errors.mobileNo
                    ? formik.errors.mobileNo
                    : null}
                </span>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="text"
            name='aadhar'
            onBlur={formik.handleBlur}
            value={formik.values.aadhar}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
          />
          <span className="text-red-600 absolute text-xs">
                  {formik.touched.aadhar && formik.errors.aadhar
                    ? formik.errors.aadhar
                    : null}
                </span>
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="text"
            name='pan'
            value={formik.values.pan}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
          />
        </td>
        <td className="px-2 py-2 text-sm text-left">
          <input
            type="email"
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            className="div-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none shadow-md"
          />
        </td>
        <td className="px-2 py-2 text-sm text-left">
        {props?.data?.is_armed_force ? <>Yes</> : <>No</>}
        </td>
        <td className="px-2 py-2 text-sm text-left">
        {props?.data?.is_specially_abled ? <>Yes</> : <>No</>}
        </td>
        <td>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="bg-blue-200 hover:bg-blue-300 rounded-lg shadow-lg px-3 py-1.5"
          >
            Update
          </button>
        </td>
      </tr> */}
              </>
  )
}

export default CitizenPropOwnerRow