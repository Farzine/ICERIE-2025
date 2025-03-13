"use client";
import Footer from "@/components/Footer";
import Imageholder from "@/components/Imageholder";
import Navbar from "@/components/NavBar";
import Carousel from "@/js";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";

interface ImageItem {
  path: string;
  public_id: string;
  description: string;
  tag: string;
  year: number;
}

export default function Gallery() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/images`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched images:", data);
          setImages(data);
          setFilteredImages(data);
        } else {
          console.error("Error fetching images:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  const filterImages = (tag: string | null, year: number | null) => {
    let filtered = images;
    if (tag) {
      filtered = filtered.filter((image) => image.tag === tag);
    }
    if (year) {
      filtered = filtered.filter((image) => image.year === year);
    }
    setFilteredImages(filtered);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); 
      filterImages(null, selectedYear); 
    } else {
      setSelectedTag(tag);
      filterImages(tag, selectedYear);
    }
  };

  const handleYearClick = (year: number) => {
    if (selectedYear === year) {
      setSelectedYear(null); 
      filterImages(selectedTag, null); 
    } else {
      setSelectedYear(year);
      filterImages(selectedTag, year);
    }
  };

  return (
    <main className="h-auto">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="gallery h-screen flex flex-col md:flex-row mx-auto mt-20">
        {/* left side bar */}
        <div className="leftbar w-full md:w-1/5 h-auto md:h-screen bg-white hidden md:block">
          <div className="tags">
            <h1 className="text-center my-12 font-semibold text-4xl">
              TAGS
            </h1>
          </div>

          <ul className="text-semibold text-center px-10">
            <div
              className={`text-2xl    hover:bg-red-500 hover:text-white  flex justify-center items-center md:text-3xl rounded-full text-slate-950 font-roboto w-25 h-10 my-1 py-2 cursor-pointer ${
                selectedTag === "conference" ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleTagClick("conference")}
            >
              <li className={selectedTag === "conference" ? " text-white" : ""}>
                Conferences
              </li>
            </div>
            <div
              className={`text-2xl   hover:bg-red-500 hover:text-white  flex justify-center items-center md:text-3xl mt-5 rounded-full text-slate-950 font-roboto w-25 h-10 my-1 py-2 cursor-pointer ${
                selectedTag === "meeting" ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleTagClick("meeting")}
            >
              <li className={selectedTag === "meeting" ? " text-white" : ""}>
                Meetings
              </li>
            </div>
            <div
              className={`text-2xl   hover:bg-red-500 hover:text-white flex justify-center items-center md:text-3xl mt-5 rounded-full text-slate-950 font-roboto w-25 h-10  py-2 cursor-pointer ${
                selectedTag === "tour" ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleTagClick("tour")}
            >
              <li className={selectedTag === "tour" ? " text-white" : ""}>
                Tour
              </li>
            </div>
            <div
              className={`text-2xl   hover:bg-red-500 hover:text-white flex justify-center items-center md:text-3xl mt-5 rounded-full text-slate-950 font-roboto w-25 h-10 my-1 py-2 cursor-pointer ${
                selectedTag === "program" ? "bg-red-500" : ""
              }`}
              onClick={() => handleTagClick("program")}
            >
              <li className={selectedTag === "program" ? " text-white" : ""}>
                Programs
              </li>
            </div>
          </ul>
        </div>

        {/* rightbar */}
        <div className="rightbar w-full md:w-4/5 h-auto bg-neutral-100 md:h-screen">
          {/* Heading */}
          <div className="heading flex justify-center items-center md:mt-20">
            <CiImageOn className="w-12 h-12 md:w-14 md:h-14 mt-5 mr-3" />
            <h1 className="text-center font-semibold font-inter text-4xl md:text-5xl my-5 pt-5">
              GALLERY
            </h1>
          </div>

          {/* years button */}
          <div className="years flex flex-wrap justify-center md:justify-start">
            <div
              className={`w-24 h-16 border-gray-200 border-2 m-2 rounded-full hover:text-white font-semibold font-inter text-md text-center p-2 cursor-pointer hover:bg-red-500 ${
                selectedYear === 2025 ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleYearClick(2025)}
            >
              2025
            </div>
            <div
              className={`w-24 h-16 border-gray-200 border-2 m-2 rounded-full font-semibold font-inter text-md text-center p-2 cursor-pointer hover:bg-red-500 hover:text-white ${
                selectedYear === 2024 ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleYearClick(2024)}
            >
              2024
            </div>
            <div
              className={`w-24 h-16 border-gray-200 border-2 m-2 rounded-full font-semibold font-inter text-md text-center hover:text-white p-2 cursor-pointer hover:bg-red-500 ${
                selectedYear === 2023 ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleYearClick(2023)}
            >
              2023
            </div>
          </div>

          {/* Tags for smaller screens */}
          <div className="tags md:hidden">
            <h1 className="text-center my-12 font-semibold font-inter text-md">
              TAGS
            </h1>

            <ul className="text-center flex w-screen justify-center gap:4 md:gap-6   my-5">
              <li
                className={`cursor-pointer w-2/6 md:w-1/6 border-gray-200 border-2  rounded-full flex justify-center items-center ${
                  selectedTag === "conference" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleTagClick("conference")}
              >
                Conferences
              </li>
              <li
                className={`cursor-pointer w-2/6 md:w-1/6 border-gray-200 border-2  rounded-full flex justify-center items-center ${
                  selectedTag === "meeting" ? "bg-red-500" : ""
                }`}
                onClick={() => handleTagClick("meeting")}
              >
                Meetings
              </li>
              <li
                className={`cursor-pointer w-2/6 md:w-1/6 border-gray-200 border-2  rounded-full flex justify-center items-center ${
                  selectedTag === "tour" ? "bg-red-500" : ""
                }`}
                onClick={() => handleTagClick("tour")}
              >
                Tour
              </li>
              <li
                className={`cursor-pointer w-2/6 md:w-1/6 border-gray-200 border-2  rounded-full flex justify-center items-center ${
                  selectedTag === "program" ? "bg-red-500" : ""
                }`}
                onClick={() => handleTagClick("program")}
              >
                Programs
              </li>
            </ul>
          </div>
          <hr />

          {/* image gallery */}
          {loading ? (
            <div className="imagegallery w-full h-4/5 grid grid-cols-3 mx-auto sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-7 md:gap-1 overflow-y-auto py-2 md:py-10 md:px-10">
              {[...Array(21)].map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col items-center m-1">
                  <div className="bg-gray-200 h-24 md:h-32 w-full rounded"></div>
                  <div className="mt-2 bg-gray-200 h-3 w-3/4 rounded"></div>
                  <div className="mt-1 bg-gray-200 h-2 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="imagegallery w-full h-4/5 grid grid-cols-3 mx-auto sm:grid-cols-4  md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-7  md:gap-1 overflow-y-auto py-2 md:py-10 md:px-10">
              {filteredImages.map((item, index) => (
                <Imageholder
                  key={index}
                  src={item.path}
                  desc={item.description}
                  year={item.year}
                />
              ))}
            </div>
          )}
        </div>
      </div>
          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer />
    </main>
    // fixed
  );
}
