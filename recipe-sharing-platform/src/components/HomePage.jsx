import { useEffect, useState } from "react";
import receptData from "../data.json"
import { Link } from "react-router-dom";

function HomePage (){
    const [recipes, setRecipes] = useState([]);

    useEffect(()=> {
        setRecipes(receptData)
    }, []);

    return (
        <div className="container px-4 py-8 mx-auto ">
            <h1 className="font-bold text-center text-4xl text-gray-800 mb-8 ">Delicious Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recipes.map((recipe) => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                        <div key={recipe.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 overflow-hidden">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900">{recipe.title}</h2>
                                <p className="text-gray-600 mt-2 text-sm">{recipe.summary}</p>
                            </div>

                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
};

export default HomePage;