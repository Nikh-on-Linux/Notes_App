"use client"
import React, { useEffect, useState } from 'react'
import AvatarDom from './avatar';
import SideTab from './sidetabs';
import { FilePlus2Icon, HomeIcon, BellIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SideBar() {

  const fireEvent = () => {
    const eventGen = new CustomEvent('createFile', { msg: 'open file' });

    window.dispatchEvent(eventGen);

  }

  const router = useRouter();
  const [userEmail, setUserEmail] = useState('nameandemail@gmail.com');
  const [userName, setUserName] = useState('Name Lastname');

  useEffect(() => {
    const loadUser = async () => {

      if (localStorage.getItem('token')) {
        const response = await fetch('http://localhost:3500/user/userinfo', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: localStorage.getItem('token')
          })
        });

        const serverData = await response.json();

        if (serverData.suc) {

          setUserEmail(serverData.data.email);
          setUserName(`${serverData.data.name.firstname} ${serverData.data.name.lastname}`);

          return serverData.msg

        }
        else {

          throw serverData.msg

        }
      }
      else {
        router.push('/auth/login');
      }
    }

    loadUser();
  }, [])

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
        <div onClick={()=>{router.push('/user/settings')}} className='flex flex-row items-center space-x-2 p-2 rounded-md select-none overflow-hidden cursor-pointer hover:bg-secondary transition-all bg-card border-[0.1rem]' >
          <AvatarDom fallback={"US"} imageurl={"https://github.com/shadcn.png"} />
          <div>
            <h2 className='text-lg text-secondary-foreground font-medium' >{userName}</h2>
            <p className='text-xs text-primary '>{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar