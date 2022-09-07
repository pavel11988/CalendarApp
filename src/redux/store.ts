import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarSlice";
import globalReducer from "./reducers/globalSlice";

const rootReducer = combineReducers({
  calendarReducer,
  globalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ],
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
