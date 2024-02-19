import Link from 'next/link';

const RegisterPage = () => {
   return (
      <div>
         <div className="hero h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/PjQKzd4/bg.jpg)' }}>
            <div className='bg-white p-10 rounded-sm'>
               <div className='text-center text-xl text-[#0079D3]'><p>Dialogify</p></div>
               <form className="card-body p-0 pt-5">
                  <div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input defaultValue="" type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                     </div>
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input defaultValue="" type="email" name='email' placeholder="Email" className="input input-bordered" />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input defaultValue="" type="password" name='password' placeholder="Password" className="input input-bordered" />
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn btn-primary" type='submit'>
               Register
                     </button>
                  </div>
                  <div className='py-4'>
                     <Link href="/login" className="link">
                        <p className="text-center">Already have an account? Sign In Here</p>
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;