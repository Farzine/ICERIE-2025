"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import React from 'react';
import Image from 'next/image';
import Carousel from '@/js';
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow mt-20 pt-24 pb-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
        <div className="relative mb-6">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full blur-md opacity-20"></div>
        <div className="bg-white p-3 rounded-full shadow-md relative">
          <Image
          src="/support.png"
          alt="Support icon"
          width={80}
          height={80}
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center relative">
        <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">CONTACT US</span>
        <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full"></span>
        </h1>
      </div>
      
      {/* Contact Information Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
        {/* Left Side - Contact Information */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          <span className="border-b-2 border-red-500 pb-1">Conference Secretary</span>
        </h2>
        <div className="space-y-5">
          <div className="border-b border-gray-100 pb-4">
          <p className="font-bold text-2xl mb-1.5 text-gray-800">Dr Md Tamej Uddin</p>
          <p className="text-gray-600 text-xl">Department of Chemical Engineering and Polymer Science</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-gray-700 flex items-center mb-2">
            <HiOutlineOfficeBuilding className="h-10 w-10 mr-2 text-red-500" />
            <span className='text-xl'>Shahjalal University of Science and Technology</span>
            </p>
            <p className="text-gray-700 flex items-center">
            <HiOutlineLocationMarker className="h-10 w-10 mr-2 text-red-500" />
            <span className='text-xl'>Sylhet, Bangladesh</span>
            
            </p>
          </div>
        </div>
        </div>
        
        {/* Right Side - Contact Links */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          <span className="border-b-2 border-red-500 pb-1">Get in Touch</span>
        </h2>
        <div className="space-y-5 md:space-y-6">
          <div className="flex items-center group hover:transform hover:translate-x-1 transition-transform duration-300">
          <div className="bg-red-50 p-3 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300 shadow-sm">
            <Image
            src="/gmail.png"
            alt="Email"
            width={24}
            height={24}
            className="object-contain"
            />
          </div>
          <a 
            href="mailto:icerie2025@sust.edu" 
            className="text-lg md:text-xl text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
          >
            icerie2025@sust.edu
          </a>
          </div>
          
          <div className="flex items-center group hover:transform hover:translate-x-1 transition-transform duration-300">
          <div className="bg-red-50 p-3 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300 shadow-sm">
            <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            width={24}
            height={24}
            className="object-contain"
            />
          </div>
          <a 
            href="https://wa.me/8801793834474" 
            className="text-lg md:text-xl text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
          >
            +8801793834474
          </a>
          </div>
          
          <div className="flex items-center group hover:transform hover:translate-x-1 transition-transform duration-300">
          <div className="bg-red-50 p-3 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300 shadow-sm">
            <Image
            src="/facebook.png"
            alt="Facebook"
            width={24}
            height={24}
            className="object-contain"
            />
          </div>
          <a 
            href="https://www.facebook.com/ICERIE2023" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
          >
            Facebook Page
          </a>
          </div>
          
          <div className="flex items-center group hover:transform hover:translate-x-1 transition-transform duration-300">
          <div className="bg-red-50 p-3 rounded-full mr-4 group-hover:bg-red-100 transition-colors duration-300 shadow-sm">
            <Image
            src="/call.png"
            alt="Phone"
            width={24}
            height={24}
            className="object-contain"
            />
          </div>
          <a 
            href="tel:+8801521781591" 
            className="text-lg md:text-xl text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
          >
            +8801521781591
          </a>
          </div>
        </div>
        </div>
      </div>
      </div>
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;