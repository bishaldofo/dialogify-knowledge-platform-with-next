"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
   const CLOUD_NAME = 'dn9674mde'
   const UPLOAD_PRESET = 'dialogify-project'

   const [title, setTitle] = useState('')
   const [desc, setDesc] = useState('')
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
         const post = await res.json()
         router.push("/")
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
            <input type="text" name="title" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
            <textarea name="desc" placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
            <input id='image' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            <button>Create</button>
         </form>
      </div>
   );
};

export default CreatePost;