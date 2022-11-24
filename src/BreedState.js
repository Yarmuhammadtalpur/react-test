import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBreeds = createAsyncThunk("breed/getBreed", async (param) => {
  const response = await fetch(`https://dog.ceo/api/breed/${param}images`);
  const formattedResponse = await response.json();
  return formattedResponse.message;
});

export const BreedSlice = createSlice({
  name: "DogBreed",
  initialState: {
    BreedNames: [],
    isLoading: false,
  },
  extraReducers: {
    [getBreeds.pending]: (state) => {
      state.isLoading = true;
    },
    [getBreeds.fulfilled]: (state, action) => {
      state.BreedNames = action.payload;
      state.isLoading = false;
    },
    [getBreeds.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default BreedSlice.reducer;
