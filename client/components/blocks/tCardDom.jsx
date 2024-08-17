"use client"
import React, { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"

import { MoreVerticalIcon, CopyIcon, FolderPenIcon, PencilIcon, Share2Icon, UserPlus2Icon, Trash2Icon } from 'lucide-react'

function TCardDom({ cardname, createdby }) {

  const alertRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);

  const openBox = () => {

    if (!isOpen) {
      setIsOpen(true);
    }
    else {

      setIsOpen(false);
    }

  }

  return (
    <Card className="group overflow-hidden max-w-[16rem] bg-popover cursor-pointer hover:scale-100 transition-all min-h-[14rem] flex-col flex justify-between min-w-[16rem] max-h-[14rem] mr-6" >
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
            <AlertDialogAction onClick={openBox} className="bg-destructive text-destructive-foreground hover:text-destructive hover:bg-transparent border-2 border-transparent hover:border-destructive" >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardHeader className='relative' >
        <div className='w-[8rem] font-bold bg-gradient-to-r from-primary to-background absolute text-center -rotate-45 top-2 -left-10' >Team</div>
        <div className='w-full flex flex-row justify-between items-center' >
          <CardTitle className="text-lg">{cardname}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVerticalIcon size={22} className='text-secondary hover:text-secondary-foreground transition-all' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3" >
                <p className='font-medium' >Clone</p>
                <CopyIcon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
              </DropdownMenuItem>

              <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3" >
                <p className='font-medium' >Open</p>
                <PencilIcon size={16} className='group-hover:text-secondary-foreground text-secondary transition-all' />
              </DropdownMenuItem>

              <DropdownMenuItem className="text-secondary cursor-pointer group flex flex-row items-center justify-between pr-3 " >
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
  )
}

export default TCardDom