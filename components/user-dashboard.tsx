"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Camera, MapPin, Calendar, Settings, Upload, Map, Heart, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const recentPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=200&width=200",
    location: "Yosemite, CA",
    likes: 24,
    date: "2024-01-15",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=200&width=200",
    location: "Big Sur, CA",
    likes: 18,
    date: "2024-01-12",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=200&width=200",
    location: "Olympic NP, WA",
    likes: 31,
    date: "2024-01-08",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=200&width=200",
    location: "Seattle, WA",
    likes: 42,
    date: "2024-01-05",
  },
]

const cameraStats = [
  { model: "Canon EOS R5", count: 45, color: "bg-blue-500" },
  { model: "Sony A7R IV", count: 32, color: "bg-green-500" },
  { model: "Nikon Z9", count: 18, color: "bg-purple-500" },
  { model: "iPhone 15 Pro", count: 12, color: "bg-pink-500" },
]

export function UserDashboard() {
  const [isPublic, setIsPublic] = useState(true)

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
            <Link href="/dashboard" className="text-indigo-400 font-medium">
              Dashboard
            </Link>
            <Link href="/map" className="text-gray-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/upload" className="text-gray-400 hover:text-white transition-colors">
              Upload
            </Link>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>@naturelover_alex</CardDescription>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <EyeOff className={`w-4 h-4 ${!isPublic ? "text-indigo-400" : "text-gray-500"}`} />
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="data-[state=checked]:bg-indigo-600"
                />
                <Eye className={`w-4 h-4 ${isPublic ? "text-indigo-400" : "text-gray-500"}`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Profile is {isPublic ? "Public" : "Private"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-400">247</div>
                  <div className="text-sm text-gray-400">Photos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">23</div>
                  <div className="text-sm text-gray-400">Cities</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Distance</span>
                  <span className="font-medium">2,847 km</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Northernmost</span>
                  <span className="font-medium">Seattle, WA</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Southernmost</span>
                  <span className="font-medium">San Diego, CA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>Recent Locations</span>
              </CardTitle>
              <CardDescription>Your latest photography spots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden mb-4">
                <Image src="/placeholder.svg?height=192&width=400" alt="Map preview" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
              </div>
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link href="/map">
                  <Map className="w-4 h-4 mr-2" />
                  View Full Map
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Camera Stats */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-indigo-500" />
                <span>Equipment Stats</span>
              </CardTitle>
              <CardDescription>Photos by camera model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cameraStats.map((camera, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${camera.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{camera.model}</span>
                        <span className="text-sm text-gray-400">{camera.count}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${camera.color}`}
                          style={{ width: `${(camera.count / 107) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Photos Timeline */}
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-xl mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <span>Recent Photos</span>
                </CardTitle>
                <CardDescription>Your latest photography adventures</CardDescription>
              </div>
              <Button asChild variant="outline" className="border-gray-700 bg-transparent">
                <Link href="/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPhotos.map((photo) => (
                <div key={photo.id} className="group cursor-pointer">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={`Photo from ${photo.location}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{photo.date}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-pink-400" />
                        <span className="text-xs text-gray-400">{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
