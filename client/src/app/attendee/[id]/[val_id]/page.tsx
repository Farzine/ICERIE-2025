"use client";
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

function Page({ params }: { params: { id: string, val_id: string } }) {
    // redirect to '/attendee/[id]'
    const router = useRouter()
    router.push(`/attendee/${params.id}`)
  return (
    <div className="flex min-h-screen justify-center items-center">
        <Loader2 size={45} className="animate-spin"/>
    </div>
  )
}

export default Page