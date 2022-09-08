// mui components
import { InputLabel, Modal } from "@mui/material";

// react
import { useEffect, useState } from "react";

// redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { globalSlice } from "../../redux/reducers/globalSlice";
import { calendarSlice } from "../../redux/reducers/calendarSlice";

// componenets
import ModalTitle from "./ModalTitle/ModalTitle";
import ModalEditInfo from "./ModalEditInfo/ModalEditInfo";
import ModalCloseButton from "./ModalCloseButton/ModalCloseButton";
import TitleInput from "./TitleInput/TitleInput";
import DescriptionInput from "./DescriptionInput/DescriptionInput";
import ModalDataPickers from "./ModalDataPickers/ModalDataPickers";
import ModalControllers from "./ModalControllers/ModalControllers";

// styled components
import { ModalContainer, ModalForm } from "./ModalWindow.styled";

// libs
import { v4 as uuidv4 } from "uuid";

const ModalWindow = () => {
  const { currentNote } = useAppSelector((state) => state.calendarReducer);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (currentNote) {
      const { id, title, description, date, time } = currentNote;
      setId(id);
      setTitle(title);
      setDescription(description);
      setDate(date);
      setTime(time);
      setError(false);
    }
  }, [currentNote]);

  const { isModalOpen } = useAppSelector((state) => state.globalReducer);
  const { toggleModal } = globalSlice.actions;
  const { addNewNote, changeEditNote, editNote, deleteNote } =
    calendarSlice.actions;

  const dispatch = useAppDispatch();

  const handleReset = () => {
    setId("");
    setTitle("");
    setDescription("");
    setDate(null);
    setTime(null);
    setError(false);
  };

  const handleChangeTime = (newTime) => {
    if (!newTime) {
      setTime(null);
      setError(false);
    } else if (newTime.$d.toString() === "Invalid Date") {
      setError(true);
    } else {
      setTime(newTime);
      setError(false);
    }
  };

  const handleChangeDate = (newDate) => {
    setError(false);
    if (!newDate) {
      setDate("");
      setError(true);
    } else if (newDate.$d.toString() === "Invalid Date") {
      setError(true);
    } else {
      setDate(newDate.$d.toString());
    }
  };

  const handleSubmit = () => {
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
        id: uuidv4(),
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
      <ModalContainer>
        <ModalTitle currentNote={currentNote} />

        {currentNote && <ModalEditInfo currentNote={currentNote} />}

        <ModalCloseButton handleClose={handleClose} />

        <ModalForm variant="standard">
          <InputLabel required>Title</InputLabel>
          <TitleInput title={title} setTitle={setTitle} />
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />

          <ModalDataPickers
            date={date}
            time={time}
            handleChangeDate={handleChangeDate}
            handleChangeTime={handleChangeTime}
            setError={setError}
            error={error}
          />

          <ModalControllers
            currentNote={currentNote}
            title={title}
            date={date}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            error={error}
          />
        </ModalForm>
      </ModalContainer>
    </Modal>
  );
};

export default ModalWindow;
