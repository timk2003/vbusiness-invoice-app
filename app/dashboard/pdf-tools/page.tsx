"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Download, FileIcon as FilePdf, Check, Trash } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function PdfToolsPage() {
  const [activeTab, setActiveTab] = useState("cleaner")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
        setIsProcessed(false)
      } else {
        alert("Please upload a PDF file")
      }
    }
  }

  const simulateProcessing = async () => {
    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsProcessing(false)
    setIsProcessed(true)
  }

  const handleCleanPdf = async () => {
    await simulateProcessing()
  }

  const handleRemoveMetadata = async () => {
    await simulateProcessing()
  }

  const handleDownload = () => {
    // In a real app, this would download the processed PDF
    alert("In a real app, this would download your processed PDF file.")
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">PDF Tools</h1>
        <p className="text-muted-foreground">Clean your PDFs and remove metadata for enhanced privacy and security.</p>
      </div>

      <Tabs defaultValue="cleaner" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cleaner">PDF Cleaner</TabsTrigger>
          <TabsTrigger value="metadata">Metadata Remover</TabsTrigger>
        </TabsList>

        <TabsContent value="cleaner" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>PDF Cleaner</CardTitle>
              <CardDescription>
                Convert your PDF to image and back to PDF to flatten all content and remove hidden layers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-5 text-center hover:bg-muted/50">
                  <div className="flex flex-col items-center gap-2">
                    <FileUp className="h-8 w-8 text-muted-foreground" />
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Drag & drop your PDF here</p>
                      <p className="text-xs text-muted-foreground">Only PDF files are supported</p>
                    </div>
                    <Input
                      id="pdf-upload-cleaner"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("pdf-upload-cleaner")?.click()}
                    >
                      Select PDF
                    </Button>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="flex w-full items-center gap-2 rounded-lg border p-3">
                    <FilePdf className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 truncate text-sm">{uploadedFile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setUploadedFile(null)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                )}

                {isProcessing && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 w-full" />
                  </div>
                )}

                {isProcessed && (
                  <Alert>
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      Your PDF has been cleaned successfully. All hidden layers have been removed.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button onClick={handleCleanPdf} disabled={!uploadedFile || isProcessing} className="w-full md:w-auto">
                {isProcessing ? "Processing..." : "Clean PDF"}
              </Button>
              {isProcessed && (
                <Button onClick={handleDownload} className="w-full md:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download Cleaned PDF
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata Remover</CardTitle>
              <CardDescription>Strip all metadata from your PDF files for enhanced privacy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-5 text-center hover:bg-muted/50">
                  <div className="flex flex-col items-center gap-2">
                    <FileUp className="h-8 w-8 text-muted-foreground" />
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Drag & drop your PDF here</p>
                      <p className="text-xs text-muted-foreground">Only PDF files are supported</p>
                    </div>
                    <Input
                      id="pdf-upload-metadata"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("pdf-upload-metadata")?.click()}
                    >
                      Select PDF
                    </Button>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="flex w-full items-center gap-2 rounded-lg border p-3">
                    <FilePdf className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 truncate text-sm">{uploadedFile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setUploadedFile(null)}>
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                )}

                {isProcessing && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Removing metadata...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 w-full" />
                  </div>
                )}

                {isProcessed && (
                  <Alert>
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>All metadata has been removed from your PDF file.</AlertDescription>
                  </Alert>
                )}

                {isProcessed && !isProcessing && (
                  <div className="w-full rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Removed Metadata:</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Author:</span>
                        <span>John Doe</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>2023-05-15 14:32:45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modified:</span>
                        <span>2023-05-18 09:15:22</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Application:</span>
                        <span>Adobe Acrobat Pro DC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PDF Producer:</span>
                        <span>Adobe PDF Library 15.0</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                onClick={handleRemoveMetadata}
                disabled={!uploadedFile || isProcessing}
                className="w-full md:w-auto"
              >
                {isProcessing ? "Processing..." : "Remove Metadata"}
              </Button>
              {isProcessed && (
                <Button onClick={handleDownload} className="w-full md:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download Clean PDF
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
