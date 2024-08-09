'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, LogOut, Settings } from 'lucide-react';

import { useToast } from './ui/use-toast';

import { logOut, selectCurrentUser } from '@/state/features/auth/authSlice';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function ProfileDropdown() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logOut());
    router.replace('/auth/sign-in');

    toast({ title: 'Success', description: 'Successfully Logged out', variant: 'success' });
  };

  if (!currentUser?.email) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="rounded-md h-7 w-7">
            <AvatarFallback className="bg-primary text-white">{currentUser!.email![0].toUpperCase()}</AvatarFallback>
          </Avatar>

          {currentUser!.email}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 m-2">
        <DropdownMenuLabel className="font-normal">My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
