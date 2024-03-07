"use client"
import Image from "next/image";
import Link from "next/link";
import { FaHouseChimney } from "react-icons/fa6";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
   const { data: session, status } = useSession();
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            // Fetch user data based on _id
            const response = await fetch(`/api/user/${session?.user?._id}`);
            const userData = await response.json();
            setUserData(userData);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            console.error('Error fetching user data:', error);
         }
      };

      if (session?.user?._id) {
         fetchUserData();
      }
   }, [session]);

   const handleSignOut = async () => {
      await signOut(); // Sign out the user
      router.push('/'); // Redirect to the login page
   };

   const navItem = (
      <>
         <li><Link href="/"><FaHouseChimney className="text-xl" /></Link></li>
         {userData?.role === "admin" && <li><Link href="/dashboard">Dashboard</Link></li>}
         <li><Link href="/about">About</Link></li>
         <li><Link href="/contact">Contact</Link></li>
      </>
   );

   const pathname = usePathname();

   if (pathname.includes("/dashboard")) return null;
   if (pathname.includes("/register")) return null;
   if (!session?.user) {
      if (pathname.includes("/")) return null;
   }

   return (
      <div className="hide-navbar">
         <div className="max-w-6xl m-auto">
            <div className="navbar bg-base-100 gap-4 px-0">
               <div className="navbar-start w-[25%]">
                  <div className="dropdown">
                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                     </div>
                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                     </ul>
                  </div>
                  <button className="btn btn-ghost text-xl text-[#0079D3]"><Link href="/">Dialogify</Link></button>
               </div>
               <div className="navbar-center hidden lg:flex items-center">
                  <ul className="menu menu-horizontal px-1 flex items-center">
                     {navItem}
                  </ul>
               </div>
               <div className="navbar-end gap-5 flex-1">
                  <div className="form-control flex-1 hidden md:block">
                     <input type="text" name="search" placeholder="Search" className="w-3/4 border px-4 py-1 rounded-3xl input-bordered" />
                  </div>
                  {loading ? (
                     <p className="skeleton w-10 h-10"></p>
                  ) : session?.user ? (
                     <div className="dropdown dropdown-end">
                        <div className="flex flex-row items-center gap-2">
                           <p className="pl-3 mb-2 font-bold text-base">{userData?.name}</p>
                           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                 <div className="w-10 rounded-full">
                                    {
                                       userData?.profileImage ?
                                          <Image width={100} height={100} className="rounded-full" alt="Avatar" src={userData?.profileImage} />
                                          :
                                          <Image width={100} height={100} className="rounded-full" alt="Avatar" src="https://i.ibb.co/MNJLHMM/defalut-img.webp" />
                                 }
                                 
                              </div>
                           </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                           <li>
                              <Link href="/profile">Profile</Link>
                           </li>
                           <li>
                              <button onClick={() => signOut()}>Logout</button>
                           </li>
                        </ul>
                     </div>
                  ) : (
                     <button onClick={handleSignOut} className="btn">
                        Get Started
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
};

export default Navbar;
