'use client';

import Link from 'next/link';

import Loading from './loading';
import { ModeToggle } from './theme-toggle';
import ProfileDropdown from './profile-dropdown';

export default function NavBar() {
  return (
    <header className="flex items-center gap-4 p-4">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <div className="flex gap-2 items-center">
          <Loading height="30" />
          <p className="text-primary">MOVIES</p>
        </div>
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        <ProfileDropdown />

        <ModeToggle />
      </div>
    </header>
  );
}
