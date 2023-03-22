import { useState } from 'react'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import CitizenTaxCard from './CitizenTaxCard'
import pointer from '@/Components/Media/pointer.png'
import Modal from 'react-modal';
import './animateModal.css'
import RentalRate1 from './RateChart/RentalRate1'
import UsageFactor2 from './RateChart/UsageFactor2'
import RentalRate2 from './RateChart/RentalRate2'
import CircleRate3 from './RateChart/CircleRate3'
import OccupancyFactor3 from './RateChart/OccupancyFactor3'
import MatrixFactor3 from './RateChart/MatrixFactor3'
import CalculationFactor3 from './RateChart/CalculationFactor3'
import OccupancyFactor2 from './RateChart/OccupancyFactor2'
import taxreport from './Media/taxreport.svg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none'
  }
};
// Modal.setAppElement('#root');
Modal.setAppElement('#modal');
function PropertyTaxReview(props) {
  const [rateChartText, setRateChartText] = useState('')

  const [modalIsOpen, setIsOpen] = useState(false);
  const [taxDescriptionState, setTaxDescriptionState] = useState(false)

  function openModal(chartText) {
    setIsOpen(true);
    setRateChartText(chartText)
  }
  function closeModal() {
    // document.getElementById('root').style.filter = 'none'
    setIsOpen(false);
    setRateChartText('')
  }
  return (

    <>
      <div className={` block p-4  w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg shadow-lg bg-white md:w-full mx-auto overflow-x-auto`}>
        <h1 className='px-2 font-semibold mt-0 bg-green-400 text-center text-white font-serif py-2 text-lg shadow-lg border border-white'>Calculated Holding Tax</h1>

        <div className="grid grid-cols-3 mt-8 md:px-20">
          <div className='px-4 py-4 text-sm relative'>

            {/* <div>Ward : <span className='text-sm text-black font-semibold font-mono ml-2'>12</span></div>
            <div>Property Type : <span className='text-sm text-black font-semibold font-mono ml-2'>Independent</span></div>
            <div>Occupany Type : <span className='text-sm text-black font-semibold font-mono ml-2'>Self-Occupied</span></div>
            <div>Construciton Type : <span className='text-sm text-black font-semibold font-mono ml-2'>Residential</span></div> */}
            <img className='inline w-44 -top-4 absolute' src={taxreport} alt="image data" />

          </div>
          <div className=''><CitizenTaxCard time="" tax={props?.reviewData?.totalTax} /></div>
          <div><CitizenTaxCard time="quaterly" tax="50" /></div>
        </div>
        <div className="grid grid-cols-4 mt-8">
          <div className='text-center mt-4 col-span-2 col-start-2 px-14'>
            <button onClick={() => setTaxDescriptionState(!taxDescriptionState)} type="button" className="w-full px-6 py-1 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-amber-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out">{!taxDescriptionState ? 'See Tax Description' : 'Hide Tax Description'}</button>
          </div>
        </div>



        {taxDescriptionState &&
          <div className=''>
            {/* tax 1 */}
            <div className='mt-8' >
              <div className='px-1 flex  font-serif text-xs underline'><div className='bg-gray-800 w-4 h-4 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>1</div> Tax Description of Annual Rental Value - As Per Old Rule (Effect Upto <div className='font-semibold'>31-03-2016</div> )</div>
              {/* Tax description */}
              <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>

                <div>
                  <div>
                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Usage Type</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Rental Rate</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Built Up Area (in Sq. Ft)</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">ARV</th>


                        </tr>
                      </thead>
                      <tbody className="text-sm">

                      {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet1')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.circleRate}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.calculationFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.matrixFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.holdingTax}</span></td>

                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Below taxes are calculated on quarterly basis( Property Tax / 4 ).</h1>

                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">ARV</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Holding Tax</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Water Tax</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Latrine/Conservancy Tax</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Education Cess</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Health Cess</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Quarterly Tax</th>


                        </tr>
                      </thead>
                      <tbody className="text-sm">

                      {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet1')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index+1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.totalTax}</span></td>


                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                  {/* tax description toggle button */}

                  {/* Tax description */}
                  <div className='mt-10 bg-amber-100 pb-6'>
                    {/* formula text */}
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                    <div className='flex font-mono text-xs bg-amber-100 py-2 px-1 text-gray-900'>
                      <div className='flex-initial px-2 font-bold'>Annual Rental Value (ARV)</div>
                      <div className='flex-initial px-2'>=</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Builtup Area</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Rental Rate</div>
                    </div>

                    <div className='flex-initial px-3 text-xs'>(After calculating the A.R.V. the rebates are allowed in following manner : -Holding older than 25 years (as on 1967-68) - 10% Own occupation)</div>


                    {/* Calculation Rates*/}

                    <div className='flex font-mono text-xs bg-amber-100 px-1 mt-3'>
                      <div onClick={() => openModal('rental_rate1')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Rental Rate</span></div>

                    </div>

                    {/* Usage Types percenatage*/}
                    <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Usage Type tax %</h1>
                    <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Residential - <span className='font-mono text-sm font-semibold'>30%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial - <span className='font-mono text-sm font-semibold'>15%</span></span></div>


                    </div>
                    {/* Other taxes percenatage*/}
                    <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Other Taxes %</h1>
                    <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Holding tax - <span className='font-mono text-sm font-semibold'>30%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Latrine tax - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Water tax  - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Health cess - <span className='font-mono text-sm font-semibold'>15%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Education cess - <span className='font-mono text-sm font-semibold'>15%</span></span></div>


                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* tax 2 */}

            <div className='mt-16' id="scr">
              <h1 className='px-1 flex  font-serif text-xs underline'><div className='bg-gray-800 w-4 h-4 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>2</div>Tax Description Annual Rental Value - As ARV Rule (Effect From 01-04-2016 to 31-03-2022)</h1>
              {/* Tax description */}
              <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>

                <div>

                  <div>

                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Capital Value Rate</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Buildup Area</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Occupancy Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Tax Percentage</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Calculation Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Matrix Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Property Tax</th>

                        </tr>
                      </thead>
                      <tbody className="text-sm">

                      {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet2')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.circleRate}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.buildupArea}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.occupancyFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.taxPerc}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.calculationFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.matrixFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.holdingTax}</span></td>

                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Total Quarterly Tax Details ((ARV X 2%) / 4).</h1>

                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Property Tax </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Holding Tax </th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Additional Tax</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Quarterly Tax (Total)</th>


                        </tr>
                      </thead>
                      <tbody className="text-sm">

                      {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet2')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index+1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.totalTax}</span></td>


                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                  {/* tax description toggle button */}

                  {/* Tax description */}
                  <div className='mt-10 bg-amber-100 pb-6'>
                    {/* formula text */}
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                    <div className='flex font-mono text-xs bg-amber-100 py-3 px-1 text-gray-900'>
                      <div className='flex-initial px-2 font-bold'>Annual Rental Value (ARV)</div>
                      <div className='flex-initial px-2'>=</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Carpet Area</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Usage Factor</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Occupancy Factor</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Tax Percentage</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Rental Rate</div>

                    </div>
                    {/* Calculation Rates*/}

                    <h1 className='px-4 font-semibold mt-4 text-gray-600 text-xs'>Rates</h1>
                    <div className='flex font-mono text-xs bg-amber-100 px-1'>
                      <div onClick={() => openModal('usageFactor_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Usage Factor </span></div>
                      <div onClick={() => openModal('occupancyFactor_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Occupancy Factor</span></div>
                      <div onClick={() => openModal('rental_rate2')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Rental Rate</span></div>
                    </div>

                    {/* Usage Types percenatage*/}
                    <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Carpet Area</h1>
                    <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Carpet area for residential - <span className='font-mono text-sm font-semibold'>70% of builtup area</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Carpet area for commercial - <span className='font-mono text-sm font-semibold'>80% of builtup area</span></span></div>


                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* tax 3 */}
            <div className='mt-16'>
              <h1 className='px-1 flex  font-serif text-xs underline'><div className='bg-gray-800 w-4 h-4 rounded-full flex justify-center items-center inline mr-2 ml-3 shadow-lg border border-white text-white'>3</div>Tax Description of Capital Value - As Per Current Rule (Effect From 01-04-2022)</h1>
              {/* Tax description */}
              <div className={` block p-4 mt-2 w-full md:py-4 md:px-4 md:pb-0 md:pt-0 rounded-lg bg-gray-50 md:w-full mx-auto overflow-x-auto`}>

                <div>
                  <div>
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>For Building</h1>

                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Capital Value Rate</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Buildup Area</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Occupancy Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Tax Percentage</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Calculation Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Matrix Factor</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Property Tax</th>

                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet3')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index + 1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.circleRate}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.buildupArea}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.occupancyFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.taxPerc}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.calculationFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.matrixFactor}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.holdingTax}</span></td>

                          </tr>
                        ))}
                       

                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs'>Below taxes are calculated on quarterly basis( Property Tax / 4 ).</h1>

                    <table className='min-w-full leading-normal mt-2'>
                      <thead className='font-bold text-left text-sm bg-amber-100 text-gray-600'>
                        <tr>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">#</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Effect From</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Property Tax )</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Holding Tax )</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Additional Tax</th>
                          <th className="px-2 py-3 border-b border-gray-200  text-left text-xs uppercase text-left">Quarterly Tax (Total)</th>


                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {props?.reviewData?.details?.filter(data => data.ruleSet == 'RuleSet3')?.map((fdata, index) => (
                          <tr className="bg-white shadow-lg border-b border-gray-200">
                            <td className="px-2 py-2 text-sm text-left">{index+1}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.effectFrom}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left">{fdata?.holdingTax}</td>
                            <td className="px-2 py-2 text-sm text-left"><span className='bg-amber-200 px-2 py-1 rounded-lg shadow-lg border border-white'>{fdata?.totalTax}</span></td>


                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                  {/* tax description toggle button */}

                  {/* Tax description */}
                  <div className='mt-10 bg-amber-100 pb-6'>
                    {/* formula text */}
                    <h1 className='px-2 font-semibold mt-4 text-gray-600 text-xs bg-white'>Tax Description</h1>
                    <div className='flex font-mono text-xs bg-amber-100 py-3 px-1 text-gray-900'>
                      <div className='flex-initial px-2 font-bold'>Property Tax</div>
                      <div className='flex-initial px-2'>=</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Capital Value Rate</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Builtup Area</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Occupancy Factor</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Tax Percentage</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Calculation Factor</div>
                      <div className='flex-initial px-2'>x</div>
                      <div className='flex-initial px-2 bg-gray-100 rounded-lg shadow-lg'>Matrix Factor Rate</div>
                    </div>
                    {/* Calculation Rates*/}

                    <h1 className='px-4 font-semibold mt-4 text-gray-600 text-xs'>Rates</h1>
                    <div className='flex font-mono text-xs bg-amber-100 px-1'>
                      <div onClick={() => openModal('circle_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Circle Rate</span></div>
                      <div onClick={() => openModal('occupancyFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Occupancy Factor</span></div>
                      <div onClick={() => openModal('matrixFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View  Matrix Factor Rate</span></div>

                      <div onClick={() => openModal('calculationFactor_rate3')} className='flex-initial px-2 text-white rounded-lg mt-4'><span className='bg-gray-200 border border-white text-gray-900 px-2 py-2 shadow-lg rounded-lg cursor-pointer hover:bg-white'><img className='w-5 inline' src={pointer} alt="icon-image" /> View Calculation Factor</span></div>
                    </div>

                    {/* Usage Types percenatage*/}
                    <h1 className='px-4 font-semibold mt-8 text-gray-600 text-xs underline'>Usage Type tax %</h1>
                    <div className='flex font-serif text-xs bg-amber-100 px-1 mt-2'>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Residential - <span className='font-mono text-sm font-semibold'>0.075%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial - <span className='font-mono text-sm font-semibold'>0.150%</span></span></div>
                      <div className='flex-initial px-2 text-white rounded-lg'><span className='text-gray-900 px-2 py-2 rounded-lg'> Commercial & greater than 25000 sqft - <span className='font-mono text-sm font-semibold'>0.20%</span></span></div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        }
        <div className='md:px-10 text-right mt-10 mb-5'>
          <button onClick={() => props.backFun(2)} type="button" className=" px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"><BsChevronDoubleLeft className=' inline font-semibold text-sm md:text-lg' /> Edit</button>
        </div>
      </div>
      <div className='w-full h-40'></div>

      {/* rate modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div className="relative rounded-xl p-6 border-2 border-gray-200 rounded bg-white">
          {(rateChartText == 'rental_rate1') && <RentalRate1 />}
          {(rateChartText == 'usageFactor_rate2') && <UsageFactor2 />}
          {(rateChartText == 'occupancyFactor_rate2') && <OccupancyFactor2 />}
          {(rateChartText == 'rental_rate2') && <RentalRate2 />}
          {(rateChartText == 'circle_rate3') && <CircleRate3 />}
          {(rateChartText == 'occupancyFactor_rate3') && <OccupancyFactor3 />}
          {(rateChartText == 'matrixFactor_rate3') && <MatrixFactor3 />}
          {(rateChartText == 'calculationFactor_rate3') && <CalculationFactor3 />}
        </div>
      </Modal>
    </>
  )
}

export default PropertyTaxReview