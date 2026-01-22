import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotServices,
  loginServices,
  registerServices,
  resetServices,
} from "../services/authServices";

/* =======================
   THUNKS
======================= */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerServices(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Register failed" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginServices(credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotServices({ email });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "OTP send failed" }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resetServices(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Reset failed" });
    }
  }
);

/* =======================
   SLICE
======================= */
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.role = action.payload.user.role || "user";
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", state.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // FORGOT
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // RESET
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
