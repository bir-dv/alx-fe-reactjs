import React, { useState } from 'react';
import  useRecipeStore  from './recipeStore';

const EditRecipeForm = ({ recipe, onClose }) => {
    const [title, setTitle] = useState(recipe.title);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateRecipe({ ...recipe, title, ingredients });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(event) => setTitle(event.target.value)} 
                />
            </div>
            <div>
                <label>Ingredients:</label>
                <textarea 
                    value={ingredients} 
                    onChange={(event) => setIngredients(event.target.value)} 
                />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default EditRecipeForm;