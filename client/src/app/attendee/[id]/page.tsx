"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Carousel from "@/js";
import { PlusCircle, X } from "lucide-react";

// ------------------ Interfaces ------------------
interface Paper {
  paperId: string;
  track: string;
  proceedingsPublication: string;
  fullPaperPublication: string;
  presentationType: string;
  payment_status: boolean;
  transaction_id?: string;
  val_id?: string;
}

interface Attendee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  university?: string;
  photoUrl?: string;
  visaSupport?: string;
  tourInterested?: boolean;
  papers: Paper[];
}

// ------------------ Main Component ------------------
export default function ProfessionalProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  // For tabs
  const [selectedTab, setSelectedTab] = useState<"profile" | "papers">(
    "profile"
  );

  const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

  // ------------------ Fetch Attendee Data ------------------
  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        setLoading(true);
        setError(null);

        // GET /registration/:id
        const endpoint = `${BACKENDURL}/registration/${params.id}`;
        console.log("Fetching attendee data from:", endpoint);

        const res = await axios.get(endpoint);
        setAttendee(res.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch attendee data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendee();
  }, [params.id, BACKENDURL]);

  // Pay for a single paper
  const handlePayForPaper = async (paperId: string) => {
    if (!attendee) return;
    try {
      const paperKey = paperId;
      const res = await axios.post(
        `${BACKENDURL}/payments/${params.id}/paper/${paperKey}`
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Payment URL not found");
      }
    } catch (err: any) {
      alert("Failed to initiate payment: " + err.message);
    }
  };

  // Delete an unpaid paper
  const handleDeletePaper = async (paperId: string) => {
    if (!attendee) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete paper "${paperId}"?`
    );
    if (!confirmDelete) return;

    try {
      const paperKey = paperId;
      const res = await axios.delete(
        `${BACKENDURL}/papers/${params.id}/paper/${paperKey}`
      );
      if (res.data.attendee) {
        setAttendee(res.data.attendee);
      }
    } catch (err: any) {
      alert("Failed to delete paper: " + err.message);
    }
  };

  // ------------------ Download Payslip ------------------
  const handleDownloadPayslip = (paperId?: string) => {
    const payslipUrl = `/attendee/payslip/${params.id}?paperId=${paperId}`;

    router.push(payslipUrl); // Navigate within the app
  };

  // ------------------ Rendering Logic ------------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        {/* --- Skeleton / Loading State --- */}
        <div className="flex-grow pt-28 md:pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile Tab Navigation Skeleton */}
            <div className="flex justify-center mb-8">
              <div className="h-10 bg-gray-200 rounded-full w-64 animate-pulse"></div>
            </div>

            {/* Attendee Information Card Skeleton */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border-t-4 border">
              <div className="bg-gray-200 p-4 h-14 animate-pulse"></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                  <div className="w-36 h-36 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex">
                      <div className="h-5 bg-gray-200 rounded w-1/4 mr-4 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Return Home Button Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full border-t-4 border-red-500">
            <div className="flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-500"
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
            <h2 className="text-2xl font-bold text-center mb-4">Error</h2>
            <p className="text-gray-700 text-center mb-8">{error}</p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  if (!attendee) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full border-t-4 border-red-500">
            <h2 className="text-2xl font-bold text-center mb-4">
              No Data Found
            </h2>
            <p className="text-gray-700 text-center mb-8">
              Unable to retrieve your information. Please try again later.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 hidden">
          <Carousel />
        </div>
        <Footer />
      </div>
    );
  }

  // ------------------ TABS Content ------------------
  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-red-500 transition-all duration-300">
      <div className="bg-red-500 p-5 text-white flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Profile Information</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition "
          onClick={() => router.push(`/attendee/${params.id}/papers`)}
        >
          <PlusCircle size={18} className="mr-2" />

          {attendee.category === "Local Delegates (Participant)" ? (
            <p>Pay Registration Fee</p>
          ) : (
            <span className="text-red-500">Add Paper</span>
          )}
        </button>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {attendee.photoUrl ? (
            <img
              src={attendee.photoUrl}
              alt={`${attendee.name}'s Photo`}
              className="w-36 h-36 object-cover rounded-full border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {attendee.name}
            </h1>
            <div className="text-xl text-gray-600 space-y-1">
              {attendee.category && (
                <p className="font-semibold">{attendee.category}</p>
              )}
              {attendee.university && <p>{attendee.university}</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mt-6">
          <div className="flex items-baseline">
            <span className="font-semibold text-gray-800 w-28">Email:</span>
            <span className="text-gray-600">{attendee.email}</span>
          </div>
          {attendee.phone && (
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-800 w-28">Phone:</span>
              <span className="text-gray-600">{attendee.phone}</span>
            </div>
          )}
          {attendee.visaSupport && (
            <div className="">
              <span className="font-semibold text-gray-800 w-28">
                Visa-Support:
              </span>
              <span className="text-gray-600 ml-6">{attendee.visaSupport}</span>
            </div>
          )}
          <div className="">
            <span className="font-semibold text-gray-800 w-28">
              Tour Interest:
            </span>
            <span className="text-gray-600 ml-6">
              {attendee.tourInterested ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPapersTab = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-red-500 transition-all duration-300">
      <div className="bg-red-500 p-5 flex justify-between items-center text-white">
        <h2 className="text-3xl font-semibold">Papers & Payment Details</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition "
          onClick={() => router.push(`/attendee/${params.id}/papers`)}
        >
          <PlusCircle size={18} className="mr-2" />
          {attendee.category === "Local Delegates (Participant)" ? (
            <p>Pay Registration Fee</p>
          ) : (
            <span className="text-red-500">Add Paper</span>
          )}
        </button>
      </div>
      <div className="p-6 md:p-8">
        {attendee.papers.length === 0 ? (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 text-lg">No papers submitted</p>
          </div>
        ) : (
          <div className="space-y-6">
            {attendee.papers.map((paper, index) => {
              const isPaid = paper.payment_status === true;
              return (
                <div
                  key={paper.paperId}
                  className={`border rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${
                    isPaid
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center ${
                      isPaid ? "bg-green-100" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 mb-2 sm:mb-0">
                      Paper #{index + 1}:{" "}
                      <span className="font-mono">{paper.paperId}</span>
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${
                        isPaid
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  <div className="p-5 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <div className="font-medium text-gray-800 mb-1">
                          Track:
                        </div>
                        <div className="text-gray-600">{paper.track}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">
                          Presentation Type:
                        </div>
                        <div className="text-gray-600 capitalize">
                          {paper.presentationType}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">
                          Proceedings Publication:
                        </div>
                        <div className="text-gray-600">
                          {paper.proceedingsPublication}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">
                          Full Paper Publication:
                        </div>
                        <div className="text-gray-600">
                          {paper.fullPaperPublication}
                        </div>
                      </div>
                      {paper.val_id && (
                        <div className="md:col-span-2">
                          <div className="font-medium text-gray-800 mb-1">
                            Validation ID:
                          </div>
                          <div className="font-mono text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                            {paper.val_id}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Payment Amount Information */}
                    {!isPaid && (
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Payment Information:
                        </h4>
                        <div className="space-y-2">
                          {(() => {
                            const earlyBirdDeadline = new Date(
                              "2025-03-25T23:59:59Z"
                            );
                            const regularDeadline = new Date(
                              "2025-04-10T23:59:59Z"
                            );
                            const currentDate = new Date();

                            // Get fee structure based on attendee category
                            const getFeeStructure = () => {
                              switch (attendee.category) {
                                case "Local Delegates (Author)":
                                  return {
                                    early: 6000,
                                    regular: 7000,
                                    currency: "BDT",
                                  };
                                case "Local Delegates (Participant)":
                                  return {
                                    early: 5000,
                                    regular: 6000,
                                    currency: "BDT",
                                  };
                                case "Local Students (Author/ Co-author)":
                                  return {
                                    early: 4000,
                                    regular: 5000,
                                    currency: "BDT",
                                  };
                                case "Foreign Delegates":
                                  return {
                                    early: 43750,
                                    regular: 56250,
                                    currency: "BDT",
                                    usd_early: 350,
                                    usd_regular: 450,
                                  };
                                case "Foreign Students":
                                  return {
                                    early: 25000,
                                    regular: 31250,
                                    currency: "BDT",
                                    usd_early: 200,
                                    usd_regular: 250,
                                  };
                                default:
                                  return {
                                    early: 5000,
                                    regular: 6000,
                                    currency: "BDT",
                                  };
                              }
                            };

                            const fees = getFeeStructure();
                            const isForeign =
                              attendee.category?.includes("Foreign");

                            // Determine which fee applies
                            let amount, phase;
                            if (currentDate <= earlyBirdDeadline) {
                              amount = fees.early;
                              phase = "Early Bird";
                            } else if (currentDate <= regularDeadline) {
                              amount = fees.regular;
                              phase = "Regular";
                            } else {
                              phase = "Late";
                              amount = fees.regular; // Use regular fee but mark as late
                            }

                            return (
                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">
                                    Registration Phase:
                                  </span>
                                  <span
                                    className={`font-medium ${
                                      phase === "Late"
                                        ? "text-red-600"
                                        : "text-green-600"
                                    }`}
                                  >
                                    {phase} Registration
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-gray-600">
                                    Payable Amount:
                                  </span>
                                  <span className="font-bold text-gray-800">
                                    {amount.toLocaleString()} {fees.currency}
                                    {isForeign && (
                                      <span className="ml-2 text-lg font-semibold text-gray-500">
                                        (
                                        {phase === "Early Bird"
                                          ? fees.usd_early
                                          : fees.usd_regular}{" "}
                                        USD)
                                      </span>
                                    )}
                                  </span>
                                </div>
                                {phase === "Late" && (
                                  <p className="text-sm text-red-600 mt-1">
                                    Note: Late registration fees apply.
                                  </p>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Download payslip for paid papers */}
                    {isPaid && (
                      <button
                        onClick={() => handleDownloadPayslip(paper.paperId)}
                        className="inline-flex items-center px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
                        Payment Receipt
                      </button>
                    )}
                    {!isPaid && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handlePayForPaper(paper.paperId)}
                          className="inline-flex items-center px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Pay Now
                        </button>
                        <button
                          onClick={() => handleDeletePaper(paper.paperId)}
                          className="inline-flex items-center px-5 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-300 transition-colors shadow-sm"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // ------------------ Final JSX ------------------
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow pt-32 md:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ------------------ Page Title ------------------ */}
          <h1 className="text-3xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Attendee Dashboard
          </h1>

          {/* ------------------ Tab Buttons ------------------ */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full shadow-sm p-1 inline-flex">
              <button
                onClick={() => setSelectedTab("profile")}
                className={`py-2 px-6 text-xl font-bold rounded-full transition-all duration-300 ${
                  selectedTab === "profile"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setSelectedTab("papers")}
                className={`py-2 px-6 text-xl font-bold rounded-full transition-all duration-300 ${
                  selectedTab === "papers"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                Papers
              </button>
            </div>
          </div>

          {/* ------------------ Tab Content ------------------ */}
          <div className="transition-opacity duration-300">
            {selectedTab === "profile" && renderProfileTab()}
            {selectedTab === "papers" && renderPapersTab()}
          </div>

          {/* Return Home Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
      </div>
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>

      <Footer />
    </main>
  );
}
