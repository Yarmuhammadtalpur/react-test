import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DogReducer from "./DogState";
import BreedReducer from "./BreedState";

const store = configureStore({
  reducer: {
    Dog: DogReducer,
    Breed: BreedReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
