import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        
        {/* Adding gradient color to Crafter.io text */}
        <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-slate-600 bg-clip-text text-transparent">
          Crafter.io
        </span>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {/* Navigation Links */}
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/about">About</Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/carrier">Careers</Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/blog">Blog</Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/services">Services</Link></li>
              <li><Link className="text-gray-500 transition hover:text-gray-500/75" href="/projects">Projects</Link></li>

            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {/* Using LoginLink as a direct component without wrapping it with <a> */}
              <LoginLink>
                <button
                  className="block rounded-md bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Login
                </button>
              </LoginLink>

              {/* Using RegisterLink as a direct component without wrapping it with <a> */}
              <RegisterLink>
                <button
                  className="hidden rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-yellow-600/75 transition sm:block hover:bg-slate-100"
                >
                  Try Crafter.io
                </button>
              </RegisterLink>
            </div>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
