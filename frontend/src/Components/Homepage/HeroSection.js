// First, ensure you import Swiper and SwiperSlide components, and the Autoplay module correctly
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Then, use SwiperCore to install the Autoplay module
SwiperCore.use([Autoplay]);

import 'swiper/css'; // Basic Swiper styles
import 'swiper/css/autoplay'; // Styles for the Autoplay module

import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {/* SwiperSlide components for images */}
        <SwiperSlide>
          <Image src="/images/slide1.jpeg" layout="fill" objectFit="cover" alt="Men's Bicycles" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/slide2.jpeg" layout="fill" objectFit="cover" alt="Women's Bicycles" />
        </SwiperSlide>
        {/* Additional slides as needed */}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 md:p-12">
        <div className="bg-black bg-opacity-50 text-Black py-2 px-4 md:py-3 md:px-6 rounded">
          <h2 className="text-lg md:text-2xl font-semibold">Men's Section</h2>
        </div>
        <div className="bg-black bg-opacity-50 text-Black py-2 px-4 md:py-3 md:px-6 rounded">
          <h2 className="text-lg md:text-2xl font-semibold">Women's Section</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
