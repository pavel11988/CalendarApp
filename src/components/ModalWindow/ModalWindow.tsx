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
import { default as dayjs } from "dayjs";

//interfaces
import { INote } from "../../models/INote";

const ModalWindow = () => {
  const currentNote: INote | null = useAppSelector(
    (state) => state.calendarReducer.currentNote
  );
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [error, setError] = useState<boolean>(false);

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

  const handleChangeDate = (newDate: any) => {
    setError(false);
    if (!newDate) {
      setDate(null);
      setError(true);
    } else if (newDate.$d.toString() === "Invalid Date") {
      setError(true);
    } else {
      setDate(null);
      setDate(newDate);
    }
  };

  const handleChangeTime = (newTime: any) => {
    console.log(newTime);
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

  const handleSubmit = () => {
    if (currentNote !== null) {
      const editedNote: INote = {
        id,
        title,
        description,
        date: date,
        time: time,
        createdAt: currentNote.createdAt,
        updatedAt: dayjs(),
      };
      dispatch(editNote(editedNote));
    } else {
      const newNote: INote = {
        id: uuidv4(),
        title,
        description,
        date: date,
        time: time,
        createdAt: dayjs(),
        updatedAt: null,
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
