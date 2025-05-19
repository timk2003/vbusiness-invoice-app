"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/invoice-generator")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to InvoiceHub</h1>
        <p className="mb-4">Redirecting to Invoice Generator...</p>
      </div>
    </div>
  )
}
