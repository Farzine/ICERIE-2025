// app/attendee/[id]/papers/page.tsx
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import our components
import Carousel from "@/js";
import AddPaperForm from "./components/AddPaperForm";
import PaperList from "./components/PaperList";

const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

// Interfaces
interface PaperInterface {
  _id?: string;
  paperId: string;
  track: string;
  proceedingsPublication: string;
  fullPaperPublication: string;
  presentationType: string;
  payment_status: boolean;
  val_id?: string;
  presentationMood?: string;
}

interface AttendeeInterface {
  _id: string;
  name: string;
  email: string;
  university: string;
  photoUrl: string;
  phone: number;
  category: string;
  payment_status: boolean;
  visaSupport?: string;
  tourInterested?: boolean;
  early_bird_fee?: number;
  regular_fee?: number;
  currency?: string;
  papers: PaperInterface[];
}

export default function AttendeePapersPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const attendeeId = params.id;

  const [attendee, setAttendee] = useState<AttendeeInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Fetch attendee data
  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/registration/${attendeeId}`);
        setAttendee(res.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAttendee();
  }, [attendeeId]);

  // Add a paper
  const handleAddPaper = async (paperData: {
    paperId: string;
    track: string;
    proceedingsPublication: string;
    fullPaperPublication: string;
    presentationType: string;
    visaSupport?: string;
    tourInterested?: boolean;
    presentationMood?: string;
  }) => {
    if (!attendee) return;

    setFormSubmitting(true);
    try {
      const res = await axios.post(
        `${BACKENDURL}/papers/${attendeeId}/paper`,
        paperData
      );
      const updatedAttendee = res.data.attendee;
      setAttendee(updatedAttendee);
      setShowAddForm(false);
    } catch (err: any) {
      alert("Failed to add paper: " + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Pay for a single paper
  const handlePayForPaper = async (p: PaperInterface) => {
    if (!attendee) return;
    try {
      const paperKey = p.paperId;
      const res = await axios.post(
        `${BACKENDURL}/payments/${attendeeId}/paper/${paperKey}`
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
  const handleDeletePaper = async (p: PaperInterface) => {
    if (!attendee) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete paper "${p.paperId}"?`
    );
    if (!confirmDelete) return;

    try {
      const paperKey = p.paperId;
      const res = await axios.delete(
        `${BACKENDURL}/papers/${attendeeId}/paper/${paperKey}`
      );
      if (res.data.attendee) {
        setAttendee(res.data.attendee);
      }
    } catch (err: any) {
      alert("Failed to delete paper: " + err.message);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-grow flex-col pt-20 px-4 sm:px-6 container mx-auto max-w-7xl">
          {/* Skeleton for page header */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse"></div>
            <div className="h-1 w-72 bg-gray-200 mt-2 animate-pulse"></div>
          </div>

          {/* Skeleton for attendee card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gray-200 px-6 py-4 animate-pulse">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
              <div className="flex-1 w-full">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-5 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton for papers section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-200 px-6 py-4 flex justify-between items-center animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="p-6">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 mb-4 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-5 bg-gray-200 rounded w-3/4"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
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

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-grow flex-col justify-center items-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Return to Home
            </button>
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

  // Attendee not found
  if (!attendee) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-grow flex-col justify-center items-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <p className="text-red-500 text-xl font-semibold mb-4">
              Attendee not found!
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Return to Home
            </button>
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

  const isFirstPaper = attendee.papers.length === 0;

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex-grow container mx-auto px-4 sm:px-6 py-20 max-w-7xl mt-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Your Papers
          </h1>
          <div className="h-1 w-72 bg-red-500 mt-2"></div>
        </div>

        {/* Attendee Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-red-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Attendee Information
            </h2>
          </div>
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={attendee.photoUrl || "/placeholder.svg"}
                  alt={attendee.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {attendee.name}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                <p className="flex gap-x-3">
                  <span className="font-semibold">Email:</span> {attendee.email}
                </p>
                <p className="flex gap-x-3">
                  <span className="font-semibold">University:</span>{" "}
                  {attendee.university}
                </p>
                <p className="flex gap-x-3">
                  <span className="font-semibold">Category:</span>{" "}
                  {attendee.category}
                </p>
                <p className="flex gap-x-3">
                  <span className="font-medium">Phone:</span> {attendee.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Papers Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-red-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Your Papers</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                showAddForm
                  ? "bg-white text-red-500 hover:bg-gray-100"
                  : "bg-white text-red-500 hover:bg-gray-100"
              }`}
            >
              {showAddForm ? (
                <>
                  <X size={18} />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  <span>Add Paper</span>
                </>
              )}
            </button>
          </div>
          <div className="p-6">
            {attendee.papers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {attendee.category != "Local Delegates (Participant)" && (
                  <p>You haven&apos;t added any papers yet.</p>
                )}
                {!showAddForm &&
                  (attendee.category === "Local Delegates (Participant)" ? (
                    <p className="text-black-500 font-bold text-3xl">
                      As a{" "}
                      <span className="text-red-500">
                        Local Delegate (Participant)
                      </span>
                      , you must submit a paper <span className="text-red-500"> (Click on Add Paper)</span> with the Paper ID set to{" "}
                      <span className="text-red-500">&apos;Registration&apos;</span>.
                      Other fields can be filled with random values. If you are
                      interested in the tour, please select &quot;Yes&quot; in the Tour
                      Interest field. Finally, you must complete the <span className="text-red-500">payment</span>  for
                      the paper submission.
                    </p>
                  ) : (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors inline-flex items-center gap-2"
                    >
                      <PlusCircle size={18} />
                      <span>Add Your First Paper</span>
                    </button>
                  ))}
              </div>
            ) : (
              <PaperList
                papers={attendee.papers}
                onPayPaper={handlePayForPaper}
                onDeletePaper={handleDeletePaper}
                category={attendee.category}
              />
            )}
          </div>
        </div>

        {/* Add Paper Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-fadeIn">
            <div className="bg-red-500 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                {isFirstPaper ? "Add Your First Paper" : "Add a New Paper"}
              </h2>
            </div>
            <div className="p-6">
              <AddPaperForm
                isFirstPaper={isFirstPaper}
                formSubmitting={formSubmitting}
                onAddPaper={handleAddPaper}
              />
            </div>
          </div>
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
