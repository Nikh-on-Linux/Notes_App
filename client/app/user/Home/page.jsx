"use client"
import React, { useRef, useState, useEffect } from 'react'
import SearchTab from '@/components/blocks/searchTab'
import ContentPanel from '@/components/blocks/contentPanel';
import { LoaderCircle } from 'lucide-react';

function HomePage() {

  const alertRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [state,setState] = useState('block');

  useEffect(() => {

    const fuck = (e) => {
      openBox();
    }

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
        <ContentPanel heading={"Your files"} content={[
          {
            id: 1,
            cardname: "Filename 1",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: false,

          },
          {
            id: 3,
            cardname: "Filename 3",
            createdby: "username",
            isTeam: false,

          }]} ></ContentPanel>

        <ContentPanel heading={"Team work"} content={[
          {
            id: 1,
            cardname: "Filename 1",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 2,
            cardname: "Filename 2 ",
            createdby: "username",
            isTeam: true,

          },
          {
            id: 3,
            cardname: "Filename 3",
            createdby: "username",
            isTeam: true,

          }]} ></ContentPanel>
      </div>
    </>
  )
}

export default HomePage