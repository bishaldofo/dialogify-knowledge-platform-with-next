'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_u5ae2ls', 'template_9bo8c7i', form.current, 'PPj3o-AZOEl1eaGpS')
      .then((result) => {
          console.log(result.text);
          e.target.reset();
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Your massege has been send",
            showConfirmButton: false,
            timer: 1500
          });
      }, (error) => {
          console.log(error.text);
      });
  };

    return (
         <div className=' w-full ' >

<div className="hero w-full " style={{backgroundImage: 'url(https://i.ibb.co/CtbgQ98/tyler-franta-ius-J25i-Yu1c-unsplash.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="">
    <div className="  text-center space-y-10 py-20   ">
              <h2 className=" text-center mx-auto  text-4xl text-white font-semibold "> Get in Touch </h2>
              <form className=" flex flex-col lg:w-96 w-72 space-y-6 "  ref={form} onSubmit={sendEmail} >
                <input  className=" text-black border border-slate-300 bg-white font-semibold  rounded-2xl py-3 px-4 " type="text" placeholder=" your name " name="user_name" />
                
                <input className=" text-black  border border-slate-300 bg-white font-semibold  rounded-2xl py-3 px-4 " type="email" placeholder=" your email " name="user_email" />
                
                <textarea name="message" placeholder="message" className="  border border-slate-300 bg-white font-semibold   rounded-2xl py-3 px-4   textarea textarea-bordered textarea-lg w-full text-black" ></textarea>
                <input className=" py-3 bg-[#0079D3] text-white font-semibold mt-4  rounded-3xl hover:bg-blue-800 "  type="submit" value="Send" />
              </form>
            </div>
    </div>
  </div>
</div>

          <div className='  my-20  ' >
            
            
            
          </div>
        </div>
    );
};

export default Contact;