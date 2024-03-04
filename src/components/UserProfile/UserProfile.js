"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {
   const CLOUD_NAME = 'dn9674mde'
   const UPLOAD_PRESET = 'dialogify-project'

   const [name, setName] = useState('')
   const [photo, setPhoto] = useState('')

   const { data: session, status } = useSession()
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter()
   const user = session;
   console.log(user)
   
   useEffect(() => {
      const fetchUserData = async () => {
         try {
            setLoading(true);
            // Fetch user data based on _id
            const response = await fetch(`/api/user/${session?.user?._id}`);
            const userData = await response.json();
            setUserData(userData);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            console.error('Error fetching user data:', error);
         }
      };

      if (session?.user?._id) {
         fetchUserData();
      }
   }, [session]);

   
   if (status === 'loading') {
      return <p>Loading....</p>
   }

   if (status === "unauthenticated") {
      return <p>Access Denied</p>
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const profileImage = await uploadImage()
         const res = await fetch(`http://localhost:3000/api/user/${session?.user?._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}`
            },
            body: JSON.stringify({ name, profileImage })
         })

         if (!res.ok) {
            throw new Error("Error Occured")
         }
         // const post = await res.json()
         e.target.reset();
         router.refresh("/")
         window.location.reload()
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

         const profileImage = data.secure_url

         return profileImage
      } catch (error) {
         console.log(error)
         toast.error("An error occurred while creating the post.")
      }
   }

   return (
      <div className="max-w-6xl m-auto">
         <h1 className="mt-5 mb-5 text-xl font-bold">Update Profile</h1>
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
               <input className="input input-bordered" type="text" name="name" disabled value={session?.user?.email}/>
            </div>

            <div className="form-control">
               <input className="input input-bordered" type="text" name="name" placeholder={userData?.name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-control">
               <input id='image' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            </div>


            <button className="btn btn-primary bg-orange-700 text-white border-0 hover:bg-orange-800">Save Changes</button>
         </form>
      </div>
   );
};

export default UserProfile;