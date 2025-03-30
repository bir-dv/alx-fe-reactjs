import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;