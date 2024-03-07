export async function getUsers() {
   const res = await fetch('http://localhost:3000/api/user', { cache: "no-store" })
   return res.json();
}

const DashboardPage = async () => {
   const users = await getUsers();

   console.log(users)
   return (
      <div>
         <h1 className='text-2xl mb-5'>All user</h1>
         <div className="overflow-x-auto">
            <table className="table text-white">
               {/* head */}
               <thead>
                  <tr>
                     <th className='text-white text-base'>
                        No.
                     </th>
                     <th className='text-white text-base'>Username</th>
                     <th className='text-white text-base'>Email</th>
                     <th className='text-white text-base'>Account Created</th>
                     <th className='text-white text-base'>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     users?.map((user, index) =>
                        <tr key={user._id}>
                           <th>
                              {index+1}
                           </th>
                           <td>
                              <div className="flex items-center gap-3">
                                 {/* <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                 <Image src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                              </div>
                           </div> */}
                                 <div>
                                    <div className="font-bold">{user.username}</div>
                                 </div>
                              </div>
                           </td>
                           <td>
                              {user.email}
                           </td>
                           <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                           <th>
                              <div>
                                 <button className="btn btn-success btn-xs text-white">Make Admin</button>
                                 <button className="btn ml-2 btn-error btn-xs text-white">Delete</button>
                              </div>
                           </th>
                        </tr>
                     )
                  }

               </tbody>
            </table>
         </div>
      </div>
   );
};

export default DashboardPage;