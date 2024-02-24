import Provider from '@/components/Provider/Provider';
import Link from 'next/link';
import React from 'react';

const DashboardLayout = ({ children }) => {
   return (
      <div className='flex h-screen max-w-6xl m-auto'>
         <Provider>
            <div className='w-60 bg-orange-700 text-white pt-4 pl-5'>
               <li className='list-none'><Link href="/">Home</Link></li>
               <li className='list-none'><Link href="/dashboard">Dashboard</Link></li>
               <li className='list-none'><Link href="/dashboard/user">Profile</Link></li>
            </div>
            <div className='w-full p-5'>{children}</div>
         </Provider>
      </div>
   );
};

export default DashboardLayout;