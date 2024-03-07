import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { format } from 'timeago.js';

const Answers = ({ answer }) => {
   const { data: session } = useSession()
   const token = session?.user?.accessToken

   return (
      <div className='my-5 bg-gray-300 p-3 rounded-md'>
         <div className='text-right'>
            <small>
               {format(answer?.createdAt)}
            </small>
         </div>
         <div className='flex items-start w-full gap-2'>
            <div className="w-10 rounded-full">
               <Image
                  width={200}
                  height={200}
                  className="rounded-full"
                  alt="Tailwind CSS Navbar component"
                  src={answer?.authorId?.profileImage ? answer?.authorId?.profileImage : "https://i.ibb.co/CwMBwJM/default-image.png"}
               />
            </div>
            <div>
               <p>{answer?.authorId?.name}</p>
               <p>{answer?.text}</p>
            </div>
         </div>
      </div>
   );
};

export default Answers;