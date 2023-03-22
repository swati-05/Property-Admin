import { useState, useEffect } from 'react'
import Login from "@/Pages/Auth/Login";
import './App.css'
import ApiHeader from '@/Components/ApiList/ApiHeader';
import { connect } from "react-redux";
import CustomErrorBoundaryForRoutes from '@/Components/Errors/CustomErrorBoundaryForRoutes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import LandingHomeDashBoard from '@/Pages/Home/LandingHomeDashBoard';
import Sidebar from "@/Components/Common/Sidebar/Sidebar";
import Header from "@/Components/Common/Header/Header";
import WorkflowMaster from "@/Pages/WorkflowMaster/WorkflowMaster";
import { contextVar } from "@/Components/Context/Context";
import UserPermission from "@/Pages/UserPermission/UserPermission";
import GovSafApplicationFormIndex from "@/Pages/PropertyEntryForms/GovSafApplicationForm/GovSafApplicationFormIndex";
import ColonySafApplicationFormIndex from "@/Pages/PropertyEntryForms/ColonySafEntryForm/ColonySafApplicationFormIndex";
import ObjectionFormIndex from "@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionFormIndex";
import "animate.css";
import UserRole from "@/Pages/UserRole/UserRole";
import ClusterFormIndex from "@/Pages/Property/ClusterForms/ClusterFormIndex";
import ObjectionIndex from "@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionIndex";
import ObjectionRectificationTable from "@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionRectificationTable";
import ObjectionForgery from "@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionForgery";
import SearchIndex from "@/Pages/Search/SearchIndex";
import PropApplicationDetailById from "@/Pages/Property/PropApplicationView/PropApplicationDetailById";
import AppliedApplicationSearch from "@/Pages/Search/AppliedApplicationSearch";
import ActiveSafApplicationDeatilsByid from "@/Pages/Property/PropApplicationView/ActiveSafApplicationDeatilsByid";
import ActiveSafDemandDetails from "@/Pages/Property/PropApplicationView/ActiveSafDemandDetails";
import PropertyDemandDetails from "@/Pages/Property/PropApplicationView/PropertyDemandDetails";
import ActiveSafPaymentDetail from "@/Pages/Property/PropApplicationView/ActiveSafPaymentDetail";
import PropertyPaymentDetails from "@/Pages/Property/PropApplicationView/PropertyPaymentDetails";
import ConcessionForm from "@/Pages/Property/PropertyEntryForms/ConcessionForm/ConcessionForm";
import CitizenPropSafUpdateFormIndex from "@/Pages/Workflow/Property/PropertySafWorkflow/SafApplicationForm/CitizenPropSafUpdateFormIndex";
import PaymentDashboard from "@/Pages/PaymentMaster/PaymentDashboard";
import ConcessionWorkflowEntry from "@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Concession-Workflow/ConcessionWorkflowEntry";
import HarvestingWorkflowEntry from "@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Harvesting-Workflow/HarvestingWorkflowEntry";
import ObjectionWorkflowEntry from "@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Objection-Workflow/ObjectionWorkflowEntry";
import HoldingDeactivationWorkflowEntry from "@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Holding-Deactivation-Workflow/HoldingDeactivationWorkflowEntry";
import SafDetailsEntry from "@/Pages/Property/DetailsFactory/SafDetailsEntry/SafDetailsEntry";
import ConcessionDetailsEntry from "@/Pages/Property/DetailsFactory/ConcessionDetailsEntry/ConcessionDetailsEntry";
import ObjectionDetailsEntry from "@/Pages/Property/DetailsFactory/ObjectionDetailsEntry/ObjectionDetailsEntry";
import HarvestingDetailsEntry from "@/Pages/Property/DetailsFactory/HarvestingDetailsEntry/HarvestingDetailsEntry";
import ViewDemandDetails from "@/Pages/Property/DetailsFactory/ViewDemandDetails";
import PropApplicationFullDetail_Property from "@/Pages/Property/DetailsFactory/PropApplicationFullDetail_Property";
import DemandDetailsHoldingProperty from "@/Pages/Property/DetailsFactory/DemandDetailsHoldingProperty";
import WaterHarvestingForm from "@/Pages/PropertyEntryForms/waterHarvesting/WaterHarvestingForm";
import DeactivationFormComponent from "@/Pages/Property/HoldingDeactivation/DeactivationFormComponent";
import TcComparision from "@/Pages/Property/HoldingDeactivation/TcComparision";
import HoldingDeactivationDetailsEntry from "@/Pages/Property/DetailsFactory/HoldingDeactivatioinDetailsEntry/HoldingDeactivationDetailsEntry";
import HoldingTransactionHistory from "@/Pages/Property/DetailsFactory/HoldingTransactionHistory";
import TitleBar from "@/Pages/Property/DetailsFactory/TitleBar";
import PropertyPayment from "@/Pages/Property/PropertyPayments/PropertyPayment";
import ComparativeDemand from "@/Pages/Property/DetailsFactory/ComparativeDemand";
import SamReciept from "@/Pages/PaymentScreen/Reciept/SAM/SamReciept";
import PrintPage from "@/Pages/PaymentScreen/Reciept/FAM/PrintPage";
import ComparativeDemandReciept from "@/Pages/PaymentScreen/Reciept/ComparativeDemand/ComparativeDemandReciept";
import PropSafSearchCollection from "@/Pages/Property/Reports/PropSafSearchCollection";
import PropSafIndDemCollection from "@/Pages/Property/Reports/PropSafIndDemCollection";
import LevelWisePendingReport from "@/Pages/Property/Reports/LevelWiseCollection/LevelWisePendingReport";
import WardWiseDetails from "@/Pages/Property/Reports/LevelWiseCollection/WardWiseDetails";
import SafWiseDetails from "@/Pages/Property/Reports/LevelWiseCollection/SafWiseDetails";
import EmployeeWiseDetails from "@/Pages/Property/Reports/LevelWiseCollection/EmployeeWiseDetails";
import RmcPrint from "@/Pages/PaymentScreen/Reciept/RMC/RmcPrint";
import DemandPrint from "@/Pages/PaymentScreen/Reciept/Demand/DemandPrint";
import ClusterSafDemand from "@/Pages/Property/ClusterForms/ClusterSafDemand";
import ClusterHoldingDemand from "@/Pages/Property/ClusterForms/ClusterHoldingDemand";
import BankReconcile from "@/Pages/Property/PaymentReconcile/BankReconcile";
import CashVerification from "@/Pages/Property/CashVerification/CashVerification";
import ClusterHoldingTransactionHistory from "@/Pages/Property/DetailsFactory/ClusterHoldingTransactionHistory";
import ClusterPayment from "@/Pages/Property/PropertyPayments/ClusterPayment";
import WardWiseHolding from "@/Pages/Property/Reports/WardWiseHolding/WardWiseHolding";
import GBSafWorkflow from "@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/GBSafWorkflow/GBSafWorkflow";
import PaymentModeWiseSummary from "@/Pages/Property/Reports/PaymentModeWiseSummary";
import WardWiseDcb from "@/Pages/Property/Reports/WardWiseDcb";
import HoldingDcb from "@/Pages/Property/Reports/HoldingDcb";
import WardWiseCollectionSummary from "@/Pages/Property/Reports/WardWiseCollectionSummary/WardWiseCollectionSummary";
import TaxRecieptBulkPrint from "@/Pages/Property/Reports/TaxRecieptBulkPrint/TaxRecieptBulkPrint";
import HoldingWiseRebate from "@/Pages/Property/Reports/HoldingWiseRebate/HoldingWiseRebate";
import ArrearCurrentCollectionSummary from "@/Pages/Property/Reports/ArrearCurrentCollectionSummary/ArrearCurrentCollectionSummary";
import SafSamGeoTagging from "@/Pages/Property/Reports/SafSamGeoTagging/SafSamGeoTagging";
import DecisionMakingReport from "@/Pages/Property/Reports/DMR/DecisionMakingReport";
import HoldingWithElectricityDetailReport from "@/Pages/Property/Reports/HoldingWithElectricityDetailReport/HoldingWithElectricityDetailReport";
import PropIndividualDemandCollection from "@/Pages/Property/Reports/PropIndividualDemandCollection/PropIndividualDemandCollection";
import GovDcbReport from "@/Pages/Property/Reports/GovDcbReport/GovDcbReport";
import GovSafIndividualDemandCollection from "@/Pages/Property/Reports/GovSafIndividualDemandCollection/GovSafIndividualDemand&Collection";
import WardWiseDemand from "@/Pages/Property/Reports/WardWiseDemand/WardWiseDemand";
import WardWiseSafPendingDetails from "@/Pages/Property/Reports/WardWiseSafPendingDetails/WardWiseSafPendingDetails";
import DateWardWiseGeneratedNotice from "@/Pages/Property/Reports/DateWardWiseGeneratedNotice/DateWardWiseGeneratedNotice";
import DeactivatedHolding from "@/Pages/Property/Reports/DeactivatedHolding/DeactivatedHolding";
import PropSafCollectionReportwithRebatePenalty from "@/Pages/Property/Reports/PropSafCollectionReportwithRebatePenalty/PropSafCollectionReportwithRebatePenalty";
import BasicEditFormIndex from "@/Pages/Property/BasicEditForm/BasicEditFormIndex";
import NotPaidFrom from "@/Pages/Property/Reports/NotPaidFrom/NotPaidFrom";
import DecisionMakingReportTable from "@/Pages/Property/Reports/DecisionMakingReport/DecisionMakingReportTable";
import ClusterView from "@/Pages/Property/ClusterForms/ClusterView";
import SafWorkflowEntry from '@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/SafWorkflow/SafWorkflowEntry';
import CitizenSafEntryScreenForm from '@/Pages/Property/CitizenSafForm2updated/CitizenSafEntryScreenForm';
import SafPaymentReceiptIndex from '@/Pages/Property/CitizenSafForm2updated/PaymentReceipt2/SafPaymentReceiptIndex';
import ClusterPaymentReceiptIndex from '@/Pages/Property/Reports/TaxRecieptBulkPrint/ClusterPaymentReceiptIndex';
import CitizenPropSafApplicationFormIndex from './Pages/Property/CitizenSafForm2updated/CitizenPropSafApplicationFormIndex';
import UlbWorkflowRolesIndex from '@/Pages/Masters/UlbManage/UlbWorkflowRoles/UlbWorkflowRolesIndex';



