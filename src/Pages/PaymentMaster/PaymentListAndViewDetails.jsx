//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 18 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - PaymentListAndViewDetails
//    DESCRIPTION -PaymentListAndViewDetails
//////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react'
import PaymentsList from './PaymentsList'
import ViewPaymnetDetailsModal from './ViewPaymnetDetailsModal'

function PaymentListAndViewDetails(props) {

  const [selectedFormId, setSelectedFormId] = useState()
  const [openPopUp, setOpenPopUp] = useState(0)




  const handleViewBtn = (e) => {
    console.log("order id view btn cliked", e)
    setSelectedFormId(e)
    setOpenPopUp(openPopUp + 1)
  }

  return (
    <>

      {/* <div>{props.title}</div> */}
      <PaymentsList viewActionBtnAllDetails={handleViewBtn} />

      <ViewPaymnetDetailsModal openPopUp={openPopUp} selectedOrderId={selectedFormId} />
    </>
  )
}

export default PaymentListAndViewDetails


/**
 * Exported to :
 * 1. PaymentMasterSidebar.js
 * 
 * 
 */