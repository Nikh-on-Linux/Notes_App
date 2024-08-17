"use client"
import React, { useState, useRef, useEffect } from 'react';
import { BellIcon } from 'lucide-react';

function NotificationPage() {

  useEffect(() => {
    
    const event = new CustomEvent('destroy-loader')

    window.dispatchEvent(event);
  
  }, [])

  return (
    <div className='flex flex-col h-full space-y-8 items-center justify-center' >
      <BellIcon size={36} className='text-secondary' />
      <h2 className='text-secondary font-medium text-3xl' >No notifications yet</h2>
    </div>
  )
}

export default NotificationPage