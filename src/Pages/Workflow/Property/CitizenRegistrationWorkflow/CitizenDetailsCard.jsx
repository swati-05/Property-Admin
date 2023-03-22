//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 08 august 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - CitizenDetailsCard
//    DESCRIPTION - CitizenDetailsCard Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
// import WardChip from '../WardChip'
import userImage from "./user.webp";
import { GrHomeRounded } from "react-icons/gr";
import Modal from "react-modal";
import CitizenFullDetailsCard from "./CitizenFullDetailsCard";
import { useQuery } from "react-query";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";

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

function CitizenDetailsCard(props) {
  const [cardData, setCardData] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSuccess = (data) => {
    console.log("Citizen by id   ", data.data[0]);
    setCardData(data.data);
  };
  console.log(".......id at detailscard.......", props.id);

  const header = ApiHeader()

  var { isLoading, data, isError, error, refetch } = useQuery(
    "Citizen-by-id",
    () => {
      return axios.get(
        `http://192.168.0.166/api/get-citizen-by-id/${props?.id}`,
        header
      );
    },
    {
      enabled: true,
      onSuccess,
    }
  );

  // useEffect(() => {
  //     {
  //         props?.id && (axios.get(`http://localhost:3001/citizenRegistraiton/${props.id}`) // all module list
  //             .then(function (response) {
  //                 console.log('citizendata........', response.data)
  //                 setCardData(response.data)
  //             })
  //             .catch(function (error) {
  //                 console.log(error);
  //             })
  //             .then(function () {
  //             }))
  //     }

  // }, [])

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2 shadow-xl">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    // src="https://avatars.githubusercontent.com/u/62421178?v=4"
                    src={userImage}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {cardData?.name}
                </h1>

                {/* <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-4 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>

                                </ul> */}
              </div>
              <div className="my-4 md:my-0"></div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-auto">
              <div className="bg-white p-3 shadow-xl rounded-sm pb-40">
                <div className="flex items-center pl-4 space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <GrHomeRounded />
                  </span>
                  <span className="tracking-wide animate__animated animate__rubberBand">
                    About Citizen
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="flex">
                      <div className="flex-initial px-4 py-2 font-semibold">
                        Citizen Name :
                      </div>
                      <div className="flex-initial px-4 py-2">
                        {cardData?.user_name}
                      </div>
                    </div>
                    <div className="flex wrap">
                      <div className="flex-initial px-4 py-2 font-semibold">
                        Email :
                      </div>
                      <div className="flex-initial px-4 py-2">
                        {cardData?.email}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-initial px-4 py-2 font-semibold">
                        Mobile :
                      </div>
                      <div className="flex-initial px-4 py-2">
                        {cardData?.mobile}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-initial px-4 py-2 font-semibold">
                        ULB :
                      </div>
                      <div className="flex-initial px-4 py-2">
                        {cardData?.ulb_name}
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Assessment Type</div>
                                            <div className='px-2 py-2'>
                                                <div className={' rounded-full shadow-lg px-4 py-2 text-center text-sm  ' + (props.applicationData?.assessment_type == 'New Assessment' ? 'bg-green-200 text-black border-2 border-white font-sans font-bold ' : '') + (props.applicationData?.assessment_type == 'Reassessment' ? 'bg-indigo-200 text-black border-2 border-white font-sans font-bold' : '') + (props.applicationData?.assessment_type == 'Mutation' ? 'bg-red-200 text-black border-2 border-white font-sans font-bold' : '')}>{props.applicationData?.assessment_type}</div>
                                            </div>
                                        </div> */}

                    {/* <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Assigned Ulb</div>
                                            <div className="px-4 py-2">Ranchi Municipal Corporation</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold"></div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href="mailto:jane@example.com"></a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold"></div>
                                            <div className="px-4 py-2"></div>
                                        </div> */}
                  </div>
                </div>
                {/* <button onClick={openModal}
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                    Full Information</button> */}
              </div>

              <div className="md:my-4"></div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          class="rounded-lg  shadow-xl pt-4 bg-gray-400 ml-40"
          style={{ width: "70vw", height: "70vh" }}
        >
          <div className="bg-gray-400">
            <CitizenFullDetailsCard />
            <CitizenFullDetailsCard />
            <CitizenFullDetailsCard />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CitizenDetailsCard;
/**
 * Exported to :
 * 1. PropertySafDetailsTabs Component
 *
 */
