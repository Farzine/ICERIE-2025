"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Footer from "@/components/Footer"
import Navbar from "@/components/NavBar"
import { CheckCircle, XCircle, LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL

interface PaymentStatus {
  name: string
  email: string
  payment_status: string
}

export default function PaymentSuccess({ params }: { params: { params: string[] } }) {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract attendee ID from params
  const attendeeId = params.params[0]
  // Transaction ID might be in params[1] if provided
  const transactionId = params.params[1] || null

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Wait a moment to allow the IPN to process
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const response = await axios.get(`${BACKENDURL}/payments/status/${attendeeId}`)
        setPaymentStatus(response.data)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }

    checkPaymentStatus()
  }, [attendeeId])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-grow flex-col justify-center items-center p-4">
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <LoaderCircle className="animate-spin text-blue-600 mb-4" size={60} />
            <h2 className="text-2xl font-bold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-grow flex-col justify-center items-center p-4">
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <XCircle className="text-red-500 mb-4" size={60} />
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href={`/attendee/${attendeeId}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Profile
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const isPaid = paymentStatus?.payment_status === "Paid"

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-grow flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          {isPaid ? (
            <>
              <CheckCircle className="text-green-500 mb-4" size={60} />
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-2">Thank you, {paymentStatus?.name}!</p>
              <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
              {transactionId && <p className="text-gray-600 mb-6">Transaction ID: {transactionId}</p>}
            </>
          ) : (
            <>
              <XCircle className="text-red-500 mb-4" size={60} />
              <h2 className="text-2xl font-bold mb-2">Payment Not Completed</h2>
              <p className="text-gray-600 mb-6">
                We haven&#39;t received your payment yet. Please try again or contact support if you believe this is an
                error.
              </p>
              {transactionId && <p className="text-gray-600 mb-6">Transaction ID: {transactionId}</p>}
            </>
          )}
          <Link
            href={`/attendee/${attendeeId}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Profile
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

