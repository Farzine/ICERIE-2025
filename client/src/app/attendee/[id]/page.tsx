"use client"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import Footer from "@/components/Footer"
import Navbar from "@/components/NavBar"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Carousel from "@/js"

const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL

interface AttendeeInterface {
  _id: string
  name: string
  email: string
  university: string
  photoUrl: string
  regular_fee: 1
  early_bird_fee: number
  payment_status: boolean
  currency: string
  category: string
  val_id: string
}

const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z")
const regularDeadline = new Date("2025-04-10T23:59:59Z")

export default function SoloAttendee({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [attendee, setAttendee] = useState<AttendeeInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [billAmount, setBillAmount] = useState<number>(0)
  const currentDate = new Date()

  // Check if we're returning from payment
  const fromPayment = searchParams.get("from") === "payment"

  const fetchAttendeeData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/registration/${params.id}`)
      const attendeeData: AttendeeInterface = response.data

      // Determine the fee based on the current date
      if (currentDate <= earlyBirdDeadline) {
        setBillAmount(attendeeData.early_bird_fee)
      } else {
        setBillAmount(attendeeData.regular_fee)
      }

      setAttendee(attendeeData)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }, [params.id, currentDate])

  useEffect(() => {
    fetchAttendeeData()

    // If we're returning from payment, refresh the data every few seconds
    // to check if the payment status has been updated
    let intervalId: NodeJS.Timeout | null = null

    if (fromPayment) {
      intervalId = setInterval(() => {
        fetchAttendeeData()
      }, 3000) // Check every 3 seconds

      // Stop checking after 30 seconds
      setTimeout(() => {
        if (intervalId) clearInterval(intervalId)
      }, 30000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  const handlePayment = async () => {
    if (!attendee) return

    setPaymentLoading(true)
    try {
      // Directly initiate payment from here
      const response = await axios.get(`${BACKENDURL}/payment/pay/${params.id}`,
      )

      if (response.data.url) {
        // Redirect to the payment gateway URL
        window.location.href = response.data.url
      } else {
        setError("Failed to initiate payment")
        setPaymentLoading(false)
      }
    } catch (error: any) {
      setError(error.response?.data?.error || error.message)
      setPaymentLoading(false)
    }
  }

  if (loading)
    return (
      <div role="status" className="flex flex-col justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={45} />
      </div>
    )

  if (error) return <p>Error: {error}</p>
  if (!attendee) return <p>Attendee not found</p>

  const isDeadlinePassed = currentDate > regularDeadline
  const isEarlyBird = currentDate <= earlyBirdDeadline

  return (
    <main className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-grow flex-col justify-center items-center p-4">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          {fromPayment && attendee.payment_status && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full text-center">
              Your payment has been successfully processed!
            </div>
          )}

          <Image
            src={attendee.photoUrl || "/placeholder.svg"}
            alt={`${attendee.name}'s photo`}
            className="w-32 h-32 md:w-52 md:h-52 rounded-full mb-4"
            width={100}
            height={100}
          />
          <h2 className="md:text-4xl text-3xl font-bold">{attendee.name}</h2>
          <p className="md:text-2xl text-xl">Email: {attendee.email}</p>
          <p className="md:text-2xl text-xl">University: {attendee.university}</p>
          <p className="md:text-2xl text-xl">
            Payment Status:{" "}
            {attendee.payment_status ? (
              <span className="text-green-500 font-semibold">Paid</span>
            ) : (
              <span className="text-red-500 font-semibold">Not Paid</span>
            )}
          </p>
          {!attendee.payment_status && !isDeadlinePassed && (
            <div className="mt-6 flex flex-col items-center">
              {isEarlyBird && <p className="text-green-600 font-medium mb-2">Early bird price available!</p>}
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold disabled:bg-blue-400"
              >
                {paymentLoading ? (
                  <span className="flex items-center">
                    <LoaderCircle className="animate-spin mr-2" size={20} />
                    Processing...
                  </span>
                ) : (
                  `Pay ${billAmount} ${attendee.currency}`
                )}
              </button>
            </div>
          )}
          {isDeadlinePassed && !attendee.payment_status && (
            <div className="mt-6 flex flex-col items-center">
              <p className="text-yellow-600 font-medium">
                Registration is currently closed. Please contact the organizers for late registration.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Carousel Section */}
      <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <Footer />
    </main>
  )
}

