import React from "react"; // Import React library to create components
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import "./CustomModal.css"; // Import CSS for styling the modal

// CustomModal functional component definition
const CustomModal = ({ id, setShowPopup }) => {
  // Access the global state to get the list of all users
  const allUsers = useSelector((state) => state.app.users);
  
  // Find the single user object from the allUsers array using the provided id
  const singleUser = allUsers.find((user) => user.id === id);

  // Render the modal
  return (
    <div className="modalBackground"> {/* Background overlay for the modal */}
      <div className="modalContainer"> {/* Container for modal content */}
        {/* Button to close the modal and trigger the setShowPopup function */}
        <button onClick={() => setShowPopup(false)}>Close</button>
        
        {/* Display the user's name */}
        <h2>{singleUser?.name}</h2>
        
        {/* Display the user's email */}
        <h3>{singleUser?.email}</h3>
        
        {/* Display the user's age */}
        <h4>{`Age: ${singleUser?.age}`}</h4>
        
        {/* Display the user's gender */}
        <p>{`Gender: ${singleUser?.gender}`}</p>
      </div>
    </div>
  );
};

// Export the CustomModal component for use in other parts of the application
export default CustomModal;
