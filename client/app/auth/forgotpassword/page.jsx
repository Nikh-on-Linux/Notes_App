"use client";
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import InputC from '@/components/ui/inputCustom';
import { MailIcon, LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';

function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [state, setState] = useState("Send Mail");
  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null);

  const handleEvent = () => {

    if (!email) {
      toast.error("Email is not provided");
    }
    else {
      setLoading(true);
      setState("Sending Mail...");
      buttonRef.current.disabled = true;

      const sendMail = async () => {

        const response = await fetch('http://localhost:3500/auth/forgotpassword', {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            email: email
          })
        })

        return response;

      }

      sendMail()
        .then(async (data) => { return (await data.json()) })
        .then((data) => {
          if (data.suc) {
            toast.success("Mail sent successfully");
          }
          else {
            toast.error(data.msg);
            buttonRef.current.disabled = false;
            setLoading(false);
            setState("Send Mail");
          }
        })

    }

  }

  return (
    <main className='w-screen h-screen flex flex-row items-center justify-center' >
      <Toaster richColors theme='dark' position='top' ></Toaster>
      <Card className='w-[20%] bg-secondary2' >
        <CardHeader>
          <CardTitle>Reset your password.. </CardTitle>
          <CardDescription>We will send you mail to your email address which was provided during the registration of the account. Please do check spam section also as sometimes mails do appear in that section also.</CardDescription>
        </CardHeader>
        <CardContent>
          <InputC type={'email'} placeholder={'Email'} clearable={true} startContent={<MailIcon size={20} className='text-secondary2-foreground' />} valueFetcher={(value) => { setEmail(value) }} />
        </CardContent>
        <CardFooter className="" >
          <Button ref={buttonRef} onClick={handleEvent} className="mx-auto disabled:bg-background disabled:text-secondary2-foreground hover:primary flex flex-row items-center space-x-2"  > {isLoading ? <LoaderCircleIcon size={16} className='animate-spin' /> : ""} <p>{state}</p></Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default ForgotPassword