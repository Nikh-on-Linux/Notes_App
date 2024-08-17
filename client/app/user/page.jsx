import React from 'react'
import { HomeIcon } from 'lucide-react'

function Page() {
  return (
    <div className='flex flex-col items-center justify-center w-full space-y-10 h-full' >
      <HomeIcon size={55} className='text-secondary ' ></HomeIcon>
      <h1 className='text-secondary font-medium text-3xl' >Navigate to '/home' to access your files</h1>
    </div>
  )
}

export default Page