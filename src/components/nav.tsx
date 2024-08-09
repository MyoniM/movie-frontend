'use client';

import Link from 'next/link';

import Loading from './loading';
import { ModeToggle } from './theme-toggle';
import ProfileDropdown from './profile-dropdown';

export default function NavBar() {
  return (
    <header className="flex justify-between items-center gap-4 p-4">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <div className="flex gap-2 items-center">
          <Loading height="30" />
          <p className="text-primary">MOVIES</p>
        </div>
      </Link>

      <Link href="/about" className="underline text-primary">
        <div className="relative inline-flex  group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <a
            href="#"
            title="Get quote now"
            className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button"
          >
            About the App
          </a>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <ProfileDropdown />

        <ModeToggle />
      </div>
    </header>
  );
}
