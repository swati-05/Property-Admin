import React from 'react'
import './successcheck.css'

function SuccessCheck() {
    return (
        <>
            <div className="bg-white w-40 h-40">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SuccessCheck