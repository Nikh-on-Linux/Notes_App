"use client"
import React, { useEffect, useRef, useState } from "react";
import SideBar from "@/components/blocks/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import InputC from '@/components/ui/inputCustom';
import { FileIcon } from 'lucide-react';
import { Toaster, toast } from "sonner";

export default function Layout({ children }) {
  const alertRef = useRef('');
  const [value, setValue] = useState('');
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


  const createFile = async () => {

    if (value) {

      toast.promise(async () => {

        const response = await fetch('http://localhost:3500/user/createfile', {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem('token'),
            file: {
              filename: value,
              type: "file",
              isTeam: false,
            }
          })
        })

        const data = await response.json();

        if (data.suc) {

          setIsOpen(false);
          return data.msg

        }
        else {

          throw data.msg;

        }

      }, {
        loading: "Creating your file...",
        success: (data) => { return (data) },
        error: (data) => { return (data) }
      })

    }
    else {

      toast.error("No filename was provided");

    }

  }

  return (
    <main className="flex flex-row w-screen h-screen" >
      <Toaster richColors theme="dark" position="bottom-right" />
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger ref={alertRef} asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new file</AlertDialogTitle>
            <AlertDialogDescription>
              <InputC valueFetcher={(v) => { setValue(v) }} placeholder={"Enter the name of your file"} type={"text"} clearable={true} startContent={<FileIcon size={20} className='' />} ></InputC>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={openBox} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={createFile} >Create</AlertDialogAction>
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