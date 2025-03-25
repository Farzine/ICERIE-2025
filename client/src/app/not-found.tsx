"use client";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full flex  items-center justify-between gap-2 px-4">
        <Link
          href="/"
          className=" flex  items-center text-start font-semibold text-3xl hover:text-red-500 "
        >
          <IoIosArrowBack className="w-10  mt-1 h-10 group-hover:text-red-500 " /> Home 
        </Link>
        <div className="flex items-center gap-2">
        <img
          src="/icLogo.webp"
          width={150}
          height={150}
          loading="eager"
          alt="ICERIE 2025 Logo"
          className="h-12 w-auto"
        />
        <h1 className="text-2xl font-bold text-red-500 flex flex-col uppercase text-right">
          ICERIE 2025
        </h1>
        </div>
      </div>
      <DotLottieReact
        src="https://lottie.host/db554378-be32-4d7b-8160-48475dedc2d3/NoznImNqXI.lottie"
        loop
        style={{ width: "500px", height: "500px" }}
        autoplay
      />

      <h1 className="text-3xl font-bold">NOT FOUND | 404</h1>
      <p className="text-xl mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
