// Footer.js
import React from 'react';
//import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { instaIcon, FaInstagram } from '@heroicons/react/outline';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-300 to-orange-500 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
        <div className="text-black">
        <h3 className="text-xl font-semibold mb-2 "> Company </h3>
        <ul>
        <li><a href="#">About us</a></li>
        <li><a href="#">Our Services</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms & Conditions</a></li>
        <li><a href="#">Career</a></li>
        </ul>
        </div>

        
        <div className="text-black">
        <h3 className="text-xl font-semibold mb-2 "> Customer Services </h3>
        <ul>
        <li><a href="#">Contact us</a></li>
        <li><a href="#">Track Order</a></li>
        <li><a href="#">Return Order</a></li>
        <li><a href="#">Cancel Order</a></li>
        </ul>
        </div>

        <div className="flex justify-start ">

        <div className="text-black">
          <h3 className="text-xl font-semibold mb-2"> Connect with Us </h3>
          <p>Follow us on social media for updates and promotions</p>
        </div>

          {/* <a
            href="https://www.facebook.com/yourfacebookpage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black px-2"
          >
          
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/yourinstagrampage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black px-2"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/yourgithubaccount"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black px-2"
          >
            <FaGithub size={24} />
            
        </a> */}

        </div>
        </div>
        <hr className="my-4 border-gray-400" />
        <p className="text-black text-center">© {new Date().getFullYear()} CycleVale. All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;