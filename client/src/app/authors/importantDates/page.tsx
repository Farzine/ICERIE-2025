"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import React, { useState, useEffect, Suspense } from "react";
import { Calendar } from "lucide-react";
import Carousel from "@/js";

interface ImportantDate {
  description: string;
  date: string;
  show: unknown;
}

const ImportantDates: React.FC = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch important dates");
        }
        const data = await response.json();
        setDates(data);
      } catch (error) {
        console.error("Error fetching important dates:", error);
        setError('Error fetching Important Dates');
      }finally {
        setIsLoading(false);
      }
    };

    fetchDates();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-10 py-12 bg-white min-h-screen mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-16 mt-8">
            <Calendar className="w-10 h-10 mr-2 text-gray-700 md:w-14 md:h-14" />
            <h1 className="text-4xl md:text-5xl sm:text-xl font-bold text-center text-gray-800">
              IMPORTANT DATES
            </h1>
          </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden border-none mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
                <div className="p-6 font-bold text-2xl md:text-3xl flex items-center justify-center bg-gray-100 border-2">
                  Description
                </div>
                <div className="p-6 font-bold text-2xl md:text-3xl flex items-center justify-center bg-gray-100 border-2">
                  Date
                </div>
              </div>
              {dates.filter((dates)=>dates.show).map((item, index) => (
                <div key={index} className="relative py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                    <div className="p-6 bg-white border-2 text-xl md:text-2xl font-semibold text-center md:text-left">
                      {item.description}
                    </div>
                    <div className="p-6 bg-white border-2 text-xl md:text-2xl font-semibold flex justify-center items-center">
                      <span className="text-red-600">{item.date}</span>
                    </div>
                  </div>
                  {index !== dates.length - 1 && (
                    <div className="absolute md:left-1/2 top-full w-full h-1 md:w-px md:h-10 bg-gray-300"></div>
                  )}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-6 md:h-6 md:bg-gray-400 rounded-full border-4 md:border-white"></div>
                </div>
              ))}
            {isLoading && (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                  <div key={`skeleton-${index}`} className="relative py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                      <div className="p-6 bg-gray-200 border-2 h-20 animate-pulse rounded"></div>
                      <div className="p-6 bg-gray-200 border-2 h-20 animate-pulse rounded"></div>
                    </div>
                    {index !== 2 && (
                      <div className="absolute md:left-1/2 top-full w-full h-1 md:w-px md:h-10 bg-gray-300"></div>
                    )}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-6 md:h-6 md:bg-gray-300 rounded-full"></div>
                  </div>
                ))}
              </>
            )}
            {error && <div className="p-6 text-center text-red-500 text-xl">{error}</div>}
            </div>
        </div>
      </div>
          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default ImportantDates;