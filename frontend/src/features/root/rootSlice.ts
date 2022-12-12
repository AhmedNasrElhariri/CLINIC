import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from 'common/interfaces';
import { RootState } from 'redux-store/store';
import {
  SELECTED_BRANCH,
  SELECTED_SPECIALTY,
  SELECTED_DOCTOR,
} from 'utils/constants';

const initialState: RootStore = {
  selectedBranch: localStorage.getItem(SELECTED_BRANCH),
  selectedSpecialty: localStorage.getItem(SELECTED_SPECIALTY),
  selectedDoctor: localStorage.getItem(SELECTED_DOCTOR),
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<string | null>) => {
      state.selectedBranch = action.payload;
    },
    setSelectedSpecialty: (state, action: PayloadAction<string | null>) => {
      state.selectedSpecialty = action.payload;
    },
    setSelectedDoctor: (state, action: PayloadAction<string | null>) => {
      state.selectedDoctor = action.payload;
    },
  },
});

export default rootSlice.reducer;

export const { setSelectedBranch, setSelectedSpecialty, setSelectedDoctor } =
  rootSlice.actions;

export const selectSelectedBranch = (state: RootState) =>
  state.root.selectedBranch;
export const selectSelectedSpecialty = (state: RootState) =>
  state.root.selectedSpecialty;
export const selectSelectedDoctor = (state: RootState) =>
  state.root.selectedDoctor;
