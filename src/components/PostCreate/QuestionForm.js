"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const QuestionForm = () => {
   const [quest, setQuest] = useState('')
   const { data: session, status } = useSession()
   const router = useRouter()

   console.log(session)
   if (status === 'loading') {
      return <p>Loading...</p>
   }

   if (status === "unauthenticated") {
      return <p>Access Denied</p>
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const res = await fetch(`http://localhost:3000/api/question`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}`
            },
            body: JSON.stringify({ quest, authorId: session?.user?._id })
         })

         if (!res.ok) {
            throw new Error("Error Occured")
         }
         toast.success("Your Question successfully added!")
         router.push("/answer")
      } catch (error) {
         console.log(error)
      }
   }
   
   return (
      <div className="max-w-6xl m-auto">
         <div className=" flex justify-center mb-2" >
            <h1 className=" text-xl font-semibold">Write your Question here..</h1>
         </div>
         <form className=" flex flex-col " onSubmit={handleSubmit}>
            <textarea name="desc" placeholder='Add a Question...' className="textarea textarea-bordered textarea-lg w-full " onChange={(e) => setQuest(e.target.value)} />
            <button className=" mt-5 btn bg-blue-700 text-white hover:bg-blue-950 " >Add Question</button>
         </form>
      </div>
   );
};

export default QuestionForm;