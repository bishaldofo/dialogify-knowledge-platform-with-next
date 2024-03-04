"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import HomePage from './home/page';
import LoginPage from './login/page';

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
        <div className="h-screen flex items-center justify-center">
        <h1>Loading...</h1>
     </div> // Display a loading indicator while fetching session data
      ) : session?.user ? (
        <HomePage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Home;
