import { useSession } from 'next-auth/react';
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
            <p className='pt-2'><FaUser size={20} /></p>
            <div className='bg-[#F0F2F5] p-2 max-w-[75%] rounded-3xl'>
               <p>{comment?.authorId?.email}</p>
               <p>{comment?.text}</p>
            </div>
         </div>
      </div>
   );
};

export default Comment;