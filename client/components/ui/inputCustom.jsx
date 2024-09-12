"use client"
import React, { useRef, useState } from 'react'
import { CircleXIcon } from 'lucide-react'

function InputC({ startContent, endContent, placeholder, type, clearable , valueFetcher }) {

  const inputRef = useRef(null);
  const [inputvalue, setValue] = useState('');
  const [isVisi, setVisi] = useState('hidden');


  const change = (e) => {

    if (e.target.value) {
      setVisi("block");

      return null;
    }
    else {
      setVisi('hidden');
    }

  }

  const clear = () => {
    setValue("");
    valueFetcher("");
    setVisi("hidden");
  }
  // visibleRef.current.style.display = "none"

  return (
    <div className='flex w-full justify-between flex-row items-center bg-secondary border-2 border-background space-x-2 rounded-lg py-2 px-3' >

      <div className='flex 0 flex-row items-center w-full space-x-3' >
        <div>{startContent}</div>

        <input onInput={(e) => { setValue(e.target.value); valueFetcher(e.target.value) ;change(e); }} value={inputvalue} ref={inputRef} type={type} placeholder={placeholder} className='bg-transparent text-secondary-foreground w-full font-sans outline-none border-none rounded-lg' />
      </div>

      <div className='min-w-4 min-h-4 flex space-x-2 flex-row items-center' >
        {clearable ? <CircleXIcon onClick={clear} className={`w-4 h-4 text-primary cursor-pointer ${isVisi}`} /> : ""}
        {endContent}
      </div>
    </div>
  )
}

export default InputC