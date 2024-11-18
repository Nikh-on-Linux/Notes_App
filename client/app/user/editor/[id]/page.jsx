"use client"
import React, { useState, useEffect, useRef } from 'react'
import { toast, Toaster } from 'sonner';
import { ChevronLeft, ArrowLeftIcon } from 'lucide-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { Trash2Icon } from 'lucide-react';

function EditorPage({ params }) {
  const [docValue, setDocValue] = useState('');
  const [docName, setDocName] = useState('');
  const [oldData, setOldData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const unRef = useRef(null);
  const router = useRouter();

  const saveFile2 = async () => {
    buttonRef.current.disabled = true;
    const response = await fetch("https://notes-app-1-kyvm.onrender.com/user/savefile", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        fileId: Number(params.id),
        filecontent: docValue
      })
    })

    const data = await response.json();

    if (data.suc) {
      buttonRef.current.disabled = true;
      unRef.current.style.display = "none"
      return data.msg

    }
    else {
      buttonRef.current.disabled = true;
      throw data.msg

    }
  }

  const changeContent = (value) => {
    setDocValue(value);
    oldData !== docValue ? unRef.current.style.display = "block" : unRef.current.style.display = "none"
  }

  useEffect(() => {

    const loadFileData = async () => {

      const response = await fetch(`https://notes-app-1-kyvm.onrender.com/user/loadfile`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          fileId: Number(params.id)
        })
      });

      const serverData = await response.json();

      if (serverData.suc) {

        setDocName(serverData.data.filename);
        setDocValue(serverData.data.filecontent);
        setOldData(serverData.data.filecontent);
        return serverData.msg;

      }
      else {

        throw serverData.msg

      }
    }

    loadFileData();
    // toast.promise(loadFileData, {
    //   loading: "Loading file, please wait..",
    //   success: (data)=>{return data},
    //   error: (data) => { return data }
    // })

  }, [])
  const modules = {
    // syntax:true,
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"], // Add video
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ["clean"],
    ],
  };
  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-row items-center justify-between " >
              <div>
                <h2>Save File</h2>
              </div>
              <div className='flex flex-row items-center space-x-3' >
                <AlertDialogCancel onClick={() => { setIsOpen(false) }} >Cancel</AlertDialogCancel>
                <AlertDialogAction ref={buttonRef} onClick={() => {
                  toast.promise(saveFile2, {
                    loading: "Saving file please wait...",
                    success: (data) => { setIsOpen(false); return data },
                    error: (data) => { setIsOpen(false); return data }
                  })
                }} >Save</AlertDialogAction>
              </div>
            </AlertDialogTitle>

          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <div className='w-full h-full flex flex-col space-y-3 px-2 py-1' >
        <div className='w-full flex flex-row items-center justify-between space-x-3 px-5 py-3 border-[0.1rem] bg-gradient-to-r from-secondary2 to-background ' >
          <div className='flex flex-row justify-center items-center space-x-4' >
            <ArrowLeftIcon onClick={() => { router.back() }} size={24} className='cursor-pointer transition-all hover:text-secondary' />
            <p className='font-medium text-2xl' >{docName}</p>
            <div ref={unRef} onClick={() => { setIsOpen(true) }} className='shadow-sm shadow-secondary bg-gradient-to-l hidden hover:scale-105 transition-all cursor-pointer border-[0.1rem] from-secondary to-secondary2 w-fit p-1 px-3 rounded-full' >
              <h1 className='text-xs select-none' >Unsaved changes</h1>
            </div>
          </div>
          <div>
            <Trash2Icon size={20} className='text-secondary2-foreground cursor-pointer hover:text-destructive transition-all' />
          </div>
        </div>
        <ReactQuill modules={modules} theme="snow" value={docValue} className='w-full border-[0.1rem] px-5 h-fit py-2 overflow-y-scroll overflow-x-hidden' onChange={changeContent} />
      </div>
    </>
  )
}

export default EditorPage