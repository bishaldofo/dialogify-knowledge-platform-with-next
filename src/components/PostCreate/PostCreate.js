"use client";

import Link from "next/link";
import QuestionForm from "./QuestionForm";
import Image from "next/image";
import { RiQuestionnaireLine } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { useSession } from "next-auth/react";

const PostCreate = () => {
   const { data: session, status } = useSession();
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(false);

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
   const [showModal, setShowModal] = useState(false);

   const openModal = () => {
      setShowModal(true);
   };

   const closeModal = () => {
      setShowModal(false);
   };


   return (
      <div>
         <div className=" sticky top-14  z-10">
            <div className="w-full p-5 bg-white">
               <div className="flex flex-col lg:flex-row w-full gap-6  items-start">
                  <div className="w-[50px] rounded-full">
                     <div className="dropdown dropdown-end">
                        <div className="flex flex-row items-center gap-2">
                           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                 {
                                    userData?.profileImage ?
                                       <Image width={100} height={100} style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} alt="Tailwind CSS Navbar component" src={userData?.profileImage} />
                                       :
                                       <Image width={100} height={100} style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} alt="Tailwind CSS Navbar component" src="https://i.ibb.co/MNJLHMM/defalut-img.webp" />
                                 }
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4 w-full">
                     <button className="w-full bg-[#F1F2F2] py-2 px-5 rounded-full text-left" htmlFor="my_modal_7" onClick={openModal}>What do you want to ask or share?</button>
                     <div className="flex sm:flex-row md:flex-col lg:flex-row items-center justify-around md:items-start lg:items-center lg:justify-between px-4">
                        <div className="flex gap-2 items-center">
                           {/* question modal start */}
                           {/* You can open the modal using document.getElementById('ID').showModal() method */}
                           <button className="btn bg-transparent border-0" onClick={() => document.getElementById('my_modal_3').showModal()}><RiQuestionnaireLine size={20} />Ask</button>
                           <dialog id="my_modal_3" className="modal">
                              <div className="modal-box">
                                 <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn bg-transparent border-0 absolute right-2 top-2">✕</button>
                                 </form>
                                 <div>
                                    <QuestionForm />
                                 </div>

                              </div>
                           </dialog>


                           {/* question modal end */}

                        </div>

                        <span className="sm:block md:hidden lg:block">|</span>
                        <Link href="/answer" >
                           <div className="flex md:w-32 btn bg-transparent border-0 gap-2 items-center">

                              <p className="text-sm flex items-center"><TfiPencilAlt size={18} className="mr-2" />Answer</p>
                           </div>
                        </Link>


                        {/* post form start */}
                        <span className="sm:block md:hidden lg:block">|</span>
                        <div className="flex md:w-32  bg-transparent border-0 gap-2 items-center">
                           {/* The button to open modal */}
                           <label htmlFor="my_modal_7" onClick={openModal} className="btn bg-transparent border-0"> <LuPencil size={18} />Create Post</label>

                           {/* Put this part before </body> tag */}
                           <input type="checkbox" id="my_modal_7" checked={showModal} onChange={() => { }} className="modal-toggle" />
                           <div className={`modal ${showModal ? 'open' : ''}`} role="dialog">
                              <div className="modal-box ">
                                 <PostForm closeModal={closeModal} />
                              </div>
                              
                           </div>

                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>
   )
};

export default PostCreate;