import React from 'react'
import FeaturedProducts from '@/Components/Homepage/FeaturedProducts'
import HeroSection from '@/Components/Homepage/HeroSection'
import CategoriesSection from '@/Components/Homepage/CategoriesSection'
import SpecialOffers from '@/Components/Homepage/SpecialOffers'
import Testimonials from '@/Components/Homepage/Testimonials'
import BlogHighlights from '@/Components/Homepage/BlogHighlights'
import NewsletterSignup from '@/Components/Homepage/NewsletterSignup'
import AboutUs from './about'
import ContactUS from './contact'

export const Homepage = () => {
  return (
    <section>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <SpecialOffers />
      <Testimonials />
      <BlogHighlights />
      <NewsletterSignup />
      <AboutUs />
      <ContactUS />
    </section>
  )
}

export default Homepage