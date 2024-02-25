
'use client';

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './Swiper.css';
const AboutSlider = () => {
    return (
        <div>
            <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide> <p>Slide 1</p>  </SwiperSlide>
        <SwiperSlide> <p>Slide 2</p>  </SwiperSlide>
        <SwiperSlide> <p>Slide 3</p>  </SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default AboutSlider;