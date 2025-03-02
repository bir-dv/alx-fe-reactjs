// AddRecipeForm component
import React, { useState } from 'react';
import  useRecipeStore  from '../store/useRecipeStore';

const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const addRecipe = useRecipeStore(state => state.addRecipe);

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe({ id:Date.now(), title, description }); //passing an object to the function with three property and id ensures each recipe gets a unique ID based on the exact moment it was created.
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Recipe</button>
      </form>
    )
    
}

export default AddRecipeForm;