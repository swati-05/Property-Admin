//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 july 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - WorkflowList
//    DESCRIPTION - WorkflowList Component which includes following functionality
//                  1. Shows list of workflow
//                  2. Addition of workflow
//                  3. updation of workflow
//                  4. deletion of workflow
//                  5. view individual workflow
//
//                  1 ADDITION OF WORKFLOW
//                  ==================================
//                  -get-addition-form-details-
//                  api - getWorkflowNameMstr
//                  api - getUlbListMstr
//                  api - getModuleListMstr
//                  api - getDesignationListMstr
//                  api - getCandidateListMstr
//
//                  --save-form-data--
//                  api - postAddWorkflow
//
//
//                  2 Updation OF WORKFLOW
//                  ==================================
//                  -get-updation-form-details-
//                  api - getEditWorkflowDtl
//                  api - getWorkflowNameMstr
//                  api - getUlbListMstr
//                  api - getModuleListMstr
//                  api - getDesignationListMstr
//                  api - getCandidateListMstr
//
//                  --save-form-data--
//                  api - postWorkflowUpdate
//
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ListTable from "@/Components/Common/ListTable/ListTable";
import { CgPlayListAdd } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { GrDocumentUpdate } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { GrFormView } from "react-icons/gr";
import submitFormImage from "@/Pages/WorkflowMaster/ill.svg";
import deleteImage from "@/Components/WorkflowMaster/delete.svg";
import Multiselect from "multiselect-react-dropdown";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BarLoader from "../Common/BarLoader";

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
// Modal.setAppElement('#root');
Modal.setAppElement("#modal");

