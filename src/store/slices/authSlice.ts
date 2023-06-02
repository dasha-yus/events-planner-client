import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { URL, setHeaders } from "./api";
import {
  getPlainValue,
  removeValue,
  setPlainValue,
} from "../../utils/localStorage";

export interface AuthState {
  _id: string;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const initialState = {
  token: getPlainValue("token"),
  firstname: "",
  lastname: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: AuthState, { rejectWithValue }) => {
    try {
      const signUpData = await axios.post(`${URL}/auth/signup`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });

      setPlainValue("token", signUpData.data.token);
      setPlainValue("user", btoa(JSON.stringify(signUpData.data.user)));
      return signUpData.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values: AuthState, { rejectWithValue }) => {
    try {
      const signInData = await axios.post(`${URL}/auth/login`, {
        email: values.email,
        password: values.password,
      });
      setPlainValue("token", signInData.data.token);
      setPlainValue("user", btoa(JSON.stringify(signInData.data.user)));
      return signInData.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${URL}/user/${id}`, setHeaders());

      setPlainValue("token", token.data);

      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user: AuthState = jwtDecode(token);
        return {
          ...state,
          token,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      removeValue("token");

      return {
        ...state,
        token: "",
        firstname: "",
        lastname: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: AuthState = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: AuthState = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user: AuthState = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          _id: user._id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
