import ProductList from "../ProductList";
// components/homepage/FeaturedProducts.js

const FeaturedProducts = () => (
  <div className="w-full max-w-7xl px-5 md:px-10 mx-auto">
    <div className="text-center my-[20px] md:my-[40px]">
      <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
        Explore the World with Our Bicycles
      </div>
      <div className="text-md md:text-xl">
        Enjoy your all terrain rides from Hilly mountain rides to off roads thrills with CycleVale Mountain bikes. These bicycles are loaded with world class components like shimano gear, Spur Suspension. With a vast collection of MTB cycles to choose from, CycleVale offers something for every level of rider, from beginners to professionals.
      </div>
    </div>
    <div className=" py-5 my-5 px-5  md:px-0">
      <ProductList />
    </div>
  </div>
);

export default FeaturedProducts;