function WorkflowList(props) {
  const [togleModalCount, setTogleModalCount] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [customLoader, setCustomLoader] = useState(false);
  const [worflowCandidatesList, setWorflowCandidatesList] = useState([]);
  const [delteworkflowName, setDelteworkflowName] = useState("");
  const [deleteWorkflowId, setdeleteWorkflowId] = useState("");
  const [updateworkflowId, setUpdateworkflowId] = useState(null);
  const [workflowNameListMstr, setWorkflowNameListMstr] = useState([]);
  const [ulbListMstr, setulbListMstr] = useState();
  const [moduelListMstr, setmoduelListMstr] = useState();
  const [candidateListMstr, setcandidateListMstr] = useState([]);
  // ?? to remove initiator and finisher then show rest candidates ?? pending..................
  const [multiCandiddate, setmultiCandiddate] = useState([]);
  //to manage multiselect candidates input without formik
  const [candidateInput, setCandidateInput] = useState([]);
  const [candidateError, setCandidateError] = useState("");
  //to show only selected candidates not all
  const [initiatorList, setinitiatorList] = useState([]);
  const [finisherList, setfinisherList] = useState([]);
  // to filter onchange initiator and finisher
  const [initiatorFinisherReferenceList, setinitiatorFinisherReferenceList] =
    useState([]);
  //to store all workflow list
  const [allWorkflowList, setAllWorkflowList] = useState([]);

  const notify = (toastData, actionFlag) => {
    toast.dismiss();
    {
      actionFlag == "delete" && toast.error(toastData);
    }
    {
      actionFlag == "update" && toast.info(toastData);
    }
    {
      actionFlag == "save" && toast.success(toastData);
    }
    // toast.info(toastData)
  };
  const validationSchema = yup.object({
    workflowName: yup
      .string()
      .required("Enter Workflow Name")
      .max(50, "Enter maximum 50 characters"),
    ulb: yup.string().required("Select ulb"),
    module: yup.string().required("Select module"),
    initiator: yup.string().required("Select Initiator"),
    finisher: yup.string().required("Select Finisher"),
  });
  const formik = useFormik({
    initialValues: {
      workflowName: "",
      ulb: "",
      module: "",
      initiator: "",
      finisher: "",
    },

    onSubmit: (values, resetForm) => {
      setCustomLoader(true);
      console.log("form data final at submit", values);
      saveUpdateWorflow();
    },
    validationSchema,
  });

  function openModal() {
    setIsOpen(true);
  }
  function openModal2(worflowId, workflowName) {
    document.getElementById("root").style.filter = "blur(3px)";
    setDelteworkflowName(workflowName);
    setdeleteWorkflowId(worflowId);
    setIsOpen2(true);
  }

  function closeModal() {
    document.getElementById("root").style.filter = "none";
    setIsOpen(false);
    formik.resetForm();
    setCustomLoader(false);
  }
  function closeModal2() {
    document.getElementById("root").style.filter = "none";
    setIsOpen2(false);
  }

  const saveUpdateWorflow = () => {
    //data transformation to send to server
    const requestBody = {
      ulbID: formik.values.ulb,
      moduleID: formik.values.module,
      workflowID: formik.values.workflowName,
      initiator: formik.values.initiator,
      finisher: formik.values.finisher,
      candidates: formik.values.candidateInputList,
    };
    // console.log('id to updat ',updateworkflowId)
    // console.log('request body data ', requestBody)
    // return

    if (updateworkflowId != null) {
      axios
        .put(
          `http://192.168.0.166/api/crud/ulb-workflow-masters/${updateworkflowId}`,
          requestBody,
          header
        )
        .then(function (response) {
          setCustomLoader(false);
          notify("Worflow Update Successfully", "update");
          closeModal();
          refetch();
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else {
      // axios.post('http://localhost:3001/workflowList', {
      axios
        .post(
          "http://192.168.0.166/api/crud/ulb-workflow-masters",
          requestBody,
          header
        ) // post workflow
        .then(function (response) {
          setCustomLoader(false);
          notify("Worflow Saved Successfully", "save");
          refetch();
          closeModal();
          // refetch()
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  };

  const header =ApiHeader()
  const addEditWorflow = (worflowId = null) => {
    console.log("workflow id  ....", worflowId);
    document.getElementById("root").style.filter = "blur(4px)";
    {
      formik.resetForm(); //reset form to remove all selected data
      formik.values.workflowName = "";
      formik.values.ulb = "";
      formik.values.module = "";
      formik.values.initiator = "";
      formik.values.finisher = "";
      setCandidateInput([]); //reset to non selected candidate
      setinitiatorList([]);
      setfinisherList([]);
    }
    openModal();
    setUpdateworkflowId(null);
    // edit case
    if (worflowId != null) {
      setUpdateworkflowId(worflowId);
      // axios.get(`http://localhost:3001/getWorkflowList/${worflowId}`)
      axios
        .get(
          `http://192.168.0.166/api/crud/ulb-workflow-masters/${worflowId}`,
          header
        ) // for live api
        .then(function (response) {
          console.log("edit workflow data ", response.data);
          // return
          formik.values.workflowName = response.data[0].workflow_id;
          formik.values.ulb = response.data[0].ulb_id;
          formik.values.module = response.data[0].module_id;
          formik.values.initiator = response.data[0].initiator;
          formik.values.finisher = response.data[0].finisher;
          const candidateIdJsonArray = response.data[0].candidate_id.map(
            (candidateId) => {
              return { id: candidateId };
            }
          );
          const candidateNameJsonArray = response.data[0].candidate_name.map(
            (candidateName) => {
              return { name: candidateName };
            }
          );
          //making required array for multiple candidate list
          const finalAray = candidateIdJsonArray.map((id, index) => {
            return { id: id.id, name: candidateNameJsonArray[index].name };
          });
          // console.log('cannnnddd ', candidateIdJsonArray)
          // console.log('cannnnddd Name ', candidateNameJsonArray)
          // console.log('final array  ', finalAray)
          setCandidateInput(finalAray);
          setinitiatorList(finalAray);
          setfinisherList(finalAray);
          // setCandidateInput(response.data[0].candidate_id)
          // openModal()
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
    // axios.get('http://localhost:3001/getWorkflowNameMstr')
    axios
      .get("http://192.168.0.166/api/all-workflows", header) // all workflow list
      .then(function (response) {
        setWorkflowNameListMstr(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    // axios.get('http://localhost:3001/getUlbListMstr')
    axios
      .get("http://192.168.0.166/api/get-all-ulb", header) //all ulb list
      .then(function (response) {
        console.log("ulbLIst  ....", response.data);
        setulbListMstr(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    // axios.get('http://localhost:3001/getModuleListMstr')
    axios
      .get("http://192.168.0.166/api/crud/module-masters/create", header) // all module list
      .then(function (response) {
        setmoduelListMstr(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    const tempCanList = [
      { id: 36, name: "Dipu Don" },
      { id: 37, name: "Henry" },
      { id: 38, name: "Benry" },
    ];
    axios
      .get("http://192.168.0.16:8000/api/get-all-users", header) // all user list
      .then(function (response) {
        //filtering the incoming data for multiselect
        const candidateList = response.data
          .filter((data) => {
            return data.user_name != null;
          })
          .map((candidate) => {
            return { id: candidate.id, name: candidate.user_name };
          });

        console.log("List of candidatees .............", candidateList);
        setcandidateListMstr({ options: candidateList });
        // setcandidateListMstr({ options: tempCanList })

        // setinitiatorList({ options: candidateList })
        // setfinisherList({ options: candidateList })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  const deleteWorkflow = () => {
    // console.log('workflow id to delete ',deleteWorkflowId)
    // return
    axios
      .delete(
        `http://192.168.0.166/api/crud/ulb-workflow-masters/${deleteWorkflowId}`,
        header
      )
      .then(function (response) {
        setCustomLoader(false);
        notify(`${delteworkflowName} Worflow Deleted Successfully`, "delete");
        closeModal2();
        refetch();
        setDelteworkflowName(null);
        setdeleteWorkflowId(null);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };
  const passWorkflowData = (viewId) => {
    // console.log('view -------id--------- ',viewId)
    // // return
    // console.log('data to filter ',data.data)
    // return
    const dataToPass = data.data.filter((data) => {
      return data.id == viewId;
    });
    console.log("data to view ", dataToPass);
    // return
    props.fun(dataToPass[0]);
  };
  const COLUMNS = [
    //preparing coloumns to pass in the table component

    {
      Header: "#",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      Header: "Workflow Name",
      accessor: "workflow_name",
    },

    {
      Header: "Ulb",
      accessor: "ulb_name",
    },
    {
      Header: "Initiator",
      accessor: "initiator_name",
    },
    {
      Header: "Finisher",
      accessor: "finisher_name",
    },

    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <div className="flex gap-4">
          <button
            onClick={() => addEditWorflow(cell.row.values.id)}
            className="flex-initial bg-green-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-black flex items-center"
          >
            <FiEdit className="inline" />
            &nbsp;Edit
          </button>
          <button
            onClick={() =>
              openModal2(cell.row.values.id, cell.row.values.workflowName)
            }
            className="flex-initial bg-red-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-red-800 hover:text-white text-black items-center flex"
          >
            <MdDeleteForever className="inline" />
            Delete
          </button>
          <button
            onClick={() => passWorkflowData(cell.row.values.id)}
            className="flex-initial bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black items-center flex"
          >
            <GrFormView className="inline text-lg" />
            View
          </button>
        </div>
      ),
    },
  ];

  let fetchh = 0;
  const onSuccess = (data) => {
    console.log("fetch 1 .......", fetchh++);
    setAllWorkflowList(data.data);
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "workflow-list",
    () => {
      return axios.get(
        "http://192.168.0.166/api/crud/ulb-workflow-masters/create",
        header
      );
    },
    {
      onSuccess,
    }
  );

  if (!isLoading) {
    console.log("wwww data full workflow.....", data);
  }

  //onSelect function listner for candidate select input
  function onSelectCandidate(selectedList, selectedItem) {
    setCandidateInput([...candidateInput, selectedItem]);
    setCandidateError("");
    //1 set initiator
    setinitiatorList([...initiatorList, selectedItem]);
    //set finisher
    setfinisherList([...finisherList, selectedItem]);
    setinitiatorFinisherReferenceList([
      ...initiatorFinisherReferenceList,
      selectedItem,
    ]);
  }

  console.log("initiator list  ....", initiatorList);
  console.log("finisher list  ....", finisherList);

  //onRemove function listner for candidate select input
  function onRemoveCandidate(selectedList, removedItem) {
    let removedItemIndex = candidateInput.indexOf(removedItem);
    let tempcandidateInput = [...candidateInput];
    const removedList = tempcandidateInput.filter((ct) => {
      if (tempcandidateInput.indexOf(ct) == removedItemIndex) {
      } else {
        return ct;
      }
    });
    // setCandidateInput(current =>
    //     current.filter(ct => {
    //         if (current.indexOf(ct) == removedItemIndex) {
    //         } else {
    //             return ct
    //         }
    //     }),
    // );
    //multiple candidate list
    setCandidateInput(removedList);
    //2 remove initiatorList
    setinitiatorList(removedList);
    //remove finisherList
    setfinisherList(removedList);
    //remove initiator finsher reference
    setinitiatorFinisherReferenceList(removedList);

    //3 remove inititaor and finisher if selected via formik
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (candidateInput == "") {
      setCandidateError("Select candidate");
      return;
    }

    const finalCandidateList = candidateInput.map((data) => {
      return data.id;
    });
    formik.values.candidateInputList = finalCandidateList;
    formik.handleSubmit(); //formik submit not working inside function
  };

  // to remove selected elements from initiator list and finisher list
  const handleChange = (e) => {
    // console.log('...change value ', e.target.value)
    // return
    // let removedItemIndex = formik.values.candidateInputList.indexOf(e.target.value)
    // //4 set initiatorlist and finisher list if any one of them changes
    // if (e.target.name == 'initiator') { //filter from selected candidate list
    //     // let tempcandidateInput = [...candidateInput]
    //     const removedList = formik.values.candidateInputList.filter(ct => {
    //         if (formik.values.candidateInputList.indexOf(ct) == removedItemIndex) {
    //         } else {
    //             return ct
    //         }
    //     })
    //     setfinisherList(removedList)
    // }
    // if (e.target.name == 'finisher') { //filter from selected candidate list
    //     // let tempcandidateInput = [...candidateInput]
    //     const removedList = formik.values.candidateInputList.filter(ct => {
    //         if (formik.values.candidateInputList.indexOf(ct) == removedItemIndex) {
    //         } else {
    //             return ct
    //         }
    //     })
    //     setinitiatorList(removedList)
    // }
  };

  return (
    <>
      <button
        onClick={() => addEditWorflow()}
        className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
      >
        <CgPlayListAdd />
        Add
      </button>
      <ToastContainer position="top-right" autoClose={2000} />
      {isLoading && <BarLoader />}
      {isError && <ErrorPage />}
      {!isLoading && !isError && (
        <ListTable columns={COLUMNS} dataList={data?.data}>
          <button
            onClick={() => addEditWorflow()}
            className="float-right bg-green-500 px-3 py-1 rounded-sm shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white text-white flex items-center"
          >
            <CgPlayListAdd />
            Add
          </button>
        </ListTable>
      )}
      {/* edit modal component */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg shadow-xl border-8 border-white z-50">
          {updateworkflowId == null && (
            <h1 className="text-center bg-white text-gray-800 border-t border-gray-400 text-lg font-semibold py-1">
              <CgPlayListAdd className="inline text-3xl" /> Add Worflow
            </h1>
          )}
          {updateworkflowId != null && (
            <h1 className="text-center bg-white text-gray-800 border-t border-gray-400 text-lg font-semibold py-1 ">
              <GrDocumentUpdate className="inline text-xl" /> Update Worflow
            </h1>
          )}

          <div
            className={`p-10 px-10 pb-32 ${
              updateworkflowId == null ? "bg-green-400" : "bg-gray-400"
            }   text-white`}
            style={{ width: "60vw" }}
          >
            {/* <form className=" md:w-full md:grid md:grid-cols-2 md:gap-x-8" onSubmit={formik.handleSubmit}> */}
            <form
              className=" md:w-full md:grid md:grid-cols-2 md:gap-x-8"
              onChange={handleChange}
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Select Workflow
                </label>
                <select
                  {...formik.getFieldProps("workflowName")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg cursor-pointer"
                >
                  <option value="" disabled>
                    == select ==
                  </option>
                  {workflowNameListMstr?.map((option) => (
                    <option value={option.id}>{option.workflow_name}</option>
                  ))}
                </select>
                <span className="text-red-600 absolute">
                  {formik.touched.workflowName && formik.errors.workflowName
                    ? formik.errors.workflowName
                    : null}
                </span>
              </div>
              <div className="mb-4">
                <label className={"block text-sm font-medium"}>
                  Select ULB
                </label>
                <select
                  {...formik.getFieldProps("ulb")}
                  className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-lg cursor-pointer"
                >
                  <option value="_">== Select ==</option>
                  {ulbListMstr?.map((option) => (
                    <option value={option.id}>{option.ulb_name}</option>
                  ))}
                </select>
                <span className="text-red-600 absolute">
                  {formik.touched.ulb && formik.errors.ulb
                    ? formik.errors.ulb
                    : null}
                </span>
              </div>
              <div className="mb-4">
                <label className={"block text-sm font-medium"}>
                  Select Module
                </label>
                <select
                  {...formik.getFieldProps("module")}
                  className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-lg cursor-pointer"
                >
                  <option value="_">== Select ==</option>
                  {moduelListMstr?.map((option) => (
                    <option value={option.id}>{option.module_name}</option>
                  ))}
                </select>
                <span className="text-red-600 absolute">
                  {formik.touched.module && formik.errors.module
                    ? formik.errors.module
                    : null}
                </span>
              </div>
              <div className="mb-4">
                <label className={"block text-sm font-medium"}>
                  Select Canidates
                </label>
                {/* <select multiple {...formik.getFieldProps('candidates')} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-lg" >
                                    <option value="_">== Select ==</option>
                                    {userList?.map((option) => (
                                        <option value={option.name}>{option.name}</option>
                                    ))}

                                </select>
                                <span className="text-red-600">{formik.touched.candidates && formik.errors.candidates ? formik.errors.candidates : null}</span> */}
                <div className="bg-white text-black cursor-pointer rounded-lg shadow-lg">
                  <Multiselect
                    options={candidateListMstr?.options} // Options to display in the dropdown
                    selectedValues={candidateInput} // Preselected value to persist in dropdown
                    onSelect={onSelectCandidate} // Function will trigger on select event
                    onRemove={onRemoveCandidate} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <span className="text-red-600">{candidateError}</span>
              </div>
              <div className="mb-4">
                <label className={"block text-sm font-medium"}>
                  Select Initiator
                </label>
                <select
                  {...formik.getFieldProps("initiator")}
                  className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-lg cursor-pointer"
                >
                  <option value="_">== Select ==</option>
                  {initiatorList?.map((option) => (
                    <option value={option.id}>{option.name}</option>
                  ))}
                </select>
                <span className="text-red-600">
                  {formik.touched.initiator && formik.errors.initiator
                    ? formik.errors.initiator
                    : null}
                </span>
              </div>

              <div className="mb-4">
                <label className={"block text-sm font-medium"}>
                  Select Finisher
                </label>
                <select
                  {...formik.getFieldProps("finisher")}
                  className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-lg cursor-pointer"
                >
                  <option value="_">== Select ==</option>
                  {finisherList?.map((option) => (
                    <option value={option.id}>{option.name}</option>
                  ))}
                </select>
                <span className="text-red-600">
                  {formik.touched.finisher && formik.errors.finisher
                    ? formik.errors.finisher
                    : null}
                </span>
              </div>

              <div className="text-left col-span-2 relative top-20">
                <div className="col-span-2">
                  {updateworkflowId == null && !customLoader && (
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="text-white bg-green-700 border-2 border-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-400 hover:shadow-2xl"
                    >
                      Submit
                    </button>
                  )}
                  {updateworkflowId != null && !customLoader && (
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="text-white bg-blue-700 border-2 border-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-500 hover:shadow-2xl"
                    >
                      Update
                    </button>
                  )}
                  {customLoader && <BarLoader />}
                </div>
              </div>
            </form>
          </div>

          <img
            src={submitFormImage}
            className=" w-40 absolute bottom-0 right-10"
            alt="image"
          />
        </div>
      </Modal>

      {/* delete modal */}
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative bg-white rounded-lg shadow-2xl border-2 border-gray-50 rounded">
          <div className="p-10 px-10 md:w-96 bg-red-500  text-center">
            <h1 className="text-white text-lg">
              Do you want to delete{" "}
              <b>
                <i>{delteworkflowName}</i>
              </b>{" "}
              workflow ?
            </h1>
            <img src={deleteImage} alt="deleteImage" />

            <button
              onClick={deleteWorkflow}
              className="bg-white text-red-800 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-red-900 hover:text-white hover:shadow-3xl md:mr-3 font-semibold"
            >
              <MdDeleteForever className="inline" />
              Delete
            </button>
            <button
              onClick={closeModal2}
              className="bg-gray-400 border border-white shadow-lg rounded-lg px-2 py-1 text-white  mt-5 text-lg hover:bg-gray-700 hover:shadow-2xl md:ml-3"
            >
              <TiCancel className="inline text-2xl" />
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WorkflowList;
/**
 * Exported to :
 * 1. WorkFlow Component
 *
 */
