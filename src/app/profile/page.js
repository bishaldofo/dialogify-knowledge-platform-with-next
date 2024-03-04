"use client"

import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/UserProfile/UserProfile";

const userProfile = () => {
   return (
      <div>
         <div className='shadow-md bg-white sticky top-0 z-50'>
            <Navbar/>
         </div>
         <div className="flex items-center justify-center py-40">
            <Profile/>
         </div>
      </div>
   );
};

export default userProfile;