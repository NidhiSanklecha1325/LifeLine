import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        window.location.replace("/");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
//register
export const userRegister = createAsyncThunk(
    "auth/register",
    async (
      {
        firstName,
        lastName,
        role,
        email,
        password,
        dateOfBirth 
        
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await API.post("/auth/register", {
            firstName,
            lastName,
            role,
            email,
            password,
            dateOfBirth
        });
        if (data?.success) {
          alert("User Registerd Successfully");
         window.location.replace("/");
         // toast.success("User Registerd Successfully");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );