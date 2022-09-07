// mui components
import { Box, Button, InputLabel, TextField } from "@mui/material";

// data
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// redux and redux-hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../redux/reducers/calendarSlice";

// config
import { monthNames, years } from "../../../helpers/config-data";

// stlyes
const selectStyles = {
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  select: {
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  const { pickerMonth, pickerYear } = useAppSelector(
    (state) => state.calendarReducer
  );

  const { changePickerMonth, changePickerYear } = calendarSlice.actions;
  const dispatch = useAppDispatch();

  const handlePrevMounth = (e) => {
    e.preventDefault();
    let newMonthIndex = monthNames.indexOf(monthNames[pickerMonth]) - 1;
    let currentYearIndex = years.indexOf(pickerYear);

    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      dispatch(changePickerYear(years[currentYearIndex - 1]));
    }
    dispatch(changePickerMonth(newMonthIndex));
  };

  const handleNextMounth = (e) => {
    e.preventDefault();
    let newMonthIndex = monthNames.indexOf(monthNames[pickerMonth]) + 1;
    let currentYearIndex = years.indexOf(pickerYear);
    if (newMonthIndex > 11) {
      newMonthIndex = 0;
      dispatch(changePickerYear(years[currentYearIndex + 1]));
    }
    dispatch(changePickerMonth(newMonthIndex));
  };

  const handleDateChange = (newDate) => {
    if (newDate.$M === pickerMonth && newDate.$M === pickerYear) {
      return;
    }
    dispatch(changePickerYear(newDate.$y));
    dispatch(changePickerMonth(newDate.$M));
  };

  const FIRST_YEAR = pickerYear === years[0] && pickerMonth === monthNames[0];
  const LAST_YEAR =
    pickerYear === years[years.length - 1] &&
    pickerMonth === monthNames[monthNames.length - 1];
  return (
    <Box sx={selectStyles.box} paddingY={2}>
      <Box sx={selectStyles.select}>
        <Button
          disabled={FIRST_YEAR}
          onClick={(e) => handlePrevMounth(e)}
          name="prev"
        >
          {"<"}
        </Button>

        <InputLabel>
          {monthNames[pickerMonth]} {pickerYear}
        </InputLabel>

        <Button
          disabled={LAST_YEAR}
          onClick={(e) => handleNextMounth(e)}
          name="next"
        >
          {">"}
        </Button>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["year", "month"]}
          minDate={dayjs("2020-01-01")}
          maxDate={dayjs("2025-12-31")}
          value={`${monthNames[pickerMonth]} ${pickerYear}`}
          onChange={(newValue) => {
            handleDateChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} sx={selectStyles.picker} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Controllers;
