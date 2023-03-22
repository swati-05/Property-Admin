//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - NavButton
//    DESCRIPTION - NavButton Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState,useEffect } from 'react'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { connect } from "react-redux";



function NavButton(props) {

    const [navClose, setnavClose] = useState(false)

    const navToggle = () => {
        // setnavClose(true)

        if (!props.navCloseStatus) {
            props.NAV_CLOSE()
            props.NAV_CLOSE_ORIGINAL_STATUS()
        }
        if (props.navCloseStatus) {
            props.NAV_OPEN()
            props.NAV_OPEN_ORIGINAL_STATUS()

        }
    }
    
    return (
        <>
            <div className="grid grid-cols-12 place-items-center h-full">
                <div className='cursor-pointer bg-gray-100 p-2 rounded-lg' onClick={navToggle}><HiOutlineMenuAlt2 color='black' size={16} /></div>
                <div className='col-span-10'><h4 className='text-gray-900 font-bold text-sm sm:text-lg text-center'>Ranchi Municipal Corporation</h4></div>
            </div>
        </>
    )
}

//for redux
const mapStateToProps = (state) => {
    return {
        navCloseStatus: state.navCloseStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // buyCake: () => dispatch(buyCake())
        NAV_OPEN: (data2) => dispatch({ type: "NAV_OPEN" }),
        NAV_CLOSE: (data3) => dispatch({ type: "NAV_CLOSE" }),
        NAV_OPEN_ORIGINAL_STATUS: (data3) => dispatch({ type: "NAV_OPEN_ORIGINAL_STATUS" }),
        NAV_CLOSE_ORIGINAL_STATUS: (data3) => dispatch({ type: "NAV_CLOSE_ORIGINAL_STATUS" })
    };
};


// export default NavigationButton
export default connect(mapStateToProps, mapDispatchToProps)(NavButton);
/**
 * Exported to :
 * 1. Header Component
 */