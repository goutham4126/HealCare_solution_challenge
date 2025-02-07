"use client";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaSearch, FaUpload } from "react-icons/fa";

const Disease = () => {
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");

  // Convert Image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64 data
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setResultText("");
      setError("");
    }
  };

  // Process Image with Gemini AI
  const run = async () => {
    if (!image) {
      setError("Please upload an image before proceeding.");
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError("API Key is missing. Check your environment variables.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResultText("");

    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert image to Base64
      const base64String = await convertToBase64(image);

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64String,
            mimeType: image.type || "image/png", // Default to PNG if undefined
          },
        },
      ]);

      const generatedText = await result.response.text();
      setResultText(generatedText);
    } catch (err) {
      console.error(err);
      setError("An error occurred while processing the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-10vh)]">
      {/* Header */}
      <div className="flex text-white justify-between p-3 bg-teal-500">
        <h1 className="font-semibold">HealCare Image Analyzer</h1>
        <IoMdRefresh className="h-6 w-6 cursor-pointer" onClick={() => setResultText("")} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col p-4 bg-white">
        {/* Image Upload */}
        <label className="mb-2 flex items-center justify-center p-3 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer text-teal-500 hover:bg-teal-100">
          <FaUpload className="mr-2" /> Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        {image && <p className="text-sm text-gray-600 text-center mt-1">{image.name}</p>}

        {/* Prompt Input */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className="mt-3 p-2 border rounded w-full"
        />

        {/* Search Button */}
        <button
          onClick={run}
          disabled={isLoading}
          className="mt-2 text-white bg-teal-500 p-2 rounded-md flex items-center justify-center hover:bg-teal-600"
        >
          {isLoading ? "Processing..." : <><FaSearch className="mr-2" /> Search</>}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {/* Result Text */}
        {resultText && (
          <div className="mt-4 p-4 border rounded bg-neutral-200">
            <p>{resultText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disease;
