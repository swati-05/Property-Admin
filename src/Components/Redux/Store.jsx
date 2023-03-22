//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 04 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Store
//    DESCRIPTION - Store Component
//////////////////////////////////////////////////////////////////////////////////////
import { createStore } from "redux";
import Reducer from "./Reducer";

const store = createStore(Reducer);
export default store;