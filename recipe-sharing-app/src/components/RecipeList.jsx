//desplay the list of recipes
import React from 'react'
// import  useRecipeStore  from '../store/useRecipeStore';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes) || [];
  return (
    <div>
        {
            recipes.map(recipe => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))
        }
    </div> 
    );
};

export default RecipeList