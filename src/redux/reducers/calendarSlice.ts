import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../models/INote";

interface ICalendarState {
  pickerMonth: number;
  pickerYear: number;
  data: INote[];
}

const initialState: ICalendarState = {
  pickerMonth: 8,
  pickerYear: 2022,
  data: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    changePickerMonth(state, action: PayloadAction<number>) {
      state.pickerMonth = action.payload;
    },
    changePickerYear(state, action: PayloadAction<number>) {
      state.pickerYear = action.payload;
    },
  },
});

export default calendarSlice.reducer;
