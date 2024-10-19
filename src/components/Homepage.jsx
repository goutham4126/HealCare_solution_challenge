import { SignInButton } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';

function Homepage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0">
        {/* <Image 
          src="https://files.oaiusercontent.com/file-HztKQabGc3wxpj8LTVyqR6CN?se=2024-10-18T17%3A32%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dde7951da-6531-4335-bd87-2c417586b67b.webp&sig=Sdi5hzS2nSfTJLH3mjko%2Bwco%2BfUpu8YbSrlez%2BoEWIo%3D" // Add a healthcare-related background image here
          alt="Healthcare background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50"
        /> */}
      </div>
        <div className="mt-8">
          <SignInButton>
            <button className="bg-teal-600 text-white px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-transform duration-300">
              Get Started with HealCare
            </button>
          </SignInButton>
        </div>
    </div>
  );
}

export default Homepage;
