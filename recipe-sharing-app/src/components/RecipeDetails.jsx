import React from 'react';
import { useParams } from 'react-router-dom';
import  useRecipeStore  from './recipeStore';

const RecipeDetails = () => {
    const { id } = useParams();
    const recipe = useRecipeStore(state => state.recipes.find(r => r.id === id));

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.ingredients}</p>
        </div>
    );
};

export default RecipeDetails;