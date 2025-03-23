"use client";
const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
import Navbar from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import AttendeeCard from "./AttendeeCard";
import Footer from "@/components/Footer";
import Carousel from "@/js";

// Define the interface
interface AttendeeInterface {
  _id: string;
  name: string;
  email: string;
  university: string;
  photoUrl: string;
}

// Component to fetch and display attendees
export default function Attendee() {
  const [attendees, setAttendees] = useState<AttendeeInterface[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BACKENDURL}/registration`)
      .then((response) => {
        setAttendees(response.data);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching attendees:", error);
      });
  }, []);

  // Sort attendees in reverse order and filter based on keyword
  const filteredAttendees = [...attendees]
    .reverse()
    .filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(keyword.toLowerCase()) ||
        attendee.email.toLowerCase().includes(keyword.toLowerCase())
    );

  return (
    <main className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex-grow mt-36">
        {fetching ? (
          <div className="container mx-auto px-6">
            <div className="h-14 bg-gray-200 rounded-md w-3/4 mx-auto mb-8 animate-pulse"></div>
            <div className="flex justify-center mx-6 h-16 md:h-20 mb-10">
              <div className="max-w-screen-md w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-center my-6">
              Meet our attendees
            </h1>
            <div className="flex justify-center mx-6 h-16 md:h-20 mt-16">
              <input
                placeholder="Search with your name, email"
                className="max-w-screen-md w-full rounded-md border border-input bg-background px-6 py-2 text-xl md:text-2xl ring-offset-red-300 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 my-6">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee) => (
                  <AttendeeCard
                    _id={attendee._id}
                    email={attendee.email}
                    name={attendee.name}
                    university={attendee.university}
                    photoUrl={attendee.photoUrl}
                    key={attendee._id}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-xl font-semibold">
                  No users found
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer />
    </main>
  );
}



// ********************Push korar somoy nicher ta uncomment korbi ar kaj korar somoy uporer ta uncomment krbi************************
// "use client";

// import Navbar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import { useEffect, useState } from "react";
// import Carousel from "@/js";

// interface CountdownType {
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// export default function MaintenancePage() {
//   const [countdown, setCountdown] = useState<CountdownType | number>(0);
  
//   // Optional: Add a countdown timer (set to 0 to disable)
//   const MAINTENANCE_DURATION_HOURS = 0; // Set to estimated hours or 0 to disable
  
//   useEffect(() => {
//     if (MAINTENANCE_DURATION_HOURS > 0) {
//       // Calculate end time (current time + duration in hours)
//       const endTime = new Date();
//       endTime.setHours(endTime.getHours() + MAINTENANCE_DURATION_HOURS);
      
//       const timer = setInterval(() => {
//         const now = new Date();
//         const diff = endTime.getTime() - now.getTime();
        
//         if (diff <= 0) {
//           clearInterval(timer);
//           setCountdown(0);
//           // Optionally refresh the page when maintenance is expected to be complete
//           // window.location.reload();
//         } else {
//           // Convert milliseconds to hours, minutes, seconds
//           const hours = Math.floor(diff / (1000 * 60 * 60));
//           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
//           setCountdown({ hours, minutes, seconds });
//         }
//       }, 1000);
      
//       return () => clearInterval(timer);
//     }
//   }, []);

//   return (
//     <main className="flex flex-col min-h-screen bg-gray-50">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <Navbar />
//       </div>
      
//       <div className="flex-grow flex items-center justify-center px-4 mt-36">
//         <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="bg-red-500 h-3"></div>
          
//           <div className="p-6 md:p-12 text-center">
//             <div className="inline-flex justify-center items-center mb-8">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
            
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Under Maintenance
//             </h1>
            
//             <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            
//             <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
//               We are currently updating the attendee information system to serve you better. We apologize for any inconvenience.
//             </p>

//             {countdown && typeof countdown === 'object' ? (
//               <div className="mb-8">
//                 <p className="text-sm text-gray-500 mb-3">Estimated time remaining:</p>
//                 <div className="flex justify-center space-x-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-2xl font-bold text-red-500">{countdown.hours}</div>
//                     <div className="text-xs text-gray-500">Hours</div>
//                   </div>
//                   <div className="text-2xl font-bold">:</div>
//                   <div className="flex flex-col items-center">
//                     <div className="text-2xl font-bold text-red-500">{countdown.minutes}</div>
//                     <div className="text-xs text-gray-500">Minutes</div>
//                   </div>
//                   <div className="text-2xl font-bold">:</div>
//                   <div className="flex flex-col items-center">
//                     <div className="text-2xl font-bold text-red-500">{countdown.seconds}</div>
//                     <div className="text-xs text-gray-500">Seconds</div>
//                   </div>
//                 </div>
//               </div>
//             ) : null}
            
//             <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-lg mx-auto">
//               <div className="flex">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-sm text-gray-700">
//                   We are working to bring this page back online as quickly as possible. Thank you for your patience.
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <a 
//                 href="/"
//                 className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 Return to Home
//               </a>
//               <a
//                 href="mailto:support@conference.com"
//                 className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
//               >
//                 Contact Support
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 hidden">
//         <Carousel />
//       </div>
//       <Footer />
//     </main>
//   );
// }