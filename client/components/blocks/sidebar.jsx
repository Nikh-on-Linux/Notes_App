"use client"
import React , {useEffect} from 'react'
import AvatarDom from './avatar';
import SideTab from './sidetabs';
import { FilePlus2Icon, HomeIcon, BellIcon } from 'lucide-react';

function SideBar() {

  const fireEvent  =()=>{
    const eventGen = new CustomEvent('createFile',{msg:'open file'});

    window.dispatchEvent(eventGen);

  }
  
  return (
    <div className='font-sans flex flex-col justify-between px-2 py-5 h-full bg-background border-[0.1rem] w-[16rem]' >
      <div className='flex flex-col space-y-16' >
        <div>
          <h2 className='font-bold text-2xl text-primary select-none hover:text-secondary cursor-pointer transition-all' >The Notes</h2>
        </div>
        <div className=' flex flex-col space-y-5' >
          <SideTab tabname={"Home"} ><HomeIcon size={20} className='text-secondary-foreground' /></SideTab>
          <SideTab tabname={"Notifications"} ><BellIcon size={20} className='text-secondary-foreground' /></SideTab>
          <SideTab tabname={"Create File"} isButton={true} callback={fireEvent} ><FilePlus2Icon size={20} className='text-secondary-foreground' /></SideTab>
        </div>
      </div>
      <div>
        <div className='flex flex-row items-center space-x-2 p-2 rounded-md select-none cursor-pointer hover:bg-secondary transition-all bg-card border-[0.1rem]' >
          <AvatarDom fallback={"US"} imageurl={"https://github.com/shadcn.png"} />
          <div>
            <h2 className='text-lg text-secondary-foreground font-medium' >Name lastname</h2>
            <p className='text-xs text-primary '>nameandemail@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar