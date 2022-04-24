import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../configs/api";

interface User {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

interface UserSlice {
  user: User;
  status: string | null;
}

const initialState: UserSlice = {
  user: {
    email: null,
    firstName: null,
    lastName: null,
  },
  status: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (args: {
    body: { email: string; password: string };
    succesCallBack: () => void;
    errorCallBack: (message: string) => void;
  }) => {
    const { body, succesCallBack, errorCallBack } = args;
    await api
      .post("auth/login", body)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        succesCallBack();
      })
      .catch((error) => {
        errorCallBack(error.response?.data?.message);
      });
    return null;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (args?: { succesCallBack: () => void }) => {
    localStorage.removeItem("user");
    await api.post("auth/logout").then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      if (typeof args?.succesCallBack === "function") args.succesCallBack();
      else window.location.pathname = "/login";
    });

    return null;
  }
);

export const RickAndMortSlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending as any]: (state: UserSlice) => {
      state.status = "loading";
    },
    [login.fulfilled as any]: (
      state: UserSlice,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.status = "success";
    },
    [login.rejected as any]: (state: UserSlice) => {
      state.status = "failed";
    },
    [logout.pending as any]: (state: UserSlice) => {
      state.user = { ...initialState.user };
      state.status = "loading";
    },
    [logout.fulfilled as any]: (state: UserSlice) => {
      state.status = "success";
    },
    [logout.rejected as any]: (state: UserSlice) => {
      state.status = "failed";
    },
  },
});
