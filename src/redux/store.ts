import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarSlice";

const rootReducer = combineReducers({
  calendarReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
