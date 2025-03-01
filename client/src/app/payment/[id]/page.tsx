"use client";
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import axios from 'axios';

const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

interface PaymentDetails {
  _id: string;
  name: string;
  email: string;
  university: string;
  regular_fee: number;
  early_bird_fee: number;
  currency: string;
}

const earlyBirdDeadline = new Date("2024-12-10T23:59:59Z");

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const currentDate = new Date();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/registration/${params.id}`);
        const data = response.data;
        
        // Set the amount based on the current date
        const paymentAmount = currentDate <= earlyBirdDeadline 
          ? data.early_bird_fee 
          : data.regular_fee;
        
        setAmount(paymentAmount);
        setPaymentDetails(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [params.id]);

  const handlePayment = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/payment/pay/${params.id}`); // Updated route
      const { url } = response.data;
      window.location.href = url;
    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div role="status" className="flex flex-col justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={45} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Payment details not found</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex-grow container mx-auto px-4 py-16 mt-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Payment Details</h1>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Registration Fee</span>
                <span className="font-medium">
                  {amount} {paymentDetails.currency}
                </span>
              </div>
              {currentDate <= earlyBirdDeadline && (
                <p className="text-green-600 text-sm mt-2">Early bird price applied!</p>
              )}
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-4">Attendee Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span>{paymentDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span>{paymentDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">University</span>
                  <span>{paymentDetails.university}</span>
                </div>
              </div>
            </div>

            <button 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
