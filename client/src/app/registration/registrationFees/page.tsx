"use client"

import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import React from 'react';
import { useRouter } from 'next/navigation';
import Carousel from '@/js';

const RegistrationFees: React.FC = () => {

    const router = useRouter();

    const handleRegistration = () => {
        router.push('/registration');
    }

    return (
        <div className='min-h-screen'>
            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Main Container */}
            <div className="container max-w-screen-lg mx-auto px-8 py-8 bg-white mb-10 min-h-screen mt-24 md:mt-16">
                
                {/* Heading Section */}
                <div className='flex flex-col md:flex-row items-center justify-center mt-14 mb-10'>
                    <img
                        src="/fees.png"
                        alt="fees icon"
                        loading="eager"
                        width={50}
                        height={50}
                        className="mb-4 md:mr-8"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">REGISTRATION FEES</h1>
                </div>

                {/* Registration Button */}
                <p className="text-center text-xl md:text-2xl text-red-600 font-semibold mb-4 cursor-pointer hover:underline" onClick={handleRegistration}>
                    Click to Registration
                </p>

                {/* Fees Section */}
                <p className="text-start font-semibold text-3xl md:text-4xl ml-8 md:ml-24 mb-4 mt-16">
                    FEES:
                </p>

                {/* Table */}
                <div className="overflow-x-auto mb-8 ml-4 md:ml-24 mr-4 md:mr-24 mt-5">
                    <table className="min-w-full bg-white border-2 border-gray-400">
                        <thead className='text-2xl md:text-3xl'>
                            <tr>
                                <th className="py-2 px-4 border-2 font-semibold">Registration Fees</th>
                                <th className="py-2 px-4 border-2 font-semibold">Early Bird</th>
                                <th className="py-2 px-4 border-2 font-semibold">Regular</th>
                            </tr>
                        </thead>
                        <tbody className='text-xl md:text-2xl text-center'>
                            <tr>
                                <td className="py-2 px-4 border-2">Local Delegates (Author)</td>
                                <td className="py-2 px-4 border-2 ">BDT 6000</td>
                                <td className="py-2 px-4 border-2 ">BDT 7000</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-2">Local Delegates (Participant)</td>
                                <td className="py-2 px-4 border-2 ">BDT 5000</td>
                                <td className="py-2 px-4 border-2 ">BDT 6000</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-2">Local Students (Author/ Co-author)</td>
                                <td className="py-2 px-4 border-2 ">BDT 4000</td>
                                <td className="py-2 px-4 border-2 ">BDT 5000</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-2">Foreign Delegates</td>
                                <td className="py-2 px-4 border-2 ">USD 350</td>
                                <td className="py-2 px-4 border-2 ">USD 450</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-2">Foreign Students</td>
                                <td className="py-2 px-4 border-2 ">USD 200</td>
                                <td className="py-2 px-4 border-2 ">USD 250</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Deadline */}
                <div className="mb-8 ml-4 md:ml-24 mt-16">
                    <div className='flex items-center'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">PAYMENT DEADLINE</h2>
                        <img
                            src="/information-button.png"
                            alt="information icon"
                            loading="eager"
                            width={21}
                            height={21}
                            className="ml-3 mb-4"
                        />
                    </div>
                    <p className="flex items-center mb-4">
                        <span className="text-xl md:text-2xl font-semibold">Early Bird</span>
                        <span className="ml-4 md:ml-8 text-xl md:text-2xl font-semibold">Date: March 15-March 25, 2025</span>
                    </p>
                    <p className="flex items-center">
                        <span className="text-xl md:text-2xl font-semibold">Regular</span>
                        <span className="ml-4 md:ml-12 text-xl md:text-2xl font-semibold">Date:  March 26-April 10, 2025</span>
                    </p>
                </div>

                {/* Payment System */}
                <div className="mb-8 ml-4 md:ml-24 mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">PAYMENT SYSTEM</h2>
                    <p className="text-2xl  cursor-pointer mb-4 ">
                        Payment can be made online during registration process through conference website
                    </p>
                </div>

                {/* Proceedings */}
                <div className="mb-8 ml-4 md:ml-24">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 underline text-red-600 mt-16">Proceedings:</h2>
                    <p className="mb-4 text-justify text-xl md:text-2xl">
                    The proceedings of the conference will be published in two forms: printed book (only extended abstract) and Pen drive (full proceedings). Selected papers will be considered for publication in the Journal of Engineering Research, Innovation and Education. We are in the process of indexing the proceedings in renowned digital repositories that are available online.
                    </p>
                    
                    
                </div>

                {/* Conference Tour */}
                <div className="mb-44 ml-4 md:ml-24 mt-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 underline text-red-600">Conference Tour:</h2>
                    <p className="mb-4 text-justify text-xl md:text-2xl">
                    An attractive tour will be arranged for delegates and accompanying persons to a beautiful location in Sylhet named &quot;SADA PATHOR&quot; in Volagonj. It is adjacent to the Indian boarder. The location is one-hour travelling distance from conference venue. 
                    </p>
                    <p className="mb-4 text-justify text-xl md:text-2xl">
                    Those who want to participate in the tour must registrar separately paying the required fees: BDT 1500 for Adults and BDT 1000 for Children above three years
                    </p>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <ScrollToTopButton />
                {/* Carousel Section */}
        <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RegistrationFees;
