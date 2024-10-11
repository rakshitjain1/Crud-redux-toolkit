import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";
import './create.css';  // Import the CSS file
const Create = () => {
  const [users, setUsers] = useState({}); // Initializes local state to store user input data.
  const navigate = useNavigate(); // Initializes useNavigate to navigate between routes.
  const dispatch = useDispatch(); // Initializes useDispatch to dispatch Redux actions.

  // Handles form input changes and updates the `users` state with the input values.
  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    console.log("users...", users); // Logs the user data.
    dispatch(createUser(users)); // Dispatches the createUser action with the user's data.
    navigate("/read"); // Navigates to the "/read" page after form submission.
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">Create User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={getUserData}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={getUserData}
              required
            />
          </div>

          {/* Age Input */}
          <div className="input-group">
            <label>Age</label>
            <input
              type="text"
              name="age"
              placeholder="Enter your age"
              onChange={getUserData}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={getUserData}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={getUserData}
              />
              Female
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};



export default Create;
