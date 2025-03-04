"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Schedulecard from "@/components/Schedulecard";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Carousel from "@/js";
import { useEffect, useState } from "react";

interface ScheduleItem {
  session: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface SessionListItem {
  sessionTheme: string;
  venue: string;
  start_time: string;
  end_time: string;
}

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [sessionList, setSessionList] = useState<SessionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sessionList`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessionList");
        }
        const data: SessionListItem[] = await response.json();
        setSessionList(data);
      } catch (error) {
        console.error("Error fetching sessionList:", error);
        setError('Error fetching schedule');
      }finally {
        setIsLoading(false);
      }
    };

    fetchSessionList();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/schedule`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data: ScheduleItem[] = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setError('Error fetching schedule');
      }finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow bg-white p-8 md:p-16 mt-16">
        <div className="w-full md:w-4/5 bg-white mx-auto h-auto pb-10 rounded-md shadow-lg">
          {/* heading box */}
          <div className="heading flex justify-center items-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock-8 my-3"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 8 14" />
            </svg>
            <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl mx-2 my-5">
              SCHEDULE
            </h2>
          </div>

          {/* schedule table */}
          <div className="bg-red-500 flex flex-col md:flex-row justify-around py-3 my-2 px-4 md:px-40 items-center">
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Session
            </h1>
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Date
            </h1>
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Time
            </h1>
          </div>

            {/* Render schedule cards */}
            {!isLoading ? (
            schedule.map((item, index) => (
              <Schedulecard
              key={index}
              title={item.session}
              date={item.date}
              start_time={item.start_time}
              end_time={item.end_time}
              checkend={index === schedule.length - 1}
              />
            ))
            ) : (
            // Skeleton loader
            Array(10).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-around py-3 px-4 md:px-40 items-center border-b border-gray-200">
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              </div>
            ))
            )}
            {error && <div className="text-red-500 text-center py-4">{error}</div>}
        </div>

        {/* session list */}
        <div className="w-full md:w-4/5 bg-white mx-auto h-auto pb-10 rounded-md shadow-lg mt-24">
          {/* heading box */}
          <div className="heading flex justify-center items-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="black"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock-8 my-3"
              viewBox="0 0 64 64"
            >
              <path d="M3 62h12a1 1 0 0 0 1-1v-8a7 7 0 0 0-3.779-6.208 5 5 0 1 0-6.442 0A7 7 0 0 0 2 53v8a1 1 0 0 0 1 1zm3-19a3 3 0 1 1 3 3 3 3 0 0 1-3-3zM4 53a5 5 0 0 1 10 0v7H4zm14 2v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a5 5 0 0 0-2.207-4.145 4 4 0 1 0-5.586 0A5 5 0 0 0 18 55zm3-7a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm-1 7a3 3 0 0 1 6 0v5h-6zm10-2v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a7 7 0 0 0-3.779-6.208 5 5 0 1 0-6.442 0A7 7 0 0 0 30 53zm4-10a3 3 0 1 1 3 3 3 3 0 0 1-3-3zm3 5a5.006 5.006 0 0 1 5 5v7H32v-7a5.006 5.006 0 0 1 5-5zm9 7v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a5 5 0 0 0-2.207-4.145 4 4 0 1 0-5.586 0A5 5 0 0 0 46 55zm3-7a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm-1 7a3 3 0 0 1 6 0v5h-6zm10.414-37.95A6 6 0 1 0 49.54 17H44V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h14.5v1.52l-4.625 3.7A1 1 0 0 0 13.5 37h19a1 1 0 0 0 .625-1.781L28.5 31.52V30H43a1 1 0 0 0 1-1v-4.749l4.833.95-2.977 10.527A1 1 0 0 0 46.818 37H61a1 1 0 0 0 1-1V21.558a4.374 4.374 0 0 0-3.586-4.508zM50 13a4 4 0 1 1 4 4 4 4 0 0 1-4-4zM26.875 32.781 29.649 35h-13.3l2.774-2.219A1 1 0 0 0 19.5 32v-2h7v2a1 1 0 0 0 .375.781zM42 28H4V4h38v13h-3a1 1 0 0 0-.888.54l-2 3.856a1 1 0 0 0 .7 1.442L42 23.858zm18 7H48.141l2.912-10.3a1 1 0 0 0-.77-1.254L38.5 21.133 39.607 19h18.374A2.339 2.339 0 0 1 60 21.558z"></path>
            </svg>
            <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl mx-2 my-5">
              SESSION LIST
            </h2>
          </div>

          {/* session list table */}
          <div className="bg-red-500 flex flex-col md:flex-row justify-around py-3 my-2 px-4 md:px-40 items-center">
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Session Theme
            </h1>
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Venue
            </h1>
            <h1 className="text-white font-semibold text-2xl md:text-3xl text-center w-full md:w-1/3 md:ml-0 ml-14">
              Time
            </h1>
          </div>

          {/* Render SessionListItem cards */}
          {/* {sessionList.map((item, index) => (
            <Schedulecard
              key={index}
              title={item.sessionTheme}
              date={item.venue}
              start_time={item.start_time}
              end_time={item.end_time}
              checkend={index === sessionList.length - 1}
            />
          ))}
          {isLoading && <div>Loading...</div>} */}
          {!isLoading ? (
            sessionList.map((item, index) => (
              <Schedulecard
              key={index}
              title={item.sessionTheme}
              date={item.venue}
              start_time={item.start_time}
              end_time={item.end_time}
              checkend={index === sessionList.length - 1}
              />
            ))
            ) : (
            // Skeleton loader
            Array(10).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-around py-3 px-4 md:px-40 items-center border-b border-gray-200">
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full md:w-1/3 py-2 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
              </div>
            ))
            )}
            {error && <div className="text-red-500 text-center py-4">{error}</div>}
        </div>
      </div>
            {/* Carousel Section */}
            <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Schedule;
