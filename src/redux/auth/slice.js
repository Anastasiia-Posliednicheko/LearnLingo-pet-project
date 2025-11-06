import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true, 
  pending: false, 
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
      state.loading = false;
    },
    setPending(state, { payload }) {
      state.pending = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, setPending, setError, logout } = slice.actions;
export default slice.reducer;
