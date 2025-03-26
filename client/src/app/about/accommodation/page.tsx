// src/app/about/accommodation/page.tsx
"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import Carousel from '@/js';
// Import the Carousel component

export default function Accommodation() {
  return (
    <div>
    <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div  className="h-screen flex flex-col justify-center md:items-center bg-white px-16">
      
      <h1 className="md:text-5xl text-4xl font-semibold mb-4">Accommodation</h1>
      <p className="md:text-3xl text-2xl text-gray-600 mb-6">
        We will announce the accommodation details soon.
      </p>
      {/* <Link
        href="/" // Update with the actual route you want to navigate to
        className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Continue
      </Link> */}
    </div>
    {/* Wrap the Carousel and Footer components inside a div */}
    <div>
      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer/>
    </div>
    </div>
  );
}
