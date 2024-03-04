"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PostForm = ({ closeModal }) => {
   const CLOUD_NAME = 'dn9674mde'
   const UPLOAD_PRESET = 'dialogify-project'

   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
   const [photo, setPhoto] = useState('')

   const { data: session, status } = useSession()
   const router = useRouter()

   console.log(session)
   if (status === 'loading') {
      return <p>Loading....</p>
   }

   if (status === "unauthenticated") {
      return <p>Access Denied</p>
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!photo || !title || !desc) {
         toast.error("Please Fill all the Fields!")
         return
      }

      try {
         const imageUrl = await uploadImage()
         const res = await fetch(`http://localhost:3000/api/post`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}`
            },
            body: JSON.stringify({ title, desc, imageUrl, authorId: session?.user?._id })
         })

         if (!res.ok) {
            throw new Error("Error Occured")
         }
         // const post = await res.json()
         e.target.reset();

         closeModal();
         router.refresh("/")
      } catch (error) {
         console.log(error)
      }
   }

   const uploadImage = async () => {
      if (!photo) return

      const formData = new FormData()

      formData.append("file", photo)
      formData.append("upload_preset", UPLOAD_PRESET)

      try {
         const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
         })

         const data = await res.json()

         const imageUrl = data.secure_url

         return imageUrl
      } catch (error) {
         console.log(error)
         toast.error("An error occurred while creating the post.")
      }
   }

   return (
      <div className="max-w-6xl m-auto">
         <h1 className="mt-5 mb-5 text-xl font-bold">Create Post</h1>
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
               <input className="input input-bordered" type="text" name="title" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-control">
               <textarea className="textarea textarea-bordered" name="desc" placeholder='Write here description...' onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>

            <div className="form-control">
               <input id='image' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            </div>


            <button className="btn btn-primary bg-orange-700 text-white border-0 hover:bg-orange-800">Create Post</button>
         </form>
         <button onClick={closeModal} className="btn bg-transparent border-0 absolute right-2 top-2">✕</button>
      </div>
   );
};

export default PostForm;