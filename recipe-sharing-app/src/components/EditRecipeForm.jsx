import React, { useState } from 'react';
import  useRecipeStore  from './recipeStore';

const EditRecipeForm = ({ recipe, onClose }) => {
    const [title, setTitle] = useState(recipe.title);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div>
                <label>Ingredients:</label>
                <textarea 
                    value={ingredients} 
                    onChange={(e) => setIngredients(e.target.value)} 
                />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default EditRecipeForm;