import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                    <h2>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;