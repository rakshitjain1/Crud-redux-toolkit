import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { useDispatch, useSelector } from "react-redux"; // Hooks for interacting with Redux
import { Link } from "react-router-dom"; // Link component for navigation
import { deleteUser, showUser } from "../features/userDetailSlice"; // Action creators
import CustomModal from "./CustomModal"; // Custom modal component
import "./read.css"; // Importing CSS styles for this component

const Read = () => {
  const dispatch = useDispatch(); // Dispatch function to trigger actions
  const [id, setId] = useState(); // State to hold the ID of the user for deletion/viewing
  const [radioData, setRadioData] = useState(""); // State to hold the selected radio button value
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the modal
  const { users, loading, searchData } = useSelector((state) => state.app); // Extracting state from Redux store

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(showUser()); // Dispatch the action to fetch users
  }, [dispatch]);

  // Render loading message if data is still being fetched
  if (loading) {
    return <h2>Loading</h2>; // Loading indicator
  }

  return (
    <>
      <h2>All Data</h2> {/* Title at the top */}

      {/* Radio button filters for gender selection */}
      <div className="radio-group"> 
        <div>
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === ""} // Check if the "All" radio button is selected
            type="radio"
            onChange={() => setRadioData("")} // Reset gender filter when "All" is selected
          />
          <label className="form-check-label">All</label> {/* Label for "All" option */}
        </div>
        <div>
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === "Male"} // Check if "Male" radio button is selected
            value="Male"
            type="radio"
            onChange={(e) => setRadioData(e.target.value)} // Set gender filter to "Male"
          />
          <label className="form-check-label">Male</label> {/* Label for "Male" option */}
        </div>
        <div>
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            checked={radioData === "Female"} // Check if "Female" radio button is selected
            type="radio"
            onChange={(e) => setRadioData(e.target.value)} // Set gender filter to "Female"
          />
          <label className="form-check-label">Female</label> {/* Label for "Female" option */}
        </div>
      </div>

      <div className="container1"> {/* Main container for user data */}
        {showPopup && (
          <CustomModal
            id={id} // Pass the selected user ID to the modal
            showPopup={showPopup} // Control visibility of modal
            setShowPopup={setShowPopup} // Function to close the modal
          />
        )}
      
        {/* User Data Display */}
        <div className="user-list"> {/* Container for user data */}
          {users &&
            users
              .filter((ele) => {
                // Filter based on search input
                if (searchData.length === 0) {
                  return ele; // Return all users if no search input
                } else {
                  return ele.name.toLowerCase().includes(searchData.toLowerCase()); // Filter by name
                }
              })
              .filter((ele) => {
                // Filter based on selected gender
                if (radioData === "Male") {
                  return ele.gender === radioData; // Only show male users
                } else if (radioData === "Female") {
                  return ele.gender === radioData; // Only show female users
                } else return ele; // Show all users if "All" is selected
              })
              .map((ele) => (
                <div key={ele.id} className="card"> {/* Unique key for each card */}
                  <div className="card-body">
                    <h5 className="card-title">{ele.name}</h5> {/* User name */}
                    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6> {/* User email */}
                    <p className="card-text">{ele.gender}</p> {/* User gender */}
                    <button
                      className="card-link"
                      onClick={() => [setId(ele.id), setShowPopup(true)]} // Set selected ID and show modal
                    >
                      View
                    </button>
                    <Link to={`/edit/${ele.id}`} className="card-link"> {/* Link to edit user */}
                      Edit
                    </Link>
                    <Link
                      onClick={() => dispatch(deleteUser(ele.id))} // Dispatch delete action for the user
                      className="card-link"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Read; // Exporting the Read component
