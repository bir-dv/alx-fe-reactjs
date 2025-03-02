import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
    const recipes = useRecipeStore(state => state.filteredRecipes) || [];
    const filterRecipes = useRecipeStore(state => state.filterRecipes);
    const searchTerm = useRecipeStore(state => state.searchTerm);

    useEffect(() => {
        filterRecipes();
    }, [searchTerm, filterRecipes]);

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;