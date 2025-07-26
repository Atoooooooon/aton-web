"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Camera,
  MapPin,
  Search,
  Play,
  Pause,
  Settings,
  ChevronLeft,
  ChevronRight,
  Aperture,
  Zap,
  Eye,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const photoMarkers = [
  {
    id: 1,
    lat: 37.7749,
    lng: -122.4194,
    src: "/placeholder.svg?height=300&width=400",
    title: "Golden Gate at Sunset",
    location: "San Francisco, CA",
    date: "2024-01-15",
    camera: "Canon EOS R5",
    settings: { aperture: "f/8", shutter: "1/125s", iso: "100" },
    likes: 42,
  },
  {
    id: 2,
    lat: 37.8651,
    lng: -119.5383,
    src: "/placeholder.svg?height=300&width=400",
    title: "Yosemite Valley Morning",
    location: "Yosemite, CA",
    date: "2024-01-12",
    camera: "Sony A7R IV",
    settings: { aperture: "f/11", shutter: "1/60s", iso: "200" },
    likes: 67,
  },
  {
    id: 3,
    lat: 47.6062,
    lng: -122.3321,
    src: "/placeholder.svg?height=300&width=400",
    title: "Seattle Skyline",
    location: "Seattle, WA",
    date: "2024-01-08",
    camera: "Nikon Z9",
    settings: { aperture: "f/5.6", shutter: "1/250s", iso: "400" },
    likes: 28,
  },
]

export function ExploreMap() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photoMarkers)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRange, setTimeRange] = useState([2020, 2024])
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Collapsible Sidebar */}
      <div
        className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r border-gray-800 bg-gray-900/95 backdrop-blur-xl`}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="w-6 h-6 text-indigo-500" />
              <span className="text-xl font-bold">PhotoMap</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Locations</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="space-y-3">
            <Label>Time Range</Label>
            <div className="px-2">
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={2024}
                min={2020}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{timeRange[0]}</span>
                <span>{timeRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Camera Filter */}
          <div className="space-y-2">
            <Label>Camera Model</Label>
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="All cameras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cameras</SelectItem>
                <SelectItem value="canon">Canon EOS R5</SelectItem>
                <SelectItem value="sony">Sony A7R IV</SelectItem>
                <SelectItem value="nikon">Nikon Z9</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Travel Path Animation */}
          <Card className="border-gray-800 bg-gray-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Travel Path Animation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="border-gray-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Speed</span>
                  <span>2x</span>
                </div>
                <Slider defaultValue={[2]} max={5} min={0.5} step={0.5} />
              </div>
            </CardContent>
          </Card>

          {/* Photo Stats */}
          <Card className="border-gray-800 bg-gray-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Current View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-indigo-400">247</div>
                  <div className="text-xs text-gray-400">Photos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-pink-400">23</div>
                  <div className="text-xs text-gray-400">Locations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* Map Container */}
        <div className="absolute inset-0 bg-gray-800">
          <Image src="/placeholder.svg?height=800&width=1200" alt="Interactive map" fill className="object-cover" />

          {/* Photo Markers */}
          {photoMarkers.map((marker) => (
            <button
              key={marker.id}
              onClick={() => setSelectedPhoto(marker)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${((marker.lng + 180) / 360) * 100}%`,
                top: `${((90 - marker.lat) / 180) * 100}%`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20" />
              </div>
            </button>
          ))}

          {/* Travel Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <path
              d="M 200,400 Q 400,200 600,300 T 800,250"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className={isPlaying ? "animate-pulse" : ""}
            />
          </svg>
        </div>

        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 border-gray-700 bg-gray-900/80 backdrop-blur-xl"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          <nav className="flex items-center space-x-4 bg-gray-900/80 backdrop-blur-xl rounded-lg px-4 py-2 border border-gray-800">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/map" className="text-indigo-400 font-medium">
              Explore
            </Link>
            <Link href="/upload" className="text-gray-400 hover:text-white transition-colors">
              Upload
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="bg-gray-900/80 backdrop-blur-xl border border-gray-800">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full border-gray-800 bg-gray-900/95 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{selectedPhoto.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedPhoto.location}</span>
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedPhoto(null)}>
                  ×
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Camera Settings</h4>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Aperture className="w-3 h-3" />
                        <span>{selectedPhoto.settings.aperture}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-3 h-3" />
                        <span>{selectedPhoto.settings.shutter}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>ISO {selectedPhoto.settings.iso}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Details</h4>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div>Camera: {selectedPhoto.camera}</div>
                      <div>Date: {selectedPhoto.date}</div>
                      <div className="flex items-center space-x-1">
                        <span>Likes: {selectedPhoto.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
