import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginRequest } from "../../../models/api/auth/loginRequest";
import { RegisterRequest } from "../../../models/api/auth/registerRequest";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (request: RegisterRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/register", request, config);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/login", request, config);
      localStorage.setItem("userToken", data.token);

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
