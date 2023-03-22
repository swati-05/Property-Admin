import React,{useState} from 'react'


function InputChip() {
    const [chipValue, setChipValue] = useState()
const [chipArray, setChipArray] = useState([])
  return (
    <>
        <input type="text" value={chipValue} onChange={(e)=> setChipValue(e.target.value)} />
        <button onClick={()=> setChipArray([...chipArray,chipValue])}>click me</button>

        <div>
            {
                chipArray.map((chip)=>{
                    <span className='bg-red-200 text-black shadow-lg ml-4'>{chip}</span>
                })
            }
        </div>
    </>
  )
}

export default InputChip