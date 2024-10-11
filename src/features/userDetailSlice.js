import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
// Imports createSlice and createAsyncThunk from Redux Toolkit to define the slice and handle asynchronous actions.
 
// Create action for adding a new user (POST request)
export const createUser = createAsyncThunk(
  "createUser", // Action name
  async (data, { rejectWithValue }) => { 
    // Async function to handle the user creation logic, accepting "data" as input
    console.log("data", data);
    const response = await fetch(
      "https://6706d1bca0e04071d2285b14.mockapi.io/crud", // API endpoint to create a user
      {
        method: "POST", // HTTP method to create a resource
        headers: {
          "Content-Type": "application/json", // Specifies the content type as JSON
        },
        body: JSON.stringify(data), // Converts the data into JSON format
      }
    );

    try {
      const result = await response.json(); // Tries to parse the response
      return result; // Returns the parsed result
    } catch (error) {
      return rejectWithValue(error); // If an error occurs, return the error via rejectWithValue
    }
  }
);

// Read action for fetching users (GET request)
export const showUser = createAsyncThunk(
  "showUser", // Action name
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://6706d1bca0e04071d2285b14.mockapi.io/crud" // API endpoint to fetch users
    );

    try {
      const result = await response.json(); // Tries to parse the response
      console.log(result); // Logs the result to the console
      return result; // Returns the parsed result
    } catch (error) {
      return rejectWithValue(error); // If an error occurs, return the error via rejectWithValue
    }
  }
);

// Delete action for removing a user (DELETE request)
export const deleteUser = createAsyncThunk(
  "deleteUser", // Action name
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6706d1bca0e04071d2285b14.mockapi.io/crud/${id}`, // API endpoint to delete a user by ID
      { method: "DELETE" } // HTTP method to delete a resource
    );

    try {
      const result = await response.json(); // Tries to parse the response
      console.log(result); // Logs the result to the console
      return result; // Returns the parsed result
    } catch (error) {
      return rejectWithValue(error); // If an error occurs, return the error via rejectWithValue
    }
  }
);

// Update action for modifying a user (PUT request)
export const updateUser = createAsyncThunk(
  "updateUser", // Action name
  async (data, { rejectWithValue }) => { 
    // Async function to handle updating the user, accepting "data" as input
    console.log("updated data", data);
    const response = await fetch(
      `https://6706d1bca0e04071d2285b14.mockapi.io/crud/${data.id}`, // API endpoint to update a user by ID
      {
        method: "PUT", // HTTP method to update a resource
        headers: {
          "Content-Type": "application/json", // Specifies the content type as JSON
        },
        body: JSON.stringify(data), // Converts the data into JSON format
      }
    );

    try {
      const result = await response.json(); // Tries to parse the response
      return result; // Returns the parsed result
    } catch (error) {
      return rejectWithValue(error); // If an error occurs, return the error via rejectWithValue
    }
  }
);

// Creating a slice of the Redux store to manage user details
export const userDetail = createSlice({
  name: "userDetail", // Name of the slice
  initialState: { 
    // Initial state of the slice
    users: [], // Array to store user data
    loading: false, // Boolean to indicate loading state
    error: null, // Holds error messages, if any
    searchData: [], // Stores search results for users
  },

  reducers: {
    // Synchronous actions defined inside the slice
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload; // Updates the searchData state with the payload
    },
  },

  extraReducers: {
    // Handles the lifecycle of async actions (createUser, showUser, etc.)
    [createUser.pending]: (state) => {
      state.loading = true; // Sets loading state to true when createUser is pending
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false; // Resets loading state
      state.users.push(action.payload); // Adds the new user to the users array
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false; // Resets loading state
      state.error = action.payload.message; // Stores the error message
    },

    [showUser.pending]: (state) => {
      state.loading = true; // Sets loading state to true when showUser is pending
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false; // Resets loading state
      state.users = action.payload; // Updates users state with fetched data
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false; // Resets loading state
      state.error = action.payload; // Stores the error message
    },

    [deleteUser.pending]: (state) => {
      state.loading = true; // Sets loading state to true when deleteUser is pending
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false; // Resets loading state
      const { id } = action.payload; // Extracts the ID of the deleted user
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id); // Removes the deleted user from the users array
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false; // Resets loading state
      state.error = action.payload; // Stores the error message
    },

    [updateUser.pending]: (state) => {
      state.loading = true; // Sets loading state to true when updateUser is pending
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false; // Resets loading state
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      ); // Updates the user in the users array with the new data
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false; // Resets loading state
      state.error = action.payload.message; // Stores the error message
    },
  },
});

export default userDetail.reducer; // Exports the reducer function to be used in the Redux store

export const { searchUser } = userDetail.actions; // Exports the searchUser action for dispatching in the app


/*
createAsyncThunk: Used to create async actions for API calls (CRUD operations).
Reducers: Handle synchronous state changes (e.g., searchUser).
ExtraReducers: Handles the lifecycle of asynchronous actions (pending, fulfilled, rejected).
State Management: The slice manages user data, loading states, errors, and search results.
*/