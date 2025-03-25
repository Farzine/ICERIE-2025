"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/NavBar';
import OrganizedBy from '@/components/OrganizedBy';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Carousel from '@/js';

interface Sponsor {
  _id: string;
  path: string;
  sponsorName: string;
  sponsorType: string;
}

const SponsorsPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sponsors`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error(`Error fetching sponsors: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setSponsors(data);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        setError('Error fetching sponsors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const renderSponsorsByType = (type: string) => {
    const filteredSponsors = sponsors.filter(sponsor => sponsor.sponsorType === type);
    return (
      <div className="mb-8">
        <hr className="mt-8 border-t-2 border-gray-300 mx-auto w-11/12 sm:w-8/12 lg:w-6/12" />
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center text-orange-500 mb-6 mt-6 sm:mt-8">{type}</h2>
        <div className="flex flex-wrap justify-center gap-20">
            {filteredSponsors.length > 0 ? (
            filteredSponsors.map((sponsor) => (
              <div key={sponsor._id} className="text-center p-4 transition-transform hover:scale-105">
                <div className="flex justify-center items-center h-24 sm:h-32 md:h-40">
                <img
                  src={sponsor.path}
                  alt={sponsor.sponsorName}
                  className="object-contain max-h-full"
                  width="120"
                  height="120"
                />
                </div>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-gray-800 line-clamp-2">
                {sponsor.sponsorName}
              </p>
              </div>
            ))
            ) : (
            !isLoading && <p className="text-gray-500 italic">No sponsors in this category yet</p>
            )}
          {isLoading && <div className='w-full h-full flex justify-center items-center' role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className='flex justify-center mr-28 items-center mt-28'>
          <div className='pt-9 mr-4'>
            <Image src="/handshake.png" alt="handshake icon" width={50} height={50} />
          </div>
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mt-5">Sponsors</h1>
          </div>
        </div>
        <p className="text-center mb-4 text-lg sm:text-xl md:text-3xl mt-10">
          8th International Conference on Engineering Research, Innovation and Education (ICERIE 2025)
        </p>
        <div className='my-24'>
        <OrganizedBy />
        </div>
        {renderSponsorsByType('Media Partner')}
        {renderSponsorsByType('Technical Partner')}
        {renderSponsorsByType('Supported By')}
      </div>
      {error && <div>{error}</div>}
      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default SponsorsPage;
