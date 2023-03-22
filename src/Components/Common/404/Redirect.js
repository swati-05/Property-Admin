//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Redirect
//    DESCRIPTION - Redirect Component
//////////////////////////////////////////////////////////////////////////////////////
import { useNavigate } from 'react-router-dom'

function Redirect() {
    const naviage = useNavigate()
    return naviage('/error')
}

export default Redirect
/**
 * Exported to :
 * 1. App.js
 * 
 */