"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import OrganizedBy from "@/components/OrganizedBy";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ImportantDates from "@/components/FrontendImportantDateComponent";
import MessageCard from "@/components/MessageComponent";
import LatestUpdates from "@/components/LatestUpdates";
import Carousel from "@/js/index";
import Sponsors from "@/components/Sponsors";
import Notices from "@/components/Notice";
import { TfiDownload } from "react-icons/tfi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="hero-section bg-cover bg-center relative mt-48 mb-36">
        {/* Overlay for darkened effect */}
        <div className="overlay opacity-70 absolute inset-0"></div>
        {/* Hero content */}
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center mb-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Logo in Hero Section */}
            <img
              src="./icerieLogo.jpg"
              alt="ICERIE Logo"
              className="w-32 h-32 lg:w-40 lg:h-40"
            />
            <h1 className="text-3xl lg:text-5xl font-bold text-black leading-tight">
              8th International Conference on <br />
              Engineering Research, Innovation and Education <br /> (ICERIE
              2025)
            </h1>
          </div>

          {/* Date and Location */}
          <div className="text-black text-lg lg:text-xl mt-4 lg:mt-2">
            <p className="text-red-600 text-4xl my-10  font-semibold">
              24-26th April 2025
            </p>
            <div className="flex flex-col sm:flex-row gap-3 my-5">
              <a
                href="/doc/Flyer_ICERIE 2025_SUST.pdf"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:border-red-600 hover:text-red-600 hover:bg-gray-50 transition-colors duration-300 group"
                download
              >
                <span className="font-semibold mr-2 text-base md:text-lg">Download Brochure</span>
                <TfiDownload className="text-sm md:text-base group-hover:animate-bounce" />
              </a>
              <a
                href="/doc/Poster template, ICERIE 2025.pptx"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:border-red-600 hover:text-red-600 hover:bg-gray-50 transition-colors duration-300 group"
                download
              >
                <span className="font-semibold mr-2 text-base md:text-lg">Poster Template</span>
                <TfiDownload className="text-sm md:text-base group-hover:animate-bounce" />
              </a>
            </div>
            <p className="text-xl">
              University Ave, Sylhet 3114 <br />
              Shahjalal University of Science and Technology
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <div className="container mx-auto px-4 my-10">
        <LatestUpdates />
      </div>

      <div className="container mx-auto my-5 md:my-40">
        <div className="flex flex-col  px-2 lg:flex-row  justify-center items-center  md:px-40 lg:space-x-5">
          {/* Important Dates Section */}

          <ImportantDates />

          {/* Message Section */}

          <MessageCard />
          
          <Notices />
        </div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-10 md:px-40 py-8">
        <Carousel />
      </div>

      {/* Sponsors Section */}
      <div className="container mt-32 mb-10 mx-auto px-4 py-8">
        <Sponsors />
      </div>

   

      {/* Footer Section */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
