"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Upload,
  MapPin,
  Settings,
  ImageIcon,
  CheckCircle,
  AlertCircle,
  X,
  Bold,
  Italic,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UploadedFile {
  id: string
  file: File
  preview: string
  exifData?: {
    camera: string
    lens: string
    aperture: string
    shutter: string
    iso: string
    focalLength: string
    gps?: { lat: number; lng: number }
  }
  location?: { lat: number; lng: number; name: string }
  title: string
  description: string
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
}

export function UploadWizard() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }

  const processFiles = (fileList: File[]) => {
    fileList.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9)
        const preview = URL.createObjectURL(file)

        const newFile: UploadedFile = {
          id,
          file,
          preview,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: "",
          status: "uploading",
          progress: 0,
        }

        setFiles((prev) => [...prev, newFile])

        // Simulate EXIF processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                    ...f,
                    status: "processing",
                    progress: 50,
                    exifData: {
                      camera: "Canon EOS R5",
                      lens: "RF 24-70mm f/2.8L IS USM",
                      aperture: "f/8.0",
                      shutter: "1/125s",
                      iso: "200",
                      focalLength: "35mm",
                      gps: Math.random() > 0.5 ? { lat: 37.7749, lng: -122.4194 } : undefined,
                    },
                  }
                : f,
            ),
          )
        }, 1000)

        // Simulate completion
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                    ...f,
                    status: "complete",
                    progress: 100,
                    location: f.exifData?.gps ? { ...f.exifData.gps, name: "San Francisco, CA" } : undefined,
                  }
                : f,
            ),
          )
        }, 2500)
      }
    })
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    if (selectedFile?.id === id) {
      setSelectedFile(null)
    }
  }

  const updateFileLocation = (id: string, location: { lat: number; lng: number; name: string }) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, location } : f)))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-bold">PhotoMap</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/map" className="text-gray-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/upload" className="text-indigo-400 font-medium">
              Upload
            </Link>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  <span>Upload Photos</span>
                </CardTitle>
                <CardDescription>Drag and drop your photos or click to select files</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-indigo-500 bg-indigo-500/10" : "border-gray-700 hover:border-gray-600"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your photos here</p>
                  <p className="text-gray-400 mb-4">or</p>
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Select Files
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB per image</p>
                </div>
              </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Uploaded Files ({files.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedFile?.id === file.id
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={file.preview || "/placeholder.svg"}
                            alt={file.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{file.title}</p>
                            <div className="flex items-center space-x-2">
                              {file.status === "complete" && <CheckCircle className="w-4 h-4 text-green-500" />}
                              {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFile(file.id)
                                }}
                                className="w-6 h-6"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {file.status !== "complete" && (
                            <div className="mt-2">
                              <Progress value={file.progress} className="h-1" />
                              <p className="text-xs text-gray-400 mt-1">
                                {file.status === "uploading" && "Uploading..."}
                                {file.status === "processing" && "Processing EXIF data..."}
                              </p>
                            </div>
                          )}

                          {file.status === "complete" && (
                            <div className="flex items-center space-x-2 mt-1">
                              {file.location ? (
                                <Badge variant="secondary" className="text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {file.location.name}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                                  No GPS data
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Edit Panel */}
          <div className="space-y-6">
            {selectedFile ? (
              <>
                {/* Photo Preview */}
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-video rounded-t-lg overflow-hidden">
                      <Image
                        src={selectedFile.preview || "/placeholder.svg"}
                        alt={selectedFile.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{selectedFile.title}</h3>
                      {selectedFile.exifData && (
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                          <div>Camera: {selectedFile.exifData.camera}</div>
                          <div>Lens: {selectedFile.exifData.lens}</div>
                          <div>Aperture: {selectedFile.exifData.aperture}</div>
                          <div>Shutter: {selectedFile.exifData.shutter}</div>
                          <div>ISO: {selectedFile.exifData.iso}</div>
                          <div>Focal Length: {selectedFile.exifData.focalLength}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Location Picker */}
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-indigo-500" />
                      <span>Location</span>
                    </CardTitle>
                    <CardDescription>
                      {selectedFile.location
                        ? "GPS coordinates found in EXIF data"
                        : "Click on the map to add location"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=192&width=400"
                        alt="Location picker map"
                        fill
                        className="object-cover"
                      />
                      {selectedFile.location && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {!selectedFile.location && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() =>
                            updateFileLocation(selectedFile.id, {
                              lat: 37.7749,
                              lng: -122.4194,
                              name: "San Francisco, CA",
                            })
                          }
                          className="border-gray-700"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Add Location
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Metadata Editor */}
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Photo Details</CardTitle>
                    <CardDescription>Add title and description for your photo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={selectedFile.title}
                        onChange={(e) =>
                          setFiles((prev) =>
                            prev.map((f) => (f.id === selectedFile.id ? { ...f, title: e.target.value } : f)),
                          )
                        }
                        className="bg-gray-800 border-gray-700"
                        placeholder="Enter photo title..."
                      />
                      <p className="text-xs text-gray-400">{selectedFile.title.length}/100 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <div className="border border-gray-700 rounded-md">
                        <div className="flex items-center space-x-1 p-2 border-b border-gray-700">
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <Bold className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <Italic className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <LinkIcon className="w-3 h-3" />
                          </Button>
                        </div>
                        <Textarea
                          id="description"
                          value={selectedFile.description}
                          onChange={(e) =>
                            setFiles((prev) =>
                              prev.map((f) => (f.id === selectedFile.id ? { ...f, description: e.target.value } : f)),
                            )
                          }
                          className="border-0 bg-transparent resize-none focus-visible:ring-0"
                          placeholder="Describe your photo..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                    <p>Select a photo to edit details</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upload Button */}
            {files.length > 0 && (
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload {files.length} Photo{files.length !== 1 ? "s" : ""}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
