import { useSession } from 'next-auth/react';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { format } from 'timeago.js';

const Answerss = ({ answer }) => {
   const { data: session } = useSession()
   const token = session?.user?.accessToken

   return (
      <div className='my-5 bg-gray-300 p-3 rounded-md'>
         <div className='text-right'>
            <small>
               {format(answer?.createdAt)}
            </small>
         </div>
         <div className='flex items-center w-full gap-2'>
            <p><FaUser size={50} /></p>
            <div>
               <p>{answer?.authorId?.username}</p>
               <p>{answer?.text}</p>
            </div>
         </div>
      </div>
   );
};

export default Answerss;