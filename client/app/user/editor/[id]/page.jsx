"use client"
import React, { useState, useEffect } from 'react'
import { toast , Toaster } from 'sonner';
import { ChevronLeft, ArrowLeftIcon } from 'lucide-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

function EditorPage({ params }) {
  const [docValue, setDocValue] = useState('');
  const [docName, setDocName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const saveFile = async () => {
    alert(docValue)
    const serverResponse = await fetch('http://localhost:3500/user/saveFile', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        fileId: Number(params.id),
        filecontent: String(docValue),
      })
    });

    const serverData = await serverResponse.json();

    if (serverData.suc) {

      return serverData.msg;

    }
    else {

      throw serverData.msg;

    }

  }

  useEffect(() => {

    const loadFileData = async () => {

      const response = await fetch(`http://localhost:3500/user/loadfile`, {
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
  return (
    <>
      <Toaster richColors theme='dark' position='bottom-right' />
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
                <AlertDialogAction onClick={() => {
                  toast.promise(saveFile, {
                    loading: "Saving file please wait...",
                    success: (data) => { return data },
                    error: (data) => { return data }
                  })
                }} >Save</AlertDialogAction>
              </div>
            </AlertDialogTitle>

          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <div className='w-full h-full flex flex-col space-y-5 px-2 py-2' >
        <div className='w-full flex flex-row items-center space-x-3 px-5 py-3 border-[0.1rem] bg-gradient-to-r from-secondary2 to-background ' >
          <ArrowLeftIcon onClick={() => { router.back() }} size={24} className='cursor-pointer' />
          <p className='font-medium text-2xl' >{docName}</p>
          <div onClick={() => { setIsOpen(true) }} className='bg-gradient-to-l hover:scale-105 transition-all cursor-pointer border-[0.1rem] from-secondary to-secondary2 w-fit p-1 px-3 rounded-full' >
            <h1 className='text-xs select-none' >Unsaved changes</h1>
          </div>
        </div>
        <ReactQuill theme="snow" value={docValue} className='w-full border-[0.1rem] px-5 py-2 flex-1 overflow-y-scroll overflow-x-visible' onChange={setDocValue} />
      </div>
    </>
  )
}

export default EditorPage