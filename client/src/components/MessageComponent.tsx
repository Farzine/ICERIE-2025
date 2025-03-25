import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


const MessageCard: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();



        // Format each message and join them with separators
        const formattedMessages = data
          .filter((msgObj: { messages: string; show: boolean }) => msgObj.show)
          .map((msgObj: { messages: string; }) => msgObj.messages || '')
          .join('\n\n');

        // Handle case where no messages are to be shown
        if (!formattedMessages) {
          setMessage("Message is Null");
        } else {
          setMessage(formattedMessages);
        }

      } catch (error) {
        console.error('An error occurred while fetching the messages:', error);
        setError('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    }; fetchMessages();
  }, []);

  return (
    <div className=" md:mr-0 ">
      <div className="bg-white md:shadow-xl my-10  h-[400px] border rounded-lg md:p-8 w-full  ">
        <div className="flex items-center mb-6">
          <h1 className="md:text-4xl font-bold text-gray-800 md:ml-0 ml-5">Message</h1>
          <svg width="25" height="25" className='ml-5' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
            <rect width="40" height="40" fill="url(#pattern0_696_822)" />
            <defs>
              <pattern id="pattern0_696_822" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_696_822" transform="scale(0.0078125)" />
              </pattern>
              <image id="image0_696_822" width="128" height="128" xlinkHref="data:image/png;base64,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" />
            </defs>
          </svg>

        </div>

        {/* Profile and Text */}
        <div className="flex items-center mb-6 md:ml-0 ml-5">
          <img
            src="/teacher/selim.jpeg"
            alt="Md Farhad Rabbi"
            loading="eager"
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <div>
            <h3 className="font-bold text-gray-800 md:text-3xl text-2xl">Prof. Dr. Md. Reza Selim</h3>
            <p className="md:text-xl text-lg text-gray-500">Conference Chair, 2025</p>
          </div>
        </div>

        {/* Message Content */}
        <div className="h-80 overflow-y-auto px-5 scrollbar-hide">
          <ReactMarkdown className="text-gray-800 text-xl md:text-2xl font-thin md:ml-0 ml-5">
            {message}
          </ReactMarkdown>
          {isLoading &&

            <div role="status" className="  w-[250px] md:w-[480px] h-[400px] animate-pulse">
              <div className="h-2.5  my-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[360px] mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[330px] mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[180px] mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[360px]"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[140px] mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[200px] mb-2.5"></div>
              <div className="h-2 my-8 bg-gray-200 rounded-full dark:bg-gray-700  max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>}
        </div>

        
      </div>
    </div>
  );
};

export default MessageCard;
