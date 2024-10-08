"use client"
import React, { useEffect, useRef } from "react";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const fontS = Work_Sans({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'], variable: '--customFont' });
import { cn } from "@/lib/utils"
const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);

  useEffect(() => {
    // containerRef.current.style.display = 'block';
    // const event = new CustomEvent('shootLoader');
    // window.dispatchEvent(event);

    addEventListener('shoot-loader', (e) => {
      containerRef.current.style.display = 'block';
    })

    addEventListener('destroy-loader', (e) => {
      containerRef.current.style.display = 'none';
    })

    // setTimeout(() => {
    //   containerRef.current.style.display = 'none';
    // }, 600);

  }, [])


  return (
    <html lang="en">
      <body className={cn("dark min-h-screen min-w-screen overflow-hidden bg-background font-sans antialiased", fontS.variable)}>
        <div ref={containerRef} id="loader" className="hidden absolute w-[100%] animate-progress transition-all top-0 left-0 h-1 rounded-2xl bg-gradient-to-r to-primary from-secondary" ></div>
        {children}
      </body>
    </html>
  );
}
