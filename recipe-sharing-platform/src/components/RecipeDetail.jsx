import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import recipeData from "../data.json";

function RecipeDetail () {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams(); // this to get recipe id from the url

    useEffect(() =>{
        const getRecipe = recipeData.find((recipe) => recipe.id === parseInt(id));
        setRecipe(getRecipe);
    }, [id]);

    if (!recipe) {
        return <p className="text-center text-red-500 mt-10">Recipe not found!</p>;
    }

    return(
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mt-4 rounded-md" />

        {/* Ingredients Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        {/* Instructions Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700 mt-2">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="mt-1">{step}</li>
          ))}
        </ol>
      </div>
    </div>
    )
}

export default RecipeDetail;