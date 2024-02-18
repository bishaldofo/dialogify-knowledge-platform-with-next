"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaRegUser } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { format } from "timeago.js";
import Comment from "../Comment/Comment";
import toast from "react-hot-toast";


const PostCard = ({ post }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const { title, desc, imageUrl, likes, authorId, _id, createdAt } = post;

  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  // console.log(session?.user)
  // console.log(comments)
  useEffect(() => {
    async function getAllComments() {
      const res = await fetch(`http://localhost:3000/api/comment/${_id}`, {
        cache: "no-store"
      })
      const allComments = await res.json()

      setComments(allComments)
    }
    getAllComments()
  }, [])

  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id))
    session && likes && setPostLikes(likes.length)
  }, [likes, session])

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/post/${_id}/like`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: "PUT"
      })

      if (res.ok) {
        if (isLiked) {
          setIsLiked(prev => !prev)
          setPostLikes(prev => prev - 1)
        } else {
          setIsLiked(prev => !prev)
          setPostLikes(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async () => {
    if (commentText?.length < 2) {
      toast.error("Comment must be at least 2 characters long")
      return
    }

    try {
      const body = {
        postId: _id,
        authorId: session?.user?._id,
        text: commentText
      }

      const res = await fetch(`http://localhost:3000/api/comment/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: "POST",
        body: JSON.stringify(body)
      })

      const newComment = await res.json()

      setComments((prev) => {
        return [newComment, ...prev]
      })
      toast.success("Your comment successfully added!")
      setCommentText("")
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
              <p className="text-sm font-bold"><Link href="/">{authorId.username}</Link></p>
            </div>
            <div>
              <small>
                {format(createdAt)}
              </small>
            </div>
          </div>
          <h2 className="card-title">{title}</h2>
          <p className="text-sm">{desc}</p>
        </div>
        <figure>
          <Image width={600} className="w-full" height={600} src={imageUrl} alt="News" />
        </figure>
        <div className="flex items-center gap-4 my-2">
          <div className="flex items-center p-1 m-2 shadow-sm border-gray-100 bg-gray-100 rounded gap-2 cursor-pointer">
            {postLikes} {" "} {isLiked
              ?
              (<AiFillLike onClick={handleLike} size={20} />)
              :
              (<AiOutlineLike onClick={handleLike} size={20} />)}
          </div>
          <div>
            <div onClick={() => document.getElementById(`my_modal_${_id}`).showModal()} className="flex items-center gap-2 cursor-pointer">
              <FaRegCommentDots size={20} />
              <h2>{comments?.length} Comments</h2>
            </div>
          </div>
        </div>

        <dialog id={`my_modal_${_id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div>
              <h2 className="text-xl font-semibold">Comments</h2>
              <div>
                {
                  comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} setComments={setComments}></Comment>
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
                {/* <Image src=""
              width={30}
              height={30}
              alt='user-image'
              className='rounded-full'
            /> */}
                <FaRegUser />
                <input type='text' name="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}
                  placeholder='Write a comment'
                  className='w-full bg-slate-100 p-2 rounded-full 
            px-5 outline-blue-300
            '
                />
                <button onClick={handleComment}
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

export default PostCard;