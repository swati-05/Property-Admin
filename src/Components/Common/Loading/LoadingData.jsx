import React from 'react'
import {GiRocket} from 'react-icons/gi'

function LoadingData() {
    return (
        <div>
            {/* <img src={rocketImage} alt="rocket" /> */}
            <div><GiRocket style={{'fontSize':'120px'}} className='mx-auto rotate-45 animate-bounce '  /></div>
            <div>loadingData</div>
        </div>

    )
}

export default LoadingData