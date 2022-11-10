import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "common/utils/cookies";
import { RootState } from "redux-store/store";
import { IOrganization } from "./interfaces";

const initialState: IOrganization = {
  selectedBranch: getCookie("selectedBranch"),
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<string | undefined>) => {
      state.selectedBranch = action.payload;
    },
  },
});

export default organizationSlice.reducer;

export const { setSelectedBranch } = organizationSlice.actions;

export const selectSelectedBranch = (state: RootState) =>
  state.organization.selectedBranch;
