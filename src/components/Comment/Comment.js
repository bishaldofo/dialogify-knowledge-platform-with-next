import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { format } from 'timeago.js';

const Comment = ({ comment }) => {
   const { data: session } = useSession()
   const token = session?.user?.accessToken

   console.log(comment)

   return (
      <div className='my-5 p-3 border mb-2 rounded-md'>
         <div className='text-right'>
            <small>
               {format(comment?.createdAt)}
            </small>
         </div>
         <div className='flex items-start w-full gap-2'>
            <div className="w-10 rounded-full">
               <Image
                  width={100}
                  height={100}
                  className="rounded-full"
                  alt="Tailwind CSS Navbar component"
                  src={comment?.authorId?.profileImage}
               />
            </div>
            <div className='bg-[#F0F2F5] p-2 max-w-[75%] rounded-3xl'>
               <p>{comment?.authorId?.name}</p>
               <p>{comment?.text}</p>
            </div>
         </div>
      </div>
   );
};

export default Comment;