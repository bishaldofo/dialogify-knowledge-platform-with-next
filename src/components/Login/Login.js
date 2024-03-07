"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const router = useRouter()

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (password === '' || email === "") {
         toast.error("Please Fill all the Fields!")
         return 
      }

      if (password.length < 8) {
         toast.error("Password must be at least 8 characters long!")
         return 
      }

      try {
         const res = await signIn('credentials', { email, password, redirect: false })
         
         if (res?.error == null) {
            router.push("/")
            toast.success("Logged in successfully!")
         } else {
            toast.error("Error occured while logging!")
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div>
         <div className="hero h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/PjQKzd4/bg.jpg)' }}>
            <div className='bg-white p-10 rounded-sm'>
               <div className='text-center text-xl text-[#0079D3]'><p>Dialogify</p></div>
               <form className="card-body p-0 pt-5" onSubmit={handleSubmit}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input defaultValue="" type="email" name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input defaultValue="" type="password" name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered" />
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary" type='submit'>
                        Login
                     </button>
                  </div>
                  <div className='py-4'>
                     <Link href='/register'>
                           Don&apos;t have an account? Register now.
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;