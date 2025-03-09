"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Carousel from '@/js';
import Image from 'next/image';
import React from 'react';

const Submission: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow">
        <div className="container mx-auto p-4 mt-24 md:px-72">
          <h1 className="text-4xl md:text-5xl font-bold text-center my-12 flex justify-center items-center">
            <Image
              src="/submit.png"
              alt="Submit Icon"
              height={48}
              width={48}
              className="w-10 h-10 md:w-12 md:h-12 mr-4"
            />
            Submission
          </h1>

          <div className="mb-16">
            <div className="bg-gray-100 p-6 md:p-8 rounded-md shadow-md mx-4 md:mx-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4 underline">
                Extended Abstract and Full Paper Submission
              </h2>
              <p className="mb-4 text-xl md:text-2xl">
                <a href="https://cmt3.research.microsoft.com/docs/help/author/author-submission-form.html" className="text-blue-600 hover:underline">
                  Click here
                </a> to submit your extended abstract and full Paper (after abstract got accepted).
              </p>
              <p className="mb-4 text-xl md:text-2xl">
              You must have a <a href="https://cmt3.research.microsoft.com" className="text-blue-600 hover:underline">Microsoft CMT</a> account to submit both abstract and full paper online. If you don&apos;t have an account, please <a href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2F" className="text-blue-600 hover:underline">click here</a> to create one before submitting the abstract and full paper.
              </p>
              <p className='text-xl md:text-2xl'>
                If you face any problem in online submission, please contact the conference secretary (or <a href="mailto:icerie2025@sust.edu" className="text-blue-600 hover:underline">icerie2025@sust.edu</a>)
              </p>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-gray-100 p-6 md:p-8 rounded-md shadow-md mx-4 md:mx-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4 underline">
                Style Guideline
              </h2>
              <p className="mb-4 text-xl md:text-2xl">
                The length of the full paper should be minimum 4 pages and maximum 6 pages. Instruction Template for ICERIE-2025 Full paper in <a href="/doc/ICERIE2025_Full_Paper_Format.docx" className="text-blue-600 hover:underline">.docx</a> format. For abstract submission, please use this <a href="/doc/ICERIE2025_Abstract_Template.docx" className="text-blue-600 hover:underline">abstract template</a>.
              </p>
              <p className='text-xl md:text-2xl'>
                Download the conference brochure of <a href="/doc/Flyer_ICERIE 2025_SUST.pdf" className="text-blue-600 hover:underline">ICERIE2025</a>.
              </p>
            </div>
          </div>


          <div className="mb-16">
  <div className="bg-gray-100 p-6 md:p-8 rounded-md shadow-md mx-4 md:mx-20">
    <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4 underline">
      Poster Submission Guideline
    </h2>
    <p className="mb-4 text-xl md:text-2xl">
      Posters must be <strong>A0 size (36 × 48 inches)</strong> in <strong>portrait orientation</strong>. Content should be <strong>clear, concise, and visually engaging</strong>, following the provided template. Ensure readability with appropriate font sizes and high-quality visuals. 
      Presenters must set up posters <strong>30 minutes before the session</strong> and be available for a <strong>3-5 minute overview</strong> followed by Q&A.
    </p>
    <p className="text-xl md:text-2xl">
      Download the <a href="/doc/Poster template, ICERIE 2025.pptx " className="text-blue-600 hover:underline">Poster Template (.pptx)</a>.
    </p>
    <p className="text-xl md:text-2xl">
      Download the <a href="/doc/Poster Preparation Guideline, ICERIE 2025.docx" className="text-blue-600 hover:underline">Poster Preparation Guideline (.docx)</a>.
    </p>
  </div>
</div>



          <div className="pb-40"></div>
        </div>
      </main>
          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Submission;
