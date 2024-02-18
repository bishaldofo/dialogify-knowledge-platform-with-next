"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFileImage } from "react-icons/ai";

const PostForm = () => {
   const CLOUD_NAME = 'dn9674mde'
   const UPLOAD_PRESET = 'dialogify-project'

   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
   const [category, setCategory] = useState("Nature")
   const [photo, setPhoto] = useState('')

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

      if (!photo || !title || !desc || !category) {
         toast.error("Please Fill all the Fields!")
         return 
      }

      try {
         const imageUrl = await uploadImage()
         const res = await fetch('http://localhost:3000/api/post', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`
            },
            method: 'POST',
            body: JSON.stringify({ title, desc, category, imageUrl, authorId: session?.user?._id })
         })
         
         if (!res.ok) {
            throw new Error("Error Occured")
         }
         const post = await res.json()
         router.push(`/post/${post?._id}`)
      } catch (error) {
         console.log(error)
      }
   }

   const uploadImage = async() => {
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
         <h1>Create Post</h1>
         <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
               <option value="Nature">Nature</option>
               <option value="Mountain">Mountain</option>
               <option value="Ocean">Ocean</option>
               <option value="Wildlife">Wildlife</option>
               <option value="Forest">Forest</option>
            </select>
            <label htmlFor='image'>
               Upload Image <AiOutlineFileImage />
            </label>
            <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
            <button>Create</button>
         </form>
      </div>
   );
};

export default PostForm;