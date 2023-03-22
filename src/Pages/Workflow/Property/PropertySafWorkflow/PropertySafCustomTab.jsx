//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////
import { useState } from "react";
import PropertySafDocumentRow from "./PropertySafDocumentRow";
import Modal from "react-modal";
import dummy from "./dummy.pdf";
import PropertySafDocumentVerifyRow from "./PropertySafDocumentVerifyRow";
import PropertySafCustomTabRow from "./PropertySafCustomTabRow";
// import PropertyDaDetailsCard from './PropertyDaDetailsCard';
import TextArea from "@/Components/Shared/TextArea";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Popup } from "reactjs-popup";
import "animate.css";
import { useEffect } from "react";
import axios from "axios";
import apiList from "../../../../Components/ApiList/CustomTabApi";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import ApiHeader2 from "@/Components/ApiList/ApiHeader2";
import { FcDocument } from "react-icons/fc";
import { ColorRing } from "react-loader-spinner";
import "./Timeline.css";
import moment from "moment/moment";
// import '../font.css'
import {ImCross} from 'react-icons/im'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
  },
};
Modal.setAppElement("#root");

function PropertySafCustomTab(props) {
  const { getRemark, postRemark } = apiList();

  const [loader, setloader] = useState(false);
  const [documentUpload, setdocumentUpload] = useState([]);
  const [view, setview] = useState(true);
  const [tempFile, settempFile] = useState();
  const [tempData, settempData] = useState();
  const [refresh, setrefresh] = useState(0);
  const [role, setrole] = useState('')

  const formik = useFormik({
    initialValues: {
      remarks: "",
      document: "",
    },

    onSubmit: (values) => {
      console.log(
        "saf custom Getting custom tab values in formik function => ",
        values,
        "and id is => ",
        props?.id
      );
      submitFun(values);
    },
  });

  const submitFun = (values) => {

    let fd = new FormData();

    fd.append("id", props?.id);
    fd.append("customFor", "SAF");
    fd.append("remarks", values.remarks);
    fd.append("document", documentUpload);

    console.log("before send => ", fd);

    if (values.remarks == "" && tempFile == null) {
      toast.error("Please fill any field..");
    } else {
      setloader(true);
      axios
        .post(postRemark, fd, ApiHeader2())
        .then((res) => {
          console.log("submitted => ", res);
          setrefresh(refresh + 1);
          setview(true);
          setloader(false);
          toast.success("Submitted Successfully...");
          // formik.setFieldValue('remarks', '')
          // formik.setFieldValue('document', '')
          formik.resetForm()
        })
        .catch((err) => {
          console.log("ERror submission => ", err);
          setloader(false);
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "document") {
      let file = e.target.files[0];
      settempFile(e.target.files[0]);
      setdocumentUpload(e.target.files[0]);
      console.log("document file on change..", file);
    }
  };

  useEffect(() => {
    setrefresh(refresh + 1);
  }, []);

  useEffect(() => {

    console.log("role id => ", props?.roleId)

    props?.roleId == 11 && setrole("Back Office")
    props?.roleId == 6 && setrole("Dealing Assistant")

    setloader(true);
    axios
      .post(getRemark, { id: props?.id, customFor: "SAF" }, ApiHeader())
      .then((res) => {
        setloader(false);
        console.log("get remark data => ", res);
        settempData(res?.data?.data);
      })
      .catch((err) => {
        setloader(false);
        console.log("error get remark data => ", err);
      });
  }, [refresh]);

  // const [docList, setDocList] = useState([
  //   {
  //     docName: "Property Document",
  //     docUrl: "/dd",
  //     docStatus: "Rejected",
  //     docRemarks: "Upload Proper Document",
  //   },
  //   {
  //     docName: "Property Document",
  //     docUrl: "/dd",
  //     docStatus: "Rejected",
  //     docRemarks: "Upload Proper Document",
  //   },
  //   {
  //     docName: "Property Document",
  //     docUrl: "/dd",
  //     docStatus: "Rejected",
  //     docRemarks: "Upload Proper Document",
  //   },
  //   {
  //     docName: "Property Document",
  //     docUrl: "/dd",
  //     docStatus: "Rejected",
  //     docRemarks: "Upload Proper Document",
  //   },
  // ]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  let subtitle;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const afterOpenModal = () => {};

  const modalAction = (incomingDocUrl) => {
    console.log('incoming doc url modal => ', incomingDocUrl)
    setDocUrl(incomingDocUrl);
    openModal();
  };

  console.log('doc url modal => ', docUrl)

  const applicationData = {};

  const funDate =(dt) =>{
  //  let dtc  = new Date(dt);
  //  let tm = dtc.getTimezoneOffset()

   let temp = moment(dt)
   console.log("date => ", temp.format('lll'))

  // console.log("date => ", dtc.toLocaleTimeString('en-US'))

  return temp.format('lll')
}
 

  return (
    <>
      {/* <PropertyDaDetailsCard applicationData={applicationData} /> */}

      <div className="container mx-auto  max-w-3xl ml-0  px-1 py-1 shadow-lg rounded-lg w-full">
        {loader && (
          <div className="inline">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}

        

      {view ?
        <div
          className={
            `pb-4 visible text-xs text-gray-600 px-4 pt-2 w-full flex flex-col space-y-2 poppins`
              
          }
        >
          <div className="flex md:flex-row flex-col w-full md:justify-end items-between mt-2 mb-4 ">
            {/* <div onClick={() => setview(false)} className='cursor-pointer px-4 py-1.5 mx-6 mt-4 rounded-lg bg-blue-200 hover:bg-blue-300 shadow-lg text-xs'>Back</div> */}
          <div
              onClick={() => setview(false)}
              className="cursor-pointer px-4 py-1.5 mx-6 rounded-lg bg-green-200 hover:bg-green-300 shadow-lg text-xs"
            >
              Comment
            </div>

          </div>

          {
            tempData < 1 && 
            <div className="flex justify-center items-center w-full">
              <span className="bg-red-100 px-4 py-1.5 rounded-sm shadow-sm">👉Click comment to add comment on this application.👈</span>
            </div>
          }

          <div className="w-full flex flex-wrap justify-evenly timeline-container text-xs text-gray-800 poppins">

            {tempData?.map((elem) => (
               <>
               {elem?.type == "text" && elem?.customFor == "SAF" && (
                 <div className="timeline-item">
                   <div className="timeline-item-content bg-amber-200 mb-2 mr-2  px-4 py-1 pt-1.5 rounded-md shadow-lg w-[50%] flex flex-col  justify-center">
                     <span className="tag"></span>
                     <div className="uppercase text-[14px] mb-1 font-semibold">{role}</div>
                     <time>Date : <span className="font-semibold"> {funDate(elem?.date)}</span></time>
                     <p>Remarks : <span className="font-semibold">{elem?.remarks}</span> </p>
                     <span className="circle" />
                   </div>
                 </div>
               )}

               {elem?.type == "file" && elem?.customFor == "SAF" && (
                 <div className="timeline-item">
                   <div className="timeline-item-content bg-amber-200 mb-2 mr-2  px-4 py-1 pt-1.5 rounded-md shadow-lg w-[50%] flex flex-col  justify-center">
                     <span className="tag"></span>
                     <div className="uppercase text-[14px] mb-1 font-semibold">{role}</div>
                     <time>Date : <span className="font-semibold"> {elem?.date}</span></time>
                     <div className="flex flex-row flex-wrap gap-2">
                       <span className="text-xs">Document :{" "}</span>
                       <div className="font-semibold cursor-pointer text-2xl" onClick={() => modalAction(elem?.docUrl)}>
                         <FcDocument />
                       </div>{" "}
                     </div>
                     <span className="circle" />
                   </div>
                 </div>
               )}

               {elem?.type == "both" && elem?.customFor == "SAF" && (
                 <div className="timeline-item">
                   <div className="timeline-item-content bg-amber-200 mb-2 mr-2  px-4 py-1 pt-1.5 rounded-md shadow-lg w-[50%] flex flex-col  justify-center">
                     <span className="tag"></span>
                     <div className="uppercase text-[14px] mb-1 font-semibold">{role}</div>
                     <time>Date : <span className="font-semibold"> {elem?.date}</span></time>
                      <p>Remarks : <span className="font-semibold">{elem?.remarks}</span></p>
                     <div className="flex flex-row flex-wrap gap-2">
                       <span className="text-xs">Document :{" "}</span>
                       <div className="font-semibold cursor-pointer text-2xl" onClick={() => modalAction(elem?.docUrl)}>
                         <FcDocument />
                       </div>{" "}
                     </div>
                     <span className="circle" />
                   </div>
                 </div>
               )}
             </>
            ))}
          </div>
        </div> 
        :

        <form
          className={ `pb-4 visible poppins` }
          onSubmit={formik.handleSubmit}
        >
           <div
              onClick={() => setview(true)}
              className="cursor-pointer px-4 py-1.5 mx-6 mt-4 rounded-lg bg-green-200 hover:bg-green-300 shadow-lg text-xs w-max mb-4"
            >
              Comment List
            </div>

          <div className="flex flex-wrap md:flex-row flex-col md:justify-evenly items-evenly space-y-2 ">
            {/* Remarks */}
            <div className="flex flex-col  w-[40%] space-y-2 mb-2">
              <label
                htmlFor="remarks"
                className="text-zinc-500 uppercase text-xs font-semibold"
              >
                Remarks
              </label>
              <textarea
                name="remarks"
                onChange={formik.handleChange}
                className="bg-gray-100 text-xs border-2 border-gray-400 rounded-md px-4 py-2 shadow-md"
                placeholder="Write your remarks here..."
              />
            </div>

            {/* Documents */}
            <div className="flex flex-col w-[40%] space-y-2">
              <label
                className="text-zinc-500 uppercase text-xs font-semibold"
                htmlFor="document"
              >
                Document :{" "}
              </label>
              <input accept=".pdf,.jpg,.jpeg"
                type="file"
                name="document"
                id="document"
                onChange={handleChange}
                className="form-control block w-full px-3 py-1.5 text-base md:text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer shadow-md "
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:justify-between items-between">
            <div
             >
            </div>

            <button
              type="submit"
              className="px-4 py-1.5 mx-6 mt-4 rounded-lg bg-blue-200 hover:bg-blue-300 shadow-lg text-xs"
            >
              Submit
            </button>
          </div>
        </form>}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          class=" rounded-lg shadow-xl border-2 border-gray-50 ml-32 px-0"
          style={{ 'width': '60vw', 'height': '80vh' }}
        >

           <div className="absolute top-10 bg-red-200 hover:bg-red-300 right-10 rounded-full p-2 cursor-pointer" onClick={closeModal}>
                    <ImCross/>
                  </div>

          <iframe
            className="w-full h-full"
            src={docUrl}
            frameborder="0"
          ></iframe>
        </div>
      </Modal>
    </>
  );
}

export default PropertySafCustomTab;
