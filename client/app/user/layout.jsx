"use client"
import React, { useEffect, useRef , useState } from "react";
import SideBar from "@/components/blocks/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import InputC from '@/components/ui/inputCustom';
import { FileIcon } from 'lucide-react';

export default function Layout({ children }) {
  const alertRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("createFile", openBox);
  }, [])

  const openBox = (e) => {
    e.preventDefault();
    if (!isOpen) {
      // alertRef.current.onOpenChange = true;
      setIsOpen(true);
    }
    else {

      setIsOpen(false);
      // alertRef.current.onOpenChange = false;
    }

  }

  return (
    <main className="flex flex-row w-screen h-screen" >
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger ref={alertRef} asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new file</AlertDialogTitle>
            <AlertDialogDescription>
              <InputC placeholder={"Enter the name of your file"} type={"text"} clearable={true} startContent={<FileIcon size={20} className='' />} ></InputC>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={openBox} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={openBox} >Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SideBar></SideBar>
      <div className="w-[50rem] relative flex-1" >
        {children}
      </div>
    </main>
  )
}