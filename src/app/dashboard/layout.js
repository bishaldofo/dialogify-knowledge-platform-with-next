"use client"
import Provider from '@/components/Provider/Provider';
import Link from 'next/link';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineDataset } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
   const router = useRouter()
   return (
      <div className='flex h-screen m-auto bg-[#11111D] text-white'>
         <Provider>
            <div className='w-60 bg-[#1C1C27] text-white'>
               <button className="btn btn-ghost text-2xl text-[#0079D3] mt-2"><Link href="/">Dialogify</Link></button>
               <div className='pt-4 px-4 space-y-4'>
                  <li className='list-none'>
                     <Link className={`py-2 px-3 transition delay-150 duration-300 ease-in-out rounded-md flex items-center gap-3 bg-[#1C1C27] text-white ${router.pathname === '/dashboard/question' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`} href="/">
                        <FaHouseChimney className="text-lg group-hover:text-white" />
                        Home
                     </Link>
                  </li>
                  <li className='list-none'><Link className={`py-2 px-3 transition delay-150 duration-300 ease-in-out rounded-md flex items-center gap-3 bg-[#1C1C27] text-white ${router.pathname === '/dashboard/question' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`} href="/dashboard"><HiUserGroup className="text-xl group-hover:text-white" />User</Link></li>
                  <li className='list-none'><Link className={`py-2 px-3 transition delay-150 duration-300 ease-in-out rounded-md flex items-center gap-3 bg-[#1C1C27] text-white ${router.pathname === '/dashboard/question' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`} href="/dashboard/user"><MdOutlineDataset className="text-xl group-hover:text-white" />All Post</Link></li>
                  <li className='list-none'><Link className={`py-2 px-3 transition delay-150 duration-300 ease-in-out rounded-md flex items-center gap-3 bg-[#1C1C27] text-white ${router.pathname === '/dashboard/question' ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`} href="/dashboard/user"><FaQuestionCircle className="text-xl group-hover:text-white" />All Question</Link></li>
               </div>

            </div>
            <div className='w-full p-5'>{children}</div>
         </Provider>
      </div>
   );
};

export default DashboardLayout;