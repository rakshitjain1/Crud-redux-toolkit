import React from "react"; // Imports the main React library for creating components and hooks.
import ReactDOM from "react-dom/client"; // Imports ReactDOM to interact with the DOM for rendering components.
import "./index.css"; // Imports the global CSS file for styling the entire app.
import App from "./App"; // Imports the main App component where the application's structure and logic live.
import { store } from "./app/store"; // Imports the Redux store, which holds the state of the app.
import { Provider } from "react-redux"; // Imports the Provider component from react-redux, which makes the Redux store available to the rest of the app.

const root = ReactDOM.createRoot(document.getElementById("root")); 
// Finds the root element in the HTML (with id "root") where the React app will be mounted.

root.render(
  <React.StrictMode>
    {/* StrictMode is a helper component that checks for potential issues in the app, like deprecated methods. */}
    <Provider store={store}>
      {/* The Provider wraps the entire app, giving all components access to the Redux store. */}
      <App />
      {/* App is the main component where the UI and app logic are defined. */}
    </Provider>
  </React.StrictMode>
);

/*
React.StrictMode: Ensures the app follows best practices and warns about common issues during development. 
Provider: Makes the Redux store available to all components inside <App />.
store: The central place for managing the state of the application using Redux.
ReactDOM.createRoot(): Establishes where the app will be rendered in the DOM, replacing the existing content inside the "root" element.
*/