import { configureStore } from "@reduxjs/toolkit"; // Imports the configureStore function from Redux Toolkit, which simplifies store setup.
import userDetail from "../features/userDetailSlice"; // Imports the reducer (userDetail) from the userDetailSlice file.

export const store = configureStore({
  reducer: {
    app: userDetail, // Registers the userDetail reducer under the "app" key in the store. This means the "app" part of the state will be managed by the userDetail reducer.
  },
});

/*
configureStore: This is a Redux Toolkit function that simplifies creating a Redux store. It automatically sets up good default configurations like middleware and DevTools integration.

userDetail: This is the reducer from the userDetailSlice, which manages the part of the state responsible for user data (like user creation, fetching, updating, deleting).

Store Configuration: The configureStore function takes an object with a reducer field. In this case, the state slice app is managed by the userDetail reducer. This means all actions related to users (CRUD operations) will affect the app part of the state.
*/
