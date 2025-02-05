'use client'

import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import RecipeDetails from '@/components/ReciepeDetails'
import { Plus } from 'lucide-react'

const RecipeRecommendation = () => {
  const [currentVegetable, setCurrentVegetable] = useState("")
  const [vegetables, setVegetables] = useState([])
  const [disease, setDisease] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeDetails, setRecipeDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const addVegetable = () => {
    if (currentVegetable.trim()) {
      setVegetables([...vegetables, currentVegetable.trim()])
      setCurrentVegetable("")
    }
  }

  const removeVegetable = (index) => {
    setVegetables(vegetables.filter((_, i) => i !== index))
  }

  const generateSuggestions = async () => {
    if (vegetables.length === 0 || !disease.trim()) {
      setError("Please add at least one vegetable and specify a disease.")
      return
    }

    setIsLoading(true)
    setError("")
    setSuggestions([])
    setSelectedRecipe(null)
    setRecipeDetails(null)

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })

      const vegetableList = vegetables.join(', ')
      const prompt = `Given the following vegetables: ${vegetableList}, and the disease: ${disease}, suggest 5 to 10 Indian dishes that are suitable for this condition. Provide the name followed by a colon and then a brief description. Separate each dish with a semicolon.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      const suggestedDishes = text.split(';').map(dish => {
        const [name, description] = dish.split(':').map(s => s.trim())
        return { name, description }
      }).filter(dish => dish.name && dish.description)
      setSuggestions(suggestedDishes)
    } catch (err) {
      console.error(err)
      setError("An error occurred while generating suggestions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipeDetails = async (dishName) => {
    setIsLoading(true)
    setRecipeDetails(null)
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
      const prompt = `Provide a detailed recipe for the Indian dish ${dishName}, including ingredients and step-by-step instructions.`
      const result = await model.generateContent(prompt)
      const response = await result.response
      setRecipeDetails(response.text())
    } catch (err) {
      console.error(err)
      setError("An error occurred while fetching recipe details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">Personalized Recipe Recommendation</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add vegetables:</label>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={currentVegetable}
            onChange={(e) => setCurrentVegetable(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addVegetable()}
            placeholder="e.g., tomato"
            className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={addVegetable}
            className="px-4 py-2 bg-teal-600 text-white rounded-r-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {vegetables.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {vegetables.map((veg, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                {veg}
                <button onClick={() => removeVegetable(index)} className="ml-1 text-gray-500">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter a disease or health condition:</label>
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          placeholder="e.g., diabetes"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>
      <button
        onClick={generateSuggestions}
        disabled={isLoading || vegetables.length === 0 || !disease.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-md"
      >
        {isLoading ? 'Generating...' : 'Get Recipe Suggestions'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {suggestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Suggested Dishes:</h2>
          <ul className="grid grid-cols-1 gap-4">
            {suggestions.map((dish, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-md cursor-pointer" onClick={() => fetchRecipeDetails(dish.name)}>
                <h3 className="font-semibold">{dish.name}</h3>
                <p className="text-sm text-gray-600">{dish.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {recipeDetails && <RecipeDetails details={recipeDetails} />}
    </div>
  )
}

export default RecipeRecommendation
