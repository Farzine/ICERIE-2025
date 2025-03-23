import React from "react";

interface ScheduleCardProps {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  checkend: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  title,
  date,
  start_time,
  end_time,
  checkend,
}) => {
  return (
    <div className="flex justify-center w-full my-4 bg-gradient-to-br from-red-50 to-white">
      {/* icon with or without tail */}
      <div className="">
        {checkend ? (
          // SVG without tail
          <svg
            className="mx-2 "
            width="35"
            height="35"
            viewBox="0 0 59 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="29.5" cy="28.5" rx="29.5" ry="28.5" fill="#D9D9D9" />
            <circle cx="29.5" cy="28.5" r="19.5" fill="#FF4105" />
          </svg>
        ) : (
          // SVG with tail
          <svg
            className="mx-2"
            width="40"
            height="60"
            viewBox="0 0 59 182"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="29"
              y1="44"
              x2="29"
              y2="182"
              stroke="#D9D9D9"
              strokeWidth="10"
            />
            <ellipse cx="29.5" cy="28.5" rx="29.5" ry="28.5" fill="#D9D9D9" />
            <circle cx="29.5" cy="28.5" r="19.5" fill="#FF4105" />
          </svg>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-11/12 bg-gray-200 items-center">
        <h2 className="text-lg md:text-2xl font-inter  text-center w-full md:w-1/3 break-words md:mr-14">
          {title}
        </h2>
        <p className="text-lg md:text-2xl text-center w-full md:w-1/4  break-words md:mr-20">
          {date}
        </p>
        <p className="text-lg md:text-2xl font-inter text-center w-full md:w-1/4   break-words md:ml-16">
          {start_time} - {end_time}
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
