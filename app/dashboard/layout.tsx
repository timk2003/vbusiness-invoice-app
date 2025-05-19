import type React from "react"
import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { ThemeProvider } from "@/components/theme-provider"
import AuthCheck from "@/components/auth-check"

export const metadata: Metadata = {
  title: "Dashboard - InvoiceHub",
  description: "Manage your invoices and PDF documents",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthCheck>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthCheck>
    </ThemeProvider>
  )
}
