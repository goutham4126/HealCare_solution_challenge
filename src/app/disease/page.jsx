'use client'
import { useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { FaSearch, FaUpload } from 'react-icons/fa'

const Disease = () => {
  const [resultText, setResultText] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [prompt, setPrompt] = useState("")

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setResultText("")
    }
  }

  const run = async () => {
    if (!image) {
      setError("Please upload an image before proceeding.")
      return
    }

    setIsLoading(true)
    setError("")
    setResultText("")

    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai")
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const arrayBuffer = await image.arrayBuffer()
      const base64String = Buffer.from(arrayBuffer).toString('base64')

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64String,
            mimeType: image.type
          }
        }
      ])
      const generatedText = await result.response.text()
      setResultText(generatedText)
    } catch (err) {
      console.error(err)
      setError("An error occurred while processing the image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-10vh)]">
      <div onClick={() => setResultText("")} className="flex text-white justify-between p-3 bg-teal-500">
        <h1 className="font-semibold">HealCare Image Analyzer</h1>
        <IoMdRefresh className="h-6 w-6 cursor-pointer" />
      </div>
      <div className="flex-grow flex flex-col p-4 bg-white">
        <label className="mb-2 flex items-center justify-center p-3 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer text-teal-500 hover:bg-teal-100">
          <FaUpload className="mr-2" /> Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        {image && <p className="text-sm text-gray-600 text-center mt-1">{image.name}</p>}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className="mt-3 p-2 border rounded w-full"
        />
        <button
          onClick={run}
          disabled={isLoading}
          className="mt-2 text-white bg-teal-500 p-2 rounded-md flex items-center justify-center hover:bg-teal-600"
        >
          {isLoading ? "Processing..." : <><FaSearch className="mr-2" /> Search</>}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        {resultText && (
          <div className="mt-4 p-4 border rounded bg-neutral-200">
            <p>{resultText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Disease
