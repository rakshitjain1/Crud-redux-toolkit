import React, { useEffect, useState } from "react"; // Import necessary React hooks
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks for state management
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for routing
import { updateUser } from "../features/userDetailSlice"; // Import the action to update a user
import "./update.css"; // Import the CSS styles for this component

const Update = () => {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const dispatch = useDispatch(); // Initialize the dispatch function from Redux
  const navigate = useNavigate(); // Initialize the navigate function for routing

  // Local state to hold the updated user data
  const [updateData, setUpdateData] = useState({});

  // Get the list of users and loading state from the Redux store
  const { users, loading } = useSelector((state) => state.app);

  // Effect to fetch user data based on the ID from the URL
  useEffect(() => {
    if (id) {
      // Find the user in the list of users based on the ID
      const singleUser = users.find((ele) => ele.id === id);
      // Update local state with the found user or set it to an empty object
      setUpdateData(singleUser || {});
    }
  }, [id, users]); // Dependency array: re-run this effect when `id` or `users` changes

  // Function to handle changes in form input
  const newData = (e) => {
    // Update local state with the new input values
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(updateUser(updateData)); // Dispatch the updateUser action with the updated data
    navigate("/read"); // Navigate to the "read" page after updating
  };

  return (
    <div className="update-container"> {/* Main container for the update form */}
      <h2 className="update-title">Edit User Data</h2> {/* Title of the form */}
      <form className="update-form" onSubmit={handleUpdate}> {/* Form element */}
        <div className="form-group"> {/* Container for name input */}
          <label className="form-label">Name</label> {/* Label for name input */}
          <input
            type="text"
            name="name"
            className="form-control" // Apply CSS styles for input
            value={updateData.name || ""} // Set input value to the user's name or empty
            onChange={newData} // Handle input changes
            required // Make this field required
          />
        </div>
        <div className="form-group"> {/* Container for email input */}
          <label className="form-label">Email</label> {/* Label for email input */}
          <input
            type="email"
            name="email"
            className="form-control" // Apply CSS styles for input
            value={updateData.email || ""} // Set input value to the user's email or empty
            onChange={newData} // Handle input changes
            required // Make this field required
          />
        </div>
        <div className="form-group"> {/* Container for age input */}
          <label className="form-label">Age</label> {/* Label for age input */}
          <input
            type="number"
            name="age"
            className="form-control" // Apply CSS styles for input
            value={updateData.age || ""} // Set input value to the user's age or empty
            onChange={newData} // Handle input changes
            required // Make this field required
          />
        </div>
        <div className="form-group"> {/* Container for gender radio buttons */}
          <label className="form-label">Gender</label> {/* Label for gender selection */}
          <div className="radio-group"> {/* Container for radio buttons */}
            <div className="radio-option"> {/* Container for male option */}
              <input
                className="form-check-input"
                name="gender"
                value="Male"
                type="radio"
                checked={updateData.gender === "Male"} // Check if the current gender is Male
                onChange={newData} // Handle radio button changes
              />
              <label className="form-check-label">Male</label> {/* Label for male option */}
            </div>
            <div className="radio-option"> {/* Container for female option */}
              <input
                className="form-check-input"
                name="gender"
                value="Female"
                type="radio"
                checked={updateData.gender === "Female"} // Check if the current gender is Female
                onChange={newData} // Handle radio button changes
              />
              <label className="form-check-label">Female</label> {/* Label for female option */}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button"> {/* Submit button */}
          Update
        </button>
      </form>
    </div>
  );
};

export default Update; // Export the Update component
