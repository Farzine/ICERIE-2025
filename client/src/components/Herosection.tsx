import { SetStateAction, useEffect, useState } from "react";


export default function Herosection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: "/1.jpg",
      text: "8th International Conference on Engineering Research, Innovation and Education (ICERIE 2025)",
    },
    {
      src: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719964800&semt=ais_user",
      text: "",
    },
    {
      src: "/slide.jpg",
      text: "Slide 3 Text",
    },
    {
      src: "/slide.jpg",
      text: "Slide 4 Text",
    },
    {
      src: "/slide.jpg",
      text: "Slide 5 Text",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-64 md:h-96 lg:h-[600px] overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`ease-in-out transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"} `}
              data-carousel-item
            >
              <img
                src={image.src}
                className="block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
                loading="eager"
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </div>

        {/* Fixed text overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black/60 p-4">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-6 md:mb-0 md:ml-28">
              <img src="/logoNavBar.png" loading="eager" alt="logo" className="w-20 h-20 md:w-36 md:h-36" width={1000} height={1000} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-base sm:text-lg md:text-3xl lg:text-4xl leading-tight">
                8th International Conference on <br />
                Engineering Research, Innovation and Education <br />
                (ICERIE 2025)
              </h1>
              <div className="flex flex-col items-center md:flex-row mt-4">
                <div className="bg-orange-600 px-4 py-2 rounded text-sm md:text-xl">
                  January 09-11, 2025
                </div>
                <div className="ml-0 mt-2 md:ml-4 md:mt-0 text-sm md:text-xl">
                  Sylhet, Bangladesh
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
          data-carousel-prev
          onClick={goToPrevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
          data-carousel-next
          onClick={goToNextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}
