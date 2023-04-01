import { useState, useEffect } from 'react'
import Login from "@/Pages/Auth/Login";
import './App.css'
import "animate.css";
import { connect } from "react-redux";
import { contextVar } from "@/Components/Context/Context";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ApiHeader from '@/Components/ApiList/ApiHeader';

// import CustomErrorBoundaryForRoutes from '@/Components/Errors/CustomErrorBoundaryForRoutes';
// const OtherComponent = React.lazy(() => import('./OtherComponent'));
const LandingHomeDashBoard = React.lazy(() => import('@/Pages/Home/LandingHomeDashBoard'));
const Sidebar = React.lazy(() => import('@/Components/Common/Sidebar/Sidebar'));
const Header = React.lazy(() => import('@/Components/Common/Header/Header'));
const WorkflowMaster = React.lazy(() => import('@/Pages/WorkflowMaster/WorkflowMaster'));
const UserPermission = React.lazy(() => import('@/Pages/UserPermission/UserPermission'));
const GovSafApplicationFormIndex = React.lazy(() => import('@/Pages/PropertyEntryForms/GovSafApplicationForm/GovSafApplicationFormIndex'));
const ColonySafApplicationFormIndex = React.lazy(() => import('@/Pages/PropertyEntryForms/ColonySafEntryForm/ColonySafApplicationFormIndex'));
const ObjectionFormIndex = React.lazy(() => import('@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionFormIndex'));
const UserRole = React.lazy(() => import('@/Pages/UserRole/UserRole'));
const ClusterFormIndex = React.lazy(() => import('@/Pages/Property/ClusterForms/ClusterFormIndex'));
const ObjectionIndex = React.lazy(() => import('@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionIndex'));
const ObjectionRectificationTable = React.lazy(() => import('@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionRectificationTable'));
const ObjectionForgery = React.lazy(() => import('@/Pages/Property/PropertyEntryForms/ObjectionEntryForm/ObjectionForgery'));
const SearchIndex = React.lazy(() => import('@/Pages/Search/SearchIndex'));
const PropApplicationDetailById = React.lazy(() => import('@/Pages/Property/PropApplicationView/PropApplicationDetailById'));
const AppliedApplicationSearch = React.lazy(() => import('@/Pages/Search/AppliedApplicationSearch'));
const ActiveSafApplicationDeatilsByid = React.lazy(() => import('@/Pages/Property/PropApplicationView/ActiveSafApplicationDeatilsByid'));
const ActiveSafDemandDetails = React.lazy(() => import('@/Pages/Property/PropApplicationView/ActiveSafDemandDetails'));
const PropertyDemandDetails = React.lazy(() => import('@/Pages/Property/PropApplicationView/PropertyDemandDetails'));
const ActiveSafPaymentDetail = React.lazy(() => import('@/Pages/Property/PropApplicationView/ActiveSafPaymentDetail'));
const PropertyPaymentDetails = React.lazy(() => import('@/Pages/Property/PropApplicationView/PropertyPaymentDetails'));

const ConcessionForm = React.lazy(() => import('@/Pages/Property/PropertyEntryForms/ConcessionForm/ConcessionForm'));
const CitizenPropSafUpdateFormIndex = React.lazy(() => import('@/Pages/Workflow/Property/PropertySafWorkflow/SafApplicationForm/CitizenPropSafUpdateFormIndex'));
const PaymentDashboard = React.lazy(() => import('@/Pages/PaymentMaster/PaymentDashboard'));
const ConcessionWorkflowEntry = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Concession-Workflow/ConcessionWorkflowEntry'));
const HarvestingWorkflowEntry = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Harvesting-Workflow/HarvestingWorkflowEntry'));
const ObjectionWorkflowEntry = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Objection-Workflow/ObjectionWorkflowEntry'));
const HoldingDeactivationWorkflowEntry = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/Holding-Deactivation-Workflow/HoldingDeactivationWorkflowEntry'));
// top fixed

