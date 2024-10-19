"use client"
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className="flex items-center justify-between p-2 relative">
      <div>
        <Link className="font-bold text-teal-600" href="/">HC</Link>
      </div>
      <div className="flex items-center gap-6">
        <div className="md:hidden block cursor-pointer">
          <IoMenu className="h-6 w-6" onClick={()=>toggleMenu()}/>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
      {open && (
        <div className="absolute right-0 top-0 mt-12 h-screen w-48 bg-teal-500 text-white rounded-md shadow-lg z-50">
          <div className="p-2">
            <Link href="/" className="block px-4 py-2 hover:bg-teal-600 rounded" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/consultation" className="block px-4 py-2 hover:bg-teal-600 rounded" onClick={() => setOpen(false)}>
              Consultation
            </Link>
            <Link href="/prescription" className="block px-4 py-2 hover:bg-teal-600 rounded" onClick={() => setOpen(false)}>
              Prescription
            </Link>
            <Link href="https://healcare-videochat.vercel.app/" className="block px-4 py-2 rounded hover:bg-teal-600" onClick={() => setOpen(false)}>
              Video
            </Link>
            <Link href="/careers" className="block px-4 py-2 rounded hover:bg-teal-600" onClick={() => setOpen(false)}>
              Career
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
