import ProductCard from "../ProductCard";
import Wrapper from "../Wrapper";
// components/homepage/FeaturedProducts.js
const FeaturedProducts = () => (
    <>
    <Wrapper>
    <div className="text-center max-w-[800px] mx-auto my-[20px] md:my-[40px]">
    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
      Explore the World with Our Bicycles
    </div>
    <div className="text-md md:text-xl">
    Enjoy your all terrain rides from Hilly mountain rides to off roads thrills with CycleVale Mountain bikes. These bicycles are loaded with world class components like shimano gear, Spur Suspension. With a vast collection of MTB cycles to choose from, CycleVale offers something for every level of rider, from beginners to professionals.
    </div>
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-20 my-10 px-5  md:px-0">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        </div>
        </Wrapper>
      </>
  );

export default FeaturedProducts;