const SafDetailsEntry = React.lazy(() => import('@/Pages/Property/DetailsFactory/SafDetailsEntry/SafDetailsEntry'));
const ConcessionDetailsEntry = React.lazy(() => import('@/Pages/Property/DetailsFactory/ConcessionDetailsEntry/ConcessionDetailsEntry'));
const ObjectionDetailsEntry = React.lazy(() => import('@/Pages/Property/DetailsFactory/ObjectionDetailsEntry/ObjectionDetailsEntry'));
const HarvestingDetailsEntry = React.lazy(() => import('@/Pages/Property/DetailsFactory/HarvestingDetailsEntry/HarvestingDetailsEntry'));
const ViewDemandDetails = React.lazy(() => import('@/Pages/Property/DetailsFactory/ViewDemandDetails'));
const PropApplicationFullDetail_Property = React.lazy(() => import('@/Pages/Property/DetailsFactory/PropApplicationFullDetail_Property'));
const DemandDetailsHoldingProperty = React.lazy(() => import('@/Pages/Property/DetailsFactory/DemandDetailsHoldingProperty'));
const WaterHarvestingForm = React.lazy(() => import('@/Pages/PropertyEntryForms/waterHarvesting/WaterHarvestingForm'));
const DeactivationFormComponent = React.lazy(() => import('@/Pages/Property/HoldingDeactivation/DeactivationFormComponent'));
const TcComparision = React.lazy(() => import('@/Pages/Property/HoldingDeactivation/TcComparision'));
const HoldingDeactivationDetailsEntry = React.lazy(() => import('@/Pages/Property/DetailsFactory/HoldingDeactivatioinDetailsEntry/HoldingDeactivationDetailsEntry'));
const HoldingTransactionHistory = React.lazy(() => import('@/Pages/Property/DetailsFactory/HoldingTransactionHistory'));
const TitleBar = React.lazy(() => import('@/Pages/Property/DetailsFactory/TitleBar'));
const PropertyPayment = React.lazy(() => import('@/Pages/Property/PropertyPayments/PropertyPayment'));
const SamReciept = React.lazy(() => import('@/Pages/PaymentScreen/Reciept/SAM/SamReciept'));
const PrintPage = React.lazy(() => import('@/Pages/PaymentScreen/Reciept/FAM/PrintPage'));
const ComparativeDemandReciept = React.lazy(() => import('@/Pages/PaymentScreen/Reciept/ComparativeDemand/ComparativeDemandReciept'));
const PropSafSearchCollection = React.lazy(() => import('@/Pages/Property/Reports/PropSafSearchCollection'));
const PropSafIndDemCollection = React.lazy(() => import('@/Pages/Property/Reports/PropSafIndDemCollection'));
const LevelWisePendingReport = React.lazy(() => import('@/Pages/Property/Reports/LevelWiseCollection/LevelWisePendingReport'));
const WardWiseDetails = React.lazy(() => import('@/Pages/Property/Reports/LevelWiseCollection/WardWiseDetails'));
const SafWiseDetails = React.lazy(() => import('@/Pages/Property/Reports/LevelWiseCollection/SafWiseDetails'));
const EmployeeWiseDetails = React.lazy(() => import('@/Pages/Property/Reports/LevelWiseCollection/EmployeeWiseDetails'));
const RmcPrint = React.lazy(() => import('@/Pages/PaymentScreen/Reciept/RMC/RmcPrint'));
const DemandPrint = React.lazy(() => import('@/Pages/PaymentScreen/Reciept/Demand/DemandPrint'));
const ClusterSafDemand = React.lazy(() => import('@/Pages/Property/ClusterForms/ClusterSafDemand'));
const ClusterHoldingDemand = React.lazy(() => import('@/Pages/Property/ClusterForms/ClusterHoldingDemand'));
const BankReconcile = React.lazy(() => import('@/Pages/Property/PaymentReconcile/BankReconcile'));
const CashVerification = React.lazy(() => import('@/Pages/Property/CashVerification/CashVerification'));
const ClusterHoldingTransactionHistory = React.lazy(() => import('@/Pages/Property/DetailsFactory/ClusterHoldingTransactionHistory'));
const ClusterPayment = React.lazy(() => import('@/Pages/Property/PropertyPayments/ClusterPayment'));
const WardWiseHolding = React.lazy(() => import('@/Pages/Property/Reports/WardWiseHolding/WardWiseHolding'));
const GBSafWorkflow = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/GBSafWorkflow/GBSafWorkflow'));
const PaymentModeWiseSummary = React.lazy(() => import('@/Pages/Property/Reports/PaymentModeWiseSummary'));
const WardWiseDcb = React.lazy(() => import('@/Pages/Property/Reports/WardWiseDcb'));
const HoldingDcb = React.lazy(() => import('@/Pages/Property/Reports/HoldingDcb'));
const WardWiseCollectionSummary = React.lazy(() => import('@/Pages/Property/Reports/WardWiseCollectionSummary/WardWiseCollectionSummary'));
const TaxRecieptBulkPrint = React.lazy(() => import('@/Pages/Property/Reports/TaxRecieptBulkPrint/TaxRecieptBulkPrint'));
const HoldingWiseRebate = React.lazy(() => import('@/Pages/Property/Reports/HoldingWiseRebate/HoldingWiseRebate'));
const ArrearCurrentCollectionSummary = React.lazy(() => import('@/Pages/Property/Reports/ArrearCurrentCollectionSummary/ArrearCurrentCollectionSummary'));
const SafSamGeoTagging = React.lazy(() => import('@/Pages/Property/Reports/SafSamGeoTagging/SafSamGeoTagging'));
const DecisionMakingReport = React.lazy(() => import('@/Pages/Property/Reports/DMR/DecisionMakingReport'));
const HoldingWithElectricityDetailReport = React.lazy(() => import('@/Pages/Property/Reports/HoldingWithElectricityDetailReport/HoldingWithElectricityDetailReport'));
const PropIndividualDemandCollection = React.lazy(() => import('@/Pages/Property/Reports/PropIndividualDemandCollection/PropIndividualDemandCollection'));
const GovDcbReport = React.lazy(() => import('@/Pages/Property/Reports/GovDcbReport/GovDcbReport'));
const GovSafIndividualDemandCollection = React.lazy(() => import('@/Pages/Property/Reports/GovSafIndividualDemandCollection/GovSafIndividualDemand&Collection'));
const WardWiseDemand = React.lazy(() => import('@/Pages/Property/Reports/WardWiseDemand/WardWiseDemand'));
const WardWiseSafPendingDetails = React.lazy(() => import('@/Pages/Property/Reports/WardWiseSafPendingDetails/WardWiseSafPendingDetails'));
const DateWardWiseGeneratedNotice = React.lazy(() => import('@/Pages/Property/Reports/DateWardWiseGeneratedNotice/DateWardWiseGeneratedNotice'));
const DeactivatedHolding = React.lazy(() => import('@/Pages/Property/Reports/DeactivatedHolding/DeactivatedHolding'));
const PropSafCollectionReportwithRebatePenalty = React.lazy(() => import('@/Pages/Property/Reports/PropSafCollectionReportwithRebatePenalty/PropSafCollectionReportwithRebatePenalty'));
const BasicEditFormIndex = React.lazy(() => import('@/Pages/Property/BasicEditForm/BasicEditFormIndex'));
const NotPaidFrom = React.lazy(() => import('@/Pages/Property/Reports/NotPaidFrom/NotPaidFrom'));
const DecisionMakingReportTable = React.lazy(() => import('@/Pages/Property/Reports/DecisionMakingReport/DecisionMakingReportTable'));
const ClusterView = React.lazy(() => import('@/Pages/Property/ClusterForms/ClusterView'));
const SafWorkflowEntry = React.lazy(() => import('@/Pages/Workflow/Property/WORKFLOW_PILOT/Workflow/SafWorkflow/SafWorkflowEntry'));
const CitizenSafEntryScreenForm = React.lazy(() => import('@/Pages/Property/CitizenSafForm2updated/CitizenSafEntryScreenForm'));
const SafPaymentReceiptIndex = React.lazy(() => import('@/Pages/Property/CitizenSafForm2updated/PaymentReceipt2/SafPaymentReceiptIndex'));
const ClusterPaymentReceiptIndex = React.lazy(() => import('@/Pages/Property/Reports/TaxRecieptBulkPrint/ClusterPaymentReceiptIndex'));
const CitizenPropSafApplicationFormIndex = React.lazy(() => import('./Pages/Property/CitizenSafForm2updated/CitizenPropSafApplicationFormIndex'));
const UlbWorkflowRolesIndex = React.lazy(() => import('@/Pages/Masters/UlbManage/UlbWorkflowRoles/UlbWorkflowRolesIndex'));
const NavigatePage = React.lazy(() => import('./Pages/NavigatePage'));
const SafApplyCard = React.lazy(() => import('./Pages/Workflow/Property/SafApplyCard/SafApplyCard'));
const GBSAFDetailsEntry = React.lazy(() => import('./Pages/Property/DetailsFactory/GBSAFDetailsEntry/GBSAFDetailsEntry'));




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
  const [menuFetchStatus, setmenuFetchStatus] = useState(false);

  // USER DETAILS
  const [userUlbName, setuserUlbName] = useState('');
  const [userMobile, setuserMobile] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userImage, setuserImage] = useState('');


  const navigate = useNavigate()
  let token = window.localStorage.getItem('token')
  console.log("token save from login ", token);
  if (token != null) {
    console.log('===token defined............')

    props.LOGIN();
  }
  // if (token == null) {
  //   navigate('/login/fresh')
  // }

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

    setphotoUploadUpdation,
    photoUploadUpdation,
    titleText,
    settitleText,
    activeMenuId,
    setactiveMenuId,
    confirmBoxOpenStatus,
    setconfirmBoxOpenStatus,

    userName,
    setuserName,
    roles,
    setroles,
    userUlbName,
    setuserUlbName,
    userMobile,
    setuserMobile,
    userEmail,
    setuserEmail,
    userImage,
    setuserImage
  };
  // return(
  //   <Login/>
  // )
  return (
    <>
      {/* passing context data to all component enclosed */}
      <contextVar.Provider value={contextData}>
        <CustomErrorBoundaryForRoutes errorMsg="Something went wrong !!" >
          {/* <BrowserRouter basename="/property"> */}
          {/* common notify toast to run from anywhere */}
          <ToastContainer position="top-right" autoClose={2000} />
          <Header />
          <Sidebar menuFetchStatus={menuFetchStatus} />
          {/* <ConfirmBox confirmBoxOpenStatus={confirmBoxOpenStatus} setconfirmBoxOpenStatus={setconfirmBoxOpenStatus} /> */}
          <Routes>
            <Route index element={<Login menuFetchStatus={menuFetchStatus} setmenuFetchStatus={setmenuFetchStatus} />} />
            {/* <Route index element={<NavigatePage />} /> */}

            {/* <Route path='/login/:tokenPassed' element={<Login menuFetchStatus={menuFetchStatus} setmenuFetchStatus={setmenuFetchStatus} />} /> */}
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
              <Route path="/saf-entry" element={<SafApplyCard />} />
              <Route path="/ulb-workflow-roles" element={<UlbWorkflowRolesIndex />} />
              <Route path='/safform/:safType/:safId' element={<CitizenPropSafApplicationFormIndex />} />
              <Route path='/basic-property-edit/:propId' element={<BasicEditFormIndex />} />
              <Route path="/search/:type/:filterParam/:searchValueParam" element={<SearchIndex />} />
              <Route path="/searchAppliedProperty/:filterParam/:searchValueParam" element={<AppliedApplicationSearch />} />
              <Route path='/propApplicationDetails/:id' element={<SafDetailsEntry />} />
              <Route path='/concession-details/:id' element={<ConcessionDetailsEntry />} />
              <Route path='/objection-details/:id' element={<ObjectionDetailsEntry />} />
              <Route path='/harvesting-details/:id' element={<HarvestingDetailsEntry />} />
              <Route path='/gbsaf-details/:id' element={<GBSAFDetailsEntry />} />
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
              <Route path='/payment-mode-wise-summary/:type' element={<PaymentModeWiseSummary />} />{/* type= property/saf, Payment Mode Wise Collection Summary inside property and saf collection */}
              {/* here ('/collection-demand-report') is the detailing of the ListTable2 which is used while backend pagination*/}
              <Route path='/collection-demand-report' element={<PropSafIndDemCollection />} />{/*property/saf individual demand and collection */}
              <Route path='/level-wise-pending-report' element={<LevelWisePendingReport />} />{/*Level Wise Pending */}
              <Route path="/ward-wise-details/:id" element={<WardWiseDetails />} />{/* Inside Level Wise Pending */}
              <Route path="/saf-wise-details/:id" element={<SafWiseDetails />} />{/* Inside Level Wise Pending */}
              <Route path="/employee-wise-details/:id" element={<EmployeeWiseDetails />} />{/* Inside Level Wise Pending */}
              <Route path="/ward-wise-holding-report" element={<WardWiseHolding />} />{/*Ward Wise Holding */}
              <Route path='/ward-wise-dcb' element={<WardWiseDcb />} /> {/* Ward Wise Dcb */}
              <Route path='/holding-dcb' element={<HoldingDcb />} /> {/* Holding Dcb */}
              <Route path="/ward-wise-collection-summary" element={<WardWiseCollectionSummary />} /> {/* Ward Wise Collection Summary */}
              <Route path="/tax-reciept-bulk-print" element={<TaxRecieptBulkPrint />} /> {/* Tax Receipt Bulk Print */}
              <Route path="/holding-wise-rebate" element={<HoldingWiseRebate />} /> {/* Holding Wise Rebate */}
              <Route path="/collection-with-rebate-penalty/:type" element={<PropSafCollectionReportwithRebatePenalty />} /> {/*type= property/saf,  Property, SAF Collection Report With Rebate, Penalty */}
              <Route path="/arrear-current-collection-summary" element={<ArrearCurrentCollectionSummary />} /> {/* Arrear and Current Collection Summary */}
              <Route path="/saf-sam-geo-tagging" element={<SafSamGeoTagging />} /> {/* SAF, SAM, Geo Tagging */}
              <Route path="/not-paid-from/:year" element={<NotPaidFrom />} /> {/* year=current/2016,  Previous Year Paid But Not paid current year, Not paid from 2016-2017 */}
              <Route path="/dmr" element={<DecisionMakingReport />} /> {/* DMR */}
              <Route path='/decision-making-report' element={<DecisionMakingReportTable />} /> {/* Decision Making Report */}
              <Route path="/holding-with-electricity-detail-report" element={<HoldingWithElectricityDetailReport />} /> {/* Holding with electricity detail report */}
              <Route path="/prop-individual-demand-collection" element={<PropIndividualDemandCollection />} /> {/* Property Individual Demand and Collection */}
              <Route path="/gov-dcb-report" element={<GovDcbReport />} /> {/* Gov Dcb Report */}
              <Route path="/gov-saf-individual-demand-collection" element={<GovSafIndividualDemandCollection />} /> {/* Gov Saf individual demand and collection */}
              <Route path="/ward-wise-demand" element={<WardWiseDemand />} /> {/* Ward wise demand */}
              <Route path="/ward-wise-saf-pending-details" element={<WardWiseSafPendingDetails />} /> {/* Ward Wise SAF Pending Details */}
              <Route path="/date-ward-wise-generated-notice" element={<DateWardWiseGeneratedNotice />} /> {/* Date & Ward Wise Generated Notice */}
              <Route path="/deactivated-holding" element={<DeactivatedHolding />} /> {/* Deactivated Holding */}

              <Route path='/bank-reconcile' element={<BankReconcile />} />
              <Route path='/cash-verification' element={<CashVerification />} />

            </Routes>
          </div>
          {/* </BrowserRouter> */}
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
