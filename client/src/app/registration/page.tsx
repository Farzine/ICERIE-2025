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
        route.push(`${frontendUrl}/attendee/${response.data._id}`);
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
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-8">
              <label htmlFor="name" className="mb-1 text-xl md:text-2xl">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="university" className="mb-1 text-xl md:text-2xl">
                University<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={form.university}
                onChange={handleChange}
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background"
                required
              />
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
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background"
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
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background"
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
                className="h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-xl md:text-2xl ring-offset-background"
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
