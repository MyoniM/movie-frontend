'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import NavBar from '@/components/nav';
import { selectCurrentToken, selectIsLoading } from '@/state/features/auth/authSlice';
import Loading from '@/components/loading';

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const token = useSelector(selectCurrentToken);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div className="text-center w-full h-[calc(94vh)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!token) return router.replace('/auth/sign-in');

  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
