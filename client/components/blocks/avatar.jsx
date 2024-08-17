import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function AvatarDom({ imageurl, fallback }) {
  return (
    <Avatar>
      <AvatarImage src={imageurl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>

  )
}

export default AvatarDom