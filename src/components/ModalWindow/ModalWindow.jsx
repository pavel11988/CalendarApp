import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { globalSlice } from "../../redux/reducers/globalSlice";

// icons
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import CloseIcon from "@mui/icons-material/Close";

// data
// import dayjs, { Dayjs } from "dayjs";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

// libs
import { v4 as uuidv4 } from "uuid";
import { calendarSlice } from "../../redux/reducers/calendarSlice";

const modalStyles = {
  modalContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "350px",
    height: "500px",
    backgroundColor: "white",
    padding: 2,
    borderRadius: "15px",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 20,
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    color: "#9e9e9e",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#616161",
      color: "#eeeeee",
    },
  },
  form: {
    mt: "15px",
    width: "100%",
  },
  titleInput: {
    mb: "15px",
  },
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

  button: {
    backgroundColor: "#03a9f4",
    color: "#ffffff",
    width: "80px",
    mt: "85px",
    ml: "auto",

    "&:disabled": {
      backgroundColor: "#bdbdbd",
      color: "#f5f5f5",
    },

    "&:hover": {
      backgroundColor: "#81d4fa",
      color: "#e1f5fe",
    },
  },
};

const ModalWindow = ({ currentNote }) => {
  //   let action = "add";
  //   if (prevTitle === "" || prevDate === "") action = "edit";
  //   console.log(action);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  const { isModalOpen } = useAppSelector((state) => state.globalReducer);
  const { toggleModal } = globalSlice.actions;
  const { addNewNote } = calendarSlice.actions;
  const dispatch = useAppDispatch();

  const handleChangeTime = (newTime) => {
    console.log(newTime);
    setTime(newTime);
  };

  const handleChangeDate = (newDate) => {
    console.log(newDate);
    setDate(newDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      id: uuidv4(),
      title,
      description,
      date: date.$d.toString(),
      time,
    };
    console.log(note);
    dispatch(addNewNote(note));
    dispatch(toggleModal(false));
  };

  return (
    <Modal open={isModalOpen} onClose={() => dispatch(toggleModal(false))}>
      <Box sx={modalStyles.modalContainer}>
        <Typography variant="h6" component="h2">
          Add new idea item
        </Typography>
        <Button
          sx={modalStyles.closeButton}
          onClick={() => dispatch(toggleModal(false))}
        >
          <CloseIcon />
        </Button>

        <FormControl variant="standard" sx={modalStyles.form}>
          <InputLabel required>Title</InputLabel>
          <Input
            sx={modalStyles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title goes here"
            endAdornment={
              <InputAdornment position="start">
                <RecentActorsIcon />
              </InputAdornment>
            }
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={7}
            variant="standard"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={modalStyles.datePickersContainer}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={date}
                required
                onChange={(newDate) => handleChangeDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label="Time"
                value={time}
                onChange={(newTime) => handleChangeTime(newTime)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>
          <Button
            sx={modalStyles.button}
            disabled={title.trim() === "" || date === null}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
