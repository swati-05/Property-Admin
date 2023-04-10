///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import {useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import folders from "../../../Components/Media/folders.png";
import Modal from "react-modal";
import { useEffect } from "react";
import axios from "axios";
import ApiHeader2 from "../../../Components/ApiList/ApiHeader2";
import { toast, ToastContainer } from "react-toastify";
import BarLoader from "../../../Components/Common/BarLoader";
import ApiHeader from "../../../Components/ApiList/ApiHeader";
import { FcDocument } from 'react-icons/fc'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList';
import { useNavigate, useParams } from "react-router-dom";
import '../../../Components/Common/CommonTailwind/Fonts.css'
import BackendUrl from "@/Components/ApiList/BackendUrl";

function ServicesDocUpload(props) {
  // const base_url = 'http://192.168.0.16:8000'
  const base_url = BackendUrl

  const {id,type} = useParams()
  console.log("id in upload........",id, 'and type => ', type);

  const { 
    get_ConcessionDocumentsToUpload,
post_ConcessionDocumentUpload,
get_ObjectionDocumentsToUpload,
post_ObjectionDocumentUpload,
get_HarvestingDocumentsToUpload,
post_HarvestingDocumentUpload,
get_ConcessionDetailsById,
get_HarvestingDetailsById,
get_ObjectionDetailsById
   } = CitizenApplyApiList();

 //destructuring notify function to activate toast
 const [loader, setloader] = useState(false);
 const [docUpload, setdocUpload] = useState('');
 const [docUploadName, setdocUploadName] = useState("");
 const [refresh, setrefresh] = useState(0);
 const [modal, setmodal] = useState(false);
 const [docUrl, setdocUrl] = useState('')
 const [preview, setpreview] = useState(1)
 const [valRefresh, setvalRefresh] = useState(0)
 const [imageUrl, setimageUrl] = useState()
 const [fileName, setfileName] = useState('')
 const [isImage, setisImage] = useState(true)
 const [tempDoc, settempDoc] = useState(false)
 const [documentListToUpload, setdocumentListToUpload] = useState()
 const [currentOwnerUploadModalData, setcurrentOwnerUploadModalData] = useState()
 const [applicationFullData, setapplicationFullData] = useState()
 const [currentOwnerId, setcurrentOwnerId] = useState(null)
 const [currentDocumentCode, setcurrentDocumentCode] = useState(null)

 const [modalIsOpen, setIsOpen] = useState(false);
 const [modalIsOpen2, setIsOpen2] = useState(false);

 const openModal2 = () => setIsOpen2(true)
 const afterOpenModal = () => { }

 // THIS MODAL FIRST FILTER OUT THE CLICKED OWNER DOC LIST AND OWNER ID WITH filterModalDocumentData 
 const openModal = (ownerId, rowIndex) => {
   filterModalDocumentData(rowIndex)
   setcurrentOwnerId(ownerId)
   setvalRefresh(valRefresh + 1)
   setmodal(true)
   setIsOpen(true);
 }

 const closeModal = () => {
   settempDoc(false)
   setIsOpen(false);
   setmodal(false)
   setIsOpen2(false)
   setpreview(preview + 1)
   console.log('modal m end => ', modal, tempDoc)
 }

 useEffect(() => {
   fetchDocumentsToUpload()
 }, [refresh])

 useEffect(() => {

  let url =''

  type == 'Concession' && (url = get_ConcessionDetailsById)
  type == 'Rain Water Harvesting' && (url = get_HarvestingDetailsById)
  type == 'Objection' && (url = get_ObjectionDetailsById)

  setloader(true)

  axios.post(url,
      {
          applicationId: id
      },
      ApiHeader())
      .then(function (response) {
          setloader(false)
          console.log('view full details...', response.data.data)
          setapplicationFullData(response?.data?.data)
      })
      .catch(function (error) {
          setloader(false)
          console.log('==2 details by id error...', error)
      })
},[])

 const fetchDocumentsToUpload = () => {

  let url = ''

  type == 'Concession' && (url = get_ConcessionDocumentsToUpload)
  type == 'Rain Water Harvesting' && (url = get_HarvestingDocumentsToUpload)
  type == 'Objection' && (url = get_ObjectionDocumentsToUpload)

  setloader(true)

   console.log('before fetch upload doc')
   axios.post(`${url}`, { applicationId: id }, ApiHeader())
     .then((res) => {
       console.log("list of doc to upload at pilotworkflowdocumentupload => ", res?.data);
       setdocumentListToUpload(res?.data?.data)
       setloader(false)
     })
     .catch((err) => {
       console.log("data submission error bo doc upload => ", err);
       setmodal(false);
       setloader(false)
     })
 }

 console.log('temp doc => ', tempDoc)

 const validationSchema = yup.object({
   docId: yup.number().required("Select document type"),
   docUpload: yup.string().required("Select document")
 })
 const formik = useFormik({
   initialValues: {
     docId: '',
     docUpload: '',
     docName: ''
   },

   onSubmit: (values) => {
     console.log("use effect 2")
     console.log("values submission => ", values)
     submitData()
   }
   , validationSchema
 })

 const handleChange = (e) => {
   let file = e.target.files[0];
   setfileName(e.target.name)
   setimageUrl(URL.createObjectURL(e.target.files[0]))
   setdocUpload(e.target.files[0]);
   formik.setFieldValue('docUpload', URL.createObjectURL(e.target.files[0]))
   console.log("use effect change ", formik.values.docId, formik.values.docUpload)
   console.log(
     "file on change bo doc upload => ",
     file,
     "and doc upload => ",
     docUpload, "and url => ", imageUrl, "and name => ", file?.name, "file name => ", fileName
   );

   (file?.name).substring((file?.name).lastIndexOf(".") + 1) == 'pdf' ? setisImage(false) : setisImage(true)

 };

 console.log("and doc name => ", fileName)

 const submitData = (docRefName) => {

   if (currentDocumentCode == null) {
     toast.error("Select Document Type");
     setcurrentOwnerId(null)
     setcurrentDocumentCode(null)
     return
   }

   console.log("doc ref name...", docRefName)
   let fd = new FormData();
   console.log("document  => ", docUpload);

   let requestBody = {
     applicationId: props?.id, // done coming
     ownerId: currentOwnerId, //null for property
     docCode: currentDocumentCode, // from selectbox
     document: docUpload, // done coming
   }


   fd.append("applicationId", id);
   if (currentOwnerId != null) {
     fd.append("ownerId", currentOwnerId);
   }
   fd.append(`docCode`, currentDocumentCode);
   fd.append(`document`, docUpload);

   console.log("form data bo doc upload => ", requestBody); // requestbody just for debugging

   // return
   if (docUpload != '') {
     closeModal()
     setloader(true)

     let url = ''

  type == 'Concession' && (url = post_ConcessionDocumentUpload)
  type == 'Rain Water Harvesting' && (url = post_HarvestingDocumentUpload)
  type == 'Objection' && (url = post_ObjectionDocumentUpload)


     console.log('before fetch doc to upload...', fd)
     axios.post(`${url}`, fd, ApiHeader2())
       .then((res) => {
         console.log("data submitted bo doc upload => ", res.data);

         if (res?.data?.status) {
           toast.success("Document Uploaded Successfully !!");
           setmodal(false);
           setdocUploadName("");
           setdocUpload('')
           setloader(false)
           setrefresh(refresh + 1)
           setfileName('')
           formik.setFieldValue("docUpload", "")
           setrefresh(refresh+1)
           // RESETTING DATA FOR REUPLOAD
           setcurrentOwnerId(null)
           setcurrentDocumentCode(null)
           // TO REFETCH UPLOAD DOCUMENT LIST TO UPDATE
           fetchDocumentsToUpload()
         }
         else {
           console.log('something went')
           toast.error('Something went wrongg !!!')
         }

       })
       .catch((err) => {
         console.log("data submission error bo doc upload => ", err);
         setmodal(false);
         setloader(false)
       })
   } else {
     toast.error("Select file")
   }

 };

 const modalFun = (dn) => {
   console.log("getting doc name => ", dn)
   if (dn == '') {
     toast.error("File not uploaded !!!")
   }
   if (dn != '') {
     setdocUrl(dn)
     // settempDoc(dn)
     openModal2()
     setpreview(preview + 1)
   }
 }

 const handleChange2 = (e) => {
   setcurrentDocumentCode(e.target.value)
 }

 const filterModalDocumentData = (rowIndex) => {
   let modalDocData = documentListToUpload?.ownerDocs[rowIndex]
   console.log('select row....', modalDocData)
   setcurrentOwnerUploadModalData(modalDocData)
 }

 const navigate = useNavigate()

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {loader && <BarLoader />}

        <div className="overflow-x-auto mx-auto w-full px-36 relative">
          
          <button className="absolute top-2 left-2 bg-indigo-500 px-4 py-1 shadow-lg rounded-sm text-white hover:bg-white poppins border-2 border-indigo-500 hover:text-indigo-600 transition-all duration-200 mt-1 hover:border-2 hover:border-indigo-600" onClick={() => navigate('/propertyDashboard')}>Back</button>

          {type == 'Objection' ? <div className="poppins text-xl 2xl:text-2xl font-semibold uppercase text-gray-700 2xl:mt-4 mt-2 w-full text-center">
          {applicationFullData?.objection_for == 'Clerical Mistake' && <>Clerical Objection</>}&nbsp;
                        {applicationFullData?.objection_for == 'Assessment Error' && <>Assessment Objection</>}&nbsp;
                        {applicationFullData?.objection_for == 'Forgery' && <>Forgery Objection</>}&nbsp;
            Document Upload</div> :
            <div className="poppins text-xl 2xl:text-2xl font-semibold uppercase text-gray-700 2xl:mt-4 mt-2 w-full text-center">
            {type} Document Upload</div>
            }

        <div className="text-gray-700 py-6 ">
                                <div className="grid md:grid-cols-2 text-sm bg-white shadow-lg rounded-sm py-4">
                                    {
                                        applicationFullData?.fullDetailsData?.cardArray?.data?.map((data) => (
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">{data?.displayString} : </div>
                                                <div className="px-4 py-2">{data?.value}</div>
                                            </div>
                                        ))
                                    }
                                </div>
        </div>

        <div className="text-red-500 font-semibold poppins 2xl:text-sm text-xs">You have been redirected as Back To Citizen to re-upload documents.</div>

        <div className="w-full flex md:px-4 bg-white font-sans overflow-x-auto py-6">
            <div className="w-full">
              <h1 className="text-xs poppins">{type} Documents</h1>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-center">#</th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        Document Name
                      </th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Document</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Remarks</th>
                      <th className="py-3 px-6 text-center">Preview</th>
                      <th className="py-3 px-6 text-center">Upload</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light bg-white">
                    {/* front image */}
                    {documentListToUpload?.listDocs?.map((doc, index) => (
                      <tr className="border-b border-gray-200 " onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                        <td className="py-3 px-6 font-semibold">{index + 1}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                              <img src={folders} alt="rain" className="w-4" />
                            </div>
                            <span className="font-medium poppins" value={doc?.docName}>
                              {
                                doc?.docType == 'R' && doc?.masters[0]?.docVal
                              }
                              {
                                doc?.docType == 'O' && 'Additional'
                              }
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <div className="font-semibold text-sm">
                            {/* {
                              doc?.docType == 'R' && doc?.masters[0]?.documentCode
                            }
                            {
                              doc?.docType == 'O' &&  */}
                            <div className="">
                              <select
                                className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36"
                                name="docId"
                                onChange={handleChange2}
                              >
                                <option value="" selected>
                                  --select--
                                </option>
                                {doc?.masters?.map((data, selectIndex) => (
                                  <option value={data?.documentCode}>
                                    {data?.docVal}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* } */}

                          </div>
                        </td>
                        <td className="py-3 px-6 text-center relative">
                          {(doc?.uploadedDoc == '') ? <i className="font-semibold">N/A</i> :

                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(`${base_url}/${doc?.uploadedDoc?.docPath}`)}>
                              <div className="flex items-center">
                                {doc?.uploadedDoc?.docPath?.split('.')[doc?.uploadedDoc?.docPath?.split('.')?.length - 1] == 'pdf' &&
                                  <div className="flex-shrink-0 text-[28px]">
                                    <FcDocument />
                                  </div>
                                }
                                {doc?.uploadedDoc?.docPath?.split('.')[doc?.uploadedDoc?.docPath?.split('.')?.length - 1] == 'jpg' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }
                                {doc?.uploadedDoc?.docPath?.split('.')[doc?.uploadedDoc?.docPath?.split('.')?.length - 1] == 'jpeg' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }
                                {doc?.uploadedDoc?.docPath?.split('.')[doc?.uploadedDoc?.docPath?.split('.')?.length - 1] == 'png' &&
                                  <div className="flex-shrink-0">
                                    <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                  </div>
                                }

                              </div>
                            </div>

                          }

                        </td>

                        <td className="py-3 px-6 text-center font-semibold">
                          {doc?.uploadedDoc == '' ? <i className="font-semibold">N/A</i> : <>
                            <p className="whitespace-no-wrap">
                              {doc?.uploadedDoc?.verifyStatus == 0 && <>Pending</>}</p>
                            <p className="text-green-500 whitespace-no-wrap">
                              {doc?.uploadedDoc?.verifyStatus == 1 && <>Verified</>}</p>
                            <p className="text-red-500 whitespace-no-wrap">
                              {doc?.uploadedDoc?.verifyStatus == 2 && <>Rejected</>}
                            </p>
                          </>}
                        </td>

                        <td className="py-3 px-6 text-center">
                          {(doc?.uploadedDoc?.remarks == "" || doc?.uploadedDoc?.remarks == null) ? <i className="font-semibold">N/A</i> : doc?.uploadedDoc?.remarks}
                        </td>

                        <td className="py-3 px-6 text-center">
                          {
                            (doc?.docName == fileName && isImage == true) &&

                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                              <img src={imageUrl} alt="" srcset="" className="md:w-[3vw] w-[5vw] text-center" /></div>
                          }
                          {
                            (doc?.docName == fileName && isImage == false) &&
                            <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(settempDoc(!tempDoc))}>
                              <div className="text-[40px] text-center"><FcDocument /></div></div>
                          }
                        </td>

                        <td className="py-3 px-6 flex flex-wrap gap-2">


                          <div className="font-semibold text-sm">
                            {doc?.uploadedDoc?.verifyStatus != 1 && <>
                              <div className="">
                                <input
                                  accept=".pdf,.jpg,.jpeg"
                                  type="file"
                                  name={doc?.docName}
                                  onChange={handleChange}
                                  className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 foc}us:outline-none cursor-pointer shadow-md w-36"
                                />

                              </div>
                              {(doc?.uploadedDoc?.verify_status != 1 || doc?.uploadedDoc == '') && <div className="mt-2">
                                {!loader && <button
                                  // onClick={() => submitDataTemp(document?.docName)}
                                  onClick={() => submitData(doc?.docName)}
                                  type="submit"
                                  // onClick={formik.handleSubmit}
                                  className=" px-4 py-1.5 bg-indigo-500 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 poppins hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Upload
                                </button>}
                              </div>} </>}

                          </div>


                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

</div>

    </>
  );
}

export default ServicesDocUpload;
