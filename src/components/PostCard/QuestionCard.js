
"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa6';
import Answerss from '../Comment/Answerss';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';

const QuestionCard = ({ques}) => {
    

    const { data: session } = useSession()
    const [isLiked, setIsLiked] = useState(false);
    const [questLikes, setQuestLikes] = useState(0);
    const { quest, _id, likes, authorId } = ques;
  
    const [answerText, setAnswerText] = useState("");
    const [answers, setAnswers] = useState([]);
    console.log(answers);
    // console.log(session?.user)
    // console.log(comments)
    useEffect(() => {
      async function getAllAnswers() {
        const res = await fetch(`http://localhost:3000/api/answers/${_id}`, {cache:"no-store"})
        const answers = await res.json()
  
        setAnswers(answers)
      }
      getAllAnswers()
    }, [_id])
  
    useEffect(() => {
      session && likes && setIsLiked(likes.includes(session?.user?._id))
      session && likes && setQuestLikes(likes.length)
    }, [likes, session])
  
    const handleLike = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/question/${_id}/like`, {
          headers: {
            'Authorization': `Bearer ${session?.user?.accessToken}`
          },
          method: "PUT"
        })
  
        if (res.ok) {
          if (isLiked) {
            setIsLiked(prev => !prev)
            setQuestLikes(prev => prev - 1)
          } else {
            setIsLiked(prev => !prev)
            setQuestLikes(prev => prev + 1)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    const handleAnswer = async () => {
      if (answerText?.length < 2) {
        toast.error("Comment must be at least 2 characters long")
        return
      }
  
      try {
        const body = {
            answerId: _id,
          authorId: session?.user?._id,
          text: answerText
        }
  
        const res = await fetch(`http://localhost:3000/api/answers`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user?.accessToken}`
          },
          method: "POST",
          body: JSON.stringify(body)
        })
  
        const newAnswer = await res.json()
  
        setAnswers((prev) => {
          return [newAnswer, ...prev]
        })
        toast.success("Your comment successfully added!")
        setAnswerText("")
      } catch (error) {
        console.log(error)
      }
    }


    return (
        <div className="space-y-5">
      <div className="card w-full bg-base-100 rounded-sm shadow-xl">
        <div className="card-body p-3">
          <div className="flex items-center gap-2">
            <div className="w-10 rounded-full">
              <Image
                width={100}
                height={100}
                className="rounded-full"
                alt="Tailwind CSS Navbar component"
                src="https://i.ibb.co/MNJLHMM/defalut-img.webp"
              />
            </div>
            <div>
              <p className="text-sm font-bold"><Link href={`/dashboard/user/${_id}`}>{authorId?.username}</Link></p>
            </div>
            <div>
              <span>
                {format(ques?.createdAt)}
              </span>
            </div>
          </div>
          <h2 className="card-title">{quest}</h2>
          
        </div>
        
        <div className="flex items-center gap-4 my-2">
          <div className="flex items-center p-1 m-2 shadow-sm border-gray-100 bg-gray-100 rounded gap-2 cursor-pointer">
            {questLikes} {" "} {isLiked
              ?
              (<AiFillLike onClick={handleLike} size={20} />)
              :
              (<AiOutlineLike onClick={handleLike} size={20} />)}
          </div>
          <div>
            <div onClick={() => document.getElementById(`my_modal_${_id}`).showModal()} className="flex items-center gap-2 cursor-pointer">
              <FaRegCommentDots size={20} />
              <h2>{answers?.length} Comments</h2>
            </div>
          
          </div>
        </div>

        <dialog id={`my_modal_${_id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div>
              {
                answers?.length > 0 ?
                  <h2 className="text-xl font-semibold">Answers</h2>
                  :
                  <h2 className="text-xl font-semibold">No Answer yet!</h2>
              }
             
              <div>
                {
                  answers?.map((answer) => (
                    <Answerss key={answer?._id} answer={answer} setAnswers={setAnswers}></Answerss>
                  ))
                }
              </div>
            </div>
          </div>
        </dialog>

        <div>
          {
            session?.user &&
            <div className='m-5'>
              <hr className='mb-5'></hr>
              <div className='flex gap-4 items-center'>
                <FaRegUser />
                <input type='text' name="answer" value={answerText} onChange={(e) => setAnswerText(e.target.value)}
                  placeholder='Write a answer'
                  className='w-full bg-slate-100 p-2 rounded-full 
            px-5 outline-blue-300
            '
                />
                <button onClick={handleAnswer}
                  disabled=""
                  className="bg-blue-400
            text-white p-2 h-8 w-8 rounded-xl hover:bg-blue-600"><BsFillSendFill className="text-white" /></button>
              </div>
            </div>
          }

        </div>
      </div>
    </div>
    );
};

export default QuestionCard;