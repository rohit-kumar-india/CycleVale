import React from 'react'
import FeaturedProducts from '@/Components/Homepage/FeaturedProducts'
import HeroSection from '@/Components/Homepage/HeroSection'
import CategoriesSection from '@/Components/Homepage/CategoriesSection'
import SpecialOffers from '@/Components/Homepage/SpecialOffers'
import Testimonials from '@/Components/Homepage/Testimonials'
import BlogHighlights from '@/Components/Homepage/BlogHighlights'
import NewsletterSignup from '@/Components/Homepage/NewsletterSignup'
import About from './About'
import Contact from './Contact'

export const Homepage = () => {
  return (
    <section>
      <HeroSection />
      <FeaturedProducts />
      <About />
      <CategoriesSection />
      <SpecialOffers />
      <Testimonials />
      <BlogHighlights />
      <NewsletterSignup />
      <Contact />
    </section>
  )
}

export default Homepage