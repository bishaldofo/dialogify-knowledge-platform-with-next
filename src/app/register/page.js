"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [username, setUsername] = useState("")
   const router = useRouter()

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (username === '' || email === '' || password === '') {
         toast.error("Please Fill all the Fields!")
      }

      if (password.length < 8) {
         toast.error("Password must be at least 8 characters long!")
      }

      try {
         const res = await fetch("http://localhost:3000/api/register", {
            headers: {
               'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username, email, password })
         })

         if (res.ok) {
            toast.success("Account created successfully!")
            setTimeout(() => {
               signIn()
            }, 1500)
            return
         } else {
            toast.error("Error occured while Registering!")
            return
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
               <form onSubmit={handleSubmit} className="card-body p-0 pt-5">
                  <div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Username</span>
                        </label>
                        <input defaultValue="" type="text" name='Username' onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input input-bordered" />
                     </div>
                  </div>
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
               Register
                     </button>
                  </div>
               </form>
               <div className='py-4'>
                  <button onClick={() => signIn()}>
                     Already have an account? Login now.
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;