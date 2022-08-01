import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import 'swiper/css';

export default function Slider(props) {
  const { list } = props;
  return(
    <Swiper 
        modules={[Autoplay]} 
        loop={true}
        autoplay={{delay: 5000 }}
        className="z-30 w-full h-full"
    > 
    {
      list.map((item) => (
        <SwiperSlide>
          <img src={require(`../imagens/wallpaper/${item}`)} className="absolute object-cover bg-center w-full h-full" alt="" />
        </SwiperSlide>  
      ))
    }
    </Swiper>
  );
}