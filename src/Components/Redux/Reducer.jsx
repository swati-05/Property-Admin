//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Reducer
//    DESCRIPTION - Reducer Component
//////////////////////////////////////////////////////////////////////////////////////
import { useReducer } from "react";

const initialState = {
  navCloseStatus: false, //define current status of sidebar to open or close
  navOriginalCloseStatus: false, //define permanent state of sidebar for hover open and close
  RightNavCloseStatus: true,
  isLoggedIn: null,

};



const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAV_OPEN":
      return { ...state, navCloseStatus: false };
    case "NAV_CLOSE":
      return { ...state, navCloseStatus: true };
    case "NAV_OPEN_ORIGINAL_STATUS":
      return { ...state, navOriginalCloseStatus: false };
    case "NAV_CLOSE_ORIGINAL_STATUS":
      return { ...state, navOriginalCloseStatus: true };
    case "RIGHT_NAV_OPEN":
      return { ...state, RightNavCloseStatus: false };
    case "RIGHT_NAV_CLOSE":
      return { ...state, RightNavCloseStatus: true };
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default Reducer;
/**
 * Exported to :
 * 1. Store Component
 * 
 */