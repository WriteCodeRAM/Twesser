'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';

import {
  EffectCoverflow,
  FreeMode,
  Autoplay,
  Mousewheel,
} from 'swiper/modules';

export default function Carousel() {
  const slides = [
    '/slideshow_tweets/meatball_fruit_blur.png',
    '/slideshow_tweets/cereal_blur.png',
    '/slideshow_tweets/cops_blur.png',
    '/slideshow_tweets/paris_1940_blur.png',
    '/slideshow_tweets/grandma_blur.png',
    '/slideshow_tweets/be_smart_blur.png',
    '/slideshow_tweets/sonic_blur.png',
    '/slideshow_tweets/dump_blur.png',
    '/slideshow_tweets/sex_gifs_blur.png',
  ];
  return (
    <>
      <Swiper
        effect={'coverflow'}
        slidesPerView={2}
        spaceBetween={40}
        loop={true}
        speed={10000}
        freeMode={true}
        grabCursor={true}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: false,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 1.25,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Mousewheel, FreeMode, Autoplay]}
        className="mx-0 my-6 h-72"
      >
        {slides.map((url, index) => (
          <SwiperSlide
            key={index}
            className="border-double border-4 border-light-blue-500"
          >
            <Image src={url} fill alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
