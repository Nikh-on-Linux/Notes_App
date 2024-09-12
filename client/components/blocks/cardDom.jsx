"use client"
import React, { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import TCardDom from './tCardDom';
import { MoreVerticalIcon, CopyIcon, FolderPenIcon, PencilIcon, Share2Icon, UserPlus2Icon, Trash2Icon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import InputC from '../ui/inputCustom';
import { Button } from '../ui/button';
import { useRouter , useParams } from 'next/navigation';

function CardDom({ cardname, createdby, isTeam , fileId }) {

  const alertRef = useRef('');
  const buttonRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [popboxState, setPopBox] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [cardnameState, setCardNameState] = useState(cardname);
  const router = useRouter();
  
  const openBox = () => {

    if (!isOpen) {
      // alertRef.current.onOpenChange = true;
      setIsOpen(true);
    }
    else {

      setIsOpen(false);
      // alertRef.current.onOpenChange = false;
    }

  }

  const deleteFile = () => {

    toast.info("The file cannot be restored again!");

    toast.promise(async () => {

      const response = await fetch('http://localhost:3500/user/deletefile', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          filename: cardnameState
        })
      })

      const serverData = await response.json();

      if (serverData.suc) {

        return serverData.msg;

      }
      else {

        throw serverData.msg;

      }

    }, {
      loading: `Deleting ${cardname} ...`,
      success: (data) => { setIsOpen(false); toast.info('Make sure to refresh the page to see the changes'); return data; },
      error: (data) => { setIsOpen(false); return data; },
    })


  }

  const cloneFile = () => {

    toast.promise(async () => {

      const response = await fetch("http://localhost:3500/user/clonefile", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          filename: cardname
        })
      })

      const data = await response.json();

      if (data.suc) {

        return data.msg

      }
      else {

        throw data.msg

      }

    }, {
      loading: "Cloning file...",
      success: (data) => { return data; },
      error: (data) => { return data; },
    })

  }

  const renameFile = () => {

    if (popboxState) {

      setPopBox(false);
      setRenameValue('');

    }
    else {
      setPopBox(true);
      setRenameValue('');
    }

  }

  const rename2 = () => {

    if (renameValue != "") {

      buttonRef.current.disabled = true;

      toast.promise(async () => {

        const response = await fetch("http://localhost:3500/user/renamefile", {
          method: "PATCH",

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            token: localStorage.getItem('token'),
            filename: cardname,
            newFilename: renameValue

          })
        })

        const data = await response.json();

        if (data.suc) {

          return data.msg;

        }
        else {

          throw data.msg;

        }

      }, {
        loading: "Renaming please wait...",
        success: (data) => { setCardNameState(renameValue); setPopBox(false) ;setRenameValue(''); buttonRef.current.disabled = false; return data },
        error: (data) => { setRenameValue(''); setPopBox(false) ;buttonRef.current.disabled = false; return data },
      })

    }
    else {

      buttonRef.current.disabled = false;
      toast.error('No filename is provided');

    }

  }

  if (!isTeam) {
    return (
      <>
        <Dialog modal open={popboxState} >
          <DialogTrigger></DialogTrigger>
          <DialogContent onOpenFocus onPointerDownOutside={renameFile} >
            <DialogHeader>
              <DialogTitle>Rename your file</DialogTitle>
              <DialogDescription>
                Rename your file here
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col space-y-8' >
              <InputC valueFetcher={(value) => { setRenameValue(value) }} clearable={true} placeholder={"Filename"} startContent={<FolderPenIcon size={20} />} />
              <div className='flex flex-row space-x-3 justify-end ' >
                <div className='flex flex-row space-x-2 justify-between ' >
                  <Button variant={"secondary"} type="button" onClick={renameFile} >Close</Button>
                  <Button ref={buttonRef} onClick={rename2} >Rename</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card onDoubleClick={()=>{router.push(`/user/editor/${fileId}`)}} className="group overflow-hidden max-w-[16rem] bg-popover cursor-pointer hover:scale-100 transition-all min-h-[14rem] flex-col flex justify-between min-w-[16rem] max-h-[14rem] mr-6" >
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger ref={alertRef} asChild></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure about deleting the file?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your file
                  and remove your file data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={openBox} >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteFile} className="bg-destructive text-destructive-foreground hover:text-destructive hover:bg-transparent border-2 border-transparent hover:border-destructive" >Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CardHeader className="transition-all">
            <div className='w-full flex flex-row justify-between items-center' >
              <CardTitle className="text-lg max-w-[75%] text-ellipsis overflow-hidden ">{cardnameState}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon size={22} className='text-secondary hover:text-secondary-foreground transition-all' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={cloneFile} className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3" >
                    <p className='font-medium' >Clone</p>
                    <CopyIcon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3" >
                    <p onClick={()=>{router.push(`/user/editor/${cardname}`)}} className='font-medium' >Open</p>
                    <PencilIcon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={renameFile} className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3 " >
                    <p className='font-medium' >Rename</p>
                    <FolderPenIcon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3 " >
                    <p className='font-medium' >Share</p>
                    <Share2Icon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center space-x-5 justify-between pr-3 " >
                    <p className='font-medium' >Add people</p>
                    <UserPlus2Icon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={openBox} className="text-destructive hover:bg-destructive cursor-pointer group flex flex-row items-center space-x-5 justify-between pr-3 " >
                    <p className='font-medium' >Delete</p>
                    <Trash2Icon size={16} className='group-hover:text-destructive-foreground text-destructive transition-all' />
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardFooter className="bg-gradient-to-r from:transparent to-primary translate-y-12 group-hover:translate-y-0 transition-all shadow-[0_-1px_100px_50px] shadow-secondary dark:from-transparent dark:to-secondary py-4">
            <p className='font-medium text-sm' >Last edited : 15m</p>
          </CardFooter>
        </Card>
      </>
    )

  }

  else {

    return (
      <TCardDom createdby={createdby} cardname={cardname} />
    )

  }
}

export default CardDom