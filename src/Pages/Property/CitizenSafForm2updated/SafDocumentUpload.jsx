///////////////////////////////////////////////////////////////////////
// Author : R U Bharti
// Project : JUIDCO
///////////////////////////////////////////////////////////////////////

import { useContext, useState } from "react";
// import { contextVar } from "../../../Components/Context/Context";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import folders from "../../../Components/Media/folders.png";
import Modal from "react-modal";
import { useEffect } from "react";
import axios from "axios";
import ApiHeader2 from "../../../Components/ApiList/ApiHeader2";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import BarLoader from "../../../Components/Common/BarLoader";
import ApiHeader from "../../../Components/ApiList/ApiHeader";
import { FcDocument } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import CitizenApplyApiList from '../../../Components/CitizenApplyApiList';
import { useNavigate, useParams } from "react-router-dom";
import TopTabs from "./SafFormReview/TopTabs";
import '../../../Components/Common/CommonTailwind/Fonts.css'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import BackendUrl from "../../../Components/ApiList/BackendUrl";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#78B2FB",
    border: "none",
  },
};

Modal.setAppElement("#root");

function SafDocumentUpload(props) {
  const base_url = BackendUrl

  const { id, btc } = useParams()

  const { api_uploadSafDocument, api_listSafDocument, api_getAppicationFullDetail } = CitizenApplyApiList();

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

  const navigate = useNavigate()

  // THIS MODAL FIRST FILTER OUT THE CLICKED OWNER DOC LIST AND OWNER ID WITH filterModalDocumentData 
  const openModal = (ownerId, rowIndex) => {
    filterModalDocumentData(rowIndex)
    setcurrentOwnerId(ownerId)
    setvalRefresh(valRefresh + 1)
    setmodal(true)
    setIsOpen(true);
  }

  const closeModal = () => {
    setcurrentOwnerId(null)
    settempDoc(false)
    setIsOpen(false);
    setmodal(false)
    setIsOpen2(false)
    setpreview(preview + 1)
    console.log('modal m end => ', modal, tempDoc)
  }

  console.log(
    ".............data in full details card in bo doc upload.........",
    props?.applicationData2
  );
  console.log(
    "id in upload........",
    props?.id
  );

  useEffect(() => {
    fetchDocumentsToUpload()
  }, [refresh])

  useEffect(() => {

    setloader(true)

    axios.post(api_getAppicationFullDetail,
      {
        applicationId: id
      },
      ApiHeader())
      .then(function (response) {
        setloader(false)
        console.log('view full details...', response.data.data)
        setapplicationFullData(response?.data?.data?.fullDetailsData)
      })
      .catch(function (error) {
        setloader(false)
        console.log('==2 details by id error...', error)
      })
  }, [])

  const fetchDocumentsToUpload = () => {

    setloader(true)

    console.log('before fetch upload doc')
    axios.post(`${api_listSafDocument}`, { applicationId: id }, ApiHeader())
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


      console.log('before fetch doc to upload...', fd)
      axios.post(`${api_uploadSafDocument}`, fd, ApiHeader2())
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
            setrefresh(refresh + 1)
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
          toast.error('Something went wrongg !!!')
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
  console.log('filterred modal data......', currentOwnerUploadModalData)
  console.log('owner doc list ===>......', documentListToUpload?.ownersDocList)

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {loader && <BarLoader />}

      <div className='p-8 px-36 '>

        <TopTabs title="Upload-Documents" type="application" id={id} safNo={''} active="document" />

      </div>

      <div className="overflow-x-auto mx-auto w-full px-36">
        {documentListToUpload?.docUploadStatus == 1 && <div className="flex">
          <div className="flex-1 items-center text-yellow-600"><AiOutlineInfoCircle className="inline mr-2" />All Documents Has been uploaded, Pay your tax to send your application for verification</div>
          <div className="flex-1"><button className={`mr-4 bg-indigo-500  text-white' px-4 py-1 shadow-lg hover:scale-105 rounded-sm float-right text-white`} onClick={() => navigate(`/viewDemand/${id}`)}>Pay Tax</button></div>
        </div>}

        <div className="text-gray-700 py-6 ">
          <div className="grid md:grid-cols-2 text-sm bg-white shadow-lg rounded-sm py-4">
            {
              applicationFullData?.cardArray?.data?.map((data) => (
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">{data?.displayString} : </div>
                  <div className="px-4 py-2">{data?.value}</div>
                </div>
              ))
            }
          </div>
        </div>

        {(btc == true || btc == 'true') && <div className="text-red-500 font-semibold poppins 2xl:text-sm text-xs">You have been redirected as Back To Citizen.</div>}

        <div className="bg-white">
          {/* Owner documents */}
          {
            documentListToUpload?.ownerDocs &&
            <div className=" flex md:px-4 bg-white font-sans overflow-x-auto mt-10 py-6">
              <div className="w-full">
                <h1 className="text-xs">Owner Documents</h1>
                <div className="bg-white shadow-md rounded my-2">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-indigo-100 text-gray-600 capitalize text-sm leading-normal">
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Image
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Guardian Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Mobile
                        </th>
                        <th className="py-3 px-6 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light bg-white">
                      {/* front image */}
                      {documentListToUpload?.ownerDocs?.map((owner, index) => (
                        <tr className="border-b border-gray-200 ">

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center justify-center">

                              {owner?.ownerDetails?.uploadedDoc != '' &&
                                <div className="text-center cursor-pointer" onClick={() => modalFun(`${base_url}/${owner?.ownerDetails?.uploadedDoc}`)}>
                                  {/* {owner?.uploadoc} */}
                                  <img src={`${base_url}/${owner?.ownerDetails?.uploadedDoc}`} alt="" className="md:w-[3vw] w-[5vw]" srcset="" />
                                </div>
                              }
                              {
                                owner?.ownerDetails?.uploadedDoc == '' && <span className="text-red-500 font-semibold">Not Uploaded</span>
                              }

                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.ownerDetails?.name}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.ownerDetails?.guardian}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">
                                {owner?.ownerDetails?.mobile}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-6">
                            <div className="font-semibold text-sm">
                              <div className="">
                                {!loader && <button
                                  onClick={() => openModal(owner?.ownerDetails?.ownerId, index)}
                                  type="button"
                                  className=" px-4 py-1.5 bg-indigo-500 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 poppins hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Upload
                                </button>}
                              </div>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {/* Property type */}
          <div className=" flex md:px-4 bg-white font-sans overflow-x-auto py-6">
            <div className="w-full">
              <h1 className="text-xs">Property Documents</h1>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-100 text-gray-600 capitalize text-sm leading-normal">
                      <th className="py-3 px-6 text-center">#</th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        Document Name
                      </th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Document</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Remarks</th>
                      {/* <th className="py-3 px-6 text-center">Preview</th> */}
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
                            <span className="font-medium" value={doc?.docName}>
                              {
                                doc?.docType == 'R' && doc?.masters[0]?.docVal
                              }
                              {
                                doc?.docType == 'O' && ''
                              }
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <div className="font-semibold text-sm">
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
                          {
                            doc?.uploadedDoc?.documentCode == 'PHOTOGRAPH' &&
                            <p className="whitespace-no-wrap">
                            </p>
                          }
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

                        {/* <td className="py-3 px-6 text-center">
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
                        </td> */}

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
                                  onClick={() => submitData(doc?.docName)}
                                  type="submit"
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
          <div className="col-span-5 grid grid-cols-3 px-4">
            <div className="md:pl-0">

            </div>
            <div className="md:px-4 text-center"></div>
            <div className="md:pl-10 text-right"></div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <div className="absolute top-5 right-5 bg-red-200 hover:bg-red-300 rounded-full p-2 cursor-pointer" onClick={closeModal}>
            <ImCross />
          </div>
          <div className="flex md:pl-4 bg-white font-sans overflow-x-auto mt-6">
            <div className="w-full lg:w-4/6">
              <div className="font-semibold w-full flex">
                <div className="flex-1">
                  {/* {ownerList[ownerIndex]['ownerName']} */}
                </div>
                <div className="flex-1 text-center">
                  <span className="float-none">Upload Documents</span>
                </div>
              </div>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-100 text-gray-600 capitalize text-sm leading-normal">
                      <th className="py-3 px-6 text-left">#</th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        Document Name
                      </th>
                      <th className="py-3 px-6 text-left">Type</th>
                      <th className="py-3 px-6 text-center">Document</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Remarks</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light bg-white">
                    {/* front image */}
                    {currentOwnerUploadModalData?.documents?.map((doc, index) =>



                      <>

                        <tr className="border-b border-gray-200 ">
                          <td className="py-3 px-6 text-center font-semibold">{index + 1}</td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2 bg-white shadow-lg rounded-full p-2">
                                <img src={folders} alt="rain" className="w-4" />
                              </div>
                              <span className="font-medium">
                                {
                                  doc?.docType == 'R' && doc?.masters[0]?.docVal
                                }
                                {
                                  doc?.docType == 'O' && ''
                                }
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="font-semibold text-sm">
                              <div className="font-semibold text-sm">
                                <div className="">
                                  <select
                                    className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36"
                                    name="docId"
                                    onChange={handleChange2}
                                  >
                                    <option value="">
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
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            {doc?.uploadedDoc == '' ? <i className="font-semibold">N/A</i> :
                              <div className="flex items-center justify-center font-semibold text-[26px] cursor-pointer" onClick={() => modalFun(`${base_url}/${doc?.uploadedDoc?.docPath}`)}>

                                <div className="flex items-center">
                                  {doc?.uploadedDoc?.docPath?.split('.')[1] == 'pdf' &&
                                    <div className="flex-shrink-0 text-[28px]">
                                      <FcDocument />
                                    </div>
                                  }
                                  {doc?.uploadedDoc?.docPath?.split('.')[1] == 'jpg' &&
                                    <div className="flex-shrink-0">
                                      <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                    </div>
                                  }
                                  {doc?.uploadedDoc?.docPath?.split('.')[1] == 'jpeg' &&
                                    <div className="flex-shrink-0">
                                      <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                    </div>
                                  }
                                  {doc?.uploadedDoc?.docPath?.split('.')[1] == 'png' &&
                                    <div className="flex-shrink-0">
                                      <img src={`${base_url}/${doc?.uploadedDoc?.docPath}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                                    </div>
                                  }

                                </div>
                              </div>
                            }
                          </td>
                          <td className="py-3 px-6 text-center font-semibold">
                            {doc?.uploadedDoc == '' ? <span className="text-red-500 font-semibold">Not Uploaded</span> : <>
                              {
                                doc?.docName == "Photograph" ? '' : <>
                                  <p className="whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 0 && <>Pending</>}</p>
                                  <p className="text-green-500 whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 1 && <>Verified</>}</p>
                                  <p className="text-red-500 whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 2 && <>Rejected</>}
                                  </p></>
                              }

                            </>}
                          </td>

                          <td className="py-3 px-6">
                            {doc?.uploadedDoc?.remarks == "" ? <i className="font-semibold">N/A</i> : doc?.uploadedDoc?.remarks}
                            {doc?.uploadedDoc == '' && <i className="font-semibold">N/A</i>}
                          </td>


                          <td className="py-3 px-6">
                            <div className="font-semibold text-sm">
                              {(doc?.uploadedDoc?.verifyStatus != 1) && <>
                                <div className="">
                                  <input
                                    accept=".pdf,.jpg,.jpeg"
                                    type="file"
                                    onChange={handleChange}
                                    className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36"
                                  />
                                </div>
                                <div className="mt-2">
                                  {!loader && <button
                                    onClick={() => submitData(doc?.docName)}
                                    type="button"
                                    className=" px-4 py-1.5 bg-indigo-500 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 poppins hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                  >
                                    Upload
                                  </button>}
                                </div> </>}
                            </div>
                          </td>
                        </tr>
                      </>

                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div class=" rounded-lg shadow-xl border-2 ml-32 px-0" style={{ 'width': '60vw', 'height': '80vh' }}>

          <div className="absolute top-10 bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
            <ImCross />
          </div>

          {
            tempDoc ? <iframe className='w-full h-full' src={imageUrl} frameborder="0"></iframe> : <iframe className='w-full h-full' src={docUrl} frameborder="0"></iframe>
          }

        </div>

      </Modal>

    </>
  );
}

export default SafDocumentUpload;
