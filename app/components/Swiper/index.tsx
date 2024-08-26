"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
// import { Image } from '@nextui-org/react'
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';

interface IProps {
  dataSources: string[];
}

const photos = [
  'https://images.pexels.com/photos/7469387/pexels-photo-7469387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/7469289/pexels-photo-7469289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6213729/pexels-photo-6213729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6213739/pexels-photo-6213739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const MySwiper: React.FC<IProps> = ({ dataSources = photos }) => {

  useEffect(() => {
    
  })
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={3}
      effect={'coverflow'}
      loop={true}
      centeredSlides={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 40
        },
        780: {
          slidesPerView: 3,
          spaceBetween: 50
        },
      }}
      autoplay={{
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      }}
      className="coverflow"
    >
      {dataSources.map((p, index) => {
        return (
          <SwiperSlide className="flex justify-center" key={index}>
            <Image
              src={p}
              alt=""
              width={560}
              height={500}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MySwiper;