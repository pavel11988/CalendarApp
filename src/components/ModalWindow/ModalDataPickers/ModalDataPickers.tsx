//data
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const styles = {
  datePickersContainer: {
    mt: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    "& * > input:nth-of-type(n)": {
      width: "90px",
      display: "flex",
      justifyContent: "center",
    },
  },
};

interface IProps {
  date: string | null;
  time: string;
  handleChangeDate: Function;
  handleChangeTime: Function;
  setError: Function;
  error: boolean;
}

const ModalDataPickers = ({
  date,
  time,
  handleChangeDate,
  handleChangeTime,
  setError,
  error,
}: IProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={styles.datePickersContainer}>
      <DesktopDatePicker
        label="Date *"
        inputFormat="DD/MM/YYYY"
        value={date}
        onError={() => setError(true)}
        onChange={(newDate) => {
          handleChangeDate(newDate);
        }}
        renderInput={(params) => <TextField error {...params} />}
      />

      <TimePicker
        label="Time"
        value={time}
        onChange={(newTime) => handleChangeTime(newTime)}
        renderInput={(params) => <TextField error {...params} />}
      />
    </Box>
  </LocalizationProvider>
);

export default ModalDataPickers;
