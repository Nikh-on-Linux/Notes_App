"use client";
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Toaster, toast } from 'sonner';
import { LoaderCircleIcon, KeyRoundIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import InputC from '@/components/ui/inputCustom';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
function RegisterPafe({ params }) {

  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isConVisible, setConVisible] = useState(false);
  const [pastype, setpastype] = useState('password');
  const [conpastype, setconpastype] = useState('password');
  const [conPassword, setConPassword] = useState('');
  const [state, setState] = useState('Reset Password');

  const buttonRef = useRef(null);
  const router = useRouter();

  const changePassVisi = () => {

    isVisible ? setpastype('password') : setpastype('text');

    setVisible(!isVisible);

  }

  const changeConPassVisi = () => {

    isConVisible ? setconpastype('password') : setconpastype('text');

    setConVisible(!isConVisible);

  }

  const resetPass = () => {

    if (!password && !conPassword) {
      toast.error("All fields must be filled");
    }
    else {

      if (password != conPassword) {
        toast.error("Passwords do not match");
      }

      else {

        setLoading(true);
        setState('Updating password..');
        toast.info('Resseting your password');
        buttonRef.current.disabled = true;

        const resetPassword = async () => {
          const response = await fetch('https://notes-app-1-kyvm.onrender.com/auth/resetpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: params.id,
              password: password,
            })
          })

          const data = await response.json();

          if (data.suc) {
            toast.success('Password updated successfully');
            setTimeout(() => { router.push('/auth/login') }, 1000);
          }
          else {
            toast.error(data.msg);
            setLoading(false);
            setState('Reset Password');
            buttonRef.current.disabled = false;
          }
        }

        resetPassword();

      }


    }


  }

  return (
    <main className='w-screen h-screen flex-row flex items-center justify-center' >
      <Toaster richColors theme='dark' position='top' ></Toaster>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Don&apos;t share this link with others.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col space-y-3' >
          <InputC type={pastype} placeholder={"Set password"} valueFetcher={(value) => { setPassword(value) }} startContent={<KeyRoundIcon size={20} className='text-secondary2-foreground' />} endContent={
            !isVisible ? <EyeIcon size={20} className='text-secondary2-foreground hover:text-secondary-foreground transition-all cursor-pointer ' onClick={changePassVisi} /> : <EyeOffIcon size={20} className='text-secondary2-foreground hover:text-secondary-foreground transition-all cursor-pointer ' onClick={changePassVisi} />
          } />
          <InputC type={conpastype} placeholder={"Confirm password"} valueFetcher={(value) => { setConPassword(value) }} startContent={<KeyRoundIcon size={20} className='text-secondary2-foreground' />} endContent={
            !isConVisible ? <EyeIcon size={20} className='text-secondary2-foreground hover:text-secondary-foreground transition-all cursor-pointer ' onClick={changeConPassVisi} /> : <EyeOffIcon size={20} className='text-secondary2-foreground hover:text-secondary-foreground transition-all cursor-pointer ' onClick={changeConPassVisi} />
          } />
        </CardContent>
        <CardFooter>
          <Button ref={buttonRef} onClick={resetPass} className="mx-auto space-x-1 disabled:bg-secondary disabled:text-secondary2-foreground" > {isLoading ? <LoaderCircleIcon size={16} className='animate-spin' /> : ""} <p>{state}</p></Button>
        </CardFooter>
      </Card>

    </main>
  )
}

export default RegisterPafe