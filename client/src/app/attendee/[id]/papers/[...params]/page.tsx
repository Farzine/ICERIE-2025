"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Carousel from "@/js";

interface Paper {
  paperId: string;
  track: string;
  proceedingsPublication: string;
  fullPaperPublication: string;
  presentationType: string;
  payment_status: boolean;
  transaction_id: string | null;
}

interface Attendee {
  name: string;
  email: string;
  phone: string;
  category: string;
  university: string;
  photoUrl: string;
  visaSupport: string;
  tourInterested: boolean;
  papers: Paper[];
}

export default function PaymentRedirectPage({
  params,
}: {
  params: { id: string; params?: string[] };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${BACKENDURL}/payments/status/${params.id}`);
        setAttendee(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch payment status. Please try again later or contact support."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentStatus();
  }, [params.id, BACKENDURL]);

  const handleDownloadPayslip = (paperId?: string) => {
    // You could pass paperId to the backend if needed:
    // `${BACKENDURL}/payments/paySlip/${params.id}?paperId=${paperId}`
    const payslipUrl = `${BACKENDURL}/payments/paySlip/${params.id}`;
    window.open(payslipUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-gray-700 font-medium">Verifying payment status...</p>
        </div>
        {/* Carousel Section */}
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border-t-4 border-red-500">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Error</h2>
            <p className="text-gray-700 text-center mb-6">{error}</p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
        {/* Carousel Section */}
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  if (!attendee) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border-t-4 border-red-500">
            <h2 className="text-xl font-bold text-center mb-4">No Data Found</h2>
            <p className="text-gray-700 text-center mb-6">
              Unable to retrieve your information. Please try again later.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
        {/* Carousel Section */}
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow pt-40 pb-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Attendee Information Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border-t-4 border-red-500">
            <div className="bg-red-500 p-4 text-white text-2xl font-bold">
              Attendee Information
            </div>
            <div className="p-6">
              {/* Upper portion: name and photo */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                {attendee.photoUrl && (
                  <img
                    src={attendee.photoUrl}
                    alt="Attendee Photo"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-xl font-bold mb-2">{attendee.name}</h1>
                  <div className="text-sm text-gray-600">
                    <p>{attendee.category}</p>
                    <p>{attendee.university}</p>
                  </div>
                </div>
              </div>

              {/* Detailed info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Email:</div>
                  <div className="text-gray-600">{attendee.email}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Phone:</div>
                  <div className="text-gray-600">{attendee.phone}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Visa Support:
                  </div>
                  <div className="text-gray-600">{attendee.visaSupport}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Tour Interested:
                  </div>
                  <div className="text-gray-600">
                    {attendee.tourInterested ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment and Paper Information */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border-t-4 border-red-500">
            <div className="bg-red-500 p-4 text-white text-2xl font-bold">
              Payment & Paper Details
            </div>
            <div className="p-6">
              {attendee.papers.length === 0 ? (
                <div className="text-gray-900 italic">No papers submitted</div>
              ) : (
                <div className="space-y-6">
                  {attendee.papers.map((paper: Paper, index: number) => {
                    const isPaid = paper.payment_status === true;
                    // Build an object with your required attributes:
                    const paperDetails = {
                      name: attendee.name,
                      email: attendee.email,
                      track: paper.track,
                      category: attendee.category,
                      visaSupport: attendee.visaSupport,
                      phone: attendee.phone,
                      photoUrl: attendee.photoUrl,
                      university: attendee.university,
                      presentationType: paper.presentationType,
                      proceedingsPublication: paper.proceedingsPublication,
                      fullPaperPublication: paper.fullPaperPublication,
                      tourInterested: attendee.tourInterested,
                      paperId: paper.paperId,
                      payment_status: isPaid ? "Paid" : "Unpaid",
                      transaction_id: paper.transaction_id || null,
                    };

                    return (
                      <div
                        key={paper.paperId}
                        className={`border rounded-lg overflow-hidden shadow-sm ${
                          isPaid
                            ? "border-green-300 bg-green-50"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div
                          className={`p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center ${
                            isPaid ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <h3 className="font-bold mb-2 sm:mb-0">
                            Paper #{index + 1}: {paper.paperId}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPaid
                                ? "bg-green-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            {isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </div>

                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="font-medium text-gray-900 mb-1">
                                Track:
                              </div>
                              <div className="text-gray-600">
                                {paperDetails.track}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 mb-1">
                                Presentation Type:
                              </div>
                              <div className="text-gray-600 capitalize">
                                {paperDetails.presentationType}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 mb-1">
                                Proceedings Publication:
                              </div>
                              <div className="text-gray-600">
                                {paperDetails.proceedingsPublication}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 mb-1">
                                Full Paper Publication:
                              </div>
                              <div className="text-gray-600">
                                {paperDetails.fullPaperPublication}
                              </div>
                            </div>
                            {paperDetails.transaction_id && (
                              <div>
                                <div className="font-medium text-gray-900 mb-1">
                                  Transaction ID:
                                </div>
                                <div className="font-mono text-gray-600">
                                  {paperDetails.transaction_id}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Download payslip for paid papers */}
                          {isPaid && (
                            <button
                              onClick={() =>
                                handleDownloadPayslip(paperDetails.paperId)
                              }
                              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-300 shadow-sm"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              Download Payslip
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Return Home Button */}
          <div className="text-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-300 shadow-sm"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to Home
            </button>
          </div>
        </div>
        {/* Carousel Section (hidden by default, remove "hidden" if needed) */}
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
      </div>

      <Footer />
    </main>
  );
}
