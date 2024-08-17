"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import InputC from '@/components/ui/inputCustom';
import { MailIcon, KeyRoundIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast, Toaster } from "sonner";
import { useRouter } from 'next/navigation';

function LoginPage() {

  const [email, setEmail] = useState('');
  const buttonRef = useRef(null);
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {

    const event = new CustomEvent('destroy-loader')

    window.dispatchEvent(event);

  }, [])

  const [isVisible, setVisible] = useState(false);
  const [type, setType] = useState('password');

  const changeVisi = () => {

    !isVisible ? setType("text") : setType('password');

    setVisible(!isVisible);

  }

  const fireEvent = () => {
    const event = new CustomEvent('shoot-loader');
    window.dispatchEvent(event);
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    buttonRef.current.disabled = true;

    if (!email && !password) {
      toast.error("All fields are need to be filled");
      buttonRef.current.disabled = false;
    }
    else {
      buttonRef.current.disabled = true;

      toast.promise(async () => {

        const response = await fetch("http://localhost:3500/auth/login", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();

        if (data.suc) {
          window.localStorage.setItem("token",data.token);
          return data.msg
        }

        else {
          throw data.msg
        }

      }, {
        loading: "Authenticating..please wait",
        success: (data) => { buttonRef.current.disabled = false ; setTimeout(()=>{router.push('/user/Home')},800) ;return (data) },
        error: (data) => {  buttonRef.current.disabled = false ; return (data) }
      })

    }
  }

  return (
    <main className='w-screen flex flex-row items-center justify-center h-screen' >
      <Toaster richColors position='bottom-right' theme='dark' />
      <div className='w-[25%] rounded-2xl h-fit bg-secondary2 border-2 relative overflow-hidden' >
        <div className='absolute bg-gradient-to-r from-primary to-transparent text-secondary-foreground px-20  py-1 font-medium text-center top-6 -left-16 -rotate-45' >Login</div>
        <div className='flex mx-auto w-[100%] my-1 flex-col justify-center' >
          <Link href={"/user/"} className='font-bold text-primary text-pretty text-2xl text-center my-5 cursor-pointer hover:text-secondary transition-all' >The Notes</Link>

          <form onSubmit={handleSubmit} className='w-[80%] mx-auto mt-10 flex flex-col items-center space-y-5' >
            <InputC valueFetcher={(value) => { setEmail(value) }} type={"email"} placeholder={"Email"} clearable={true} startContent={<MailIcon size={20} className='text-secondary2-foreground' />} />
            <InputC valueFetcher={(value) => { setPassword(value) }} type={type} placeholder={"Password"} startContent={<KeyRoundIcon size={20} className='text-secondary2-foreground' />} endContent={
              !isVisible ? <EyeIcon size={22} className='text-secondary2-foreground hover:text-secondary-foreground cursor-pointer transition-all ' onClick={changeVisi} /> : <EyeOffIcon size={22} className='text-secondary2-foreground hover:text-secondary-foreground cursor-pointer transition-all ' onClick={changeVisi} />
            } />
            <Link href={"/auth/forgotpassword"} className='font-medium group text-secondary2-foreground before:content-[""] before:w-[0%] before:absolute before:border-b-2 before:border-secondary2-foreground before:hover:w-[100%] before:transition-all before:bottom-0 relative transition-all' >Forgot password?</Link>
            <button ref={buttonRef} type='submit' className="px-5 disabled:bg-background disabled:text-secondary rounded-md hover:bg-primary hover:text-background transition-all py-2 text-lg font-medium text-secondary-foreground bg-secondary" >Login</button>
          </form>
          <Link onClick={fireEvent} href={'/auth/signup'} className='my-20 overflow-hidden w-fit mx-auto font-medium group text-secondary2-foreground before:content-[""] before:w-[0%] before:absolute before:border-b-2 before:border-secondary2-foreground before:hover:w-[100%] before:transition-all before:bottom-0 relative transition-all' >Don't have an account?</Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPage