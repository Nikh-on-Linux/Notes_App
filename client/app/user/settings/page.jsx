"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useRouter  } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div className='h-ful w-full px-2 py-1' >
      <h1 className='text-3xl font-medium' >Settings</h1>
      <button onClick={()=>{
        localStorage.removeItem('token');
        router.push('/auth/login');
      }} className='px-5 py-1 bg-destructive rounded-sm' >Log out</button>
    </div>
  )
}
