import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import RecipeDetail from "./components/RecipeDetail"
import AddRecipeForm from "./components/AddRecipeForm"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
