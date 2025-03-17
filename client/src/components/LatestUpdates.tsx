import React, { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
// Define the notice type
type Update = {
  id: string;
  title: string;
  show: boolean;
};

const LatestUpdates: React.FC = () => {
  const [updates, setUpdates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-updates`
        );
        const data = await response.json();
        setUpdates(
          data
            .filter((update: { show: any }) => update.show)
            .map((update: { title: string }) => update.title)
        );
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="flex items-center gap-2 p-4 bg-white shadow-sm rounded-md">
      <div className="whitespace-nowrap">
        <span className="font-bold text-xl ml-1 md:ml-16 md:text-4xl">
          Latest Updates
        </span>
      </div>
      <span className="text-yellow-500 text-lg">
        <svg
          className="w-9 h-9 md:w-14 md:h-16"
          width="35"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
        >
          <rect width="40" height="40" fill="url(#pattern0_696_820)" />
          <defs>
            <pattern
              id="pattern0_696_820"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_696_820" transform="scale(0.0078125)" />
            </pattern>
            <image
              id="image0_696_820"
              width="128"
              height="128"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </span>
      <span className="border-l-2 border-gray-500 mx-2 h-10 md:h-16 ml-1 md:ml-5" />
      <div className="w-full overflow-hidden py-2 md:py-4 flex items-center relative">
        <div className="flex whitespace-nowrap animate-scroll-slower ">
          {updates.length > 0 ? (
        [...updates].reverse().map((update, index) => (
          <span
            key={index}
            className="mr-8 md:mr-12 flex items-center gap-1 md:gap-2 text-base md:text-2xl font-medium text-gray-800"
          >
            <GoDotFill className="text-red-500 flex-shrink-0 " />
            {update}
          </span>
        ))
          ) : !loading && (
        <span className="text-base md:text-xl font-medium text-gray-600 italic">No updates available</span>
          )}
          {loading && (
        <div className="flex items-center">
          <div role="status" className="flex items-center animate-pulse">
            <div className="h-2 md:h-2.5 bg-gray-200 rounded-full w-24 md:w-48"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
