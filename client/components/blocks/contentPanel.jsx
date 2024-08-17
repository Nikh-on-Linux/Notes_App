"use client"
import React, { useRef, useState } from 'react'
import CardDom from './cardDom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';

function ContentPanel({ heading, content }) {

  const container = useRef(null);
  const [left, setLeft] = useState('hidden');
  const [right, setRight] = useState('block');

  const leftScroll = () => {
    container.current.scrollLeft -= 256;
  }

  const validity = ()=>{
    // alert(container.current.offsetWidth / 250);
    if(container.current.scrollLeft  === 0){
      setLeft('hidden');
      setRight('block');
    }
    
    else if(container.current.scrollLeft == (container.current.offsetWidth / 250)){
      setLeft('block');
      setRight('hidden');
    }
  }

  const rightscroll = () => {
    container.current.scrollLeft += 256;
    setLeft('block');
  }

  return (

    <div className='flex px-8 py-3 flex-col flex-1 relative space-y-5 my-5 ' >
      <h2 className='text-secondary-foreground font-semibold text-2xl font-sans' >{heading}</h2>
      <Button onClick={leftScroll} variant="secondary" className={`group absolute ${left} transition-all z-20 left-1 top-[50%]`} size={"icon"} >
        <ChevronLeftIcon className='w-5 h-5 font-medium text-background transition-all group-hover:text-secondary-foreground' ></ChevronLeftIcon>
      </Button>
      <div ref={container} onScroll={validity} className='flex scroll-smooth w-full flex-row overflow-hidden items-center py-5' >
        {
          content.map((item) => {
            return (
              <CardDom key={item.id} cardname={item.cardname} isTeam={item.isTeam} createdby={item.createdby} />
            )
          })
        }
      </div>
      <Button onClick={rightscroll} variant="secondary" className={`group absolute ${right} transition-all z-20 right-1 top-[50%]`} size={"icon"} >
        <ChevronRightIcon className='w-5 h-5 font-medium text-background transition-all group-hover:text-secondary-foreground' ></ChevronRightIcon>
      </Button>

    </div>
  )
}

export default ContentPanel