function App(props) {
  const [boxWidth, setBoxWidth] = useState({ width: "md:w-5/6", margin: "md:ml-60" });
  ////***** global data containers *****\\\\
  const [menuList, setmenuList] = useState("");
  const [userName, setuserName] = useState("");
  const [roles, setroles] = useState("");
  const [titleText, settitleText] = useState('');
  const [photoUploadUpdation, setphotoUploadUpdation] = useState("");
  const [activeMenuId, setactiveMenuId] = useState(null);
  const [confirmBoxOpenStatus, setconfirmBoxOpenStatus] = useState(false);
  ////***** global data container *****\\\\

  let token = ApiHeader();
  console.log("token save from login ", token);
  if (token != undefined) {
    props.LOGIN();
  }
  useEffect(() => {
    if (props.navOriginalCloseStatus == true) {
      setBoxWidth({ width: "md:w-full", margin: "md:ml-16" });
      console.log(boxWidth.width, " ", boxWidth.margin);
    } else {
      setBoxWidth({ width: "md:w-5/6", margin: "md:ml-60" });
      console.log(boxWidth.width, " ", boxWidth.margin);
    }
  }, [props.navOriginalCloseStatus]);


  //context Data to active toast from anywhere
  const contextData = {
    notify: (toastData, actionFlag) => {
      toast.dismiss();
      {
        actionFlag == "error" && toast.error(toastData);
      }
      {
        actionFlag == "info" && toast.info(toastData);
      }
      {
        actionFlag == "success" && toast.success(toastData);
      }
      {
        actionFlag == "warn" && toast.warn(toastData);
      }
    },
    token: ApiHeader(),
    menuList,
    setmenuList,
    userName,
    setuserName,
    roles,
    setroles,
    setphotoUploadUpdation,
    photoUploadUpdation,
    titleText,
    settitleText,
    activeMenuId,
    setactiveMenuId,
    confirmBoxOpenStatus,
    setconfirmBoxOpenStatus
  };
  // return(
  //   <Login/>
  // )
  return (
    <>
      {/* passing context data to all component enclosed */}
      <contextVar.Provider value={contextData}>
        <CustomErrorBoundaryForRoutes errorMsg="Something went wrong !!" >
          <BrowserRouter basename="/admin">
            {/* common notify toast to run from anywhere */}
            <ToastContainer position="top-right" autoClose={2000} />
            <Header />
            <Sidebar />
            {/* <ConfirmBox confirmBoxOpenStatus={confirmBoxOpenStatus} setconfirmBoxOpenStatus={setconfirmBoxOpenStatus} /> */}
            <Routes>
              <Route index element={<Login />} />
            </Routes>
            <div
              className={`sm:w-full transition-all md:pl-4 md:pr-4 ${boxWidth.width}  ${boxWidth.margin} mt-24 h-screen overflow-y-scroll`}
            >
              <TitleBar titleText={titleText} />

              <Routes>
                <Route path="/change-password/:type" element={<Login />} />
                <Route path="/home" element={<LandingHomeDashBoard />} />
                 <Route path="/user-permission" element={<UserPermission />} />
               <Route path="/user-role" element={<UserRole />} />
                <Route path="/workflow-mstr" element={<WorkflowMaster />} />
                <Route path="/saf-workflow" element={<SafWorkflowEntry />} />
                 <Route path="/gbsaf-workflow" element={<GBSafWorkflow />} />
                <Route path="/concession-workflow" element={<ConcessionWorkflowEntry />} />
                <Route path="/harvesting-workflow" element={<HarvestingWorkflowEntry />} />
                <Route path="/objection-workflow" element={<ObjectionWorkflowEntry />} />
                <Route path="/deactivation-workflow" element={<HoldingDeactivationWorkflowEntry />} />

                <Route path="/waterHarvesting/:id" element={<WaterHarvestingForm />} />
                <Route path='/paymentReceipt/:paymentId/:module' element={<SafPaymentReceiptIndex />} />
                <Route path="/safform/edit/:id" element={<CitizenPropSafUpdateFormIndex />} />
                <Route path="/propFullDetails/:safId" element={<PropApplicationDetailById />} />
                <Route path="/activeSafFullDetails/:safId/:type" element={<ActiveSafApplicationDeatilsByid />} />
                <Route path="/activeSafDemandDetails/:safId" element={<ActiveSafDemandDetails />} />
                <Route path="/propertyDemandDetails/:safId" element={<PropertyDemandDetails />} />
                <Route path="/activeSafPayment" element={<ActiveSafPaymentDetail />}
                />
                <Route path="/propertyPayment" element={<PropertyPaymentDetails />} />
                <Route path="/payment-dashboard" element={<PaymentDashboard />} />
                <Route path="/con-form/:id" element={<ConcessionForm />} />

                <Route path="/gov-form" element={<GovSafApplicationFormIndex />} /> 
                <Route path="/colony" element={<ColonySafApplicationFormIndex />} />

                <Route path="/objection/:id" element={<ObjectionIndex />} />
                <Route path="/objection-clerical-mistake/:id" element={<ObjectionRectificationTable />} />
                <Route path="/objection-forgery/:id" element={<ObjectionForgery />} />
                <Route path="/objection-assessment-error/:id" element={<ObjectionFormIndex />} />
                <Route path="/saf-entry" element={<CitizenSafEntryScreenForm />} />
                <Route path="/ulb-workflow-roles" element={<UlbWorkflowRolesIndex />} />
                <Route path='/safform/:safType/:safId' element={<CitizenPropSafApplicationFormIndex />} />
                <Route path='/basic-property-edit/:propId' element={<BasicEditFormIndex />} />
                <Route path="/search/:type/:filterParam/:searchValueParam" element={<SearchIndex />} />
                <Route path="/searchAppliedProperty/:filterParam/:searchValueParam" element={<AppliedApplicationSearch />} />
                <Route path='/propApplicationDetails/:id' element={<SafDetailsEntry />} />
                <Route path='/concession-details/:id' element={<ConcessionDetailsEntry />} />
                <Route path='/objection-details/:id' element={<ObjectionDetailsEntry />} />
                <Route path='/harvesting-details/:id' element={<HarvestingDetailsEntry />} />
                <Route path='/holding-deactivatioin-details/:id' element={<HoldingDeactivationDetailsEntry />} />

                <Route path='/viewDemand/:id' element={<ViewDemandDetails />} />

                <Route path='/holdingPropertyDetails/:id' element={<PropApplicationFullDetail_Property />} />
                <Route path='/viewDemandHoldingProperty/:id' element={<DemandDetailsHoldingProperty />} />

                <Route path='/holding-deactivation/:id' element={<DeactivationFormComponent />} />
                <Route path='/tc-comparision/:id/:type' element={<TcComparision />} />
                <Route path='/holding-transactions/:id' element={<HoldingTransactionHistory />} />
                <Route path='/comparative-demand/:id' element={<ComparativeDemand />} />
                <Route path='/property-payment/:id/:moduleType' element={<PropertyPayment />} />

                <Route path="/cluster" element={<ClusterFormIndex />} /> 
                <Route path="/viewCluster/:id" element={<ClusterView />} /> 
                <Route path='/viewDemandCluster/:id' element={<ClusterSafDemand />} />
                <Route path='/viewDemandHoldingPropertyCluster/:id' element={<ClusterHoldingDemand />} />
                <Route path='/cluster-holding-transactions/:id' element={<ClusterHoldingTransactionHistory />} />
                <Route path='/cluster-payment/:id/:moduleType' element={<ClusterPayment />} />
                <Route path='/cluster-payment-receipt/:paymentId/:module' element={<ClusterPaymentReceiptIndex />} />

                <Route path='/sam-reciept/:id' element={<SamReciept />} />
                <Route path='/fam-reciept/:id' element={<PrintPage />} />
                <Route path='/comparative-demand-reciept/:id' element={<ComparativeDemandReciept />} />
                <Route path="/rmc-reciept/:id" element={<RmcPrint />} />
                <Route path="/demand-reciept/:id" element={<DemandPrint />} />

                <Route path='/report/:type' element={<PropSafSearchCollection />} /> {/*type = property/saf/gbSaf, property collection , saf collection,  GB SAF Collection */}
                <Route path='/payment-mode-wise-summary/:type' element={<PaymentModeWiseSummary /> } />{/* type= property/saf, Payment Mode Wise Collection Summary inside property and saf collection */}
                 {/* here ('/collection-demand-report') is the detailing of the ListTable2 which is used while backend pagination*/}
                <Route path='/collection-demand-report' element={<PropSafIndDemCollection />} />{/*property/saf individual demand and collection */}
                <Route path='/level-wise-pending-report' element={<LevelWisePendingReport />} />{/*Level Wise Pending */}
                <Route path="/ward-wise-details/:id" element={<WardWiseDetails />} />{/* Inside Level Wise Pending */}
                <Route path="/saf-wise-details/:id" element={<SafWiseDetails />} />{/* Inside Level Wise Pending */}
                <Route path="/employee-wise-details/:id" element={<EmployeeWiseDetails />} />{/* Inside Level Wise Pending */}
                <Route path="/ward-wise-holding-report" element={<WardWiseHolding /> } />{/*Ward Wise Holding */}
                <Route path='/ward-wise-dcb' element={<WardWiseDcb /> } /> {/* Ward Wise Dcb */}
                <Route path='/holding-dcb' element={<HoldingDcb /> } /> {/* Holding Dcb */}
                <Route path="/ward-wise-collection-summary" element={<WardWiseCollectionSummary />} /> {/* Ward Wise Collection Summary */}
                <Route path="/tax-reciept-bulk-print" element={<TaxRecieptBulkPrint />} /> {/* Tax Receipt Bulk Print */}
                <Route path="/holding-wise-rebate" element={<HoldingWiseRebate />} /> {/* Holding Wise Rebate */}
                <Route path="/collection-with-rebate-penalty/:type" element={<PropSafCollectionReportwithRebatePenalty />} /> {/*type= property/saf,  Property, SAF Collection Report With Rebate, Penalty */}
                <Route path="/arrear-current-collection-summary" element={<ArrearCurrentCollectionSummary />} /> {/* Arrear and Current Collection Summary */}
                <Route path="/saf-sam-geo-tagging" element={<SafSamGeoTagging />} /> {/* SAF, SAM, Geo Tagging */}
                <Route path="/not-paid-from/:year" element={<NotPaidFrom />} /> {/* year=current/2016,  Previous Year Paid But Not paid current year, Not paid from 2016-2017 */}
                <Route path="/dmr" element={<DecisionMakingReport />} /> {/* DMR */}
                <Route path='/decision-making-report' element={<DecisionMakingReportTable /> } /> {/* Decision Making Report */}
                <Route path="/holding-with-electricity-detail-report" element={<HoldingWithElectricityDetailReport />} /> {/* Holding with electricity detail report */}
                <Route path="/prop-individual-demand-collection" element={<PropIndividualDemandCollection />} /> {/* Property Individual Demand and Collection */}
                <Route path="/gov-dcb-report" element={<GovDcbReport />} /> {/* Gov Dcb Report */}
                <Route path="/gov-saf-individual-demand-collection" element={<GovSafIndividualDemandCollection />} /> {/* Gov Saf individual demand and collection */}
                <Route path="/ward-wise-demand" element={<WardWiseDemand />} /> {/* Ward wise demand */}
                <Route path="/ward-wise-saf-pending-details" element={<WardWiseSafPendingDetails />} /> {/* Ward Wise SAF Pending Details */}
                <Route path="/date-ward-wise-generated-notice" element={<DateWardWiseGeneratedNotice />} /> {/* Date & Ward Wise Generated Notice */}
                <Route path="/deactivated-holding" element={<DeactivatedHolding />} /> {/* Deactivated Holding */}

                <Route path='/bank-recon' element={<BankReconcile />} />
                <Route path='/cash-verification' element={<CashVerification />} />

              </Routes>
            </div>
          </BrowserRouter>
        </CustomErrorBoundaryForRoutes>
      </contextVar.Provider>
    </>
  );
}

//for redux
const mapStateToProps = (state) => {
  return {
    navCloseStatus: state.navCloseStatus,
    navOriginalCloseStatus: state.navOriginalCloseStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // buyCake: () => dispatch(buyCake())
    NAV_OPEN: (data2) => dispatch({ type: "NAV_OPEN" }),
    NAV_CLOSE: (data3) => dispatch({ type: "NAV_CLOSE" }),
    LOGIN: (data2) => dispatch({ type: "LOGIN" }),
  };
};
// export default Home // EXPORTING HOME COMPONENT
export default connect(mapStateToProps, mapDispatchToProps)(App);
