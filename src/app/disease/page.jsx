"use client"

import { useState } from "react"
import { IoMdRefresh } from "react-icons/io"
import { FaSearch, FaUpload } from "react-icons/fa"
import Image from "next/image"

export default function DiseaseAnalyzer() {
  const [resultText, setResultText] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [prompt, setPrompt] = useState("")

  const convertToBase64 = (file)=> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result?.toString().split(",")[1] || "")
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setResultText("")
      setError("")
    }
  }

  const run = async () => {
    if (!prompt && !image) {
      setError("Please enter symptoms or upload an image before proceeding.")
      return
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError("API Key is missing. Check your environment variables.")
      return
    }

    setIsLoading(true)
    setError("")
    setResultText("")

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai")
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const content = [prompt]

      if (image) {
        const base64String = await convertToBase64(image)
        content.push({
          inlineData: {
            data: base64String,
            mimeType: image.type || "image/png",
          },
        })
      }

      const result = await model.generateContent(content)
      const generatedText = await result.response.text()
      setResultText(generatedText)
    } catch (err) {
      console.error(err)
      setError("An error occurred while processing. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen mx-auto bg-white shadow-xl">
      <div className="flex text-white justify-between p-4 bg-teal-500">
        <h1 className="text-xl font-semibold">HealCare Analyzer</h1>
        <button
          onClick={() => {
            setResultText("")
            setPrompt("")
            setImage(null)
            setError("")
          }}
          className="text-white hover:text-teal-200"
        >
          <IoMdRefresh className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow flex flex-col p-6 space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter symptoms or describe the image..."
          className="w-full p-3 border rounded-lg resize-none h-32"
        />

        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaUpload className="w-8 h-8 mb-3 text-teal-500" />
              <p className="mb-2 text-sm text-teal-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-teal-500">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {image && (
          <div className="flex justify-center">
            <Image
              src={URL.createObjectURL(image) || "/placeholder.svg"}
              alt="Uploaded image"
              width={200}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <button
          onClick={run}
          disabled={isLoading}
          className="w-full text-white bg-teal-500 p-3 rounded-lg flex items-center justify-center hover:bg-teal-600 disabled:bg-teal-300"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <FaSearch className="mr-2" /> Analyze
            </>
          )}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {resultText && (
          <div className="mt-4 p-4 border rounded-lg bg-neutral-100">
            <h2 className="font-semibold mb-2">Analysis Result:</h2>
            <p className="whitespace-pre-wrap">{resultText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

