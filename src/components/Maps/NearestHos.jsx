"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function LocationFinder() {
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState("nearest-hospital")
  const [destination, setDestination] = useState("")
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ latitude, longitude })
          setLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLoading(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by your browser.")
      setLoading(false)
    }
  }, [])

  const getMapSrc = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/"
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY

    switch (selectedOption) {
      case "nearest-hospital":
        return `${baseUrl}directions?key=${key}&origin=${userLocation.latitude},${userLocation.longitude}&destination=hospital near me`
      case "distance-to-hospital":
        return `${baseUrl}directions?key=${key}&origin=${userLocation.latitude},${userLocation.longitude}&destination=${encodeURIComponent(destination)}`
      case "distance-between":
        return `${baseUrl}directions?key=${key}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
      default:
        return ""
    }
  }

  return (
    <div className="my-3 space-y-4">
      <Select onValueChange={setSelectedOption} defaultValue={selectedOption}>
        <SelectTrigger className="w-full md:w-1/3">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nearest-hospital">Nearest Hospital</SelectItem>
          <SelectItem value="distance-to-hospital">Distance to Hospital</SelectItem>
          <SelectItem value="distance-between">Distance Between Locations</SelectItem>
        </SelectContent>
      </Select>

      {selectedOption === "distance-to-hospital" && (
        <Input
          type="text"
          placeholder="Enter hospital name or address"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      )}

      {selectedOption === "distance-between" && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter origin location"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Enter destination location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center h-[80vh] items-center">Loading...</div>
      ) : userLocation || (selectedOption === "distance-between" && origin && destination) ? (
        <iframe
          width="100%"
          height="100%"
          className="h-[80vh]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapSrc()}
        ></iframe>
      ) : (
        <div className="flex justify-center h-[80vh] items-center">
          <p>Unable to fetch location. Please check your location settings and try again.</p>
        </div>
      )}
    </div>
  )
}

