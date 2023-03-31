import React from 'react'

function InfoNewAssessment(props) {
    return (
        <div className='w-full sm:w-4/5 lg:3/5 mx-auto'>
            <div className='bg-white shadow-xl flex justify-center items-center relative'>
                <button
                    onClick={props?.closeInfoModal}
                    type="button"
                    class="absolute top-6 right-6 bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center shadow-sm  hover:bg-red-200 hover:border-none"
                >
                    <svg class="w-5 h-5" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className="w-full px-4 mx-auto py-4 md:py-6 ">
                    <div
                        className="w-full">
                        <div>
                            <h2 className="text-3xl font-medium text-center">Apply Assessment</h2>
                            <div className="mt-2 text-center w-full">Choose from these assessment types</div>
                        </div>
                    </div>
                    <div className="my-10 relative">


                    </div>

                </div>
            </div>
        </div>
    )
}

export default InfoNewAssessment