'use client';

import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';

import Loading from '@/components/loading';
import { selectCurrentToken, selectIsLoading } from '@/state/features/auth/authSlice';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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

  if (token) return router.replace('/app');

  return <div>{children}</div>;
}
