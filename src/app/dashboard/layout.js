import Provider from '@/components/Provider/Provider';
import Link from 'next/link';
import React from 'react';

const DashboardLayout = ({ children }) => {
   return (
      <div className='flex h-screen max-w-6xl m-auto'>
         <Provider>
            <div className='w-96 bg-orange-700 text-white'>
               <li><Link href="/">Home</Link></li>
               <li><Link href="/dashboard">Dashboard</Link></li>
               <li><Link href="/dashboard/user">Profile</Link></li>
               <li><Link href="/dashboard/create-post">Create Post</Link></li>
            </div>
            <div className='w-full'>{children}</div>
         </Provider>
      </div>
   );
};

export default DashboardLayout;