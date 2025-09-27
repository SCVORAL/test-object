import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Server } from "../types/serversTypes";

interface ServersState {
  list: Server[];
}

const initialState: ServersState = {
  list: [],
};

const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<Server[]>) => {
      state.list = action.payload;
    },
    addServer: (state, action: PayloadAction<Server>) => {
      state.list.push(action.payload);
    },
    removeServer: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
    updateServer: (state, action: PayloadAction<Server>) => {
      const idx = state.list.findIndex((s) => s.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
    },
  },
});

export const { addServer, removeServer, updateServer, setInitialData } =
  serversSlice.actions;
export default serversSlice.reducer;
