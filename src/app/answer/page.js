
import Advertise from '@/components/Advertise/Advertise';
import Navbar from '@/components/Navbar/Navbar';
import QuestionCard from '@/components/PostCard/QuestionCard';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';

export async function getQuest() {
    const res = await fetch('http://localhost:3000/api/question', {cache:"no-store"})
    return res.json();
  }

// const Answerpage  = () => {
  export default async function Answerpage() {
    const quest = await getQuest();
    
    return (
        <div>
          <div className='shadow-md bg-white sticky top-0 z-50'>
            <Navbar />
          </div>

          <div className="flex flex-col md:flex-row mt-5 gap-5 max-w-6xl m-auto">
            <div className="w-full md:w-[250px]">
              <Sidebar />
            </div>
            <div className="max-w-6xl mx-auto flex-1 space-y-5">
            {
                quest?.length > 0
                  ?
                  quest?.map(ques =>
                    <QuestionCard key={ques._id} ques={ques}></QuestionCard>
                  )
                  :
                  <p className="text">No Post available!</p>
              }
            </div>
            <div className="w-full md:w-[250px]">
              <Advertise />
            </div>
          </div>

         
        </div>
    );
};

// export default Answerpage;