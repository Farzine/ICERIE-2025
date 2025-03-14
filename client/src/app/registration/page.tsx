// "use client";
// import React from "react";
// import Image from "next/image";
// import Navbar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import { Mail } from "lucide-react";

// export default function RegistrationClosed() {
//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {/* Navbar */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <Navbar />
//       </div>

//       {/* Full Background Image */}
//       <div className="absolute inset-0">
//         <Image
//           src="/IICT.jpg"
//           alt="IICT SUST"
//           layout="fill"
//           objectFit="cover"
//           className="z-0"
//         />
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black opacity-60"></div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow flex flex-col justify-center items-center text-center text-white relative z-10 px-6">
//         {/* Logo */}
//         <Image
//           src="/icLogo.webp"
//           height={200}
//           width={200}
//           alt="ICERIE 2025 Logo"
//           className="aspect-square w-32 md:w-48"
//         />

//         {/* Message */}
//         <h1 className="text-3xl md:text-5xl font-bold text-red-400 mt-6">
//           Registration has closed
//         </h1>
//         <p className="text-lg md:text-xl mt-4">
//           Thank you for your interest in ICERIE 2025.  
//         </p>
//         <p className="text-lg md:text-xl">
//           For any queries, please contact us at:
//         </p>

//         {/* Contact Email */}
//         <div className="flex items-center justify-center gap-2 mt-4 text-lg md:text-2xl font-medium">
//           <Mail size={24} />
//           <a
//             href="mailto:icerie2025@sust.edu"
//             className="hover:underline text-blue-400"
//           >
//             icerie2025@sust.edu
//           </a>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }



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





"use client";
import React, { useState } from "react";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ImagePlus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "@/js";

const baseUrl = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const frontendUrl = process.env.NEXT_PUBLIC_APP_FRONTEND_URL;

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    university: "",
    category: "",
    email: "",
    phone: "",
    photoUrl: "",
  });
  const categories = [
    "Local Delegates (Author)",
    "Local Delegates (Participant)",
    "Local Students (Author/ Co-author)",
    "Foreign Delegates",
    "Foreign Students",
  ];
  const [submitting, setSubmitting] = useState<boolean>(false);
  const route = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleProfilePicUpload = (result: any) => {
    const uploadedURL = result.info.secure_url;
    setForm({
      ...form,
      photoUrl: uploadedURL,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    if (
      !form.name ||
      !form.university ||
      !form.category ||
      !form.email ||
      !form.phone ||
      !form.photoUrl
    ) {
      toast.error("Please upload your image.");
      setSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/registration`, form);
      if (response.status === 201) {
        route.push(`${frontendUrl}/attendee/${response.data._id}/papers`);
        toast.success("Registration successful.");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.error("Error registering user:", error);
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Main Content */}
      <div className="flex-grow grid md:grid-cols-2 grid-cols-1 justify-center items-center">
        {/* Background Image Section */}
        <div className="relative h-full bg-black bg-opacity-50 overflow-hidden md:visible invisible">
          <Image
            src="/IICT.jpg"
            alt="IICT SUST"
            layout="fill"
            objectFit="cover"
            className="opacity-50 z-0"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center z-10">
            <p className="text-white text-center font-mono text-5xl font-semibold p-4">
              8th International Conference on
            </p>
            <p className="text-white text-center font-mono text-3xl font-semibold p-4 mb-8">
              Engineering Research, Innovation and Education (ICERIE 2025)
            </p>
          </div>
        </div>
        {/* Registration Form Section */}
        <div className="rounded-lg flex flex-col items-center py-20 px-10 ">
          <Image
            src="/icerieLogo.jpg"
            height={200}
            width={200}
            alt=""
            className="aspect-square w-32 md:w-48"
          />
          <h1 className="text-2xl md:text-4xl font-serif font-semibold mb-8 text-center">
            Register Now
          </h1>
         
          <form onSubmit={handleSubmit} className="md:px-16 px-5">
            {/* Form Fields */}
            <div className="p-4 bg-amber-50 border-l-4 border-red-500 text-amber-800 rounded shadow-md mb-8 relative">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-1">Important Notice</h3>
                <p className="text-sm md:text-base">
                  Please ensure all information is accurate before submission. Registration details 
                  <span className="font-bold"> cannot be modified</span> after submission. Double-check 
                  your name spelling, contact details, and affiliation as they will appear on your conference badge.
                </p>
              </div>
            </div>
          </div>
            <div className="mb-8 relative">
              <label htmlFor="name" className="mb-1 text-xl md:text-2xl">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <div className="text-base text-gray-500 mt-1">
                Please enter your name as per your official documents
              </div>
            </div>
            <div className="mb-8 relative">
              <label htmlFor="university" className="mb-1 text-xl md:text-2xl">
              University/Institution<span className="text-red-500">*</span>
              </label>
              <input
              type="text"
              id="university"
              name="university"
              value={form.university}
              onChange={handleChange}
              className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
              />
              <div className="text-base text-gray-500 mt-1">
              Enter the complete name of your university or institution
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="category" className="mb-1 text-xl md:text-2xl">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="" disabled>
                  Select your category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label htmlFor="email" className="mb-1 text-xl md:text-2xl">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="phone" className="mb-1 text-xl md:text-2xl">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
               className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            {form.photoUrl ? (
              <Image
                src={form.photoUrl}
                height={200}
                width={200}
                alt=""
                className="rounded-full h-32 w-32"
              />
            ) : (
              <Image
                src="/camera.png"
                height={200}
                width={200}
                alt=""
                className="rounded-full h-32 w-32"
              />
            )}
            <CldUploadWidget
              onUpload={handleProfilePicUpload}
              uploadPreset={process.env.NEXT_PUBLIC_IMG_UPLOAD_PRESET}
            >
              {({ open }) => (
                <button
                  type="button"
                  className="border my-2 p-2 rounded-md hover:bg-slate-300 flex gap-2"
                  onClick={() => open()}
                >
                  <ImagePlus />
                  Upload your image <span className="text-red-600">*</span>
                </button>
              )}
            </CldUploadWidget>
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
