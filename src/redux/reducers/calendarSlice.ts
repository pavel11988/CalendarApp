import { IStorage } from "./../../models/IStorage";
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { INote } from "../../models/INote";
import localStorage from "./localStorage.actions";
import { default as dayjs } from "dayjs";

interface ICalendarState {
  pickerMonth: number;
  pickerYear: number;
  notes: INote[];
  storage: IStorage;
  currentNote: INote | null;
  loading: boolean;
  error: boolean;
}

const initialState: ICalendarState = {
  pickerMonth: dayjs().month(),
  pickerYear: dayjs().year(),
  notes: [],
  storage: localStorage,
  currentNote: null,
  loading: false,
  error: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    refresh(state) {
      const dataLoad = state.storage.load();
      state.notes = dataLoad.notes;
      state.pickerMonth = dataLoad.pickerMonth;
      state.pickerYear = dataLoad.pickerYear;
    },

    changePickerMonth(state, action: PayloadAction<number>) {
      const actionType = "changePickerMonth";
      const data = state.storage.save(
        state.notes,
        action.payload,
        state.pickerYear,
        actionType
      );
      state.pickerMonth = data.pickerMonth;
    },
    changePickerYear(state, action: PayloadAction<number>) {
      const actionType = "changePickerYear";
      const data = state.storage.save(
        state.notes,
        state.pickerMonth,
        action.payload,
        actionType
      );
      state.pickerYear = data.pickerYear;
    },
    addNewNote(state, action: PayloadAction<INote>) {
      const actionType = "addNewNote";
      const newNote = { ...action.payload };
      const newNotes = [...state.notes, newNote];
      const data = state.storage.save(
        newNotes,
        state.pickerMonth,
        state.pickerYear,
        actionType
      );

      state.notes = data.notes;
    },
    editNote(state, action: PayloadAction<INote>) {
      const actionType = "editNote";
      const newNotes = current(state.notes).filter(
        (note) => note.id !== action.payload.id
      );
      newNotes.push(action.payload);
      const data = state.storage.save(
        newNotes,
        state.pickerMonth,
        state.pickerYear,
        actionType
      );
      state.notes = data.notes;
    },
    deleteNote(state, action: PayloadAction<string>) {
      const actionType = "deleteNote";
      const newNotes = current(state.notes).filter(
        (note) => note.id !== action.payload
      );
      const data = state.storage.save(
        newNotes,
        state.pickerMonth,
        state.pickerYear,
        actionType
      );
      state.notes = data.notes;
    },
    changeEditNote(state, action: PayloadAction<INote | null>) {
      state.currentNote = action.payload;
    },
    // load status & error status (for restapi storage)
    loading(state) {
      state.loading = true;
      state.error = false;
    },
    error(state) {
      state.loading = true;
      state.error = false;
    },
  },
});

export default calendarSlice.reducer;
