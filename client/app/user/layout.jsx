"use client"
import React, { useEffect, useRef, useState } from "react";
import SideBar from "@/components/blocks/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import InputC from '@/components/ui/inputCustom';
import { FileIcon } from 'lucide-react';
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const alertRef = useRef('');
  const buttonRef = useRef('');
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
        buttonRef.current.disabled = true;
        const response = await fetch('https://notes-app-1-kyvm.onrender.com/user/createfile', {
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
              fileId: Math.floor(Math.random() * 150) * Date.now(),
              filecontent: ''
            }
          })
        })

        const data = await response.json();

        if (data.suc) {
          setIsOpen(false);
          router.push(`/user/editor/${data.fileId}`);
          return data.msg

        }
        else {

          throw data.msg;

        }

      }, {
        loading: "Creating your file...",
        success: (data) => { buttonRef.current.disabled = false; setValue(''); return (data) },
        error: (data) => { buttonRef.current.disabled = false; setValue(''); return (data) }
      })

    }
    else {

      toast.error("No filename was provided");

    }

  }

  return (
    <main className="flex flex-row w-screen h-screen" >
      <Toaster richColors theme="dark" position="top-right" />
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
            <AlertDialogAction ref={buttonRef} onClick={createFile} >Create</AlertDialogAction>
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