// mui components
import { Button, InputLabel, TextField } from "@mui/material";

// date
import dayjs from "dayjs";
import moment from "moment";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// redux and redux-hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../redux/reducers/calendarSlice";

// styled components
import { ControllesContainer, SelectContainer } from "./Controllers.styled";

// stlyes
const pickerStyles = {
  picker: {
    ".MuiInputBase-input": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      fontSize: 0,
      height: "50px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
};

const Controllers = () => {
  const monthNames = moment.months();
  const { pickerMonth, pickerYear } = useAppSelector(
    (state) => state.calendarReducer
  );

  const { changePickerMonth, changePickerYear } = calendarSlice.actions;
  const dispatch = useAppDispatch();

  const handlePrevMounth = () => {
    let newMonthIndex = monthNames.indexOf(monthNames[pickerMonth]) - 1;

    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      dispatch(changePickerYear(pickerYear - 1));
    }
    dispatch(changePickerMonth(newMonthIndex));
  };

  const handleNextMounth = () => {
    let newMonthIndex = monthNames.indexOf(monthNames[pickerMonth]) + 1;
    if (newMonthIndex > 11) {
      newMonthIndex = 0;
      dispatch(changePickerYear(pickerYear + 1));
    }
    dispatch(changePickerMonth(newMonthIndex));
  };

  const handleDateChange = (newDate) => {
    console.log(newDate);
    if (newDate.$M === pickerMonth && newDate.$M === pickerYear) {
      return;
    }
    dispatch(changePickerYear(newDate.$y));
    dispatch(changePickerMonth(newDate.$M));
  };

  return (
    <ControllesContainer paddingY={2}>
      <SelectContainer>
        <Button onClick={() => handlePrevMounth()} name="prev">
          {"<"}
        </Button>

        <InputLabel>
          {monthNames[pickerMonth]} {pickerYear}
        </InputLabel>

        <Button onClick={() => handleNextMounth()} name="next">
          {">"}
        </Button>
      </SelectContainer>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year", "month"]}
          minDate={dayjs(`${pickerYear - 15}-01-01`)}
          maxDate={dayjs(`${pickerYear + 15}-12-31`)}
          value={`${monthNames[pickerMonth]} ${pickerYear}`}
          onChange={(newValue) => {
            handleDateChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={pickerStyles.picker} />
          )}
        />
      </LocalizationProvider>
    </ControllesContainer>
  );
};

export default Controllers;
