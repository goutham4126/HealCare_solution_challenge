"use client"
import { useState, useEffect } from "react"
import { IoMdRefresh } from "react-icons/io"
import { FaSearch } from "react-icons/fa"
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined")
}
const genAI = new GoogleGenerativeAI(apiKey)

export default function Chatbot() {
  const [userInput, setUserInput] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUserInput = async () => {
    if (!userInput.trim()) return

    setChatHistory((prevChat) => [...prevChat, { role: "user", content: userInput }])
    setUserInput("")
    setIsLoading(true)

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
      const prompt = `I am suffering from ${userInput}. Give me food and medicines to overcome that disease in 10 line paragraph.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      setChatHistory((prevChat) => [...prevChat, { role: "assistant", content: text }])
    } catch (err) {
      console.error(err)
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: "assistant", content: "I'm sorry, but I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [])

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-10vh)]">
      <div onClick={() => setChatHistory([])} className="flex text-white justify-between p-3 bg-teal-500">
        <h1 className="font-semibold">HealCare</h1>
        <h1>
          <IoMdRefresh className="h-6 w-6" />
        </h1>
      </div>
      <div className="flex-grow flex flex-col">
        <div id="chat-container" className="flex-grow overflow-auto p-2 bg-white">
          {chatHistory.map((message, index) => (
            <div key={index} className="text-gray-500 mb-2">
              <div>
                {message.role === "user" ? (
                  <img
                    src="https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png"
                    alt="#"
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <img
                    src="https://miro.medium.com/v2/resize:fit:962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg"
                    alt="#"
                    className="h-7 w-7 rounded-full border border-teal-500 p-1"
                  />
                )}
              </div>
              <div
                className={`${message.role === "user" ? "bg-slate-200" : "bg-neutral-200"} rounded-md text-sm font-medium p-2 my-1.5`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          )}
        </div>
        <div className="flex justify-center p-2 bg-teal-500">
          <input
            type="text"
            className="p-2 w-full outline-none rounded-s-md text-sm font-medium"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUserInput()}
            placeholder="Enter your disease here"
          />
          <button onClick={handleUserInput} disabled={isLoading} className="text-teal-500 bg-white p-2 rounded-e-md">
            <FaSearch className="h-6 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

