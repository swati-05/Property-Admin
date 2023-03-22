//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 16 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - 
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import MailboxSidebar from '@/Components/Common/MailboxSidebar'
import PaymentListAndViewDetails from './PaymentListAndViewDetails'
import TestPayment from './TestRzp/TestPayment'
import MasterPaymentIndex from './Screens/MaterEntryScreens/MasterPaymentIndex'
import PaymentReconcileIndex from './PaymentReconcile/PaymentReconcileIndex'
import PaymentDashboard from './PaymentDashboard'
import CashVerificationIndex from './CashVerification/CashVerificationIndex'
import WhatsAppChatHistoryIndex from './WhatsAppChatHistory/WhatsAppChatHistoryIndex'
// import PropertyNoticeIndex from './PropertyNoticeIndex'


function PaymentMasterSidebar() {
    const [tabIndex, settabIndex] = useState(0)     //state to store current tab index
    const tabs = [
        { title: "Dashboard", tabIndex: 0 },
        { title: "Transactions", tabIndex: 1 },
        { title: "Master", tabIndex: 2 },
        { title: "CashVerification", tabIndex: 3 },
        { title: "BankReconciliation", tabIndex: 4 },
        { title: "WhatsAppChatHistory", tabIndex: 5 },

    ]
    const tabSwitch = (index) => {        //tabSwitch function receive tabIndex to switch between tabs called from Sidebar menu
        settabIndex(index)      //updating the tab index to recent value
    }
    return (
        <>

            <div className="grid grid-cols-12 rounded-lg mt-4 -ml-10 shadow-xl broder-2">
                <div className='col-span-12 sm:col-span-2 '>
                    <MailboxSidebar tabs={tabs} fun={tabSwitch} /></div>
                {tabIndex == 0 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <PaymentDashboard /> </div>}
                {tabIndex == 1 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <PaymentListAndViewDetails /> </div>}
                {tabIndex == 2 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <MasterPaymentIndex /> </div>}
                {tabIndex == 3 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <CashVerificationIndex /> </div>}
                {tabIndex == 4 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <PaymentReconcileIndex /> </div>}
                {tabIndex == 5 && <div className='col-span-12 sm:col-span-12 shadow-lg overflow-y-scroll' style={{ 'height': '90vh' }}> <WhatsAppChatHistoryIndex /> </div>}

            </div>
        </>
    )
}

export default PaymentMasterSidebar
/**
 * Exported to :
 * 1. NoticeIndex.js
 * 
 * 
 */