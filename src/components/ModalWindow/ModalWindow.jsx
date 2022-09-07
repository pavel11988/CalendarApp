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

// react
import { useEffect, useState } from "react";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { globalSlice } from "../../redux/reducers/globalSlice";
import { calendarSlice } from "../../redux/reducers/calendarSlice";

// icons
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  datesInfo: {
    fontSize: 14,
    color: "#9e9e9e",
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

  buttonsContainer: {
    height: "100px",
    display: "flex",
    justifyContent: "end",
    alignSelf: "bottom",
  },

  buttonSave: {
    backgroundColor: "#03a9f4",
    color: "#ffffff",
    width: "80px",
    height: "40px",
    mt: "auto",

    "&:disabled": {
      backgroundColor: "#bdbdbd",
      color: "#f5f5f5",
    },

    "&:hover": {
      backgroundColor: "#81d4fa",
      color: "#e1f5fe",
    },
  },

  buttonDelete: {
    backgroundColor: "#b30909",
    color: "#ffffff",
    width: "20px",
    height: "40px",
    mr: "10px",
    mt: "auto",

    "&:hover": {
      backgroundColor: "#fa8181",
      color: "#e1f5fe",
    },
  },
};

const ModalWindow = () => {
  const { currentNote } = useAppSelector((state) => state.calendarReducer);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (currentNote) {
      const { id, title, description, date, time } = currentNote;
      setId(id);
      setTitle(title);
      setDescription(description);
      setDate(date);
      setTime(time);
    }
  }, [currentNote]);

  const { isModalOpen } = useAppSelector((state) => state.globalReducer);
  const { toggleModal } = globalSlice.actions;
  const { addNewNote, changeEditNote, editNote, deleteNote } =
    calendarSlice.actions;

  const dispatch = useAppDispatch();

  const handleReset = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setDate(null);
    setTime(null);
  };

  const handleChangeTime = (newTime) => {
    setTime(newTime);
  };

  const handleChangeDate = (newDate) => {
    setDate(newDate.$d.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentNote !== null) {
      const editedNote = {
        id,
        title,
        description,
        date,
        time,
        createdAt: currentNote.createdAt,
        updatedAt: new Date(),
      };
      dispatch(editNote(editedNote));
    } else {
      const newNote = {
        title,
        description,
        date,
        time,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch(addNewNote(newNote));
    }
    dispatch(changeEditNote(null));
    handleReset();
    dispatch(toggleModal(false));
  };

  const handleDelete = () => {
    dispatch(deleteNote(id));
    dispatch(changeEditNote(null));
    handleReset();
    dispatch(toggleModal(false));
  };

  const handleClose = () => {
    dispatch(changeEditNote(null));
    handleReset();
    dispatch(toggleModal(false));
  };

  return (
    <Modal open={isModalOpen} onClose={() => handleClose()}>
      <Box sx={modalStyles.modalContainer}>
        <Typography variant="h6" component="h2">
          {currentNote ? "Edit idea item" : "Add new idea item"}
        </Typography>

        {currentNote && (
          <Box sx={modalStyles.datesInfo}>
            <Typography variant="p" component="p">
              Created at: {currentNote.createdAt.split("T")[0]}{" "}
              {currentNote.createdAt.split("T")[1].split(".")[0]}
            </Typography>
            <Typography variant="p" component="p">
              Updated at: {currentNote.updatedAt.split("T")[0]}{" "}
              {currentNote.updatedAt.split("T")[1].split(".")[0]}
            </Typography>
          </Box>
        )}
        <Button sx={modalStyles.closeButton} onClick={() => handleClose()}>
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
          <Box sx={modalStyles.buttonsContainer}>
            {currentNote && (
              <Button
                sx={modalStyles.buttonDelete}
                onClick={(e) => handleDelete(e)}
              >
                <DeleteForeverIcon />
              </Button>
            )}
            <Button
              sx={modalStyles.buttonSave}
              disabled={title.trim() === "" || date === null}
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
