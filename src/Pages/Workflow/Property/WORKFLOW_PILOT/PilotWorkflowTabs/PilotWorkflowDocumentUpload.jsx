import { useContext, useState } from "react";
import rainWater from "@/Components/Media/storm.png";
import nav from "@/Components/Media/nav.png";
import { contextVar } from "@/Components/Context/Context";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import folder from "@/Components/Media/folders.png";
import Modal from "react-modal";
import { useEffect } from "react";
import axios from "axios";
import ApiHeader2 from "@/Components/ApiList/ApiHeader2";
import { toast, ToastContainer } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import { FcDocument } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import { IoIosArrowRoundForward } from 'react-icons/io'
import BackendUrl from "@/Components/ApiList/BackendUrl";
import BarLoader from "@/Components/Common/BarLoader";


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

function PilotWorkflowDocumentUpload(props) {
  const base_url = BackendUrl


  //destructuring notify function to activate toast
  const { notify } = useContext(contextVar);
  const [loader, setloader] = useState(false);
  const [propertyDocuments, setPropertyDocuments] = useState();
  const [ownerList, setownerList] = useState();
  const [ownerDoc, setownerDoc] = useState();
  const [docUpload, setdocUpload] = useState('');
  const [docUploadName, setdocUploadName] = useState("");
  const [docId, setdocId] = useState(0);
  const [docInd, setdocInd] = useState(0);
  const [refresh, setrefresh] = useState(0);
  const [modal, setmodal] = useState(false);
  const [doc, setdoc] = useState()
  const [docUrl, setdocUrl] = useState('')
  const [preview, setpreview] = useState(1)
  const [valRefresh, setvalRefresh] = useState(0)
  const [submitVal, setsubmitVal] = useState(0)
  const [imageUrl, setimageUrl] = useState()
  const [fileName, setfileName] = useState('')
  const [isImage, setisImage] = useState(true)
  const [tempDoc, settempDoc] = useState(false)
  const [ownerId, setownerId] = useState(null)
  const [documentListToUpload, setdocumentListToUpload] = useState()
  const [currentOwnerUploadModalData, setcurrentOwnerUploadModalData] = useState()

  const [currentOwnerId, setcurrentOwnerId] = useState(null)
  const [currentDocumentCode, setcurrentDocumentCode] = useState(null)


  let docIndex = 2;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => setIsOpen2(true)
  const afterOpenModal = () => { }

  // THIS MODAL FIRST FILTER OUT THE CLICKED OWNER DOC LIST AND OWNER ID WITH filterModalDocumentData 
  const openModal = (ownerId, rowIndex) => {
    filterModalDocumentData(rowIndex)

    // return
    setcurrentOwnerId(ownerId)
    // console.log("owner id => ", index)
    // setownerId(index)
    setvalRefresh(valRefresh + 1)
    setmodal(true)
    setIsOpen(true);
    // console.log("modal m1 => ", modal)
  }

  const closeModal = () => {
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

  }, [])

  const fetchDocumentsToUpload = () => {
    console.log('before fetch upload doc')
    setloader(true)
    axios
    [props?.api?.api_uploadDocumentShow?.method](props?.api?.api_uploadDocumentShow?.url, { applicationId: props?.id }, ApiHeader())
      .then((res) => {
        console.log("list of doc to upload at pilotworkflowdocumentupload => ", res?.data);
        setdocumentListToUpload(res?.data?.data)
        // ALL DOCUMENT UPLOAD STATUS TO SEND LEVEL RESTRICT
        props?.setallDocumentUploadStatus(res?.data?.data?.docUploadStatus)
        setloader(false)

      })
      .catch((err) => {
        console.log("data submission error bo doc upload => ", err);
        setmodal(false);
        setloader(false)
      })
  }


  // useEffect(() => {
  // }, [refresh])

  console.log('temp doc => ', tempDoc)

  // useEffect(() => {
  //   setdoc(props?.applicationData2?.uploadDocument)
  //   setvalRefresh(valRefresh + 1)
  //   props.refresh()
  // }, [props?.applicationData2])

  // useEffect(() => {
  //   console.log("owners documents list... => ", props?.applicationData2)
  //   setownerDoc(props?.applicationData2?.ownersDocList);
  //   setownerList(props?.applicationData2?.owners);
  //   console.log("owners => ", props?.applicationData2?.owners)
  //   setPropertyDocuments(props?.applicationData2?.propertyDocs);
  //   // setPropertyDocuments(props?.applicationData2?.uploadDocument);
  // }, [props?.applicationData2, valRefresh, refresh]);

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

  // useEffect(() => {
  //     propertyDocuments?.map((document) => {
  //         document?.docVal?.map((elem) => {
  //             elem?.id == docId && setdocUploadName(elem?.doc_name)
  //         })
  //     })
  // },[docId])

  // const modalData = (index, type, ownerindex) => {
  //   console.log("enter 1", index, type, ownerindex, modal)
  //   console.log(
  //     "bo doc upload index => ",
  //     index,
  //     "type => ",
  //     type,
  //     "ownerindex => ",
  //     ownerindex
  //   );
  //   setmodal(true);
  //   console.log("modal m2 => ", modal)
  //   funsub(index, type, ownerindex);
  // };

  // const funsub = (index, type, ownerindex) => {
  //   console.log("enter 2 modal m4", index, type, ownerindex, modal)
  //   modal == true && submitData(index, type, ownerindex);
  // };

  const submitDataTemp = (doc) => {
    console.log('at upload document middleware')
    setmodal(false)
    setdocUploadName(doc);
    setdocInd(docId);
    console.log("modal 1 => ", modal)
    setsubmitVal(submitVal + 1)
    // formik.handleSubmit()
    // console.log("docUploadName => ", docUploadName)  
  };

  // useEffect(() => {
  //   props.refresh()
  //   formik.handleSubmit();
  //   console.log("use effect in doc")
  //   console.log("use effect doc upload name => ", docUploadName, formik.values, formik.errors)
  // }, [docUploadName != '', submitVal])


  // const submitData = (index, type, ownerindex) => {
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
      docName: docRefName, // done coming
    }


    fd.append("applicationId", props?.id);
    if (currentOwnerId != null) {
      fd.append("ownerId", currentOwnerId);
    }
    fd.append(`docCode`, currentDocumentCode);
    fd.append(`document`, docUpload);
    // FOR TRADE CASE DOCNAME IS USED
    fd.append(`docName`, docRefName);

    // console.log("form data bo doc upload => ", fd);
    console.log("form data bo doc upload => ", requestBody); // requestbody just for debugging

    // return
    if (docUpload != '') {
      closeModal()
      setloader(true)


      console.log('before fetch doc to upload...', fd)
      axios
      [props?.api?.api_uploadDocument?.method](props?.api?.api_uploadDocument?.url, fd, ApiHeader2())
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
            props.refresh()
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
    // formik.setFieldValue('docId', e.target.value)
    // console.log('changing id use effect', e.target.value)
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

      {loader && (
        <div className="inline">
          <BarLoader />
        </div>
      )}

      <div className="overflow-x-auto ">

        <div className="px-4 font-semibold font-serif w-full">
          <span><img src={folder} alt="pin" className="w-8 inline" /> Bo Doc Upload</span>
          {/* {props?.allDocumentUploadStatus == 1 &&
            <button
              onClick={(e) => props?.handleChangeTabs(e, 2)}
              type="button"
              className="float-right px-4 py-1.5 bg-indigo-500 text-white text-xs leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Forward <IoIosArrowRoundForward className="inline font-bold text-xl" />
            </button>
          } */}
        </div>

        <div className="bg-white">
          {/* Owner documents */}
          {
            documentListToUpload?.ownerDocs &&
            <div className=" flex md:pl-4 bg-white font-sans overflow-x-auto mt-10">
              <div className="w-full lg:w-4/6">
                <h1 className="text-md font-semibold">Owner Documents</h1>
                <div className="bg-white shadow-md rounded my-2">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-sky-100 text-gray-600 capitalize text-sm leading-normal">
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Image
                        </th>
                        {/* <th className="py-3 px-6 text-left cursor-pointer">
                      Applicant Document
                    </th> */}
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Applicant Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Guardian Name
                        </th>
                        <th className="py-3 px-6 text-left cursor-pointer">
                          Mobile
                        </th>
                        {/* <th className="py-3 px-6 text-left">Applicant Image</th> */}
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
                                  className=" px-6 py-1.5 bg-blue-400 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
          <div className=" flex md:pl-4 bg-white font-sans overflow-x-auto mt-6">
            <div className="w-full lg:w-4/6">
              <h1 className="text-md font-semibold">Property Documents</h1>
              <div className="bg-white shadow-md rounded my-2">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-sky-100 text-gray-600 capitalize text-sm leading-normal">
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
                      {/* <th className="py-3 px-6 text-center">Upload</th> */}
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
                              <img src={folder} alt="rain" className="w-4" />
                            </div>
                            <span className="font-medium" value={doc?.docName}>
                              {doc?.docName}{doc?.docName}{(doc?.docType == 'OR' || doc?.docType == 'R') && <small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small>}
                            </span>

                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {(doc?.docType == 'OR' || doc?.docType == 'R') ? <span className="font-semibold text-red-400">Required</span> : <span>Optional</span>}
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
                                  // onClick={() => submitDataTemp(document?.docName)}
                                  onClick={() => submitData(doc?.docName)}
                                  // type="submit"
                                  // onClick={formik.handleSubmit}
                                  className=" px-4 py-1.5 bg-blue-400 text-white text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
                    <tr className="bg-sky-100 text-gray-600 capitalize text-sm leading-normal">
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
                                <img src={folder} alt="rain" className="w-4" />
                              </div>
                              <span className="font-medium">
                                {doc?.docName}{(doc?.docType == 'OR' || doc?.docType == 'R') && <small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small>}
                              </span>


                            </div>
                          </td>
                          <td>
                            <div className="font-semibold text-sm">
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
                                doc?.docName == 'Photograph' &&
                                <p className="whitespace-no-wrap">
                                </p>
                              }
                              {
                                doc?.docName != 'Photograph' &&
                                <>
                                  <p className="whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 0 && <>Pending</>}</p>
                                  <p className="text-green-500 whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 1 && <>Verified</>}</p>
                                  <p className="text-red-500 whitespace-no-wrap">
                                    {doc?.uploadedDoc?.verifyStatus == 2 && <>Rejected</>}
                                  </p>
                                </>
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
                                    accept={index == 0 ? '.png,.jpg,.jpeg' : '.pdf,.png,.jpg,.jpeg'}
                                    type="file"
                                    // name={doc?.docVal[0]?.doc_name}
                                    onChange={handleChange}
                                    className="form-control block w-full px-3 py-1 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md w-36"
                                  />
                                </div>
                                <div className="mt-2">
                                  {!loader && <button
                                    onClick={() => submitData(doc?.docName)}
                                    type="button"
                                    className=" px-6 py-1.5 bg-blue-400 text-white font-medium text-xs leading-tight capitalize rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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


      <h1 className="w-full mt-20"></h1>

    </>
  );
}

export default PilotWorkflowDocumentUpload;
