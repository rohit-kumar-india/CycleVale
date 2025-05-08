import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import Image from 'next/image';


const HeroSection = () => {
  const images = [
    "/images/slide1.png",
    "/images/slide2.png",
  ]

  return (
    <div className="mt-[60px] relative">
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
        className="w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full flex justify-center relative">
              <Image
                src={img}
                alt="Men's Bicycles"
                width={1200}
                height={600}
                className="w-full max-w-7xl h-auto mix-blend-multiply"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  
      {/* Text Overlay */}
      <div className="absolute w-full top-10 text-black inset-0 flex z-10 justify-center items-center px-2 md:px-12 pointer-events-none">
        <div className="text-center p-2 rounded-xl text-orange-500 bg-glassy md:text-left">
          <h2 className="text-xl md:text-4xl lg:text-5xl font-bold drop-shadow-md">Discover Your Perfect Ride</h2>
          <span className="flex justify-center text-sm md:text-lg lg:text-2xl font-semibold md:font-bold">
            <Typewriter
              words={[
                "Explore our Men's and Women's collections",
                'Dream up your perfect cycle. Let CycleVale help you with it.',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </div>
      </div>
    </div>
  );
  
//   return (
//     <div className="mt-[60px] relative h-screen overflow-hidden ">
//       <Swiper
//        modules={[Autoplay]}
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         effect="fade"
//         className="w-full h-full"
//       >
        
//      {
//       images.map((img, index) => {
//         return (
//           <SwiperSlide key={index}>
//           {/* <div className='h-[90vh] w-[100%] bg-white flex justify-center'> */}
//           {/* <img className='mix-blend-multiply max-w-7xl' src={img} layout='fill' objectFit="contain" alt="Men's Bicycles" priority /> */}
//           <Image 
//   src={img}
//   alt="Men's Bicycles"
//   width={1200}
//   height={600}
//   className="mix-blend-multiply w-full max-w-7xl h-auto"
// />
//           {/* </div> */}
//         </SwiperSlide>
//         )
//       })
//      }
//       </Swiper>

//       <div className="absolute w-full  top-10 text-black inset-0 flex z-10 justify-center items-center px-4 md:px-12">
//         <div className="text-center p-5 rounded-xl text-orange-500 bg-glassy md:text-left">
//           <h2 className="text-2xl md:text-5xl font-bold  drop-shadow-md">Discover Your Perfect Ride</h2>
//           <span className="flex justify-center text-lg font-bold" >
//           <Typewriter
//                             words={['Explore our Men\'s and Women\'s collections',
//                                 'Dream up your perfect cycle. Let CycleVale help you with it.',]}
//                             loop={true}
//                             cursor
//                             cursorStyle='|'
//                             typeSpeed={70}
//                             deleteSpeed={50}
//                             delaySpeed={1000}
//                         />
//                         </span>
//         </div>
//       </div>
//     </div>
//   );
};

export default HeroSection;
