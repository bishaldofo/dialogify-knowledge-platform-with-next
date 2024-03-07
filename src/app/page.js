"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import HomePage from '@/components/Home/page';
import Loading from './loading';
import LoginPage from '@/components/Login/Login';

const Home = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : session?.user ? (
        <HomePage />
      ) : (
        <LoginPage />
      )}
      {/* {session?.user ? (
        <HomePage />
      ) : (
        <LoginPage />
      )} */}
    </div>
  );
};

export default Home;
