import {
  Container,
  Box,
  Button,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useState } from "react";

// import { ReactComponent as CalendarIcon } from "../../images/calendar.svg";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthData = [
  [
    undefined,
    undefined,
    undefined,
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    undefined,
    undefined,
  ],
];

const tableStyled = {
  row: {
    height: "130px",
    width: "130px",
    backgroundColor: "#e8f5e9",
  },
  cell: {
    border: "1px solid #78909c",
  },
};

const selectStyled = {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 0,
    width: "50px",
    height: "50px",
  },
};

const Calendar = () => {
  const [currentMounth, setCurrentMounth] = useState(monthNames[8]);
  const [currentYear, setCurrentYear] = useState(years[7]);

  const handlePrevMounth = (e) => {
    e.preventDefault();
    let newMounthIndex = monthNames.indexOf(currentMounth) - 1;
    let currentYearIndex = years.indexOf(currentYear);
    if (newMounthIndex < 0) {
      newMounthIndex = 11;
      setCurrentYear(years[currentYearIndex - 1]);
    }
    setCurrentMounth(monthNames[newMounthIndex]);
  };

  const handleNextMounth = (e) => {
    e.preventDefault();

    let newMounthIndex = monthNames.indexOf(currentMounth) + 1;
    let currentYearIndex = years.indexOf(currentYear);
    if (newMounthIndex > 11) {
      newMounthIndex = 0;
      setCurrentYear(years[currentYearIndex + 1]);
    }
    setCurrentMounth(monthNames[newMounthIndex]);
  };

  const handleDateChange = (newDate) => {
    setCurrentMounth(monthNames[newDate.$M]);
    setCurrentYear(newDate.$y);
  };

  const FIRST_YEAR =
    currentYear === years[0] && currentMounth === monthNames[0];
  const LAST_YEAR =
    currentYear === years[years.length - 1] &&
    currentMounth === monthNames[monthNames.length - 1];

  return (
    <Container>
      <Box sx={selectStyled.box} paddingY={2}>
        <Box sx={selectStyled.select}>
          <Button
            disabled={FIRST_YEAR}
            onClick={(e) => handlePrevMounth(e)}
            name="prev"
          >
            {"<"}
          </Button>

          <InputLabel>
            {currentMounth} {currentYear}
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
            value={`${currentMounth} ${currentYear}`}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} sx={selectStyled.picker} />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Table>
        <TableBody>
          {monthData.map((week, index) => (
            <TableRow sx={tableStyled.row} component="tr" key={index}>
              {week.map((date, index) =>
                date ? (
                  <TableCell sx={tableStyled.cell} key={index}>
                    {date.getDate()}
                  </TableCell>
                ) : (
                  <TableCell sx={tableStyled.cell} key={index} />
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Calendar;
