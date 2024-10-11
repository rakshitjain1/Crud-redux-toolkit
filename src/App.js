import "./App.css"; // Imports the global CSS file for styling the App component.
import Create from "./components/Create"; // Imports the Create component.
import Navbar from "./components/Navbar"; // Imports the Navbar component.
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Imports components from react-router-dom for routing.
import Read from "./components/Read"; // Imports the Read component.
import Update from "./components/Update"; // Imports the Update component.
import Navbar1 from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        {/* BrowserRouter is the top-level component that enables routing throughout the app. */}
        <Navbar/>
        {/* The Navbar component will always be displayed, as it is outside of Routes. */}
        <Routes>
          {/* Routes is the wrapper for all Route components, defining the paths for navigation. */}
          
          <Route exact path="/" element={<Create />} />
          {/* This route will display the Create component when the path is "/". */}
          
          <Route exact path="/read" element={<Read />} />
          {/* This route will display the Read component when the path is "/read". */}
          
          <Route exact path="/edit/:id" element={<Update />} />
          {/* This route will display the Update component when the path is "/edit" followed by a dynamic parameter (id). */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; // Exports the App component as the default export, so it can be used in other parts of the application.
