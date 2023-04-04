import { Button } from "@mui/material";
import axios from "axios";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BarLoader from "@/Components/Common/BarLoader";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import PropertyApiList from '@/Components/ApiList/PropertyApiList'
import { contextVar } from "@/Components/Context/Context";
import useSetTitle from "@/Components/GlobalData/useSetTitle";
import BrandLoader from "@/Components/Common/BrandLoader";
import CommonModal from "@/Components/GlobalData/CommonModal";
import ServerErrorCard from "@/Components/Common/ServerErrorCard";
import { nullToNA } from "@/Components/Common/PowerUps/PowerupFunctions";
import BottomErrorCard from "@/Components/Common/BottomErrorCard";

function DeactivationFormComponent(props) {
  const [deactivationFile, setdeactivationFile] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [applicationFullData, setapplicationFullData] = useState()
  const [deactivationAppliedStatus, setdeactivationAppliedStatus] = useState(false)
  const { id } = useParams()
  const { api_getHoldingDeactivationDetails, api_postHoldingDeactivationApply } = PropertyApiList()
  const { notify } = useContext(contextVar)
  const [deactivationSubmitStatus, setdeactivationSubmitStatus] = useState(false);
  const [erroState2, seterroState2] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);

  const navigate = useNavigate()
  


  useSetTitle('Holding Deactivation')

  const validationSchema = yup.object({
    holdingDoc: yup.string().required("Upload proof of deactivation"),
    remark: yup.string().required("write comment for deactivation"),
  });


  const formik = useFormik({
    initialValues: {
      holdingDoc: "",
      remark: "",
    },

    onSubmit: (values, resetForm) => {
      console.log('onsumbt deactivation ', values)
      if (values.remark.length < 10) {
        notify('Please write atleast 10 character comment', "error");
        return
      }
      submitDeactivation()
    }
    , validationSchema
  })

  const fileSelectedHandler = (e) => {
    let file = e.target.files[0];
    setimageUrl(URL.createObjectURL(e.target.files[0]))
    setdeactivationFile(e.target.files[0]);
  };

  const submitDeactivation = () => {
    setisLoading2(true)

    let formData = new FormData();
    formData.append("propertyId", id);
    formData.append("document", deactivationFile);
    formData.append("comments", formik.values.remark);


    console.log('before apply holding deactivation ', formData)
    axios
      .post(api_postHoldingDeactivationApply, formData, ApiHeader())
      .then((res) => {
        console.log('submit deactivation response....', res?.data)
        if (res.data.status) {
          notify('Holding deactivation applied successfully !!', "success");
          setdeactivationSubmitStatus(true)
        } else {
          activateBottomErrorCard(true,'Error occured in submitting deactivation application. Please try again later.')
        }
        setisLoading2(false)

      })
      .catch((error) => {
        console.log('error at submit deactivation ', error);
        activateBottomErrorCard(true,'Error occured in submitting deactivation application. Please try again later.')
        setisLoading2(false)
      });
  };

  const handleChange = (e) => {
    let name = e.target.name
    { name == 'holdingDoc' && fileSelectedHandler(e) }
  }

  const getPropertyDetail = () => {
    seterroState2(false)
    setisLoading(true)
    console.log('before fetch property details in deactivation')
    axios.post(api_getHoldingDeactivationDetails, { propertyId: id }, ApiHeader())
      .then(function (response) {
        console.log('view prop prop full details...', response?.data)
        if (response?.data?.status) {
          setapplicationFullData(response?.data)
        } else {
          seterroState2(true)
        }
        setisLoading(false)
      })
      .catch(function (error) {
        console.log('==2 details by id error...', error)
        seterroState2(true)
        setisLoading(false)
      })
  }

  useEffect(() => {
    getPropertyDetail()
  }, [])

  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)

  }


  if (isLoading) {
    return (
      <>
        <BrandLoader />
      </>
    )
  }
  if (erroState2) {
    return (
      <CommonModal>
        <ServerErrorCard title="Server is busy" desc="Server is too busy to respond. Please try again later." buttonText="View Dashboard" buttonUrl="/propertyDashboard" />
      </CommonModal>
    )
  }

  return (
    <>
      {isLoading2 && <BarLoader />}
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      <div className='w-full bg-white shadow-xl mb-6'>
        <div className='py-6 mt-2 rounded-lg shadow-lg p-4'>
          <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(applicationFullData?.data?.holding_no)}</div>
              <div className='text-gray-500 text-xs'>Holding No.</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(applicationFullData?.data?.old_ward_no)}</div>
              <div className='text-gray-500 text-xs'>Ward No.</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-lg'>{nullToNA(applicationFullData?.data?.old_ward_no)}</div>
              <div className='text-gray-500 text-xs'>New Ward No</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(applicationFullData?.data?.ownership_type)}</div>
              <div className='text-gray-500 text-xs'>Ownership Type</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(applicationFullData?.data?.property_type)}</div>
              <div className='text-gray-500 text-xs'>Property Type</div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(applicationFullData?.data?.zone_mstr_id)}</div>
              <div className='text-gray-500 text-xs'>Zone</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm'>{nullToNA(applicationFullData?.data?.is_mobile_tower)}</div>
              <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(applicationFullData?.data?.is_hoarding_board)} </div>
              <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
            </div>
            <div className='flex-1'>
              <div className='font-semibold text-md'>{nullToNA(applicationFullData?.data?.is_petrol_pump)}</div>
              <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
            </div>
            <div className='flex-1'>
              <div className='font-bold text-sm' >{nullToNA(applicationFullData?.data?.is_water_harvesting)}</div>
              <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
            </div>
          </div>
        </div>

      </div>
      <div>

        {applicationFullData?.data?.deactivationStatus != 1 && !deactivationSubmitStatus && <form onSubmit={formik.handleSubmit} onChange={handleChange} encType="multipart/form" className="w-full bg-white shadow-xl py-5">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center pl-6 py-2">
            <label className="">Upload Document</label>

            <div className="text-xs text-gray-700 md:ml-4">
              <input {...formik.getFieldProps('holdingDoc')}
                type="file"
                accept='.pdf,.png,.jpg,.jpeg'
                className="mt-2 form-control block w-full px-3 py-2 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 foc}us:outline-none cursor-pointer shadow-md w-40"
              />
              <div>
                Only pdf, jpg, jpeg or png allowed.
              </div>

              <span className="text-red-600 absolute text-xs">{formik.touched.holdingDoc && formik.errors.holdingDoc ? formik.errors.holdingDoc : null}</span>
            </div>

            <div className="mt-10 md:mt-0">
              <label className="">
                Add Remarks
              </label>
            </div>
            <div className="md:ml-4">
              <textarea {...formik.getFieldProps('remark')}
                className="form-control block w-full px-3 py-1 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 foc}us:outline-none shadow-md w-60 "
                placeholder="Enter your remark"
              ></textarea>
              <span className="text-red-600 absolute text-xs">{formik.touched.remark && formik.errors.remark ? formik.errors.remark : null}</span>

            </div>
            <div className="md:ml-4">
              <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight  rounded  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mt-10 shadow-xl w-60" >
                Submit Deactivation Request
              </button>
            </div>

          </div>


        </form>}
        {
          deactivationSubmitStatus &&
          <div className="w-full h-full bg-white p-20">
            <div>
              <div className="text-center font-semibold text-3xl">Deactivation for this property has been applied.</div>
              <div className="text-center mt-6">
                <button type="button" className={`mr-4 bg-indigo-500  text-white px-6 py-1 shadow-lg hover:scale-105 rounded-sm`} onClick={() => navigate(`/search/fresh/direct/direct`)}>Search Holding</button>

              </div>
            </div>
          </div>
        }
        {
          (applicationFullData?.data?.deactivationStatus == 1 || deactivationAppliedStatus) &&

          // 7 > 6 &&
          <div>
            <h1 className="w-full text-center text-red-500 text-2xl font-semibold">Deactivation request already submitted !</h1>
          </div>
        }
      </div>

      <div className="w-full h-40 md:none"></div>
    </>
  );
}

export default DeactivationFormComponent;
