"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Carousel from "@/js";
import { useState } from "react";
import { PiMapPinArea } from "react-icons/pi";

export default function Venue() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      <main className="flex-grow w-full bg-white mx-auto flex flex-col items-center p-4 md:p-10 mt-20">
        {/* Heading */}
        <div className="heading flex items-center justify-center mb-1 mt-24">
          <PiMapPinArea className="w-10 h-10 md:w-12 md:h-12 mr-5" />
          <h1 className="font-inter font-bold text-5xl md:text-6xl mx-2">
            Venue
          </h1>
        </div>
        <hr className="w-1/6 mb-4" />

        {/* Address */}
        <address className="font-extralight font-inter text-center my-2 text-sm md:text-2xl">
          Shahjalal University of Science and Technology
          <br />
          University Ave, Kumargaon,
          <br />
          Sylhet 3114, Bangladesh
        </address>

        {/* Map */}
        <div className="google-map-sust w-full drop-shadow-md flex justify-center items-center my-8 px-5">
          <div className="w-full h-64 md:h-96 lg:w-[1000px] lg:h-[450px] relative">
            {!isMapLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mb-2"></div>
                <div className="text-gray-600 font-medium text-sm md:text-base">Loading loacation map...</div>
                </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.435552561316!2d91.82933827436678!3d24.91722804298561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750556002144eab%3A0xe277e14dbca9f2ab!2sShahjalal%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1721041724355!5m2!1sen!2sbd"
              className={`w-full h-full ${
                isMapLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoaded(true)}
            ></iframe>
          </div>
        </div>
      </main>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
