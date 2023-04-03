//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 16th Nov., 2022  01:30 PM
// Project     : JUIDCO
// Component   : ClusterFormIndex
// Description : Cluster Index Page
//////////////////////////////////////////////////////////////////////

import React from 'react'
import ClusterTable from './ClusterTable'
import './Fonts.css'

const ClusterFormIndex = () => {
  return (
    <div className='poppins'>

<div className="uppercase font-semibold text-gray-700 text-lg sm:text-2xl py-2 text-center tracking-wide sm:tracking-[0.7rem]">
            Cluster Workflow
          </div>
          <div className="w-full h-[0.15rem] bg-gray-400 mb-6"></div>
    
      <ClusterTable/>

    </div>
  )
}

export default ClusterFormIndex