// components/Notices.tsx

import React, { useEffect, useState } from "react";

// Define the types for the date data
interface Notice {
  show: unknown;
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const Notices: React.FC = () => {
  const [Notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the important Notices from the backend API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/notices`
        );
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        } else {
          console.error("Failed to fetch important Notices");
          setError("Error fetching important Notices");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="w-full md:w-[330px] text-wrap my-10 border p-4 h-[400px]  bg-white rounded-lg md:shadow-xl">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="md:text-4xl text-3xl font-semibold mr-2">Notices</h2>
        <svg
          width="22"
          height=""
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="40" height="40" fill="url(#pattern0_827_498)" />
          <defs>
            <pattern
              id="pattern0_827_498"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_827_498" transform="scale(0.0078125)" />
            </pattern>
            <image
              id="image0_827_498"
              width="128"
              height="128"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </div>
      <div>
      <span className="bg-red-600 text-sm rounded-full w-12 h-6 animate-bounce flex justify-center items-center text-white font-semibold">New</span>
      </div>
      </div>
      <ul className="overflow-y-scroll no-scrollbar px-5 w-full  md:w-[330px]  h-[340px]">
        {[...Notices].reverse().filter((notice: Notice) => notice.show).map((notice: Notice) => (
          <li
            key={notice.id}
            className="flex w-full  items-start mb-4 overflow-hidden hover:bg-slate-200 "
          >
           
            <div className="group  sm:max-w-[350px] hover:bg-slate-200 ml-5">
              <h3 className="text-2xl w-full sm:text-2xl font-semibold group-hover:bg-slate-200 text-red-500 overflow-wrap break-words whitespace-normal">
                {notice.title}
              </h3>
              {notice.description.includes("http") ? (
                <a
                  href={notice.description}
                  target="_blank"
                  className="text-lg w-full sm:text-xl  group-hover:bg-slate-200 font-semibold hover:text-blue-700 hover:u overflow-wrap break-words whitespace-normal"
                >
                  {notice.description}
                </a>
              ) : (
                <p className="text-lg w-full sm:text-xl  group-hover:bg-slate-200 font-semibold overflow-wrap break-words whitespace-normal">
                  {notice.description}
                </p>
              )}

              <p className="text-md w-full sm:text-xl group-hover:bg-slate-200 text-gray-400 overflow-wrap break-words whitespace-normal">
                Updated :
                {new Date(notice.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </li>
        ))}
        {isLoading && (
          <div role="status" className="max-w-sm w-full h-full animate-pulse">
            <div className="h-2.5  my-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[180px] mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[140px] mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
            <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Notices;
