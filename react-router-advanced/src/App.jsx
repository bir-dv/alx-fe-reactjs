import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import BlogPost from "./components/BlogPost";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <h1>Welcome to My App</h1>

          <nav>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/blog/1">Blog: React Basics</Link></li>
              <li><Link to="/blog/2">Blog: Understanding Hooks</Link></li>
              <li><Link to="/profile/johndoe">User: John Doe</Link></li>
              <li><Link to="/profile/janedoe">User: Jane Doe</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>

          <Routes>
            {/* 🔒 Protected Profile Route */}
            <Route 
              path="/profile/*" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Public Routes */}
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
