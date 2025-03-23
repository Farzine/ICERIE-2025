"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Carousel from '@/js';
import Image from 'next/image';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="bg-gray-100 p-8 sm:p-16 min-h-screen mt-16">
        <div className='flex items-center justify-center mt-10'>
          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className='mt-3 pl-2'>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">About</h1>
          </div>
        </div>

        <div className='flex items-center justify-center mt-10'>
          <h2 className="text-2xl sm:text-3xl text-center mb-8">
            8th International Conference on Engineering Research, Innovation <br className="hidden sm:block" /> and Education (ICERIE 2025)
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white shadow-lg rounded-lg p-6 sm:p-8 mx-4 sm:mx-72 mt-16 mb-20">
          <div className="flex justify-center items-center mb-10 mt-10 space-x-10">
            <div className="w-24 sm:w-36">
              <Image src="/sustLogo.png" alt="Logo 1" width={130} height={130} layout="responsive" />
            </div>
            <div className="w-28 sm:w-40">
              <Image src="/icerieLogo.jpg" alt="Logo 2" width={130} height={130} layout="responsive" />
            </div>
          </div>

          <div className="text-justify text-xl sm:text-3xl mx-4 sm:mx-20">
            <p>
              The School of Applied Sciences and Technology, Shahjalal University of Science and Technology (SUST), Sylhet, 
              Bangladesh, is pleased to host the 8th International Conference on Engineering Research, Innovation, and Education 
              (ICERIE) 2025. This conference serves as a premier platform for the dissemination of new research findings and advancements 
              in theoretical, experimental, and applied Engineering and Technology. It will bring together leading academic scientists, 
              researchers, students, professionals, and industry practitioners from around the world to exchange and share their experiences 
              and research results on all aspects of Engineering and Technology. Organized biennially by the School of Applied Science & 
              Technology, the conference features participation from the following academic departments:
            </p>
          </div>

          <div className="mt-10 sm:mt-14 text-start mx-4 sm:mx-20">
            <h3 className="text-xl sm:text-3xl font-semibold">Departments from the School of Applied Science & Technology</h3>
            <ul className="list-disc list-outside mt-5 text-left pl-5 sm:pl-8 pb-10">
              <li>Architecture (<strong>ARC</strong>)</li>
              <li>Chemical Engineering & Polymer Science (<strong>CEP</strong>)</li>
              <li>Civil & Environmental Engineering (<strong>CEE</strong>)</li>
              <li>Computer Science & Engineering (<strong>CSE</strong>)</li>
              <li>Electrical & Electronic Engineering (<strong>EEE</strong>)</li>
              <li>Food Engineering & Tea Technology (<strong>FET</strong>)</li>
              <li>Industrial & Production Engineering (<strong>IPE</strong>)</li>
              <li>Mechanical Engineering (<strong>MEE</strong>)</li>
              <li>Petroleum and Mining Engineering (<strong>PME</strong>)</li>
            </ul>
          </div>
        </div>
      </div>

          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default AboutPage;
