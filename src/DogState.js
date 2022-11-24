import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDogs = createAsyncThunk("dog/getDogs", async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const formattedResponse = await response.json();
  return formattedResponse;
});

export const DogSlice = createSlice({
  name: "dog",
  initialState: {
    dogName: [],
    isLoading: false,
  },
  extraReducers: {
    [getDogs.pending]: (state) => {
      state.isLoading = true;
    },
    [getDogs.fulfilled]: (state, action) => {
      state.dogName = action.payload;
      state.isLoading = false;
    },
    [getDogs.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default DogSlice.reducer;
