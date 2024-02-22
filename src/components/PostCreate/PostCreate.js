
"use client";

import Link from "next/link";
import QuestionForm from "./QuestionForm";



const PostCreate = () => {
   

   return (
      <div className=" sticky top-14   z-10  " >
         <div className="w-full  p-5 bg-white">
            <div className="flex flex-col lg:flex-row w-full gap-6 items-start">
               <div className="w-[50px] rounded-full">
                  
               </div>
               <div className="space-y-4 w-full">
                  <button className="w-full bg-slate-300 py-2 px-5 rounded-full text-left">What do you want to ask or share?</button>
                  <div className="flex sm:flex-row md:flex-col lg:flex-row items-center justify-around md:items-start lg:items-center lg:justify-between px-4">
                     <div className="flex md:w-32  bg-transparent border-0 gap-2 items-center">
                     {/* question modal start */}
                     {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
   <div>
    <QuestionForm/>
   </div>
    
  </div>
</dialog>

          
          {/* question modal end */}
                        
                     </div>

                     <span className="sm:block md:hidden lg:block">|</span>
                     <Link href="/answer" >
                     <div className="flex md:w-32 btn bg-transparent border-0 gap-2 items-center">

<p className="text-sm">Answer</p>
</div>
                     </Link>
                     
                           
                           {/* post form start */}
                     <span className="sm:block md:hidden lg:block">|</span>
                     <div className="flex md:w-32  bg-transparent border-0 gap-2 items-center">


                        {/* The button to open modal */}
                        <label htmlFor="my_modal_7" className="btn">  Post</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                        <div className="modal" role="dialog">
                           <div className="modal-box  w-[1000px] h-[400px] ">
                            post
                           </div>
                           <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
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