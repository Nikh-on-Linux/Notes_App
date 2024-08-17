"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SideTab({ isButton, tabname, children, callback }) {
  const pathname = usePathname();
  const loader = () => {
    if (pathname != `/user/${tabname}`) {
      const event = new CustomEvent('shoot-loader');
      window.dispatchEvent(event);
    }
  }

  if (isButton) {

    return (
      <button onClick={callback} >
        <div className='flex flex-row items-center w-full group/item border-[0.1rem] px-3 py-2 rounded-md select-none cursor-pointer hover:border-primary  hover:bg-secondary transition-all space-x-5' >
          <div>
            {children}
          </div>
          <div>
            <p className='text-secondary-foreground font-medium text-lg' >{tabname}</p>
          </div>
        </div>
      </button>
    )

  }

  else {

    return (

      <Link href={!isButton ? `/user/${tabname}` : "#"} >
        <div onClick={loader} className='flex flex-row items-center w-full group/item border-[0.1rem] px-3 py-2 rounded-md select-none cursor-pointer hover:border-primary  hover:bg-secondary transition-all space-x-5' >
          <div>
            {children}
          </div>
          <div>
            <p className='text-secondary-foreground font-medium text-lg' >{tabname}</p>
          </div>
        </div>
      </Link>
    )

  }

}

export default SideTab