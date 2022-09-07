import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../models/INote";

interface ICalendarState {
  pickerMonth: number;
  pickerYear: number;
  notes: INote[];
  currentNote: INote | null;
}

const initialState: ICalendarState = {
  pickerMonth: 8,
  pickerYear: 2022,
  notes: [],
  currentNote: null,
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
    addNewNote(state, action: PayloadAction<INote>) {
      state.notes.push(action.payload);
    },
    editNote(state, action: PayloadAction<INote>) {
      state.notes = state.notes.filter((note) => note.id === action.payload.id);
      state.notes.push(action.payload);
    },
    setEditNote(state, action: PayloadAction<INote | null>) {
      state.currentNote = action.payload;
    },
  },
});

export default calendarSlice.reducer;
