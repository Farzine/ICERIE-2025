"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export default function RegistrationClosed() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Full Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/IICT.jpg"
          alt="IICT SUST"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center text-white relative z-10 px-6">
        {/* Logo */}
        <Image
          src="/icLogo.webp"
          height={200}
          width={200}
          alt="ICERIE 2025 Logo"
          className="aspect-square w-32 md:w-48"
        />

        {/* Message */}
        <h1 className="text-3xl md:text-5xl font-bold text-red-400 mt-6">
          Registration has closed
        </h1>
        <p className="text-lg md:text-xl mt-4">
          Thank you for your interest in ICERIE 2025.  
        </p>
        <p className="text-lg md:text-xl">
          For any queries, please contact us at:
        </p>

        {/* Contact Email */}
        <div className="flex items-center justify-center gap-2 mt-4 text-lg md:text-2xl font-medium">
          <Mail size={24} />
          <a
            href="mailto:icerie2025@sust.edu"
            className="hover:underline text-blue-400"
          >
            icerie2025@sust.edu
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
