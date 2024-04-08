import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';


const HeroSection = () => {
  const images = [
    "/images/slide1.png",
    "/images/slide2.png",
  ]


  return (
    <div className="mt-[60px] relative h-screen overflow-hidden ">
      <Swiper
       modules={[Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        className="w-full h-full"
      >
        
     {
      images.map((img) => {
        return (
          <SwiperSlide>
          <div className='h-[90vh] w-[100%] bg-white flex justify-center'>
          <img className='mix-blend-multiply' src={img} layout='fill' objectFit="contain" alt="Men's Bicycles" priority />
          </div>
        </SwiperSlide>
        )
      })
     }
      </Swiper>

      <div className="absolute w-full  top-10 text-black inset-0 flex z-10 justify-center items-center px-4 md:px-12">
        <div className="text-center p-5 rounded-xl text-orange-500 bg-glassy md:text-left">
          <h2 className="text-2xl md:text-5xl font-bold  drop-shadow-md">Discover Your Perfect Ride</h2>
          <span className="flex justify-center text-lg font-bold" >
          <Typewriter
                            words={['Explore our Men\'s and Women\'s collections',
                                'Dream up your perfect cycle. Let TrippyAI plan it for you.',]}
                            loop={true}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                        </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
