// components/homepage/HeroSection.js
//import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => (
  <div className="hero-container">
    <img src="/images/hero.jpeg" alt="Bicycle" layout="fill" objectFit="cover" />
    <div className="hero-text">
      <h1>Explore the World with Our Bicycles</h1>
      <Link href="/products" legacyBehavior><a className="hero-button">Shop Now</a></Link>
    </div>
  </div>
);

export default HeroSection;
