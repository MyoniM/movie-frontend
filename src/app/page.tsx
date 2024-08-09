'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/loading';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/app/');
  }, []);

  return (
    <div className="text-center w-full h-screen flex items-center justify-center">
      <div>
        <Loading />
      </div>
    </div>
  );
}
