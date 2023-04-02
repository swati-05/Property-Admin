//////////////////{*****}//////////////////////////////////////////
// Author - Talib Hussain
// Version - 1.0
// Date - 26 nov 2022
// Revision - 1
// Project - JUIDCO
// Component  - PilotWorkflowDocumentRow
// DESCRIPTION - #CASES HANDLED IN THIS FORM
//////////////////{*****}//////////////////////////////////////////
import { nullToNA } from '@/Components/PowerUps/PowerupFunctions'
import React from 'react'
import { FcDocument } from 'react-icons/fc'

function PilotWorkflowDocumentRow(props) {
    console.log('document base url at doc show....', props?.api?.documentBaseUrl)
    const base_url = props?.api?.documentBaseUrl
    return (
        <>
            <tr>

                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props?.index + 1}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {nullToNA(props?.docList?.doc_code)}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm cursor-pointer" onClick={() => props.openModal(`${base_url}/${props?.docList?.doc_path}`)}>
                    <div className="flex items-center">
                        {props?.docList?.doc_path?.split('.')[1] == 'pdf' &&
                            <div className="flex-shrink-0 text-[28px] border border-indigo-500">
                                <FcDocument />
                            </div>
                        }
                        {props?.docList?.doc_path?.split('.')[1] == 'jpg' &&
                            <div className="flex-shrink-0 border border-indigo-500 px-1 py-2">
                                <img src={`${base_url}/${props?.docList?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                            </div>
                        }
                        {props?.docList?.doc_path?.split('.')[1] == 'jpeg' &&
                            <div className="flex-shrink-0 border border-indigo-500 px-1 py-2">
                                <img src={`${base_url}/${props?.docList?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                            </div>
                        }
                        {props?.docList?.doc_path?.split('.')[1] == 'png' &&
                            <div className="flex-shrink-0 border border-indigo-500 px-1 py-2">
                                <img src={`${base_url}/${props?.docList?.doc_path}`} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                            </div>
                        }

                    </div>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {
                        props?.docList?.doc_code == 'PHOTOGRAPH' &&
                        <p className="whitespace-no-wrap">
                            NA
                        </p>
                    }
                    {
                        props?.docList?.doc_code != 'PHOTOGRAPH' &&
                        <>
                            <p className="whitespace-no-wrap">
                                {props?.docList?.verify_status == 0 && <>Pending</>}</p>
                            <p className="text-green-500 whitespace-no-wrap">
                                {props?.docList?.verify_status == 1 && <>Verified</>}</p>
                            <p className="text-red-500 whitespace-no-wrap">
                                {props?.docList?.verify_status == 2 && <>Rejected</>}
                            </p>
                        </>
                    }
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {nullToNA(props?.docList?.remarks)}
                </td>
            </tr>
        </>
    )
}

export default PilotWorkflowDocumentRow
