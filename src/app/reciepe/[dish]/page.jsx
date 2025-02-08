const RecipeDetails = ({ recipe, details }) => {
    if (!recipe || !details) return null;
  
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{recipe}</h2>
        <div className="prose max-w-none">
          {details.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    )
  }
  
  export default RecipeDetails
  