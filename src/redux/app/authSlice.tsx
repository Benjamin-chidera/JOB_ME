import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/signup",
        formData
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const contactUs = createAsyncThunk(
  "user/contactUs",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/contact",
        form
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

type registerTypes = {
  user: null;
  status: string;
  error: null | unknown;
  contact: null | unknown;
};

const initialState: registerTypes = {
  user: null,
  status: "idle",
  error: null,
  contact: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.user = null;
      })

      // contact us

      .addCase(contactUs.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.contact = null;
      })
      .addCase(contactUs.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = null;
        state.contact = payload;
      })
      .addCase(contactUs.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;
        state.contact = null;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
