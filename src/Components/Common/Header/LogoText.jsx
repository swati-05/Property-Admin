//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - LogoText
//    DESCRIPTION - LogoText Component
//////////////////////////////////////////////////////////////////////////////////////
import logo from './logo1.png'

function LogoText() {
  return (
    <>


      <div className="grid grid-cols-12 place-items-center h-full">
        <div className='col-span-2 col-start-2'><img style={{ 'width': '40px' }} src={logo} alt="hello" /></div>
        <div className='col-span-9'><h4 className='text-blue-400 font-bold text-lg'>JHARKHAND</h4></div>
        {/* <div className='col-span-9'><h4 className='text-gray-800 font-bold text-lg'>JHARKHAND</h4></div> */}
      </div>
    </>
  )
}

export default LogoText
/**
 * Exported to :
 * 1. Header Component
 */