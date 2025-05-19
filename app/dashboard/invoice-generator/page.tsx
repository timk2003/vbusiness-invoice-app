"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function InvoiceGeneratorPage() {
  const [activeTab, setActiveTab] = useState("template")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    price: "",
    orderNumber: "",
    invoiceDate: "",
    serialNumber: "",
    description: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerateInvoice = async () => {
    setIsGenerating(true)
    // Simulate API call to generate invoice
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setIsGenerated(true)
  }

  const handleDownload = () => {
    // In a real app, this would download the generated PDF
    alert("In a real app, this would download your generated invoice as a PDF.")
  }

  const templates = [
    { id: "template1", name: "Basic Invoice", type: "PDF" },
    { id: "template2", name: "Professional Invoice", type: "PDF" },
    { id: "template3", name: "Detailed Invoice", type: "DOCX" },
    { id: "template4", name: "Simple Receipt", type: "PDF" },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Invoice Generator</h1>
        <p className="text-muted-foreground">
          Create professional invoices by selecting a template and filling in your details.
        </p>
      </div>

      <Tabs defaultValue="template" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">Select Template</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedTemplate}>
            Fill Details
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!isGenerated}>
            Preview & Download
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose from Templates</CardTitle>
              <CardDescription>Select from our pre-designed invoice templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative cursor-pointer rounded-lg border p-4 hover:border-primary ${
                      selectedTemplate === template.id ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template.id)
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <FileText className="h-8 w-8" />
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.type}</p>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("details")} disabled={!selectedTemplate} className="w-full">
                Continue with Selected Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>
                Fill in the details for your invoice
                {selectedTemplate && (
                  <span className="ml-1">
                    using {templates.find((t) => t.id === selectedTemplate)?.name || "selected template"}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    placeholder="Enter customer name"
                    value={formData.customerName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    placeholder="Enter order number"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    name="invoiceDate"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    name="serialNumber"
                    placeholder="Enter serial number"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("template")}>
                Back
              </Button>
              <Button onClick={handleGenerateInvoice} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Invoice"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Preview</CardTitle>
              <CardDescription>Preview and download your generated invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{formData.companyName || "Your Company"}</h3>
                      <p className="text-sm text-muted-foreground">123 Business St, City, Country</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold">INVOICE</h3>
                      <p className="text-sm text-muted-foreground">#{formData.serialNumber || "INV-001"}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium">Bill To:</h4>
                      <p>{formData.customerName || "Customer Name"}</p>
                      <p className="text-sm text-muted-foreground">Customer Address</p>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Invoice Date:</div>
                        <div>{formData.invoiceDate || "2023-05-19"}</div>
                        <div className="font-medium">Order Number:</div>
                        <div>{formData.orderNumber || "ORD-001"}</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left">Description</th>
                          <th className="py-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">{formData.description || "Service Description"}</td>
                          <td className="py-2 text-right">${formData.price || "0.00"}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t">
                          <th className="py-2 text-left">Total</th>
                          <th className="py-2 text-right">${formData.price || "0.00"}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Thank you for your business!</p>
                    <p>Payment is due within 30 days.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Back to Edit
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {isGenerated && activeTab === "details" && (
        <Alert className="mt-4">
          <Check className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your invoice has been generated successfully. You can now preview and download it.
          </AlertDescription>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab("preview")}>
            Preview Invoice
          </Button>
        </Alert>
      )}
    </div>
  )
}
