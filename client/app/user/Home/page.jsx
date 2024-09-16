"use client"
import React, { useRef, useState, useEffect } from 'react'
import SearchTab from '@/components/blocks/searchTab'
import ContentPanel from '@/components/blocks/contentPanel';
import { LoaderCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';

function HomePage() {

  const alertRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState('block');
  const [arrayState , setArrayState] = useState([]);
  const [teamArrayState , setTeamArrayState] = useState([]);

  useEffect(() => {

    const lets = (e) => {
      openBox();
    }

    const fetchData = async () => {
      
      if (localStorage.getItem('token') !== "") {

        const response = await fetch("http://localhost:3500/user/loadHome", {
          'method': "POST",
          "headers": {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            "token": localStorage.getItem("token")
          })
        })

        const serverdata = await response.json();

        if (serverdata.suc) {

          toast.success("User data loaded successfully");
          console.log(serverdata);
          setState('hidden');
          
          const tempArray = [];
          const teamArray = [];

          serverdata.docs.forEach((doc)=>{
            doc.isTeam ? teamArray.push(doc): teamArray.push(doc);
          })

          console.log(teamArray);
          setArrayState(teamArray);
        }
        else {

          toast.error("Failed to load user data");

        }

      }
      else {

        toast.error("Error fetching user data");

      }


    }

    fetchData();

    const event = new CustomEvent('destroy-loader')

    window.dispatchEvent(event);

    window.addEventListener("createFile", openBox);

  }, [])

  const openBox = (e) => {
    e.preventDefault();
    if (!isOpen) {
      setIsOpen(true);
    }
    else {

      setIsOpen(false);
    }

  }


  return (
    <>
      <div className={`w-full h-full ${state} absolute top-0 left-0 bg-transparent backdrop-blur-2xl z-50 flex flex-row items-center space-x-2 justify-center `} >
        <LoaderCircle size={20} className=' animate-spin text-secondary2-foreground' />
        <p className='text-secondary2-foreground font-medium text-xl' >Loading data</p>
      </div>
      <div className='h-full w-full py-5 px-2' >
        <SearchTab ></SearchTab>
        <ContentPanel heading={"Your files"} content={arrayState} ></ContentPanel>

        <ContentPanel heading={"Team work"} content={teamArrayState.length == 0 ? "" : teamArrayState} ></ContentPanel>
      </div>
    </>
  )
}

export default HomePage