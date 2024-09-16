"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import InputC from '@/components/ui/inputCustom';
import { MailIcon, EyeIcon, EyeOffIcon, KeyRoundIcon, UserIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

function SignUpPage() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');

  useEffect(() => {

    const event = new CustomEvent('destroy-loader')

    window.dispatchEvent(event);

  }, [])

  const [isVisible, setVisible] = useState(false);
  const [type, setType] = useState('password');
  const buttonRef = useRef(null);
  const changeVisi = () => {

    !isVisible ? setType("text") : setType('password');

    setVisible(!isVisible);

  }

  const fireEvent = () => {
    const event = new CustomEvent('shoot-loader');
    window.dispatchEvent(event);
  }


  const handleEvent = (e) => {
    e.preventDefault();
    buttonRef.current.disabled = true;
    if (!email && !password && !firstname && !lastname) {
      toast.error("All fields are mandatory to be filled");
      buttonRef.current.disabled = false;
    }
    else {
      toast.promise(async () => {

        const response = await fetch('http://localhost:3500/auth/signup', {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
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
        loading: "Creating your account",
        success: (data) => { buttonRef.current.disabled = false; router.push('/auth/login') ;return (data) },
        error: (data) => { buttonRef.current.disabled = false; return (data) },
      })
    }
  }


  return (
    <main className='w-screen flex flex-row items-center justify-center h-screen' >
      <Toaster richColors theme='dark' position='top' />
      <div className='w-[25%] rounded-2xl h-fit bg-secondary2 border-2 relative overflow-hidden' >
        <div className='absolute bg-gradient-to-r from-primary to-transparent text-secondary-foreground px-20  py-1 font-medium text-center top-6 -left-16 -rotate-45' >Signup</div>
        <div className='flex mx-auto w-[100%] my-1 flex-col justify-center' >
          <Link href={"/user/"} className='font-bold text-primary text-pretty text-2xl text-center my-5 cursor-pointer hover:text-secondary transition-all' >The Notes</Link>
          <form onSubmit={handleEvent} className='w-[80%] mx-auto mt-10 flex flex-col items-center space-y-5' >
            <p className='font-medium text-secondary2-foreground text-left w-full text-lg' >Create your account</p>
            <div className='flex flex-row space-x-3 items-center justify-between py-2' >
              <InputC valueFetcher={(value) => { setFName(value) }} type={"text"} placeholder={'Firstname'} startContent={<UserIcon size={20} className='text-secondary2-foreground' />} />
              <InputC valueFetcher={(value) => { setLName(value) }} type={"text"} placeholder={'Lastname'} />
            </div>
            <InputC type={"text"} valueFetcher={(value) => { setEmail(value) }} placeholder={"Email"} clearable={true} startContent={<MailIcon size={20} className='text-secondary2-foreground' />} />
            <InputC valueFetcher={(value) => { setPassword(value) }} type={type} placeholder={"Password"} startContent={<KeyRoundIcon size={20} className='text-secondary2-foreground' />} endContent={
              !isVisible ? <EyeIcon size={22} className='text-secondary2-foreground hover:text-secondary-foreground cursor-pointer transition-all ' onClick={changeVisi} /> : <EyeOffIcon size={22} className='text-secondary2-foreground hover:text-secondary-foreground cursor-pointer transition-all ' onClick={changeVisi} />
            } />
            <button ref={buttonRef} type='submit' className="px-5 disabled:bg-background disabled:text-secondary rounded-md hover:bg-primary hover:text-background transition-all py-2 text-lg font-medium text-secondary-foreground bg-secondary" >Create Account</button>
          </form>
          <Link onClick={fireEvent} href={'/auth/login'} className='my-5 overflow-hidden w-fit mx-auto font-medium group text-secondary2-foreground before:content-[""] before:w-[0%] before:absolute before:border-b-2 before:border-secondary2-foreground before:hover:w-[100%] before:transition-all before:bottom-0 relative transition-all' >Already have an account?</Link>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage