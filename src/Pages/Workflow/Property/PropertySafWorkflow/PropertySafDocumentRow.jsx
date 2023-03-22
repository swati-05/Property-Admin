//////////////////////////////////////////////////////////////////////////////////////
//    Author - R U Bharti
//    Version - 1.0
//    Date - 26th Nov, 2022
//    Revision - 1
//    Project - JUIDCO
/////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import {FcDocument} from 'react-icons/fc'

function PropertySafDocumentRow(props) {
    return (
        <>
            <tr>

                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                       {props?.index+1}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                    {props?.docList?.doc_type}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm cursor-pointer" onClick={() => props.openModal(props?.docList?.doc_path)}>
                <div className="flex items-center">
                        { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'pdf' &&  <div className="flex-shrink-0 text-[28px]">
                            <FcDocument/>
                        </div>
                        }
                         { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'jpg' &&  <div className="flex-shrink-0">
                            <img src={props?.docList?.doc_path} alt="" className="md:w-[2vw] w-[5vw]" srcset="" />
                        </div>
                        }
                        { (((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1)).substring((props?.docList?.doc_path).substring(props?.docList?.doc_path.lastIndexOf('/')+1).lastIndexOf(".") + 1)) == 'jpeg' &&  <div className="flex-shrink-0">
                            <img src={props?.docList?.doc_path} className="md:w-[2vw] w-[5vw]" alt="" srcset="" />
                        </div>
                        }
                    </div>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="whitespace-no-wrap">
                        {props?.docList?.verify_status == 0 && <>Pending</>}</p>
                        <p className="text-green-500 whitespace-no-wrap">
                        {props?.docList?.verify_status == 1 && <>Verified</>}</p>
                        <p className="text-red-500 whitespace-no-wrap">
                        {props?.docList?.verify_status == 2 && <>Rejected</>}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {props?.docList?.remarks == null ? <i>N/A</i> : props?.docList?.remarks}
                </td>
            </tr>
        </>
    )
}

export default PropertySafDocumentRow
