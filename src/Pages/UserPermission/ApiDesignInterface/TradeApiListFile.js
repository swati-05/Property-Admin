import Apiheader from "@/Components//ApiList/Apiheader";
import BackendUrl from "@/Components//ApiList/BackendUrl";
import React from "react";

// const baseUrl = "http://192.168.0.16:8000/";
const baseUrl = BackendUrl + "/";
const btrackUrl = "http://192.168.0.240:8000/";

export const TRADE = {
  UPDATE_API_LIST: baseUrl + "api/edit-api/", //requires an id param at the end
  GET_API_BY_ID: baseUrl + "api/get-api-by-id/", //requires an id param at the end
  SAVE_API_LIST: baseUrl + "api/save-api",
  GET_API_LIST: baseUrl + "api/get-all-apis",
  MASTER_DATA_API: baseUrl + "api/trade/getApplyData/", //requires an posst data as application type and licencId submission
  POST_MASTER_DATA_API: baseUrl + "api/trade/application/add/", //requires an STRING param at the end /post method will perform application submission
  VALIDATE_HOLDING: baseUrl + "api/trade/property/by-holding", //request payload is holding no
  GET_CHARGE: baseUrl + "api/trade/application/get-demand", //request payload is applicationType, areaSqft, natureOfBusiness[id],tocStatus,
  SEARCH_LICENSE_FOR_APPLY: baseUrl + "api/trade/application/search-for-renew", //provide license number as the post data with application type
  GET_DENIAL_DETAILS: baseUrl + "api/trade/notice/details", // taken notice no as (post data) in it's required parameter
  GET_APPLICATION_LIST: baseUrl + "api/trade/application/inbox", // in get method return all application List INBOX
  GET_APPLICATION_LIST_OUTBOX: baseUrl + "api/trade/application/outbox", // in get method return all application List OUTBOX
  GET_LICENSE_DTL_BY_ID: baseUrl + "api/trade/application/dtl-by-id", //returns license details of a particular application....send id in parameter;
  GET_LICENSE_DTL_BY_ANYTHING: baseUrl + "api/trade/application/list/", //returns application list. Takes post data as entity_name && entity_value
  POST_LICENSE_TO_LEVEL: baseUrl + "api/trade/application/post-next/", // forward or backward or BTC application on workflow ... post data {licenceId,btn,comment}

  BTC_LIST: baseUrl + "api/trade/application/btc-inbox", // forward or backward or BTC application on workflow ... post data {licenceId,btn,comment}
  POST_BTC: baseUrl + "api/trade/application/btc", // forward or backward or BTC application on workflow ... post data {licenceId,btn,comment}
  WORKFLOW_INFO: baseUrl + "/api/workflow/role-map/workflow-info", // forward or backward or BTC application on workflow ... post data {licenceId,btn,comment}

  POST_GETLICENSE_DETAIL_BY_ID_FOR_BO:
    baseUrl + "api/trade/application/edit-by-id/", // gets license data with master data for back office
  POST_UPDATE_LICENSE_DTL: baseUrl + "api/trade/application/edit/", // gets license data with master data for back office

  // DOCUMENT_REQUIREMENT: baseUrl + "api/trade/documentUpload/",             // GET + POST method for requirement and fulfilment of the documents 
  DOCUMENT_REQUIREMENT: baseUrl + "api/trade/application/doc-list/",             // GET + POST method for requirement and fulfilment of the documents

  DOCUMENT_UPLOAD: baseUrl + "api/trade/application/upload-document",             // GET + POST method for requirement and fulfilment of the documents

  GET_UPLOADED_DOCUMENTS: baseUrl + "api/trade/appliction/documents",             // GET method for getting uploaded document list the documents
  GET_DOCUMENT_FOR_VERIFICATION: baseUrl + "api/workflow/document/verify-reject",             // GET method for getting uploaded document list the documents
  // GET_DOCUMENT_FOR_VERIFICATION: baseUrl + "api/trade/documentVerify/",             // GET method for getting uploaded document list the documents

  GET_PAYMENT_DATA: baseUrl + "api/trade/payment-receipt/",             // GET method for getting payment information
  GET_PROVISIONAL_DATA: baseUrl + "api/trade/provisional-certificate/",             // GET method for getting payment information
  GET_TRADE_LICENSE_DATA: baseUrl + "api/trade/license-certificate/",             // GET method for getting payment information
  SEND_INDEPENDENT_COMMENT: baseUrl + "api/trade/application/indipendent-comment/",             // POST method for sending idependent comment  params is licenceId and comments
  ESCALATE_APPLICATION: baseUrl + "api/trade/application/escalate/",             // POST method for sending idependent comment  params is licenceId and comments  
  GET_ROLE_BY_WORKFLOW: baseUrl + "api/workflow/getRoleByWorkflow",
  GET_DEPARTMENTAL_POST: baseUrl + "api/get-all-custom-tab-data",
  POST_DEPARTMENTAL_POST: baseUrl + "api/post-custom-data",
  POST_ESCALATE: baseUrl + "api/trade/escalate",
  GET_APPLICATION_LIST_SPECIAL: baseUrl + "api/trade/application/escalate-inbox",
  POST_APPROVE_REJECT_APPLICATION: baseUrl + "api/trade/application/approve-reject",
  //POST method for getting ulb list
  GET_CITIZEN_APPLICATION_BY_ID: baseUrl + "api/trade/application/citizen-by-id",
  PAY_APPLICATION_CHARGE: baseUrl + "api/trade/application/pay-charge", //individual payment
  
  DASHBOARD_DATA: baseUrl + "api/trade/dashboard",



  // trade reporting section
  TC_WISE_COLLECTION_REPORT: baseUrl + "api/trade/application/collection-reports",
  TEAM_SUMMARY: baseUrl + "api/trade/application/team-summary",
  VALID_AND_EXPIRE_LIST: baseUrl + "api/trade/application/valid-expire-list"

}

export const BTRACK = {
  GET_MODULE_NAMES: btrackUrl + "api/bug/get-modules",      //POST METHOD FOR GETTING MODULE NAMES
  GET_HEADER_NAME_BY_MODULE_ID: btrackUrl + "api/bug/get-headers"       //POST METHOD FOR GETTING MODULE NAMES
}

export const PROPERTY = {
  POST_SEARCH_HOLDING_FOR_DEACTIVATION:
    baseUrl + "api/property/searchByHoldingNo/", // post data is holding No
  POST_GETHOLDING_DETAIL_BY_ID: baseUrl + "api/property/deactivationRequest/", // GET METHOD for getting holding data by prop id and POST METHOD when submitting deactivation request
  POST_DEACTIVATION_INBOX_LIST: baseUrl + "api/property/inboxDeactivation/", // GET METHOD for getting holding data by prop id and POST METHOD when submitting deactivation request

  POST_DEACTIVATION_DETAILS_BY_REQUEST_ID:
    baseUrl + "api/property/getDeactivationDtls", // POST method for getting property data in deactivation workflow
  POST_DEACTIVATION_TO_LEVEL: baseUrl + "api/property/postNextDeactivation", // POST method for getting property data in deactivation workflow

  POST_GET_BIFURCATION: baseUrl + "api/property/applyBifurcation/", // POST+ GET method for getting property data by id in bifuraction request
  GET_BIFURCATION_MASTER_DATA: baseUrl + "api/property/saf/master-saf", // POST method for getting property data in deactivation workflow
};

export const HEADER = () => {


  return Apiheader();
};

// console.log("testing", HEADER());
