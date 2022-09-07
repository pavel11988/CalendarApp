"use strict";
exports.__esModule = true;
exports.setupStore = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var calendarSlice_1 = require("./reducers/calendarSlice");
var globalSlice_1 = require("./reducers/globalSlice");
var serializableMiddleware = toolkit_1.createSerializableStateInvariantMiddleware({});
var rootReducer = toolkit_1.combineReducers({
    calendarReducer: calendarSlice_1["default"],
    globalReducer: globalSlice_1["default"]
});
exports.setupStore = function () {
    return toolkit_1.configureStore({
        reducer: rootReducer,
        middleware: [serializableMiddleware]
    });
};
