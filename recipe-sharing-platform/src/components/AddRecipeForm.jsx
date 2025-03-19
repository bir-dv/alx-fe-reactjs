import { useState } from "react";

function AddRecipeForm ({onAddRecipe}){
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!title.trim() || !ingredients.trim() || !steps.trim()) {
          setErrors("All fields are required.");
          return;
        }

        // Convert inputs into arrays
        const ingredientList = ingredients.split("\n").map(item => item.trim()).filter(Boolean);
        const stepsList = steps.split("\n").map((item) => item.trim()).filter(Boolean);


        if (ingredientList.length < 2) {
          setErrors("Please enter at least two ingredients.");
          return;
        }

        setErrors(""); // Clear error if validation passes

        // Create a new recipe object
        const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredientList,
        steps: stepsList,
      };

      onAddRecipe(newRecipe);

        // Clear the form
        setTitle("");
        setIngredients("");
        setSteps("");

    }

    return (
        <div className="container mx-auto max-w-lg bg-white rounded-lg shadow-lg p-6 mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-600">Add a New Recept</h2>
            {errors && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <div>
                    <label className="block font-semibold text-gray-700 ">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />                
                </div>
                <div>
                    <label className="block font-semibold text-gray-700 ">Ingredients ( one per line ):</label>
                    <textarea
                     value={ingredients}
                     onChange={(e) => setIngredients(e.target.value)}
                     className="w-full p-4 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                     rows="4"
                     required
                    ></textarea>
               
                </div>
                <div>
                    <label className="block font-semibold text-gray-700 ">Instructions ( one per line ):</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="w-full p-4 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        required
                    ></textarea>
               
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-4 rounded-lg hover:bg-blue-600 transition duration-200">Add recipe</button>
            </form>
        </div>
    );
}

export default AddRecipeForm;