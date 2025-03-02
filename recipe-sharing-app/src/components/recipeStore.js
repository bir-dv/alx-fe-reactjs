import {create} from 'zustand';

const useRecipeStore = create((set)=> ({
    reciptes: [],
    addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
    setRecipes: (recipes) => set({ recipes })

}));

export default useRecipeStore;