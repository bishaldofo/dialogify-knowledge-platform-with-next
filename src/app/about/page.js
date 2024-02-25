import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import React from 'react';
import vectorOne from '../../assets/vector-oner.png'
import AboutSlider from '@/components/Slider/AboutSlider';
const AboutPage = () => {
   return (
      <div>
         <Navbar/>
         <div className=' mt-20 ' >
            
            <div className=' flex justify-around  ' >

            
            <div>
               Dialogify

               <div>
                  <AboutSlider/>
               </div>
            </div>
            <div>
               <Image  className=' rounded-full ' src={vectorOne}  width={700} height={400} alt='image' />
            </div>
            </div>

         </div>

      </div>
   );
};

export default AboutPage;