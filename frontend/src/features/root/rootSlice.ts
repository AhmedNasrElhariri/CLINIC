import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "common/interfaces";
import { RootState } from "redux-store/store";
import { SELECTED_BRANCH } from "utils/constants";

const initialState: RootStore = {
  selectedBranch: localStorage.getItem(SELECTED_BRANCH),
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<string | null>) => {
      state.selectedBranch = action.payload;
    },
  },
});

export default rootSlice.reducer;

export const { setSelectedBranch } = rootSlice.actions;

export const selectSelectedBranch = (state: RootState) =>
  state.root.selectedBranch;
